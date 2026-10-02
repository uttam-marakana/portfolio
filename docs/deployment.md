# Portfolio Deployment

## 1. Deployment Model

The portfolio has two deployment surfaces:

```text
Vercel
  └── React/Vite frontend

Firebase
  └── Firestore database + Security Rules
```

The Vercel deployment serves the static Vite application.

Firebase provides the Firestore data service used by the contact form.

## 2. Vercel Deployment

The application is compatible with Vercel's Vite deployment flow.

The important production configuration is:

```text
Build command: npm run build
Output directory: dist
```

The repository's `vercel.json` contains:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

This allows the Vite SPA to receive client-side routes such as:

```text
/about
/projects
/projects/shopify
/projects/details/arnik-jewellers
/contact
```

without relying on server-side route files.

## 3. Vercel Environment Variables

Configure these variables in the Vercel project:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_SITE_URL
```

`VITE_SITE_URL` should point to the canonical production origin.

Example:

```env
VITE_SITE_URL=https://your-domain.example
```

Do not copy production secrets into the repository.

## 4. Build-Time SEO Generation

`vite.config.js` loads environment variables through Vite's `loadEnv()`.

The build plugin generates:

```text
dist/sitemap.xml
dist/robots.txt
```

The sitemap is assembled from:

- `/`
- `/about`
- `/services`
- `/resume`
- `/projects`
- `/contact`
- technology routes derived from `projectsData.js`
- project detail routes derived from project IDs

The robots file points crawlers to the generated sitemap.

## 5. Local Production Verification

Run:

```bash
npm install
npm run lint
npm run test:run
npm run build
npm run preview
```

Then verify:

- all navigation routes load;
- direct URL access works;
- project detail routes resolve;
- technology filters work;
- contact form behaves correctly;
- theme persistence works;
- generated `sitemap.xml` exists;
- generated `robots.txt` exists;
- images and resume assets load.

## 6. Firebase Setup

The application uses the Firebase Web SDK and Firestore.

Firebase configuration is read from:

```text
VITE_FIREBASE_*
```

When these values are absent, the app intentionally disables the contact form.

## 7. Firestore Rules Deployment

The repository contains:

```text
firebase.json
firestore.rules
```

`firebase.json` associates Firestore with `firestore.rules`.

Deploy the rules with:

```bash
firebase deploy --only firestore
```

The Firebase configuration includes a predeploy lint command:

```text
npm --prefix "$RESOURCE_DIR" run lint
```

This means Firestore deployment should fail early if the configured lint step fails.

## 8. Firebase Project Selection

`.firebaserc` stores the Firebase project alias used by the Firebase CLI.

Before deploying rules, verify that the active project is the intended production Firebase project.

Recommended check:

```bash
firebase use
```

If the wrong project is selected, switch it before deployment.

## 9. Production Deployment Sequence

Recommended sequence:

### Step 1 — Pull latest source

```bash
git pull origin main
```

### Step 2 — Install dependencies

```bash
npm ci
```

### Step 3 — Run quality checks

```bash
npm run lint
npm run test:run
npm run build
```

### Step 4 — Deploy Firestore rules

```bash
firebase deploy --only firestore
```

### Step 5 — Deploy frontend

Push the verified commit to the configured Vercel branch or deploy through Vercel.

### Step 6 — Verify production

Check:

- homepage
- about
- services
- resume
- projects
- Shopify project filter
- React project filter
- project detail page
- GitHub README section
- contact validation
- contact submission
- 404 route
- theme switch
- sitemap
- robots file

## 10. Custom Domain

If a custom domain is connected to Vercel:

1. add the domain in the Vercel project;
2. configure the required DNS records;
3. wait for certificate/domain verification;
4. update `VITE_SITE_URL` to the final canonical origin;
5. redeploy.

The production build should then generate canonical URLs, sitemap entries, and robots references using the final domain.

## 11. Firebase and Vercel Separation

Firebase and Vercel are independent deployment systems.

Changing frontend code does not automatically change Firestore Rules.

Changing Firestore Rules does not automatically deploy a new frontend build.

Treat them as separate release surfaces.

## 12. Rollback

### Frontend rollback

Use Vercel's deployment history to restore a previous successful deployment.

### Firestore Rules rollback

Restore the previously reviewed `firestore.rules` version and redeploy:

```bash
firebase deploy --only firestore
```

Avoid editing production rules directly without keeping the repository copy synchronized.

## 13. Common Deployment Problems

### Direct project URLs return 404

Check `vercel.json` and confirm the SPA rewrite is deployed.

### Contact form is disabled

Check all `VITE_FIREBASE_*` values in the Vercel environment.

### Contact submission fails

Check:

- Firebase project ID;
- Firestore availability;
- deployed Firestore Rules;
- browser console;
- Firebase console logs/errors.

### Canonical/sitemap URLs are wrong

Check `VITE_SITE_URL`, then rebuild.

### GitHub README does not load

Check:

- repository identifier in `projectsData.js`;
- repository visibility;
- GitHub API response;
- public API rate limits.

## 14. Release Checklist

```text
[ ] Pull latest main
[ ] npm ci
[ ] npm run lint
[ ] npm run test:run
[ ] npm run build
[ ] Verify dist/sitemap.xml
[ ] Verify dist/robots.txt
[ ] Verify Vercel environment variables
[ ] Verify Firebase project
[ ] Deploy Firestore Rules
[ ] Deploy frontend
[ ] Verify all public routes
[ ] Verify contact form
[ ] Verify GitHub README integration
[ ] Verify SEO/canonical URLs
[ ] Verify mobile layout
```

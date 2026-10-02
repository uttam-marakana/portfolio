# Portfolio Security

## 1. Security Model

Portfolio is primarily a client-side application. The most important security boundary is therefore the external service authorization layer, especially Firestore Security Rules.

```text
Browser validation
       │
       ▼
Firebase Web SDK
       │
       ▼
Firestore Security Rules
       │
       ├── allow valid contact creates
       └── deny reads/updates/deletes
```

Client-side validation improves UX but must not be treated as authoritative security.

## 2. Environment Variables

The application uses Vite `VITE_*` variables.

These values are exposed to the browser as part of the frontend build.

### Important distinction

Firebase web configuration values are not equivalent to server-side secrets. The Firebase API key and related web configuration identify the Firebase project, while Firestore Rules determine whether an operation is authorized.

Do not place:

- Firebase Admin credentials
- service-account private keys
- GitHub personal access tokens
- private API credentials
- deployment secrets

inside `VITE_*` variables or committed source code.

## 3. Firebase Configuration

`src/services/firebase.js` creates the Firebase app only when all required configuration values are present.

When configuration is incomplete:

- Firebase is not initialized;
- `db` remains `null`;
- the contact form disables submission.

This prevents an incomplete local environment from producing misleading successful submissions.

## 4. Firestore Rules

The `contacts` collection allows only `create`.

The rules require the submitted document to contain exactly:

```text
name
email
projectType
message
service
status
source
createdAt
```

The following constraints are enforced server-side:

### Name

- string
- minimum 2 characters
- maximum 80 characters

### Email

- string
- must match the configured email pattern

### Project type

- string
- maximum 60 characters

### Message

- string
- minimum 20 characters
- maximum 2000 characters

### Service

Must be one of:

```text
Shopify
React
CRO
General
```

### Fixed fields

```text
status == "new"
source == "portfolio"
```

### Timestamp

`createdAt` must be a Firestore timestamp.

### Reads and mutations

```text
allow read: false
allow update: false
allow delete: false
```

This prevents the public client from reading or modifying existing contact submissions.

## 5. Contact Form Validation

The contact page performs several client-side checks before sending:

- required name/email/message
- trimmed input
- lowercased email
- email format
- message minimum length
- Firebase configuration check
- honeypot field check

The hidden `website` field acts as a basic bot honeypot.

A populated honeypot field causes the submission to be rejected before Firestore access.

## 6. Service Detection

The form derives a service category from the explicit project type or message text.

The supported categories are:

```text
Shopify
React
CRO
General
```

This value is also validated by Firestore Rules, preventing an arbitrary category from being stored through direct client manipulation.

## 7. Abuse Considerations

The current application does not implement:

- IP-based rate limiting
- CAPTCHA
- server-side bot scoring
- email verification
- request quotas at an application layer
- automated spam moderation

Firestore Rules restrict document shape and content lengths, but they do not provide a full anti-abuse system.

If the public contact form becomes a spam target, move submission handling behind a backend endpoint or serverless function and add rate limiting/bot protection there.

## 8. GitHub API Security

The application requests public GitHub repository data directly from the browser.

No GitHub authentication token is required for the current README integration.

Benefits:

- no GitHub secret in the frontend;
- no server credential management;
- public repository content only.

Risks:

- public GitHub API rate limits;
- external dependency availability;
- README content can change outside the portfolio deployment lifecycle.

The application catches README request failures and renders a fallback message.

## 9. External Markdown Rendering

README content returned by GitHub is rendered through `react-markdown`.

The application does not enable arbitrary raw HTML rendering through `rehype-raw`.

That keeps the README rendering model narrower than a raw HTML injection pipeline.

External Markdown should still be treated as untrusted content, especially if the rendering configuration changes in the future.

## 10. External Links

Project previews, GitHub links, LinkedIn links, and other external destinations should remain explicitly marked as external.

Where a new-tab link is used, `rel="noreferrer"` should remain in place unless there is a deliberate reason to change it.

## 11. Client-Side Storage

The application stores only the selected theme in browser `localStorage`:

```text
theme = dark | light
```

No authentication tokens, contact submissions, or private application data are stored there.

## 12. Firebase Data Minimization

The contact form stores only information needed for a project inquiry:

- name
- email
- project type
- message
- service classification
- fixed status/source metadata
- creation timestamp

The application does not currently expose contact records in the frontend.

## 13. Deployment Security

Production deployments should ensure:

- `.env` is not committed;
- production Firebase values are configured in the hosting environment;
- Firestore Rules are deployed from the reviewed `firestore.rules`;
- GitHub tokens are never added to client environment variables;
- preview deployments do not accidentally point at unintended production data.

## 14. Security Checklist

Before deployment:

- [ ] `.env` is ignored and not committed.
- [ ] `.env.example` contains placeholders only.
- [ ] No Firebase Admin/service-account key exists in the frontend.
- [ ] No GitHub personal access token exists in source code.
- [ ] Firestore Rules deny reads, updates, and deletes on `contacts`.
- [ ] Contact field constraints remain aligned with the form.
- [ ] Honeypot behavior is preserved.
- [ ] Production Firebase project is the intended project.
- [ ] Vercel environment variables are configured correctly.
- [ ] External links use appropriate `rel` attributes.
- [ ] `npm run lint` passes.
- [ ] `npm run test:run` passes.
- [ ] `npm run build` passes.

## 15. Future Hardening

If the portfolio becomes a higher-volume lead-generation system, consider:

1. serverless contact endpoint;
2. rate limiting;
3. CAPTCHA or bot challenge;
4. email notification service;
5. server-side schema validation;
6. abuse monitoring;
7. structured audit logging;
8. stricter origin/request controls where applicable.

The current Firestore-only approach is intentionally simple for the current portfolio scope.

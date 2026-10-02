# Uttam Marakana Portfolio

A production-oriented personal portfolio built with React 19, Vite 7, Tailwind CSS 4, Firebase Firestore, GitHub API integration, and Vercel Analytics.

The application is structured as a data-driven portfolio system rather than a collection of hardcoded project pages. Project content is maintained in `src/data/projectsData.js`, while reusable pages and components render the catalogue, technology filters, case studies, contact workflow, resume, and SEO metadata.

## Project Goals

- Present Shopify and React work through structured case studies.
- Keep project content separate from presentation components.
- Support project search and technology-specific project views.
- Pull public GitHub README content into selected case studies.
- Provide route-level SEO metadata and generated `sitemap.xml` / `robots.txt`.
- Provide a Firebase-backed contact form with Firestore security rules.
- Maintain responsive desktop, tablet, and mobile layouts.
- Keep the frontend deployable as a static Vite application.

## Tech Stack

| Area                | Technology                       |
| ------------------- | -------------------------------- |
| UI                  | React 19                         |
| Build tool          | Vite 7                           |
| Routing             | React Router 7                   |
| Styling             | Tailwind CSS 4                   |
| Animation           | Framer Motion                    |
| Icons               | React Icons                      |
| Content rendering   | React Markdown + remark-gfm      |
| Backend/data        | Firebase Firestore               |
| External content    | GitHub REST API                  |
| Analytics           | Vercel Analytics                 |
| Testing             | Vitest + Testing Library + jsdom |
| Deployment          | Vercel                           |
| Firebase deployment | Firebase CLI / Firestore rules   |

## Application Features

### Public routes

- `/` — portfolio homepage
- `/about` — profile, experience, skills, principles, education
- `/services` — service/capability presentation
- `/resume` — resume presentation/download flow
- `/projects` — complete project catalogue
- `/projects/:tech` — Shopify or React project catalogue
- `/projects/details/:id` — project case study
- `/contact` — contact form
- `*` — 404 page

### Portfolio content system

Projects are defined as structured objects in `src/data/projectsData.js`.

A project can contain:

- identity and categorization
- role and timeline
- overview/problem/solution/impact
- technology stack
- services
- constraints
- process
- results
- highlights
- hero image
- gallery images
- GitHub repository
- live preview

This allows one data source to drive cards, filters, case-study pages, SEO metadata, and generated sitemap routes.

### Search

The navbar owns the shared search input through `SearchContext`.

Typing into the navbar:

1. updates the shared search term;
2. navigates to `/projects` when necessary;
3. filters projects using title, role, sector, timeline, descriptions, stack, services, constraints, process, results, and highlights.

### GitHub README integration

Selected projects contain a GitHub repository reference.

`src/services/githubReadme.js` requests the public repository README through the GitHub REST API. `ProjectDetails.jsx` renders the returned Markdown with `react-markdown` and `remark-gfm`.

The README is supporting technical context; the portfolio's own case-study content remains the primary presentation layer.

### SEO

SEO is managed at route level with `src/hooks/usePageSeo.js` and `src/lib/site.js`.

The application updates:

- document title
- description
- robots metadata
- canonical URL
- Open Graph metadata
- Twitter metadata
- JSON-LD structured data

`vite.config.js` generates:

- `sitemap.xml`
- `robots.txt`

The generated routes include static pages, technology pages, and project detail pages derived from `projectsData.js`.

### Contact workflow

The contact page submits to Firestore collection `contacts`.

Client-side validation includes:

- required name, email, and message
- email format validation
- minimum message length
- hidden honeypot field
- Firebase configuration check
- basic service detection from project type/message

The Firestore rules provide the authoritative server-side write restrictions.

## Local Development

### Prerequisites

- Node.js compatible with the current Vite/React toolchain
- npm
- A Firebase project if the contact form is required locally

### Setup

```bash
git clone https://github.com/uttam-marakana/portfolio.git
cd portfolio
npm install
cp .env.example .env
```

Populate `.env` with the required values.

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

Run the test suite:

```bash
npm run test
```

Run tests once for CI-style execution:

```bash
npm run test:run
```

## Environment Variables

The project uses Vite client-side environment variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_SITE_URL=https://example.com
```

### Variable purpose

| Variable                            | Purpose                                          |
| ----------------------------------- | ------------------------------------------------ |
| `VITE_FIREBASE_API_KEY`             | Firebase web configuration                       |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase web configuration                       |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project selection                       |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase web configuration                       |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web configuration                       |
| `VITE_FIREBASE_APP_ID`              | Firebase web configuration                       |
| `VITE_SITE_URL`                     | Canonical URL and build-time SEO file generation |

Firebase web configuration values are intentionally used in the browser. They are not treated as server-side secrets. Firestore authorization is enforced by `firestore.rules`.

## Project Structure

```text
portfolio/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── security.md
│   ├── deployment.md
│   └── phases.md
├── .env.example
├── .firebaserc
├── firebase.json
├── firestore.rules
├── vercel.json
├── vite.config.js
├── vitest.setup.js
├── package.json
├── public/
│   └── assets/
└── src/
    ├── assets/
    ├── components/
    ├── context/
    ├── data/
    ├── hooks/
    ├── lib/
    ├── pages/
    ├── services/
    ├── test/
    ├── App.jsx
    ├── main.jsx
    ├── App.css
    └── index.css
```

## Important Modules

### `src/App.jsx`

Defines the application shell, React Router routes, lazy-loaded pages/components, global navigation/footer, scroll reset, and Vercel Analytics.

### `src/main.jsx`

Bootstraps React and wraps the application with:

- `StrictMode`
- `ThemeProvider`
- `SearchProvider`

### `src/data/projectsData.js`

Single source of truth for portfolio project content.

The current data contains 11 projects across Shopify and React categories.

### `src/data/personal.js`

Stores reusable personal/profile information such as name, role, contact information, experience, education, skills, and current learning.

### `src/services/firebase.js`

Creates the Firebase application and Firestore instance only when all required Firebase environment values are present.

### `src/services/githubReadme.js`

Fetches public GitHub README content for project detail pages.

### `src/hooks/usePageSeo.js`

Applies route-specific SEO metadata and JSON-LD to the document head.

### `src/context/ThemeContext.jsx`

Provides dark/light theme state and persists the selected theme in `localStorage`.

### `src/context/SearchContext.jsx`

Provides the shared project search term to navigation and project pages.

## Adding A New Project

1. Add project media under `public/assets/images/` as appropriate.
2. Add a project object to `src/data/projectsData.js`.
3. Give the project a unique `id`.
4. Set `tech` to the supported technology category.
5. Add the case-study fields used by `ProjectDetails`.
6. Add `github` only when the public repository should be rendered.
7. Add `preview` when a live project URL exists.
8. Add gallery entries when multiple screenshots improve the case study.
9. Run linting and tests.
10. Run a production build and verify generated SEO files.

## Firestore

The application currently uses one collection:

```text
contacts/
```

The frontend only performs `create` operations. Public reads, updates, and deletes are denied by the rules.

See [`docs/security.md`](docs/security.md) for the contact submission security model.

## Testing

Tests are colocated with selected components/pages and also under `src/test/`.

Current coverage areas include:

- navbar search/navigation behavior
- theme persistence
- BackButton history/fallback behavior
- contact form validation/submission
- project detail README fallback
- core application routes

The test environment is configured in `vite.config.js` and `vitest.setup.js`.

## Deployment

The frontend is designed for Vercel deployment.

`vercel.json` rewrites incoming paths to `/`, allowing the Vite SPA to resolve client-side routes.

Firebase Firestore rules are deployed separately through Firebase tooling.

See [`docs/deployment.md`](docs/deployment.md).

## Development Quality Checks

Before merging or deploying:

```bash
npm run lint
npm run test:run
npm run build
```

For Firestore rule deployment:

```bash
firebase deploy --only firestore
```

The Firebase configuration also defines a predeploy lint step for Firestore deployments.

## Security Notes

The main security boundary is Firestore rules, not frontend validation.

The contact collection only permits unauthenticated `create` operations when the submitted fields and values satisfy the expected schema. Reads, updates, and deletes are denied.

The contact form also uses a honeypot field and client-side validation, but these controls should be considered defense-in-depth rather than authoritative security.

See [`docs/security.md`](docs/security.md).

## Current Status

The repository currently contains:

- responsive portfolio pages
- data-driven project catalogue
- project technology filters
- case-study detail pages
- GitHub README rendering
- route-level SEO
- generated sitemap and robots files
- Firebase contact submission
- Firestore security rules
- theme persistence
- project search
- Vercel Analytics
- Vitest/Testing Library tests

The repository is actively maintained; project content and media have recently been updated.

## Documentation

| Document                                  | Purpose                                                             |
| ----------------------------------------- | ------------------------------------------------------------------- |
| [`architecture.md`](docs/architecture.md) | Application structure, data flow, modules, and design decisions     |
| [`security.md`](docs/security.md)         | Firestore, client validation, secrets, API, and deployment security |
| [`deployment.md`](docs/deployment.md)     | Vercel/Firebase deployment and environment configuration            |
| [`phases.md`](docs/phases.md)             | Logical implementation milestones and current roadmap               |

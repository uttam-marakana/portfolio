# Portfolio Architecture

## 1. Overview

Portfolio is a client-side React single-page application built with Vite.

The architecture is intentionally lightweight:

```text
Browser
  │
  ├── React application
  │     ├── Router
  │     ├── Shared contexts
  │     ├── Reusable components
  │     ├── Route pages
  │     └── Data/content modules
  │
  ├── GitHub REST API
  │     └── Public repository README / repository metadata
  │
  └── Firebase Firestore
        └── Contact submissions
```

The application does not contain a traditional backend server. Business logic that requires trusted authorization is delegated to Firestore Security Rules.

## 2. Application Layers

### Bootstrap layer

`src/main.jsx`

Responsibilities:

- mount the React application;
- enable React Strict Mode;
- initialize theme context;
- initialize search context.

### Application shell

`src/App.jsx`

Responsibilities:

- initialize `BrowserRouter`;
- render persistent navbar/footer;
- lazy-load major pages and shared chrome;
- render route definitions;
- render scroll restoration;
- initialize Vercel Analytics.

### Presentation layer

`src/pages/`

Route-level screens:

- `Home`
- `About`
- `Services`
- `Resume`
- `Projects`
- `TechProjects`
- `ProjectDetails`
- `Contact`
- `NotFound`

### Shared UI layer

`src/components/`

Reusable elements include:

- `Navbar`
- `Drawer`
- `Footer`
- `ProjectCard`
- `BackButton`
- `PageTransition`
- `ReadmeTOC`
- `ScrollToTop`
- `SocialLinks`

### State/context layer

`src/context/`

The project uses two small shared contexts:

- `ThemeContext` — current theme and toggle action
- `SearchContext` — current project search term

No global state library is currently required.

### Content/data layer

`src/data/`

- `personal.js` — profile information
- `projectsData.js` — project catalogue and case-study content

This keeps portfolio content independent from page components.

### Service layer

`src/services/`

- `firebase.js` — Firebase application and Firestore initialization
- `githubReadme.js` — GitHub README retrieval

External integration code is kept outside the page components.

### Utility/SEO layer

`src/hooks/`

- `usePageSeo.js` — route-level SEO state
- `useGitHubStats.js` — repository statistics retrieval

`src/lib/site.js` provides site identity and absolute URL helpers.

## 3. Routing

React Router defines:

```text
/
├── /about
├── /services
├── /resume
├── /projects
│   └── /projects/:tech
│       └── /projects/details/:id
├── /contact
└── *
```

`/projects/:tech` is data-driven and currently represents the Shopify and React tracks.

`/projects/details/:id` resolves a project from `projectsData.js`.

Unknown project IDs render the project-not-found state and set the page to `noindex`.

## 4. Route Loading

Major pages and persistent navigation/footer components are lazy-loaded with React `lazy()` and rendered through `Suspense`.

This keeps the initial application shell smaller and lets route-level modules load as needed.

A lightweight page loader is displayed while the route component loads.

## 5. Project Data Flow

```text
projectsData.js
      │
      ├── Home
      │     └── featured projects
      │
      ├── Projects
      │     └── full catalogue + search
      │
      ├── TechProjects
      │     └── technology filter + search
      │
      ├── ProjectCard
      │
      └── ProjectDetails
            ├── case-study fields
            ├── gallery
            ├── GitHub README
            └── route SEO
```

A project should therefore be added to the data model rather than by creating another project-specific page.

## 6. Search Flow

```text
Navbar search input
       │
       ▼
SearchContext
       │
       ├── navigate to /projects when needed
       │
       ▼
Projects / TechProjects
       │
       ▼
searchable project fields
       │
       ▼
filtered project cards
```

The search is client-side. It scans the project's title, role, sector, timeline, narrative fields, stack, services, constraints, process, results, and highlights.

## 7. Theme Flow

```text
localStorage("theme")
        │
        ▼
ThemeProvider
        │
        ├── dark
        └── light
              │
              ▼
document.documentElement.classList
```

The default theme is dark when no previous value exists.

Theme state is persisted in browser `localStorage`.

## 8. SEO Architecture

Each route that calls `usePageSeo()` can define:

- title
- description
- canonical path
- image
- content type
- keywords
- robots/noindex behavior
- JSON-LD schema

`usePageSeo()` updates the document head in the browser.

At build time, `vite.config.js` generates `sitemap.xml` and `robots.txt` from:

- static routes
- technology routes derived from project data
- project detail routes derived from project IDs

This keeps the sitemap synchronized with the content model.

## 9. GitHub Integration

Selected projects include a repository reference such as:

```text
owner/repository
```

`fetchReadme()` normalizes the reference and requests:

```text
GET https://api.github.com/repos/{owner}/{repo}/readme
```

The request asks GitHub for raw README content.

`ProjectDetails`:

1. detects whether the project has a GitHub repository;
2. fetches the README;
3. caches the returned content by repository in component state;
4. renders Markdown through `ReactMarkdown`;
5. falls back to a short unavailable message when the request fails.

No GitHub authentication token is stored in the frontend.

## 10. Contact Data Flow

```text
Contact form
    │
    ├── required-field validation
    ├── email validation
    ├── message-length validation
    ├── honeypot check
    └── Firebase configuration check
          │
          ▼
       Firestore
       contacts/
          │
          ▼
   Firestore Security Rules
```

A successful document contains:

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

`createdAt` is generated with Firestore `serverTimestamp()`.

The client does not read submitted contact records.

## 11. Firestore Boundary

The application does not expose a custom API for contact submissions.

Instead:

- the browser uses the Firebase Web SDK;
- Firestore receives the request;
- Firestore Rules validate the document;
- reads/updates/deletes are denied.

This is suitable for the current small contact workflow. A larger contact-management system would justify moving submission handling behind a trusted backend/function.

## 12. Static Assets

Public assets live under `public/assets/` and are referenced using root-relative URLs.

The repository contains:

- profile imagery
- project hero images
- project gallery images
- Shopify/React category banners
- resume PDF
- favicon

Large image files are part of the deployment payload and should be considered when optimizing future builds.

## 13. Styling Architecture

Tailwind CSS 4 is integrated through `@tailwindcss/vite`.

`src/index.css` contains the broader visual system and reusable custom utility/class definitions.

Components primarily compose Tailwind utility classes with project-specific classes such as:

- `premium-panel`
- `premium-button`
- `section-title`
- `section-copy`
- `metric-card`
- `page-shell`

The visual system is therefore shared across pages instead of being duplicated in route components.

## 14. Testing Architecture

Vitest runs in a jsdom environment.

`vitest.setup.js` provides browser API mocks required by the application:

- `matchMedia`
- `scrollTo`
- `IntersectionObserver`
- Vercel Analytics

Testing Library is used for UI behavior.

Tests currently cover:

- route rendering
- navbar search
- theme persistence
- BackButton history/fallback
- contact validation/submission
- project detail README fallback

## 15. Key Design Decisions

### Data-driven project content

Project content is centralized so new projects do not require new route components.

### Client-side architecture

The site is primarily a static SPA, which keeps hosting simple and matches the portfolio use case.

### Firebase Rules as the authorization boundary

The contact form is public by design, so the application uses strict Firestore rules to constrain writes.

### GitHub as supporting content

Public repository READMEs add technical context without replacing the curated portfolio case study.

### Build-generated SEO files

The sitemap and robots file are generated from the same project data used by the UI, reducing manual route duplication.

## 16. Current Architectural Limits

The current architecture is intentionally small, but the following constraints should be recognized:

- GitHub API calls are client-side and therefore subject to public API rate limits.
- Firestore contact creation is directly exposed to the browser and depends on Firestore Rules for abuse resistance.
- Route-level SEO metadata is updated client-side rather than generated by SSR.
- Large public image assets can increase deployment and page-transfer cost.
- There is no server-side contact processing, email notification pipeline, or moderation layer.

These are acceptable for the current portfolio scope but should be reconsidered if traffic or business-critical contact handling increases.

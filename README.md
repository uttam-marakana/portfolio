# Uttam Marakana Portfolio

A data-driven portfolio built with React, Vite, Tailwind CSS, Firebase Firestore, and GitHub README integration.

This repo is not just a static personal site. It is structured as a portfolio system with:

- case-study style project pages
- route-level SEO metadata
- generated `sitemap.xml` and `robots.txt`
- responsive layouts for desktop, tablet, and mobile
- Firebase-backed contact handling
- resume integration
- a services page for clearer business positioning

## Who This Repo Helps

- Recruiters who want to understand the scope and quality of the portfolio quickly
- Clients who want to see what kind of Shopify and React work is offered
- Frontend developers who want a reference for a content-driven React portfolio
- Anyone looking for an example of a portfolio that combines curated case-study content with live GitHub README content

## Core Features

- Home, About, Services, Projects, Project Details, Contact, and 404 pages
- Data-driven project catalogue from [`src/data/projectsData.js`](src/data/projectsData.js)
- Case-study project detail pages with:
  - overview
  - challenge
  - constraints
  - delivery approach
  - process
  - results
  - supporting GitHub README rendering when available
- Global project search from the navbar
- Scroll-to-top route transitions
- Responsive navigation with drawer menu and mobile search
- Resume download/open flow from the About page
- SEO support:
  - canonical URLs
  - Open Graph and Twitter metadata
  - JSON-LD schema
  - generated `robots.txt`
  - generated `sitemap.xml`
- Firebase Firestore contact form with client validation and honeypot field
- Light/dark theme support
- Vercel Analytics integration

## Tech Stack

- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Firebase Firestore
- React Markdown + `remark-gfm`
- React Icons
- Vercel Analytics
- ESLint

## Local Development

```bash
git clone https://github.com/uttam-marakana/portfolio.git
cd portfolio
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Create `.env` from `.env.example` and provide:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_SITE_URL`

Notes:

- The contact form remains disabled until the Firebase values are present.
- `VITE_SITE_URL` is used to generate canonical URLs, `robots.txt`, and `sitemap.xml` during production builds.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  assets/                  Static app assets
  components/              Shared UI components
  context/                 Theme and search state
  data/                    Portfolio content models
  hooks/                   Reusable hooks like SEO handling
  lib/                     Shared site metadata helpers
  pages/                   Route-level pages
  services/                Firebase and GitHub README fetchers
  App.jsx                  Route shell
  main.jsx                 App bootstrap
public/
  assets/docs/             Resume PDF
  assets/images/           Project and page images
firestore.rules            Firestore write rules for contact form
firebase.json              Firebase config
vite.config.js             Build config + sitemap/robots generation
```

## How Project Content Works

Projects are defined in [`src/data/projectsData.js`](src/data/projectsData.js).

Each entry includes:

- core card fields like `title`, `shortDescription`, `image`, `tech`
- case-study fields like `problem`, `solution`, `impact`
- deeper narrative fields like `timeline`, `services`, `constraints`, `process`, and `results`
- optional `github` and `preview` links

This lets the site generate:

- project cards
- filtered project listings
- detailed case-study pages
- README-backed technical notes when a public GitHub repo is available

## How SEO Works

SEO is handled through [`src/hooks/usePageSeo.js`](src/hooks/usePageSeo.js) and [`src/lib/site.js`](src/lib/site.js).

Each main route sets:

- page title
- description
- canonical URL
- Open Graph metadata
- Twitter card metadata
- structured data

`vite.config.js` also generates `sitemap.xml` and `robots.txt` during build time.

## Firestore Rules

Firestore rules live in [`firestore.rules`](firestore.rules).

They are configured to allow controlled unauthenticated `create` access for the portfolio contact form only when the submitted payload matches the expected shape and field constraints.

## How To Add A New Project

1. Add the project image to `public/assets/images/`
2. Add a new entry in [`src/data/projectsData.js`](src/data/projectsData.js)
3. Include:
   - `id`
   - `tech`
   - `title`
   - `sector`
   - `role`
   - `timeline`
   - `shortDescription`
   - `overview`
   - `problem`
   - `solution`
   - `impact`
   - `stack`
   - `services`
   - `constraints`
   - `process`
   - `results`
   - `highlights`
4. Add `github` if the repo is public and should render README content
5. Add `preview` if a live URL exists

This is enough for the project to appear automatically in:

- the main project catalogue
- technology-specific pages
- the homepage featured section if `featured: true`
- the project detail case-study page
- the generated sitemap

## Why This Repo Is Useful To Others

This repo shows a practical pattern for:

- building a portfolio from structured content instead of hardcoded pages
- combining curated case-study writing with live GitHub technical documentation
- shipping SEO support without a server-rendered framework
- keeping a React portfolio maintainable as more projects are added
- improving frontend presentation without losing code clarity

## Quality Checks

Before shipping changes:

```bash
npm run lint
npm run build
```

## Current Status

The repo currently includes:

- responsive public pages
- project case-study rendering
- a services page
- resume integration
- improved project media handling in cards
- route scroll reset
- SEO and technical metadata

## Next Useful Improvements

- Add a dedicated `/resume` page
- Add screenshot galleries inside project detail pages
- Optimize large image assets further
- Add automated tests for routing, contact validation, and project rendering
- Move contact submission behind a backend endpoint or function for stronger reliability

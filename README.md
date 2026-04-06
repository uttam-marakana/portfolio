# Uttam Marakana Portfolio

Personal portfolio built with React, Vite, Tailwind CSS, Firebase Firestore, and GitHub README integration.

## Current Scope

- Home, About, Projects, Project Details, Contact, and 404 pages
- Project search from the global navbar
- Project detail pages with GitHub README rendering
- Firebase-backed contact form with client validation and Firestore rules
- Light/dark theme support

## Stack

- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Firebase Firestore
- React Markdown + remark-gfm
- Vercel Analytics

## Local Setup

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

The contact form stays disabled until these values are present.

`VITE_SITE_URL` is used to generate canonical URLs, `robots.txt`, and `sitemap.xml` during the production build.

## Quality Checks

```bash
npm run lint
npm run build
```

## Firestore Rules

Firestore rules live in [firestore.rules](/home/a/Desktop/Uttam/Docs/Projects/Git_Repo/portfolio/firestore.rules).

They only allow unauthenticated `create` requests to the `contacts` collection when the payload shape and field constraints match the portfolio form.

## Project Structure

```text
src/
  components/
  context/
  data/
  pages/
  services/
  App.jsx
  main.jsx
public/
  assets/images/
firestore.rules
firebase.json
```

## Known Next Priorities

- Add dedicated case study pages instead of README-led detail pages
- Optimize and compress large image assets
- Add SEO metadata, sitemap, robots.txt, and structured data
- Add automated tests for routing and the contact flow

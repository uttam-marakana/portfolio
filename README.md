# Uttam Marakana — Portfolio Website

A modern, responsive portfolio website built using **ReactJS + Vite**, designed to showcase professional experience, completed projects, and provide a structured hiring interface.

This project is not just a portfolio showcase — it is built as a **work-output system**, integrating GitHub repositories, professional experience, and a Firebase-powered contact workflow.

---

## Live Purpose

The portfolio is designed to:

- Present professional experience clearly
- Showcase ReactJS and Shopify development work
- Display completed and ongoing projects
- Automatically integrate GitHub repositories
- Capture client inquiries through Firebase Firestore
- Provide a scalable foundation for future case studies

---

## Tech Stack

### Frontend

- ReactJS
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Icons

### Backend / Services

- Firebase Firestore (Contact form data storage)
- GitHub REST API (Project integration)

---

## Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Drawer.jsx
│   ├── Footer.jsx
│   ├── ProjectCard.jsx
│   └── SocialLinks.jsx
│
├── context/
│   └── SearchContext.jsx
│
├── data/
│   ├── personal.js
│   └── projects.js
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── About.jsx
│   └── Contact.jsx
│
├── services/
│   ├── firebase.js
│   └── githubApi.js
│
├── App.jsx
└── main.jsx
```

---

## Features

### ✅ Responsive Portfolio Layout

- Desktop, tablet, and mobile optimized
- Drawer navigation for smaller screens
- Modern typography and spacing system

### ✅ Dynamic Projects System

- Manual professional projects (Shopify / client work)
- Auto-fetched GitHub repositories
- Unified project grid layout

### ✅ Global Search

- Navbar search input
- Filters projects dynamically
- Context-based state management

### ✅ Contact / Hire System

- Contact form integrated with Firebase Firestore
- Stores inquiries securely
- Serverless architecture

---

## Contact Form Flow

```
User submits form
        ↓
React Contact Page
        ↓
Firebase SDK
        ↓
Firestore Database (contacts collection)
```

Stored fields:

- Name
- Email
- Project Type
- Message
- Timestamp

---

## Firestore Security Rules

Only form submissions are allowed:

```js
match /contacts/{document} {
  allow create: if true;
  allow read, update, delete: if false;
}
```

---

## Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/uttam-marakana/portfolio.git
cd portfolio
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

---

## Firebase Setup

1. Create Firebase project
2. Enable Firestore Database
3. Create `firebase.js` inside `/services`
4. Add Firebase configuration keys

---

## Future Improvements

- Case study pages for projects
- GitHub project filtering by tech stack
- Email notification on form submission
- Admin dashboard for inquiries
- SEO optimization and meta management

---

## Author

**Uttam Marakana**
Shopify & ReactJS Developer

- GitHub: [https://github.com/uttam-marakana](https://github.com/uttam-marakana)
- LinkedIn: Uttam Marakana
- Email: [uttammarakana03@gmail.com](mailto:uttammarakana03@gmail.com)

---

## License

This project is open for learning and reference purposes.

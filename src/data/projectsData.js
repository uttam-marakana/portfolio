import alpine from "../../public/assets/images/alpine-selection.png";
import catalan from "../../public/assets/images/catalan-gourmet.png";
import notes from "../../public/assets/images/multi-note-app.png";
import p2care from "../../public/assets/images/p2care.png";
import portfolio from "../../public/assets/images/portfolio.png";

const projectsData = [
  /* ================= SHOPIFY ================= */

  {
    id: "alpine-selection",
    tech: "shopify",

    title: "Alpine Selection Store",

    shortDescription:
      "Performance-focused Shopify storefront with structured UI and optimized layouts.",

    overview:
      "Shopify storefront focused on performance, structured layout hierarchy, and improved customer navigation experience.",

    image: alpine,

    preview: "https://uttam-rootways.myshopify.com",

    highlights: [
      "Shopify theme customization",
      "Responsive storefront layout",
      "Optimized product templates",
      "Performance-focused UI improvements",
    ],
  },

  {
    id: "catalan-gourmet",
    tech: "shopify",

    title: "Catalan Gourmet Store",

    shortDescription:
      "Shopify storefront UI improvement and responsive experience optimization.",

    overview:
      "Shopify customization project improving UI consistency and product browsing experience.",

    image: catalan,

    preview: "https://dev-calatan-gourmet.myshopify.com",

    highlights: [
      "Theme customization",
      "Product page improvements",
      "Navigation restructuring",
      "Responsive UI adjustments",
    ],
  },

  /* ================= REACT ================= */

  {
    id: "multi-notes-app",
    tech: "react",

    title: "Multi Notes App",

    shortDescription:
      "Multi-board notes application with Firebase persistence.",

    overview:
      "React-based notes system supporting multiple boards with real-time Firestore storage.",

    image: notes,

    github: "uttam-marakana/multi-notes-app",
    preview: "#",

    highlights: [
      "Firebase Firestore integration",
      "Component-driven architecture",
      "Real-time updates",
      "Responsive dashboard UI",
    ],
  },

  {
    id: "p2care-website",
    tech: "react",

    title: "P2Care Website",

    shortDescription: "Healthcare service platform with booking workflow UI.",

    overview:
      "Frontend system designed for healthcare services with scalable UI components.",

    image: p2care,

    github: "uttam-marakana/p2care",

    preview: "#",

    highlights: [
      "API integration",
      "Responsive layout system",
      "Component architecture",
      "Performance optimization",
    ],
  },

  {
    id: "portfolio",
    tech: "react",

    title: "Developer Portfolio",

    shortDescription:
      "Modern portfolio with GitHub README integration and Firebase contact system.",

    overview:
      "Portfolio built using React, Firebase and Tailwind focusing on performance and structured project presentation.",

    image: portfolio,

    github: "uttam-marakana/portfolio",

    preview: "#",

    highlights: [
      "GitHub README auto rendering",
      "Firebase contact workflow",
      "Component architecture",
      "Animated UI system",
    ],
  },
];

export default projectsData;
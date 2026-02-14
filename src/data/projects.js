import multiNotes from "../assets/images/multi-note-app.png";
import p2care from "../assets/images/p2care.png";
import alpine from "../assets/images/alpine-selection.png";
import catalan from "../assets/images/catalan-gourmet.png";

export const projects = [
  {
    id: "multi-notes",
    tech: "React",
    title: "Multi Notes App",
    overview:
      "Multi-board note management system with Firebase authentication.",
    description:
      "A productivity-focused notes system with authentication and real-time storage.",
    image: multiNotes,
    github: "#",
    preview: "#",
    readme: `
## Overview
Multi-board notes system built with React and Firebase.

## Features
- Authentication
- Responsive UI
- Firebase storage
`,
  },

  {
    id: "p2care",
    tech: "React",
    title: "P2Care Website",
    overview: "Healthcare service platform with booking workflow.",
    description: "Healthcare platform with structured UI and API integration.",
    image: p2care,
    github: "#",
    preview: "#",
    readme: `Project overview and implementation details.`,
  },

  {
    id: "alpine-selection",
    tech: "Shopify",
    title: "Alpine Selection Store",
    overview: "Custom Shopify storefront focused on performance.",
    description: "Shopify theme development with optimized layout.",
    image: alpine,
    preview: "https://uttam-rootways.myshopify.com",
    readme: `Shopify theme customization project.`,
  },

  {
    id: "catalan-gourmet",
    tech: "Shopify",
    title: "Catalan Gourmet Store",
    overview: "Responsive Shopify theme customization.",
    description: "Product and collection optimization for better UX.",
    image: catalan,
    preview: "https://dev-calatan-gourmet.myshopify.com",
    readme: `Shopify storefront development.`,
  },
];

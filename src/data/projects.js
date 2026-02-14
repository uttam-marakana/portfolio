import { lazy } from "react";

const Multi_Notes_App = lazy(() => import("../assets/multi-note-app.png"));
const P2Care_Website = lazy(() => import("../assets/p2care.png"));
const Alpine_Selection_Shopify = lazy(
  () => import("../assets/alpine-selection.png"));
const Catalan_Gourmet_Shopify = lazy(
  () => import("../assets/catalan-gourmet.png"));

export const projects = [
  {
    title: "Multi Notes App",
    description:
      "Multi-board note management system with Firebase authentication and responsive UI.",
    tech: "ReactJS, Firebase, Tailwind",
    image: { Multi_Notes_App },
    github: "#",
    preview: "#",
  },
  {
    title: "P2Care Website",
    description:
      "Healthcare service platform with booking workflow and responsive UI.",
    tech: "ReactJS, API Integration",
    image: { P2Care_Website },
    github: "#",
    preview: "#",
  },
  {
    title: "Alpine Selection Shopify Store",
    description:
      "Custom Shopify theme development with performance-focused storefront layout.",
    tech: "Shopify, Liquid",
    image: { Alpine_Selection_Shopify },
    preview: "https://uttam-rootways.myshopify.com",
  },
  {
    title: "Catalan Gourmet Shopify Store",
    description:
      "Shopify theme customization with responsive product and collection pages.",
    tech: "Shopify, Liquid",
    image: { Catalan_Gourmet_Shopify },
    preview: "https://dev-calatan-gourmet.myshopify.com",
  },
];

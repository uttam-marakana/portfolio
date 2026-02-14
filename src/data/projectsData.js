import alpine from "../assets/images/alpine-selection.png";
import notes from "../assets/images/multi-note-app.png";

export const projects = [
  {
    id: "alpine-selection",
    tech: "shopify",
    title: "Alpine Selection Store",
    description:
      "Custom Shopify storefront focused on performance and conversion optimization.",
    image: alpine,
    github: "#",
    preview: "#",
    readme: `
## Overview
Custom Shopify theme development.

## Features
- Performance optimized storefront
- Responsive layout
- Conversion focused UI
`,
  },

  {
    id: "multi-notes",
    tech: "react",
    title: "Multi Notes App",
    description: "Multi-board note management system using Firebase and React.",
    image: notes,
    github: "#",
    preview: "#",
    readme: `
## Overview
A React + Firebase notes application.

## Features
- Multi board notes
- Authentication
- Responsive UI
`,
  },
];

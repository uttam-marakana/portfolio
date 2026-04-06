const projectsData = [
  {
    id: "alpine-selection",
    tech: "shopify",
    featured: true,
    title: "Alpine Selection Store",
    sector: "Ecommerce / Merchandising",
    role: "Shopify storefront optimization",
    shortDescription:
      "A Shopify storefront cleanup focused on hierarchy, product discovery, and a more premium browsing experience.",
    overview:
      "A performance-aware Shopify implementation focused on clearer merchandising structure, stronger layout hierarchy, and a smoother product discovery flow.",
    problem:
      "The storefront needed cleaner visual hierarchy and better product navigation so visitors could browse collections and merchandising content with less friction.",
    solution:
      "I refined storefront structure, improved responsive layout behavior, tuned product templates, and tightened UI decisions around navigation and content grouping.",
    impact:
      "The result is a more composed buying journey with cleaner browsing paths, better visual consistency, and a storefront that feels more deliberate overall.",
    image: "/assets/images/alpine-selection.webp",
    preview: "https://uttam-rootways.myshopify.com",
    stack: [
      "Shopify",
      "Liquid",
      "Theme Customization",
      "Responsive Layouts",
      "Storefront UX",
    ],
    highlights: [
      "Shopify theme customization aligned to merchandising goals",
      "Responsive storefront layout improvements across key templates",
      "Cleaner product discovery flow with stronger hierarchy",
      "Performance-aware UI refinements without overcomplicating theme structure",
    ],
  },
  {
    id: "catalan-gourmet",
    tech: "shopify",
    featured: false,
    title: "Catalan Gourmet Store",
    sector: "Ecommerce / Food Retail",
    role: "Shopify UI and browsing optimization",
    shortDescription:
      "A Shopify refinement project focused on navigation quality, responsive behavior, and more coherent product browsing.",
    overview:
      "A Shopify customization project aimed at improving UI consistency and helping customers move through products and collection content with less friction.",
    problem:
      "The browsing experience needed clearer navigation, more stable responsive behavior, and stronger consistency across key shopping surfaces.",
    solution:
      "I reworked storefront sections, improved navigation patterns, refined layout responsiveness, and tightened visual consistency across the customer journey.",
    impact:
      "The storefront feels easier to scan and more trustworthy to shop through, with clearer structure and less visual drift between pages.",
    image: "/assets/images/catalan-gourmet.webp",
    preview: "https://dev-calatan-gourmet.myshopify.com",
    stack: [
      "Shopify",
      "Liquid",
      "Theme Editing",
      "Responsive UI",
      "Navigation UX",
    ],
    highlights: [
      "Theme customization focused on storefront consistency",
      "Navigation restructuring for cleaner customer flow",
      "Responsive UI adjustments across key templates",
      "Product page and browsing improvements for easier scanning",
    ],
  },
  {
    id: "multi-notes-app",
    tech: "react",
    featured: true,
    title: "Multi Notes App",
    sector: "Productivity / SaaS-style UI",
    role: "React application build",
    shortDescription:
      "A multi-board notes application with Firebase persistence and a dashboard-oriented interface.",
    overview:
      "A React-based notes system designed around multiple boards, persistent data, and a clean dashboard workflow for creating and organizing notes.",
    problem:
      "The goal was to create a notes interface that could handle multiple workspaces while staying fast, readable, and easy to extend.",
    solution:
      "I built a component-driven React app with Firebase Firestore persistence, multi-board note organization, and responsive dashboard-style interaction patterns.",
    impact:
      "The project demonstrates stronger state handling, persistent note management, and a more product-style approach than a simple CRUD example.",
    image: "/assets/images/multi-note-app.webp",
    github: "uttam-marakana/multi-notes-app",
    preview: "",
    stack: ["React", "Vite", "Firebase", "Firestore", "Responsive Dashboard UI"],
    highlights: [
      "Multiple note boards with clearer workspace separation",
      "Firebase Firestore integration for persistent note data",
      "Component-driven dashboard architecture",
      "Responsive UI tuned for practical everyday usage",
    ],
  },
  {
    id: "p2care-website",
    tech: "react",
    featured: false,
    title: "P2Care Website",
    sector: "Healthcare Platform",
    role: "Frontend system implementation",
    shortDescription:
      "A healthcare service platform focused on scalable UI structure and a cleaner appointment-oriented frontend.",
    overview:
      "A React frontend designed for healthcare services with scalable layout structure, reusable sections, and an interface prepared for service and booking workflows.",
    problem:
      "Healthcare service content needs to stay clear and trustworthy while still supporting multiple page types, user actions, and responsive layouts.",
    solution:
      "I implemented a modular React frontend with reusable UI patterns, responsive page structure, and integration-ready sections for service-oriented flows.",
    impact:
      "The project shows stronger component discipline and a clearer service-platform presentation than a static marketing site.",
    image: "/assets/images/p2care.webp",
    github: "uttam-marakana/p2care",
    preview: "",
    stack: ["React", "React Router", "API Integration", "Component Architecture"],
    highlights: [
      "Scalable healthcare-oriented layout system",
      "Component architecture designed for reuse across multiple screens",
      "Responsive behavior for service and booking flows",
      "Frontend structure prepared for API-backed experiences",
    ],
  },
  {
    id: "dhatru-care",
    tech: "react",
    featured: true,
    title: "Dhatru Care Platform",
    sector: "Healthcare / Admin Platform",
    role: "React + Firebase platform build",
    shortDescription:
      "A hospital platform with public website, admin dashboard, role-based auth, and Firestore-backed content management.",
    overview:
      "Dhatru Care is a healthcare platform built with React and Firebase, combining a public-facing hospital website with an admin dashboard, appointment-oriented flows, and role-based access control.",
    problem:
      "The product needed to support both the public hospital experience and internal admin workflows without collapsing into one messy frontend surface.",
    solution:
      "I structured the platform around React routing, admin domain separation, Firebase Authentication, Firestore data management, protected routes, and modular UI sections.",
    impact:
      "The result is a more production-oriented React system that demonstrates admin/public separation, serverless platform architecture, and healthcare-specific workflow thinking.",
    image: "/assets/images/p2care.webp",
    github: "uttam-marakana/dhatru-care",
    preview: "https://dhatrucare.vercel.app",
    stack: [
      "React",
      "Vite",
      "Firebase Auth",
      "Firestore",
      "Tailwind CSS",
      "Formik + Yup",
    ],
    highlights: [
      "Public website plus admin dashboard in one structured frontend system",
      "Role-based access control with protected routes",
      "Firestore-backed content and appointment-oriented data handling",
      "Bulk JSON upload workflow for admin-side content management",
    ],
  },
  {
    id: "tradeos-dashboard",
    tech: "react",
    featured: true,
    title: "TradeOS Dashboard",
    sector: "Trading / Analytics Platform",
    role: "React execution intelligence dashboard",
    shortDescription:
      "A trading decision-control system focused on discipline, pre-trade validation, risk enforcement, and behavioral analytics.",
    overview:
      "TradeOS is a React dashboard designed as an execution intelligence system for traders, combining immutable trade logs, pre-trade analysis, enforcement rules, scoring, and performance analytics in one operator-facing interface.",
    problem:
      "Most trading interfaces stop at charting or logging. The harder problem is preventing emotional entries, enforcing session rules, and giving traders a clearer operating system before they commit to a trade.",
    solution:
      "I structured the product around React components, reusable calculation utilities, session stores, and dedicated enforcement engines for risk, discipline, execution validation, analytics, and behavior warnings. The system evaluates trades before execution instead of only reporting after the fact.",
    impact:
      "The result feels closer to a serious trading control layer than a generic dashboard demo, showing stronger product thinking around discipline, decision support, and measurable execution quality.",
    image: "/assets/images/tradeos.png",
    github: "uttam-marakana/trading-dashboard",
    preview: "",
    stack: [
      "React",
      "Vite",
      "Bootstrap",
      "Formik",
      "Recharts",
      "LocalStorage",
      "Day.js",
    ],
    highlights: [
      "Pre-trade intelligence with risk, R:R, net PnL, and break-even preview",
      "Execution engine that can block invalid or high-risk trades before entry",
      "Discipline system with daily trade caps, loss limits, and session lock rules",
      "Behavioral analytics for overtrading, expectancy drift, and repeated mistakes",
    ],
  },
  {
    id: "portfolio",
    tech: "react",
    featured: true,
    title: "Developer Portfolio",
    sector: "Personal Brand / Frontend Showcase",
    role: "Design and frontend implementation",
    shortDescription:
      "A portfolio system focused on project storytelling, GitHub README integration, and stronger frontend presentation.",
    overview:
      "This portfolio combines project presentation, GitHub README rendering, contact workflow, SEO improvements, and a more premium UI system in one React application.",
    problem:
      "A portfolio should not just list projects. It needs to signal implementation quality, writing quality, reliability, and taste in a single pass.",
    solution:
      "I built the site with React, structured data-driven project pages, Firebase contact handling, SEO tooling, and a redesigned visual system focused on stronger hierarchy.",
    impact:
      "The portfolio now works as both a project catalogue and a signal of frontend judgment, not just a static personal page.",
    image: "/assets/images/portfolio.webp",
    github: "uttam-marakana/portfolio",
    preview: "",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Firebase",
      "GitHub API",
      "SEO Metadata",
    ],
    highlights: [
      "Project data model designed around case-study style content",
      "GitHub README rendering for technical context",
      "SEO metadata, sitemap, and canonical URL generation",
      "Phase-based UI redesign aimed at stronger premium presentation",
    ],
  },
];

export default projectsData;


import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import personal from "../data/personal";
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";
import projectsData from "../data/projectsData";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";
import profileImage from "../assets/profile.webp";

const metrics = [
  { value: "3+", label: "Years in product-facing frontend work" },
  { value: "2 Tracks", label: "Shopify systems and React applications" },
  { value: "Fast", label: "Performance-aware delivery from first pass" },
];

const capabilities = [
  {
    title: "Storefront Systems",
    body: "Section architecture, responsive merchandising layouts, and Shopify theme work tuned for cleaner buying journeys.",
    accent: "Shopify / CRO",
  },
  {
    title: "Frontend Delivery",
    body: "React interfaces with structured components, better state flow, and practical API integration that stays maintainable.",
    accent: "React / UI",
  },
  {
    title: "Performance Discipline",
    body: "Asset control, responsive behavior, and implementation decisions that reduce friction before optimization becomes a rescue task.",
    accent: "Perf / QA",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Frame the problem",
    body: "Clarify the page goal, user friction, and what the interface must actually improve.",
  },
  {
    step: "02",
    title: "Structure the system",
    body: "Create clear layout hierarchy, reusable sections, and a cleaner content model before styling.",
  },
  {
    step: "03",
    title: "Ship with pressure",
    body: "Build responsive, reliable UI that works under real content and edge-case constraints.",
  },
  {
    step: "04",
    title: "Tighten the details",
    body: "Review motion, polish, and performance so the final product feels intentional instead of merely complete.",
  },
];

export default function Home() {
  const sectionsRef = useRef([]);
  const featuredProjects = projectsData.slice(0, 3);

  usePageSeo({
    title: "Uttam Marakana | Shopify & React Developer",
    description: personal.summary,
    path: "/",
    image: profileImage,
    keywords: [
      "Shopify developer",
      "React developer",
      "frontend developer",
      "portfolio",
      "ecommerce developer",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personal.name,
      jobTitle: personal.role,
      email: personal.email,
      telephone: personal.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rajkot",
        addressRegion: "Gujarat",
        addressCountry: "India",
      },
      url: getAbsoluteUrl("/"),
      image: getAbsoluteUrl(profileImage),
      sameAs: [
        "https://github.com/uttam-marakana",
        "https://www.linkedin.com/in/uttam-marakana-b65938244",
      ],
    },
  });

  /* ================= SCROLL REVEAL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.15 },
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const revealClass =
    "opacity-0 translate-y-10 transition-all duration-700 ease-out";

  return (
    <PageTransition>
      <section className="px-3 pt-6">
        <div className="page-shell premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="eyebrow">Available for freelance and product work</span>
              <h1 className="display-title mt-6">
                Interfaces that feel sharper, faster, and more deliberate.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-2)]">
                {personal.summary} I work across Shopify storefronts and React
                products where cleaner structure, stronger hierarchy, and
                practical delivery matter more than visual noise.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/projects" className="premium-button premium-button--solid">
                  Explore Selected Work
                </Link>
                <Link to="/contact" className="premium-button premium-button--ghost">
                  Start a Conversation
                </Link>
              </div>

              <div className="mt-10 premium-grid md:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <p className="metric-value">{metric.value}</p>
                    <p className="metric-label mt-3">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-panel mx-auto max-w-md p-5 md:p-7">
              <div className="rounded-[1.75rem] border border-[var(--line-soft)] bg-[rgba(255,255,255,0.04)] p-4">
                <img
                  src={profileImage}
                  alt="Uttam Marakana profile"
                  fetchPriority="high"
                  width="320"
                  height="320"
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--line-soft)] pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-2)]">
                      Based in
                    </p>
                    <p className="mt-2 text-lg font-medium">{personal.location}</p>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-[radial-gradient(circle,var(--brand-2),transparent_70%)] opacity-70" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-[var(--line-soft)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                      Focus
                    </p>
                    <p className="mt-2 font-medium">React systems, storefront UX, implementation quality</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-[var(--line-soft)] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-2)]">
                      Working style
                    </p>
                    <p className="mt-2 font-medium">Calm delivery, practical scope, detail-heavy frontend execution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`px-3 pt-8 ${revealClass}`}
      >
        <div className="page-shell premium-panel px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="section-title mt-5">Projects with stronger structure and cleaner delivery</h2>
            </div>
            <p className="section-copy md:max-w-md">
              A compact selection of frontend and storefront work that reflects how I approach hierarchy, scale, and implementation detail.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`px-3 pt-8 ${revealClass}`}
      >
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">Core capabilities</span>
              <h2 className="section-title mt-5">The work is visual, but the value is structural.</h2>
              <p className="section-copy mt-5">
                Premium UI is not about adding more gradients. It comes from better hierarchy, cleaner content flow, and sharper execution under real constraints.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {capabilities.map((item) => (
                <article key={item.title} className="premium-panel p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--brand-2)]">
                    {item.accent}
                  </p>
                  <h3 className="mt-4 font-[var(--font-display)] text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-2)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`px-3 pt-8 ${revealClass}`}
      >
        <div className="page-shell premium-panel px-6 py-8 md:px-10">
          <span className="eyebrow">Approach</span>
          <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="section-title max-w-2xl">A workflow built to reduce waste before polish begins.</h2>
            <p className="section-copy md:max-w-md">
              I prefer clear system thinking up front so design, build quality, and performance do not fight each other later.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.step} className="premium-panel p-6">
                <p className="font-[var(--font-display)] text-4xl text-[var(--brand-1)]">
                  {step.step}
                </p>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-2)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className={`px-3 py-8 ${revealClass}`}
      >
        <div className="page-shell premium-panel px-6 py-10 md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="eyebrow">Open for new work</span>
              <h2 className="section-title mt-5">If the product needs sharper UI and cleaner frontend delivery, let’s talk.</h2>
              <p className="section-copy mt-5">
                I can help with Shopify storefront improvements, React interfaces, or a practical pass over frontend quality where the current system feels heavy or inconsistent.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                to="/contact"
                className="premium-button premium-button--solid"
              >
                Book the conversation
              </Link>
              <Link
                to="/projects"
                className="premium-button premium-button--ghost"
              >
                Review project work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

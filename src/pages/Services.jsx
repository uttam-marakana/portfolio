import { Link } from "react-router-dom";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";
import PageTransition from "../components/PageTransition";

const serviceTracks = [
  {
    title: "Shopify Storefront Work",
    eyebrow: "Shopify",
    body: "Theme customization, section architecture, collection flow cleanup, product template refinement, and premium storefront polish without unnecessary complexity.",
    deliverables: [
      "Theme customization and section work",
      "Collection and product page improvements",
      "Responsive storefront cleanup",
      "Conversion-aware UX refinement",
    ],
  },
  {
    title: "React Frontend Builds",
    eyebrow: "React",
    body: "Dashboard interfaces, admin panels, service-platform frontends, and structured component systems built to stay maintainable as the product grows.",
    deliverables: [
      "Dashboard and admin panel implementation",
      "Routing, state, and reusable component structure",
      "API-backed frontend integration",
      "Responsive interface delivery across breakpoints",
    ],
  },
  {
    title: "UI Cleanup and Refactors",
    eyebrow: "Refinement",
    body: "When a product already exists but feels messy, I focus on hierarchy, spacing, structure, and interaction cleanup so the frontend becomes easier to trust and easier to extend.",
    deliverables: [
      "Layout and hierarchy corrections",
      "Component cleanup and consolidation",
      "Design consistency improvements",
      "Frontend quality pass on existing pages",
    ],
  },
];

const workflow = [
  {
    step: "01",
    title: "Audit the current surface",
    body: "Review the existing pages, constraints, pain points, and where the interface is losing clarity or momentum.",
  },
  {
    step: "02",
    title: "Define the practical scope",
    body: "Separate real product needs from decorative requests so the build stays useful and realistic.",
  },
  {
    step: "03",
    title: "Implement and tighten",
    body: "Ship the frontend work with cleaner structure, responsive behavior, and fewer weak UI decisions.",
  },
  {
    step: "04",
    title: "Polish for production",
    body: "Finish with QA, responsive cleanup, and detail-level refinement so the result feels intentional on real screens.",
  },
];

const fitSignals = [
  "Shopify stores that need stronger hierarchy and a more premium customer journey",
  "React apps that need cleaner architecture, clearer UI, or admin/dashboard delivery",
  "Existing frontends that feel inconsistent, crowded, or weak across responsive breakpoints",
  "Teams that want practical implementation quality instead of purely decorative redesign work",
];

export default function Services() {
  usePageSeo({
    title: "Services",
    description:
      "Shopify development, React frontend builds, UI cleanup, responsive fixes, and practical frontend support by Uttam Marakana.",
    path: "/services",
    image: "/assets/images/portfolio.webp",
    keywords: [
      "Shopify services",
      "React development services",
      "frontend freelancer",
      "UI refactor services",
      "responsive frontend fixes",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      provider: {
        "@type": "Person",
        name: "Uttam Marakana",
        url: getAbsoluteUrl("/"),
      },
      areaServed: "Remote",
      serviceType: "Shopify and React frontend development",
      url: getAbsoluteUrl("/services"),
    },
  });

  return (
    <PageTransition>
      <section className="px-3 pt-6 pb-8">
        <div className="page-shell space-y-8">
          <div className="premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
              <div>
                <span className="eyebrow">Services</span>
                <h1 className="section-title mt-5">
                  Frontend work that improves structure, clarity, and delivery quality.
                </h1>
                <p className="section-copy mt-5">
                  I work on Shopify storefronts and React applications where the
                  interface needs to feel cleaner, more premium, and more reliable
                  across desktop, tablet, and mobile screens.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/contact"
                    className="premium-button premium-button--solid"
                  >
                    Start a Project
                  </Link>
                  <Link
                    to="/projects"
                    className="premium-button premium-button--ghost"
                  >
                    Review Case Studies
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="metric-card">
                  <p className="metric-value">Shopify</p>
                  <p className="metric-label mt-3">Storefront and merchandising work</p>
                </div>
                <div className="metric-card">
                  <p className="metric-value">React</p>
                  <p className="metric-label mt-3">Dashboards, apps, and admin interfaces</p>
                </div>
                <div className="metric-card">
                  <p className="metric-value">Refine</p>
                  <p className="metric-label mt-3">Fix weak hierarchy and inconsistent UI</p>
                </div>
                <div className="metric-card">
                  <p className="metric-value">Responsive</p>
                  <p className="metric-label mt-3">Tighten behavior across real breakpoints</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {serviceTracks.map((service) => (
              <article key={service.title} className="premium-panel p-6 md:p-8">
                <span className="eyebrow">{service.eyebrow}</span>
                <h2 className="section-title mt-5">{service.title}</h2>
                <p className="mt-5 text-sm leading-8 text-[var(--text-2)] md:text-base">
                  {service.body}
                </p>

                <div className="mt-8 grid gap-3">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 text-sm leading-7 text-[var(--text-2)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">How I work</span>
              <h2 className="section-title mt-5">
                A practical process built around delivery, not noise.
              </h2>
              <div className="mt-8 grid gap-4">
                {workflow.map((item) => (
                  <article
                    key={item.step}
                    className="rounded-[1.5rem] border border-[var(--line-soft)] bg-white/6 px-5 py-5"
                  >
                    <div className="flex gap-4">
                      <p className="font-[var(--font-display)] text-3xl text-[var(--brand-1)]">
                        {item.step}
                      </p>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-2)]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">Best fit</span>
              <h2 className="section-title mt-5">
                Projects where this work tends to create the most value.
              </h2>
              <div className="mt-8 grid gap-4">
                {fitSignals.map((item) => (
                  <article
                    key={item}
                    className="rounded-[1.5rem] border border-[var(--line-soft)] bg-white/6 px-5 py-5 text-sm leading-7 text-[var(--text-2)] md:text-base"
                  >
                    {item}
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-[var(--line-soft)] bg-white/6 p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">
                  Need a cleaner frontend pass?
                </p>
                <p className="mt-3 text-base leading-8 text-[var(--text-2)]">
                  If the current product already exists but feels inconsistent,
                  crowded, or unreliable across breakpoints, that is usually the
                  best place for me to help.
                </p>
                <div className="mt-6">
                  <Link
                    to="/contact"
                    className="premium-button premium-button--solid"
                  >
                    Send the brief
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

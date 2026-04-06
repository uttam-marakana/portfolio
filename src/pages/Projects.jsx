import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaShopify, FaReact } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projectsData";
import { SearchContext } from "../context/search-context";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

const categoryCards = [
  {
    tech: "shopify",
    title: "Shopify Development",
    description: [
      "Custom Shopify theme development",
      "Performance-focused storefront architecture",
      "Conversion-oriented UI implementation",
      "Section-based scalable theme structure",
      "Responsive and optimized shopping experience",
    ],
    icon: FaShopify,
    iconClassName: "text-3xl text-green-500",
    image: "/assets/images/shopify-banner.webp",
    edgeGradient:
      "linear-gradient(120deg, rgba(34,197,94,0.25), transparent 40%, transparent 60%, rgba(34,197,94,0.25))",
  },
  {
    tech: "react",
    title: "ReactJS Development",
    description: [
      "Component-driven frontend architecture",
      "API-integrated web applications",
      "Dashboard and admin panel development",
      "Performance optimized UI rendering",
      "Scalable and maintainable code structure",
    ],
    icon: FaReact,
    iconClassName: "text-3xl text-cyan-400",
    image: "/assets/images/reactjs-banner.webp",
    edgeGradient:
      "linear-gradient(120deg, rgba(56,189,248,0.25), transparent 40%, transparent 60%, rgba(56,189,248,0.25))",
  },
];

function matchesProject(project, searchTerm) {
  if (!searchTerm) return true;

  const searchableContent = [
    project.title,
    project.role,
    project.sector,
    project.shortDescription,
    project.overview,
    project.problem,
    project.solution,
    project.impact,
    project.tech,
    ...project.stack,
    ...project.highlights,
  ]
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(searchTerm);
}

export default function Projects() {
  const { searchTerm } = useContext(SearchContext);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const totalProjects = projectsData.length;

  const filteredProjects = useMemo(
    () => projectsData.filter((project) => matchesProject(project, normalizedSearchTerm)),
    [normalizedSearchTerm],
  );

  usePageSeo({
    title: normalizedSearchTerm
      ? `Projects matching "${searchTerm}"`
      : "Projects",
    description:
      "Browse Shopify and React projects by Uttam Marakana, including storefront work, frontend applications, and performance-focused implementations.",
    path: "/projects",
    image: "/assets/images/portfolio.webp",
    keywords: [
      "Shopify projects",
      "React projects",
      "portfolio projects",
      "frontend case studies",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Projects",
      url: getAbsoluteUrl("/projects"),
      hasPart: filteredProjects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        url: getAbsoluteUrl(`/projects/details/${project.id}`),
      })),
    },
  });

  return (
    <PageTransition>
      <section className="px-3 pt-6 pb-8">
        <div className="page-shell space-y-8">
          <div className="premium-panel px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="eyebrow">Project library</span>
                <h1 className="section-title mt-5">Frontend and ecommerce work organised with more intent.</h1>

                <p className="section-copy mt-5">
                  Explore the work by technology track, then drop into the individual project pages for implementation detail and GitHub context.
                </p>

                {normalizedSearchTerm && (
                  <p className="mt-5 text-sm text-[var(--text-2)]">
                    Showing {filteredProjects.length} result
                    {filteredProjects.length === 1 ? "" : "s"} for "{searchTerm}"
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:w-[22rem]">
                <div className="metric-card">
                  <p className="metric-value">{totalProjects}</p>
                  <p className="metric-label mt-3">Published projects</p>
                </div>
                <div className="metric-card">
                  <p className="metric-value">2</p>
                  <p className="metric-label mt-3">Delivery tracks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {categoryCards.map((category) => {
              const Icon = category.icon;
              const projectCount = projectsData.filter(
                (project) => project.tech === category.tech,
              ).length;

              return (
                <Link key={category.tech} to={`/projects/${category.tech}`} className="block">
                  <article className="premium-panel group min-h-[21rem] px-7 py-7">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.18] transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,18,0.08),rgba(11,14,18,0.72))]" />
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background: category.edgeGradient,
                        mixBlendMode: "screen",
                      }}
                    />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <span className="eyebrow">{projectCount} projects</span>
                        <Icon className={category.iconClassName} />
                      </div>

                      <div className="mt-auto">
                        <h2 className="font-[var(--font-display)] text-4xl leading-none text-white">
                          {category.title}
                        </h2>

                        <ul className="mt-5 space-y-2 text-sm text-white/78">
                        {category.description.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                        </ul>

                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                          Explore this track <span className="text-lg">↗</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          <div className="premium-panel px-6 py-8 md:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Catalogue</span>
                <h2 className="section-title mt-5">All projects</h2>
                <p className="mt-3 text-sm text-[var(--text-2)]">
                  Search works across project titles, summaries, and highlight details.
                </p>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="rounded-[1.75rem] border border-[var(--line-soft)] bg-white/5 p-8 text-[var(--text-2)]">
                No projects match the current search.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

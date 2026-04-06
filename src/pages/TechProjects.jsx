import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaReact, FaShopify } from "react-icons/fa";
import projectsData from "../data/projectsData";
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";
import BackButton from "../components/BackButton";
import { SearchContext } from "../context/search-context";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

function matchesProject(project, searchTerm) {
  if (!searchTerm) return true;

  const searchableContent = [
    project.title,
    project.role,
    project.sector,
    project.timeline,
    project.shortDescription,
    project.overview,
    project.problem,
    project.solution,
    project.impact,
    ...project.stack,
    ...(project.services ?? []),
    ...(project.constraints ?? []),
    ...(project.process ?? []),
    ...(project.results ?? []),
    ...project.highlights,
  ]
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(searchTerm);
}

export default function TechProjects() {
  const { tech } = useParams();
  const { searchTerm } = useContext(SearchContext);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredProjects = useMemo(
    () =>
      projectsData.filter(
        (project) =>
          project.tech === tech && matchesProject(project, normalizedSearchTerm),
      ),
    [normalizedSearchTerm, tech],
  );

  const isShopify = tech === "shopify";
  const pageTitle = isShopify ? "Shopify Projects" : "React Projects";
  const pageDescription = isShopify
    ? "Shopify storefront implementations focused on usability, performance, and improved customer experience."
    : "Frontend applications built using React with focus on scalability, performance, and structured UI architecture.";

  usePageSeo({
    title: pageTitle,
    description: pageDescription,
    path: `/projects/${tech}`,
    image: isShopify
      ? "/assets/images/shopify-banner.webp"
      : "/assets/images/reactjs-banner.webp",
    keywords: [
      `${tech} projects`,
      "portfolio work",
      "frontend development",
      "ecommerce development",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pageTitle,
      url: getAbsoluteUrl(`/projects/${tech}`),
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
          <BackButton fallback="/projects" />

          <div className="premium-panel px-6 py-8 md:px-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="eyebrow">{tech} track</span>
                <div className="mt-5 flex items-center gap-4">
                  {isShopify ? (
                    <FaShopify className="text-4xl text-green-500" />
                  ) : (
                    <FaReact className="text-4xl text-cyan-400" />
                  )}

                  <h1 className="section-title capitalize">{tech} projects</h1>
                </div>

                <p className="section-copy mt-5">{pageDescription}</p>

                {normalizedSearchTerm && (
                  <p className="mt-5 text-sm text-(--text-2)">
                    Showing {filteredProjects.length} result
                    {filteredProjects.length === 1 ? "" : "s"} for "{searchTerm}"
                  </p>
                )}
              </div>

              <div className="metric-card min-w-[12rem]">
                <p className="metric-value">{filteredProjects.length}</p>
                <p className="metric-label mt-3">Matching projects</p>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="premium-panel px-6 py-8 text-(--text-2)">
              No projects are available for the current filter.
            </div>
          ) : (
            <div className="premium-panel px-6 py-8 md:px-10">
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

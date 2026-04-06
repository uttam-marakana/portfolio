import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FaShopify, FaReact } from "react-icons/fa";
import projectsData from "../data/projectsData";
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";
import { SearchContext } from "../context/search-context";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

function matchesProject(project, searchTerm) {
  if (!searchTerm) return true;

  const searchableContent = [
    project.title,
    project.shortDescription,
    project.overview,
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
    () => projectsData.filter((project) => (
      project.tech === tech && matchesProject(project, normalizedSearchTerm)
    )),
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADER */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              {isShopify ? (
                <FaShopify className="text-3xl text-green-500" />
              ) : (
                <FaReact className="text-3xl text-cyan-400" />
              )}

              <h1 className="text-3xl md:text-4xl font-semibold capitalize">
                {tech} Projects
              </h1>
            </div>

            <p className="text-gray-400 max-w-2xl">
              {isShopify
                ? "Shopify storefront implementations focused on usability, performance, and improved customer experience."
                : "Frontend applications built using React with focus on scalability, performance, and structured UI architecture."}
            </p>

            {normalizedSearchTerm && (
              <p className="text-sm text-gray-500 mt-3">
                Showing {filteredProjects.length} result
                {filteredProjects.length === 1 ? "" : "s"} for "{searchTerm}"
              </p>
            )}
          </div>

          {/* PROJECT GRID */}
          {filteredProjects.length === 0 ? (
            <p className="text-gray-400">
              No projects are available at the current moment.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

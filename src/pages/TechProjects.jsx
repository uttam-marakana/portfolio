import { useParams } from "react-router-dom";
import { FaShopify, FaReact } from "react-icons/fa";
import projectsData from "../data/projectsData";
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";

export default function TechProjects() {
  const { tech } = useParams();

  const filteredProjects = projectsData.filter(
    (project) => project.tech === tech,
  );

  const isShopify = tech === "shopify";

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

import { useParams } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";

export default function TechProjects() {
  const { tech } = useParams();

  const filteredProjects = projectsData.filter(
    (project) => project.tech === tech,
  );

  return (
    <PageTransition>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-10 capitalize">
            {tech} Projects
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

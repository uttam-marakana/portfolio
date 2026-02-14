import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const shopify = projects.filter((p) => p.tech === "Shopify");
  const react = projects.filter((p) => p.tech === "React");

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Shopify Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shopify.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">ReactJS Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {react.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

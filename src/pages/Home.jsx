import { personal } from "../data/personal";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{personal.name}</h1>

            <p className="mt-4 text-lg text-gray-600">{personal.role}</p>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {personal.summary}
            </p>
          </div>

          <img
            src="https://picsum.photos/400"
            className="rounded-xl"
            alt="profile"
          />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10">Featured Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

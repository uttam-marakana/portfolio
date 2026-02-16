import personal from "../data/personal";
import projects from "../data/projectsData";

import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";

import profile from "../assets/profile.jpeg";

export default function Home() {
  return (
    <PageTransition>
      {/* HERO SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {personal.name}
            </h1>

            <p className="mt-4 text-lg text-neutral-400">{personal.role}</p>

            <p className="mt-6 text-neutral-400 leading-relaxed">
              {personal.summary}
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <img
              src={profile}
              alt="profile"
              className="rounded-xl w-72 md:w-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10">Featured Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

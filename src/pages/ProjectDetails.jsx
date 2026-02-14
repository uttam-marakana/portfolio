import { useParams } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <img src={project.image} className="rounded-xl mb-8" />

        <p className="text-gray-400 mb-6">{project.description}</p>

        <div className="flex gap-4 mb-10">
          {project.preview && (
            <a href={project.preview} target="_blank">
              Live Preview
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank">
              GitHub
            </a>
          )}
        </div>

        <pre className="whitespace-pre-wrap text-gray-300">
          {project.readme}
        </pre>
      </div>
    </section>
  );
}

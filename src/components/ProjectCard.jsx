import { Link } from "react-router-dom";
import useTilt from "../hooks/useTilt";

export default function ProjectCard({ project }) {
  const { ref, handleMove, reset } = useTilt();

  return (
    <Link to={`/projects/details/${project.id}`}>
      <article
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="
          bg-gray-900 border border-gray-800
          rounded-2xl overflow-hidden
          transition duration-200
          hover:-translate-y-2 hover:shadow-2xl
        "
      >
        <img src={project.image} className="h-48 w-full object-cover" />

        <div className="p-5">
          <h3 className="font-semibold text-lg">{project.title}</h3>

          <p className="text-gray-400 text-sm mt-2">{project.description}</p>

          <span className="text-indigo-400 text-xs mt-3 block">
            {project.tech}
          </span>
        </div>
      </article>
    </Link>
  );
}

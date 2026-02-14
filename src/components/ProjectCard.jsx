import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/details/${project.id}`}>
      <div
        className="border border-gray-800 rounded-xl overflow-hidden
        bg-gray-900 hover:-translate-y-2 hover:shadow-2xl transition"
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover"
        />

        <div className="p-5">
          <h3 className="font-semibold text-lg">{project.title}</h3>

          <p className="text-gray-400 text-sm mt-2">
            {project.shortDescription}
          </p>

          <p className="text-indigo-400 text-sm mt-3">{project.tech}</p>
        </div>
      </div>
    </Link>
  );
}

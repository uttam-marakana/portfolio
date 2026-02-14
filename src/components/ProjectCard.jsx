import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover"
        />

        <div className="p-5">
          <h3 className="font-semibold text-lg">{project.title}</h3>

          <p className="text-gray-400 text-sm mt-2">{project.overview}</p>

          <p className="text-sm mt-3 text-indigo-400">{project.tech}</p>
        </div>
      </div>
    </Link>
  );
}

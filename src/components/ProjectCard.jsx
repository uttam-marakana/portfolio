export default function ProjectCard({ project }) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
      <img src={project.image} className="h-48 w-full object-cover" />

      <div className="p-5">
        <h3 className="font-semibold text-lg">{project.title}</h3>

        <p className="text-white-600 text-sm mt-2">{project.description}</p>

        <p className="text-sm mt-3">{project.tech}</p>

        <div className="flex gap-4 mt-4">
          {project.preview && (
            <a href={project.preview} target="_blank">
              Preview
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

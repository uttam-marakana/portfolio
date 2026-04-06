import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/details/${project.id}`} className="block h-full">
      <article className="premium-panel group flex h-full flex-col">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,12,14,0.62)] via-transparent to-transparent" />
          <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            {project.tech}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-[var(--font-display)] text-2xl leading-tight">
              {project.title}
            </h3>
            <span className="text-2xl text-[var(--brand-1)] transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-[var(--text-2)]">
            {project.shortDescription}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-[var(--line-soft)] pt-4 text-sm">
            <span className="text-[var(--text-2)]">Case details + stack</span>
            <span className="font-medium text-[var(--text-1)]">Open project</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

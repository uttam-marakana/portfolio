import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/details/${project.id}`} className="block h-full">
      <article className="premium-panel group flex h-full flex-col">
        <div className="relative p-3">
          <div className="project-media-stage aspect-[16/10] overflow-hidden p-3">
            <div className="project-media-frame h-full w-full overflow-hidden rounded-3xl p-2">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="project-media-image transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[rgba(10,12,14,0.68)] via-transparent to-transparent" />
          <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            {project.tech}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-2)">
                {project.sector}
              </p>
              <h3 className="mt-2 font-(--font-display) text-2xl leading-tight md:text-[1.8rem]">
                {project.title}
              </h3>
            </div>
            <span className="mt-1 text-2xl text-(--brand-1) transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </div>

          <p className="mt-3 text-sm leading-7 text-(--text-2) clamp-3">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full border border-(--line-soft) px-3 py-1 text-xs text-(--text-2)"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-(--line-soft) pt-4 text-sm">
            <p className="clamp-3 text-(--text-2)">{project.impact}</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="rounded-full border border-(--line-soft) px-3 py-1 text-xs text-(--text-2)">
                {project.timeline}
              </span>
              <span className="shrink-0 font-medium text-(--text-1)">
                Open case study
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

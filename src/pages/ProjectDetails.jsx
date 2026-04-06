import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import projectsData from "../data/projectsData";
import { fetchReadme } from "../services/githubReadme";
import ReadmeTOC from "../components/ReadmeTOC";
import PageTransition from "../components/PageTransition";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

export default function ProjectDetails() {
  const { id } = useParams();

  const project = projectsData.find((p) => p.id === id);

  const [readmesByRepo, setReadmesByRepo] = useState({});

  const readme = project?.github ? (readmesByRepo[project.github] ?? "") : "";
  const loading = Boolean(project?.github) && !(project.github in readmesByRepo);
  const hasPreview = useMemo(
    () => Boolean(project?.preview),
    [project?.preview],
  );

  usePageSeo({
    title: project ? project.title : "Project not found",
    description: project
      ? project.overview
      : "The requested project could not be found.",
    path: project ? `/projects/details/${project.id}` : "/projects",
    image: project?.image || "/assets/images/portfolio.webp",
    type: "article",
    noIndex: !project,
    keywords: project
      ? [project.tech, project.title, "project details", "portfolio"]
      : ["portfolio", "project not found"],
    schema: project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.overview,
          image: getAbsoluteUrl(project.image),
          url: getAbsoluteUrl(`/projects/details/${project.id}`),
          about: project.highlights,
          sameAs: project.github
            ? [`https://github.com/${project.github}`]
            : undefined,
        }
      : undefined,
  });

  useEffect(() => {
    if (!project?.github || project.github in readmesByRepo) return;

    let ignore = false;

    const loadReadme = async () => {
      const data = await fetchReadme(project.github);

      if (ignore) return;

      setReadmesByRepo((currentReadmes) => ({
        ...currentReadmes,
        [project.github]: data,
      }));
    };

    loadReadme();

    return () => {
      ignore = true;
    };
  }, [project?.github, readmesByRepo]);

  if (!project)
    return <div className="py-20 text-center">Project not found</div>;

  return (
    <PageTransition>
      <section className="px-3 pt-6 pb-8">
        <div className="page-shell grid gap-8 lg:grid-cols-[1fr_19rem]">
          <div className="space-y-8">
            <div className="premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
              <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
                <div>
                  <span className="eyebrow">{project.tech} project</span>
                  <h1 className="section-title mt-5">{project.title}</h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-2)]">
                    {project.overview}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[var(--line-soft)] px-4 py-2 text-sm text-[var(--text-2)]">
                      {project.role}
                    </span>
                    <span className="rounded-full border border-[var(--line-soft)] px-4 py-2 text-sm text-[var(--text-2)]">
                      {project.sector}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    {project.github && (
                      <a
                        href={`https://github.com/${project.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="premium-button premium-button--solid"
                      >
                        View GitHub
                      </a>
                    )}

                    {hasPreview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noreferrer"
                        className="premium-button premium-button--ghost"
                      >
                        Open Preview
                      </a>
                    )}
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {project.highlights.slice(0, 4).map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-[1.4rem] border border-[var(--line-soft)] bg-white/6 px-4 py-4 text-sm leading-7 text-[var(--text-2)]"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="premium-panel p-4">
                  <img
                    src={project.image}
                    loading="eager"
                    decoding="async"
                    className="w-full rounded-[1.5rem]"
                    alt={project.title}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Case study</span>
                <h2 className="section-title mt-5">What needed to improve</h2>
                <p className="mt-5 text-sm leading-8 text-[var(--text-2)]">
                  {project.problem}
                </p>

                <h3 className="mt-8 font-[var(--font-display)] text-3xl">
                  What I implemented
                </h3>
                <p className="mt-4 text-sm leading-8 text-[var(--text-2)]">
                  {project.solution}
                </p>

                <h3 className="mt-8 font-[var(--font-display)] text-3xl">
                  Outcome
                </h3>
                <p className="mt-4 text-sm leading-8 text-[var(--text-2)]">
                  {project.impact}
                </p>
              </div>

              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Stack</span>
                <h2 className="section-title mt-5">Implementation surface</h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--line-soft)] px-4 py-2 text-sm text-[var(--text-2)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="premium-panel px-6 py-8 md:px-10">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="eyebrow">Technical notes</span>
                  <h2 className="section-title mt-5">Repository README</h2>
                </div>
                <p className="max-w-lg text-sm leading-7 text-[var(--text-2)]">
                  Live project context pulled from GitHub so the detail page carries actual implementation notes instead of placeholder copy.
                </p>
              </div>

              <article className="premium-prose prose mt-10 max-w-none prose-headings:scroll-mt-32 prose-p:text-[var(--text-2)] prose-li:text-[var(--text-2)] prose-strong:text-[var(--text-1)] prose-code:text-[var(--brand-1)]">
                {loading ? (
                  <p className="text-[var(--text-2)]">Loading README...</p>
                ) : readme ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ ...props }) => {
                        const id = props.children
                          .toString()
                          .toLowerCase()
                          .replace(/\s+/g, "-");

                        return <h2 id={id} {...props} />;
                      },
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                ) : (
                  <p className="text-[var(--text-2)]">
                    This project does not expose a public README summary here,
                    so the case-study sections above carry the main delivery
                    context.
                  </p>
                )}
              </article>
            </div>
          </div>

          <ReadmeTOC content={readme} />
        </div>
      </section>
    </PageTransition>
  );
}

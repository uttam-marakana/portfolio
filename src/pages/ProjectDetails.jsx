import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import projectsData from "../data/projectsData";
import { fetchReadme } from "../services/githubReadme";
import ReadmeTOC from "../components/ReadmeTOC";
import PageTransition from "../components/PageTransition";
import BackButton from "../components/BackButton";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";

function slugifyHeading(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ProjectDetails() {
  const { id } = useParams();

  const project = projectsData.find((item) => item.id === id);
  const [readmesByRepo, setReadmesByRepo] = useState({});

  const readme = project?.github ? (readmesByRepo[project.github] ?? "") : "";
  const loading = Boolean(project?.github) && !(project.github in readmesByRepo);
  const hasPreview = useMemo(() => Boolean(project?.preview), [project?.preview]);
  const galleryItems = project?.gallery?.length
    ? project.gallery
    : [
        {
          image: project?.image,
          alt: project?.title,
          caption: project?.overview,
        },
      ];

  const pageSections = useMemo(() => {
    const baseSections = [
      { id: "summary", label: "Summary" },
      { id: "gallery", label: "Gallery" },
      { id: "challenge", label: "Challenge" },
      { id: "delivery", label: "Delivery" },
      { id: "results", label: "Results" },
    ];

    if (project?.github) {
      baseSections.push({ id: "readme", label: "README" });
    }

    return baseSections;
  }, [project?.github]);

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
      ? [
          project.tech,
          project.title,
          project.sector,
          "project details",
          "portfolio case study",
        ]
      : ["portfolio", "project not found"],
    schema: project
      ? {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.overview,
          image: getAbsoluteUrl(project.image),
          url: getAbsoluteUrl(`/projects/details/${project.id}`),
          about: [...project.highlights, ...(project.results ?? [])],
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

  if (!project) {
    return <div className="py-20 text-center">Project not found</div>;
  }

  return (
    <PageTransition>
      <section className="px-3 pt-6 pb-8">
        <div className="page-shell space-y-6 xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-8 xl:space-y-0">
          <div className="space-y-6">
            <BackButton fallback="/projects" />

            <div className="premium-panel overflow-hidden px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
              <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
                <div>
                  <span className="eyebrow">{project.tech} case study</span>
                  <h1 className="section-title mt-5">{project.title}</h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-(--text-2) md:text-lg">
                    {project.overview}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-(--line-soft) px-4 py-2 text-sm text-(--text-2)">
                      {project.role}
                    </span>
                    <span className="rounded-full border border-(--line-soft) px-4 py-2 text-sm text-(--text-2)">
                      {project.sector}
                    </span>
                    <span className="rounded-full border border-(--line-soft) px-4 py-2 text-sm text-(--text-2)">
                      {project.timeline}
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
                </div>

                <div className="project-media-stage aspect-16/11 overflow-hidden p-5 md:p-6 xl:p-7">
                  <img
                    src={project.image}
                    loading="eager"
                    decoding="async"
                    className="project-media-image"
                    alt={project.title}
                  />
                </div>
              </div>
            </div>

            <div className="premium-panel px-4 py-4 md:px-6 xl:px-8">
              <div className="flex gap-3 overflow-x-auto pb-1">
                {pageSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="shrink-0 rounded-full border border-(--line-soft) bg-white/6 px-4 py-2 text-sm text-(--text-2) hover:border-(--brand-1) hover:text-(--text-1)"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </div>

            <div id="gallery" className="scroll-mt-32 space-y-6">
              <div className="premium-panel p-6 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="eyebrow">Gallery</span>
                    <h2 className="section-title mt-5">
                      Screens and supporting visuals
                    </h2>
                  </div>
                  <p className="max-w-lg text-sm leading-7 text-(--text-2)">
                    Additional visuals used to make the case study feel closer to
                    the actual product surface, not just a single hero image.
                  </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {galleryItems.map((item) => (
                    <article
                      key={`${project.id}-${item.image}-${item.caption}`}
                      className="premium-panel overflow-hidden"
                    >
                      <div className="project-media-stage aspect-4/3 border-b border-(--line-soft) px-4 py-4 md:px-5 md:py-5">
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          decoding="async"
                          className="project-media-image"
                        />
                      </div>
                      <p className="px-5 pb-5 pt-4 text-sm leading-7 text-(--text-2)">
                        {item.caption}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="summary"
              className="grid scroll-mt-32 gap-6 lg:grid-cols-[0.96fr_1.04fr]"
            >
              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Project summary</span>
                <h2 className="section-title mt-5">Context and scope</h2>
                <p className="mt-5 text-sm leading-8 text-(--text-2) md:text-base">
                  {project.impact}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="metric-card">
                    <p className="metric-label">Role</p>
                    <p className="mt-3 text-base font-medium">{project.role}</p>
                  </div>
                  <div className="metric-card">
                    <p className="metric-label">Sector</p>
                    <p className="mt-3 text-base font-medium">{project.sector}</p>
                  </div>
                  <div className="metric-card">
                    <p className="metric-label">Timeline</p>
                    <p className="mt-3 text-base font-medium">{project.timeline}</p>
                  </div>
                  <div className="metric-card">
                    <p className="metric-label">Tech surface</p>
                    <p className="mt-3 text-base font-medium">
                      {project.stack.length} primary tools
                    </p>
                  </div>
                </div>
              </div>

              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Services</span>
                <h2 className="section-title mt-5">What the work covered</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {project.services.map((item) => (
                    <article
                      key={item}
                      className="rounded-3xl border border-(--line-soft) bg-white/6 px-5 py-5 text-sm leading-7 text-(--text-2)"
                    >
                      {item}
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="challenge"
              className="grid scroll-mt-32 gap-6 lg:grid-cols-[1.02fr_0.98fr]"
            >
              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Challenge</span>
                <h2 className="section-title mt-5">What needed to improve</h2>
                <p className="mt-5 text-sm leading-8 text-(--text-2) md:text-base">
                  {project.problem}
                </p>
              </div>

              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Constraints</span>
                <h2 className="section-title mt-5">What shaped the build</h2>
                <div className="mt-8 space-y-4">
                  {project.constraints.map((item) => (
                    <article
                      key={item}
                      className="rounded-3xl border border-(--line-soft) bg-white/6 px-5 py-5 text-sm leading-7 text-(--text-2)"
                    >
                      {item}
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="delivery"
              className="grid scroll-mt-32 gap-6 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="space-y-6">
                <div className="premium-panel p-6 md:p-8">
                  <span className="eyebrow">Delivery</span>
                  <h2 className="section-title mt-5">What I implemented</h2>
                  <p className="mt-5 text-sm leading-8 text-(--text-2) md:text-base">
                    {project.solution}
                  </p>
                </div>

                <div className="premium-panel p-6 md:p-8">
                  <span className="eyebrow">Stack</span>
                  <h2 className="section-title mt-5">Implementation surface</h2>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-(--line-soft) px-4 py-2 text-sm text-(--text-2)"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Process</span>
                <h2 className="section-title mt-5">How the work moved</h2>
                <div className="mt-8 grid gap-4">
                  {project.process.map((item, index) => (
                    <article
                      key={item}
                      className="rounded-3xl border border-(--line-soft) bg-white/6 px-5 py-5"
                    >
                      <div className="flex gap-4">
                        <p className="font-(--font-display) text-3xl text-(--brand-1)">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="pt-1 text-sm leading-7 text-(--text-2) md:text-base">
                          {item}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="results"
              className="grid scroll-mt-32 gap-6 lg:grid-cols-[1.02fr_0.98fr]"
            >
              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Outcome</span>
                <h2 className="section-title mt-5">What changed after the work</h2>
                <div className="mt-8 grid gap-4">
                  {project.results.map((item) => (
                    <article
                      key={item}
                      className="rounded-3xl border border-(--line-soft) bg-white/6 px-5 py-5 text-sm leading-7 text-(--text-2) md:text-base"
                    >
                      {item}
                    </article>
                  ))}
                </div>
              </div>

              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Key highlights</span>
                <h2 className="section-title mt-5">Signals worth noticing</h2>
                <div className="mt-8 grid gap-4">
                  {project.highlights.map((highlight) => (
                    <article
                      key={highlight}
                      className="rounded-3xl border border-(--line-soft) bg-white/6 px-5 py-5 text-sm leading-7 text-(--text-2) md:text-base"
                    >
                      {highlight}
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {project.github && (
              <div
                id="readme"
                className="premium-panel scroll-mt-32 px-5 py-6 md:px-8 md:py-8 xl:px-10"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="eyebrow">Technical notes</span>
                    <h2 className="section-title mt-5">Repository README</h2>
                  </div>
                  <p className="max-w-lg text-sm leading-7 text-(--text-2)">
                    GitHub documentation remains available as supporting
                    technical context, but the case study above carries the main
                    product and implementation story.
                  </p>
                </div>

                <article className="premium-prose prose mt-10 max-w-none prose-headings:scroll-mt-32 prose-p:text-(--text-2) prose-li:text-(--text-2) prose-strong:text-(--text-1) prose-code:text-(--brand-1)">
                  {loading ? (
                    <p className="text-(--text-2)">Loading README...</p>
                  ) : readme ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ ...props }) => {
                          const children = Array.isArray(props.children)
                            ? props.children
                            : [props.children];
                          const headingText = children
                            .map((child) =>
                              typeof child === "string" ? child : "",
                            )
                            .join(" ");
                          const headingId = slugifyHeading(headingText);

                          return <h2 id={headingId} {...props} />;
                        },
                      }}
                    >
                      {readme}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-(--text-2)">
                      This project does not expose a public README summary here,
                      so the case-study sections above carry the main delivery
                      context.
                    </p>
                  )}
                </article>
              </div>
            )}
          </div>

          <ReadmeTOC content={readme} />
        </div>
      </section>
    </PageTransition>
  );
}

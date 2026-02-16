import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import projectsData from "../data/projectsData";
import { fetchReadme } from "../services/githubReadme";
import ReadmeTOC from "../components/ReadmeTOC";
import PageTransition from "../components/PageTransition";

export default function ProjectDetails() {
  const { id } = useParams();

  const project = projectsData.find((p) => p.id === id);

  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (project?.github) {
      fetchReadme(project.github).then((data) => {
        setReadme(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [project]);

  if (!project)
    return <div className="py-20 text-center">Project not found</div>;

  return (
    <PageTransition>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr_260px] gap-12">
          {/* MAIN CONTENT */}
          <div>
            {/* HERO */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>

            <p className="text-gray-400 mb-8 max-w-3xl">{project.overview}</p>

            <img
              src={project.image}
              className="rounded-xl mb-12"
              alt={project.title}
            />

            {/* ACTION BAR */}
            <div
              className="
               top-16 z-20
              backdrop-blur-lg
              bg-gray-950/70
              border border-gray-800
              rounded-xl
              px-4 py-3
              flex gap-4 mb-12
            "
            >
              {project.github && (
                <a
                  href={`https://github.com/${project.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 bg-indigo-600 rounded-lg"
                >
                  GitHub
                </a>
              )}

              {project.preview && (
                <a
                  href={project.preview}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 border border-gray-700 rounded-lg"
                >
                  Preview
                </a>
              )}
            </div>

            {/* HIGHLIGHTS */}
            <div className="mb-14">
              <h2 className="text-2xl font-semibold mb-6">Key Highlights</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-indigo-400">•</span>
                    <span className="text-gray-300">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* README */}
            <article className="prose prose-invert max-w-none">
              {loading ? (
                <p className="text-gray-400">Loading README...</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ node, ...props }) => {
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
              )}
            </article>
          </div>

          {/* SIDEBAR TOC */}
          <ReadmeTOC content={readme} />
        </div>
      </section>
    </PageTransition>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { projectsData } from "../data/projectsData";
import { fetchReadme } from "../services/githubReadme";
import PageTransition from "../components/PageTransition";

export default function ProjectDetails() {
  const { id } = useParams();

  const project = projectsData.find((p) => p.id === id);

  const [readme, setReadme] = useState("");

  useEffect(() => {
    if (project?.github) {
      fetchReadme(project.github).then(setReadme);
    }
  }, [project]);

  if (!project)
    return <div className="py-20 text-center">Project not found</div>;

  return (
    <PageTransition>
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* HERO */}
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <p className="text-gray-400 mb-8">{project.overview}</p>

          <img src={project.image} className="rounded-xl mb-10" />

          {/* ACTION BAR */}
          <div
            className="
            top-16 z-20
            backdrop-blur-lg
            bg-gray-950/70
            border border-gray-800
            rounded-xl
            px-4 py-3
            flex gap-4 mb-10
            "
          >
            {project.github && (
              <a
                href={`https://github.com/${project.github}`}
                // target="_blank"
                className="px-5 py-2 bg-indigo-600 rounded-lg"
              >
                GitHub
              </a>
            )}

            {project.preview && (
              <a
                href={project.preview}
                target="_blank"
                className="px-5 py-2 border border-gray-700 rounded-lg"
              >
                Preview
              </a>
            )}
          </div>

          {/* README */}
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}

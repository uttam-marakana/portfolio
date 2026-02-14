import { useParams } from "react-router-dom";
import { projects } from "../data/projectsData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageTransition from "../components/PageTransition";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return null;

  return (
    <PageTransition>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h1 className="text-4xl font-bold">{project.title}</h1>

          <img src={project.image} className="rounded-xl" />

          <p className="text-gray-400">{project.description}</p>

          <div className="flex gap-4">
            {project.preview && (
              <a
                href={project.preview}
                target="_blank"
                className="px-4 py-2 bg-indigo-600 rounded"
              >
                Preview
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                className="px-4 py-2 border rounded"
              >
                GitHub
              </a>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.readme}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

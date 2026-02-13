import { useEffect, useState, useContext } from "react";
import { projects } from "../data/projects";
import { fetchGithubRepos } from "../services/githubApi";
import { SearchContext } from "../context/SearchContext";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { searchTerm } = useContext(SearchContext);
  const [githubProjects, setGithubProjects] = useState([]);

  useEffect(() => {
    fetchGithubRepos().then(setGithubProjects);
  }, []);

  const allProjects = [...projects, ...githubProjects];

  const filtered = allProjects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-10">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

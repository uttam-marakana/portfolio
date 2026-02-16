import { useEffect, useRef } from "react";
import personal from "../data/personal";

import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";

import profile from "../assets/profile.jpeg";
import { Link } from "react-router-dom";
import projectsData from "../data/projectsData";

export default function Home() {
  const sectionsRef = useRef([]);

  const featuredProjects = projectsData.slice(0, 3);

  /* ================= SCROLL REVEAL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.15 },
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const revealClass =
    "opacity-0 translate-y-10 transition-all duration-700 ease-out";

  return (
    <PageTransition>
      {/* ================= HERO ================= */}
      <section className="relative py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/10 via-transparent to-cyan-500/10" />

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {personal.name}
            </h1>

            <p className="mt-4 text-lg text-neutral-400">{personal.role}</p>

            <p className="mt-4 text-xl font-medium text-indigo-400">
              Frontend & E-commerce Developer building fast, clean and
              performance-focused interfaces.
            </p>

            <p className="mt-6 text-neutral-400 leading-relaxed max-w-xl">
              {personal.summary}
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
              >
                View Projects
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 border border-neutral-700 rounded-lg hover:border-neutral-500 transition"
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end">
            <img
              src={profile}
              alt="profile"
              className="rounded-2xl w-72 md:w-80 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`py-20 border-t border-neutral-800 ${revealClass}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10">Featured Work</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS SNAPSHOT ================= */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`py-20 border-t border-neutral-800 ${revealClass}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12">Skills Snapshot</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Frontend Engineering</h3>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>ReactJS</li>
                <li>JavaScript (ES6+)</li>
                <li>API Integration</li>
                <li>Component Architecture</li>
              </ul>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">E-Commerce Development</h3>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>Shopify Store Setup</li>
                <li>UI Customization</li>
                <li>Store Optimization</li>
                <li>Theme Configuration</li>
              </ul>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Performance & Tools</h3>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>Lighthouse Optimization</li>
                <li>Responsive Design</li>
                <li>Git & GitHub</li>
                <li>Vite</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`py-20 border-t border-neutral-800 text-center ${revealClass}`}
      >
        <h2 className="text-3xl font-semibold mb-12">Development Process</h2>

        <div className="grid md:grid-cols-4 gap-6 text-neutral-400 max-w-4xl mx-auto">
          <div>Understand</div>
          <div>Design</div>
          <div>Build</div>
          <div>Improve</div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className={`py-24 border-t border-neutral-800 text-center ${revealClass}`}
      >
        <h2 className="text-3xl font-semibold mb-4">Have a project in mind?</h2>

        <p className="text-neutral-400 mb-8">
          Let’s build something fast, clean and scalable.
        </p>

        <Link
          to="/contact"
          className="px-8 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          Start a Conversation
        </Link>
      </section>
    </PageTransition>
  );
}

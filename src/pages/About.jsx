import { Link } from "react-router-dom";
import personal from "../data/personal";
import BackButton from "../components/BackButton";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";
import profileImage from "../assets/profile.png";

const principles = [
  {
    title: "Structure before decoration",
    body: "I prefer clearer hierarchy, reusable layout systems, and practical content framing before visual polish starts.",
  },
  {
    title: "Delivery under real constraints",
    body: "The work is designed to survive client revisions, missing content, responsive breakpoints, and implementation pressure.",
  },
  {
    title: "Premium through restraint",
    body: "The goal is not more effects. It is a stronger visual direction with fewer weak decisions in the interface.",
  },
];

export default function About() {
  usePageSeo({
    title: "About Uttam Marakana",
    description:
      "Learn about Uttam Marakana's experience in Shopify development, React frontend engineering, ecommerce optimization, and performance-focused delivery.",
    path: "/about",
    image: profileImage,
    keywords: [
      "about Uttam Marakana",
      "Shopify experience",
      "React developer experience",
      "frontend engineer portfolio",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: personal.name,
        description: personal.summary,
        url: getAbsoluteUrl("/about"),
      },
    },
  });

  const skills = [
    {
      title: "Frontend Development",
      items: [
        "ReactJS",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Redux",
        "Tailwind CSS",
        "Bootstrap",
        "Responsive Design",
        "Mobile-First Development",
      ],
    },
    {
      title: "Shopify & E-Commerce",
      items: [
        "Shopify Theme Development",
        "Liquid Templating",
        "Section-Based Themes",
        "Theme Customisation",
        "Responsive Storefront Development",
        "Conversion-Focused UI",
      ],
    },
    {
      title: "Integrations & Backend",
      items: [
        "REST API Integration",
        "Firebase Authentication",
        "Firestore",
        "Third-Party Shopify App Integration",
      ],
    },
    {
      title: "Development & Performance",
      items: [
        "Git",
        "GitHub",
        "Debugging",
        "Performance Optimisation",
        "Cross-Browser Compatibility",
      ],
    },
  ];

  return (
    <section className="px-3 pt-6 pb-8">
      <div className="page-shell space-y-8">
        <BackButton fallback="/" />

        <div className="premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div className="premium-panel p-4 md:p-5">
              <img
                src={profileImage}
                alt="Uttam Marakana portrait"
                className="aspect-4/5 w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <span className="eyebrow">About the work</span>
              <h1 className="section-title mt-5">
                Frontend delivery with more structure, less wasted motion.
              </h1>
              <p className="section-copy mt-5">
                {personal.summary} My focus is usually where a product already
                exists, but the interface needs better hierarchy, a cleaner
                system, or stronger implementation quality to feel more
                deliberate.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/resume"
                  className="premium-button premium-button--solid"
                >
                  Open Resume
                </Link>
                <a
                  href={personal.resumeUrl}
                  download
                  className="premium-button premium-button--ghost"
                >
                  Download PDF
                </a>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="metric-card">
                  <p className="metric-value">{personal.experience.length}</p>
                  <p className="metric-label mt-3">Professional roles</p>
                </div>
                <div className="metric-card">
                  <p className="metric-value">{personal.skills.length}+</p>
                  <p className="metric-label mt-3">Core capabilities</p>
                </div>
                <div className="metric-card">
                  <p className="metric-value">Hybrid</p>
                  <p className="metric-label mt-3">Shopify + React delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="premium-panel p-6 md:p-8">
            <span className="eyebrow">Working principles</span>
            <h2 className="section-title mt-5">How I usually approach the build.</h2>
            <div className="mt-8 space-y-5">
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-(--line-soft) bg-white/6 p-5"
                >
                  <h3 className="font-(--font-display) text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-(--text-2)">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="premium-panel p-6 md:p-8">
            <span className="eyebrow">Skill snapshot</span>
            <h2 className="section-title mt-5">
              Capabilities that show up repeatedly.
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {skills.map((group) => (
                <article
                  key={group.title}
                  className="rounded-3xl border border-(--line-soft) bg-white/6 p-5"
                >
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-(--line-soft) px-3 py-2 text-sm text-(--text-2)"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="premium-panel p-6 md:p-8">
            <span className="eyebrow">Education</span>
            <h2 className="section-title mt-5">
              Academic base with frontend-specialized delivery on top.
            </h2>
            <article className="mt-8 rounded-3xl border border-(--line-soft) bg-white/6 p-5">
              <h3 className="font-(--font-display) text-2xl">
                {personal.education.degree}
              </h3>
              <p className="mt-3 text-sm leading-7 text-(--text-2)">
                {personal.education.institution}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-(--brand-2)">
                {personal.education.result}
              </p>
            </article>
          </div>

          <div className="premium-panel p-6 md:p-8">
            <span className="eyebrow">Currently learning</span>
            <h2 className="section-title mt-5">
              Expanding from frontend execution into broader commerce systems.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {personal.currentLearning.map((item) => (
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

        <div className="premium-panel px-6 py-8 md:px-10">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title mt-5">Professional timeline</h2>
          <div className="mt-8 grid gap-5">
            {personal.experience.map((exp) => (
              <article
                key={`${exp.company}-${exp.duration}`}
                className="rounded-[1.75rem] border border-(--line-soft) bg-white/6 px-5 py-5 md:px-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-(--font-display) text-3xl leading-none">
                      {exp.role}
                    </h3>
                    <p className="mt-3 text-base text-(--text-2)">
                      {exp.company}
                    </p>
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-(--text-2)">
                    {exp.duration}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import personal from "../data/personal";
import PageTransition from "../components/PageTransition";
import BackButton from "../components/BackButton";
import usePageSeo from "../hooks/usePageSeo";
import { getAbsoluteUrl } from "../lib/site";
import profileImage from "../assets/profile.png";
import CountUp from "react-countup";

const focusAreas = [
  {
    title: "Shopify storefront delivery",
    body: "Theme customization, section architecture, template refinement, and responsive storefront work aimed at cleaner buying journeys.",
  },
  {
    title: "React application work",
    body: "Admin panels, service-platform interfaces, and component-based frontend systems with clearer hierarchy and maintainable structure.",
  },
  {
    title: "Performance and polish",
    body: "Responsive cleanup, asset control, and detail-level QA so the final frontend feels sharper under real content and device pressure.",
  },
];

const skillTracks = [
  {
    title: "Core frontend",
    items: [
      "ReactJS",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Development",
    ],
  },
  {
    title: "Shopify and ecommerce",
    items: [
      "Shopify Theme Development",
      "Liquid",
      "Section-based Themes",
      "Conversion-aware UI",
      "Storefront Optimization",
    ],
  },
  {
    title: "Integrations and delivery",
    items: [
      "REST API Integration",
      "Firebase",
      "Git / GitHub",
      "Performance Optimization",
      "Cross-browser QA",
    ],
  },
];

export default function Resume() {
  usePageSeo({
    title: "Resume | Uttam Marakana",
    description:
      "Resume and experience overview for Uttam Marakana, covering Shopify development, React frontend delivery, ecommerce systems, and practical UI implementation.",
    path: "/resume",
    image: profileImage,
    keywords: [
      "Uttam Marakana resume",
      "Shopify developer resume",
      "React developer resume",
      "frontend developer experience",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: personal.name,
        jobTitle: personal.role,
        description: personal.summary,
        email: personal.email,
        telephone: personal.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Rajkot",
          addressRegion: "Gujarat",
          addressCountry: "India",
        },
        url: getAbsoluteUrl("/resume"),
      },
    },
  });

  return (
    <PageTransition>
      <section className="px-3 pt-6 pb-8">
        <div className="page-shell space-y-8">
          <BackButton fallback="/" />

          <div className="premium-panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
              <div>
                <span className="eyebrow">Resume</span>
                <h1 className="section-title mt-5">
                  Frontend experience presented for faster hiring decisions.
                </h1>
                <p className="section-copy mt-5">
                  {personal.summary} This page is structured for recruiters,
                  clients, and teams who need a quicker view of current role,
                  relevant experience, and delivery strengths without opening the
                  PDF first.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="premium-button premium-button--solid"
                  >
                    Open PDF
                  </a>
                  <a
                    href={personal.resumeUrl}
                    download
                    className="premium-button premium-button--ghost"
                  >
                    Download PDF
                  </a>
                  <Link
                    to="/contact"
                    className="premium-button premium-button--ghost"
                  >
                    Contact
                  </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="metric-card">
                    <p className="metric-value">
                      <CountUp start={0} end={personal.experience.length} duration={2} />
                    </p>
                    <p className="metric-label mt-3">Professional roles</p>
                  </div>
                  <div className="metric-card">
                    <p className="metric-value">
                      <CountUp start={0} end={personal.skills.length} duration={2} suffix="+" />
                    </p>
                    <p className="metric-label mt-3">Core capabilities</p>
                  </div>
                  <div className="metric-card">
                    <p className="metric-value">BCA</p>
                    <p className="metric-label mt-3">Academic base</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="premium-panel p-4 md:p-5">
                  <img
                    src={profileImage}
                    alt="Uttam Marakana portrait"
                    className="aspect-4/5 w-full rounded-3xl object-cover"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="metric-card">
                    <p className="metric-label">Current role</p>
                    <p className="mt-3 text-lg font-medium">
                      {personal.experience[0].role}
                    </p>
                    <p className="mt-2 text-sm text-(--text-2)">
                      {personal.experience[0].company}
                    </p>
                  </div>
                  <div className="metric-card">
                    <p className="metric-label">Location</p>
                    <p className="mt-3 text-lg font-medium">
                      {personal.location}
                    </p>
                    <p className="mt-2 text-sm text-(--text-2)">
                      Remote collaboration available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">Experience</span>
              <h2 className="section-title mt-5">
                Roles that built the current delivery stack.
              </h2>

              <div className="mt-8 space-y-5">
                {personal.experience.map((item, index) => (
                  <article
                    key={`${item.company}-${item.duration}`}
                    className="rounded-3xl border border-(--line-soft) bg-white/6 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-(--brand-2)">
                          Role {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 font-(--font-display) text-2xl">
                          {item.role}
                        </h3>
                        <p className="mt-2 text-sm text-(--text-2)">
                          {item.company}
                        </p>
                      </div>
                      <span className="rounded-full border border-(--line-soft) px-4 py-2 text-sm text-(--text-2)">
                        {item.duration}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Focus areas</span>
                <h2 className="section-title mt-5">
                  The work I’m most useful for.
                </h2>
                <div className="mt-8 space-y-4">
                  {focusAreas.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-3xl border border-(--line-soft) bg-white/6 p-5"
                    >
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-(--text-2)">
                        {item.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="premium-panel p-6 md:p-8">
                <span className="eyebrow">Education</span>
                <h2 className="section-title mt-5">Academic foundation</h2>
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
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr]">
            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">Skill snapshot</span>
              <h2 className="section-title mt-5">
                Capability areas used most often.
              </h2>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {skillTracks.map((group) => (
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

            <div className="premium-panel p-6 md:p-8">
              <span className="eyebrow">Current learning</span>
              <h2 className="section-title mt-5">
                Where the skill set is expanding now.
              </h2>

              <ul className="mt-8 space-y-3">
                {personal.currentLearning.map((item) => (
                  <li
                    key={item}
                    className="rounded-3xl border border-(--line-soft) bg-white/6 px-5 py-4 text-sm leading-7 text-(--text-2)"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-3xl border border-(--line-soft) bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-(--brand-2)">
                  Contact
                </p>
                <p className="mt-4 text-base font-medium">{personal.email}</p>
                <p className="mt-2 text-sm text-(--text-2)">{personal.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

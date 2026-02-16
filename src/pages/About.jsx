import personal from "../data/personal";

export default function About() {
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
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* ABOUT INTRO */}
        <h1 className="text-3xl font-semibold mb-6">About Me</h1>

        <p className="text-white-600 leading-relaxed mb-16">
          {personal.summary}
        </p>

        {/* CORE SKILLS */}
        <h2 className="text-2xl font-semibold mb-8">Core Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skills.map((group, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-4">{group.title}</h3>

              <ul className="space-y-2 text-white-600">
                {group.items.map((skill, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>

        {personal.experience.map((exp, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-semibold">{exp.role}</h3>
            <p className="text-white-600">
              {exp.company} — {exp.duration}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

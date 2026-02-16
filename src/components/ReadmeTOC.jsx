import { useEffect, useState } from "react";

export default function ReadmeTOC({ content }) {
  const [headings, setHeadings] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!content) return;

    const lines = content.split("\n");

    const extracted = lines
      .filter((l) => l.startsWith("## "))
      .map((l) => {
        const text = l.replace("## ", "").trim();
        return {
          id: text.toLowerCase().replace(/\s+/g, "-"),
          text,
        };
      });

    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="hidden lg:block top-24 h-fit">
      <h3 className="text-sm font-semibold mb-3 text-gray-400">On this page</h3>

      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block transition ${
                active === h.id
                  ? "text-indigo-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

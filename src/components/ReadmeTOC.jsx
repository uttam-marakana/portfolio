import { useEffect, useMemo, useState } from "react";

export default function ReadmeTOC({ content }) {
  const [active, setActive] = useState("");

  const headings = useMemo(() => {
    if (!content) return [];
    const lines = content.split("\n");

    return lines
      .filter((l) => l.startsWith("## "))
      .map((l) => {
        const text = l.replace("## ", "").trim();
        return {
          id: text.toLowerCase().replace(/\s+/g, "-"),
          text,
        };
      });
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
    <aside className="sticky top-24 hidden h-fit xl:block">
      <div className="premium-panel p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-(--text-2)">
          On this page
        </p>
        <h3 className="mt-2 font-(--font-display) text-2xl">
          README map
        </h3>

        <ul className="mt-5 space-y-2 text-sm">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block rounded-2xl border px-3 py-3 transition ${
                  active === h.id
                    ? "border-(--brand-1) bg-[rgba(255,141,87,0.12)] text-(--text-1)"
                    : "border-transparent text-(--text-2) hover:border-(--line-soft) hover:text-(--text-1)"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

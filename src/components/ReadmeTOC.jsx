import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

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
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={active === h.id ? "active" : ""}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

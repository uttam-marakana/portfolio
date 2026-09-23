import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import mainLogo from "../assets/logo.webp";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

function FooterAccordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-(--line-soft) lg:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={`footer-${title.toLowerCase().replace(/\s+/g, "-")}-panel`}
        className="flex w-full items-center justify-between gap-4 py-4 text-left lg:cursor-default lg:pointer-events-none"
      >
        <h4 className="text-(--text-1) font-semibold">{title}</h4>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-(--line-soft) text-(--text-2) transition-transform duration-300 lg:hidden">
          <FaPlus
            className={`text-sm transition-transform duration-300 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          />
        </span>
      </button>

      <div
        id={`footer-${title.toLowerCase().replace(/\s+/g, "-")}-panel`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open
            ? "grid-rows-[1fr]"
            : "grid-rows-[0fr] lg:grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 lg:pb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <motion.footer
      className="px-3 pb-6 pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="page-shell">
        <div className="section-frame rounded-4xl px-6 py-10 md:px-10">
          <motion.div
            className="grid gap-8 grid-cols-1 lg:grid-cols-3 lg:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }}
          >
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <img
                  src={mainLogo}
                  alt="Uttam Marakana Logo"
                  className="h-12 w-12 rounded-2xl border border-(--line-soft) bg-white/8 p-2"
                />

                <div>
                  <h3 className="text-(--text-1) font-semibold text-lg">
                    Uttam Marakana
                  </h3>
                  <p className="text-sm text-(--text-2)">
                    Shopify & React Developer
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed max-w-sm mx-auto lg:mx-0 text-(--text-2)">
                Conversion-aware ecommerce builds, frontend systems with better
                structure, and interfaces that feel sharp under pressure.
              </p>
            </div>

            <FooterAccordion title="Quick Links">
              <ul className="space-y-3 text-sm text-(--text-2)">
                <li>
                  <Link to="/" className="hover:text-(--text-1) transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-(--text-1) transition"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="hover:text-(--text-1) transition"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-(--text-1) transition"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resume"
                    className="hover:text-(--text-1) transition"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Connect">
              <SocialLinks />
            </FooterAccordion>
          </motion.div>

          <div className="mt-10 flex flex-col gap-3 border-t border-(--line-soft) pt-6 text-sm text-(--text-2) md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Uttam Marakana. All rights reserved.</p>
            <p>Built for sharper portfolios, better hiring signals, and cleaner frontend delivery.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}


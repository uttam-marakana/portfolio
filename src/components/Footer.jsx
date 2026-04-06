import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import mainLogo from "../assets/logo.webp";

export default function Footer() {
  return (
    <footer className="px-3 pb-6 pt-10">
      <div className="page-shell">
        <div className="section-frame rounded-[2rem] px-6 py-10 md:px-10">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

            <div className="text-center lg:text-left">
              <h4 className="text-(--text-1) font-semibold mb-4">
                Quick Links
              </h4>

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
              </ul>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="text-(--text-1) font-semibold mb-4">
                Connect
              </h4>
              <SocialLinks />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-(--line-soft) pt-6 text-sm text-(--text-2) md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Uttam Marakana. All rights reserved.</p>
            <p>Built for sharper portfolios, better hiring signals, and cleaner frontend delivery.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

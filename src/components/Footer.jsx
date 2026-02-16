import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div
        className="
        max-w-7xl mx-auto px-6 py-12
        grid gap-10
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {/* -=-=-=-=-=-=- LOGO + NAME -=-=-=-=-=-=- */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <img
              src="src/assets/logo.png"
              alt="Uttam Marakana Logo"
              className="w-10 h-10"
            />

            <div>
              <h3 className="text-white font-semibold text-lg">
                Uttam Marakana
              </h3>
              <p className="text-sm text-gray-400">React & Shopify Developer</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
            Building scalable ecommerce experiences, performance-driven
            frontends, and reliable digital systems.
          </p>
        </div>

        {/* -=-=-=-=-=-=- QUICK LINKS -=-=-=-=-=-=- */}
        <div className="text-center lg:text-left">
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>

          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-white transition">
                Projects
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* -=-=-=-=-=-=- SOCIAL LINKS -=-=-=-=-=-=- */}
        <div className="text-center lg:text-left">
          <h4 className="text-white font-semibold mb-4">Connect</h4>

          <div className="flex justify-center lg:justify-start gap-4 text-xl">
            <a
              href="https://github.com/uttam-marakana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#181717] p-3 rounded-full hover:scale-110 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A66C2] text-white p-3 rounded-full hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:uttammarakana03@gmail.com"
              className="bg-[#EA4335] text-white p-3 rounded-full hover:scale-110 transition"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://wa.me/916353098381"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-3 rounded-full hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* -=-=-=-=-=-=- BOTTOM BAR -=-=-=-=-=-=- */}
      <div className="border-t border-gray-800 text-center text-sm py-4">
        © {new Date().getFullYear()} Uttam Marakana. All rights reserved.
      </div>
    </footer>
  );
}

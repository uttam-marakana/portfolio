import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { FaShopify, FaReact } from "react-icons/fa";

import shopifyBg from "../assets/images/shopify-banner.png";
import reactBg from "../assets/images/reactjs-banner.png";

export default function Projects() {
  return (
    <PageTransition>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADER */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-semibold">Projects</h1>

            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Explore development work categorized by technology focus. Each
              section includes real implementations, architecture decisions, and
              production-ready solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* ======= SHOPIFY ======= */}
            <Link to="/projects/shopify">
              <article
                className="
                  group relative overflow-hidden rounded-2xl
                  border border-gray-800 bg-gray-900
                  hover:-translate-y-2 hover:shadow-2xl
                  transition duration-300
                "
              >
                {/* EDGE GRADIENT */}
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    pointer-events-none
                  "
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(34,197,94,0.25), transparent 40%, transparent 60%, rgba(34,197,94,0.25))",
                    maskImage: "linear-gradient(black, transparent 70%)",
                  }}
                />

                {/* Background Image */}
                <img
                  src={shopifyBg}
                  alt="Shopify Development"
                  className="
                    absolute inset-0 w-full h-full object-cover
                    opacity-20 group-hover:opacity-30
                    transition duration-300
                  "
                />

                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <FaShopify className="text-3xl text-green-500" />
                    <h2 className="text-2xl font-semibold">
                      Shopify Development
                    </h2>
                  </div>

                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Custom Shopify theme development</li>
                    <li>• Performance-focused storefront architecture</li>
                    <li>• Conversion-oriented UI implementation</li>
                    <li>• Section-based scalable theme structure</li>
                    <li>• Responsive and optimized shopping experience</li>
                  </ul>
                </div>
              </article>
            </Link>

            {/* ======= REACTJS ======= */}
            <Link to="/projects/react">
              <article
                className="
                  group relative overflow-hidden rounded-2xl
                  border border-gray-800 bg-gray-900
                  hover:-translate-y-2 hover:shadow-2xl
                  transition duration-300
                "
              >
                {/* EDGE GRADIENT */}
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    pointer-events-none
                  "
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(56,189,248,0.25), transparent 40%, transparent 60%, rgba(56,189,248,0.25))",
                    maskImage: "linear-gradient(black, transparent 70%)",
                  }}
                />

                {/* Background Image */}
                <img
                  src={reactBg}
                  alt="React Development"
                  className="
                    absolute inset-0 w-full h-full object-cover
                    opacity-20 group-hover:opacity-30
                    transition duration-300
                  "
                />

                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <FaReact className="text-3xl text-cyan-400" />
                    <h2 className="text-2xl font-semibold">
                      ReactJS Development
                    </h2>
                  </div>

                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Component-driven frontend architecture</li>
                    <li>• API-integrated web applications</li>
                    <li>• Dashboard and admin panel development</li>
                    <li>• Performance optimized UI rendering</li>
                    <li>• Scalable and maintainable code structure</li>
                  </ul>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

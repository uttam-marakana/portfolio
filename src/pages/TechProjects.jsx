import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { FaShopify, FaReact } from "react-icons/fa";

export default function Projects() {
  return (
    <PageTransition>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <Link to="/projects/shopify">
            <article className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-3">
                <FaShopify className="text-3xl text-green-500" />
                <h2 className="text-2xl font-semibold">Shopify Development</h2>
              </div>
              <p className="text-gray-400">
                Performance-focused Shopify storefronts and custom themes.
              </p>
            </article>
          </Link>

          <Link to="/projects/react">
            <article className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-3">
                <FaReact className="text-3xl text-cyan-400" />
                <h2 className="text-2xl font-semibold">ReactJS Development</h2>
              </div>
              <p className="text-gray-400">
                Scalable frontend applications and dashboards.
              </p>
            </article>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

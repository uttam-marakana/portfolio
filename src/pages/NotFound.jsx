import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import usePageSeo from "../hooks/usePageSeo";

export default function NotFound() {
  usePageSeo({
    title: "Page Not Found",
    description: "The requested page could not be found.",
    path: "/404",
    noIndex: true,
  });

  return (
    <PageTransition>
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            404
          </p>
          <h1 className="text-4xl font-semibold mb-4">Page not found</h1>
          <p className="text-gray-400 mb-8">
            The page you requested does not exist or the link is outdated.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

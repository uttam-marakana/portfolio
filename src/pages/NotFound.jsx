import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import BackButton from "../components/BackButton";
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
      <section className="px-3 py-10">
        <div className="page-shell space-y-8">
          <BackButton fallback="/" />

          <div className="premium-panel flex min-h-[65vh] items-center justify-center px-6 py-10 md:px-10">
            <div className="max-w-2xl text-center">
              <span className="eyebrow">404</span>
              <h1 className="section-title mt-5">Page not found</h1>
              <p className="section-copy mx-auto mt-5">
                The route is missing, outdated, or no longer part of the current
                portfolio flow.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/" className="premium-button premium-button--solid">
                  Back to home
                </Link>
                <Link
                  to="/projects"
                  className="premium-button premium-button--ghost"
                >
                  Browse projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

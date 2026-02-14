import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const TechProjects = lazy(() => import("./pages/TechProjects"));

/* ---------- Loading Screen ---------- */

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          flex flex-col
          bg-white dark:bg-gray-950
          text-gray-900 dark:text-white
          transition-colors duration-300
        "
      >
        {/* Navbar stays visible */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:tech" element={<TechProjects />} />
              <Route
                path="/projects/details/:id"
                element={<ProjectDetails />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer stays visible */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        <Analytics />
      </div>
    </BrowserRouter>
  );
}

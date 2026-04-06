import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import Drawer from "./Drawer";
import { ThemeContext } from "../context/theme-context";
import { SearchContext } from "../context/search-context";
import main_logo from "../assets/logo.webp";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;

    setSearchTerm(nextValue);

    if (
      nextValue.trim() &&
      !location.pathname.startsWith("/projects")
    ) {
      navigate("/projects");
    }
  };

  const clearMobileSearch = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-30 px-3 pt-3"
      >
        <div className="page-shell">
          <div className="section-frame rounded-[1.75rem] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4">
            <NavLink to="/" className="flex items-center gap-3 min-w-0">
              <img
                className="h-12 w-12 rounded-2xl border border-(--line-soft) bg-white/40 p-2"
                src={main_logo}
                alt="U_M Logo"
                width={48}
                height={48}
              />

              <div className="min-w-0">
                <p className="font-semibold truncate">Uttam Marakana</p>
                <p className="text-xs uppercase tracking-[0.24em] text-(--text-2) truncate">
                  Shopify x React
                </p>
              </div>
            </NavLink>

            <div className="hidden xl:flex items-center gap-5">
              <NavLink
                to="/"
                className="premium-nav-link"
                data-active={location.pathname === "/"}
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className="premium-nav-link"
                data-active={location.pathname === "/services"}
              >
                Services
              </NavLink>
              <NavLink
                to="/projects"
                className="premium-nav-link"
                data-active={location.pathname.startsWith("/projects")}
              >
                Projects
              </NavLink>
              <NavLink
                to="/about"
                className="premium-nav-link"
                data-active={location.pathname === "/about"}
              >
                About
              </NavLink>
              <NavLink
                to="/resume"
                className="premium-nav-link"
                data-active={location.pathname === "/resume"}
              >
                Resume
              </NavLink>
              <NavLink
                to="/contact"
                className="premium-nav-link"
                data-active={location.pathname === "/contact"}
              >
                Hire Me
              </NavLink>

              <div className="flex items-center gap-3 pl-3">
                <label className="flex items-center gap-2 rounded-full border border-(--line-soft) bg-white/8 px-4 py-2 text-sm text-(--text-2)">
                  <FaSearch className="text-xs" />
                  <input
                    type="text"
                    placeholder="Search work"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  className="w-36 bg-transparent text-(--text-1) outline-none placeholder:text-(--text-2)"
                  />
                </label>

                <button
                  onClick={toggleTheme}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line-soft) bg-white/8"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 xl:hidden">
              <button
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line-soft) bg-white/8"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line-soft) bg-white/8"
                aria-label="Open search"
              >
                <FaSearch />
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--line-soft) bg-white/8"
                aria-label="Open menu"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(10,12,14,0.45)] px-4 pt-4 backdrop-blur-sm"
        >
          <div className="page-shell">
            <div className="section-frame flex items-center rounded-[1.75rem] px-4 py-3">
              <FaSearch className="mr-3 text-(--text-2)" />
              <input
                autoFocus
                type="text"
                placeholder="Search projects"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-(--text-2)"
              />
              <button
                onClick={clearMobileSearch}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--line-soft)"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}

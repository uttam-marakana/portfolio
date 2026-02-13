import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import Drawer from "./Drawer";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <nav
        className="border-b bg-white dark:bg-gray-950 
                 border-gray-200 dark:border-gray-800 
                 text-gray-900 dark:text-white 
                   transition-colors relative"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-bold">Uttam Marakana</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Hire Me</NavLink>

            {/* Desktop Search */}
            <div
              className="flex items-center border 
                            border-gray-300 dark:border-gray-700
                            rounded px-3 py-1
                            bg-white dark:bg-gray-900"
            >
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search projects..."
                className="outline-none text-sm bg-transparent"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg 
                         bg-gray-200 dark:bg-gray-800
                         hover:scale-105 transition"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button onClick={() => setSearchOpen(true)}>
              <FaSearch />
            </button>

            <button onClick={() => setDrawerOpen(true)}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 
                        bg-white dark:bg-gray-950
                        z-50 flex items-start p-4"
        >
          <div
            className="flex items-center w-full border 
                          border-gray-300 dark:border-gray-700
                          rounded px-3 py-2
                          bg-white dark:bg-gray-900"
          >
            <FaSearch className="text-gray-500 mr-2" />
            <input
              autoFocus
              type="text"
              placeholder="Search projects..."
              className="flex-1 outline-none bg-transparent"
            />
            <button onClick={() => setSearchOpen(false)}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}

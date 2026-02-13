import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import Drawer from "./Drawer";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="border-b bg-white relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-bold">Uttam Marakana</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Hire Me</NavLink>

            {/* Desktop Search */}
            <div className="flex items-center border rounded px-3 py-1">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search projects..."
                className="outline-none text-sm"
              />
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden">
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
        <div className="fixed inset-0 bg-white z-50 flex items-start p-4">
          <div className="flex items-center w-full border rounded px-3 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              autoFocus
              type="text"
              placeholder="Search projects..."
              className="flex-1 outline-none"
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

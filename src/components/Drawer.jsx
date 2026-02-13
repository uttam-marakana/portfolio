import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function Drawer({ open, setOpen }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/projects" onClick={() => setOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Hire Me
          </NavLink>
        </div>
      </div>
    </>
  );
}

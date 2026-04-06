import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function Drawer({ open, setOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed top-3 right-3 bottom-3 z-50 w-[18rem] rounded-[2rem] border border-[var(--line-soft)] bg-[var(--surface-2)] shadow-2xl
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[var(--line-soft)] px-5 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-2)]">
              Navigation
            </p>
            <h2 className="font-semibold">Menu</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-soft)]"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6 text-lg">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--line-soft)]"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--line-soft)]"
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--line-soft)]"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--line-soft)]"
          >
            Hire Me
          </NavLink>
        </div>
      </div>
    </>
  );
}

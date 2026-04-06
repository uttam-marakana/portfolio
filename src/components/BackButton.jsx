import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton({
  fallback = "/",
  label = "Back",
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    if (location.pathname !== fallback) {
      navigate(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-full border border-(--line-soft) bg-white/7 px-4 py-2 text-sm font-medium text-(--text-1) backdrop-blur transition hover:border-(--brand-1) hover:text-(--brand-1) ${className}`.trim()}
      aria-label={`${label} to previous page`}
    >
      <span aria-hidden="true" className="text-base leading-none">
        ←
      </span>
      <span>{label}</span>
    </button>
  );
}

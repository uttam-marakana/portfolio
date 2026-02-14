import { useRef } from "react";

export default function useTilt() {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "rotateX(0) rotateY(0)";
  };

  return { ref, handleMove, reset };
}

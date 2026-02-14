import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => setShow(true), []);

  return (
    <div
      className={`
        transition-all duration-500 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
      `}
    >
      {children}
    </div>
  );
}

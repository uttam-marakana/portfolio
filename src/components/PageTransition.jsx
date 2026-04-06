export default function PageTransition({ children }) {
  return (
    <div className="animate-[page-enter_500ms_ease-out]">
      {children}
    </div>
  );
}

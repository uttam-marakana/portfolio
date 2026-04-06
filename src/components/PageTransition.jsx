export default function PageTransition({ children }) {
  return (
    <div className="[animation:page-enter_500ms_ease-out]">
      {children}
    </div>
  );
}

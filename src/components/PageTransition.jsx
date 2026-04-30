import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="animate-[page-enter_500ms_ease-out]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialLinks() {
  return (
    <motion.div
      className="flex justify-center lg:justify-start gap-4 text-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }}
    >
      <motion.a
        href="https://github.com/uttam-marakana"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--line-soft) bg-white/8 text-(--text-1) hover:-translate-y-1"
        aria-label="GitHub"
        whileHover={{ scale: 1.1 }}
      >
        <FaGithub />
      </motion.a>

      <motion.a
        href="https://www.linkedin.com/in/uttam-marakana-b65938244"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--line-soft) bg-white/8 text-(--text-1) hover:-translate-y-1"
        aria-label="LinkedIn"
        whileHover={{ scale: 1.1 }}
      >
        <FaLinkedin />
      </motion.a>

      <motion.a
        href="mailto:uttammarakana03@gmail.com"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--line-soft) bg-white/8 text-(--text-1) hover:-translate-y-1"
        aria-label="Email"
        whileHover={{ scale: 1.1 }}
      >
        <FaEnvelope />
      </motion.a>

      <motion.a
        href="https://wa.me/916353098381"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--line-soft) bg-white/8 text-(--text-1) hover:-translate-y-1"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.1 }}
      >
        <FaWhatsapp />
      </motion.a>
    </motion.div>
  );
}

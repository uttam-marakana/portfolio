import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex justify-center lg:justify-start gap-4 text-xl">
      <a
        href="https://github.com/uttam-marakana"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/8 text-[var(--text-1)] hover:-translate-y-1"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>

      <a
        href="https://www.linkedin.com/in/uttam-marakana-b65938244"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/8 text-[var(--text-1)] hover:-translate-y-1"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>

      <a
        href="mailto:uttammarakana03@gmail.com"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/8 text-[var(--text-1)] hover:-translate-y-1"
        aria-label="Email"
      >
        <FaEnvelope />
      </a>

      <a
        href="https://wa.me/916353098381"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white/8 text-[var(--text-1)] hover:-translate-y-1"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

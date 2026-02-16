import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex justify-center lg:justify-start gap-4 text-xl">
      <a
        href="https://github.com/uttam-marakana"
        target="_blank"
        className="bg-white text-[#181717] p-3 rounded-full hover:scale-110 transition"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>

      <a
        href="http://in.linkedin.com/in/uttam-marakana-b65938244"
        target="_blank"
        className="bg-[#0A66C2] text-white p-3 rounded-full hover:scale-110 transition"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>

      <a
        href="mailto:uttammarakana03@gmail.com"
        target="_blank"
        className="bg-[#EA4335] text-white p-3 rounded-full hover:scale-110 transition"
        aria-label="Email"
      >
        <FaEnvelope />
      </a>

      <a
        href="https://wa.me/6353098381"
        target="_blank"
        className="bg-[#25D366] text-white p-3 rounded-full hover:scale-110 transition"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

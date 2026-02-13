import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <SocialLinks />
        <p className="text-sm text-gray-500 mt-4">© 2026 Uttam Marakana</p>
      </div>
    </footer>
  );
}

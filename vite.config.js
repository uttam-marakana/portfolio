import { cwd } from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import projectsData from "./src/data/projectsData.js";

function generateSeoFiles(siteUrl) {
  const staticRoutes = ["/", "/about", "/projects", "/contact"];
  const techRoutes = [...new Set(projectsData.map((project) => `/projects/${project.tech}`))];
  const projectRoutes = projectsData.map((project) => `/projects/details/${project.id}`);
  const routes = [...new Set([...staticRoutes, ...techRoutes, ...projectRoutes])];

  return {
    name: "generate-seo-files",
    generateBundle() {
      const normalizedSiteUrl = siteUrl.endsWith("/")
        ? siteUrl.slice(0, -1)
        : siteUrl;

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url><loc>${normalizedSiteUrl}${route}</loc></url>`)
  .join("\n")}
</urlset>
`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${normalizedSiteUrl}/sitemap.xml
`;

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robots,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "");
  const siteUrl = env.VITE_SITE_URL || "https://example.com";

  return {
    plugins: [react(), tailwindcss(), generateSeoFiles(siteUrl)],
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});

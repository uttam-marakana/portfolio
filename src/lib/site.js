export const SITE_NAME = "Uttam Marakana Portfolio";
export const SITE_TITLE = "Uttam Marakana | Shopify & React Developer";
export const SITE_DESCRIPTION =
  "Portfolio of Uttam Marakana, a Shopify and React developer focused on scalable frontend systems, conversion-driven ecommerce, and performance-focused interfaces.";
export const DEFAULT_OG_IMAGE = "/assets/images/portfolio.webp";

export function getSiteOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return import.meta.env.VITE_SITE_URL || "";
}

export function getAbsoluteUrl(path = "/") {
  const origin = getSiteOrigin();

  if (!origin) return path;

  return new URL(path, origin).toString();
}

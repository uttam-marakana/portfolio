import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  getAbsoluteUrl,
} from "../lib/site";

function upsertMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

export default function usePageSeo({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = [],
  noIndex = false,
  schema,
}) {
  const keywordsContent = keywords.join(", ");
  const schemaContent = schema ? JSON.stringify(schema) : "";

  useEffect(() => {
    const canonicalUrl = getAbsoluteUrl(path);
    const imageUrl = getAbsoluteUrl(image);
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const robotsValue = noIndex ? "noindex, nofollow" : "index, follow";

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywordsContent);
    upsertMeta("name", "robots", robotsValue);
    upsertMeta("name", "theme-color", "#0f172a");

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    upsertLink("canonical", canonicalUrl);

    const schemaSelector = 'script[data-seo-schema="primary"]';
    const existingSchema = document.head.querySelector(schemaSelector);

    if (schemaContent) {
      const schemaTag = existingSchema || document.createElement("script");
      schemaTag.setAttribute("type", "application/ld+json");
      schemaTag.setAttribute("data-seo-schema", "primary");
      schemaTag.textContent = schemaContent;

      if (!existingSchema) {
        document.head.appendChild(schemaTag);
      }
    } else if (existingSchema) {
      existingSchema.remove();
    }
  }, [
    description,
    image,
    keywordsContent,
    noIndex,
    path,
    schemaContent,
    title,
    type,
  ]);
}

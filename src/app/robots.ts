import type { MetadataRoute } from "next";
import { content } from "@/content";

// Static export: pin these to build time so `next build` writes real files.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const { brand, seo } = content;

  return {
    rules: [
      {
        userAgent: "*",
        allow: seo.indexing.allowIndexing ? "/" : [],
        disallow: seo.indexing.allowIndexing
          ? seo.indexing.disallowPaths
          : "/",
      },
    ],
    sitemap: `${brand.url}/sitemap.xml`,
  };
}

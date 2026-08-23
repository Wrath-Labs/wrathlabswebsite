import type { MetadataRoute } from "next";
import { content } from "@/content";

// Static export: pin these to build time so `next build` writes real files.
export const dynamic = "force-static";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export default function sitemap(): MetadataRoute.Sitemap {
  const { brand, seo, caseStudies } = content;
  const { sitemap: config } = seo;
  const now = new Date();

  return [
    ...config.pages.map((route) => ({
      url: `${brand.url}${route.path}`,
      lastModified: now,
      changeFrequency: config.changeFrequency as ChangeFrequency,
      priority: route.priority,
    })),
    ...caseStudies.items.map((study) => ({
      url: `${brand.url}${content.navigation.paths.caseStudies}/${study.slug}`,
      lastModified: now,
      changeFrequency: config.caseStudyChangeFrequency as ChangeFrequency,
      priority: config.caseStudyPriority,
    })),
  ];
}

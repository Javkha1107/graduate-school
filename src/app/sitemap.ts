import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://graduate.mnums.edu.mn";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["mn", "en"];
  const pages = [
    "",
    "/news",
    "/admission",
    "/contact",
    "/about",
    "/about/greeting",
    "/about/academic-council",
    "/about/graduate-policy",
    "/about/health-research",
    "/about/e-learning",
    "/about/medical-law",
    "/education/master",
    "/education/master-online",
    "/education/doctoral",
    "/education/postdoctoral",
    "/research/projects",
    "/research/publications",
    "/research/institutes",
    "/research/conferences",
    "/research/journal-club",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.7,
      });
    }
  }

  return entries;
}

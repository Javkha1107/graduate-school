import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://graduate.mnums.edu.mn";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["mn", "en"];

  const pages = [
    // Home
    "",
    // Introduction
    "/introduction/greeting",
    "/introduction/history",
    "/introduction/structure",
    "/introduction/academic-council",
    "/introduction/program-committee",
    "/introduction/faculty",
    // Education
    "/education/master",
    "/education/master-online",
    "/education/doctoral",
    "/education/postdoctoral",
    // Research
    "/research/projects",
    "/research/publications",
    "/research/institutes",
    "/research/conferences",
    "/research/journal-club",
    "/research/ethics-committee",
    "/research/cajms",
    // Admission
    "/admission",
    "/admission/registration",
    "/admission/tuition",
    // Collaboration
    "/collaboration",
    "/collaboration/oita",
    "/collaboration/tokushima",
    // Training Centers
    "/training-centers/academic",
    "/training-centers/interdisciplinary",
    "/training-centers/online",
    "/training-centers/postgraduate",
    // News
    "/news",
    "/news/forms",
    // Rules
    "/rules",
    // Contact
    "/contact",
    // About (legacy routes)
    "/about",
    "/about/greeting",
    "/about/academic-council",
    "/about/graduate-policy",
    "/about/health-research",
    "/about/e-learning",
    "/about/medical-law",
    "/about/collaboration",
    "/about/oita",
    "/about/kyushu",
    "/about/lumiere",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : page === "/news" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}

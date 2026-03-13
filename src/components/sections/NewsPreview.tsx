import { t, type Locale } from "@/lib/i18n";
import { getActiveNews } from "@/lib/news";
import newsData from "@/data/news.json";
import { NewsPreviewClient } from "./NewsPreviewClient";

interface NewsPreviewProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

interface StaticNewsItem {
  id: number;
  nameMn: string;
  nameEn: string | null;
  filePathMn: string;
  published: boolean;
  lastModifiedDate: string;
  typeNameMn: string;
  typeNameEn: string;
}

export default async function NewsPreview({ locale, dict }: NewsPreviewProps) {
  const formatDate = (d: string) =>
    new Date(d.replace(" ", "T")).toLocaleDateString(
      locale === "mn" ? "mn-MN" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );

  let newsItems: {
    id: number;
    title: string;
    image: string | null;
    date: string;
    slug: string;
  }[] = [];

  try {
    const data = await getActiveNews();
    console.log("[NewsPreview] getActiveNews returned", data.length, "items");
    if (data.length > 0) {
      newsItems = data.slice(0, 4).map((item) => ({
        id: item.id,
        title: locale === "mn" ? item.title_mn : item.title_en || item.title_mn,
        image: item.news_img || item.banner_img,
        date: formatDate(item.created_at),
        slug: item.slug,
      }));
    }
  } catch (err) {
    console.error("[NewsPreview] getActiveNews failed:", err);
  }

  if (newsItems.length === 0) {
    newsItems = (newsData as StaticNewsItem[])
      .filter((n) => n.published)
      .slice(0, 4)
      .map((n) => ({
        id: n.id,
        title: locale === "mn" ? n.nameMn : n.nameEn || n.nameMn,
        image: n.filePathMn,
        date: formatDate(n.lastModifiedDate),
        slug: String(n.id),
      }));
  }

  return (
    <NewsPreviewClient
      locale={locale}
      newsListLabel={t(dict, "newsList")}
      seeAllLabel={t(dict, "seeAll")}
      newsItems={newsItems}
    />
  );
}

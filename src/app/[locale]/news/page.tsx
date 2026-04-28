import { getDictionary, t, type Locale } from "@/lib/i18n";
import { getCategoryName } from "@/lib/supabase";
import { getActiveNews } from "@/lib/news";
import PageHero from "@/components/sections/PageHero";
import NewsListClient from "@/components/sections/NewsListClient";
import newsData from "@/data/news.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: t(dict, "newsList") };
}

interface StaticNews {
  id: number;
  nameMn: string;
  nameEn: string | null;
  filePathMn: string;
  published: boolean;
  lastModifiedDate: string;
  typeNameMn: string;
  typeNameEn: string;
  typeCode: string;
}

function formatDate(d: string, locale: string) {
  const date = new Date(d.replace(" ", "T"));
  if (locale === "mn") {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  let items: {
    id: number;
    title: string;
    image: string | null;
    date: string;
    slug: string;
    category: string;
    categoryCode: string;
  }[] = [];

  try {
    const data = await getActiveNews();
    if (data.length > 0) {
      items = data.map((n) => ({
        id: n.id,
        title: locale === "mn" ? n.title_mn : n.title_en || n.title_mn,
        image: n.news_img || n.banner_img,
        date: formatDate(n.created_at, locale),
        slug: n.slug,
        category: getCategoryName(n.category),
        categoryCode: n.category,
      }));
    }
  } catch (err) {
    console.error("[news/page] getActiveNews failed:", err);
  }

  if (items.length === 0) {
    items = (newsData as StaticNews[])
      .filter((n) => n.published)
      .map((n) => ({
        id: n.id,
        title: locale === "mn" ? n.nameMn : n.nameEn || n.nameMn,
        image: n.filePathMn,
        date: formatDate(n.lastModifiedDate, locale),
        slug: String(n.id),
        category: locale === "mn" ? n.typeNameMn : n.typeNameEn,
        categoryCode: n.typeCode || "",
      }));
  }

  return (
    <>
      <PageHero title={t(dict, "newsList")} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <NewsListClient
          locale={locale as Locale}
          items={items}
          searchPlaceholder={t(dict, "search")}
          noResultsLabel={t(dict, "notFound")}
        />
      </div>
    </>
  );
}

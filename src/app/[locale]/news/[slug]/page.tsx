import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { getDictionary, t, type Locale } from "@/lib/i18n";
import { getCategoryName } from "@/lib/supabase";
import { getNewsBySlug, getActiveNews } from "@/lib/news";
import { sanitizeNewsHtml } from "@/lib/sanitize";
import newsData from "@/data/news.json";

interface StaticNews {
  id: number;
  nameMn: string;
  nameEn: string | null;
  filePathMn: string;
  published: boolean;
  lastModifiedDate: string;
  typeNameMn: string;
  typeNameEn: string;
}

function formatDate(d: string, locale: string) {
  const date = new Date(d.replace(" ", "T"));
  if (locale === "mn") {
    return `${date.getFullYear()} оны ${date.getMonth() + 1} сарын ${date.getDate()}`;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateShort(d: string, locale: string) {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale as Locale);

  try {
    const item = await getNewsBySlug(slug);
    if (item) {
      const title =
        locale === "mn" ? item.title_mn : item.title_en || item.title_mn;
      return { title };
    }
  } catch {
    /* fallback */
  }

  const staticItem = (newsData as StaticNews[]).find(
    (n) => String(n.id) === slug,
  );
  if (staticItem) {
    return {
      title:
        locale === "mn"
          ? staticItem.nameMn
          : staticItem.nameEn || staticItem.nameMn,
    };
  }

  return { title: t(dict, "news") };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale as Locale);

  let title = "";
  let image: string | null = null;
  let date = "";
  let content: string | null = null;
  let category = "";
  let currentId = 0;

  // Try Supabase
  try {
    const item = await getNewsBySlug(slug);
    if (item) {
      title = locale === "mn" ? item.title_mn : item.title_en || item.title_mn;
      image = item.banner_img || item.news_img;
      date = item.created_at;
      content =
        locale === "mn" ? item.content_mn : item.content_en || item.content_mn;
      category = getCategoryName(item.category);
      currentId = item.id;
    }
  } catch {
    /* fallback */
  }

  // Fallback to static
  if (!title) {
    const staticItem = (newsData as StaticNews[]).find(
      (n) => String(n.id) === slug && n.published,
    );
    if (!staticItem) notFound();
    title =
      locale === "mn"
        ? staticItem!.nameMn
        : staticItem!.nameEn || staticItem!.nameMn;
    image = staticItem!.filePathMn;
    date = staticItem!.lastModifiedDate;
    category =
      locale === "mn" ? staticItem!.typeNameMn : staticItem!.typeNameEn;
    currentId = staticItem!.id;
  }

  // Get related news
  let relatedNews: {
    id: number;
    title: string;
    image: string | null;
    date: string;
    slug: string;
  }[] = [];

  try {
    const allNews = await getActiveNews();
    relatedNews = allNews
      .filter((n) => n.id !== currentId)
      .slice(0, 3)
      .map((n) => ({
        id: n.id,
        title: locale === "mn" ? n.title_mn : n.title_en || n.title_mn,
        image: n.news_img || n.banner_img,
        date: formatDateShort(n.created_at, locale),
        slug: n.slug,
      }));
  } catch {
    /* ignore */
  }

  if (relatedNews.length === 0) {
    relatedNews = (newsData as StaticNews[])
      .filter((n) => n.published && n.id !== currentId)
      .slice(0, 3)
      .map((n) => ({
        id: n.id,
        title: locale === "mn" ? n.nameMn : n.nameEn || n.nameMn,
        image: n.filePathMn,
        date: formatDateShort(n.lastModifiedDate, locale),
        slug: String(n.id),
      }));
  }

  return (
    <>
      {/* Article */}
      <article className="mx-auto max-w-4xl px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-16 lg:px-8">
        {/* Back link */}
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          {t(dict, "newsList")}
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
          {title}
        </h1>

        {/* Meta row — below title */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {date && formatDate(date, locale)}
          </div>
          {category && (
            <>
              <span className="text-border">•</span>
              <span className="text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                {category}
              </span>
            </>
          )}
        </div>

        {/* Banner image */}
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-2xl mb-10 bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Content */}
        {content ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: sanitizeNewsHtml(content) }}
          />
        ) : (
          <p className="text-muted-foreground">{t(dict, "notFound")}</p>
        )}
      </article>

      {/* Related news */}
      {relatedNews.length > 0 && (
        <section className="border-t border-border/40 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t(dict, "otherNews")}
              </h2>
              <Link
                href={`/${locale}/news`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full transition-colors group"
              >
                {t(dict, "seeAll")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/news/${item.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-4/3"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-primary/80 via-primary/60 to-primary/90 flex flex-col items-center justify-center gap-3">
                      <svg
                        className="h-12 w-12 text-white/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                      </svg>
                    </div>
                  )}
                  {/* Single overlay: gradient + title, hover removes clamp */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/50 to-transparent pt-20 p-5">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mb-2">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-md overflow-hidden max-h-14 group-hover:max-h-80 transition-[max-height] duration-500 ease-in-out">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full transition-colors"
              >
                {t(dict, "seeAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  newsListLabel: string;
  seeAllLabel: string;
  newsItems: {
    id: number;
    title: string;
    image: string | null;
    date: string;
    slug: string;
  }[];
}

function NewsCard({
  item,
  locale,
}: {
  item: Props["newsItems"][number];
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/news/${item.slug}`}
      className="group relative block overflow-hidden rounded-2xl aspect-4/3"
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground/30">
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
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
        <h3 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-md overflow-hidden max-h-[3.5rem] group-hover:max-h-[20rem] transition-[max-height] duration-500 ease-in-out">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export function NewsPreviewClient({
  locale,
  newsListLabel,
  seeAllLabel,
  newsItems,
}: Props) {
  return (
    <section className="py-24 sm:py-32 bg-linear-to-b from-muted to-surface relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {newsListLabel}
              </h2>
              <div className="mt-4 section-divider" />
            </div>
            <Link
              href={`/${locale}/news`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full transition-colors group"
            >
              {seeAllLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </FadeIn>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-full transition-colors"
          >
            {seeAllLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

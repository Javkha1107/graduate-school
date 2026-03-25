"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface NewsListItem {
  id: number;
  title: string;
  image: string | null;
  date: string;
  slug: string;
  category: string;
  categoryCode: string;
}

interface Props {
  locale: Locale;
  items: NewsListItem[];
  searchPlaceholder: string;
  noResultsLabel: string;
}

export default function NewsListClient({
  locale,
  items,
  searchPlaceholder,
  noResultsLabel,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">{noResultsLabel}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((item) => (
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
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground/20">
                  <svg
                    className="h-10 w-10"
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
                <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                  {item.category && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-xs text-white/80">
                        {item.category}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-md overflow-hidden max-h-14 group-hover:max-h-80 transition-[max-height] duration-500 ease-in-out">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

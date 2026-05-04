"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/motion";
import type { Collaboration } from "@/lib/collaborations";

interface Props {
  locale: Locale;
  dict: Record<string, unknown>;
  collaborations: Collaboration[];
}

export default function CollaborationPreview({
  locale,
  dict,
  collaborations,
}: Props) {
  if (collaborations.length === 0) return null;

  const count = collaborations.length;
  const isSingle = count === 1;

  return (
    <section className="py-24 sm:py-32 bg-muted/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {t(dict, "menu.internationalRelations")}
          </h2>
          <div className="mt-4 section-divider" />
        </FadeIn>

        {isSingle ? (
          /* ── Single item: horizontal card ── */
          (() => {
            const collab = collaborations[0];
            const title = locale === "en" ? collab.title_en : collab.title_mn;
            const body = locale === "en" ? collab.body_en : collab.body_mn;

            return (
              <FadeIn>
                <Link
                  href={`/${locale}/collaboration#${collab.slug}`}
                  className="group mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl border border-border/40 bg-white p-6 sm:p-8 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400"
                >
                  {collab.image_url ? (
                    <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden">
                      <Image
                        src={collab.image_url}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-4/3 w-full rounded-xl bg-muted/60 flex items-center justify-center">
                      <Globe className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {title}
                    </h3>
                    {body && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                        {body}
                      </p>
                    )}
                    <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary/70 group-hover:text-primary transition-colors">
                      {t(dict, "readMore")}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })()
        ) : (
          /* ── Multiple items: grid cards ── */
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collaborations.slice(0, 6).map((collab, i) => {
              const title = locale === "en" ? collab.title_en : collab.title_mn;
              const body = locale === "en" ? collab.body_en : collab.body_mn;

              return (
                <FadeIn key={collab.id} delay={i * 0.1}>
                  <Link
                    href={`/${locale}/collaboration#${collab.slug}`}
                    className="group flex flex-col rounded-2xl border border-border/40 bg-white overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400"
                  >
                    {collab.image_url ? (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={collab.image_url}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-muted/60 flex items-center justify-center">
                        <Globe className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {title}
                      </h3>
                      {body && (
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {body}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors">
                        {t(dict, "readMore")}
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}

        {collaborations.length > 3 && (
          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href={`/${locale}/collaboration`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                {t(dict, "seeAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

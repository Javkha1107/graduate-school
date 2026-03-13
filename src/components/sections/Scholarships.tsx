"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, ArrowRight } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/motion";

interface ScholarshipsProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

const items = [
  {
    labelKey: "home.scholarship.scholarship1",
    href: "/student/scholarship",
  },
  {
    labelKey: "home.scholarship.scholarship2",
    href: "/student/scholarship",
  },
  {
    labelKey: "home.scholarship.scholarship3",
    href: "/student/scholarship",
  },
];

export default function Scholarships({ locale, dict }: ScholarshipsProps) {
  return (
    <section className="py-24 sm:py-32 bg-linear-to-b from-surface to-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {t(dict, "home.scholarship.title")}
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded-full bg-linear-to-r from-accent to-accent/40" />
            </FadeIn>

            <div className="mt-10 space-y-4">
              {items.map(({ labelKey, href }, i) => (
                <FadeIn key={labelKey} delay={i * 0.12}>
                  <Link
                    href={`/${locale}${href}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-white p-5 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-400"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">
                        {t(dict, labelKey)}
                      </h3>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <FadeIn delay={0.2} className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-accent/10">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                alt="Scholarship opportunities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/20 to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -top-4 -left-4 sm:left-auto sm:-right-4 bg-accent text-primary-dark rounded-2xl shadow-xl p-4 sm:p-5">
              <Award className="h-6 w-6 mb-1" />
              <p className="text-xs font-bold">
                {locale === "mn" ? "Тэтгэлэг" : "Grants"}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

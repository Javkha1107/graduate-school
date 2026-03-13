"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/motion";

interface ProgramsProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

const programs = [
  {
    labelKey: "home.education.master",
    href: "/education/master",
  },
  {
    labelKey: "home.education.masterOnline",
    href: "/education/master-online",
  },
  {
    labelKey: "home.education.doctor",
    href: "/education/doctoral",
  },
  {
    labelKey: "home.education.postDoctor",
    href: "/education/postdoctoral",
  },
];

export default function Programs({ locale, dict }: ProgramsProps) {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <FadeIn className="relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Medical education"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/30 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-8 bg-white rounded-2xl shadow-xl p-5 border border-border/40">
              <p className="text-3xl font-bold text-primary">4</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {locale === "mn" ? "Хөтөлбөр" : "Programs"}
              </p>
            </div>
          </FadeIn>

          {/* Right: Program list */}
          <div>
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {t(dict, "home.education.title")}
              </h2>
              <div className="mt-4 section-divider" />
            </FadeIn>

            <div className="mt-10 space-y-3">
              {programs.map(({ labelKey, href }, i) => (
                <FadeIn key={labelKey} delay={i * 0.1}>
                  <Link
                    href={`/${locale}${href}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-white p-4 sm:p-5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {t(dict, labelKey)}
                      </h3>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

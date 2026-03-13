"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { motion } from "framer-motion";

interface HeroProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

export default function Hero({ locale, dict }: HeroProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* Sticky hero — stays in place while content scrolls over it */}
      <section className="sticky top-0 h-screen flex items-center overflow-hidden bg-primary-dark">
        {/* Background image */}
        <div className="absolute inset-0">
          {!imgError ? (
            <Image
              src="/hero.png"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-br from-primary-dark/25 via-primary-dark/35 to-primary/40" />
          <div className="absolute inset-0 bg-linear-to-r from-primary-dark/25 via-primary-dark/60 to-transparent" />
        </div>

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary-light/8 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />

        {/* Content — add top padding to account for fixed header */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 pt-28 sm:pt-36">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {locale === "mn"
                  ? "АШҮҮИС Эрдмийн Сургууль"
                  : "MNUMS Graduate School"}
              </span>
            </motion.div>

            {/* Title — University name + Graduate School */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {t(dict, "mnums")}
              </h1>
              <p className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/80 tracking-tight">
                {t(dict, "graduateSchool")}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href={`/${locale}/admission`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary-dark shadow-lg shadow-white/10 hover:bg-white/90 transition-all duration-300 hover:shadow-white/20 hover:shadow-xl group"
              >
                {t(dict, "menu.admission")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                {t(dict, "menu.about")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

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
      <section className="sticky top-0 h-screen flex items-center overflow-hidden bg-[#080e1e]">
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
          {/* Color grading: deep navy base that harmonizes with the red/blue logo */}
          <div className="absolute inset-0 bg-linear-to-br from-[#0a1628]/60 via-[#0f2554]/50 to-[#1a3a7a]/30" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a1628]/70 via-[#0f2554]/40 to-transparent" />
          {/* Subtle warm vignette at top to complement the red in the logo */}
          <div className="absolute inset-0 bg-linear-to-b from-[#1a0a1e]/20 via-transparent to-[#0a1628]/30" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Refined glow orbs — blue tones to match logo */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2d5bc4]/10 blur-[180px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1a3a7a]/15 blur-[140px]" />
        {/* Warm accent glow — subtle nod to the red in the logo */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-[#c83232]/5 blur-[120px]" />

        {/* Content — add top padding to account for fixed header */}
        <div className="relative flex items-center mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 pt-28 sm:pt-36">
          {/* Mongolian traditional script */}
          <div className="hidden sm:block shrink-0">
            <Image
              src="/mongol_bichig.png"
              alt="Mongolian traditional script"
              width={200}
              height={200}
            />
          </div>
          <div className="max-w-3xl w-full">
            {/* Title — Graduate School name prominent, parent university smaller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 flex items-start gap-6"
            >
              <div className={locale === "en" ? "space-y-2" : "space-y-4"}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight bg-linear-to-r via-white from-[#6ea8e6] to-[#d37878] via-40% bg-clip-text text-transparent">
                  {t(dict, "graduateSchool")}
                </h1>
                <p className="text-sm sm:text-base text-white/80 font-medium tracking-wide uppercase">
                  {t(dict, "mnums")}
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className={`flex flex-wrap gap-4 ${locale === "en" ? "mt-8" : "mt-10"}`}
            >
              <Link
                href={`/${locale}/training-centers/postgraduate#admission`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#1a3a7a] shadow-lg shadow-black/10 hover:bg-white/95 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 group"
              >
                {t(dict, "menu.admission")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={`/${locale}/introduction/structure`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#c83232]/60 bg-[#c83232]/70 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-[#c83232] hover:border-[#c83232] transition-all duration-300"
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

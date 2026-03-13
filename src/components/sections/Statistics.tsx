"use client";

import { Users, GraduationCap, BookOpen, Globe } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/ui/motion";

interface StatisticsProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

const stats = [
  {
    icon: Users,
    labelKey: "home.statistic.statistic1",
    value: 1200,
    suffix: "+",
  },
  {
    icon: GraduationCap,
    labelKey: "home.statistic.statistic2",
    value: 350,
    suffix: "+",
  },
  {
    icon: BookOpen,
    labelKey: "home.statistic.statistic3",
    value: 800,
    suffix: "+",
  },
  {
    icon: Globe,
    labelKey: "home.statistic.statistic4",
    value: 50,
    suffix: "+",
  },
];

export default function Statistics({ dict }: StatisticsProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-primary-dark overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary-light/10 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t(dict, "home.statistic.title")}
          </h2>
          <div className="mt-4 mx-auto h-[3px] w-12 rounded-full bg-linear-to-r from-accent to-accent/40" />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map(({ icon: Icon, labelKey, value /* suffix */ }) => (
            <StaggerItem key={labelKey}>
              <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-400">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white tracking-tight">
                  <CountUp target={value} />
                </p>
                <p className="mt-3 text-sm text-white/40 leading-snug">
                  {t(dict, labelKey)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

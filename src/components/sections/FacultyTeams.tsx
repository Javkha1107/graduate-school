"use client";

import React from "react";
import Image from "next/image";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, User } from "lucide-react";
import type { FacultyCategory, FacultyMember } from "@/lib/faculty";

interface Props {
  categories: FacultyCategory[];
  members: FacultyMember[];
  locale: string;
}

function l(mn: string, en: string, locale: string) {
  return locale === "mn" ? mn : en;
}

function MemberCard({ m, locale }: { m: FacultyMember; locale: string }) {
  const labels =
    locale === "mn"
      ? {
          edu: "Боловсрол",
          exp: "Ажлын туршлага",
          res: "Судалгааны чиглэл",
        }
      : {
          edu: "Education",
          exp: "Experience",
          res: "Research Highlights",
        };

  const role = l(m.role_mn, m.role_en, locale);
  const hasPhoto = m.photo_url && m.photo_url.length > 0;

  return (
    <div className="flex flex-col sm:flex-row gap-5 rounded-2xl bg-white border border-border/30 p-5 shadow-sm hover:shadow-md hover:border-primary/15 transition-all duration-300">
      <div className="shrink-0 self-center sm:self-start">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted/50">
          {hasPhoto ? (
            <Image
              src={m.photo_url}
              alt={l(m.name_mn, m.name_en, locale)}
              fill
              className="object-cover object-top"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground/30" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-bold text-foreground">
          {l(m.name_mn, m.name_en, locale)}
        </h4>
        {role && (
          <p className="mt-1 text-sm text-primary font-medium leading-snug">
            {role}
          </p>
        )}
        <dl className="mt-4 space-y-3 text-sm">
          <div className="rounded-lg bg-muted/40 px-3.5 py-2.5">
            <dt className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-1">
              {labels.edu}
            </dt>
            <dd className="whitespace-pre-line leading-relaxed text-foreground/70">
              {l(m.education_mn, m.education_en, locale)}
            </dd>
          </div>
          <div className="rounded-lg bg-muted/40 px-3.5 py-2.5">
            <dt className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-1">
              {labels.exp}
            </dt>
            <dd className="whitespace-pre-line leading-relaxed text-foreground/70">
              {l(m.experience_mn, m.experience_en, locale)}
            </dd>
          </div>
          <div className="rounded-lg bg-muted/40 px-3.5 py-2.5">
            <dt className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-1">
              {labels.res}
            </dt>
            <dd className="leading-relaxed text-foreground/70">
              {l(m.research_mn, m.research_en, locale)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function CategoryCollapsible({
  cat,
  members,
  locale,
}: {
  cat: FacultyCategory;
  members: FacultyMember[];
  locale: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <button className="group w-full flex items-center justify-between gap-3 rounded-xl px-5 py-4 text-left bg-white border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-pointer">
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {l(cat.heading_mn, cat.heading_en, locale)}
          </span>
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted/60 group-hover:bg-primary/10 transition-colors duration-200">
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp p-2">
        <div className="pt-3 space-y-3">
          {members.map((m) => (
            <MemberCard key={m.id} m={m} locale={locale} />
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default function FacultyTeams({ categories, members, locale }: Props) {
  return (
    <div className="space-y-2.5">
      {categories.map((cat) => (
        <CategoryCollapsible
          key={cat.id}
          cat={cat}
          members={members.filter((m) => m.category_id === cat.id)}
          locale={locale}
        />
      ))}
    </div>
  );
}

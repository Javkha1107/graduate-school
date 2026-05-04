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
    <div className="flex flex-col sm:flex-row gap-5 rounded-xl border border-border bg-card p-5 card-premium">
      <div className="shrink-0 self-center sm:self-start">
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-primary/20 bg-muted">
          {hasPhoto ? (
            <Image
              src={m.photo_url}
              alt={l(m.name_mn, m.name_en, locale)}
              fill
              className="object-cover object-top"
              sizes="112px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground/40" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-semibold text-foreground">
          {l(m.name_mn, m.name_en, locale)}
        </h4>
        {role && (
          <p className="mt-1 text-xs font-medium text-primary/70 leading-snug">
            {role}
          </p>
        )}
        <dl className="mt-3 space-y-2 text-sm text-foreground/80">
          <div>
            <dt className="font-medium text-primary">{labels.edu}</dt>
            <dd className="mt-0.5 whitespace-pre-line">
              {l(m.education_mn, m.education_en, locale)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-primary">{labels.exp}</dt>
            <dd className="mt-0.5 whitespace-pre-line">
              {l(m.experience_mn, m.experience_en, locale)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-primary">{labels.res}</dt>
            <dd className="mt-0.5">
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
        <button className="w-full flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-5 py-4 text-left hover:bg-muted transition-colors">
          <span className="text-sm font-bold text-foreground leading-snug">
            {l(cat.heading_mn, cat.heading_en, locale)}
          </span>
          <ChevronDown
            className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
        <div className="pt-4 space-y-4">
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
    <div className="space-y-3">
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

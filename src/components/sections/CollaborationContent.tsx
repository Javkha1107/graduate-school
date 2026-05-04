"use client";

import Image from "next/image";
import PageSidebar from "./PageSidebar";
import { t, type Locale } from "@/lib/i18n";
import type { Collaboration } from "@/lib/collaborations";

interface Props {
  locale: Locale;
  dict: Record<string, unknown>;
  collaborations: Collaboration[];
}

export default function CollaborationContent({
  locale,
  dict,
  collaborations,
}: Props) {
  const sections = collaborations.map((c) => ({
    id: c.slug,
    label: locale === "en" ? c.title_en : c.title_mn,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Sidebar — left side, same as other pages */}
        {sections.length > 0 && (
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />
        )}

        {/* Main content */}
        <main className="space-y-16">
          {collaborations.map((collab) => {
            const title = locale === "en" ? collab.title_en : collab.title_mn;
            const body = locale === "en" ? collab.body_en : collab.body_mn;

            return (
              <section
                key={collab.id}
                id={collab.slug}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-foreground tracking-tight mb-6">
                  {title}
                </h2>

                {collab.image_url && (
                  <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-border/40">
                    <Image
                      src={collab.image_url}
                      alt={title}
                      width={900}
                      height={0}
                      className="w-full h-auto"
                      sizes="(max-width: 1024px) 100vw, 720px"
                    />
                  </div>
                )}

                {body && (
                  <div className="prose prose-sm max-w-none text-foreground/75 leading-[1.85]">
                    {body
                      .split("\n")
                      .map((paragraph, i) =>
                        paragraph.trim() ? <p key={i}>{paragraph}</p> : null,
                      )}
                  </div>
                )}
              </section>
            );
          })}

          {collaborations.length === 0 && (
            <p className="text-muted-foreground text-center py-20">
              {locale === "en"
                ? "No collaborations available."
                : "Мэдээлэл байхгүй байна."}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

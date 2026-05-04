import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import { ExternalLink } from "lucide-react";
import { getConferencesContent } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.research") };
}

export default async function ConferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const isMn = locale === "mn";

  const content = await getConferencesContent();

  const sections = [
    { id: "conferences", label: t(dict, "menu.conferences") },
    {
      id: "interdisciplinary-council",
      label: t(dict, "menu.interdisciplinaryCouncil"),
    },
    { id: "cajms", label: t(dict, "menu.cajms") },
    {
      id: "health-science-journal",
      label: t(dict, "menu.healthScienceJournal"),
    },
    { id: "ethics-committee", label: t(dict, "menu.ethicsCommittee") },
  ];

  const bodyText = content
    ? isMn
      ? content.body_mn
      : content.body_en
    : t(dict, "researchDay.body1");

  const archiveTitle = content
    ? isMn
      ? content.archive_title_mn
      : content.archive_title_en
    : t(dict, "researchDay.archiveTitle");

  const links = [...(content?.links ?? [])].reverse();

  const comingSoon = isMn ? "Удахгүй..." : "Coming soon...";

  return (
    <>
      <PageHero title={t(dict, "menu.research")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16 min-w-0">
            {/* Эрдмийн чуулган */}
            <section id="conferences" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.conferences")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base mb-6">
                {bodyText}
              </p>
              {links.length > 0 && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold mb-4 text-primary tracking-tight">
                    {archiveTitle}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-primary hover:text-primary-light underline underline-offset-2 inline-flex items-center gap-1.5 transition-colors"
                        >
                          {isMn ? link.label_mn : link.label_en}
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Салбар дундын эрдмийн зөвлөл */}
            <section id="interdisciplinary-council" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.interdisciplinaryCouncil")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">
                {comingSoon}
              </p>
            </section>

            {/* CAJMS */}
            <section id="cajms" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.cajms")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">
                {comingSoon}
              </p>
            </section>

            {/* Эрүүл Мэндийн Шинжлэх Ухаан сэтгүүл */}
            <section id="health-science-journal" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.healthScienceJournal")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">
                {comingSoon}
              </p>
            </section>

            {/* Судалгааны ёс зүйн хяналтын хороо */}
            <section id="ethics-committee" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.ethicsCommittee")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">
                {comingSoon}
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

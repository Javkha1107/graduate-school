import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.history") };
}

interface YearEntry {
  year: string;
  image?: string;
  events: string[];
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const historyData = getObj(dict, "history") as {
    title: string;
    years: YearEntry[];
  };

  const years: YearEntry[] = historyData.years ?? [];

  const sections = years.map((entry) => ({
    id: `year-${entry.year}`,
    label: `${entry.year}`,
    disabled: entry.events.length === 0,
  }));

  return (
    <>
      <PageHero title={t(dict, "menu.history")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main>
            <h2 className="text-2xl font-bold text-foreground mb-12">
              {historyData.title}
            </h2>

            <div className="space-y-10">
              {years.map((entry) => (
                <div
                  key={entry.year}
                  id={`year-${entry.year}`}
                  className="scroll-mt-24"
                >
                  {/* Year heading */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center justify-center rounded-full bg-primary text-white border border-primary/20 text-sm font-bold px-4 py-1">
                      {entry.year}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Events */}
                  {entry.events.length > 0 ? (
                    <div className="space-y-3 pl-2">
                      {entry.events.map((event, idx) => (
                        <div key={idx} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            style={{
                              marginTop: "0.55em",
                              flexShrink: 0,
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: "var(--primary)",
                              opacity: 0.5,
                              display: "block",
                            }}
                          />
                          <p className="text-foreground/85 leading-relaxed text-base">
                            {event}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="pl-2 text-foreground/35 italic text-sm">
                      {locale === "mn"
                        ? "Мэдээлэл удахгүй..."
                        : "Coming soon..."}
                    </p>
                  )}

                  {/* Image below events */}
                  {entry.image && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-border shadow-sm">
                      <Image
                        src={entry.image}
                        alt={`${entry.year} он`}
                        width={800}
                        height={450}
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

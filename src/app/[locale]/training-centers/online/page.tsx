import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.onlineCenter") };
}

export default async function OnlineCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  const sections = [
    { id: "online-master", label: t(dict, "menu.onlineMasterTraining") },
  ];

  const clickHere = locale === "mn" ? "ЭНД ДАРЖ" : "CLICK HERE";

  return (
    <>
      <PageHero title={t(dict, "menu.onlineCenter")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16">
            <section id="online-master" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.onlineMasterTraining")}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(dict, "menu.programIntroduction")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    <a
                      href="https://icec.mnums.edu.mn/local/staticpage/view.php?page=aboutus20241025mongol"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                    >
                      {clickHere}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

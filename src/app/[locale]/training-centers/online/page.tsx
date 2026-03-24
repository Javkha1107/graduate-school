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
  const comingSoon = locale === "mn" ? "Удахгүй..." : "Coming soon...";

  const sections = [
    { id: "online-master", label: t(dict, "menu.onlineMasterTraining") },
  ];

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
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

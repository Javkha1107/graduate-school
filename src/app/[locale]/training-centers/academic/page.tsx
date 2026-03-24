import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.academicCenter") };
}

export default async function AcademicCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const comingSoon = locale === "mn" ? "Удахгүй..." : "Coming soon...";

  const sections = [
    { id: "doctoral", label: t(dict, "menu.doctoralTraining") },
    { id: "master", label: t(dict, "menu.masterTraining") },
  ];

  return (
    <>
      <PageHero title={t(dict, "menu.academicCenter")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16">
            <section id="doctoral" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.doctoralTraining")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>

            <section id="master" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.masterTraining")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

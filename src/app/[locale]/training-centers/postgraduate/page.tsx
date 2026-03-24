import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.postgraduateCenter") };
}

export default async function PostgraduateCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const comingSoon = locale === "mn" ? "Удахгүй..." : "Coming soon...";

  const sections = [
    { id: "admission", label: t(dict, "menu.postgraduateAdmission") },
    { id: "graduation", label: t(dict, "menu.postgraduateGraduation") },
    { id: "specialization", label: t(dict, "menu.postgraduateSpecialization") },
    { id: "basic", label: t(dict, "menu.postgraduateBasic") },
    { id: "hospitals", label: t(dict, "menu.postgraduateHospitals") },
  ];

  return (
    <>
      <PageHero title={t(dict, "menu.postgraduateCenter")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16">
            <section id="admission" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateAdmission")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>

            <section id="graduation" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateGraduation")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>

            <section id="specialization" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateSpecialization")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>

            <section id="basic" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateBasic")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>

            <section id="hospitals" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateHospitals")}
              </h2>
              <p className="text-foreground/75 leading-[1.85] text-base">{comingSoon}</p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

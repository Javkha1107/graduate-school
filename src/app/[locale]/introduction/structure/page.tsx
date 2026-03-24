import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.structure") };
}

export default async function StructurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  const sections = [
    { id: "organization", label: t(dict, "menu.structureOrganization") },
    { id: "faculty-leaders", label: t(dict, "menu.facultyLeaders") },
  ];

  const organizationText = locale === "mn"
    ? "Ахисан Түвшний Сургууль нь Академик сургалтын төв, Олон Улсын Цахим Сургалтын төв, Салбар дундын сургалтын төв, Төгсөлтийн Дараах Сургалтын төв гэсэн бүтэцтэйгээр доктор, магистр, цахим магистр, салбар дундын сургалт, төгсөлтийн дараах сургалтын үйл ажиллагааг зохион байгуулдаг. Ахисан түвшийн сургуулийн захирлаар АУ-ы доктор, профессор Ш.Үүртуяа, Академик сургалтын төвийн эрхлэгчээр АУ-ы доктор Э.Сарантуяа, Олон Улсын Цахим Сургалтын төвийн эрхлэгчээр АУ-ы доктор, Олон нийтийн анагаах ухаан, эрүүл мэндийн менежментийн ухааны доктор, дэд профессор Ц.Сарнай, Салбар Дундын Сургалтын төвийн эрхлэгчээр АУ-ы доктор, дэд профессор Ц.Алтансүх, Төгсөлтийн Дараах сургалтын төвийн эрхлэгчээр АУ-ы доктор Г.Алимаа нар ажиллаж байна."
    : "The Graduate School operates with four centers: Academic Training Center, International Online Education Center, Interdisciplinary Training Center, and Postgraduate Training Center, organizing doctoral, master's, online master's, interdisciplinary, and postgraduate training activities.";

  const comingSoon = locale === "mn" ? "Удахгүй..." : "Coming soon...";

  return (
    <>
      <PageHero title={t(dict, "menu.structure")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16">
            <section id="organization" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.structureOrganization")}
              </h2>
              <div className="relative w-full aspect-[16/10] mb-8 rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/structure.png"
                  alt="Structure"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-foreground/75 leading-[1.85] text-base">
                {organizationText}
              </p>
            </section>

            <section id="faculty-leaders" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.facultyLeaders")}
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

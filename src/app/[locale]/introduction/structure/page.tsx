import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import GraduateSchoolScheme, {
  type SchemeTexts,
} from "@/components/sections/GraduateSchoolScheme";
import FacultyTeams from "@/components/sections/FacultyTeams";
import { getFacultyData } from "@/lib/faculty";

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

  const organizationText =
    locale === "mn"
      ? "Ахисан түвшний сургууль нь төгсөлтийн болон төгсөлтийн дараах сургалтын хөтөлбөрийг хэрэгжүүлдэг 4 сургалтын төвтэй үйл ажиллагаа явуулж байна. Үүнд: Академик сургалтын төв, Олон улсын цахим сургалтын төв, Салбар дундын сургалтын төв, Төгсөлтийн дараах сургалтын төв. Ахисан түвшний сургуулийн захирлаар АУ-ы доктор, дэд профессор Ш.Үүртуяа, Академик сургалтын төвийн эрхлэгчээр АУ-ы доктор Э.Сарантуяа, Олон улсын цахим сургалтын төвийн эрхлэгчээр АУ-ы доктор, дэд профессор Ц.Сарнай, Салбар дундын сургалтын төвийн эрхлэгчээр АУ-ы доктор, дэд профессор Ц.Алтансүх, Төгсөлтийн дараах сургалтын төвийн эрхлэгчээр АУ-ы доктор Г.Алимаа нар ажиллаж байна."
      : "The Graduate School operates through 4 training centers that implement graduate and postgraduate training programs: Academic Training Center, International Online Education Center, Interdisciplinary Training Center, and Postgraduate Training Center. The Graduate School is led by Dean Sh.Uurtuyaa (MD, PhD, Associate Professor), with center heads E.Sarantuya (MD, PhD) for Academic Training, Ts.Sarnai (MD, PhD, Associate Professor) for International Online Education, Ts.Altansukh (MD, PhD, Associate Professor) for Interdisciplinary Training, and G.Alimaa (MD, PhD) for Postgraduate Training.";

  const schemeObj = getObj(dict, "scheme");
  const { categories, members } = await getFacultyData();
  const centersObj = getObj(dict, "scheme.centers");
  const schemeTexts: SchemeTexts = {
    title: t(dict, "scheme.title"),
    subtitle: t(dict, "scheme.subtitle"),
    centers: {
      c1: centersObj.c1 as string,
      c1sub: centersObj.c1sub as string,
      c2line1: centersObj.c2line1 as string,
      c2line2: centersObj.c2line2 as string,
      c2sub: centersObj.c2sub as string,
      c3line1: centersObj.c3line1 as string,
      c3line2: centersObj.c3line2 as string,
      c3sub: centersObj.c3sub as string,
      c4line1: centersObj.c4line1 as string,
      c4line2: centersObj.c4line2 as string,
      c4sub: centersObj.c4sub as string,
    },
    listHeader: t(dict, "scheme.listHeader"),
    list1: schemeObj.list1 as string[],
    list2: schemeObj.list2 as string[],
    list3: schemeObj.list3 as string[],
    ldept: schemeObj.ldept as string[],
    rdept: schemeObj.rdept as string[],
    bottomBar1: t(dict, "scheme.bottomBar1"),
    bottomBar2: t(dict, "scheme.bottomBar2"),
    hintDesktop: t(dict, "scheme.hintDesktop"),
    hintMobile: t(dict, "scheme.hintMobile"),
    ariaLabel: t(dict, "scheme.ariaLabel"),
    ariaClose: t(dict, "scheme.ariaClose"),
  };

  return (
    <>
      <PageHero title={t(dict, "menu.structure")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16 min-w-0 overflow-hidden">
            <section id="organization" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.structureOrganization")}
              </h2>
              <div className="mb-8">
                <GraduateSchoolScheme texts={schemeTexts} />
              </div>
              <div className="text-foreground/75 leading-[1.85] text-base text-justify space-y-4">
                {locale === "mn" ? (
                  <>
                    <p className="indent-5">
                      Ахисан түвшний сургууль нь төгсөлтийн болон төгсөлтийн дараах сургалтын хөтөлбөрийг хэрэгжүүлдэг 4 сургалтын төвтэй үйл ажиллагаа явуулж байна. Үүнд: <strong className="text-foreground">Академик сургалтын төв</strong>, <strong className="text-foreground">Олон улсын цахим сургалтын төв</strong>, <strong className="text-foreground">Салбар дундын сургалтын төв</strong>, <strong className="text-foreground">Төгсөлтийн дараах сургалтын төв</strong>.
                    </p>
                    <div className="space-y-1">
                      <p><strong className="text-foreground">Ахисан түвшний сургуулийн захирлаар</strong> АУ-ы доктор, дэд профессор Ш.Үүртуяа,</p>
                      <p><strong className="text-foreground">Академик сургалтын төвийн эрхлэгчээр</strong> АУ-ы доктор Э.Сарантуяа,</p>
                      <p><strong className="text-foreground">Олон улсын цахим сургалтын төвийн эрхлэгчээр</strong> АУ-ы доктор, дэд профессор Ц.Сарнай,</p>
                      <p><strong className="text-foreground">Салбар дундын сургалтын төвийн эрхлэгчээр</strong> АУ-ы доктор, дэд профессор Ц.Алтансүх,</p>
                      <p><strong className="text-foreground">Төгсөлтийн дараах сургалтын төвийн эрхлэгчээр</strong> АУ-ы доктор Г.Алимаа нар ажиллаж байна.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="indent-5">
                      The Graduate School operates through 4 training centers that implement graduate and postgraduate training programs: <strong className="text-foreground">Academic Training Center</strong>, <strong className="text-foreground">International Online Education Center</strong>, <strong className="text-foreground">Interdisciplinary Training Center</strong>, and <strong className="text-foreground">Postgraduate Training Center</strong>.
                    </p>
                    <div className="space-y-1">
                      <p><strong className="text-foreground">Graduate School Dean:</strong> Sh.Uurtuyaa (MD, PhD, Associate Professor),</p>
                      <p><strong className="text-foreground">Academic Training Center Head:</strong> E.Sarantuya (MD, PhD),</p>
                      <p><strong className="text-foreground">International Online Education Center Head:</strong> Ts.Sarnai (MD, PhD, Associate Professor),</p>
                      <p><strong className="text-foreground">Interdisciplinary Training Center Head:</strong> Ts.Altansukh (MD, PhD, Associate Professor),</p>
                      <p><strong className="text-foreground">Postgraduate Training Center Head:</strong> G.Alimaa (MD, PhD).</p>
                    </div>
                  </>
                )}
              </div>
            </section>

            <section id="faculty-leaders" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.facultyLeaders")}
              </h2>
              <FacultyTeams
                categories={categories}
                members={members}
                locale={locale}
              />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

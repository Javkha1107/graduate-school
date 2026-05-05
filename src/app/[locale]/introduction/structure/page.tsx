import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import GraduateSchoolScheme, {
  type SchemeTexts,
} from "@/components/sections/GraduateSchoolScheme";
import FacultyTeams from "@/components/sections/FacultyTeams";
import { getFacultyData } from "@/lib/faculty";
import { leadership } from "@/data/leadership";

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
                  <p className="indent-5">
                    Ахисан түвшний сургууль нь төгсөлтийн болон төгсөлтийн
                    дараах сургалтын хөтөлбөрийг хэрэгжүүлдэг 4 сургалтын төвтэй
                    үйл ажиллагаа явуулж байна. Үүнд:{" "}
                    <strong className="text-foreground">
                      Академик сургалтын төв
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      Олон улсын цахим сургалтын төв
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      Салбар дундын сургалтын төв
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      Төгсөлтийн дараах сургалтын төв
                    </strong>
                    .
                  </p>
                ) : (
                  <p className="indent-5">
                    The Graduate School operates through 4 training centers that
                    implement graduate and postgraduate training programs:{" "}
                    <strong className="text-foreground">
                      Academic Training Center
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      International Online Education Center
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      Interdisciplinary Training Center
                    </strong>
                    , and{" "}
                    <strong className="text-foreground">
                      Postgraduate Training Center
                    </strong>
                    .
                  </p>
                )}
              </div>

              {/* Leadership Cards */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {leadership.map((person) => (
                  <div
                    key={person.image}
                    className="group relative aspect-9/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                  >
                    <Image
                      src={person.image}
                      alt={locale === "mn" ? person.nameMn : person.nameEn}
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Blur overlay layer — fades in from transparent */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-sm"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, transparent 0%, black 60%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, transparent 0%, black 60%)",
                      }}
                    />
                    {/* Dark gradient for contrast */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent via-black/30 to-black/70" />
                    {/* Text content */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-lg font-bold text-white drop-shadow-sm">
                        {locale === "mn" ? person.nameMn : person.nameEn}
                      </h3>
                      <p className="mt-1 text-sm text-white/85 leading-snug drop-shadow-sm">
                        {locale === "mn" ? person.roleMn : person.roleEn}
                      </p>
                      <p className="mt-1.5 text-xs text-white/60 font-medium">
                        {locale === "mn" ? person.degreeMn : person.degreeEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="faculty-leaders" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.facultyLeaders")}
              </h2>
              <div className="p-1">
                <FacultyTeams
                  categories={categories}
                  members={members}
                  locale={locale}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

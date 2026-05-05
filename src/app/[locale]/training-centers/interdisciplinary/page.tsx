import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: t(getDictionary(locale as Locale), "menu.interdisciplinaryCenter"),
  };
}

// Staff data
const staffData = {
  director: {
    degree: {
      mn: "АУ-ы доктор, дэд профессор",
      en: "Ph.D, Associate Professor",
    },
    name: "Цэнд-Аюуш АЛТАНСҮХ",
    email: "altansukh.ts@mnums.edu.mn",
  },
  postdocs: [
    {
      degree: { mn: "АУ-ы доктор", en: "Ph.D" },
      name: "Ж.Мядагмаа",
      email: "myadagmaa@mnums.edu.mn",
    },
    {
      degree: { mn: "АУ-ы доктор", en: "Ph.D" },
      name: "Б.Сэдэд",
      email: "seded@mnums.edu.mn",
    },
    {
      degree: { mn: "ЭЗУ-ы доктор", en: "Ph.D in Pharmacy" },
      name: "С.Нурбек",
      email: "nurbyek@mnums.edu.mn",
    },
  ],
  address: {
    office: {
      mn: "АШУҮИС, Ахисан түвшний сургууль, 8 тоот",
      en: "MNUMS, Graduate School, Room 8",
    },
    email: "grad.itc@mnums.edu.mn",
  },
};

// Joint programs data
const jointPrograms = [
  {
    id: 1,
    title: { mn: "program1Title", en: "program1Title" },
    subtitle: { mn: "program1Subtitle", en: "program1Subtitle" },
    rows: [
      {
        name: { mn: "Эрүүл мэндийн боловсрол", en: "Health Education" },
        code: "018804",
        form: { mn: "Судалгааны магистр", en: "Research Master's" },
        duration: { mn: "1.5-2 жил", en: "1.5-2 years" },
        credits: "36 б/ц",
        school: { mn: "МУБИС, АШУҮИС", en: "MSUE, MNUMS" },
      },
      {
        name: { mn: "Эрүүл мэндийн боловсрол", en: "Health Education" },
        code: "018804",
        form: { mn: "Мэргэжлийн магистр", en: "Professional Master's" },
        duration: { mn: "1.5-2 жил", en: "1.5-2 years" },
        credits: "36+ б/ц",
        school: { mn: "МУБИС, АШУҮИС", en: "MSUE, MNUMS" },
      },
    ],
  },
  {
    id: 2,
    title: { mn: "program2Title", en: "program2Title" },
    subtitle: { mn: "program2Subtitle", en: "program2Subtitle" },
    rows: [
      {
        name: {
          mn: "Анагаах ухааны докторын хос дипломын хөтөлбөр",
          en: "Dual Doctoral Degree in Medical Sciences",
        },
        code: "091201",
        form: { mn: "Танхимын сургалт", en: "On-campus" },
        duration: { mn: "4+ жил", en: "4+ years" },
        credits: "60+ б/ц",
        school: {
          mn: "АШУҮИС, Япон улсын Ойта их сургууль",
          en: "MNUMS, Oita University, Japan",
        },
      },
    ],
  },
  {
    id: 3,
    title: { mn: "program3Title", en: "program3Title" },
    subtitle: { mn: "program3Subtitle", en: "program3Subtitle" },
    rows: [
      {
        name: {
          mn: "Анагаах ухааны докторын хос дипломын хөтөлбөр",
          en: "Dual Doctoral Degree in Medical Sciences",
        },
        code: "091201",
        form: { mn: "Танхимын сургалт", en: "On-campus" },
        duration: { mn: "4+ жил", en: "4+ years" },
        credits: "60+ б/ц",
        school: {
          mn: "АШУҮИС, Япон улсын Токушима их сургууль",
          en: "MNUMS, Tokushima University, Japan",
        },
      },
    ],
  },
];

// Post-doctoral research data
const postdocResearch = [
  {
    year: "2024",
    researchers: [
      {
        name: { mn: "АУ-ы доктор Ж.Мядагмаа", en: "Ph.D J.Myadagmaa" },
        topic: {
          mn: "Монгол Улсын 40-өөс дээш насны хүн амын ясны сийрэгжилтийн шалтгаант хугарлын эрсдэлийг амьдралын чанартай холбон судлах нь",
          en: "Study on the risk of osteoporosis-related fractures in Mongolian population aged 40 and above in relation to quality of life",
        },
        publications: [
          "Jaalkhorol, M., Buckinx, F., Dashtseren, A. et al. Assessing bone and muscle health and their association in a Mongolian population aged 40 and older: a pioneering observational study. Arch Osteoporos 20, 58 (2025). https://doi.org/10.1007/s11657-025-01548-x",
          "Jaalkhorol, M., Johansson, H., Avirmed, S. et al. A surrogate FRAX model for Mongolia. Arch Osteoporos 20, 27 (2025). https://doi.org/10.1007/s11657-025-01501-y",
          "Jaalkhorol M, Dashtseren A, Magnaibayar G, Bat-Orgil B, Tsunoda I, Avirmed S, et al. (2025) Factors associated with vitamin D levels in Mongolian patients with multiple sclerosis. PLoS ONE 20(1): e0317279. https://doi.org/10.1371/journal.pone.0317279",
          "Jaalkhorol, M.; Cieślik, A.; Dashtseren, M.; Khairat, A.; Damdinbazar, O.; Ochirdorj, G.; Khurelbaatar, T.; Batmunkh, G.; Ganzorig, U.; Kozieł, S. The Relationship Between Health Parameters, Body Size, Elements of Lifestyle, and Hand Grip Strength in a Group of Patients with Type 2 Diabetes, Aged 40–98, from Ulaanbaatar, Mongolia. J. Clin. Med. 2025, 14, 102. https://doi.org/10.3390/jcm14010102",
        ],
      },
      {
        name: { mn: "АУ-ы доктор Б.Сэдэд", en: "Ph.D B.Seded" },
        topic: {
          mn: "Туршилтын амьтанд ходоод гэдэсний гүрвэлзэх хөдөлгөөнийг хэмжих арга зүйг Монгол Улсад нутагшуулах",
          en: "Localizing the methodology for measuring gastrointestinal motility in experimental animals in Mongolia",
        },
        publications: [
          "Batdorj, B., Surenjid, S., Baatar, S., Ganbold Samdandorj, Dashjamts, S., Battogtokh, G., Bai, B., & Radnaabzar, M. (2025). Purification of Calcite, a Key Mineral in Traditional Oriental Medicine, Based on Malayan Berkh Descriptions: The Purification Process of Calcites. Trends in Immunotherapy, 9(1), 148–160. https://doi.org/10.54963/ti.v9i1.927",
        ],
      },
    ],
  },
  {
    year: "2025",
    researchers: [
      {
        name: { mn: "ЭЗУ-ы доктор С.Нурбек", en: "Ph.D S.Nurbek" },
        topic: {
          mn: "Comparative study on the antidiabetic potential of Artemisia-derived peptides and synthetic insulin fragments",
          en: "Comparative study on the antidiabetic potential of Artemisia-derived peptides and synthetic insulin fragments",
        },
        topicNote: {
          mn: "Беларус улсын шинжлэх ухааны академи, Биоорганик химийн хүрээлэнтэй хамтарсан Үндэсний Шинжлэх Ухааны Технологийн сангийн төсөл /төслийн удирдагчаар/",
          en: "National Science and Technology Foundation project in collaboration with the Institute of Bioorganic Chemistry, National Academy of Sciences of Belarus /as project leader/",
        },
        publications: [],
      },
      {
        name: { mn: "ЭЗУ-ы доктор С.Нурбек", en: "Ph.D S.Nurbek" },
        topic: {
          mn: "Зэрлэг ба таримал хөх Далан хальс ургамлын үр жимсний Фитохимийн найрлага, антиоксидант идэвхийн харилцан хамаарлын харьцуулсан судалгаа",
          en: "Comparative study on the phytochemical composition and antioxidant activity correlation of wild and cultivated blue honeysuckle fruit",
        },
        topicNote: {
          mn: "Үндэсний Шинжлэх Ухааны Технологийн сангийн төсөл /төслийн үндсэн гүйцэтгэгчээр/",
          en: "National Science and Technology Foundation project /as main researcher/",
        },
        publications: [],
      },
    ],
  },
  {
    year: "2026",
    researchers: [
      {
        name: { mn: "АУ-ы доктор Р.Наранхүү", en: "Ph.D R.Narankhuu" },
        topic: {
          mn: "Уламжлалт жор найрлагад суурилсан мөнгөний нано бөөмийн найрлага бүхий хепаклин-4 эмийг туршин зохион бүтээх, жорын хэлбэрийн үйлдвэрлэл, чанар стандартчилалын судалгаа",
          en: "Research on experimental development, dosage form manufacturing, and quality standardization of Hepaclin-4 drug containing silver nanoparticles based on traditional prescription composition",
        },
        topicNote: {
          mn: "АШУҮИС-ийн ШУТИГ-ын санхүүжилттэй төсөл /төслийн гүйцэтгэгчээр/",
          en: "MNUMS Science and Technology Foundation funded project /as project researcher/",
        },
        publications: [],
      },
      {
        name: {
          mn: "АУ-ы доктор, НЭМУ-ы доктор Г.Дариймаа",
          en: "Ph.D, Ph.D in Public Health G.Dariimaa",
        },
        topic: {
          mn: "Prognostic values of Circulating Cell-Free DNA versus Tumor Stage in Carcinomas",
          en: "Prognostic values of Circulating Cell-Free DNA versus Tumor Stage in Carcinomas",
        },
        topicNote: {
          mn: "АШУҮИС-ийн Ахисан түвшний сургуулийн докторын дараах судалгааны төсөл /төслийн гүйцэтгэгчээр/",
          en: "MNUMS Graduate School post-doctoral research project /as project researcher/",
        },
        publications: [],
      },
    ],
  },
];

export default async function InterdisciplinaryCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = getDictionary(lang);
  const p = getObj(dict, "interdisciplinaryCenterPage");

  const sections = [
    { id: "introduction", label: t(dict, "menu.centerIntroduction") },
    { id: "joint-programs", label: t(dict, "menu.jointPrograms") },
    { id: "postdoc-research", label: t(dict, "menu.postdocResearch") },
  ];

  const activities = (p.activityList ?? []) as string[];

  return (
    <>
      <PageHero title={t(dict, "menu.interdisciplinaryCenter")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />

          <main className="space-y-16">
            {/* Section 1: Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.centerIntroduction")}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {t(p, "goal")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "goalText")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "activities")}
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-foreground/80 leading-[1.85]">
                    {activities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Staff cards */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "staff")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Director */}
                    <div className="rounded-xl border border-border bg-muted/30 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        {t(p, "director")}
                      </p>
                      <p className="text-foreground/70 text-sm">
                        {staffData.director.degree[lang]}
                      </p>
                      <p className="font-medium text-foreground">
                        {staffData.director.name}
                      </p>
                      <a
                        href={`mailto:${staffData.director.email}`}
                        className="text-primary hover:underline text-sm mt-1 inline-block"
                      >
                        {staffData.director.email}
                      </a>
                    </div>

                    {/* Post-doctoral researchers */}
                    {staffData.postdocs.map((postdoc, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-muted/30 p-5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                          {t(p, "postdocResearcher")}
                        </p>
                        <p className="text-foreground/70 text-sm">
                          {postdoc.degree[lang]}
                        </p>
                        <p className="font-medium text-foreground">
                          {postdoc.name}
                        </p>
                        <a
                          href={`mailto:${postdoc.email}`}
                          className="text-primary hover:underline text-sm mt-1 inline-block"
                        >
                          {postdoc.email}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Address - separate full width */}
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {t(p, "address")}
                    </p>
                    <p className="text-foreground/80">
                      {staffData.address.office[lang]}
                    </p>
                    <a
                      href={`mailto:${staffData.address.email}`}
                      className="text-primary hover:underline text-sm mt-1 inline-block"
                    >
                      {staffData.address.email}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 2: Joint Programs */}
            <section id="joint-programs" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "jointProgramsTitle")}
              </h2>
              <div className="space-y-10">
                {jointPrograms.map((program) => (
                  <div key={program.id} className="space-y-4">
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {t(p, program.title.mn)}
                      </h3>
                      <p className="text-primary font-medium">
                        {t(p, program.subtitle.mn)}
                      </p>
                    </div>
                    <div className="overflow-x-auto rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colNo")}
                            </th>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colProgram")}
                            </th>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colCode")}
                            </th>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colForm")}
                            </th>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colDuration")}
                            </th>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colCredits")}
                            </th>
                            <th className="px-3 py-3 text-left">
                              {t(p, "colSchool")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {program.rows.map((row, i) => (
                            <tr
                              key={i}
                              className={
                                i % 2 === 0 ? "bg-white" : "bg-muted/50"
                              }
                            >
                              <td className="px-3 py-2.5 text-muted-foreground">
                                {i + 1}.
                              </td>
                              <td className="px-3 py-2.5">{row.name[lang]}</td>
                              <td className="px-3 py-2.5">{row.code}</td>
                              <td className="px-3 py-2.5">{row.form[lang]}</td>
                              <td className="px-3 py-2.5">
                                {row.duration[lang]}
                              </td>
                              <td className="px-3 py-2.5">{row.credits}</td>
                              <td className="px-3 py-2.5">
                                {row.school[lang]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 3: Post-doctoral Research */}
            <section id="postdoc-research" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "postdocTitle")}
              </h2>
              <div className="space-y-10">
                {postdocResearch.map((yearData) => (
                  <div key={yearData.year} className="space-y-6">
                    <h3 className="text-xl font-bold text-primary">
                      {yearData.year} {lang === "mn" ? "он" : ""}
                    </h3>
                    {yearData.researchers.length > 0 ? (
                      <div className="space-y-6">
                        {yearData.researchers.map((researcher, i) => (
                          <div
                            key={i}
                            className="rounded-xl border-l-4 border-l-primary border border-border bg-gradient-to-r from-primary/5 to-transparent p-6"
                          >
                            <p className="font-bold text-lg text-foreground mb-3">
                              {researcher.name[lang]}
                            </p>
                            <div className="mb-4">
                              <p className="text-sm font-semibold text-primary mb-1">
                                {t(p, "projectTopic")}:
                              </p>
                              <p className="text-foreground/80 leading-relaxed">
                                {researcher.topic[lang]}
                              </p>
                              {"topicNote" in researcher &&
                                researcher.topicNote && (
                                  <p className="text-foreground/60 text-sm mt-1 italic">
                                    ({researcher.topicNote[lang]})
                                  </p>
                                )}
                            </div>
                            {researcher.publications.length > 0 && (
                              <div>
                                <p className="text-sm font-semibold text-primary mb-2">
                                  {t(p, "projectPublications")}:
                                </p>
                                <ol className="list-decimal pl-5 space-y-3 text-sm text-foreground/80">
                                  {researcher.publications.map((pub, j) => {
                                    // Extract DOI link from publication text
                                    const doiMatch = pub.match(
                                      /(https:\/\/doi\.org\/[^\s]+)/,
                                    );
                                    const doiLink = doiMatch
                                      ? doiMatch[1]
                                      : null;
                                    const textWithoutDoi = doiLink
                                      ? pub.replace(doiLink, "").trim()
                                      : pub;

                                    return (
                                      <li key={j} className="leading-relaxed">
                                        <span>{textWithoutDoi}</span>
                                        {doiLink && (
                                          <a
                                            href={doiLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline break-all"
                                          >
                                            {doiLink}
                                          </a>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ol>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

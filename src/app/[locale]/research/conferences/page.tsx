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

              {/* Council Members */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {isMn
                    ? "Салбар дундын Эрдмийн зөвлөлийн бүрэлдэхүүн"
                    : "Interdisciplinary Academic Council Members"}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-semibold text-foreground w-10">
                          №
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">
                          {isMn ? "Албан тушаал" : "Position"}
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">
                          {isMn ? "Нэр" : "Name"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {(isMn
                        ? [
                            [
                              "Эрдмийн зөвлөлийн дарга, АУ-ы доктор, дэд профессор",
                              "Ш.Үүртуяа",
                            ],
                            [
                              "Эрдмийн зөвлөлийн орлогч дарга, АУ-ы доктор, профессор",
                              "А.Товуудорж",
                            ],
                            [
                              "Эрдмийн зөвлөлийн нарийн бичгийн дарга, АУ-ы доктор, ОНАУЭММУ-ы доктор, дэд профессор",
                              "Ц.Сарнай",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, профессор",
                              "Р.Отгонбаяр",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, профессор",
                              "З.Хишигсүрэн",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, дэд профессор",
                              "А.Энх-Амар",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, дэд профессор",
                              "Ц.Алтансүх",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, дэд профессор",
                              "С.Доржбат",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, дэд профессор",
                              "Х.Дэлгэрдалай",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор, дэд профессор",
                              "Ж.Дэлгэрцэцэг",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор",
                              "Э.Сарантуяа",
                            ],
                            [
                              "Эрдмийн зөвлөлийн гишүүн, АУ-ы доктор",
                              "М.Нандин-Эрдэнэ",
                            ],
                            ["Биологийн ухааны доктор", "Н.Цэвэлмаа"],
                          ]
                        : [
                            [
                              "Chair of the Academic Council, Doctor of Medical Sciences, Associate Professor",
                              "Sh.Uurtuya",
                            ],
                            [
                              "Vice Chair of the Academic Council, Doctor of Medical Sciences, Professor",
                              "A.Tovuudorj",
                            ],
                            [
                              "Secretary of the Academic Council, Doctor of Medical Sciences, Doctor of ONAUEМMU, Associate Professor",
                              "Ts.Sarnai",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Professor",
                              "R.Otgonbayar",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Professor",
                              "Z.Khishigsuren",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Associate Professor",
                              "A.Enkh-Amar",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Associate Professor",
                              "Ts.Altansukh",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Associate Professor",
                              "S.Dorjbat",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Associate Professor",
                              "Kh.Delgerdalai",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences, Associate Professor",
                              "J.Delgertsetseg",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences",
                              "E.Sarantuya",
                            ],
                            [
                              "Council Member, Doctor of Medical Sciences",
                              "M.Nandin-Erdene",
                            ],
                            ["Doctor of Biological Sciences", "N.Tsevelmaa"],
                          ]
                      ).map(([position, name], i) => (
                        <tr
                          key={i}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-4 py-3 text-foreground/75">
                            {i + 1}
                          </td>
                          <td className="px-4 py-3 text-foreground/75">
                            {position}
                          </td>
                          <td className="px-4 py-3 font-medium text-foreground">
                            {name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Agenda */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {isMn ? "Хэлэлцэх асуудал" : "Agenda"}
                </h3>
                <ol className="list-decimal list-outside pl-6 space-y-3 text-foreground/75 leading-[1.85] text-base">
                  {(isMn
                    ? [
                        'Докторын зэрэг горилогчийн эрдэм шинжилгээний ажлын сэдэв, аргачлал болон удирдагч батлах, явцын хэлэлцүүлэг, магистрын зэрэг горилогчийн эрдэм шинжилгээний ажлын жинхэнэ хамгаалалтын хэлэлцүүлэг зэргийг тус тус АШУҮИС-ийн "Төгсөлтийн сургалтын үйл ажиллагааг зохицуулах журам"-д заасны дагуу шийдвэрлэх',
                        "Бүрэлдэхүүний Эрдмийн зөвлөлийн журам, түүнд орсон нэмэлт өөрчлөлтийг хэлэлцэн, санал дүгнэлтээ АШУҮИС-ийн Эрдмийн зөвлөлд хүргүүлэх",
                        "Бүрэлдэхүүн сургуулийн хөгжлийн бодлого, стратеги төлөвлөгөө, сургуулиас баримтлах бодлогын баримт бичиг, хөтөлбөрийг хэлэлцэн санал дүгнэлт гаргах",
                        "Бүрэлдэхүүн сургуулийн эрдэм шинжилгээний ажлын тэргүүлэх чиглэл батлах",
                        "Бүрэлдэхүүн сургуулийн сургалтын төлөвлөгөө, хөтөлбөр, стандартыг хэлэлцэх, санал, дүгнэлт гарган Хөтөлбөрийн хороонд хүргүүлэх",
                        "Бүрэлдэхүүн сургуулийн үйл ажиллагааны тайланг хэлэлцэн, үнэлэлт дүгнэлт өгч, цаашдын зорилго чиглэлийг тодорхойлон, санал гаргах",
                        "Гадаадын их дээд сургууль, эрдэм шинжилгээний байгууллагатай хамтран ажиллах чиглэлийг тодорхойлох, гэрээ хэлэлцээр байгуулах асуудлыг хэлэлцэн санал дүгнэлт гаргах",
                        'АШУҮИС-ийн "Хүндэт доктор", "Хүндэт профессор", "Зочин профессор" цол олгох асуудлыг "АШУҮИС-ийн хүндэт доктор, хүндэт профессор, зочин профессор олгох журам"-ын дагуу хэлэлцэн шийдвэрлэж Эрдмийн зөвлөлд хүргүүлнэ.',
                        'АШУҮИС-ийн "Профессор", "Дэд профессор", "Клиникийн профессор" цол олгох асуудлыг "АШУҮИС-ийн Эрдмийн цол олгох журам"-ын дагуу хэлэлцэн шийдвэрлэж, АШУҮИС-ийн Эрдмийн Зөвлөлд хүргүүлэх',
                        "Эрдмийн шилдэг бүтээлийн шагнал олгуулахаар мэргэжлийн тэнхимээс санал болгосон бүтээлийг хэлэлцэн шийдвэр гаргах, саналыг АШУҮИС-ийн Эрдмийн Зөвлөлд хүргүүлэх",
                        "АШУҮИС-ийн ШУТДС болон Төр, Хувийн хэвшлийн байгууллага, ТББ-тай хамтран хийгдэх эрдэм шинжилгээний төсөлт ажлыг захиалахаар санал дэвшүүлэх, төслийн явцын хэлэлцүүлгийг хийж үнэлэлт өгөх, санал, зөвлөмжөө холбогдох газруудад хүргүүлэх",
                        "АШУҮИС-ийн ШУТДС-ийн санхүүжилттэй Докторын дараах судалгааны тэтгэлэг, Зочин судлаачийн судалгааны төсөл, Судлаачдыг чадавхжуулах богино хугацааны сургалтын тэтгэлгийн санхүүжилтийн квотыг тогтоох, үр дүн ба санхүүгийн эцсийн тайланг хэлэлцэж үнэлэлт, дүгнэлт гарган АШУҮИС-ийн захиргаанд хүргүүлэх",
                      ]
                    : [
                        'Approve doctoral dissertation topics, methodologies, and supervisors; conduct progress reviews; and hold thesis defense hearings for master\'s degree candidates in accordance with the MNUMS "Regulation on Graduate Training Activities"',
                        "Discuss amendments to the Constituent Academic Council regulations and submit recommendations to the MNUMS Academic Council",
                        "Discuss and provide recommendations on the constituent school's development policy, strategic plan, policy documents, and programs",
                        "Approve priority research directions for the constituent school",
                        "Discuss the constituent school's curriculum, programs, and standards, and submit recommendations to the Program Committee",
                        "Review the constituent school's activity reports, provide evaluations, define future goals and directions, and make recommendations",
                        "Determine directions for collaboration with foreign universities and research institutions, and discuss and provide recommendations on establishing agreements",
                        'Discuss and decide on awarding MNUMS "Honorary Doctor", "Honorary Professor", and "Visiting Professor" titles in accordance with the relevant regulations, and submit to the Academic Council',
                        'Discuss and decide on awarding MNUMS "Professor", "Associate Professor", and "Clinical Professor" titles in accordance with the "MNUMS Academic Title Awarding Regulation", and submit to the MNUMS Academic Council',
                        "Discuss and decide on works nominated by professional departments for the Best Academic Work Award, and submit recommendations to the MNUMS Academic Council",
                        "Propose collaborative research projects with MNUMS School of Science, Technology and Innovation, government agencies, private sector organizations, and NGOs; conduct project progress reviews and evaluations; and submit recommendations to relevant departments",
                        "Determine funding quotas for MNUMS-funded Postdoctoral Research Fellowships, Visiting Researcher Projects, and Short-term Researcher Capacity Building Training Grants; review final results and financial reports; and submit evaluations to the MNUMS administration",
                      ]
                  ).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>

              {/* Regulation link */}
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-foreground/75 text-base mb-2">
                  {isMn
                    ? "Бүрэлдэхүүн сургуулийн Эрдмийн зөвлөлийн үйл ажиллагааны үлгэрчилсэн журамтай"
                    : "View the Model Regulation on the Activities of the Constituent School Academic Council"}
                </p>
                <a
                  href="https://drive.google.com/file/d/1jZZhRsbA7DG5hjWVoVT61QAFjjvWkrrA/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-primary hover:text-primary-light underline underline-offset-2 inline-flex items-center gap-1.5 transition-colors font-medium"
                >
                  {isMn ? "Энд дарж танилцана уу" : "Click here to view"}
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
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

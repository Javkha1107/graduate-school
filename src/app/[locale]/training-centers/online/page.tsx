import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.onlineCenter") };
}

const programs: Record<Locale, string[]> = {
  mn: [
    "Анагаах ухаан",
    "Нийгмийн эрүүл мэнд",
    "Уламжлалт анагаах ухаан",
    "Эм зүйн ухаан",
    "Нүүр ам судлал",
    "Сувилахуйн ухаан",
    "Бакалавр – Магистрын нэгдмэл агуулгатай хөтөлбөр",
  ],
  en: [
    "Medicine",
    "Public Health",
    "Traditional Medicine",
    "Pharmacy",
    "Dentistry",
    "Nursing",
    "Integrated Bachelor–Master's Programme",
  ],
};

export default async function OnlineCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = getDictionary(lang);

  const isMn = lang === "mn";

  return (
    <>
      <PageHero title={t(dict, "menu.onlineCenter")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-16">
          <section id="online-master" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t(dict, "menu.onlineMasterTraining")}
            </h2>

            <div className="space-y-6">
              {/* Introduction */}
              <p className="text-foreground/80 leading-[1.85]">
                {isMn
                  ? "Олон улсын цахим сургалтын төв нь 2015 онд байгуулагдсан ба магистрын сургалтыг цахим хэлбэрээр дараах 7 хөтөлбөрт элсэлт авч сургалт явуулдаг."
                  : "The International Center for e-Learning (ICEC) was established in 2015 and offers online master's degree programmes in the following 7 fields."}
              </p>

              {/* Programs list */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {isMn ? "Хөтөлбөрүүд" : "Programmes"}
                </h3>
                <ol className="list-decimal pl-5 space-y-1.5 text-foreground/80 leading-[1.85]">
                  {programs[lang].map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ol>
              </div>

              {/* Accreditation */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {isMn ? "Магадлан итгэмжлэл" : "Accreditation"}
                </h3>
                <p className="text-foreground/80 leading-[1.85]">
                  {isMn
                    ? "Эдгээр хөтөлбөрөөс анагаах ухаан хөтөлбөр нь ACQUIN олон улсын байгууллага болон Монгол Улсын БМИҮЗ-өөр тус тус 6 жилийн хугацаатай магадлан итгэмжлэгдсэн."
                    : "Among these programmes, the Medicine programme has been accredited for 6 years by both the international ACQUIN agency and Mongolia's NAQAE."}
                </p>
              </div>

              {/* Curriculum details */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {isMn ? "Сургалтын агуулга" : "Curriculum"}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-[1.85]">
                  <li>
                    {isMn
                      ? "Хөтөлбөрүүд нь 2 жилийн хугацаанд судлах нийт 30 багц цагийн агуулгатай ба судалгааны төсөл туурвиж магистрын зэрэг хамгаалдаг."
                      : "The programmes consist of 30 credits over 2 years, culminating in a research project and master's degree defence."}
                  </li>
                  <li>
                    {isMn
                      ? "Магистрын зэрэг хамгаалалт АШУҮИС-ийн захирлын А/28 тоот тушаалаар зохицуулагддаг."
                      : "The master's degree defence is regulated by MNUMS President's Order No. A/28."}
                  </li>
                  <li>
                    {isMn
                      ? "Сургалт нь АШУҮИС-ийн доктороос дээш эрдмийн зэрэг, цолтой 498 багшийг түшиглэн сургалтын МҮҮДЛ системээр явагддаг."
                      : "The training is delivered through the Moodle LMS, supported by 498 faculty members holding doctoral degrees or higher from MNUMS."}
                  </li>
                  <li>
                    {isMn
                      ? "Танхимийн магистрын сургалтын хөтөлбөрийн хичээлүүдтэй адил агуулгатайгаар цахимаар явагдана."
                      : "The online curriculum mirrors the content of the on-campus master's programme."}
                  </li>
                </ul>
              </div>

              {/* Website link */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {isMn ? "Дэлгэрэнгүй мэдээлэл" : "More Information"}
                </h3>
                <p className="text-foreground/80 leading-[1.85]">
                  {isMn
                    ? "Дэлгэрэнгүй мэдээллийг Олон улсын цахим сургалтын төвийн сайтаас авна уу:"
                    : "For more details, please visit the ICEC website:"}
                </p>
                <a
                  href="https://icec.mnums.edu.mn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mt-2"
                >
                  https://icec.mnums.edu.mn/
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Contact info */}
              <div className="rounded-xl border border-border bg-muted/30 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  {isMn ? "Холбоо барих" : "Contact"}
                </p>
                <div className="space-y-1.5 text-foreground/80 text-sm">
                  <p>
                    <span className="font-medium text-foreground">
                      {isMn ? "Хаяг:" : "Address:"}
                    </span>{" "}
                    {isMn
                      ? "АШУҮИС-ийн төв байрны 6 тоот"
                      : "MNUMS Main Building, Room 6"}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      {isMn ? "Цахим хаяг:" : "Email:"}
                    </span>{" "}
                    <a
                      href="mailto:grad.icec@mnums.edu.mn"
                      className="text-primary hover:underline"
                    >
                      grad.icec@mnums.edu.mn
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

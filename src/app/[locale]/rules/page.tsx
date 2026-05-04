import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.rulesRegulations") };
}

export default async function RulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  const sections = [
    { id: "postgraduate-rules", label: t(dict, "menu.postgraduateRules") },
    { id: "graduate-rules", label: t(dict, "menu.graduateRules") },
    { id: "online-master-rules", label: t(dict, "menu.onlineMasterRules") },
  ];

  return (
    <>
      <PageHero title={t(dict, "menu.rulesRegulations")} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <PageSidebar
            sections={sections}
            onThisPageLabel={t(dict, "menu.onThisPage")}
          />
          <main className="space-y-16">
            <section id="postgraduate-rules" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateRules")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-[1.85]">
                <li>
                  <a
                    href="https://uucbkbmbtwcxuysmebwu.supabase.co/storage/v1/object/public/files/juram/juram.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ТӨГСӨЛТИЙН ДАРААХ СУРГАЛТЫН ҮЙЛ АЖИЛЛАГААГ ЗОХИЦУУЛАХ ЖУРАМ
                  </a>
                </li>
                <li>
                  <a
                    href="http://postgraduate.mnums.edu.mn/?page_id=1782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    БИЧИГ БАРИМТ НӨХӨН ОЛГОХ
                  </a>
                </li>
                <li>
                  ТӨРИЙН САНГААР СУРАЛЦАГЧИЙН ИРЦИЙН БҮРТГЭЛИЙН ХУУДАС
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      <a
                        href="http://postgraduate.mnums.edu.mn/wp-content/uploads/2026/02/%D2%AE%D0%9D%D0%94%D0%A1%D0%AD%D0%9D-%D0%91%D2%AE%D0%A0%D0%A2%D0%93%D0%AD%D0%9B%D0%98%D0%99%D0%9D-%D0%A5%D0%A3%D0%A3%D0%94%D0%90%D0%A1.docx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        ҮНДСЭН МЭРГЭШЛИЙН БҮРТГЭЛИЙН ХУУДАС
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://postgraduate.mnums.edu.mn/wp-content/uploads/2026/02/%D0%A2%D3%A8%D0%A0%D3%A8%D0%9B%D0%96%D0%A1%D3%A8%D0%9D-%D0%91%D2%AE%D0%A0%D0%A2%D0%93%D0%AD%D0%9B%D0%98%D0%99%D0%9D-%D0%A5%D0%A3%D0%A3%D0%94%D0%90%D0%A1.docx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        ТӨРӨЛЖСӨН МЭРГЭШЛИЙН БҮРТГЭЛИЙН ХУУДАС
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="http://postgraduate.mnums.edu.mn/?page_id=3010#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    РЕЗИДЕНСИЙН СУРГАЛТЫН ЭЛСЭЛТИЙН НИЙТЛЭГ ШААРДЛАГА
                  </a>
                </li>
                <li>
                  <a
                    href="http://postgraduate.mnums.edu.mn/wp-content/uploads/2019/10/%D0%AD%D0%BB%D1%81%D1%8D%D0%B3%D1%87%D0%B4%D1%8D%D0%B4-%D1%82%D0%B0%D0%B2%D0%B8%D0%B3%D0%B4%D0%B0%D1%85-%D0%B5%D1%80%D3%A9%D0%BD%D1%85%D0%B8%D0%B9-%D1%88%D0%B0%D0%B0%D1%80%D0%B4%D0%BB%D0%B0%D0%B3%D0%B0-%D0%A2%D3%A8%D0%A0%D3%A8%D0%9B%D0%96%D0%A1%D3%A8%D0%9D-%D0%A1%D0%A3%D0%A0%D0%93%D0%90%D0%9B%D0%A2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ТӨРӨЛЖСӨН МЭРЭГШЛИЙН СУРГАЛТЫН ЭЛСЭЛТИЙН НИЙТЛЭГ ШААРДЛАГА
                  </a>
                </li>
                <li>
                  <a
                    href="http://postgraduate.mnums.edu.mn/wp-content/uploads/2025/05/%D0%90.445-%D1%82%D1%83%D1%88%D0%B0%D0%B0%D0%BB.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    &quot;ТӨГСӨЛТИЙН ДАРААХ ҮНДСЭН БА ТӨРӨЛЖСӨН МЭРГЭШЛИЙН
                    СУРГАЛТЫН ЧИГЛЭЛ ИНДЕКС БАТЛАХ ТУХАЙ&quot; – ЭМС-ЫН 2021 ОНЫ
                    А/445 ДУГААР ТУШААЛ
                  </a>
                </li>
                <li>
                  <a
                    href="http://postgraduate.mnums.edu.mn/wp-content/uploads/2025/05/2017.09.01-%D0%90337-TDS.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    &quot;МЭРГЭШҮҮЛЭХ БОЛОН ТАСРАЛТГҮЙ СУРГАЛТ ЗОХИОН БАЙГУУЛАХ,
                    СУРГАЛТ ЭРХЛЭХ БАЙГУУЛЛАГЫН СОНГОХ, ЗӨВШӨӨРӨЛ ОЛГОХ, СУНГАХ,
                    ХҮЧИНГҮЙ БОЛГОХ ЖУРАМ&quot; – ЭМС-ЫН 2017 ОНЫ А337 ДУГААР
                    ТУШААЛ
                  </a>
                </li>
              </ul>
            </section>

            <hr className="border-t-2 border-primary/30" />

            <section id="graduate-rules" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.graduateRules")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-[1.85]">
                <li>
                  <a
                    href="http://gp.mnums.edu.mn/wp-content/uploads/2021/03/juram.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ТӨГСӨЛТИЙН СУРГАЛТЫН ҮЙЛ АЖИЛЛАГААГ ЗОХИЦУУЛАХ ЖУРАМ
                  </a>
                </li>
                <li>
                  <a
                    href="https://drive.google.com/file/d/1NU9vCJw-c7rR-BCJNQAnJoHM2x3RWBlS/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    МАГИСТР, ДОКТОРЫН СУРГАЛТ ЭРХЛЭХ НИЙТЛЭГ ЖУРАМ
                  </a>
                </li>
                <li>
                  <a
                    href="http://icums.mnums.edu.mn/pluginfile.php/68589/block_html/content/cyber%20tusul%20bichih%20zaavar.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    СУДАЛГААНЫ ТӨСӨЛ БИЧИХ МОНГОЛ ЗААВАР
                  </a>
                </li>
                <li>
                  <a
                    href="http://icums.mnums.edu.mn/pluginfile.php/68589/block_html/content/Proposal%20guideline%20ENG.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    СУДАЛГААНЫ ТӨСӨЛ БИЧИХ АНГЛИ ЗААВАР
                  </a>
                </li>
                <li>
                  <a
                    href="http://icums.mnums.edu.mn/pluginfile.php/68589/block_html/content/%D0%A1%D1%83%D0%B4%D0%B0%D0%BB%D0%B3%D0%B0%D0%B0%D0%BD%D1%8B%20%D1%82%D3%A9%D1%81%D3%A9%D0%BB%20%D0%B1%D0%B8%D1%87%D0%B8%D1%85%20%D0%B7%D0%B0%D0%B3%D0%B2%D0%B0%D1%80%202023.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    СУДАЛГААНЫ ТӨСӨЛ БИЧИХ ЗАГВАР ФАЙЛ
                  </a>
                </li>
                <li>
                  <a
                    href="http://103.87.69.106/staticpages/iltgeh.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    УРЬДЧИЛСАН ХАМГААЛАЛТЫН ИЛТГЭХ ХУУДАСНЫ ЗАГВАР
                  </a>
                </li>
                <li>
                  <a
                    href="http://spellcheck.gov.mn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    СУДАЛГААНЫ ТӨСЛИЙН МОНГОЛ ХЭЛНИЙ ДҮРМИЙН ЗАСВАР ХИЙХ ЛИНК
                  </a>
                </li>
                <li>
                  <a
                    href="http://rules.mnums.edu.mn/2018/06/06/1002/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ЭРҮҮЛ МЭНД БОЛОН БОЛОВСРОЛТОЙ ХОЛБООТОЙ БУСАД ДҮРЭМ ЖУРАМ
                  </a>
                </li>
                <li>
                  <a
                    href="http://gedu.mnums.edu.mn/?page_id=1782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    БИЧИГ БАРИМТ НӨХӨН ОЛГОХ
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.iaac.mn/category/49?menu=125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    АВИЛГАЛТАЙ ТЭМЦЭХ ГАЗРЫН ХУУЛЬ ТОГТООМЖ
                  </a>
                </li>
                <li>
                  <a
                    href="https://mecss.gov.mn/category/70/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    БОЛОВСРОЛ, СОЁЛ, ШИНЖЛЭХ УХААН, СПОРТЫН ЯАМНЫ ЖУРАМ
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.mohs.mn/index.php/laws/10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    ЭРҮҮЛ МЭНДИЙН ЯАМНЫ ДҮРЭМ ЖУРАМ
                  </a>
                </li>
              </ul>
            </section>

            <hr className="border-t-2 border-primary/30" />

            <section id="online-master-rules" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.onlineMasterRules")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-[1.85]">
                <li>
                  <a
                    href="https://icec.mnums.edu.mn/?lang=mn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    https://icec.mnums.edu.mn/?lang=mn
                  </a>
                </li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

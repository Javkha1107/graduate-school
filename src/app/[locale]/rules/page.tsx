import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import { ExternalLink, FileText } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.rulesRegulations") };
}

type RuleLink = {
  label: string;
  href: string;
  children?: RuleLink[];
};

function RuleLinkCard({ link }: { link: RuleLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3.5 hover:bg-primary/5 hover:border-primary/30 transition-all group"
    >
      <FileText className="w-4.5 h-4.5 text-primary/70 shrink-0 group-hover:text-primary transition-colors" />
      <span className="text-foreground/85 text-sm flex-1 leading-relaxed">
        {link.label}
      </span>
      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
    </a>
  );
}

function RuleLinkGroup({ link }: { link: RuleLink }) {
  if (link.children && link.children.length > 0) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground/80 pl-1">
          {link.label}
        </p>
        <div className="space-y-2 pl-4 border-l-2 border-primary/20">
          {link.children.map((child, i) => (
            <RuleLinkCard key={i} link={child} />
          ))}
        </div>
      </div>
    );
  }

  return <RuleLinkCard link={link} />;
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

  const postgraduateLinks: RuleLink[] = [
    {
      label: "ТӨГСӨЛТИЙН ДАРААХ СУРГАЛТЫН ҮЙЛ АЖИЛЛАГААГ ЗОХИЦУУЛАХ ЖУРАМ",
      href: "https://uucbkbmbtwcxuysmebwu.supabase.co/storage/v1/object/public/files/juram/juram.pdf",
    },
    {
      label: "БИЧИГ БАРИМТ НӨХӨН ОЛГОХ",
      href: "http://postgraduate.mnums.edu.mn/?page_id=1782",
    },
    {
      label: "ТӨРИЙН САНГААР СУРАЛЦАГЧИЙН ИРЦИЙН БҮРТГЭЛИЙН ХУУДАС",
      href: "#",
      children: [
        {
          label: "ҮНДСЭН МЭРГЭШЛИЙН БҮРТГЭЛИЙН ХУУДАС",
          href: "http://postgraduate.mnums.edu.mn/wp-content/uploads/2026/02/%D2%AE%D0%9D%D0%94%D0%A1%D0%AD%D0%9D-%D0%91%D2%AE%D0%A0%D0%A2%D0%93%D0%AD%D0%9B%D0%98%D0%99%D0%9D-%D0%A5%D0%A3%D0%A3%D0%94%D0%90%D0%A1.docx",
        },
        {
          label: "ТӨРӨЛЖСӨН МЭРГЭШЛИЙН БҮРТГЭЛИЙН ХУУДАС",
          href: "http://postgraduate.mnums.edu.mn/wp-content/uploads/2026/02/%D0%A2%D3%A8%D0%A0%D3%A8%D0%9B%D0%96%D0%A1%D3%A8%D0%9D-%D0%91%D2%AE%D0%A0%D0%A2%D0%93%D0%AD%D0%9B%D0%98%D0%99%D0%9D-%D0%A5%D0%A3%D0%A3%D0%94%D0%90%D0%A1.docx",
        },
      ],
    },
    {
      label: "РЕЗИДЕНСИЙН СУРГАЛТЫН ЭЛСЭЛТИЙН НИЙТЛЭГ ШААРДЛАГА",
      href: "http://postgraduate.mnums.edu.mn/?page_id=3010#",
    },
    {
      label: "ТӨРӨЛЖСӨН МЭРЭГШЛИЙН СУРГАЛТЫН ЭЛСЭЛТИЙН НИЙТЛЭГ ШААРДЛАГА",
      href: "http://postgraduate.mnums.edu.mn/wp-content/uploads/2019/10/%D0%AD%D0%BB%D1%81%D1%8D%D0%B3%D1%87%D0%B4%D1%8D%D0%B4-%D1%82%D0%B0%D0%B2%D0%B8%D0%B3%D0%B4%D0%B0%D1%85-%D0%B5%D1%80%D3%A9%D0%BD%D1%85%D0%B8%D0%B9-%D1%88%D0%B0%D0%B0%D1%80%D0%B4%D0%BB%D0%B0%D0%B3%D0%B0-%D0%A2%D3%A8%D0%A0%D3%A8%D0%9B%D0%96%D0%A1%D3%A8%D0%9D-%D0%A1%D0%A3%D0%A0%D0%93%D0%90%D0%9B%D0%A2.pdf",
    },
    {
      label:
        '"ТӨГСӨЛТИЙН ДАРААХ ҮНДСЭН БА ТӨРӨЛЖСӨН МЭРГЭШЛИЙН СУРГАЛТЫН ЧИГЛЭЛ ИНДЕКС БАТЛАХ ТУХАЙ" – ЭМС-ЫН 2021 ОНЫ А/445 ДУГААР ТУШААЛ',
      href: "http://postgraduate.mnums.edu.mn/wp-content/uploads/2025/05/%D0%90.445-%D1%82%D1%83%D1%88%D0%B0%D0%B0%D0%BB.pdf",
    },
    {
      label:
        '"МЭРГЭШҮҮЛЭХ БОЛОН ТАСРАЛТГҮЙ СУРГАЛТ ЗОХИОН БАЙГУУЛАХ, СУРГАЛТ ЭРХЛЭХ БАЙГУУЛЛАГЫН СОНГОХ, ЗӨВШӨӨРӨЛ ОЛГОХ, СУНГАХ, ХҮЧИНГҮЙ БОЛГОХ ЖУРАМ" – ЭМС-ЫН 2017 ОНЫ А337 ДУГААР ТУШААЛ',
      href: "http://postgraduate.mnums.edu.mn/wp-content/uploads/2025/05/2017.09.01-%D0%90337-TDS.pdf",
    },
  ];

  const graduateLinks: RuleLink[] = [
    {
      label: "ТӨГСӨЛТИЙН СУРГАЛТЫН ҮЙЛ АЖИЛЛАГААГ ЗОХИЦУУЛАХ ЖУРАМ",
      href: "http://gp.mnums.edu.mn/wp-content/uploads/2021/03/juram.pdf",
    },
    {
      label: "МАГИСТР, ДОКТОРЫН СУРГАЛТ ЭРХЛЭХ НИЙТЛЭГ ЖУРАМ",
      href: "https://drive.google.com/file/d/1NU9vCJw-c7rR-BCJNQAnJoHM2x3RWBlS/view?usp=sharing",
    },
    {
      label: "СУДАЛГААНЫ ТӨСӨЛ БИЧИХ МОНГОЛ ЗААВАР",
      href: "http://icums.mnums.edu.mn/pluginfile.php/68589/block_html/content/cyber%20tusul%20bichih%20zaavar.pdf",
    },
    {
      label: "СУДАЛГААНЫ ТӨСӨЛ БИЧИХ АНГЛИ ЗААВАР",
      href: "http://icums.mnums.edu.mn/pluginfile.php/68589/block_html/content/Proposal%20guideline%20ENG.pdf",
    },
    {
      label: "СУДАЛГААНЫ ТӨСӨЛ БИЧИХ ЗАГВАР ФАЙЛ",
      href: "http://icums.mnums.edu.mn/pluginfile.php/68589/block_html/content/%D0%A1%D1%83%D0%B4%D0%B0%D0%BB%D0%B3%D0%B0%D0%B0%D0%BD%D1%8B%20%D1%82%D3%A9%D1%81%D3%A9%D0%BB%20%D0%B1%D0%B8%D1%87%D0%B8%D1%85%20%D0%B7%D0%B0%D0%B3%D0%B2%D0%B0%D1%80%202023.docx",
    },
    {
      label: "УРЬДЧИЛСАН ХАМГААЛАЛТЫН ИЛТГЭХ ХУУДАСНЫ ЗАГВАР",
      href: "http://103.87.69.106/staticpages/iltgeh.xlsx",
    },
    {
      label: "СУДАЛГААНЫ ТӨСЛИЙН МОНГОЛ ХЭЛНИЙ ДҮРМИЙН ЗАСВАР ХИЙХ ЛИНК",
      href: "http://spellcheck.gov.mn/",
    },
    {
      label: "ЭРҮҮЛ МЭНД БОЛОН БОЛОВСРОЛТОЙ ХОЛБООТОЙ БУСАД ДҮРЭМ ЖУРАМ",
      href: "http://rules.mnums.edu.mn/2018/06/06/1002/",
    },
    {
      label: "БИЧИГ БАРИМТ НӨХӨН ОЛГОХ",
      href: "http://gedu.mnums.edu.mn/?page_id=1782",
    },
    {
      label: "АВИЛГАЛТАЙ ТЭМЦЭХ ГАЗРЫН ХУУЛЬ ТОГТООМЖ",
      href: "https://www.iaac.mn/category/49?menu=125",
    },
    {
      label: "БОЛОВСРОЛ, СОЁЛ, ШИНЖЛЭХ УХААН, СПОРТЫН ЯАМНЫ ЖУРАМ",
      href: "https://mecss.gov.mn/category/70/",
    },
    {
      label: "ЭРҮҮЛ МЭНДИЙН ЯАМНЫ ДҮРЭМ ЖУРАМ",
      href: "http://www.mohs.mn/index.php/laws/10",
    },
  ];

  const onlineMasterLinks: RuleLink[] = [
    {
      label: "Олон улсын цахим сургалтын төвийн вэб хуудас",
      href: "https://icec.mnums.edu.mn/?lang=mn",
    },
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
            {/* Төгсөлтийн дараах сургалт */}
            <section id="postgraduate-rules" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.postgraduateRules")}
              </h2>
              <div className="space-y-3">
                {postgraduateLinks.map((link, i) => (
                  <RuleLinkGroup key={i} link={link} />
                ))}
              </div>
            </section>

            <hr className="border-t-2 border-primary/20" />

            {/* Төгсөлтийн сургалт */}
            <section id="graduate-rules" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.graduateRules")}
              </h2>
              <div className="space-y-3">
                {graduateLinks.map((link, i) => (
                  <RuleLinkGroup key={i} link={link} />
                ))}
              </div>
            </section>

            <hr className="border-t-2 border-primary/20" />

            {/* Цахим магистрын сургалт */}
            <section id="online-master-rules" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.onlineMasterRules")}
              </h2>
              <div className="space-y-3">
                {onlineMasterLinks.map((link, i) => (
                  <RuleLinkGroup key={i} link={link} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

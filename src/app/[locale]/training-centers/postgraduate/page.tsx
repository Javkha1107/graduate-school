import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import {
  basicSpecializations,
  trainingPrograms,
  subspecializations,
  baseHospitals,
} from "@/data/postgraduate-center";
import { getHospitals } from "@/lib/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: t(getDictionary(locale as Locale), "menu.postgraduateCenter"),
  };
}

interface Step {
  text: string;
  sub?: string[];
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-[1.85]">
      {steps.map((step, i) => (
        <li key={i}>
          <span dangerouslySetInnerHTML={{ __html: step.text }} />
          {step.sub && step.sub.length > 0 && (
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {step.sub.map((s, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function PostgraduateCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = getDictionary(lang);
  const p = getObj(dict, "postgraduateCenterPage");
  const dbHospitals = await getHospitals();

  const sections = [
    { id: "admission", label: t(dict, "menu.postgraduateAdmission") },
    { id: "graduation", label: t(dict, "menu.postgraduateGraduation") },
    { id: "basic", label: t(dict, "menu.postgraduateBasic") },
    { id: "subspecialization", label: t(dict, "menu.postgraduateSubspec") },
    { id: "programs", label: t(dict, "menu.postgraduatePrograms") },
    { id: "hospitals", label: t(dict, "menu.postgraduateHospitals") },
  ];

  const graduationType1Steps = (p.graduationType1Steps ?? []) as Step[];

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
            {/* ── ЭЛСЭЛТ ── */}
            <section id="admission" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "admissionTitle")}
              </h2>
              <div className="space-y-6">
                <p className="text-foreground/80 leading-[1.85]">
                  {t(p, "admissionIntro")}
                </p>

                {/* Type 1 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "admissionType1Title")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "admissionType1Text")}
                  </p>
                </div>

                {/* Type 2 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "admissionType2Title")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "admissionType2Text")}
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-foreground/80 leading-[1.85]">
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionType2Scope")}
                      </span>{" "}
                      {t(p, "admissionType2ScopeText")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionType2TrainingType")}
                      </span>{" "}
                      {t(p, "admissionType2TrainingTypeText")}
                    </li>
                  </ul>
                </div>

                {/* Type 3 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "admissionType3Title")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "admissionType3Text")}
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-foreground/80 leading-[1.85]">
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionType3Scope")}
                      </span>{" "}
                      {t(p, "admissionType3ScopeText")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionType3TrainingType")}
                      </span>{" "}
                      {t(p, "admissionType3TrainingTypeText")}
                    </li>
                  </ul>
                </div>

                <hr className="border-border" />

                {/* Admission Organization */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "admissionOrgTitle")}
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-foreground/80 leading-[1.85]">
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionScheduleLabel")}
                      </span>{" "}
                      {t(p, "admissionScheduleText")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionRegLabel")}
                      </span>{" "}
                      {t(p, "admissionRegText")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t(p, "admissionBaseLabel")}
                      </span>{" "}
                      {t(p, "admissionBaseText")}
                    </li>
                  </ul>
                </div>

                {/* Contact card */}
                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    {t(p, "admissionContactTitle")}
                  </p>
                  <ul className="space-y-1 text-foreground/80 text-sm">
                    <li>
                      <span className="font-semibold">
                        {t(p, "contactAddressLabel")}
                      </span>{" "}
                      {t(p, "admissionContactAddress")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t(p, "contactPhoneLabel")}
                      </span>{" "}
                      {t(p, "admissionContactPhone")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t(p, "contactEmailLabel")}
                      </span>{" "}
                      <a
                        href={`mailto:${t(p, "admissionContactEmail")}`}
                        className="text-primary hover:underline"
                      >
                        {t(p, "admissionContactEmail")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── ТӨГСӨЛТ ── */}
            <section id="graduation" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "graduationTitle")}
              </h2>
              <div className="space-y-6">
                <p className="text-foreground/80 leading-[1.85]">
                  {t(p, "graduationIntro")}
                </p>

                {/* Type 1 - Residency graduation */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "graduationType1Title")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "graduationType1Text")}
                  </p>
                  <StepList steps={graduationType1Steps} />
                </div>

                {/* Type 2 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "graduationType2Title")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "graduationType2Text")}
                  </p>
                  <ul className="list-disc pl-5 text-foreground/80 leading-[1.85]">
                    <li>{t(p, "graduationType2Detail")}</li>
                  </ul>
                </div>

                {/* Type 3 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(p, "graduationType3Title")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "graduationType3Text")}
                  </p>
                  <ul className="list-disc pl-5 text-foreground/80 leading-[1.85]">
                    <li>{t(p, "graduationType3Detail")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ── ҮНДСЭН МЭРГЭШЛИЙН ЧИГЛЭЛ ── */}
            <section id="basic" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "basicTitle")}
              </h2>
              <div className="space-y-8">
                {basicSpecializations.map((group, gi) => (
                  <div key={gi} className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground">
                      {group.title[lang]}
                    </h3>
                    <div className="overflow-x-auto rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th className="px-3 py-2.5 text-left w-12">№</th>
                            <th className="px-3 py-2.5 text-left">
                              {lang === "mn"
                                ? "Мэргэшлийн чиглэл"
                                : "Specialization"}
                            </th>
                            <th className="px-3 py-2.5 text-left w-28">
                              {lang === "mn" ? "Хугацаа" : "Duration"}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.items.map((item, i) => (
                            <tr
                              key={i}
                              className={
                                i % 2 === 0 ? "bg-white" : "bg-muted/50"
                              }
                            >
                              <td className="px-3 py-2 text-muted-foreground">
                                {i + 1}.
                              </td>
                              <td className="px-3 py-2">{item.name[lang]}</td>
                              <td className="px-3 py-2">
                                {item.duration[lang]}
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

            {/* ── ТӨРӨЛЖСӨН МЭРГЭШЛИЙН СУРГАЛТ ── */}
            <section id="subspecialization" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t(p, "subspecTitle")}
              </h2>
              <p className="text-foreground/80 leading-[1.85] mb-6 text-sm">
                {t(p, "subspecNote")}
              </p>
              <div className="space-y-10">
                {subspecializations.map((group, gi) => (
                  <div key={gi} className="space-y-3">
                    <h3 className="text-base font-semibold text-primary">
                      {group.parent[lang]}
                    </h3>
                    <div className="overflow-x-auto rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th className="px-3 py-2.5 text-left">
                              {t(p, "subspecColName")}
                            </th>
                            <th className="px-3 py-2.5 text-left">
                              {t(p, "subspecColNameEn")}
                            </th>
                            <th className="px-3 py-2.5 text-left">
                              {t(p, "subspecColEligibility")}
                            </th>
                            <th className="px-3 py-2.5 text-left whitespace-nowrap">
                              {t(p, "subspecColDuration")}
                            </th>
                            <th className="px-3 py-2.5 text-left whitespace-nowrap">
                              {t(p, "subspecColTuition")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map((row, i) => (
                            <tr
                              key={i}
                              className={
                                i % 2 === 0 ? "bg-white" : "bg-muted/50"
                              }
                            >
                              <td className="px-3 py-2.5">{row.name[lang]}</td>
                              <td className="px-3 py-2.5 text-foreground/60 italic">
                                {row.nameEn}
                              </td>
                              <td className="px-3 py-2.5 text-foreground/70 text-xs leading-relaxed">
                                {row.eligibility[lang]}
                              </td>
                              <td className="px-3 py-2.5 whitespace-nowrap">
                                {row.duration}
                                {" / "}
                                {row.credits} кр
                              </td>
                              <td className="px-3 py-2.5 whitespace-nowrap">
                                {row.tuition.toLocaleString()}₮
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

            {/* ── СУРГАЛТЫН ХӨТӨЛБӨРҮҮД ── */}
            <section id="programs" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "programsTitle")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trainingPrograms.map((prog, i) => (
                  <a
                    key={i}
                    href={prog.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 shrink-0 text-red-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6zm2-6h8v1.5H8V14zm0 3h8v1.5H8V17zm0-6h3v1.5H8V11z" />
                    </svg>
                    <span className="group-hover:text-primary transition-colors">
                      {prog.name[lang]}
                    </span>
                    <svg
                      className="w-4 h-4 ml-auto shrink-0 text-foreground/30 group-hover:text-primary transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </section>

            {/* ── БААЗ ЭМНЭЛГҮҮД ── */}
            <section id="hospitals" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t(p, "hospitalsTitle")}
              </h2>
              <p className="text-foreground/80 leading-[1.85] mb-6">
                {t(p, "hospitalsIntro")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(dbHospitals.length > 0 ? dbHospitals : baseHospitals).map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm"
                    >
                      <span className="text-muted-foreground shrink-0">
                        {i + 1}.
                      </span>
                      <span className="text-foreground/80">{h[lang]}</span>
                    </div>
                  ),
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

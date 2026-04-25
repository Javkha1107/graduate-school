import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import PageSidebar from "@/components/sections/PageSidebar";
import {
  academicCenterPrograms,
  academicCenterContacts,
} from "@/data/academic-center";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.academicCenter") };
}

interface Step {
  text: string;
  sub?: string[];
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="list-decimal pl-5 space-y-2 text-foreground/80 leading-[1.85]">
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
    </ol>
  );
}

export default async function AcademicCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = getDictionary(lang);
  const p = getObj(dict, "academicCenterPage");

  const sections = [
    { id: "introduction", label: t(dict, "menu.centerIntroduction") },
    { id: "programs", label: t(dict, "menu.trainingProgram") },
    { id: "doctoral", label: t(dict, "menu.doctoralTraining") },
    { id: "masters", label: t(dict, "menu.masterTraining") },
    { id: "admission", label: t(dict, "menu.academicAdmission") },
    { id: "student", label: t(dict, "menu.academicStudent") },
  ];

  const activities = (p.activityList ?? []) as string[];
  const doctoralSteps = (p.doctoralSteps ?? []) as Step[];
  const doctoralFooter = (p.doctoralFooter ?? []) as string[];
  const mastersSteps = (p.mastersSteps ?? []) as Step[];
  const admissionRequirements = (p.admissionRequirements ?? []) as string[];
  const studentApplicationForms = (p.studentApplicationForms ?? []) as { label: string; url: string }[];
  const scholarshipAmounts = (p.scholarshipAmounts ?? []) as string[];
  const scholarshipRequirements = (p.scholarshipRequirements ?? []) as string[];
  const scholarshipMaterials = (p.scholarshipMaterials ?? []) as string[];

  return (
    <>
      <PageHero title={t(dict, "menu.academicCenter")} />
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
                    {t(p, "mission")}
                  </h3>
                  <p className="text-foreground/80 leading-[1.85]">
                    {t(p, "missionText")}
                  </p>
                </div>
                <p className="text-foreground/80 leading-[1.85]">
                  {t(p, "description")}
                </p>
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

                {/* Staff & Address cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Manager */}
                  <div className="rounded-xl border border-border bg-muted/30 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {t(p, "manager")}
                    </p>
                    <p className="text-foreground/70 text-sm">
                      {academicCenterContacts.manager.degree[lang]}
                    </p>
                    <p className="font-medium text-foreground">
                      {academicCenterContacts.manager.name}
                    </p>
                    <a
                      href={`mailto:${academicCenterContacts.manager.email}`}
                      className="text-primary hover:underline text-sm mt-1 inline-block"
                    >
                      {academicCenterContacts.manager.email}
                    </a>
                  </div>

                  {/* Specialist */}
                  <div className="rounded-xl border border-border bg-muted/30 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {t(p, "specialist")}
                    </p>
                    <p className="text-foreground/70 text-sm">
                      {academicCenterContacts.specialist.degree[lang]}
                    </p>
                    <p className="font-medium text-foreground">
                      {academicCenterContacts.specialist.name}
                    </p>
                    <a
                      href={`mailto:${academicCenterContacts.specialist.email}`}
                      className="text-primary hover:underline text-sm mt-1 inline-block"
                    >
                      {academicCenterContacts.specialist.email}
                    </a>
                  </div>

                  {/* Address */}
                  <div className="rounded-xl border border-border bg-muted/30 p-5 sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      {t(p, "address")}
                    </p>
                    <p className="text-foreground/80">
                      {academicCenterContacts.address.street[lang]}
                    </p>
                    <p className="text-foreground/80">
                      {academicCenterContacts.address.postal[lang]}
                    </p>
                    <p className="text-foreground/80">
                      {academicCenterContacts.address.office[lang]}
                    </p>
                    <a
                      href={`mailto:${academicCenterContacts.address.email}`}
                      className="text-primary hover:underline text-sm mt-1 inline-block"
                    >
                      {academicCenterContacts.address.email}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 2: Training Programs Table */}
            <section id="programs" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "tableTitle")}
              </h2>
              <div className="overflow-x-auto rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-3 py-3 text-left">{t(p, "colNo")}</th>
                      <th className="px-3 py-3 text-left">
                        {t(p, "colProgram")}
                      </th>
                      <th className="px-3 py-3 text-left">{t(p, "colCode")}</th>
                      <th className="px-3 py-3 text-left">
                        {t(p, "colLevel")}
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
                    {academicCenterPrograms.map((prog, i) => (
                      <tr
                        key={`${prog.code}-${prog.level}`}
                        className={i % 2 === 0 ? "bg-white" : "bg-muted/50"}
                      >
                        <td className="px-3 py-2.5 text-muted-foreground">
                          {i + 1}.
                        </td>
                        <td className="px-3 py-2.5">{prog.name[lang]}</td>
                        <td className="px-3 py-2.5">{prog.code}</td>
                        <td className="px-3 py-2.5">
                          {prog.level === "masters"
                            ? t(p, "levelMasters")
                            : t(p, "levelDoctoral")}
                        </td>
                        <td className="px-3 py-2.5">
                          {prog.level === "masters"
                            ? t(p, "durationMasters")
                            : t(p, "durationDoctoral")}
                        </td>
                        <td className="px-3 py-2.5">{prog.credits}</td>
                        <td className="px-3 py-2.5">{prog.school[lang]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 3: Doctoral Training */}
            <section id="doctoral" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.doctoralTraining")}
              </h2>
              <div className="space-y-4">
                <p
                  className="text-foreground/80 leading-[1.85]"
                  dangerouslySetInnerHTML={{ __html: t(p, "doctoralIntro") }}
                />
                <p className="text-foreground/80 leading-[1.85]">
                  {t(p, "doctoralProcess")}
                </p>
                <StepList steps={doctoralSteps} />
                {doctoralFooter.length > 0 && (
                  <div className="mt-4 space-y-2 text-foreground/80 leading-[1.85]">
                    {doctoralFooter.map((line, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 4: Master's Training */}
            <section id="masters" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(dict, "menu.masterTraining")}
              </h2>
              <div className="space-y-4">
                <p
                  className="text-foreground/80 leading-[1.85]"
                  dangerouslySetInnerHTML={{ __html: t(p, "mastersIntro") }}
                />
                <p className="text-foreground/80 leading-[1.85]">
                  {t(p, "mastersProcess")}
                </p>
                <StepList steps={mastersSteps} />
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 5: Admission */}
            <section id="admission" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "admissionTitle")}
              </h2>
              <div className="space-y-8">
                {/* Announcement */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "admissionAnnouncementTitle")}
                  </h3>
                  <p className="font-medium text-foreground mb-3">
                    {t(p, "admissionAnnouncementText")}
                  </p>
                  <div className="space-y-2 text-foreground/80 leading-[1.85]">
                    <p>{t(p, "admissionRegistrationPeriod")}</p>
                    <p>{t(p, "admissionExamInfo")}</p>
                    <p>{t(p, "admissionExamSubjects")}</p>
                    <p>{t(p, "admissionResultsInfo")}</p>
                    <p dangerouslySetInnerHTML={{ __html: t(p, "admissionRegisterLink") }} />
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "admissionProcessTitle")}
                  </h3>
                  <div className="space-y-3 text-foreground/80 leading-[1.85]">
                    <p dangerouslySetInnerHTML={{ __html: t(p, "admissionProcessIntro") }} />
                    <p dangerouslySetInnerHTML={{ __html: t(p, "admissionOnlineReg") }} />
                    <p>{t(p, "admissionInPersonReg")}</p>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "admissionRequirementsTitle")}
                  </h3>
                  <p className="text-foreground/80 mb-3 font-medium">
                    {t(p, "admissionRequirementsSubtitle")}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-foreground/80 leading-[1.85]">
                    {admissionRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Tuition Fees & Bank Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Mongolian Students - Highlighted */}
                  <div className="rounded-xl border-l-4 border-l-primary border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-5">
                    <h4 className="text-base font-bold text-primary mb-3">
                      {t(p, "admissionMongolianTitle")}
                    </h4>
                    <p className="font-medium text-foreground/80 mb-2">{t(p, "admissionMongolianTuition")}</p>
                    <div className="space-y-1.5 text-foreground/80 text-sm">
                      <p>{t(p, "admissionMongolianDoctoral")}</p>
                      <p>{t(p, "admissionMongolianMasters")}</p>
                      <p className="mt-2" dangerouslySetInnerHTML={{ __html: t(p, "admissionPaymentGuide") }} />
                    </div>
                  </div>

                  {/* International Students - Highlighted */}
                  <div className="rounded-xl border-l-4 border-l-primary border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-5">
                    <h4 className="text-base font-bold text-primary mb-3">
                      {t(p, "admissionInternationalTitle")}
                    </h4>
                    <p className="font-medium text-foreground/80 mb-2">{t(p, "admissionInternationalTuition")}</p>
                    <div className="space-y-1.5 text-foreground/80 text-sm">
                      <p>{t(p, "admissionInternationalDoctoral")}</p>
                      <p>{t(p, "admissionInternationalMasters")}</p>
                    </div>
                    <div className="space-y-1.5 text-foreground/80 text-sm mt-3">
                      <p>{t(p, "admissionInternationalBank")}</p>
                      <p>{t(p, "admissionInternationalRecipient")}</p>
                      <p>{t(p, "admissionInternationalAccount")}</p>
                      <p className="text-xs text-foreground/60">{t(p, "admissionInternationalNote")}</p>
                    </div>
                  </div>

                  {/* Bank Info - Bottom full width */}
                  <div className="rounded-xl border border-border bg-muted/30 p-5 lg:col-span-2">
                    <h4 className="text-base font-semibold text-primary mb-3">
                      {t(p, "admissionFeeTitle")}
                    </h4>
                    <div className="space-y-1.5 text-foreground/80 text-sm">
                      <p className="font-medium">{t(p, "admissionRegFee")}</p>
                      <p>{t(p, "admissionBankName")}</p>
                      <p>{t(p, "admissionBankRecipient")}</p>
                      <p>{t(p, "admissionBankAccount")}</p>
                      <p className="text-xs text-foreground/60 mt-2">{t(p, "admissionBankNote")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Separator */}
            <hr className="border-t-2 border-primary/30" />

            {/* Section 6: Student */}
            <section id="student" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t(p, "studentTitle")}
              </h2>
              <div className="space-y-8">
                {/* Student Form */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "studentFormTitle")}
                  </h3>
                  <p className="text-foreground/80" dangerouslySetInnerHTML={{ __html: t(p, "studentFormLink") }} />
                </div>

                {/* Application Forms */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "studentApplicationTitle")}
                  </h3>
                  <p className="text-foreground/80 mb-2">{t(p, "studentApplicationIntro")}</p>
                  <p className="text-primary mb-4">{t(p, "studentApplicationNote")}</p>
                  <div className="space-y-3">
                    {studentApplicationForms.map((form, i) => (
                      <a
                        key={i}
                        href={form.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-3 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                      >
                        <span className="text-primary">📄</span>
                        <span className="text-foreground/80 text-sm">{form.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Training Contract */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "studentContractTitle")}
                  </h3>
                  <p className="text-foreground/80" dangerouslySetInnerHTML={{ __html: t(p, "studentContractLink") }} />
                </div>

                {/* Research Scholarship */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {t(p, "scholarshipTitle")}
                  </h3>
                  <p className="text-foreground/80 mb-3" dangerouslySetInnerHTML={{ __html: t(p, "scholarshipRegulationLink") }} />
                  
                  <h4 className="font-semibold text-foreground mb-2">{t(p, "scholarshipMainTitle")}</h4>
                  <p className="text-foreground/80 mb-4">{t(p, "scholarshipDescription")}</p>
                  
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80 mb-6">
                    {scholarshipAmounts.map((amount, i) => (
                      <li key={i}>{amount}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-foreground mb-2">{t(p, "scholarshipRequirementsTitle")}</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-foreground/80 mb-6">
                    {scholarshipRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-foreground mb-2">{t(p, "scholarshipMaterialsTitle")}</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-foreground/80">
                    {scholarshipMaterials.map((mat, i) => (
                      <li key={i}>{mat}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

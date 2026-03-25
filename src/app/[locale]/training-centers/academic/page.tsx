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
  ];

  const activities = (p.activityList ?? []) as string[];
  const doctoralSteps = (p.doctoralSteps ?? []) as Step[];
  const doctoralFooter = (p.doctoralFooter ?? []) as string[];
  const mastersSteps = (p.mastersSteps ?? []) as Step[];

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
          </main>
        </div>
      </div>
    </>
  );
}

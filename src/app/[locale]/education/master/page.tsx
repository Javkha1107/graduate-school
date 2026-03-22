import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: t(dict, "masterNew.title") };
}

export default async function MasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "masterNew");
  const fields = getObj(dict, "master.field");
  const hasListHeader = typeof section.listHeader === "string";

  return (
    <>
      <PageHero title={t(section, "title")} subtitle={t(section, "mainText")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-foreground/75 leading-[1.85] text-[15px] mb-10">
          {t(section, "mainText2")}
        </p>

        {/* Program structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {(["group1", "group2", "group3", "group4"] as const).map((key) => {
            const val = t(section, key);
            if (val === key) return null;
            return (
              <div
                key={key}
                className="rounded-2xl border border-border/40 bg-white p-5 text-center"
              >
                <p
                  className="text-sm font-medium text-foreground"
                  dangerouslySetInnerHTML={{ __html: val }}
                />
              </div>
            );
          })}
        </div>

        {/* Fields table */}
        <div className="rounded-2xl border border-border/40 bg-white overflow-hidden mb-10">
          <div className="bg-primary px-6 py-4">
            <h2 className="text-base font-semibold text-white">
              {t(dict, "master.tableHead")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary border-b border-border/40">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider w-16">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    {t(section, "field") || "Field"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(fields).map(([key, val], i) => (
                  <tr
                    key={key}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-surface"} border-b border-border/20 last:border-0`}
                  >
                    <td className="px-6 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-6 py-3 text-foreground/80">
                      {String(val)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulations */}
        {hasListHeader && (
          <div className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-5 text-foreground tracking-tight">
              {t(section, "listHeader")}
            </h2>
            <ul className="space-y-3">
              {Object.entries(getObj(section, "list")).map(([key, val]) => {
                const text = String(val);
                if (!text) return null;
                return (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

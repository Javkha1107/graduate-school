import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "doctorNew.title") };
}

export default async function DoctoralPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "doctorNew");
  const fields = getObj(dict, "doctor.field");

  return (
    <>
      <PageHero title={t(section, "title")} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-foreground/80 leading-relaxed mb-4">
          {t(section, "mainText")}
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          {t(section, "mainText2")}
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          {t(section, "mainText3")}
        </p>
        <p className="text-foreground/80 leading-relaxed mb-8">
          {t(section, "mainText4")}
        </p>

        <h2 className="text-xl font-bold mb-4">
          {t(dict, "doctor.tableHead")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">
                  {locale === "mn" ? "Мэргэжлийн чиглэл" : "Field"}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fields).map(([key, val], i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? "bg-white" : "bg-muted/50"}
                >
                  <td className="px-4 py-2.5 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-2.5">{String(val)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

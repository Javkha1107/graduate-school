import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: t(dict, "masterOnlineNew.title") };
}

export default async function MasterOnlinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "masterOnlineNew");
  const subjectList = getObj(section, "subjectList");
  const listFields = getObj(section, "list");

  return (
    <>
      <PageHero title={t(section, "title")} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        {["item1", "item2", "item3", "item4"].map((key) => {
          const text = t(subjectList, key);
          if (text === key) return null;
          return (
            <p key={key} className="text-foreground/80 leading-relaxed mb-4">
              {text}
            </p>
          );
        })}

        <h2 className="text-xl font-bold mt-8 mb-4">
          {locale === "mn" ? "Хөтөлбөрүүд" : "Programmes"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {["field1", "field2", "field3", "field4", "field5", "field6"].map(
            (key) => {
              const val = t(listFields, key);
              if (val === key) return null;
              return (
                <div
                  key={key}
                  className="rounded-lg border border-border p-4 text-sm font-medium"
                >
                  {val}
                </div>
              );
            },
          )}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">
          {t(section, "group") || "Regulations"}
        </h2>
        <ul className="space-y-3">
          {Object.entries(listFields)
            .filter(([k]) => k.startsWith("item"))
            .map(([key, val]) => {
              const text = String(val);
              if (!text || text.startsWith("field")) return null;
              return (
                <li
                  key={key}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{text}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

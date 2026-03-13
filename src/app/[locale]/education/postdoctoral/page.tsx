import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "postdoctoralNew.title") };
}

export default async function PostdoctoralPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "postdoctoralNew");
  const list = getObj(section, "list");
  const list2 = getObj(section, "list2");
  const list3 = getObj(section, "list3");

  return (
    <>
      <PageHero title={t(section, "title")} subtitle={t(section, "subtitle")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-foreground/75 leading-[1.85] text-[15px] mb-10">
          {t(section, "mainText")}
        </p>

        <div className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold mb-5 text-foreground tracking-tight">
            {t(list, "header")}
          </h2>
          <ul className="space-y-3">
            {Object.entries(list)
              .filter(([k]) => k.startsWith("item"))
              .map(([key, val]) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span>{String(val)}</span>
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold mb-5 text-foreground tracking-tight">
            {t(list2, "header")}
          </h2>
          <ul className="space-y-3">
            {Object.entries(list2)
              .filter(([k]) => k.startsWith("item"))
              .map(([key, val]) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
                  <span>{String(val)}</span>
                </li>
              ))}
          </ul>
        </div>

        {typeof list3.header === "string" && (
          <div className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-5 text-foreground tracking-tight">
              {t(list3, "header")}
            </h2>
            {Object.entries(list3)
              .filter(([k]) => k.startsWith("item"))
              .map(([key, val]) => (
                <p
                  key={key}
                  className="text-sm text-foreground/75 leading-relaxed mb-4 last:mb-0"
                >
                  {String(val)}
                </p>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "aboutUs.title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "aboutUs");
  const departments = getObj(section, "departments");

  return (
    <>
      <PageHero title={t(section, "title")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-4 mb-10">
          {["text1", "text3", "text4"].map((key) => {
            const val = t(section, key);
            return val !== key ? (
              <p
                key={key}
                className="text-foreground/75 leading-[1.85] text-[15px]"
              >
                {val}
              </p>
            ) : null;
          })}
        </div>

        <div className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-semibold mb-5 text-foreground tracking-tight">
            {t(section, "text5")}
          </h2>
          <ul className="space-y-3">
            {Object.values(departments).map((val, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                <span>{String(val)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-foreground/75 leading-[1.85] text-[15px]">
          {t(section, "text10")}
        </p>
      </div>
    </>
  );
}

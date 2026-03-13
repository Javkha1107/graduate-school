import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "partnershipOita.title") };
}

export default async function OitaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "partnershipOita");

  return (
    <>
      <PageHero title={t(section, "title")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 space-y-6">
        <p className="text-foreground/75 leading-[1.85] text-[15px]">
          {t(section, "body")}
        </p>
        {["text2", "body2", "text3", "body3", "body4"].map((key) => {
          const val = t(section, key);
          if (!val || val === key) return null;
          const isDate = key.startsWith("text");
          return isDate ? (
            <h3 key={key} className="text-sm font-semibold text-primary pt-2">
              {val}
            </h3>
          ) : (
            <p
              key={key}
              className="text-foreground/75 leading-[1.85] text-[15px]"
            >
              {val}
            </p>
          );
        })}
      </div>
    </>
  );
}

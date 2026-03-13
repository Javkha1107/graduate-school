import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: t(getDictionary(locale as Locale), "partnershipLumiere.title"),
  };
}

export default async function LumierePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const section = getObj(dict, "partnershipLumiere");

  return (
    <>
      <PageHero title={t(section, "title")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 space-y-6">
        <p className="text-foreground/75 leading-[1.85] text-[15px]">
          {t(section, "body")}
        </p>
        <p className="text-foreground/75 leading-[1.85] text-[15px]">
          {t(section, "body2")}
        </p>
      </div>
    </>
  );
}

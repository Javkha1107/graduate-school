import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.formsRegulations") };
}

export default async function FormsRegulationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <PageHero title={t(dict, "menu.formsRegulations")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-foreground/75 leading-[1.85] text-base">
          {locale === "mn" ? "Удахгүй..." : "Coming soon..."}
        </p>
      </div>
    </>
  );
}

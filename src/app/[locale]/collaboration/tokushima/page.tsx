import { getDictionary, t, type Locale } from "@/lib/i18n";
import GenericSectionPage from "@/components/sections/GenericSectionPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: t(getDictionary(locale as Locale), "collaborationTokushima.title"),
  };
}

export default async function TokushimaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return (
    <GenericSectionPage
      locale={locale as Locale}
      dict={dict}
      sectionKey="collaborationTokushima"
      titleKey="collaborationTokushima.title"
    />
  );
}

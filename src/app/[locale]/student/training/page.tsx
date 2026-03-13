import { getDictionary, t, type Locale } from "@/lib/i18n";
import GenericSectionPage from "@/components/sections/GenericSectionPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "training.title") };
}

export default async function TrainingPage({
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
      sectionKey="training"
      titleKey="training.title"
    />
  );
}

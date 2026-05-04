import { getDictionary, type Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import Programs from "@/components/sections/Programs";
import Statistics from "@/components/sections/Statistics";
import NewsPreview from "@/components/sections/NewsPreview";
import CollaborationPreview from "@/components/sections/CollaborationPreview";
import { getCollaborations } from "@/lib/collaborations";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const collaborations = await getCollaborations();

  return (
    <>
      <Hero locale={locale as Locale} dict={dict} />
      {/* This container scrolls over the sticky hero */}
      <div className="relative z-10 bg-background">
        <NewsPreview locale={locale as Locale} dict={dict} />
        <Programs locale={locale as Locale} dict={dict} />
        <CollaborationPreview
          locale={locale as Locale}
          dict={dict}
          collaborations={collaborations}
        />
        <Statistics locale={locale as Locale} dict={dict} />
      </div>
    </>
  );
}

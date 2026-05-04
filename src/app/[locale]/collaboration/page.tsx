import { getDictionary, t, type Locale } from "@/lib/i18n";
import { getCollaborations } from "@/lib/collaborations";
import PageHero from "@/components/sections/PageHero";
import CollaborationContent from "@/components/sections/CollaborationContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: t(dict, "menu.internationalRelations"),
  };
}

export default async function CollaborationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const collaborations = await getCollaborations();

  return (
    <>
      <PageHero title={t(dict, "menu.internationalRelations")} />
      <CollaborationContent
        locale={locale as Locale}
        dict={dict}
        collaborations={collaborations}
      />
    </>
  );
}

import { getDictionary, t, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import FacultyTeams from "@/components/sections/FacultyTeams";
import { getFacultyData } from "@/lib/faculty";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.facultyTeams") };
}

export default async function FacultyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const { categories, members } = await getFacultyData();

  return (
    <>
      <PageHero title={t(dict, "menu.facultyTeams")} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <FacultyTeams
          categories={categories}
          members={members}
          locale={locale}
        />
      </div>
    </>
  );
}

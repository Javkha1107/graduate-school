import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "greeting.title") };
}

export default async function GreetingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const g = getObj(dict, "greeting");

  return (
    <>
      <PageHero title={t(g, "title")} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        {[
          "greeting1",
          "greeting2",
          "greeting3",
          "greeting4",
          "greeting5",
          "greeting6",
        ].map((key) => {
          const val = t(g, key);
          return val && val !== key ? (
            <p key={key} className="text-foreground/80 leading-relaxed mb-4">
              {val}
            </p>
          ) : null;
        })}
        <div className="mt-8 border-t border-border pt-6">
          <p className="font-semibold text-foreground">{t(g, "name")}</p>
          <p className="text-sm text-muted-foreground">{t(g, "role")}</p>
          <p className="text-sm text-muted-foreground">{t(g, "roleName")}</p>
        </div>
      </div>
    </>
  );
}

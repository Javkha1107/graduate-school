import { getDictionary, t, getObj, type Locale } from "@/lib/i18n";
import PageHero from "@/components/sections/PageHero";
import { Mail, Phone, MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return { title: t(getDictionary(locale as Locale), "menu.contact") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const footer = getObj(dict, "footer");

  return (
    <>
      <PageHero
        title={t(dict, "menu.contact")}
        subtitle={t(dict, "contactDesc")}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              icon: MapPin,
              label: t(footer, "address"),
              value: t(footer, "addressText"),
              href: null,
            },
            {
              icon: Mail,
              label: "Email",
              value: t(footer, "contactMail"),
              href: `mailto:${t(footer, "contactMail")}`,
            },
            {
              icon: Phone,
              label: t(footer, "contact"),
              value: t(footer, "contactPhone"),
              href: null,
            },
          ].map(({ icon: Icon, label, value, href }, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/40 bg-white p-7 text-center card-premium"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-2 text-foreground">
                {label}
              </h3>
              {href ? (
                <a
                  href={href}
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

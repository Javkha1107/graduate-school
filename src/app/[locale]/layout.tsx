import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, getDictionary, type Locale } from "@/lib/i18n";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/ui/PageTransition";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const title = `${String(dict.graduateSchool)} | ${String(dict.mnums)}`;
  const description =
    String(
      dict.home && typeof dict.home === "object"
        ? (dict.home as Record<string, unknown>).mainText
        : "",
    ) || title;

  return {
    title: { default: title, template: `%s | ${String(dict.graduateSchool)}` },
    description: description.substring(0, 160),
    openGraph: {
      title,
      description: description.substring(0, 160),
      locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { mn: "/mn", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <ScrollToTop />
        <BackToTop />
        <Header locale={locale as Locale} dict={dict} />
        <main className="flex-1 relative">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}

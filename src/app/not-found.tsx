import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootNotFound() {
  return (
    <html lang="mn" className={inter.variable}>
      <head>
        <title>404 - Хуудас олдсонгүй | MNUMS Graduate School</title>
        <meta
          name="description"
          content="Хуудас олдсонгүй. The page you are looking for does not exist."
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased font-sans bg-background text-foreground">
        {/* Minimal header */}
        <header className="w-full border-b border-border/60 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <Link href="/mn" className="shrink-0 relative h-12 w-36">
              <Image
                src="/newLogo.png"
                alt="MNUMS Graduate School"
                fill
                className="object-contain object-left"
                sizes="144px"
              />
            </Link>
          </div>
        </header>

        {/* 404 Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-lg mx-auto">
            {/* Large 404 heading */}
            <h1 className="text-[120px] sm:text-[160px] font-bold leading-none tracking-tight text-primary/10 select-none">
              404
            </h1>

            {/* Decorative divider */}
            <div className="mx-auto mb-6 w-12 h-[3px] rounded-full bg-linear-to-r from-primary to-accent" />

            {/* Description */}
            <p className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              Хуудас олдсонгүй
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
              Таны хайсан хуудас олдсонгүй. Хуудасны хаяг буруу байж болзошгүй
              эсвэл хуудас устгагдсан байна.
              <br />
              <span className="text-muted-foreground/80">
                The page you are looking for could not be found.
              </span>
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/mn"
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-all duration-300"
              >
                Нүүр хуудас
              </Link>
              <Link
                href="/en"
                className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all duration-300"
              >
                Home Page
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

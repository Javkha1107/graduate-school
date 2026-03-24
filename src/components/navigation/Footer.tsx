import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import {
  contactInfo,
  componentSchools,
  branchSchools,
} from "@/lib/footer-data";

interface FooterProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

export default function Footer({ locale, dict }: FooterProps) {
  const lang = locale === "mn" ? "mn" : "en";

  return (
    <footer className="relative bg-primary-dark text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Address */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-5">
              {lang === "mn" ? "Хаяг" : "Address"}
            </h3>
            <a
              href={contactInfo.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-white/50 hover:text-white/80 transition-colors group"
            >
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/30 group-hover:text-accent/70 transition-colors" />
              <span className="leading-relaxed">
                {contactInfo.address[lang]}
              </span>
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-5">
              {lang === "mn" ? "Холбоо барих" : "Contact"}
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white/30 group-hover:text-accent/70 transition-colors" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+976${contactInfo.phone[lang].replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <Phone className="h-4 w-4 shrink-0 text-white/30 group-hover:text-accent/70 transition-colors" />
                  {contactInfo.phone[lang]}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-white/30 group-hover:text-accent/70 transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  {contactInfo.facebook.label}
                </a>
              </li>
            </ul>
          </div>

          {/* Component Schools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-5">
              {lang === "mn" ? "Бүрэлдэхүүн сургуулиуд" : "Component Schools"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {componentSchools.map((school) => (
                <li key={school.href}>
                  <a
                    href={school.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-100 group-hover:text-accent/70 transition-opacity" />
                    <span className="leading-snug">{school.name[lang]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Branch Schools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-5">
              {lang === "mn" ? "Салбар сургуулиуд" : "Branch Schools"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {branchSchools.map((school) => (
                <li key={school.href}>
                  <a
                    href={school.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-100 group-hover:text-accent/70 transition-opacity" />
                    <span className="leading-snug">{school.name[lang]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {t(dict, "mnums")} —{" "}
            {t(dict, "graduateSchool")}
          </p>
          <div className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/60" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-light/40" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}

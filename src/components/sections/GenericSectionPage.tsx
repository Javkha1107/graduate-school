import PageHero from "./PageHero";
import { t, getObj, type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Record<string, unknown>;
  sectionKey: string;
  titleKey: string;
}

export default function GenericSectionPage({
  dict,
  sectionKey,
  titleKey,
}: Props) {
  const section = getObj(dict, sectionKey);
  const title = t(dict, titleKey);
  const entries = Object.entries(section);

  return (
    <>
      <PageHero title={title} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-6">
          {entries.map(([key, val]) => {
            if (
              typeof val === "string" &&
              val.length > 0 &&
              key !== "title" &&
              key !== "header"
            ) {
              return (
                <p
                  key={key}
                  className="text-foreground/75 leading-[1.85] text-base"
                >
                  {val}
                </p>
              );
            }
            if (
              typeof val === "object" &&
              val !== null &&
              !Array.isArray(val)
            ) {
              const subEntries = Object.entries(val as Record<string, unknown>);
              const hasOnlyStrings = subEntries.every(
                ([, v]) => typeof v === "string",
              );
              if (hasOnlyStrings && subEntries.length > 0) {
                const subTitle =
                  (val as Record<string, unknown>).header ||
                  (val as Record<string, unknown>).subtitle;
                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-border/40 bg-white p-6 sm:p-8"
                  >
                    {typeof subTitle === "string" && (
                      <h3 className="text-lg font-semibold mb-4 text-foreground tracking-tight">
                        {String(subTitle)}
                      </h3>
                    )}
                    <ul className="space-y-3">
                      {subEntries
                        .filter(
                          ([k]) => !["header", "subtitle", "title"].includes(k),
                        )
                        .map(([sk, sv]) => {
                          const text = String(sv);
                          if (!text) return null;
                          return (
                            <li
                              key={sk}
                              className="flex items-start gap-3 text-base text-foreground/75 leading-relaxed"
                            >
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                              <span>{text}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                );
              }
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}

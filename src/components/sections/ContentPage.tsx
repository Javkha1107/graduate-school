import PageHero from "./PageHero";
import { t, getObj, type Locale } from "@/lib/i18n";

interface ContentPageProps {
  locale: Locale;
  dict: Record<string, unknown>;
  titleKey: string;
  contentKeys: string[];
  sectionKey?: string;
  listKeys?: string[];
}

export default function ContentPage({
  dict,
  titleKey,
  contentKeys,
  sectionKey,
  listKeys,
}: ContentPageProps) {
  const title = t(dict, titleKey);
  const section = sectionKey ? getObj(dict, sectionKey) : dict;

  return (
    <>
      <PageHero title={title} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <article className="space-y-4">
          {contentKeys.map((key) => {
            const text = t(section as Record<string, unknown>, key);
            if (!text || text === key) return null;
            return (
              <p
                key={key}
                className="text-foreground/75 leading-[1.85] text-base"
              >
                {text}
              </p>
            );
          })}

          {listKeys && listKeys.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border/40 bg-white p-6 sm:p-8">
              <ul className="space-y-3">
                {listKeys.map((key) => {
                  const text = t(section as Record<string, unknown>, key);
                  if (!text || text === key) return null;
                  return (
                    <li
                      key={key}
                      className="flex items-start gap-3 text-base text-foreground/75 leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                      <span>{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </article>
      </div>
    </>
  );
}

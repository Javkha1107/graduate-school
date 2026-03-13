export const locales = ["mn", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mn";

import mnData from "@/data/mn.json";
import enData from "@/data/en.json";

const dictionaries: Record<Locale, Record<string, unknown>> = {
  mn: mnData as Record<string, unknown>,
  en: enData as Record<string, unknown>,
};

export function getDictionary(locale: Locale): Record<string, unknown> {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

// Safe nested key access: t("menu.education") => value
export function t(dict: Record<string, unknown>, key: string): string {
  const keys = key.split(".");
  let current: unknown = dict;
  for (const k of keys) {
    if (
      current &&
      typeof current === "object" &&
      k in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return key; // fallback to key itself
    }
  }
  return typeof current === "string" ? current : key;
}

// Get nested object
export function getObj(
  dict: Record<string, unknown>,
  key: string,
): Record<string, unknown> {
  const keys = key.split(".");
  let current: unknown = dict;
  for (const k of keys) {
    if (
      current &&
      typeof current === "object" &&
      k in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return {};
    }
  }
  return typeof current === "object" && current !== null
    ? (current as Record<string, unknown>)
    : {};
}

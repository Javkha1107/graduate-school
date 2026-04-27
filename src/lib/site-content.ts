import { getServiceSupabase, supabase } from "./supabase";
import { unstable_cache } from "next/cache";

export const SITE_CONTENT_CACHE_TAG = "site-content";

function getReadClient() {
  return getServiceSupabase() ?? supabase;
}

export interface ConferenceLink {
  label_mn: string;
  label_en: string;
  url: string;
}

export interface ConferencesContent {
  body_mn: string;
  body_en: string;
  archive_title_mn: string;
  archive_title_en: string;
  links: ConferenceLink[];
}

export interface HospitalItem {
  mn: string;
  en: string;
}

export const getConferencesContent = unstable_cache(
  async (): Promise<ConferencesContent | null> => {
    const client = getReadClient();
    if (!client) return null;

    const { data, error } = await client
      .from("site_content")
      .select("value")
      .eq("key", "conferences")
      .maybeSingle();

    if (error || !data) return null;
    return data.value as ConferencesContent;
  },
  ["conferences-content"],
  { tags: [SITE_CONTENT_CACHE_TAG], revalidate: 3600 },
);

export const getHospitals = unstable_cache(
  async (): Promise<HospitalItem[]> => {
    const client = getReadClient();
    if (!client) return [];

    const { data, error } = await client
      .from("site_content")
      .select("value")
      .eq("key", "hospitals")
      .maybeSingle();

    if (error || !data) return [];
    return data.value as HospitalItem[];
  },
  ["hospitals-content"],
  { tags: [SITE_CONTENT_CACHE_TAG], revalidate: 3600 },
);

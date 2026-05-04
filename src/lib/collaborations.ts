import { getServiceSupabase, supabase } from "./supabase";
import { unstable_cache } from "next/cache";

export const COLLABORATIONS_CACHE_TAG = "collaborations";

function getReadClient() {
  return getServiceSupabase() ?? supabase;
}

export interface Collaboration {
  id: string;
  slug: string;
  title_mn: string;
  title_en: string;
  body_mn: string;
  body_en: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const getCollaborations = unstable_cache(
  async (): Promise<Collaboration[]> => {
    const client = getReadClient();
    if (!client) return [];

    const { data, error } = await client
      .from("collaborations")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as Collaboration[];
  },
  ["collaborations-list"],
  { tags: [COLLABORATIONS_CACHE_TAG], revalidate: 3600 },
);

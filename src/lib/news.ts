import { getServiceSupabase, supabase, type NewsItem } from "./supabase";
import { unstable_cache } from "next/cache";

// Cache tag used for on-demand revalidation
export const NEWS_CACHE_TAG = "news";

// Get the best available Supabase client (prefer service role for server reads)
function getReadClient() {
  const svc = getServiceSupabase();
  if (svc) {
    console.log("[news] using service-role client");
    return svc;
  }
  console.log(
    "[news] service-role unavailable, falling back to anon client, SUPABASE_SERVICE_ROLE_KEY set:",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  return supabase;
}

// Fetch all active news (cached)
export const getActiveNews = unstable_cache(
  async (): Promise<NewsItem[]> => {
    const client = getReadClient();
    if (!client) {
      console.warn("[news] no supabase client available — env vars missing?");
      return [];
    }
    const { data, error } = await client
      .from("news")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[news] getActiveNews query error:", error);
      return [];
    }
    console.log("[news] getActiveNews returned", data?.length ?? 0, "rows");
    return (data as NewsItem[]) || [];
  },
  ["active-news"],
  { tags: [NEWS_CACHE_TAG], revalidate: 3600 },
);

// Fetch single news by slug (cached)
export const getNewsBySlug = unstable_cache(
  async (slug: string): Promise<NewsItem | null> => {
    const client = getReadClient();
    if (!client) {
      console.warn("[news] no supabase client available — env vars missing?");
      return null;
    }
    const decoded = decodeURIComponent(slug);
    console.log("[news] getNewsBySlug looking for:", decoded);

    // Try by slug field
    const { data, error } = await client
      .from("news")
      .select("*")
      .eq("slug", decoded)
      .eq("is_active", true)
      .maybeSingle();
    if (error) {
      console.error("[news] getNewsBySlug query error:", error);
      return null;
    }
    if (data) return data as NewsItem;

    // Fallback: try by numeric id
    const id = Number(decoded);
    if (!isNaN(id)) {
      const { data: byId, error: idErr } = await client
        .from("news")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .maybeSingle();
      if (idErr) {
        console.error("[news] getNewsBySlug id fallback error:", idErr);
        return null;
      }
      return (byId as NewsItem) || null;
    }

    return null;
  },
  ["news-by-slug"],
  { tags: [NEWS_CACHE_TAG], revalidate: 3600 },
);

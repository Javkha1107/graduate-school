import { getServiceSupabase, supabase, type NewsItem } from "./supabase";
import { unstable_cache } from "next/cache";

// Cache tag used for on-demand revalidation
export const NEWS_CACHE_TAG = "news";

// Columns needed for list/card views (excludes heavy HTML content)
const LIST_COLUMNS =
  "id,slug,category,title_mn,title_en,banner_img,news_img,is_active,created_at,updated_at" as const;

// Type for list items (no content fields)
export type NewsListItem = Omit<NewsItem, "content_mn" | "content_en">;

// Get the best available Supabase client (prefer service role for server reads)
function getReadClient() {
  const svc = getServiceSupabase();
  if (svc) return svc;
  return supabase;
}

// ── Preview: latest N items for homepage cards (lightweight) ──
export const getLatestNews = unstable_cache(
  async (count: number): Promise<NewsListItem[]> => {
    const client = getReadClient();
    if (!client) return [];
    const { data, error } = await client
      .from("news")
      .select(LIST_COLUMNS)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(count);
    if (error) {
      console.error("[news] getLatestNews query error:", error);
      return [];
    }
    return (data as NewsListItem[]) || [];
  },
  ["latest-news"],
  { tags: [NEWS_CACHE_TAG], revalidate: 3600 },
);

// ── List: all active news for the news listing page (no content) ──
export const getActiveNewsList = unstable_cache(
  async (): Promise<NewsListItem[]> => {
    const client = getReadClient();
    if (!client) return [];
    const { data, error } = await client
      .from("news")
      .select(LIST_COLUMNS)
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[news] getActiveNewsList query error:", error);
      return [];
    }
    return (data as NewsListItem[]) || [];
  },
  ["active-news-list"],
  { tags: [NEWS_CACHE_TAG], revalidate: 3600 },
);

// ── Related: latest N items excluding a specific news ID (lightweight) ──
export const getRelatedNews = unstable_cache(
  async (excludeId: number, count: number): Promise<NewsListItem[]> => {
    const client = getReadClient();
    if (!client) return [];
    const { data, error } = await client
      .from("news")
      .select(LIST_COLUMNS)
      .eq("is_active", true)
      .neq("id", excludeId)
      .order("created_at", { ascending: false })
      .limit(count);
    if (error) {
      console.error("[news] getRelatedNews query error:", error);
      return [];
    }
    return (data as NewsListItem[]) || [];
  },
  ["related-news"],
  { tags: [NEWS_CACHE_TAG], revalidate: 3600 },
);

// ── Detail: single news by slug (full content) ──
export const getNewsBySlug = unstable_cache(
  async (slug: string): Promise<NewsItem | null> => {
    const client = getReadClient();
    if (!client) return null;
    const decoded = decodeURIComponent(slug);

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

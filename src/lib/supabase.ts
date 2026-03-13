import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Lazy-init to avoid build errors when env vars are not set
let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!_supabase) {
    if (!supabaseUrl) return null;
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// Keep backward compat export (may be null at build time)
export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side client with service role key (for admin operations)
export function getServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey);
}

export interface NewsItem {
  id: number;
  slug: string;
  category: string;
  title_mn: string;
  title_en: string | null;
  content_mn: string | null;
  content_en: string | null;
  banner_img: string | null;
  news_img: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// News categories
export const NEWS_CATEGORIES = [
  { code: "CODE001", mn: "Үйл ажиллагааны мэдээлэл" },
  { code: "CODE002", mn: "Зарлал" },
  { code: "CODE003", mn: "Элсэлтийн мэдээлэл" },
  { code: "CODE004", mn: "Төсөл" },
  { code: "CODE005", mn: "Бүтээл" },
] as const;

// Helper: code → Mongolian name
export function getCategoryName(code: string): string {
  return NEWS_CATEGORIES.find((c) => c.code === code)?.mn || code;
}

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
  pdf_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// News categories
export const NEWS_CATEGORIES = [
  {
    code: "CODE001",
    mn: "Төгсөлтийн сургалтын мэдээ",
    en: "Graduate Training News",
  },
  {
    code: "CODE002",
    mn: "Магистрын цахим сургалтын мэдээ",
    en: "Online Master's Training News",
  },
  {
    code: "CODE003",
    mn: "Төгсөлтийн дараах сургалтын мэдээ",
    en: "Postgraduate Training News",
  },
  {
    code: "CODE004",
    mn: "Докторын дараах сургалтын мэдээ",
    en: "Post-doctoral Training News",
  },
  {
    code: "CODE005",
    mn: "Сургуулийн үйл ажиллагааны мэдээ",
    en: "School Activity News",
  },
] as const;

// Helper: code → category name (supports locale)
export function getCategoryName(code: string, locale?: string): string {
  const cat = NEWS_CATEGORIES.find((c) => c.code === code);
  if (!cat) return code;
  return locale === "en" ? cat.en : cat.mn;
}

import { getServiceSupabase, supabase } from "./supabase";
import { unstable_cache } from "next/cache";

export const FACULTY_CACHE_TAG = "faculty";

function getReadClient() {
  return getServiceSupabase() ?? supabase;
}

export interface FacultyCategory {
  id: string;
  heading_mn: string;
  heading_en: string;
  sort_order: number;
}

export interface FacultyMember {
  id: string;
  category_id: string;
  role_mn: string;
  role_en: string;
  name_mn: string;
  name_en: string;
  photo_url: string;
  education_mn: string;
  education_en: string;
  experience_mn: string;
  experience_en: string;
  research_mn: string;
  research_en: string;
  cv_link: string | null;
  sort_order: number;
}

export interface FacultyData {
  categories: FacultyCategory[];
  members: FacultyMember[];
}

export const getFacultyData = unstable_cache(
  async (): Promise<FacultyData> => {
    const client = getReadClient();
    if (!client) return { categories: [], members: [] };

    const [catRes, memRes] = await Promise.all([
      client.from("faculty_categories").select("*").order("sort_order"),
      client.from("faculty_members").select("*").order("sort_order"),
    ]);

    return {
      categories: (catRes.data as FacultyCategory[]) || [],
      members: (memRes.data as FacultyMember[]) || [],
    };
  },
  ["faculty-data"],
  { tags: [FACULTY_CACHE_TAG], revalidate: 3600 },
);

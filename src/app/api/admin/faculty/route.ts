import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { verifySession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";
import { FACULTY_CACHE_TAG } from "@/lib/faculty";

export async function GET() {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const [cats, members] = await Promise.all([
    supabase.from("faculty_categories").select("*").order("sort_order"),
    supabase.from("faculty_members").select("*").order("sort_order"),
  ]);

  if (cats.error)
    return NextResponse.json({ error: cats.error.message }, { status: 500 });

  return NextResponse.json({
    categories: cats.data,
    members: members.data || [],
  });
}

export async function POST(request: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("faculty_members")
      .insert(body)
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    revalidateTag(FACULTY_CACHE_TAG, "default");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

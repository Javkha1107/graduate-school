import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { verifySession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";
import { SITE_CONTENT_CACHE_TAG } from "@/lib/site-content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data?.value ?? {});
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const body = await request.json();
  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await supabase
    .from("site_content")
    .upsert(
      { key, value: body, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(SITE_CONTENT_CACHE_TAG);
  return NextResponse.json({ success: true });
}

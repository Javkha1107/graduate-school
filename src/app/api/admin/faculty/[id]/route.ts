import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { verifySession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";
import { FACULTY_CACHE_TAG } from "@/lib/faculty";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("faculty_members")
    .select("*")
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("faculty_members")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(FACULTY_CACHE_TAG, "max");
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  const { error } = await supabase
    .from("faculty_members")
    .delete()
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(FACULTY_CACHE_TAG, "max");
  return NextResponse.json({ success: true });
}

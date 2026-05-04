import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const ALLOWED_PDF_TYPES = ["application/pdf"];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_PDF_TYPES];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Only image files (JPEG, PNG, WebP, GIF, SVG) and PDF files are allowed",
        },
        { status: 400 },
      );
    }

    const isPdf = ALLOWED_PDF_TYPES.includes(file.type);
    const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: isPdf
            ? "PDF file size must be under 20 MB"
            : "Image file size must be under 5 MB",
        },
        { status: 400 },
      );
    }

    const supabase = getServiceSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Storage not configured" },
        { status: 503 },
      );
    }
    const folder = (formData.get("folder") as string) || "news";
    const ext = file.name.split(".").pop()?.toLowerCase();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const { error } = await supabase.storage
      .from("news-images")
      .upload(fileName, file, { contentType: file.type });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

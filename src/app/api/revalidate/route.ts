import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { NEWS_CACHE_TAG } from "@/lib/news";

// Called internally by admin API routes after create/update/delete
export async function POST(request: Request) {
  const { secret } = await request.json().catch(() => ({ secret: "" }));

  // Verify the request is legitimate
  if (secret !== process.env.ADMIN_JWT_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(NEWS_CACHE_TAG);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

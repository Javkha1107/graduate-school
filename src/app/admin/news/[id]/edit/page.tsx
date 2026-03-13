"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import type { NewsItem } from "@/lib/supabase";

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/news/${params.id}`);
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setNews(data);
      } catch {
        router.push("/admin/news");
      }
      setLoading(false);
    }
    load();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!news) return null;

  return <NewsForm mode="edit" initialData={news} />;
}

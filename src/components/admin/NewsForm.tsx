"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Settings2,
  FileText,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { NEWS_CATEGORIES, type NewsItem } from "@/lib/supabase";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link", "image"],
    ["clean"],
  ],
};

interface NewsFormProps {
  initialData?: NewsItem;
  mode: "create" | "edit";
}

export default function NewsForm({ initialData, mode }: NewsFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const bannerRef = useRef<HTMLInputElement>(null);
  const newsImgRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title_mn: initialData?.title_mn || "",
    title_en: initialData?.title_en || "",
    content_mn: initialData?.content_mn || "",
    content_en: initialData?.content_en || "",
    category: initialData?.category || "CODE001",
    banner_img: initialData?.banner_img || "",
    news_img: initialData?.news_img || "",
    is_active: initialData?.is_active ?? true,
  });

  const update = useCallback(
    (field: string, value: string | boolean) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    [],
  );

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "banner_img" | "news_img",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      update(field, url);
    } catch {
      setError("Зураг оруулахад алдаа гарлаа. Supabase тохиргоог шалгана уу.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title_mn.trim()) {
      setError("Монгол гарчиг оруулна уу.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const url =
        mode === "create"
          ? "/api/admin/news"
          : `/api/admin/news/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Хадгалахад алдаа гарлаа");
      }
      router.push("/admin/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа");
    }
    setSaving(false);
  }

  const SEC =
    "rounded-2xl bg-white border border-border p-6 space-y-4 shadow-sm";
  const LBL =
    "block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2";

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/news">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">
              {mode === "create" ? "Шинэ мэдээ" : "Мэдээ засах"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {mode === "create"
                ? "Шинэ мэдээ нэмэх"
                : "Мэдээний мэдээлэл засах"}
            </p>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl px-4 py-8 sm:px-8 space-y-6"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Тохиргоо</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Ангилал</label>
              <Select
                value={form.category}
                onValueChange={(v) => update("category", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ангилал сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {NEWS_CATEGORIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.mn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    form.is_active ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                      form.is_active ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => update("is_active", e.target.checked)}
                  className="sr-only"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {form.is_active ? "Нийтлэгдсэн" : "Ноорог"}
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Зураг</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Баннер зураг</label>
              <input
                ref={bannerRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "banner_img")}
              />
              {form.banner_img ? (
                <div className="relative group rounded-xl overflow-hidden">
                  <img
                    src={form.banner_img}
                    alt="Banner"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => bannerRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium cursor-pointer rounded-xl"
                  >
                    Солих
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => bannerRef.current?.click()}
                  className="w-full h-36 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-xs">Баннер оруулах</span>
                </button>
              )}
              <Input
                placeholder="Эсвэл URL оруулах"
                value={form.banner_img}
                onChange={(e) => update("banner_img", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <label className={LBL}>Мэдээний зураг</label>
              <input
                ref={newsImgRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "news_img")}
              />
              {form.news_img ? (
                <div className="relative group rounded-xl overflow-hidden">
                  <img
                    src={form.news_img}
                    alt="News"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => newsImgRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium cursor-pointer rounded-xl"
                  >
                    Солих
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => newsImgRef.current?.click()}
                  className="w-full h-36 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer"
                >
                  <ImageIcon className="h-5 w-5" />
                  <span className="text-xs">Зураг оруулах</span>
                </button>
              )}
              <Input
                placeholder="Эсвэл URL оруулах"
                value={form.news_img}
                onChange={(e) => update("news_img", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </motion.div>

        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Гарчиг</h2>
          </div>
          <div>
            <label className={LBL}>Гарчиг (Монгол) *</label>
            <Input
              value={form.title_mn}
              onChange={(e) => update("title_mn", e.target.value)}
              placeholder="Мэдээний гарчиг"
            />
          </div>
          <div>
            <label className={LBL}>Гарчиг (Англи)</label>
            <Input
              value={form.title_en}
              onChange={(e) => update("title_en", e.target.value)}
              placeholder="News title"
            />
          </div>
        </motion.div>

        {/* Content MN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Агуулга (Монгол)</h2>
          </div>
          <ReactQuill
            theme="snow"
            value={form.content_mn}
            onChange={(v: string) => update("content_mn", v)}
            modules={quillModules}
            placeholder="Мэдээний агуулга..."
          />
        </motion.div>

        {/* Content EN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Агуулга (Англи)</h2>
          </div>
          <ReactQuill
            theme="snow"
            value={form.content_en}
            onChange={(v: string) => update("content_en", v)}
            modules={quillModules}
            placeholder="News content..."
          />
        </motion.div>

        {/* Bottom actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/news">Болих</Link>
          </Button>
          <Button type="submit" disabled={saving} variant="premium">
            <Save className="h-4 w-4 mr-1" />
            {saving
              ? "Хадгалж байна..."
              : mode === "create"
                ? "Нийтлэх"
                : "Хадгалах"}
          </Button>
        </div>
      </form>
    </div>
  );
}

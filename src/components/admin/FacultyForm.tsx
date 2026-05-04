"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  FileText,
  Globe,
  GraduationCap,
  Briefcase,
  FlaskConical,
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
import type { FacultyCategory, FacultyMember } from "@/lib/faculty";

interface FacultyFormProps {
  mode: "create" | "edit";
  initialData?: FacultyMember;
  categories: FacultyCategory[];
}

export default function FacultyForm({
  mode,
  initialData,
  categories,
}: FacultyFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const photoRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    category_id: initialData?.category_id || "",
    name_mn: initialData?.name_mn || "",
    name_en: initialData?.name_en || "",
    role_mn: initialData?.role_mn || "",
    role_en: initialData?.role_en || "",
    photo_url: initialData?.photo_url || "",
    education_mn: initialData?.education_mn || "",
    education_en: initialData?.education_en || "",
    experience_mn: initialData?.experience_mn || "",
    experience_en: initialData?.experience_en || "",
    research_mn: initialData?.research_mn || "",
    research_en: initialData?.research_en || "",
    sort_order: initialData?.sort_order ?? 0,
  });

  const update = useCallback(
    (field: string, value: string | number) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    [],
  );

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "faculty");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      update("photo_url", data.url);
    } catch {
      setError("Зураг оруулахад алдаа гарлаа.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name_mn.trim() || !form.name_en.trim()) {
      setError("Нэр (MN, EN) оруулна уу.");
      return;
    }
    if (!form.category_id) {
      setError("Ангилал сонгоно уу.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const payload = { ...form };
      const url =
        mode === "create"
          ? "/api/admin/faculty"
          : `/api/admin/faculty/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Хадгалахад алдаа гарлаа");
      }
      router.push("/admin/faculty");
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
      <header className="sticky top-0 z-20 border-b border-border bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/faculty">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">
              {mode === "create" ? "Багш нэмэх" : "Багш засах"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {mode === "create"
                ? "Шинэ багшийн мэдээлэл оруулах"
                : "Багшийн мэдээлэл засах"}
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

        {/* Category & Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Ерөнхий мэдээлэл</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Ангилал *</label>
              <Select
                value={form.category_id}
                onValueChange={(v) => update("category_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ангилал сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.heading_mn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={LBL}>Эрэмбэ</label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => update("sort_order", Number(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <User className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Зураг</h2>
          </div>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              {form.photo_url ? (
                <div className="relative group w-32 h-32 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.photo_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => photoRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium cursor-pointer rounded-xl"
                  >
                    Солих
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => photoRef.current?.click()}
                  className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-xs">Зураг оруулах</span>
                </button>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className={LBL}>Эсвэл URL оруулах</label>
              <Input
                placeholder="https://..."
                value={form.photo_url}
                onChange={(e) => update("photo_url", e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Нэр & Албан тушаал</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Нэр (Монгол) *</label>
              <Input
                value={form.name_mn}
                onChange={(e) => update("name_mn", e.target.value)}
                placeholder="Овог Нэр"
              />
            </div>
            <div>
              <label className={LBL}>Name (English) *</label>
              <Input
                value={form.name_en}
                onChange={(e) => update("name_en", e.target.value)}
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Албан тушаал (Монгол)</label>
              <Input
                value={form.role_mn}
                onChange={(e) => update("role_mn", e.target.value)}
              />
            </div>
            <div>
              <label className={LBL}>Role (English)</label>
              <Input
                value={form.role_en}
                onChange={(e) => update("role_en", e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Боловсрол</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Боловсрол (Монгол)</label>
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={form.education_mn}
                onChange={(e) => update("education_mn", e.target.value)}
              />
            </div>
            <div>
              <label className={LBL}>Education (English)</label>
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={form.education_en}
                onChange={(e) => update("education_en", e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Ажлын туршлага</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Туршлага (Монгол)</label>
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={form.experience_mn}
                onChange={(e) => update("experience_mn", e.target.value)}
              />
            </div>
            <div>
              <label className={LBL}>Experience (English)</label>
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={form.experience_en}
                onChange={(e) => update("experience_en", e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Research */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Судалгааны чиглэл</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LBL}>Судалгаа (Монгол)</label>
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={form.research_mn}
                onChange={(e) => update("research_mn", e.target.value)}
              />
            </div>
            <div>
              <label className={LBL}>Research (English)</label>
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={form.research_en}
                onChange={(e) => update("research_en", e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/faculty">Болих</Link>
          </Button>
          <Button type="submit" disabled={saving} variant="premium">
            <Save className="h-4 w-4 mr-1" />
            {saving
              ? "Хадгалж байна..."
              : mode === "create"
                ? "Нэмэх"
                : "Хадгалах"}
          </Button>
        </div>
      </form>
    </div>
  );
}

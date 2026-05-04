"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
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
  Eye,
  Maximize2,
  Minimize2,
  Grid3X3,
  Plus,
  Minus,
  Trash2,
  FileUp,
  X,
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

/* eslint-disable @typescript-eslint/no-explicit-any */
type QuillType = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ── Helper: get Quill class from react-quill-new (browser only) ── */
let QuillClass: QuillType = null;
if (typeof window !== "undefined") {
  import("react-quill-new").then((mod) => {
    QuillClass = mod.Quill ?? mod.default?.Quill ?? null;
  });
}

/** Get the native Quill instance from a container DOM element */
function findQuillInstance(containerEl: HTMLElement | null): QuillType | null {
  if (!containerEl) return null;
  const qlContainer = containerEl.querySelector(".ql-container");
  if (!qlContainer) return null;
  // Use Quill.find() which looks up the instances WeakMap
  if (QuillClass?.find) {
    const instance = QuillClass.find(qlContainer);
    if (instance) return instance;
  }
  return null;
}

/* ── Image upload ── */
async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()).url;
}

function imageHandler(this: { quill: QuillType }) {
  const quill = this.quill;
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      const range = quill.getSelection(true);
      quill.insertEmbed(range?.index ?? 0, "image", url);
      quill.setSelection((range?.index ?? 0) + 1);
    } catch {
      alert("Зураг оруулахад алдаа гарлаа");
    }
  };
}

/* ── Quill config with native table module ── */
const QUILL_MODULES = {
  table: true,
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "link", "image", "video"],
      ["clean"],
    ],
    handlers: { image: imageHandler },
  },
  clipboard: { matchVisual: false },
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "align",
  "list",
  "indent",
  "blockquote",
  "link",
  "image",
  "video",
  "table",
  "table-row",
  "table-body",
  "table-container",
];

/* ── Table controls using Quill's native table API + DOM merge ── */
function TableControls({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [showInsert, setShowInsert] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setShowInsert(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function getTableModule() {
    const quill = findQuillInstance(containerRef.current);
    if (!quill) return null;
    return quill.getModule("table");
  }

  function handleInsert() {
    const quill = findQuillInstance(containerRef.current);
    if (!quill) return;
    const range = quill.getSelection();
    if (!range) quill.focus();
    const mod = quill.getModule("table");
    if (mod) mod.insertTable(rows, cols);
    setShowInsert(false);
  }

  const BTN =
    "flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg transition-colors hover:bg-primary/10 hover:text-primary text-muted-foreground";

  return (
    <div
      ref={popRef}
      className="relative flex flex-wrap items-center gap-1 mb-2"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowInsert(!showInsert)}
          className={BTN}
          title="Хүснэгт нэмэх"
        >
          <Grid3X3 className="h-3.5 w-3.5" />
          <span>Хүснэгт</span>
        </button>
        {showInsert && (
          <div className="absolute top-full left-0 mt-1 z-30 bg-white border border-border rounded-xl shadow-lg p-3 space-y-3 min-w-[200px]">
            <p className="text-xs font-medium text-foreground">
              Хүснэгт оруулах
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-12">Мөр:</label>
              <input
                type="number"
                min={2}
                max={20}
                value={rows}
                onChange={(e) => setRows(Math.max(2, +e.target.value))}
                className="w-16 border border-border rounded-lg px-2 py-1 text-xs text-center"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-12">
                Багана:
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={cols}
                onChange={(e) => setCols(Math.max(1, +e.target.value))}
                className="w-16 border border-border rounded-lg px-2 py-1 text-xs text-center"
              />
            </div>
            <button
              type="button"
              onClick={handleInsert}
              className="w-full text-xs font-medium bg-primary text-white rounded-lg py-1.5 hover:bg-primary-dark transition-colors"
            >
              Оруулах
            </button>
          </div>
        )}
      </div>
      <span className="w-px h-5 bg-border mx-1" />
      <button
        type="button"
        onClick={() => getTableModule()?.insertRowBelow()}
        className={BTN}
        title="Мөр нэмэх"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>Мөр</span>
      </button>
      <button
        type="button"
        onClick={() => getTableModule()?.deleteRow()}
        className={BTN}
        title="Мөр устгах"
      >
        <Minus className="h-3.5 w-3.5" />
        <span>Мөр</span>
      </button>
      <span className="w-px h-5 bg-border mx-1" />
      <button
        type="button"
        onClick={() => getTableModule()?.insertColumnRight()}
        className={BTN}
        title="Багана нэмэх"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>Багана</span>
      </button>
      <button
        type="button"
        onClick={() => getTableModule()?.deleteColumn()}
        className={BTN}
        title="Багана устгах"
      >
        <Minus className="h-3.5 w-3.5" />
        <span>Багана</span>
      </button>
      <span className="w-px h-5 bg-border mx-1" />
      <button
        type="button"
        onClick={() => getTableModule()?.deleteTable()}
        className={`${BTN} hover:bg-red-50 hover:text-red-600`}
        title="Хүснэгт устгах"
      >
        <Trash2 className="h-3.5 w-3.5" />
        <span>Устгах</span>
      </button>
    </div>
  );
}

/* ── Rich Editor ── */
function RichEditor({
  value,
  onChange,
  placeholder,
  modules: mods,
  formats,
  label,
  wordCount,
  charCount,
  wordLabel,
  charLabel,
  previewLabel,
  expandLabel,
  collapseLabel,
  expanded,
  onToggleExpand,
  icon,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder: string;
  modules: typeof QUILL_MODULES;
  formats: string[];
  label: string;
  wordCount: number;
  charCount: number;
  wordLabel: string;
  charLabel: string;
  previewLabel: string;
  expandLabel: string;
  collapseLabel: string;
  expanded: boolean;
  onToggleExpand: () => void;
  icon: React.ReactNode;
}) {
  const [preview, setPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const SEC_INNER = expanded
    ? "fixed inset-4 z-50 overflow-auto rounded-2xl! bg-white border border-border p-6 space-y-4 shadow-sm"
    : "";

  return (
    <div className={SEC_INNER || undefined}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground">
          {icon}
          <h2 className="text-sm font-semibold">{label}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {wordCount} {wordLabel} · {charCount} {charLabel}
          </span>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title={previewLabel}
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title={expanded ? collapseLabel : expandLabel}
          >
            {expanded ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <TableControls containerRef={containerRef} />
      {preview ? (
        <div className="rounded-xl border border-border bg-white p-6">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
            {previewLabel}
          </p>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      ) : (
        <div ref={containerRef}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={mods}
            formats={formats}
            placeholder={placeholder}
            useSemanticHTML={false}
          />
        </div>
      )}
    </div>
  );
}

/* ── Main form ── */
interface NewsFormProps {
  initialData?: NewsItem;
  mode: "create" | "edit";
}

export default function NewsForm({ initialData, mode }: NewsFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [expandedEditor, setExpandedEditor] = useState<"mn" | "en" | null>(
    null,
  );
  const bannerRef = useRef<HTMLInputElement>(null);
  const newsImgRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title_mn: initialData?.title_mn || "",
    title_en: initialData?.title_en || "",
    content_mn: initialData?.content_mn || "",
    content_en: initialData?.content_en || "",
    category: initialData?.category || "CODE001",
    banner_img: initialData?.banner_img || "",
    news_img: initialData?.news_img || "",
    pdf_url: initialData?.pdf_url || "",
    is_active: initialData?.is_active ?? true,
  });

  const update = useCallback(
    (field: string, value: string | boolean) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    [],
  );
  const modules = useMemo(() => QUILL_MODULES, []);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "banner_img" | "news_img",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      update(field, await uploadImage(file));
    } catch {
      setError("Зураг оруулахад алдаа гарлаа. Supabase тохиргоог шалгана уу.");
    }
  }

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Зөвхөн PDF файл оруулах боломжтой.");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "pdfs");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Upload failed");
      }
      const { url } = await res.json();
      update("pdf_url", url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "PDF оруулахад алдаа гарлаа. Supabase тохиргоог шалгана уу.",
      );
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
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Хадгалахад алдаа гарлаа");
      }
      router.push("/admin/news");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Хадгалахад алдаа гарлаа");
    }
    setSaving(false);
  }

  function stripHtml(html: string) {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  }
  const mnPlain = stripHtml(form.content_mn);
  const enPlain = stripHtml(form.content_en);
  const mnWordCount = mnPlain ? mnPlain.split(/\s+/).length : 0;
  const enWordCount = enPlain ? enPlain.split(/\s+/).length : 0;

  const SEC =
    "rounded-2xl bg-white border border-border p-6 space-y-4 shadow-sm";
  const LBL =
    "block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2";

  return (
    <div className="min-h-screen bg-surface">
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
          <Button
            type="button"
            size="sm"
            disabled={saving}
            variant="premium"
            onClick={() =>
              document.querySelector<HTMLFormElement>("form")?.requestSubmit()
            }
          >
            <Save className="h-4 w-4 mr-1" />
            {saving ? "..." : "Хадгалах"}
          </Button>
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
                  className={`relative h-6 w-11 rounded-full transition-colors ${form.is_active ? "bg-emerald-500" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${form.is_active ? "translate-x-5" : "translate-x-0.5"}`}
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

        {/* PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className={SEC}
        >
          <div className="flex items-center gap-2 text-foreground">
            <FileUp className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">PDF файл</h2>
          </div>
          <input
            ref={pdfRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfUpload}
          />
          {form.pdf_url ? (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <FileText className="h-5 w-5 text-red-500 shrink-0" />
              <a
                href={form.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline truncate flex-1"
              >
                {form.pdf_url.split("/").pop()}
              </a>
              <button
                type="button"
                onClick={() => pdfRef.current?.click()}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Солих
              </button>
              <button
                type="button"
                onClick={() => update("pdf_url", "")}
                className="p-1 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                title="Устгах"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => pdfRef.current?.click()}
              className="w-full h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer"
            >
              <FileUp className="h-5 w-5" />
              <span className="text-xs">PDF файл оруулах (20MB хүртэл)</span>
            </button>
          )}
          <Input
            placeholder="Эсвэл PDF URL оруулах"
            value={form.pdf_url}
            onChange={(e) => update("pdf_url", e.target.value)}
            className="mt-2"
          />
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
          <RichEditor
            value={form.content_mn}
            onChange={(v) => update("content_mn", v)}
            placeholder="Мэдээний агуулга..."
            modules={modules}
            formats={QUILL_FORMATS}
            label="Агуулга (Монгол)"
            wordCount={mnWordCount}
            charCount={mnPlain.length}
            wordLabel="үг"
            charLabel="тэмдэгт"
            previewLabel="Урьдчилсан харагдац"
            expandLabel="Томруулах"
            collapseLabel="Жижигрүүлэх"
            expanded={expandedEditor === "mn"}
            onToggleExpand={() =>
              setExpandedEditor(expandedEditor === "mn" ? null : "mn")
            }
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
        </motion.div>

        {/* Content EN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={SEC}
        >
          <RichEditor
            value={form.content_en}
            onChange={(v) => update("content_en", v)}
            placeholder="News content..."
            modules={modules}
            formats={QUILL_FORMATS}
            label="Агуулга (Англи)"
            wordCount={enWordCount}
            charCount={enPlain.length}
            wordLabel="words"
            charLabel="chars"
            previewLabel="Preview"
            expandLabel="Expand"
            collapseLabel="Minimize"
            expanded={expandedEditor === "en"}
            onToggleExpand={() =>
              setExpandedEditor(expandedEditor === "en" ? null : "en")
            }
            icon={<Globe className="h-4 w-4 text-muted-foreground" />}
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

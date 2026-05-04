"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  RefreshCw,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  Globe,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface Collaboration {
  id: string;
  slug: string;
  title_mn: string;
  title_en: string;
  body_mn: string;
  body_en: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

const emptyItem: Omit<Collaboration, "id" | "slug" | "sort_order"> = {
  title_mn: "",
  title_en: "",
  body_mn: "",
  body_en: "",
  image_url: "",
  is_active: true,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AdminCollaborationsPage() {
  const [items, setItems] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Collaboration | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/collaborations");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function startNew() {
    setEditing({ ...emptyItem, id: "", slug: "", sort_order: 0 });
    setIsNew(true);
  }

  function startEdit(item: Collaboration) {
    setEditing({ ...item });
    setIsNew(false);
  }

  function cancelEdit() {
    setEditing(null);
    setIsNew(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      if (isNew) {
        await fetch("/api/admin/collaborations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      } else {
        await fetch(`/api/admin/collaborations/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
      }
      setEditing(null);
      setIsNew(false);
      await fetchItems();
    } catch {
      /* ignore */
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/collaborations/${id}`, { method: "DELETE" });
    fetchItems();
  }

  async function handleToggle(id: string, currentActive: boolean) {
    await fetch(`/api/admin/collaborations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !currentActive }),
    });
    fetchItems();
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetchItems();
    setTimeout(() => setRefreshing(false), 600);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "collaborations");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setEditing({ ...editing, image_url: data.url });
      }
    } catch {
      /* ignore */
    }
    setUploading(false);
  }

  return (
    <div className="min-h-screen bg-surface">
      <AdminHeader />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Гадаад харилцаа
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Хамтын ажиллагааны сургуулиудыг удирдах
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw
                className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`}
              />
              Шинэчлэх
            </Button>
            <Button size="sm" onClick={startNew}>
              <Plus className="h-4 w-4 mr-1" /> Нэмэх
            </Button>
          </div>
        </div>

        {/* Edit form */}
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-border p-6 mb-8 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">
                {isNew ? "Шинэ хамтын ажиллагаа" : "Засварлах"}
              </h2>
              <button
                onClick={cancelEdit}
                className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Гарчиг (MN)">
                <Input
                  value={editing.title_mn}
                  onChange={(e) =>
                    setEditing({ ...editing, title_mn: e.target.value })
                  }
                  placeholder="Сургуулийн нэр (Монгол)"
                />
              </Field>
              <Field label="Title (EN)">
                <Input
                  value={editing.title_en}
                  onChange={(e) =>
                    setEditing({ ...editing, title_en: e.target.value })
                  }
                  placeholder="University name (English)"
                />
              </Field>
            </div>

            <Field label="Тайлбар (MN)">
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[120px]"
                value={editing.body_mn}
                onChange={(e) =>
                  setEditing({ ...editing, body_mn: e.target.value })
                }
                placeholder="Хамтын ажиллагааны тайлбар..."
              />
            </Field>

            <Field label="Description (EN)">
              <textarea
                className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[120px]"
                value={editing.body_en}
                onChange={(e) =>
                  setEditing({ ...editing, body_en: e.target.value })
                }
                placeholder="Collaboration description..."
              />
            </Field>

            <Field label="Зураг">
              <div className="flex items-center gap-3">
                {editing.image_url && (
                  <img
                    src={editing.image_url}
                    alt=""
                    className="h-16 w-24 rounded-lg object-cover border border-border"
                  />
                )}
                <label className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Байршуулж байна..." : "Зураг оруулах"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
                <span className="text-xs text-muted-foreground">эсвэл</span>
                <Input
                  value={editing.image_url}
                  onChange={(e) =>
                    setEditing({ ...editing, image_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="flex-1"
                />
              </div>
            </Field>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" onClick={cancelEdit}>
                Болих
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-1" />
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* List */}
        <div className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <Globe className="mx-auto h-8 w-8 text-border" />
              <p className="mt-3 text-sm text-muted-foreground">
                Хамтын ажиллагаа бүртгэгдээгүй байна
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors group"
                  >
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt=""
                        className="h-12 w-18 rounded-lg object-cover border border-border shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-18 rounded-lg bg-muted/60 border border-border flex items-center justify-center shrink-0">
                        <Globe className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-1">
                        {item.title_mn}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {item.title_en}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggle(item.id, item.is_active)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer shrink-0 ${
                        item.is_active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {item.is_active ? (
                        <>
                          <Eye className="h-3 w-3" /> Идэвхтэй
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" /> Идэвхгүй
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Устгах</AlertDialogTitle>
                          <AlertDialogDescription>
                            &ldquo;{item.title_mn}&rdquo; хамтын ажиллагааг
                            устгахдаа итгэлтэй байна уу?
                          </AlertDialogDescription>
                          <div className="mt-6 flex justify-end gap-3">
                            <AlertDialogCancel>Болих</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item.id)}
                            >
                              Устгах
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

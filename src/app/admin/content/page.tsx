"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RefreshCw,
  Plus,
  Trash2,
  Save,
  Upload,
  FileText,
  X,
} from "lucide-react";

interface ConferenceLink {
  label_mn: string;
  label_en: string;
  url: string;
}
interface ConferencesData {
  body_mn: string;
  body_en: string;
  archive_title_mn: string;
  archive_title_en: string;
  links: ConferenceLink[];
}
interface HospitalItem {
  mn: string;
  en: string;
}

const emptyLink: ConferenceLink = { label_mn: "", label_en: "", url: "" };
const emptyHospital: HospitalItem = { mn: "", en: "" };

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

function SaveBar({
  saving,
  saved,
  onSave,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-2 mb-6">
      {saved && (
        <span className="text-sm text-success font-medium">✓ Хадгалагдлаа</span>
      )}
      <Button onClick={onSave} disabled={saving}>
        <Save className="h-4 w-4 mr-1" />{" "}
        {saving ? "Хадгалж байна..." : "Хадгалах"}
      </Button>
    </div>
  );
}

export default function AdminContentPage() {
  const [conf, setConf] = useState<ConferencesData>({
    body_mn: "",
    body_en: "",
    archive_title_mn: "",
    archive_title_en: "",
    links: [],
  });
  const [hospitals, setHospitals] = useState<HospitalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingConf, setSavingConf] = useState(false);
  const [savingHosp, setSavingHosp] = useState(false);
  const [savedConf, setSavedConf] = useState(false);
  const [savedHosp, setSavedHosp] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [confRes, hospRes] = await Promise.all([
          fetch("/api/admin/site-content/conferences"),
          fetch("/api/admin/site-content/hospitals"),
        ]);
        if (cancelled) return;
        if (confRes.status === 401) {
          router.push("/admin/login");
          return;
        }
        const confJson = await confRes.json();
        const hospJson = await hospRes.json();
        if (!cancelled) {
          if (confJson.body_mn !== undefined) setConf(confJson);
          if (Array.isArray(hospJson)) setHospitals(hospJson);
        }
      } catch {
        /* ignore */
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // Save handlers
  async function saveConf() {
    setSavingConf(true);
    setSavedConf(false);
    await fetch("/api/admin/site-content/conferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conf),
    }).catch(() => {});
    setSavedConf(true);
    setTimeout(() => setSavedConf(false), 3000);
    setSavingConf(false);
  }
  async function saveHosp() {
    setSavingHosp(true);
    setSavedHosp(false);
    await fetch("/api/admin/site-content/hospitals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospitals),
    }).catch(() => {});
    setSavedHosp(true);
    setTimeout(() => setSavedHosp(false), 3000);
    setSavingHosp(false);
  }

  // Conference helpers
  function setConfField(key: keyof ConferencesData, val: string) {
    setConf((d) => ({ ...d, [key]: val }));
  }
  function setLink(i: number, key: keyof ConferenceLink, val: string) {
    setConf((d) => {
      const links = [...d.links];
      links[i] = { ...links[i], [key]: val };
      return { ...d, links };
    });
  }
  function addLink() {
    setConf((d) => ({ ...d, links: [...d.links, { ...emptyLink }] }));
  }
  function removeLink(i: number) {
    setConf((d) => ({ ...d, links: d.links.filter((_, j) => j !== i) }));
  }

  // PDF upload handler
  async function handlePdfUpload(i: number, file: File) {
    if (file.type !== "application/pdf") {
      alert("Зөвхөн PDF файл оруулна уу");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert("PDF файлын хэмжээ 20 MB-аас хэтрэхгүй байх ёстой");
      return;
    }
    setUploadingIdx(i);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "conferences");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Upload амжилтгүй");
        return;
      }
      // Set the public URL into the link's url field
      setLink(i, "url", data.url);
    } catch {
      alert("Upload амжилтгүй");
    } finally {
      setUploadingIdx(null);
      // Reset file input
      if (fileInputRefs.current[i]) {
        fileInputRefs.current[i]!.value = "";
      }
    }
  }

  // Hospital helpers
  function setHosp(i: number, key: keyof HospitalItem, val: string) {
    setHospitals((h) => {
      const arr = [...h];
      arr[i] = { ...arr[i], [key]: val };
      return arr;
    });
  }
  function addHosp() {
    setHospitals((h) => [...h, { ...emptyHospital }]);
  }
  function removeHosp(i: number) {
    setHospitals((h) => h.filter((_, j) => j !== i));
  }

  return (
    <div className="min-h-screen bg-surface">
      <AdminHeader />
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Tabs.Root defaultValue="conferences">
            <Tabs.List className="flex gap-1 border-b border-border mb-8">
              {[
                { value: "conferences", label: "Эрдмийн чуулган" },
                { value: "hospitals", label: "Бааз эмнэлгүүд" },
              ].map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground border-b-2 border-transparent transition-colors data-[state=active]:text-primary data-[state=active]:border-primary hover:text-foreground -mb-px"
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* ═══ TAB: Эрдмийн чуулган ═══ */}
            <Tabs.Content value="conferences">
              <SaveBar
                saving={savingConf}
                saved={savedConf}
                onSave={saveConf}
              />
              <div className="space-y-6">
                <div className="rounded-2xl bg-white border border-border p-6 space-y-4">
                  <h2 className="text-base font-semibold text-foreground">
                    Үндсэн текст
                  </h2>
                  <Field label="Тайлбар (MN)">
                    <textarea
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[120px]"
                      value={conf.body_mn}
                      onChange={(e) => setConfField("body_mn", e.target.value)}
                    />
                  </Field>
                  <Field label="Description (EN)">
                    <textarea
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[120px]"
                      value={conf.body_en}
                      onChange={(e) => setConfField("body_en", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="rounded-2xl bg-white border border-border p-6 space-y-4">
                  <h2 className="text-base font-semibold text-foreground">
                    Архивын холбоосууд
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Гарчиг (MN)">
                      <Input
                        value={conf.archive_title_mn}
                        onChange={(e) =>
                          setConfField("archive_title_mn", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Title (EN)">
                      <Input
                        value={conf.archive_title_en}
                        onChange={(e) =>
                          setConfField("archive_title_en", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <div className="space-y-4">
                    {conf.links.map((link, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-muted/30 p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">
                            Холбоос {i + 1}
                          </span>
                          <button
                            onClick={() => removeLink(i)}
                            className="text-destructive hover:text-destructive/80 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Нэр (MN)">
                            <Input
                              value={link.label_mn}
                              onChange={(e) =>
                                setLink(i, "label_mn", e.target.value)
                              }
                            />
                          </Field>
                          <Field label="Label (EN)">
                            <Input
                              value={link.label_en}
                              onChange={(e) =>
                                setLink(i, "label_en", e.target.value)
                              }
                            />
                          </Field>
                        </div>
                        <Field label="URL">
                          <div className="flex items-center gap-2">
                            <Input
                              value={link.url}
                              onChange={(e) =>
                                setLink(i, "url", e.target.value)
                              }
                              placeholder="https://..."
                              className="flex-1"
                            />
                            <input
                              ref={(el) => {
                                fileInputRefs.current[i] = el;
                              }}
                              type="file"
                              accept=".pdf,application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePdfUpload(i, file);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={uploadingIdx === i}
                              onClick={() => fileInputRefs.current[i]?.click()}
                              className="shrink-0"
                            >
                              {uploadingIdx === i ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                              <span className="ml-1 hidden sm:inline">
                                {uploadingIdx === i ? "Uploading..." : "PDF"}
                              </span>
                            </Button>
                          </div>
                          {link.url && link.url.endsWith(".pdf") && (
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                              <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-primary hover:underline"
                              >
                                {link.url.split("/").pop()}
                              </a>
                              <button
                                type="button"
                                onClick={() => setLink(i, "url", "")}
                                className="ml-auto text-muted-foreground hover:text-destructive shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </Field>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={addLink}>
                    <Plus className="h-4 w-4 mr-1" /> Холбоос нэмэх
                  </Button>
                </div>
              </div>
            </Tabs.Content>

            {/* ═══ TAB: Бааз эмнэлгүүд ═══ */}
            <Tabs.Content value="hospitals">
              <SaveBar
                saving={savingHosp}
                saved={savedHosp}
                onSave={saveHosp}
              />
              <div className="rounded-2xl bg-white border border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-foreground">
                    Нийт: {hospitals.length} эмнэлэг
                  </h2>
                  <Button variant="outline" size="sm" onClick={addHosp}>
                    <Plus className="h-4 w-4 mr-1" /> Эмнэлэг нэмэх
                  </Button>
                </div>
                <div className="space-y-2">
                  {hospitals.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-2.5"
                    >
                      <span className="text-xs text-muted-foreground w-6 shrink-0">
                        {i + 1}.
                      </span>
                      <Input
                        value={h.mn}
                        onChange={(e) => setHosp(i, "mn", e.target.value)}
                        placeholder="Нэр (MN)"
                        className="flex-1 text-sm h-8"
                      />
                      <Input
                        value={h.en}
                        onChange={(e) => setHosp(i, "en", e.target.value)}
                        placeholder="Name (EN)"
                        className="flex-1 text-sm h-8"
                      />
                      <button
                        onClick={() => removeHosp(i)}
                        className="text-destructive hover:text-destructive/80 p-1 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        )}
      </div>
    </div>
  );
}

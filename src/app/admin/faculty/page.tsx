"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "@/components/admin/AdminHeader";
import { Plus, RefreshCw, Pencil, Trash2, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import type { FacultyCategory, FacultyMember } from "@/lib/faculty";

export default function AdminFacultyPage() {
  const [categories, setCategories] = useState<FacultyCategory[]>([]);
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterCat, setFilterCat] = useState("");
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faculty");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setCategories(data.categories || []);
      setMembers(data.members || []);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/faculty");
        if (cancelled) return;
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setCategories(data.categories || []);
          setMembers(data.members || []);
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

  const filtered = filterCat
    ? members.filter((m) => m.category_id === filterCat)
    : members;

  function catName(id: string) {
    return categories.find((c) => c.id === id)?.heading_mn || "—";
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/faculty/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetchData();
    setTimeout(() => setRefreshing(false), 600);
  }

  return (
    <div className="min-h-screen bg-surface">
      <AdminHeader />

      <div className="p-4 sm:p-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Нийт багш",
              value: members.length,
              color: "from-blue-50 to-blue-100/50 border-blue-200/60",
              text: "text-blue-600",
            },
            {
              label: "Ангилал",
              value: categories.length,
              color: "from-purple-50 to-purple-100/50 border-purple-200/60",
              text: "text-purple-600",
            },
            {
              label: "Шүүсэн",
              value: filtered.length,
              color: "from-emerald-50 to-emerald-100/50 border-emerald-200/60",
              text: "text-emerald-600",
            },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border bg-linear-to-br ${s.color} p-4`}
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.text}`}>
                {loading ? "—" : s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Select
            value={filterCat || "all"}
            onValueChange={(v) => setFilterCat(v === "all" ? "" : v)}
          >
            <SelectTrigger className="w-full sm:w-80">
              <SelectValue placeholder="Бүх ангилал" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх ангилал</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.heading_mn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw
                className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`}
              />{" "}
              Шинэчлэх
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/faculty/new">
                <Plus className="h-4 w-4 mr-1" /> Багш нэмэх
              </Link>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Нэр
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                    Ангилал
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                    Албан тушаал
                  </th>
                  <th className="px-5 py-3.5 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground w-16">
                    №
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Үйлдэл
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <motion.div
                        className="mx-auto h-6 w-6 rounded-full border-2 border-border border-t-primary"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <p className="mt-3 text-xs text-muted-foreground">
                        Уншиж байна...
                      </p>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <Users className="mx-auto h-8 w-8 text-border" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        Багш олдсонгүй
                      </p>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filtered.map((m, i) => (
                      <motion.tr
                        key={m.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="group border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                              {m.photo_url ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={m.photo_url}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-4 h-4 text-muted-foreground/50" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground line-clamp-1">
                                {m.name_mn}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {m.name_en}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground line-clamp-1 max-w-[200px] inline-block">
                            {catName(m.category_id)}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <p className="text-xs text-muted-foreground line-clamp-2 max-w-[220px]">
                            {m.role_mn}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-center text-xs text-muted-foreground">
                          {m.sort_order}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/faculty/${m.id}/edit`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogTitle>Багш устгах</AlertDialogTitle>
                                <AlertDialogDescription>
                                  &ldquo;{m.name_mn}&rdquo; багшийг устгахдаа
                                  итгэлтэй байна уу?
                                </AlertDialogDescription>
                                <div className="mt-6 flex justify-end gap-3">
                                  <AlertDialogCancel>Болих</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(m.id)}
                                  >
                                    Устгах
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

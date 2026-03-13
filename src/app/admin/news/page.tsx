"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import {
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Trash2,
  LogOut,
  Newspaper,
  Eye,
  EyeOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  NEWS_CATEGORIES,
  getCategoryName,
  type NewsItem,
} from "@/lib/supabase";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type SortKey = "title_mn" | "category" | "created_at" | "is_active";
type SortDir = "asc" | "desc";

function SortIcon({
  sortKey,
  sortDir,
  col,
}: {
  sortKey: SortKey;
  sortDir: SortDir;
  col: SortKey;
}) {
  if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
  return sortDir === "asc" ? (
    <ArrowUp className="h-3 w-3" />
  ) : (
    <ArrowDown className="h-3 w-3" />
  );
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setNews(data);
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
        const res = await fetch("/api/admin/news");
        if (cancelled) return;
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) setNews(data);
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

  // Client-side filter + sort
  const filtered = useMemo(() => {
    let list = [...news];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) =>
          n.title_mn.toLowerCase().includes(q) ||
          (n.title_en && n.title_en.toLowerCase().includes(q)),
      );
    }
    if (category) list = list.filter((n) => n.category === category);
    if (status === "active") list = list.filter((n) => n.is_active);
    else if (status === "inactive") list = list.filter((n) => !n.is_active);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title_mn") cmp = a.title_mn.localeCompare(b.title_mn);
      else if (sortKey === "category")
        cmp = (a.category || "").localeCompare(b.category || "");
      else if (sortKey === "created_at")
        cmp =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortKey === "is_active")
        cmp = Number(a.is_active) - Number(b.is_active);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [news, search, category, status, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    fetchNews();
  }
  async function handleToggle(id: number, currentActive: boolean) {
    await fetch(`/api/admin/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !currentActive }),
    });
    fetchNews();
  }
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }
  async function handleRefresh() {
    setRefreshing(true);
    await fetchNews();
    setTimeout(() => setRefreshing(false), 600);
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-xl sm:px-8">
        <div className="flex items-center gap-3">
          <Logo height={36} />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted cursor-pointer"
        >
          <LogOut className="h-4 w-4" /> Гарах
        </button>
      </header>

      <div className="p-4 sm:p-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: "Нийт",
              value: news.length,
              color: "from-blue-50 to-blue-100/50 border-blue-200/60",
              text: "text-blue-600",
            },
            {
              label: "Идэвхтэй",
              value: news.filter((n) => n.is_active).length,
              color: "from-emerald-50 to-emerald-100/50 border-emerald-200/60",
              text: "text-emerald-600",
            },
            {
              label: "Идэвхгүй",
              value: news.filter((n) => !n.is_active).length,
              color: "from-amber-50 to-amber-100/50 border-amber-200/60",
              text: "text-amber-600",
            },
            {
              label: "Ангилал",
              value: new Set(news.map((n) => n.category)).size,
              color: "from-purple-50 to-purple-100/50 border-purple-200/60",
              text: "text-purple-600",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border bg-linear-to-br ${stat.color} p-4`}
            >
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`mt-1 text-2xl font-bold ${stat.text}`}>
                {loading ? "—" : stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Хайх..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Select
              value={category || "all"}
              onValueChange={(v) => setCategory(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-full sm:w-52">
                <SelectValue placeholder="Бүх ангилал" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх ангилал</SelectItem>
                {NEWS_CATEGORIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.mn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={status || "all"}
              onValueChange={(v) => setStatus(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Бүх төлөв" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх төлөв</SelectItem>
                <SelectItem value="active">Идэвхтэй</SelectItem>
                <SelectItem value="inactive">Идэвхгүй</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw
                className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`}
              />{" "}
              Шинэчлэх
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/news/new">
                <Plus className="h-4 w-4 mr-1" /> Мэдээ нэмэх
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
                  <th
                    className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer select-none"
                    onClick={() => toggleSort("title_mn")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Гарчиг{" "}
                      <SortIcon
                        sortKey={sortKey}
                        sortDir={sortDir}
                        col="title_mn"
                      />
                    </span>
                  </th>
                  <th
                    className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell cursor-pointer select-none"
                    onClick={() => toggleSort("category")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Ангилал{" "}
                      <SortIcon
                        sortKey={sortKey}
                        sortDir={sortDir}
                        col="category"
                      />
                    </span>
                  </th>
                  <th
                    className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell cursor-pointer select-none"
                    onClick={() => toggleSort("created_at")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Огноо{" "}
                      <SortIcon
                        sortKey={sortKey}
                        sortDir={sortDir}
                        col="created_at"
                      />
                    </span>
                  </th>
                  <th
                    className="px-5 py-3.5 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer select-none"
                    onClick={() => toggleSort("is_active")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Төлөв{" "}
                      <SortIcon
                        sortKey={sortKey}
                        sortDir={sortDir}
                        col="is_active"
                      />
                    </span>
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
                      <Newspaper className="mx-auto h-8 w-8 text-border" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        Мэдээ олдсонгүй
                      </p>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filtered.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="group border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                      >
                        <td className="px-5 py-4 max-w-[260px]">
                          <p className="font-medium text-foreground line-clamp-1">
                            {item.title_mn}
                          </p>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {getCategoryName(item.category)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground hidden md:table-cell text-xs">
                          {new Date(
                            item.created_at.replace(" ", "T"),
                          ).toLocaleDateString("mn-MN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() =>
                              handleToggle(item.id, item.is_active)
                            }
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${item.is_active ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
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
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/news/${item.id}/edit`}>
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
                                <AlertDialogTitle>
                                  Мэдээ устгах
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  &ldquo;{item.title_mn}&rdquo; мэдээг устгахдаа
                                  итгэлтэй байна уу? Энэ үйлдлийг буцаах
                                  боломжгүй.
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

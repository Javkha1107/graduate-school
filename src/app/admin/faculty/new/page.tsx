"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FacultyForm from "@/components/admin/FacultyForm";
import type { FacultyCategory } from "@/lib/faculty";

export default function NewFacultyPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<FacultyCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/faculty");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setCategories(data.categories || []);
      } catch {
        /* ignore */
      }
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Уншиж байна...</p>
      </div>
    );
  }

  return <FacultyForm mode="create" categories={categories} />;
}

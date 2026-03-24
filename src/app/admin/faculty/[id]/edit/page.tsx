"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import FacultyForm from "@/components/admin/FacultyForm";
import type { FacultyCategory, FacultyMember } from "@/lib/faculty";

export default function EditFacultyPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<FacultyMember | null>(null);
  const [categories, setCategories] = useState<FacultyCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [memberRes, listRes] = await Promise.all([
          fetch(`/api/admin/faculty/${params.id}`),
          fetch("/api/admin/faculty"),
        ]);
        if (memberRes.status === 401 || listRes.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!memberRes.ok) throw new Error("Not found");
        const memberData = await memberRes.json();
        const listData = await listRes.json();
        setMember(memberData);
        setCategories(listData.categories || []);
      } catch {
        router.push("/admin/faculty");
      }
      setLoading(false);
    }
    load();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Уншиж байна...</p>
      </div>
    );
  }

  if (!member) return null;

  return (
    <FacultyForm mode="edit" initialData={member} categories={categories} />
  );
}

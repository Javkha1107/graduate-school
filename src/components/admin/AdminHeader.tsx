"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { LogOut, Newspaper, Users } from "lucide-react";

const tabs = [
  { href: "/admin/news", label: "Мэдээ", icon: Newspaper },
  { href: "/admin/faculty", label: "Багш", icon: Users },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Logo height={36} />
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const active = pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted cursor-pointer"
        >
          <LogOut className="h-4 w-4" /> Гарах
        </button>
      </div>
    </header>
  );
}

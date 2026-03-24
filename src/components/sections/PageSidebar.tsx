"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

interface PageSidebarProps {
  sections: Section[];
  onThisPageLabel: string;
}

function getInitialSection(sections: Section[]) {
  if (typeof window !== "undefined" && window.location.hash) {
    const hash = window.location.hash.slice(1);
    if (sections.some((s) => s.id === hash)) return hash;
  }
  return sections[0]?.id || "";
}

export default function PageSidebar({
  sections,
  onThisPageLabel,
}: PageSidebarProps) {
  const [activeSection, setActiveSection] = useState(() =>
    getInitialSection(sections),
  );

  useEffect(() => {
    // Scroll to hash on mount
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = useCallback((id: string, isFirst: boolean) => {
    if (isFirst) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveSection(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <p className="text-sm font-semibold text-foreground mb-4">
          {onThisPageLabel}
        </p>
        <nav className="space-y-1">
          {sections.map(({ id, label }, index) => (
            <button
              key={id}
              onClick={() => scrollToSection(id, index === 0)}
              className={cn(
                "block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer",
                activeSection === id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted/60",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

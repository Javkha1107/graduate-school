"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  height?: number;
  className?: string;
  variant?: "default" | "white";
}

export default function Logo({
  height = 48,
  className = "",
  variant = "default",
}: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center gap-2 shrink-0 ${className}`}
        style={{ height }}
      >
        <div
          className="flex items-center justify-center rounded-lg bg-primary text-white font-bold"
          style={{ width: height, height, fontSize: height * 0.32 }}
        >
          ЭС
        </div>
        <div className="leading-tight">
          <p
            className={`text-sm font-bold ${variant === "white" ? "text-white" : "text-primary"}`}
          >
            Эрдмийн Сургууль
          </p>
          <p
            className={`text-[10px] uppercase tracking-wide ${variant === "white" ? "text-white/60" : "text-muted-foreground"}`}
          >
            АШҮҮИС
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ height, width: height * 4.5 }}
    >
      <Image
        src="/logo.png"
        alt="MNUMS Graduate School"
        fill
        className={`object-contain object-left transition-all duration-300 ${variant === "white" ? "brightness-0 invert" : ""}`}
        sizes={`${Math.round(height * 4.5)}px`}
        onError={() => setError(true)}
      />
    </div>
  );
}

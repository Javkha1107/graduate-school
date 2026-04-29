"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin progress bar at the top of the viewport, shown during page navigations.
 *
 * Works by intercepting <a> clicks that target internal routes.  When a click
 * is detected the bar starts animating; when the pathname changes (navigation
 * complete) the bar fills to 100 % and fades out.
 *
 * Inspired by YouTube / GitHub progress indicators.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  /* ── helpers ── */
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    cleanup();
    setProgress(0);
    setVisible(true);

    // Quickly ramp to ~30 %, then slow-crawl toward 90 %
    let p = 0;
    timerRef.current = setInterval(() => {
      p += p < 30 ? 8 : p < 70 ? 2 : 0.5;
      if (p > 90) p = 90;
      setProgress(p);
    }, 100);
  }, [cleanup]);

  const finish = useCallback(() => {
    cleanup();
    startedRef.current = false;
    setProgress(100);
    // Let the bar sit at 100 % briefly, then hide
    setTimeout(() => {
      setVisible(false);
      // Reset after fade-out transition
      setTimeout(() => setProgress(0), 300);
    }, 200);
  }, [cleanup]);

  /* ── detect navigation start via click delegation ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Walk up from target to find an <a>
      let el = e.target as HTMLElement | null;
      while (el && el.tagName !== "A") el = el.parentElement;
      if (!el) return;

      const anchor = el as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external, hash-only, new-tab, download links
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href === "#" ||
        (href.startsWith("#") && !href.startsWith("/"))
      ) {
        return;
      }

      // Skip if modifier keys held (user wants new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // It's an internal navigation — start the bar
      // Only if navigating to a different path
      if (href !== pathname && !href.startsWith("#")) {
        start();
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, start]);

  /* ── detect navigation end via pathname change ── */
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (startedRef.current) {
        // Use microtask to avoid synchronous setState in effect body
        queueMicrotask(finish);
      }
    }
  }, [pathname, finish]);

  /* ── cleanup on unmount ── */
  useEffect(() => cleanup, [cleanup]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-9999 h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-linear-to-r from-primary via-primary-light to-primary rounded-r-full transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "200ms" : "400ms",
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Glow effect at the leading edge */}
      {visible && progress < 100 && (
        <div
          className="absolute top-0 h-full w-24 rounded-r-full opacity-60"
          style={{
            right: `${100 - progress}%`,
            background:
              "linear-gradient(to right, transparent, var(--primary-light))",
            filter: "blur(3px)",
          }}
        />
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Globe } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import { navigation, headerActions, type NavItem } from "@/lib/navigation";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import ContactDialog from "@/components/ui/ContactDialog";

interface HeaderProps {
  locale: Locale;
  dict: Record<string, unknown>;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();
  const switchLocale = locale === "mn" ? "en" : "mn";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [scrollPastHero, setScrollPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prevY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y <= 80) {
          setHidden(false);
        } else if (y > prevY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        prevY.current = y;
        ticking = false;

        if (isHome) {
          setScrollPastHero(y > window.innerHeight - 80);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const scrolled = !isHome || scrollPastHero;
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        hidden ? "-translate-y-full" : "translate-y-0",
        isTransparent
          ? "bg-linear-to-b from-black/40 via-black/20 to-transparent backdrop-blur-[2px] border-b border-white/6"
          : "bg-white/95 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)]",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="shrink-0 group">
          <Logo
            height={48}
            locale={locale}
            variant={isTransparent ? "white" : "default"}
            className="transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0">
          {navigation.map((item) => (
            <DesktopNavItem
              key={item.labelKey}
              item={item}
              locale={locale}
              dict={dict}
              isTransparent={isTransparent}
            />
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {headerActions.map((action) =>
            action.labelKey === "menu.contact" ? (
              <button
                key={action.labelKey}
                onClick={() => setContactOpen(true)}
                className={cn(
                  "hidden lg:inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
                    : "bg-primary text-white hover:bg-primary-dark shadow-sm",
                )}
              >
                {t(dict, action.labelKey)}
              </button>
            ) : (
              <Link
                key={action.labelKey}
                href={
                  action.external
                    ? action.href || "#"
                    : `/${locale}${action.href || ""}`
                }
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "hidden lg:inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-300",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
                    : action.external
                      ? "bg-primary/5 text-primary hover:bg-primary/10"
                      : "bg-primary text-white hover:bg-primary-dark shadow-sm",
                )}
              >
                {t(dict, action.labelKey)}
              </Link>
            ),
          )}

          <Link
            href={switchPath}
            className={cn(
              "inline-flex items-center rounded-lg border px-2.5 py-2 text-xs font-bold tracking-wider transition-all duration-300 uppercase",
              isTransparent
                ? "border-white/20 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/30"
                : "border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {switchLocale.toUpperCase()}
          </Link>

          {/* Mobile menu */}
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                className={cn(
                  "lg:hidden rounded-xl p-2.5 transition-colors cursor-pointer",
                  isTransparent
                    ? "text-white hover:bg-white/15"
                    : "hover:bg-muted",
                )}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-in fade-in-0 duration-300" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-[340px] bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-5 border-b border-border/60">
                  <Link
                    href={`/${locale}`}
                    className="flex items-center gap-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Logo height={32} locale={locale} />
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      className="rounded-xl p-2 hover:bg-muted cursor-pointer transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="p-4 space-y-0.5">
                  {navigation.map((item) => (
                    <MobileNavItem
                      key={item.labelKey}
                      item={item}
                      locale={locale}
                      dict={dict}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                  <div className="pt-3 mt-3 border-t border-border/40 space-y-0.5">
                    {headerActions.map((action) =>
                      action.labelKey === "menu.contact" ? (
                        <button
                          key={action.labelKey}
                          onClick={() => {
                            setMobileOpen(false);
                            setContactOpen(true);
                          }}
                          className="block w-full text-left rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted/60 transition-colors cursor-pointer"
                        >
                          {t(dict, action.labelKey)}
                        </button>
                      ) : (
                        <Link
                          key={action.labelKey}
                          href={
                            action.external
                              ? action.href || "#"
                              : `/${locale}${action.href || ""}`
                          }
                          target={action.external ? "_blank" : undefined}
                          className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted/60 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(dict, action.labelKey)}
                        </Link>
                      ),
                    )}
                  </div>
                </nav>
                <div className="p-4 border-t border-border/60">
                  <Link
                    href={switchPath}
                    className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {switchLocale === "mn" ? "Монгол хэл" : "English"}
                  </Link>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <ContactDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        locale={locale}
        dict={dict}
      />
    </header>
  );
}

/* ─── Desktop nav item with hover dropdown ─── */
function DesktopNavItem({
  item,
  locale,
  dict,
  isTransparent,
}: {
  item: NavItem;
  locale: Locale;
  dict: Record<string, unknown>;
  isTransparent: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const label = t(dict, item.labelKey);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 0);
  };

  // Simple link (no children)
  if (!item.children) {
    return (
      <Link
        href={item.external ? item.href || "#" : `/${locale}${item.href || ""}`}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className={cn(
          "rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-300",
          isTransparent
            ? "text-white/85 hover:text-white hover:bg-white/8"
            : "text-foreground/70 hover:text-foreground hover:bg-muted/60",
        )}
      >
        {label}
      </Link>
    );
  }

  // Has children — dropdown
  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={cn(
          "flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-300 cursor-pointer outline-none",
          isTransparent
            ? "text-white/85 hover:text-white hover:bg-white/8"
            : "text-foreground/70 hover:text-foreground hover:bg-muted/60",
          open && !isTransparent && "bg-muted/60 text-foreground",
          open && isTransparent && "bg-white/8 text-white",
        )}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180",
            isTransparent ? "text-white/50" : "text-muted-foreground",
          )}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 top-full z-50">
          <div className="min-w-[240px] rounded-xl border border-border/60 bg-white py-2 shadow-xl shadow-black/8 animate-in fade-in-0 slide-in-from-top-1 duration-200">
            {item.children.map((child) => (
              <DropdownItem
                key={child.labelKey}
                item={child}
                locale={locale}
                dict={dict}
                onClose={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Dropdown item (supports nested sub-menu) ─── */
function DropdownItem({
  item,
  locale,
  dict,
  onClose,
}: {
  item: NavItem;
  locale: Locale;
  dict: Record<string, unknown>;
  onClose: () => void;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const label = t(dict, item.labelKey);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSubOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setSubOpen(false), 0);
  };

  // Has nested children — show sub-menu on hover
  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <button
          className={cn(
            "flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors cursor-pointer",
            subOpen
              ? "bg-primary/5 text-primary"
              : "text-foreground/70 hover:bg-muted/60 hover:text-foreground",
          )}
          onClick={() => setSubOpen((v) => !v)}
        >
          <span className="text-left leading-snug">{label}</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>

        {/* Sub-menu */}
        {subOpen && (
          <div className="absolute left-full top-0 z-50">
            <div className="min-w-[240px] rounded-xl border border-border/60 bg-white py-2 shadow-xl shadow-black/8 animate-in fade-in-0 slide-in-from-left-1 duration-200">
              {item.children.map((sub) => (
                <Link
                  key={sub.labelKey}
                  href={
                    sub.external
                      ? sub.href || "#"
                      : `/${locale}${sub.href || ""}`
                  }
                  target={sub.external ? "_blank" : undefined}
                  rel={sub.external ? "noopener noreferrer" : undefined}
                  className="block px-4 py-2.5 text-sm text-foreground/70 hover:bg-muted/60 hover:text-foreground transition-colors leading-snug"
                  onClick={onClose}
                >
                  {t(dict, sub.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Simple link
  return (
    <Link
      href={item.external ? item.href || "#" : `/${locale}${item.href || ""}`}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="block px-4 py-2.5 text-sm text-foreground/70 hover:bg-muted/60 hover:text-foreground transition-colors leading-snug"
      onClick={onClose}
    >
      {label}
    </Link>
  );
}

/* ─── Mobile nav item (collapsible, supports 2 levels) ─── */
function MobileNavItem({
  item,
  locale,
  dict,
  onClose,
}: {
  item: NavItem;
  locale: Locale;
  dict: Record<string, unknown>;
  onClose: () => void;
}) {
  const label = t(dict, item.labelKey);

  if (item.children) {
    return (
      <Collapsible.Root>
        <Collapsible.Trigger className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted/60 transition-colors cursor-pointer group">
          {label}
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Collapsible.Trigger>
        <Collapsible.Content className="pl-3 overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
          {item.children.map((child) =>
            child.children ? (
              <MobileNavItem
                key={child.labelKey}
                item={child}
                locale={locale}
                dict={dict}
                onClose={onClose}
              />
            ) : (
              <Link
                key={child.labelKey}
                href={
                  child.external
                    ? child.href || "#"
                    : `/${locale}${child.href || ""}`
                }
                target={child.external ? "_blank" : undefined}
                className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
                onClick={onClose}
              >
                {t(dict, child.labelKey)}
              </Link>
            ),
          )}
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <Link
      href={item.external ? item.href || "#" : `/${locale}${item.href || ""}`}
      target={item.external ? "_blank" : undefined}
      className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted/60 transition-colors"
      onClick={onClose}
    >
      {label}
    </Link>
  );
}

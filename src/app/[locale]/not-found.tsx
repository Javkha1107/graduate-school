import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/50 mb-4">
        Page not found
      </p>
      <h1 className="text-7xl sm:text-8xl font-bold text-primary/10 mb-2">
        404
      </h1>
      <p className="text-base text-muted-foreground mb-8 max-w-sm">
        Хуудас олдсонгүй / The page you are looking for does not exist.
      </p>
      <div className="flex gap-3">
        <Link
          href="/mn"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-all duration-300"
        >
          Нүүр хуудас
        </Link>
        <Link
          href="/en"
          className="rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-all duration-300"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}

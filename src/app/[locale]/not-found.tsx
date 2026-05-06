import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-20 pb-16">
      <div className="text-center max-w-lg mx-auto">
        {/* Large 404 heading */}
        <h1 className="text-[120px] sm:text-[160px] font-bold leading-none tracking-tight text-primary/10 select-none">
          404
        </h1>

        {/* Decorative divider */}
        <div className="mx-auto mb-6 w-12 h-[3px] rounded-full bg-linear-to-r from-primary to-accent" />

        {/* Description */}
        <p className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          Хуудас олдсонгүй
        </p>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
          Таны хайсан хуудас олдсонгүй. Хуудасны хаяг буруу байж болзошгүй эсвэл
          хуудас устгагдсан байна.
          <br />
          <span className="text-muted-foreground/80">
            The page you are looking for could not be found.
          </span>
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/mn"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-all duration-300"
          >
            Нүүр хуудас
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-all duration-300"
          >
            Home Page (EN)
          </Link>
        </div>
      </div>
    </div>
  );
}

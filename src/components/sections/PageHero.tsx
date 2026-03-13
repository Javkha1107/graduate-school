interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-linear-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-12 lg:px-8 lg:pt-30 lg:pb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-5 h-[3px] w-14 rounded-full bg-linear-to-r from-accent to-accent/30" />
      </div>
    </section>
  );
}

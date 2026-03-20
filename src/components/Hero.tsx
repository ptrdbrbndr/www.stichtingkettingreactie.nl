import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function Hero({
  title,
  subtitle,
  showCta = false,
  ctaText = "Meer weten",
  ctaHref = "/over-ons",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-accent-700">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[160px] max-w-7xl items-center justify-center px-4 py-10 sm:min-h-[200px] sm:px-6 sm:py-14 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85 sm:text-xl">
              {subtitle}
            </p>
          )}

          {showCta && ctaHref && (
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

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
  if (showCta) {
    // Homepage hero — groot en impactvol
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-700">
        {/* Patroon overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* Decoratieve cirkels */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white opacity-5" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent-400 opacity-10" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          {/* ANBI badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
            ANBI-erkende stichting
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {subtitle}
            </p>
          )}

          {ctaHref && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-50 hover:shadow-xl"
              >
                <Heart className="h-4 w-4" />
                {ctaText}
              </Link>
              <Link
                href="/projecten"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/70 hover:bg-white/10"
              >
                Onze projecten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Subpagina hero — compact
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 to-accent-700">
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
        </div>
      </div>
    </section>
  );
}

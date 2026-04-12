import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Radio } from "lucide-react";

interface FeatureArticle {
  title: string;
  excerpt?: string | null;
  slug: string;
  category?: string | null;
  date: string;
  image?: string | null;
}

interface HeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: { label: string; href: string }[];
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  featureArticle?: FeatureArticle | null;
}

function formatDutchDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

export default function Hero({
  title,
  subtitle,
  eyebrow,
  breadcrumb,
  showCta = false,
  ctaText = "Meer weten",
  ctaHref = "/over-ons",
  featureArticle,
}: HeroProps) {
  // Compact subpagina hero
  if (!showCta) {
    return (
      <section
        data-testid="page-hero"
        className="relative overflow-hidden border-b border-line bg-cream"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] text-primary-600"
        >
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-xs font-semibold text-ink-soft"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                {breadcrumb.map((item, idx) => (
                  <li key={item.href} className="flex items-center gap-1.5">
                    {idx > 0 && (
                      <span aria-hidden="true" className="text-ink-soft/50">
                        ›
                      </span>
                    )}
                    {idx === breadcrumb.length - 1 ? (
                      <span className="text-primary-600">{item.label}</span>
                    ) : (
                      <a
                        href={item.href}
                        className="hover:text-accent-600"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.05] text-primary-600 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Homepage hero — asymmetric editorial split
  return (
    <section
      data-testid="home-hero"
      className="relative overflow-hidden bg-cream"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column — text */}
          <div className="space-y-7 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-600 backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-green-500"
              />
              ANBI-erkende stichting sinds 2007
            </div>

            <h1 className="font-serif text-5xl font-bold leading-[1.05] text-primary-600 sm:text-6xl lg:text-[4.5rem]">
              {title}
            </h1>

            {subtitle && (
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={ctaHref}
                data-testid="hero-primary-cta"
                className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl active:scale-95"
              >
                <Heart className="h-4 w-4" />
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/projecten"
                data-testid="hero-secondary-cta"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-7 py-3.5 text-sm font-bold text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
              >
                Onze projecten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right column — tilted feature news card */}
          {featureArticle && (
            <div className="relative lg:col-span-5">
              {/* Azure offset block */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-0 translate-y-6 translate-x-6 rounded-3xl bg-azure-500"
              />
              {/* Card */}
              <Link
                href={`/nieuws/${featureArticle.slug}`}
                data-testid="hero-feature-article"
                className="relative block overflow-hidden rounded-3xl border border-line bg-white shadow-xl transition-transform duration-500 hover:rotate-0 motion-safe:rotate-[2deg]"
              >
                {featureArticle.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-dark">
                    <Image
                      src={featureArticle.image}
                      alt={featureArticle.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
                  </div>
                )}
                <div className="space-y-3 p-7">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-600 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-600" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                      Laatste nieuwsbericht
                    </span>
                  </div>
                  {featureArticle.category && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-semibold text-primary-700">
                      <Radio className="h-3 w-3" />
                      {featureArticle.category} · {formatDutchDate(featureArticle.date)}
                    </div>
                  )}
                  <h2 className="font-serif text-2xl font-bold leading-snug text-primary-600">
                    {featureArticle.title}
                  </h2>
                  {featureArticle.excerpt && (
                    <p className="line-clamp-2 text-sm text-ink-soft">
                      {featureArticle.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 pt-1 text-sm font-bold text-accent-600">
                    Lees het bericht
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

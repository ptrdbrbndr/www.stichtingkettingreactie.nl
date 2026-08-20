import Link from "next/link";
import Schakel from "@/components/Schakel";

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
  ctaText = "Doneer",
  ctaHref = "/steun-ons",
  featureArticle,
}: HeroProps) {
  // Donkere paginakop voor subpagina's
  if (!showCta) {
    return (
      <section
        data-testid="page-hero"
        className="relative overflow-hidden bg-ink text-paper"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-24 text-paper opacity-[0.06]"
        >
          <Schakel className="h-[420px] w-auto -rotate-45" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
          {breadcrumb && breadcrumb.length > 1 && (
            <nav aria-label="Kruimelpad" className="mb-4">
              <ol className="flex flex-wrap items-baseline justify-center gap-1.5">
                {breadcrumb.map((item, idx) => (
                  <li
                    key={item.href}
                    className="kicker flex items-baseline gap-1.5 text-paper/50"
                  >
                    {idx > 0 && <span aria-hidden="true">/</span>}
                    {idx === breadcrumb.length - 1 ? (
                      <span className="text-paper/80" aria-current="page">
                        {item.label}
                      </span>
                    ) : (
                      <Link href={item.href} className="hover:text-paper">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="kicker text-magenta-bright">{eyebrow}</p>}
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-paper/75 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Voorpagina: donker heroblok, gecentreerd
  return (
    <section
      data-testid="home-hero"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-16 text-paper opacity-[0.06]"
      >
        <Schakel className="h-[560px] w-auto -rotate-45" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-44 text-magenta-bright opacity-[0.08]"
      >
        <Schakel className="h-[440px] w-auto -rotate-45" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <p className="reveal reveal-1 kicker text-magenta-bright">
          Opvang · huisvesting · HIV-zorg
        </p>
        <h1 className="reveal reveal-2 mx-auto mt-5 max-w-3xl font-display text-[clamp(2.75rem,6.5vw,4.75rem)] font-semibold leading-[1.02] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="reveal reveal-3 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/75 sm:text-xl">
            {subtitle}
          </p>
        )}
        <div className="reveal reveal-4 mt-9 flex flex-wrap items-center justify-center gap-6">
          <Link
            href={ctaHref}
            data-testid="hero-primary-cta"
            className="pil bg-magenta px-8 py-4 text-paper hover:bg-magenta-deep"
          >
            {ctaText}
          </Link>
          <Link
            href="/projecten"
            data-testid="hero-secondary-cta"
            className="pil border border-paper/40 px-8 py-4 text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            De drie projecten
          </Link>
        </div>

        {featureArticle && (
          <Link
            href={`/nieuws/${featureArticle.slug}`}
            data-testid="hero-feature-article"
            className="reveal reveal-5 group mx-auto mt-12 flex max-w-2xl flex-wrap items-baseline justify-center gap-x-3 gap-y-1 border-t border-paper/20 pt-6"
          >
            <span className="kicker text-paper/50">
              Laatste verslag · {formatDutchDate(featureArticle.date)}
            </span>
            <span className="text-[1.0625rem] font-medium text-paper underline decoration-paper/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-paper">
              {featureArticle.title}
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";

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
  // Katern-opening voor subpagina's
  if (!showCta) {
    return (
      <section data-testid="page-hero" className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 lg:px-8">
          <div className="folio">
            <p className="kicker text-magenta">{eyebrow ?? "Stichting Kettingreactie"}</p>
            {breadcrumb && breadcrumb.length > 1 && (
              <nav aria-label="Kruimelpad" className="hidden sm:block">
                <ol className="flex flex-wrap items-baseline gap-1.5">
                  {breadcrumb.map((item, idx) => (
                    <li
                      key={item.href}
                      className="kicker flex items-baseline gap-1.5 text-ink-2"
                    >
                      {idx > 0 && <span aria-hidden="true">/</span>}
                      {idx === breadcrumb.length - 1 ? (
                        <span className="text-ink" aria-current="page">
                          {item.label}
                        </span>
                      ) : (
                        <Link href={item.href} className="hover:text-magenta">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
          <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.04] tracking-tight text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-ink-2 sm:text-[1.375rem] sm:leading-normal">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Voorpagina-opening — de enige geregisseerde animatie van de site
  return (
    <section data-testid="home-hero" className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="folio reveal reveal-1">
              <p className="kicker text-magenta">Voorpagina</p>
              <p className="kicker hidden text-ink-2 sm:block">
                Drie projecten in Bangalore
              </p>
            </div>
            <h1 className="reveal reveal-2 mt-8 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-tight text-ink">
              {title}
            </h1>
            {subtitle && (
              <p className="reveal reveal-3 mt-8 max-w-2xl font-serif text-xl leading-relaxed text-ink-2 sm:text-[1.4375rem] sm:leading-normal">
                {subtitle}
              </p>
            )}
            <div className="reveal reveal-4 mt-10 flex flex-wrap items-center gap-7">
              <Link
                href={ctaHref}
                data-testid="hero-primary-cta"
                className="kicker bg-magenta px-7 py-4 text-paper transition-colors hover:bg-magenta-deep"
              >
                {ctaText}
              </Link>
              <Link
                href="/projecten"
                data-testid="hero-secondary-cta"
                className="font-serif text-lg text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-magenta"
              >
                De drie projecten
              </Link>
            </div>
          </div>

          {/* Laatste verslag — als krantenkolom, geen kaart */}
          {featureArticle && (
            <div className="reveal reveal-5 lg:col-span-4 lg:border-l lg:border-rule-soft lg:pl-10">
              <div className="folio lg:border-t-0 lg:pt-0">
                <p className="kicker text-ink-2">Laatste verslag</p>
              </div>
              <Link
                href={`/nieuws/${featureArticle.slug}`}
                data-testid="hero-feature-article"
                className="group mt-5 block"
              >
                <p className="kicker text-magenta">
                  {featureArticle.category ?? "Nieuws"} ·{" "}
                  {formatDutchDate(featureArticle.date)}
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink">
                  {featureArticle.title}
                </h2>
                {featureArticle.excerpt && (
                  <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-2">
                    {featureArticle.excerpt}
                  </p>
                )}
                <p className="link-editorial mt-4 font-serif text-[1.0625rem]">
                  Lees het verslag
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

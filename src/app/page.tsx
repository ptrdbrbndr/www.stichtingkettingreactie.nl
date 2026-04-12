import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Calendar, Quote } from "lucide-react";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getHomepageConfig, getArticles } from "@ptrdbrbndr/cms";

export const metadata: Metadata = {
  title: "Stichting Kettingreactie - Samen voor kansarme vrouwen in India",
  description:
    "Stichting Kettingreactie zet zich in voor het verbeteren van de positie van kansarme vrouwen in India door lokale initiatieven te ondersteunen.",
};

function formatDutchDate(value: string | null | undefined) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function HomePage() {
  const supabase = await createClient();

  const [config, { articles: latestNews }] = await Promise.all([
    getHomepageConfig(supabase),
    getArticles(supabase, {
      status: "published",
      orderBy: "published_at",
      orderDirection: "desc",
      limit: 6,
    }),
  ]);

  const heroTitle =
    config?.hero_title ?? "Samen voor kansarme vrouwen in India";
  const heroSubtitle =
    config?.hero_subtitle ??
    "Stichting Kettingreactie ondersteunt lokale initiatieven die het leven van kansarme vrouwen in India verbeteren. Samen maken wij het verschil.";
  const heroCta = config?.hero_cta_text ?? "Steun ons";
  const heroCtaHref = config?.hero_cta_href ?? "/steun-ons";

  const missionTitle =
    config?.mission_title ??
    "Het verbeteren van de positie van kansarme vrouwen in India";
  const missionText =
    config?.mission_text ??
    "Stichting Kettingreactie zet zich sinds 2007 in voor het verbeteren van de positie van kansarme vrouwen in India. Wij doen dit door lokale initiatieven in en rondom Bangalore te ondersteunen met fondsenwerving in Nederland. Elke gedoneerde euro gaat volledig naar de projecten.";

  const projectsTitle =
    config?.projects_title ?? "Drie initiatieven die we steunen";
  const projectsSubtitle =
    config?.projects_subtitle ??
    "Wij ondersteunen drie lokale projecten in en rondom Bangalore, India.";

  const newsTitle = config?.news_title ?? "Verslagen uit het veld";
  const donateTitle = config?.donate_title ?? "Word onderdeel van de kettingreactie";
  const donateText =
    config?.donate_text ??
    "Elke donatie maakt het verschil. 100% van uw gift gaat direct naar de projecten in Bangalore.";
  const donateIban = config?.donate_iban ?? "NL87 INGB 0005313860";
  const donateIbanName =
    config?.donate_iban_name ?? "Stichting Kettingreactie Amsterdam";

  const [featuredArticle, ...restArticles] = latestNews;
  const newsFeatured = restArticles[0] ?? featuredArticle;
  const newsList = restArticles.slice(1, 5);

  const jaarAnbi = new Date().getFullYear() - 2007;

  const heroFeature = featuredArticle
    ? {
        title: featuredArticle.title,
        excerpt: featuredArticle.excerpt,
        slug: featuredArticle.slug,
        category: featuredArticle.category?.name ?? "Nieuwsbericht",
        date: featuredArticle.published_at ?? featuredArticle.created_at,
        image: featuredArticle.featured_image,
      }
    : null;

  const projecten = [
    {
      number: "01",
      title: "Abayashram",
      subtitle: "Vision India",
      description:
        "Een opvanghuis voor geestelijk zieke vrouwen nabij Bangalore. Hier krijgen zij medische en psychologische hulp en een veilig onderkomen.",
      href: "/projecten/abayashram",
      image: "/images/projecten/abayashram/vrouwen-abayashram.jpg",
    },
    {
      number: "02",
      title: "UWA Hostel",
      subtitle: "Working Women's Hostel",
      description:
        "Huisvesting voor jonge werkende vrouwen uit landelijke gebieden die naar Bangalore komen om te werken. Een veilige plek om te wonen.",
      href: "/projecten/uwa-hostel",
      image: "/images/projecten/uwa-hostel/hostel-collage.jpg",
    },
    {
      number: "03",
      title: "ASHA Foundation",
      subtitle: "HIV-positieve vrouwen",
      description:
        "Medicatie en zorg voor HIV-positieve vrouwen en een programma om moeder-kind-overdracht van het virus te voorkomen.",
      href: "/projecten/asha-foundation",
      image: "/images/projecten/asha-foundation/dr-glory.jpg",
    },
  ];

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        showCta
        ctaText={heroCta}
        ctaHref={heroCtaHref}
        featureArticle={heroFeature}
      />

      {/* IMPACT STRIP */}
      <section
        data-testid="impact-strip"
        className="border-y border-line bg-cream-dark/60 py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div className="flex items-center justify-center gap-6 md:justify-start">
              <span className="font-serif text-6xl font-bold text-primary-600 sm:text-7xl">
                3
              </span>
              <span className="hidden h-12 w-px bg-primary-600/20 md:block" />
              <p className="text-sm font-semibold uppercase leading-tight tracking-wider text-primary-600">
                Projecten
                <br />
                in India
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 md:justify-start">
              <span className="font-serif text-6xl font-bold text-primary-600 sm:text-7xl">
                100%
              </span>
              <span className="hidden h-12 w-px bg-primary-600/20 md:block" />
              <p className="text-sm font-semibold uppercase leading-tight tracking-wider text-primary-600">
                Naar de
                <br />
                projecten
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 md:justify-start">
              <span className="font-serif text-6xl font-bold text-primary-600 sm:text-7xl">
                {jaarAnbi}
              </span>
              <span className="hidden h-12 w-px bg-primary-600/20 md:block" />
              <p className="text-sm font-semibold uppercase leading-tight tracking-wider text-primary-600">
                Jaar ANBI
                <br />
                erkend
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSIE */}
      <section data-testid="missie-section" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="order-2 space-y-6 lg:order-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Onze missie
              </span>
              <h2 className="font-serif text-4xl font-bold leading-tight text-primary-600 sm:text-5xl">
                {missionTitle}
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft">
                {missionText}
              </p>
              <Link
                href="/over-ons"
                data-testid="missie-link"
                className="inline-flex items-center gap-2 text-base font-bold text-accent-600 hover:underline"
              >
                Meer over ons verhaal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/projecten/abayashram/vrouwen-abayashram.jpg"
                  alt="Vrouwen bij Abayashram, Bangalore"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-6 max-w-sm rounded-2xl border-l-8 border-accent-600 bg-white p-8 shadow-2xl sm:-left-12">
                <Quote
                  className="mb-3 h-6 w-6 text-accent-600"
                  aria-hidden="true"
                />
                <p className="font-serif text-lg italic leading-relaxed text-primary-600">
                  &ldquo;Eén opgeleide vrouw kan de toekomst van een heel dorp
                  veranderen. Dat is de kracht van de ketting.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTEN */}
      <section
        data-testid="projecten-section"
        className="bg-cream-dark/50 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              Onze projecten
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-primary-600 sm:text-5xl">
              {projectsTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">
              {projectsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projecten.map((project) => (
              <Link
                key={project.number}
                href={project.href}
                data-testid={`project-card-${project.number}`}
                className="group relative block overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[460px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    width={600}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent" />
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-6 font-serif text-7xl font-bold leading-none text-accent-600/40 select-none"
                  >
                    {project.number}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 space-y-3 p-7">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-azure-300">
                      {project.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/80">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1 pt-1 text-sm font-bold text-accent-400 transition-transform group-hover:translate-x-1">
                      Meer
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/projecten"
              data-testid="projecten-all-link"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-8 py-3.5 text-sm font-bold text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
            >
              Bekijk alle projecten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NIEUWS GRID */}
      <section data-testid="nieuws-section" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              Nieuws &amp; updates
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-primary-600 sm:text-5xl">
              {newsTitle}
            </h2>
          </div>

          {latestNews.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-10 text-center">
              <p className="text-ink-soft">
                Binnenkort verschijnen hier onze nieuwsberichten.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              {/* Featured article */}
              <div className="space-y-5 lg:col-span-7">
                {newsFeatured?.featured_image && (
                  <Link
                    href={`/nieuws/${newsFeatured.slug}`}
                    className="block overflow-hidden rounded-3xl shadow-lg"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={newsFeatured.featured_image}
                        alt={newsFeatured.title}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Link>
                )}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-ink-soft">
                    <Calendar className="h-4 w-4 text-accent-600" />
                    {formatDutchDate(
                      newsFeatured?.published_at ?? newsFeatured?.created_at,
                    )}
                    {newsFeatured?.category?.name && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-primary-600">
                          {newsFeatured.category.name}
                        </span>
                      </>
                    )}
                  </div>
                  <Link href={`/nieuws/${newsFeatured?.slug ?? ""}`}>
                    <h3 className="font-serif text-3xl font-bold leading-tight text-primary-600 transition-colors hover:text-accent-600 sm:text-4xl">
                      {newsFeatured?.title}
                    </h3>
                  </Link>
                  {newsFeatured?.excerpt && (
                    <p className="text-lg leading-relaxed text-ink-soft">
                      {newsFeatured.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/nieuws/${newsFeatured?.slug ?? ""}`}
                    data-testid="nieuws-featured-link"
                    className="inline-block border-b-2 border-primary-600 pb-0.5 font-bold text-primary-600 hover:border-accent-600 hover:text-accent-600"
                  >
                    Lees het volledige verslag
                  </Link>
                </div>
              </div>

              {/* Article list */}
              <div className="lg:col-span-5">
                <ul className="divide-y divide-line">
                  {newsList.map((article) => (
                    <li key={article.id} className="py-6 first:pt-0 last:pb-0">
                      <Link
                        href={`/nieuws/${article.slug}`}
                        className="group block"
                      >
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-600">
                          {article.category?.name ?? "Update"}
                        </span>
                        <h4 className="font-serif text-xl font-semibold leading-snug text-primary-600 transition-colors group-hover:text-accent-600">
                          {article.title}
                        </h4>
                        {article.excerpt && (
                          <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                            {article.excerpt}
                          </p>
                        )}
                        <span className="mt-2 block text-xs text-ink-soft/80">
                          {formatDutchDate(
                            article.published_at ?? article.created_at,
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/nieuws"
                    data-testid="nieuws-all-link"
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent-600 hover:underline"
                  >
                    Alle nieuwsberichten
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* QUOTE BAND */}
      <section
        data-testid="quote-band"
        className="relative overflow-hidden bg-cream-dark/50 py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 text-primary-600 opacity-[0.04]"
        >
          <svg width="520" height="520" viewBox="0 0 100 100">
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Quote
            className="mx-auto mb-8 h-12 w-12 text-accent-600/30"
            aria-hidden="true"
          />
          <blockquote className="font-serif text-3xl font-medium leading-relaxed text-primary-600 sm:text-4xl">
            &ldquo;Onze stichting is meer dan een goed doel — het is een belofte
            aan de volgende generatie vrouwen in India dat zij er niet alleen
            voor staan.&rdquo;
          </blockquote>
          <div className="mt-12 not-italic">
            <p className="font-serif text-xl font-bold text-primary-600">
              Wim Hanket
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Voorzitter Stichting Kettingreactie
            </p>
          </div>
        </div>
      </section>

      {/* DONATIE CTA */}
      <section data-testid="donatie-cta" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-primary-600 p-10 shadow-2xl sm:p-16">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-accent-600/30 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-azure-500/30 blur-[100px]"
          />
          <div className="relative space-y-10 text-center">
            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              {donateTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-primary-100">
              {donateText}
            </p>
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <div className="min-w-[300px] rounded-2xl border border-white/20 bg-white/10 p-6 text-left backdrop-blur-xl">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  Rekeningnummer (IBAN)
                </p>
                <p className="font-mono text-xl font-semibold tracking-wider text-white">
                  {donateIban}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  T.n.v.
                </p>
                <p className="text-sm font-medium text-white">
                  {donateIbanName}
                </p>
              </div>
              <div className="flex w-full max-w-xs flex-col items-stretch gap-3">
                <Link
                  href="/steun-ons"
                  data-testid="donatie-cta-button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-xl active:scale-95"
                >
                  <Heart className="h-5 w-5" />
                  Doneer nu
                </Link>
                <Link
                  href="/belastingaftrek-schenkingen"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition-all hover:border-white/80 hover:bg-white/10"
                >
                  Belastingaftrek
                </Link>
              </div>
            </div>
            <p className="text-xs italic text-white/60">
              Donaties worden verwerkt conform onze{" "}
              <Link
                href="/privacyverklaring"
                className="underline hover:text-white"
              >
                privacyverklaring
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

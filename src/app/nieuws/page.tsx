import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getArticles } from "@ptrdbrbndr/cms";
import { decodeEntities } from "@/lib/text";

export const metadata: Metadata = {
  title: "Nieuws & verhalen",
  description:
    "Lees het laatste nieuws en de verhalen van Stichting Kettingreactie over onze projecten en activiteiten in Bangalore.",
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

export default async function NieuwsPage() {
  const supabase = await createClient();
  const { articles } = await getArticles(supabase, {
    status: "published",
    orderBy: "published_at",
    orderDirection: "desc",
    limit: 30,
  });

  const [featured, ...rest] = articles;
  const secondary = rest.slice(0, 2);
  const tertiary = rest.slice(2);

  return (
    <>
      <Hero
        eyebrow="Actueel"
        title="Nieuws & verhalen"
        subtitle="Berichten, updates en verhalen uit onze projecten in en rondom Bangalore."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Nieuws", href: "/nieuws" },
        ]}
      />

      {articles.length === 0 ? (
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-line bg-white p-12 shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                <Newspaper className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary-600">
                Nog geen nieuwsberichten
              </h2>
              <p className="mt-3 text-ink-soft">
                Binnenkort verschijnen hier onze nieuwsberichten.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured band */}
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Link
                href={`/nieuws/${featured.slug}`}
                className="group grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
              >
                <div className="lg:col-span-7">
                  {featured.featured_image ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl">
                      <Image
                        src={featured.featured_image}
                        alt={decodeEntities(featured.title)}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] rounded-3xl bg-gradient-to-br from-primary-600 via-accent-600 to-azure-500" />
                  )}
                </div>
                <div className="space-y-5 lg:col-span-5">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                    Uitgelicht ·{" "}
                    {decodeEntities(featured.category?.name) ?? "Nieuwsbericht"}
                  </span>
                  <h2 className="font-serif text-3xl font-bold leading-tight text-primary-600 transition-colors group-hover:text-accent-600 sm:text-4xl lg:text-5xl">
                    {decodeEntities(featured.title)}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-lg leading-relaxed text-ink-soft">
                      {decodeEntities(featured.excerpt)}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-ink-soft">
                    <Calendar className="h-4 w-4 text-accent-600" />
                    {formatDutchDate(
                      featured.published_at ?? featured.created_at,
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 pt-1 font-bold text-accent-600">
                    Lees het volledige verslag
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* Secondary row — 2 wide editorial cards */}
          {secondary.length > 0 && (
            <section className="bg-cream-dark/50 py-16 sm:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                    Recent
                  </span>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
                    Nieuwste berichten
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {secondary.map((article) => {
                    const title = decodeEntities(article.title);
                    const excerpt = decodeEntities(article.excerpt);
                    const category =
                      decodeEntities(article.category?.name) || "Nieuwsbericht";
                    return (
                      <Link
                        key={article.id}
                        href={`/nieuws/${article.slug}`}
                        className="group block"
                      >
                        {article.featured_image ? (
                          <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
                            <Image
                              src={article.featured_image}
                              alt={title}
                              fill
                              sizes="(min-width: 768px) 45vw, 100vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="mb-5 aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-500 to-accent-600" />
                        )}
                        <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
                          {category}
                        </span>
                        <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-primary-600 transition-colors group-hover:text-accent-600">
                          {title}
                        </h3>
                        {excerpt && (
                          <p className="mt-3 line-clamp-2 text-base text-ink-soft">
                            {excerpt}
                          </p>
                        )}
                        <p className="mt-3 text-sm text-ink-soft">
                          {formatDutchDate(
                            article.published_at ?? article.created_at,
                          )}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Tertiary — rest of articles in 3 column grid */}
          {tertiary.length > 0 && (
            <section className="py-16 sm:py-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                    Archief
                  </span>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
                    Alle berichten
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {tertiary.map((article) => {
                    const title = decodeEntities(article.title);
                    const excerpt = decodeEntities(article.excerpt);
                    const category =
                      decodeEntities(article.category?.name) || "Update";
                    return (
                      <Link
                        key={article.id}
                        href={`/nieuws/${article.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                      >
                        {article.featured_image ? (
                          <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
                            <Image
                              src={article.featured_image}
                              alt={title}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="h-1.5 bg-gradient-to-r from-primary-600 via-accent-600 to-azure-500" />
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex items-center gap-2 text-xs">
                            <span className="rounded-full bg-accent-50 px-2.5 py-1 font-bold uppercase tracking-wider text-accent-700">
                              {category}
                            </span>
                            <span className="text-ink-soft">
                              {formatDutchDate(
                                article.published_at ?? article.created_at,
                              )}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl font-bold leading-snug text-primary-600 transition-colors group-hover:text-accent-600">
                            {title}
                          </h3>
                          {excerpt && (
                            <p className="mt-3 line-clamp-3 text-sm text-ink-soft">
                              {excerpt}
                            </p>
                          )}
                          <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-accent-600">
                            Lees verder
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Footer CTA */}
      <section className="bg-cream-dark/50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Newspaper
            className="mx-auto mb-6 h-10 w-10 text-accent-600"
            aria-hidden="true"
          />
          <h2 className="font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
            Blijf op de hoogte
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Volg onze projecten in Bangalore. Nieuwsbrieven worden drie keer per
            jaar verzonden.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl"
            >
              Aanmelden voor nieuwsbrief
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

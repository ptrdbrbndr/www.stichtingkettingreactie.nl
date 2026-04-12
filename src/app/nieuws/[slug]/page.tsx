import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import {
  getArticleBySlug,
  getArticles,
  formatReadingTime,
} from "@ptrdbrbndr/cms";
import { decodeEntities } from "@/lib/text";

interface NieuwsDetailPageProps {
  params: Promise<{ slug: string }>;
}

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

export async function generateMetadata({
  params,
}: NieuwsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const article = await getArticleBySlug(supabase, slug);

  if (!article) {
    return { title: "Artikel niet gevonden" };
  }

  const decodedTitle = decodeEntities(article.meta_title ?? article.title);
  const decodedDescription = decodeEntities(
    article.meta_description ?? article.excerpt ?? "",
  );

  return {
    title: decodedTitle,
    description:
      decodedDescription ||
      `Lees "${decodedTitle}" van Stichting Kettingreactie.`,
  };
}

export default async function NieuwsDetailPage({
  params,
}: NieuwsDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const article = await getArticleBySlug(supabase, slug);

  if (!article) {
    notFound();
  }

  const { articles: recent } = await getArticles(supabase, {
    status: "published",
    orderBy: "published_at",
    orderDirection: "desc",
    limit: 5,
  });

  const related = recent.filter((a) => a.slug !== article.slug).slice(0, 3);

  const formattedDate = formatDutchDate(
    article.published_at ?? article.created_at,
  );

  const articleTitle = decodeEntities(article.title);
  const articleExcerpt = decodeEntities(article.excerpt) || undefined;
  const categoryName = decodeEntities(article.category?.name) || "Nieuwsbericht";

  return (
    <>
      <Hero
        eyebrow={categoryName}
        title={articleTitle}
        subtitle={articleExcerpt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Nieuws", href: "/nieuws" },
          { label: articleTitle, href: `/nieuws/${article.slug}` },
        ]}
      />

      {/* Metadata strip */}
      <section className="border-b border-line bg-cream-dark/50 py-5">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-ink-soft sm:px-6 lg:px-8">
          <Link
            href="/nieuws"
            className="inline-flex items-center gap-2 font-bold text-accent-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar nieuws
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-accent-600" />
              {formattedDate}
            </span>
            {article.reading_time_minutes ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent-600" />
                {formatReadingTime(article.reading_time_minutes)}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {article.featured_image && (
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={article.featured_image}
                alt={articleTitle}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article body */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 text-primary-600 opacity-[0.035]"
        >
          <svg width="560" height="560" viewBox="0 0 100 100">
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {article.content_html ? (
            <div
              className="prose prose-editorial max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          ) : (
            <div className="rounded-2xl border border-line bg-white p-12 text-center shadow-sm">
              <Newspaper className="mx-auto mb-4 h-10 w-10 text-accent-600" />
              <p className="text-ink-soft">
                Dit artikel heeft nog geen inhoud.
              </p>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-14 border-t border-line pt-6">
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
                Onderwerpen
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex rounded-full border border-line bg-cream-dark/60 px-3 py-1 text-xs font-semibold text-primary-600"
                  >
                    #{decodeEntities(tag.name)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-cream-dark/50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Verder lezen
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
                Meer berichten
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const relTitle = decodeEntities(item.title);
                const relExcerpt = decodeEntities(item.excerpt);
                const relCategory =
                  decodeEntities(item.category?.name) || "Update";
                return (
                  <Link
                    key={item.id}
                    href={`/nieuws/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    {item.featured_image ? (
                      <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
                        <Image
                          src={item.featured_image}
                          alt={relTitle}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="h-1.5 bg-gradient-to-r from-primary-600 via-accent-600 to-azure-500" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
                        {relCategory}
                      </span>
                      <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-primary-600 transition-colors group-hover:text-accent-600">
                        {relTitle}
                      </h3>
                      {relExcerpt && (
                        <p className="mt-3 line-clamp-3 text-sm text-ink-soft">
                          {relExcerpt}
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
  );
}

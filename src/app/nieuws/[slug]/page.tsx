import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Newspaper, Calendar, Clock } from "lucide-react";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getArticleBySlug, formatReadingTime } from "@ptrdbrbndr/cms";
import { notFound } from "next/navigation";

interface NieuwsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NieuwsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const article = await getArticleBySlug(supabase, slug);

  if (!article) {
    return {
      title: "Artikel niet gevonden - Stichting Kettingreactie",
    };
  }

  return {
    title: article.meta_title ?? `${article.title} - Nieuws - Stichting Kettingreactie`,
    description: article.meta_description ?? article.excerpt ?? `Lees "${article.title}" van Stichting Kettingreactie.`,
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

  const formattedDate = new Date(
    article.published_at ?? article.created_at
  ).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Hero title="Nieuws" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/nieuws"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar nieuws
          </Link>

          <article className="mx-auto max-w-3xl">
            {/* Article header */}
            <header className="mb-8">
              {article.category && (
                <span className="mb-3 inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                  {article.category.name}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  {article.excerpt}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                {article.reading_time_minutes && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {formatReadingTime(article.reading_time_minutes)}
                  </span>
                )}
              </div>
            </header>

            {/* Article content */}
            {article.content_html ? (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: article.content_html }}
              />
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <Newspaper className="h-8 w-8" />
                </div>
                <p className="text-gray-500">
                  Dit artikel heeft nog geen inhoud.
                </p>
              </div>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 border-t border-gray-100 pt-6">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}

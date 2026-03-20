import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import Hero from "@/components/Hero";
import BlogPostCard from "@/components/BlogPostCard";
import { createClient } from "@/lib/supabase/server";
import { getArticles } from "@ptrdbrbndr/cms";

export const metadata: Metadata = {
  title: "Nieuws - Stichting Kettingreactie",
  description:
    "Lees het laatste nieuws van Stichting Kettingreactie over onze projecten en activiteiten.",
};

export default async function NieuwsPage() {
  const supabase = await createClient();
  const { articles } = await getArticles(supabase, {
    status: "published",
    orderBy: "published_at",
    orderDirection: "desc",
    limit: 20,
  });

  return (
    <>
      <Hero
        title="Nieuws"
        subtitle="Blijf op de hoogte van onze projecten en activiteiten."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Newspaper className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Nog geen nieuwsberichten
              </h2>
              <p className="mt-3 text-gray-500">
                Binnenkort verschijnen hier onze nieuwsberichten.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <BlogPostCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt ?? ""}
                  slug={article.slug}
                  date={article.published_at ?? article.created_at}
                  category={article.category?.name}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
      `Verslag van Stichting Kettingreactie: ${decodedTitle}.`,
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
  const categoryName = decodeEntities(article.category?.name) || "Verslag";

  return (
    <>
      {/* Reportage-kop */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          <div className="folio">
            <p className="kicker text-madder">{categoryName}</p>
            <Link href="/nieuws" className="kicker text-ink-2 hover:text-madder">
              Alle verslagen
            </Link>
          </div>
          <h1 className="mt-7 max-w-4xl font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink">
            {articleTitle}
          </h1>
          {articleExcerpt && (
            <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-ink-2 sm:text-[1.375rem]">
              {articleExcerpt}
            </p>
          )}
          <p className="kicker mt-7 text-ink-2">
            {formattedDate} · Bestuur Stichting Kettingreactie
            {article.reading_time_minutes
              ? ` · ${formatReadingTime(article.reading_time_minutes)}`
              : ""}
          </p>
        </div>
      </section>

      {/* Openingsfoto */}
      {article.featured_image && (
        <figure className="mx-auto max-w-[96rem]">
          <div className="relative aspect-[21/9] min-h-[280px] w-full overflow-hidden">
            <Image
              src={article.featured_image}
              alt={articleTitle}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      {/* Reportagetekst met kantlijn */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article className="lg:col-span-7 lg:col-start-2">
            {article.content_html ? (
              <div
                className="prose prose-editorial max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content_html }}
              />
            ) : (
              <p className="font-serif text-lg text-ink-2">
                Dit verslag heeft nog geen inhoud.
              </p>
            )}

            {article.tags && article.tags.length > 0 && (
              <p className="mt-12 border-t border-rule-soft pt-5 font-serif text-[0.9375rem] text-ink-2">
                <span className="kicker mr-3 text-ink-2">Trefwoorden</span>
                {article.tags
                  .map((tag) => decodeEntities(tag.name))
                  .join(", ")}
              </p>
            )}
          </article>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="border-t-2 border-rule pt-5">
              <p className="kicker text-ink-2">Kantlijn</p>
              <p className="mt-3 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                Bestuursleden bezoeken de projecten op eigen kosten;
                verslagen zoals dit komen uit die bezoeken.{" "}
                <span className="mark-turmeric text-ink">
                  Elke gedoneerde euro gaat naar de projecten.
                </span>
              </p>
              <Link
                href="/steun-ons"
                className="link-editorial mt-4 inline-block font-serif text-[1.0625rem]"
              >
                Steun de projecten
              </Link>
            </div>
          </aside>
        </div>

        {/* Verder lezen */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="folio">
              <p className="kicker text-madder">Verder lezen</p>
            </div>
            <ul className="mt-2">
              {related.map((item) => (
                <li key={item.id} className="border-b border-rule-soft py-6">
                  <Link
                    href={`/nieuws/${item.slug}`}
                    className="group grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-8"
                  >
                    <p className="kicker text-ink-2 sm:col-span-3 lg:col-span-2">
                      {formatDutchDate(item.published_at ?? item.created_at)}
                    </p>
                    <h3 className="font-serif text-xl font-medium leading-snug text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink sm:col-span-9">
                      {decodeEntities(item.title)}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getArticles } from "@ptrdbrbndr/cms";
import { decodeEntities } from "@/lib/text";

export const metadata: Metadata = {
  title: "Verslagen en berichten",
  description:
    "Bezoekverslagen en berichten van Stichting Kettingreactie over de drie projecten in en rondom Bangalore.",
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

  return (
    <>
      <Hero
        eyebrow="Katern · Verslagen"
        title="Verslagen uit Bangalore"
        subtitle="Bezoekverslagen en berichten over de drie projecten, geschreven door het bestuur. Nieuwsbrieven verschijnen drie keer per jaar."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Nieuws", href: "/nieuws" },
        ]}
      />

      {articles.length === 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <p className="border-t-2 border-rule pt-8 font-serif text-lg text-ink-2">
            Er zijn nog geen verslagen gepubliceerd.
          </p>
        </section>
      ) : (
        <>
          {/* Uitgelicht verslag */}
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 border-t-2 border-rule pt-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                {featured.featured_image && (
                  <Link href={`/nieuws/${featured.slug}`} className="block">
                    <figure>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={featured.featured_image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </figure>
                  </Link>
                )}
              </div>
              <div className="lg:col-span-5 lg:pl-4">
                <p className="kicker text-madder">
                  Uitgelicht ·{" "}
                  {decodeEntities(featured.category?.name) || "Verslag"}
                </p>
                <Link href={`/nieuws/${featured.slug}`} className="group block">
                  <h2 className="mt-3 font-serif text-3xl font-medium leading-[1.08] tracking-tight text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink sm:text-4xl">
                    {decodeEntities(featured.title)}
                  </h2>
                </Link>
                {featured.excerpt && (
                  <p className="mt-4 font-serif text-lg leading-relaxed text-ink-2">
                    {decodeEntities(featured.excerpt)}
                  </p>
                )}
                <p className="kicker mt-5 text-ink-2">
                  {formatDutchDate(featured.published_at ?? featured.created_at)}{" "}
                  · Bestuur Stichting Kettingreactie
                </p>
              </div>
            </div>
          </section>

          {/* Archief — chronologische lijst */}
          <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="folio">
              <p className="kicker text-madder">Archief</p>
              <p className="kicker text-ink-2">{articles.length} berichten</p>
            </div>
            <ul className="mt-2">
              {rest.map((article) => {
                const title = decodeEntities(article.title);
                const excerpt = decodeEntities(article.excerpt);
                const category =
                  decodeEntities(article.category?.name) || "Bericht";
                return (
                  <li
                    key={article.id}
                    className="border-b border-rule-soft py-7"
                  >
                    <Link
                      href={`/nieuws/${article.slug}`}
                      className="group grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-8"
                    >
                      <div className="sm:col-span-3 lg:col-span-2">
                        <p className="kicker text-ink-2">
                          {formatDutchDate(
                            article.published_at ?? article.created_at,
                          )}
                        </p>
                        <p className="kicker mt-1 text-madder">{category}</p>
                      </div>
                      <div className="sm:col-span-7 lg:col-span-8">
                        <h3 className="font-serif text-2xl font-medium leading-snug tracking-tight text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink">
                          {title}
                        </h3>
                        {excerpt && (
                          <p className="mt-2 line-clamp-2 max-w-3xl font-serif text-[1.0625rem] leading-relaxed text-ink-2">
                            {excerpt}
                          </p>
                        )}
                      </div>
                      {article.featured_image && (
                        <div className="hidden sm:col-span-2 sm:block">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={article.featured_image}
                              alt=""
                              fill
                              sizes="15vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </>
  );
}

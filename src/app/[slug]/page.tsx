import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getPageBySlug } from "@ptrdbrbndr/cms";
import { decodeEntities } from "@/lib/text";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

type SectionKey = "over-ons" | "steun-ons" | "verantwoording";

interface SiblingPage {
  slug: string;
  label: string;
}

interface SectionInfo {
  key: SectionKey;
  label: string;
  href: string;
  siblings: SiblingPage[];
}

const OVER_ONS_SIBLINGS: SiblingPage[] = [
  { slug: "doelstelling", label: "Doelstelling" },
  { slug: "missie", label: "Missie" },
  { slug: "onze-missie", label: "Historie" },
  { slug: "beleidsplan", label: "Beleidsplan" },
  { slug: "samenstelling-bestuur", label: "Organisatie en bestuur" },
];

const STEUN_ONS_SIBLINGS: SiblingPage[] = [
  { slug: "betaalwijze", label: "Betaalwijze" },
  { slug: "contactgegevens", label: "Contactgegevens" },
  { slug: "belastingaftrek-schenkingen", label: "Belastingaftrek schenkingen" },
  { slug: "sponsorkliks", label: "SponsorKliks" },
];

const VERANTWOORDING_SIBLINGS: SiblingPage[] = [
  { slug: "betaalwijze-2", label: "ANBI-verklaring" },
  { slug: "rsin", label: "Fiscaal nummer (RSIN)" },
  { slug: "beloningsbeleid", label: "Beloningsbeleid" },
  { slug: "financieel-overzicht-2012", label: "Financieel overzicht" },
];

const OVER_ONS_SECTION: SectionInfo = {
  key: "over-ons",
  label: "Over Ons",
  href: "/over-ons",
  siblings: OVER_ONS_SIBLINGS,
};

const STEUN_ONS_SECTION: SectionInfo = {
  key: "steun-ons",
  label: "Steun Ons",
  href: "/steun-ons",
  siblings: STEUN_ONS_SIBLINGS,
};

const VERANTWOORDING_SECTION: SectionInfo = {
  key: "verantwoording",
  label: "Verantwoording",
  href: "/verantwoording",
  siblings: VERANTWOORDING_SIBLINGS,
};

const SLUG_TO_SECTION: Record<string, SectionInfo> = {
  doelstelling: OVER_ONS_SECTION,
  missie: OVER_ONS_SECTION,
  "onze-missie": OVER_ONS_SECTION,
  beleidsplan: OVER_ONS_SECTION,
  "samenstelling-bestuur": OVER_ONS_SECTION,
  betaalwijze: STEUN_ONS_SECTION,
  contactgegevens: STEUN_ONS_SECTION,
  "belastingaftrek-schenkingen": STEUN_ONS_SECTION,
  sponsorkliks: STEUN_ONS_SECTION,
  "betaalwijze-2": VERANTWOORDING_SECTION,
  rsin: VERANTWOORDING_SECTION,
  beloningsbeleid: VERANTWOORDING_SECTION,
  "financieel-overzicht-2012": VERANTWOORDING_SECTION,
};

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const page = await getPageBySlug(supabase, slug);
  if (!page) {
    return { title: "Pagina niet gevonden" };
  }
  return {
    title: decodeEntities(page.meta_title ?? page.title),
    description: decodeEntities(page.meta_description ?? undefined) || undefined,
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const page = await getPageBySlug(supabase, slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  const pageTitle = decodeEntities(page.title);
  const pageSubtitle = decodeEntities(page.subtitle) || undefined;
  const section = SLUG_TO_SECTION[slug];
  const breadcrumb = section
    ? [
        { label: "Home", href: "/" },
        { label: section.label, href: section.href },
        { label: pageTitle, href: `/${slug}` },
      ]
    : [
        { label: "Home", href: "/" },
        { label: pageTitle, href: `/${slug}` },
      ];

  return (
    <>
      <Hero
        eyebrow={section ? `Katern · ${section.label}` : undefined}
        title={pageTitle}
        subtitle={pageSubtitle}
        breadcrumb={breadcrumb}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 pt-4 lg:grid-cols-12">
          {/* Leeskolom */}
          <article className="lg:col-span-7 lg:col-start-2">
            {page.content_html ? (
              <div
                className="prose prose-editorial max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content_html }}
              />
            ) : (
              <p className="font-serif text-lg text-ink-2">
                Deze pagina heeft nog geen inhoud.
              </p>
            )}

            {section && (
              <p className="mt-12 border-t border-rule-soft pt-5">
                <Link
                  href={section.href}
                  className="link-editorial font-serif text-[1.0625rem]"
                >
                  Terug naar {section.label}
                </Link>
              </p>
            )}
          </article>

          {/* Kantlijn met sectienavigatie */}
          {section && (
            <aside className="lg:col-span-3 lg:col-start-10">
              <div className="rounded-2xl bg-paper-3 p-6 lg:sticky lg:top-8">
                <p className="kicker text-ink-2">
                  In het katern {section.label.toLowerCase()}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {section.siblings.map((sib) => {
                    const isActive = sib.slug === slug;
                    return (
                      <li key={sib.slug}>
                        <Link
                          href={`/${sib.slug}`}
                          aria-current={isActive ? "page" : undefined}
                          className={`font-serif text-[1.0625rem] underline decoration-1 underline-offset-4 transition-colors ${
                            isActive
                              ? "text-magenta decoration-magenta"
                              : "text-ink decoration-transparent hover:decoration-ink"
                          }`}
                        >
                          {sib.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-7 border-t border-rule-soft pt-4 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                  <span className="mark-azure text-ink">
                    Elke euro gaat naar de projecten.
                  </span>{" "}
                  ANBI, RSIN 821887300.{" "}
                  <Link href="/steun-ons" className="link-editorial">
                    Doneren
                  </Link>
                </p>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}

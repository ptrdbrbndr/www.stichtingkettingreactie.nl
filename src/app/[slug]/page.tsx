import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Heart, Mail, BookOpen } from "lucide-react";
import Hero from "@/components/Hero";
import { createClient } from "@/lib/supabase/server";
import { getPageBySlug } from "@ptrdbrbndr/cms";

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

const SECTION_FOOTER_CTA: Record<
  SectionKey,
  { title: string; body: string; href: string; cta: string }
> = {
  "over-ons": {
    title: "Benieuwd naar onze projecten?",
    body: "Lees hoe wij vrouwen in Bangalore ondersteunen via drie lokale initiatieven.",
    href: "/projecten",
    cta: "Bekijk de projecten",
  },
  "steun-ons": {
    title: "Klaar om te doneren?",
    body: "Elke euro gaat 100% naar onze projecten. Geen administratiekosten, geen salarissen.",
    href: "/steun-ons",
    cta: "Steun ons werk",
  },
  verantwoording: {
    title: "Vragen over onze verantwoording?",
    body: "Heeft u vragen over ons beleid, de jaarverslagen of de ANBI-status? Neem gerust contact op.",
    href: "/contact",
    cta: "Contact opnemen",
  },
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
    title: page.meta_title ?? page.title,
    description: page.meta_description ?? undefined,
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const page = await getPageBySlug(supabase, slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  const section = SLUG_TO_SECTION[slug];
  const breadcrumb = section
    ? [
        { label: "Home", href: "/" },
        { label: section.label, href: section.href },
        { label: page.title, href: `/${slug}` },
      ]
    : [
        { label: "Home", href: "/" },
        { label: page.title, href: `/${slug}` },
      ];

  const footerCta = section ? SECTION_FOOTER_CTA[section.key] : null;
  const FooterIcon = section?.key === "verantwoording" ? Mail : Heart;

  const otherSiblings = section?.siblings.filter((s) => s.slug !== slug) ?? [];

  return (
    <>
      <Hero
        eyebrow={section?.label}
        title={page.title}
        subtitle={page.subtitle ?? undefined}
        breadcrumb={breadcrumb}
      />

      {/* Article body with sidebar */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Decorative three-ring watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 text-primary-600 opacity-[0.035]"
        >
          <svg width="640" height="640" viewBox="0 0 100 100">
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Main content */}
            <article className="lg:col-span-8 lg:col-start-2">
              {page.content_html ? (
                <div
                  className="prose prose-editorial max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content_html }}
                />
              ) : (
                <div className="rounded-2xl border border-line bg-white p-12 text-center shadow-sm">
                  <p className="text-ink-soft">
                    Deze pagina heeft nog geen inhoud.
                  </p>
                </div>
              )}

              {section && (
                <div className="mt-16 border-t border-line pt-8">
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent-600 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Terug naar {section.label}
                  </Link>
                </div>
              )}
            </article>

            {/* Sticky sidebar */}
            {section && otherSiblings.length > 0 && (
              <aside className="lg:col-span-3">
                <div className="sticky top-28 space-y-6">
                  {/* In deze sectie */}
                  <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-accent-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
                        In deze sectie
                      </span>
                    </div>
                    <p className="mb-4 font-serif text-lg font-bold leading-tight text-primary-600">
                      {section.label}
                    </p>
                    <ul className="space-y-1 border-t border-line pt-3">
                      {section.siblings.map((sib) => {
                        const isActive = sib.slug === slug;
                        return (
                          <li key={sib.slug}>
                            <Link
                              href={`/${sib.slug}`}
                              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                isActive
                                  ? "bg-accent-50 font-semibold text-accent-700"
                                  : "text-ink-soft hover:bg-cream-dark hover:text-primary-600"
                              }`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              {sib.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Mini CTA */}
                  <div className="rounded-2xl bg-primary-600 p-6 text-white shadow-lg">
                    <Heart
                      className="mb-3 h-6 w-6 text-accent-400"
                      aria-hidden="true"
                    />
                    <p className="font-serif text-lg font-bold leading-snug">
                      Steun kansarme vrouwen in India
                    </p>
                    <p className="mt-2 text-sm text-primary-100">
                      100% van uw donatie gaat direct naar de drie projecten in
                      Bangalore.
                    </p>
                    <Link
                      href="/steun-ons"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-300 hover:text-white hover:underline"
                    >
                      Doneer nu
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Related siblings — grid of other pages in same section */}
      {section && otherSiblings.length > 0 && (
        <section className="bg-cream-dark/50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Meer over {section.label.toLowerCase()}
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
                Verder lezen
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {otherSiblings.map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/${sib.slug}`}
                  className="group block rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
                    {section.label}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-primary-600 group-hover:text-accent-600">
                    {sib.label}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-600">
                    Lees meer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section footer CTA */}
      {footerCta && (
        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-primary-600 p-10 text-center shadow-2xl sm:p-16">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-48 w-48 -translate-x-1/3 -translate-y-1/3 rounded-full bg-accent-600/30 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full bg-azure-500/30 blur-[100px]"
            />
            <div className="relative">
              <FooterIcon
                className="mx-auto mb-6 h-10 w-10 text-accent-400"
                aria-hidden="true"
              />
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                {footerCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
                {footerCta.body}
              </p>
              <div className="mt-8">
                <Link
                  href={footerCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-xl"
                >
                  {footerCta.cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

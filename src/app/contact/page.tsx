import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactgegevens van Stichting Kettingreactie: info@stichtingkettingreactie.nl, statutair gevestigd in Amsterdam.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Katern · Contact"
        title="Het bestuur antwoordt persoonlijk"
        subtitle="Vragen over de stichting, de projecten in Bangalore of over doneren: mail ons."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <dl>
          <div className="grid grid-cols-1 gap-3 border-b border-rule-soft py-8 lg:grid-cols-12 lg:gap-8">
            <dt className="font-display text-xl font-semibold text-ink lg:col-span-3">
              E-mail
            </dt>
            <dd className="lg:col-span-7">
              <a
                href="mailto:info@stichtingkettingreactie.nl"
                className="link-editorial font-display text-2xl"
              >
                info@stichtingkettingreactie.nl
              </a>
              <p className="mt-2 font-serif text-lg leading-relaxed text-ink-2">
                Het gebruikelijke kanaal voor alle vragen; het bestuur leest
                en beantwoordt de mail zelf.
              </p>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-rule-soft py-8 lg:grid-cols-12 lg:gap-8">
            <dt className="font-display text-xl font-semibold text-ink lg:col-span-3">
              Vestiging
            </dt>
            <dd className="lg:col-span-7">
              <p className="font-serif text-lg leading-relaxed text-ink">
                Statutair gevestigd in Amsterdam. De stichting heeft geen
                kantoor of bezoekadres; neem eerst contact op voor een
                afspraak.
              </p>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-rule-soft py-8 lg:grid-cols-12 lg:gap-8">
            <dt className="font-display text-xl font-semibold text-ink lg:col-span-3">
              Bankgegevens
            </dt>
            <dd className="lg:col-span-7">
              <p className="font-display text-2xl tracking-wide text-ink">
                NL87 INGB 0005313860
              </p>
              <p className="mt-1 font-serif text-lg text-ink-2">
                t.n.v. Stichting Kettingreactie Amsterdam · RSIN 821887300
              </p>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-3 py-8 lg:grid-cols-12 lg:gap-8">
            <dt className="font-display text-xl font-semibold text-ink lg:col-span-3">
              Meedenken of meehelpen
            </dt>
            <dd className="lg:col-span-7">
              <p className="font-serif text-lg leading-relaxed text-ink">
                Vrijwilligers en partners zijn welkom, in Nederland en in
                Bangalore. Zie ook de{" "}
                <Link href="/steun-ons" className="link-editorial">
                  andere manieren om te steunen
                </Link>
                .
              </p>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}

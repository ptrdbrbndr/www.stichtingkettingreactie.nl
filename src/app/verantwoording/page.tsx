import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Verantwoording",
  description:
    "ANBI-verantwoording van Stichting Kettingreactie: RSIN 821887300, beloningsbeleid (onbetaald bestuur) en het jaarlijkse financieel overzicht.",
};

const regels = [
  {
    term: "ANBI-status",
    inhoud:
      "De stichting is door de Belastingdienst aangemerkt als Algemeen Nut Beogende Instelling. Giften zijn daardoor aftrekbaar van de inkomsten- of vennootschapsbelasting.",
    link: {
      href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/anbi-status-controleren",
      label: "Controleer de registratie bij de Belastingdienst",
      extern: true,
    },
  },
  {
    term: "RSIN",
    inhoud:
      "Het fiscaal nummer van de stichting is 821887300. Met dit nummer is de ANBI-registratie te verifiëren.",
    link: { href: "/rsin", label: "Meer over het RSIN", extern: false },
  },
  {
    term: "Beloningsbeleid",
    inhoud:
      "Bestuur en medewerkers ontvangen geen beloning en geen onkostenvergoeding. Reizen naar de projecten in Bangalore betalen bestuursleden uit eigen zak.",
    link: {
      href: "/beloningsbeleid",
      label: "Het volledige beloningsbeleid",
      extern: false,
    },
  },
  {
    term: "Financieel overzicht",
    inhoud:
      "Jaarlijks publiceert de stichting een financieel overzicht met de ontvangen donaties en de besteding per project.",
    link: {
      href: "/financieel-overzicht-2012",
      label: "Bekijk het financieel overzicht",
      extern: false,
    },
  },
  {
    term: "Beleidsplan",
    inhoud:
      "De stichting werkt met een actueel beleidsplan waarin doelstelling, werkwijze en besteding van middelen zijn vastgelegd.",
    link: { href: "/beleidsplan", label: "Lees het beleidsplan", extern: false },
  },
];

export default function VerantwoordingPage() {
  return (
    <>
      <Hero
        eyebrow="Katern · Verantwoording"
        title="Waar elke euro blijft, staat op papier"
        subtitle="Als ANBI legt de stichting publiek verantwoording af over organisatie, beleid en besteding. Dit katern bundelt alle stukken."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Verantwoording", href: "/verantwoording" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Kerngegevens als cijferregel */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t-2 border-rule pt-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-5xl font-medium text-ink">ANBI</p>
            <p className="kicker mt-3 text-ink-2">
              Algemeen Nut Beogende Instelling
            </p>
          </div>
          <div>
            <p className="font-serif text-5xl font-medium text-ink">
              821887300
            </p>
            <p className="kicker mt-3 text-ink-2">RSIN / fiscaal nummer</p>
          </div>
          <div>
            <p className="font-serif text-5xl font-medium text-madder">€ 0</p>
            <p className="kicker mt-3 text-ink-2">
              Beloning voor bestuur en medewerkers
            </p>
          </div>
        </div>

        {/* Verantwoordingsregels */}
        <dl className="mt-16">
          {regels.map((regel) => (
            <div
              key={regel.term}
              className="grid grid-cols-1 gap-3 border-b border-rule-soft py-8 first:border-t-2 first:border-t-rule lg:grid-cols-12 lg:gap-8"
            >
              <dt className="font-serif text-xl font-medium text-ink lg:col-span-3">
                {regel.term}
              </dt>
              <dd className="lg:col-span-7">
                <p className="font-serif text-lg leading-relaxed text-ink">
                  {regel.inhoud}
                </p>
                {regel.link.extern ? (
                  <a
                    href={regel.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial mt-3 inline-block font-serif text-[1.0625rem]"
                  >
                    {regel.link.label}
                  </a>
                ) : (
                  <Link
                    href={regel.link.href}
                    className="link-editorial mt-3 inline-block font-serif text-[1.0625rem]"
                  >
                    {regel.link.label}
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 font-serif text-lg leading-relaxed text-ink-2">
          Vragen over de verantwoording?{" "}
          <Link href="/contact" className="link-editorial">
            Neem contact op
          </Link>
          ; het bestuur antwoordt persoonlijk.
        </p>
      </section>
    </>
  );
}

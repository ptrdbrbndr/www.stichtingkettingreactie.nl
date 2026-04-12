import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck,
  Scale,
  Users,
  BarChart3,
  ClipboardCheck,
  ExternalLink,
} from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/ui/InfoCard";
import FactBox from "@/components/ui/FactBox";

export const metadata: Metadata = {
  title: "Verantwoording",
  description:
    "Transparantie en verantwoording van Stichting Kettingreactie: ANBI-status, beloningsbeleid en financieel overzicht.",
};

export default function VerantwoordingPage() {
  return (
    <>
      <Hero
        eyebrow="Verantwoording"
        title="Transparantie staat bij ons voorop"
        subtitle="Wij leggen publiek verantwoording af over onze organisatie, ons beleid en de besteding van donaties. Hieronder vindt u alle informatie die u mag verwachten van een ANBI-erkende stichting."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Verantwoording", href: "/verantwoording" },
        ]}
      />

      {/* Fact strip — ANBI + RSIN direct zichtbaar */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FactBox
              label="Status"
              value="ANBI"
              hint="Algemeen Nut Beogende Instelling"
            />
            <FactBox
              label="RSIN / fiscaal nummer"
              value="821887300"
              hint="Geregistreerd bij de Belastingdienst"
              mono
            />
            <FactBox
              label="Beloning bestuur"
              value="€0"
              hint="Volledig vrijwilligerswerk"
            />
          </div>
        </div>
      </section>

      {/* Detailkaarten */}
      <section className="bg-cream-dark/50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              Onze verantwoording
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-primary-600 sm:text-5xl">
              Wat u mag verwachten
            </h2>
          </div>

          <div className="space-y-6">
            <InfoCard icon={FileCheck} title="ANBI-status">
              <p>
                Stichting Kettingreactie is door de Belastingdienst
                aangemerkt als Algemeen Nut Beogende Instelling (ANBI). Dit
                houdt in dat de stichting voldoet aan strenge eisen op het
                gebied van besteding, transparantie en verslaggeving.
                Donateurs kunnen hun giften aftrekken van de
                inkomstenbelasting of vennootschapsbelasting.
              </p>
              <p>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/anbi-status-controleren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                >
                  Controleer ANBI-status via de Belastingdienst
                  <ExternalLink className="h-4 w-4" />
                </a>
              </p>
            </InfoCard>

            <InfoCard
              variant="highlight"
              icon={Scale}
              eyebrow="Fiscaal nummer"
              title="RSIN 821887300"
            >
              <p>
                Het RSIN/fiscaal nummer van Stichting Kettingreactie is{" "}
                <span className="font-mono font-bold text-primary-600">
                  821887300
                </span>
                . U kunt dit nummer gebruiken om onze ANBI-status te
                verifiëren bij de Belastingdienst.
              </p>
            </InfoCard>

            <InfoCard icon={Users} title="Beloningsbeleid">
              <p>
                Stichting Kettingreactie wordt volledig gerund door
                vrijwilligers. Het bestuur en alle medewerkers ontvangen geen
                beloning of onkostenvergoeding voor hun werkzaamheden.
                Hierdoor gaat elke gedoneerde euro volledig naar de
                projecten in India.
              </p>
            </InfoCard>

            <InfoCard icon={BarChart3} title="Financieel overzicht">
              <p>
                Stichting Kettingreactie publiceert jaarlijks een financieel
                overzicht. Hierin wordt verantwoording afgelegd over de
                ontvangen donaties en de besteding daarvan aan de
                verschillende projecten. Het financieel overzicht is op
                aanvraag beschikbaar via{" "}
                <Link
                  href="/contact"
                  className="font-bold text-accent-600 hover:underline"
                >
                  contact opnemen
                </Link>
                .
              </p>
            </InfoCard>

            <InfoCard icon={ClipboardCheck} title="Beleidstransparantie">
              <p>
                Conform de ANBI-regelgeving publiceert Stichting
                Kettingreactie relevante beleidsinformatie. De stichting
                werkt met een actueel beleidsplan en legt verantwoording af
                over de activiteiten en de besteding van middelen. Voor
                vragen over ons beleid kunt u contact met ons opnemen.
              </p>
            </InfoCard>
          </div>
        </div>
      </section>
    </>
  );
}

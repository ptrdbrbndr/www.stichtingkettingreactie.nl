import type { Metadata } from "next";
import {
  FileCheck,
  Scale,
  Users,
  BarChart3,
  ClipboardCheck,
} from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Verantwoording - Stichting Kettingreactie",
  description:
    "Transparantie en verantwoording van Stichting Kettingreactie: ANBI-status, beloningsbeleid en financieel overzicht.",
};

export default function VerantwoordingPage() {
  return (
    <>
      <Hero
        title="Verantwoording"
        subtitle="Transparantie staat bij ons voorop. Hier vindt u informatie over onze organisatie en ons beleid."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* ANBI Status */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    ANBI-status
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Stichting Kettingreactie is door de Belastingdienst
                    aangemerkt als Algemeen Nut Beogende Instelling (ANBI).
                    Dit houdt in dat de stichting voldoet aan strenge eisen
                    op het gebied van besteding, transparantie en
                    verslaggeving. Donateurs kunnen hun giften aftrekken van
                    de inkomstenbelasting of vennootschapsbelasting.
                  </p>
                </div>
              </div>
            </div>

            {/* Fiscaal nummer */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary-700">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Fiscaal nummer
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Het RSIN/fiscaal nummer van Stichting Kettingreactie is:
                  </p>
                  <p className="mt-2 font-mono text-xl font-semibold text-primary-700">
                    821887300
                  </p>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    U kunt de ANBI-status van onze stichting controleren via de{" "}
                    <a
                      href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/anbi-status-controleren"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-700 underline hover:text-primary-800"
                    >
                      ANBI-zoektoepassing van de Belastingdienst
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Beloningsbeleid */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Beloningsbeleid
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Stichting Kettingreactie wordt volledig gerund door
                    vrijwilligers. Het bestuur en alle medewerkers ontvangen
                    geen beloning of onkostenvergoeding voor hun
                    werkzaamheden. Hierdoor gaat elke gedoneerde euro
                    volledig naar de projecten in India.
                  </p>
                </div>
              </div>
            </div>

            {/* Financieel overzicht */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Financieel overzicht
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Stichting Kettingreactie publiceert jaarlijks een
                    financieel overzicht. Hierin wordt verantwoording
                    afgelegd over de ontvangen donaties en de besteding
                    daarvan aan de verschillende projecten. Het financieel
                    overzicht is op aanvraag beschikbaar.
                  </p>
                </div>
              </div>
            </div>

            {/* Beleidsplan */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Beleidstransparantie
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Conform de ANBI-regelgeving publiceert Stichting
                    Kettingreactie relevante beleidsinformatie. De stichting
                    werkt met een actueel beleidsplan en legt verantwoording
                    af over de activiteiten en de besteding van middelen.
                    Voor vragen over ons beleid kunt u contact met ons
                    opnemen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

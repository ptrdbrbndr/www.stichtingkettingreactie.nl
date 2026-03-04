import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Heart, Users, Car } from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Abayashram – Vision India - Stichting Kettingreactie",
  description:
    "Abayashram is een opvanghuis voor geestelijk zieke vrouwen nabij Bangalore, gerund door Vision India.",
};

export default function AbayashramPage() {
  return (
    <>
      <Hero title="Abayashram – Vision India" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/projecten"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar projecten
          </Link>

          <div className="mx-auto max-w-3xl">
            {/* Hero afbeelding */}
            <div className="mb-12 overflow-hidden rounded-2xl">
              <Image
                src="/images/projecten/abayashram/abayashram-dak.jpg"
                alt="Abayashram gezien vanaf het dak"
                width={1620}
                height={1080}
                className="w-full"
                priority
              />
            </div>

            {/* Introductie */}
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                <Home className="h-4 w-4" />
                Opvang &amp; Rehabilitatie
              </div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Een veilig thuis voor kwetsbare vrouwen
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Abayashram is een opvanghuis voor geestelijk zieke vrouwen,
                gelegen nabij Hoskote, even buiten Bangalore. Het huis biedt
                onderdak aan circa 45 vrouwen die nergens anders terecht
                kunnen. Veel van deze vrouwen zijn op straat gevonden of
                achtergelaten door hun families.
              </p>
            </div>

            {/* Foto's grid */}
            <div className="mb-12 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/projecten/abayashram/vrouwen-abayashram.jpg"
                  alt="Vrouwen bij Abayashram"
                  width={924}
                  height={563}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/projecten/abayashram/handwerk.jpg"
                  alt="Handwerk van vrouwen bij Abayashram"
                  width={1620}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Vision India */}
            <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Vision India
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Het project wordt gerund door Joby Varghese en zijn
                    organisatie Vision India. Met een klein team van
                    medewerkers zorgen zij dag en nacht voor de vrouwen in
                    Abayashram. De organisatie ontvangt weinig overheidssteun
                    en is grotendeels afhankelijk van donaties.
                  </p>
                </div>
              </div>
            </div>

            {/* Hulp en Rehabilitatie */}
            <div className="mb-12">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Medische en psychologische hulp
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    De vrouwen in Abayashram krijgen medische en
                    psychologische hulp. Er is een rehabilitatieprogramma
                    dat erop gericht is vrouwen te stabiliseren en zo
                    mogelijk te herenigen met hun families. Vrouwen die niet
                    terug kunnen naar hun familie, vinden in Abayashram een
                    blijvend thuis.
                  </p>
                </div>
              </div>
            </div>

            {/* Sytze en Jelly foto */}
            <div className="mb-12 overflow-hidden rounded-2xl">
              <Image
                src="/images/projecten/abayashram/sytze-jelly-abayashram.jpg"
                alt="Sytze en Jelly bij de vrouwen van Abayashram"
                width={1620}
                height={1080}
                className="w-full"
              />
            </div>

            {/* Bijdrage SKR */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary-700">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Bijdrage van Stichting Kettingreactie
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Stichting Kettingreactie heeft onder andere een auto
                    gesponsord voor Abayashram. Deze auto wordt gebruikt
                    voor het transport van de vrouwen naar ziekenhuizen en
                    andere medische voorzieningen. Daarnaast draagt de
                    stichting bij aan de dagelijkse kosten van het
                    opvanghuis.
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

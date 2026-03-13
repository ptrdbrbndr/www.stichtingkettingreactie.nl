import type { Metadata } from "next";
import { Home, Building, Shield, Users, History } from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Over de Stichting - Stichting Kettingreactie",
  description:
    "Leer meer over Stichting Kettingreactie en onze missie om de positie van kansarme vrouwen in India te verbeteren.",
};

export default function OverOnsPage() {
  return (
    <>
      <Hero title="Over de Stichting" />

      {/* Missie */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              Onze Missie
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Kansarme vrouwen in India ondersteunen
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Het doel van de Stichting Kettingreactie is het verbeteren van de
              positie van kansarme vrouwen in India. Zij doet dit door lokale
              initiatieven in India te ondersteunen door middel van
              fondsenwerving in Nederland.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              De stichting richt zich op drie projecten in en rondom Bangalore,
              in het zuiden van India. Deze projecten bieden opvang,
              huisvesting en medische zorg aan vrouwen die dit het hardst nodig
              hebben.
            </p>
          </div>
        </div>
      </section>

      {/* Geschiedenis */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <History className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Onze geschiedenis
                </h2>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Stichting Kettingreactie is opgericht vanuit een persoonlijke
                  betrokkenheid bij de situatie van vrouwen in India. Na een
                  bezoek aan de projecten in en rondom Bangalore ontstond het
                  idee om vanuit Nederland structureel steun te organiseren.
                  Wat begon als een klein initiatief groeide uit tot een
                  stichting met een trouwe achterban van donateurs en
                  vrijwilligers.
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Door de jaren heen heeft Stichting Kettingreactie honderden
                  vrouwen kunnen bereiken via de drie projecten die zij
                  ondersteunt. De naam &ldquo;Kettingreactie&rdquo; verwijst
                  naar het idee dat iedere bijdrage een reactie in gang zet
                  die verder reikt dan je op het eerste gezicht verwacht.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projecten Overzicht */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            De projecten die wij ondersteunen
          </h2>

          <div className="space-y-12">
            {/* Abayashram */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Abayashram &ndash; Vision India
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Abayashram is een opvanghuis voor geestelijk zieke vrouwen
                    nabij Hoskote, even buiten Bangalore. Het project wordt
                    gerund door Joby Varghese en de organisatie Vision India.
                    Hier vinden circa 45 vrouwen een veilig onderkomen en
                    krijgen zij medische en psychologische hulp. Het doel is om
                    deze vrouwen te rehabiliteren en zo mogelijk te herenigen
                    met hun families.
                  </p>
                </div>
              </div>
            </div>

            {/* UWA */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    UWA &ndash; Working Women&apos;s Hostel
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Het Working Women&apos;s Hostel biedt huisvesting aan jonge
                    werkende vrouwen die vanuit landelijke gebieden naar
                    Bangalore komen. Het hostel wordt gerund door de University
                    Women&apos;s Association (UWA) Bangalore en biedt een
                    veilige omgeving waarin vrouwen kunnen wonen terwijl zij
                    werken en zich ontwikkelen.
                  </p>
                </div>
              </div>
            </div>

            {/* ASHA */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    ASHA Foundation
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    De ASHA Foundation, geleid door Dr. Glory Alexander, richt
                    zich op HIV-preventie en behandeling voor vrouwen. Het
                    project voorziet in ART-medicatie voor circa 100 vrouwen
                    (weduwen en jonge HIV-positieve vrouwen) en heeft een
                    PMTCT-programma (Prevention of Mother-to-Child
                    Transmission) waarmee moeder-kind-overdracht van HIV wordt
                    voorkomen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organisatie */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Organisatie
                </h2>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Stichting Kettingreactie wordt volledig gerund door
                  vrijwilligers. Het bestuur en alle medewerkers zetten zich
                  belangeloos in, zodat elke gedoneerde euro volledig ten goede
                  komt aan de projecten in India. De stichting is gevestigd in
                  Amsterdam (statutaire vestiging) en heeft een ANBI-status, waardoor giften
                  aftrekbaar zijn van de belasting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

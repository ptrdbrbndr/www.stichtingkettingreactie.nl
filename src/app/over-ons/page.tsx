import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Building,
  Shield,
  History,
  Users,
  ArrowRight,
  Heart,
} from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/ui/InfoCard";
import QuoteBlock from "@/components/ui/QuoteBlock";

export const metadata: Metadata = {
  title: "Over de Stichting",
  description:
    "Leer meer over Stichting Kettingreactie en onze missie om de positie van kansarme vrouwen in India te verbeteren.",
};

export default function OverOnsPage() {
  return (
    <>
      <Hero
        eyebrow="Over ons"
        title="Een kleine stichting met een grote impact"
        subtitle="Stichting Kettingreactie steunt sinds 2007 vrouwen in en rondom Bangalore met opvang, huisvesting en medische zorg. Alles draait op vrijwilligers — 100% van elke gift gaat direct naar de projecten."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Over Ons", href: "/over-ons" },
        ]}
      />

      {/* Missie — editorial split met overlapping image */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-6">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Onze missie
              </span>
              <h2 className="font-serif text-4xl font-bold leading-tight text-primary-600 sm:text-5xl">
                Kansarme vrouwen in India de kans geven om hun eigen toekomst te
                vormen
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft">
                Het doel van Stichting Kettingreactie is het verbeteren van de
                positie van kansarme vrouwen in India. Wij doen dat door lokale
                initiatieven in en rondom Bangalore te ondersteunen met
                fondsenwerving in Nederland.
              </p>
              <p className="text-lg leading-relaxed text-ink-soft">
                De stichting richt zich op drie projecten die opvang,
                huisvesting en medische zorg bieden aan vrouwen die dit het
                hardst nodig hebben.
              </p>
              <Link
                href="/projecten"
                className="inline-flex items-center gap-2 text-base font-bold text-accent-600 hover:underline"
              >
                Bekijk de projecten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/projecten/abayashram/vrouwen-abayashram.jpg"
                  alt="Vrouwen bij Abayashram, Bangalore"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-6 max-w-xs sm:-left-12">
                <QuoteBlock
                  variant="inline"
                  quote="De naam 'Kettingreactie' verwijst naar het idee dat iedere bijdrage een reactie in gang zet die verder reikt dan je op het eerste gezicht verwacht."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historie */}
      <section className="bg-cream-dark/50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InfoCard icon={History} eyebrow="Onze geschiedenis" title="Hoe het begon">
            <p>
              Stichting Kettingreactie is opgericht vanuit een persoonlijke
              betrokkenheid bij de situatie van vrouwen in India. Na een bezoek
              aan de projecten in en rondom Bangalore ontstond het idee om
              vanuit Nederland structureel steun te organiseren.
            </p>
            <p>
              Wat begon als een klein initiatief groeide uit tot een stichting
              met een trouwe achterban van donateurs en vrijwilligers. Door de
              jaren heen heeft Stichting Kettingreactie honderden vrouwen
              kunnen bereiken via de drie projecten die zij ondersteunt.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Projecten overzicht */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              De drie projecten
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-primary-600 sm:text-5xl">
              Waar wij ons voor inzetten
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <InfoCard icon={Home} title="Abayashram">
              <p>
                Een opvanghuis voor circa 45 geestelijk zieke vrouwen nabij
                Hoskote, even buiten Bangalore. Gerund door Joby Varghese en
                Vision India.
              </p>
              <Link
                href="/projecten/abayashram"
                className="inline-flex items-center gap-1 text-sm font-bold text-accent-600 hover:underline"
              >
                Meer over Abayashram
                <ArrowRight className="h-4 w-4" />
              </Link>
            </InfoCard>
            <InfoCard icon={Building} title="UWA Hostel">
              <p>
                Veilige huisvesting voor jonge werkende vrouwen uit landelijke
                gebieden. Gerund door de University Women&apos;s Association
                Bangalore.
              </p>
              <Link
                href="/projecten/uwa-hostel"
                className="inline-flex items-center gap-1 text-sm font-bold text-accent-600 hover:underline"
              >
                Meer over UWA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </InfoCard>
            <InfoCard icon={Shield} title="ASHA Foundation">
              <p>
                HIV-preventie en behandeling voor vrouwen. ART-medicatie en een
                PMTCT-programma om moeder-kind-overdracht te voorkomen.
              </p>
              <Link
                href="/projecten/asha-foundation"
                className="inline-flex items-center gap-1 text-sm font-bold text-accent-600 hover:underline"
              >
                Meer over ASHA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Organisatie */}
      <section className="bg-cream-dark/50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InfoCard icon={Users} eyebrow="Organisatie" title="Volledig door vrijwilligers">
            <p>
              Stichting Kettingreactie wordt volledig gerund door vrijwilligers.
              Het bestuur en alle medewerkers zetten zich belangeloos in, zodat
              elke gedoneerde euro volledig ten goede komt aan de projecten in
              India.
            </p>
            <p>
              De stichting is statutair gevestigd in Amsterdam en heeft een
              ANBI-status, waardoor giften aftrekbaar zijn van de belasting.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* CTA naar steun */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
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
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Draag bij aan de kettingreactie
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Elke donatie gaat volledig naar de drie projecten. Geen
              administratiekosten, geen salarissen.
            </p>
            <div className="mt-8">
              <Link
                href="/steun-ons"
                className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-xl"
              >
                <Heart className="h-5 w-5" />
                Steun ons werk
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Heart, Users, Car } from "lucide-react";
import Hero from "@/components/Hero";
import InfoCard from "@/components/ui/InfoCard";

export const metadata: Metadata = {
  title: "Abayashram – Vision India",
  description:
    "Abayashram is een opvanghuis voor geestelijk zieke vrouwen nabij Bangalore, gerund door Vision India.",
};

export default function AbayashramPage() {
  return (
    <>
      <Hero
        eyebrow="Project 01 · Opvang & rehabilitatie"
        title="Abayashram"
        subtitle="Een veilig thuis voor circa 45 geestelijk zieke vrouwen nabij Hoskote, even buiten Bangalore. Gerund door Joby Varghese en Vision India."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projecten", href: "/projecten" },
          { label: "Abayashram", href: "/projecten/abayashram" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projecten"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-accent-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar alle projecten
          </Link>

          {/* Hero image */}
          <div className="mb-16 overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/projecten/abayashram/abayashram-dak.jpg"
              alt="Abayashram gezien vanaf het dak"
              width={1620}
              height={1080}
              className="w-full"
              priority
            />
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Lead */}
            <div className="mb-14 border-l-4 border-accent-600 pl-6">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
                Wat Abayashram doet
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-primary-600 sm:text-4xl">
                Onderdak, zorg en waardigheid voor vrouwen die nergens anders
                terecht kunnen
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Abayashram is een opvanghuis voor geestelijk zieke vrouwen,
                gelegen nabij Hoskote, even buiten Bangalore. Het huis biedt
                onderdak aan circa 45 vrouwen die nergens anders terecht
                kunnen — veel van hen zijn op straat gevonden of achtergelaten
                door hun families.
              </p>
            </div>

            {/* Image grid */}
            <div className="mb-14 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/projecten/abayashram/vrouwen-abayashram.jpg"
                  alt="Vrouwen bij Abayashram"
                  width={924}
                  height={563}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/projecten/abayashram/handwerk.jpg"
                  alt="Handwerk van vrouwen bij Abayashram"
                  width={1620}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content cards */}
            <div className="space-y-6">
              <InfoCard icon={Users} title="Vision India">
                <p>
                  Het project wordt gerund door Joby Varghese en zijn
                  organisatie Vision India. Met een klein team van medewerkers
                  zorgen zij dag en nacht voor de vrouwen. De organisatie
                  ontvangt weinig overheidssteun en is grotendeels afhankelijk
                  van donaties.
                </p>
              </InfoCard>

              <InfoCard icon={Heart} title="Medische en psychologische hulp">
                <p>
                  De vrouwen krijgen medische en psychologische hulp via een
                  rehabilitatieprogramma dat erop gericht is hen te
                  stabiliseren en zo mogelijk te herenigen met hun families.
                  Vrouwen die niet terug kunnen, vinden in Abayashram een
                  blijvend thuis.
                </p>
              </InfoCard>
            </div>

            {/* Sytze en Jelly */}
            <div className="my-16 overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/projecten/abayashram/sytze-jelly-abayashram.jpg"
                alt="Sytze en Jelly bij de vrouwen van Abayashram"
                width={1620}
                height={1080}
                className="w-full"
              />
            </div>

            <InfoCard
              variant="highlight"
              icon={Car}
              eyebrow="Onze bijdrage"
              title="Wat Stichting Kettingreactie doet"
            >
              <p>
                Stichting Kettingreactie heeft onder andere een auto gesponsord
                voor Abayashram. Deze auto wordt gebruikt voor het transport
                van de vrouwen naar ziekenhuizen en andere medische
                voorzieningen. Daarnaast draagt de stichting structureel bij
                aan de dagelijkse kosten van het opvanghuis.
              </p>
              <p>
                <Link
                  href="/steun-ons"
                  className="inline-flex items-center gap-1 font-bold text-accent-600 hover:underline"
                >
                  Ook Abayashram steunen →
                </Link>
              </p>
            </InfoCard>
          </div>
        </div>
      </section>
    </>
  );
}

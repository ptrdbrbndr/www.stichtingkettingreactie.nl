import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building, Users, Shield, Heart, HandHeart } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Stichting Kettingreactie - Samen voor kansarme vrouwen in India",
  description:
    "Stichting Kettingreactie zet zich in voor het verbeteren van de positie van kansarme vrouwen in India door lokale initiatieven te ondersteunen.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Samen voor kansarme vrouwen in India"
        subtitle="Stichting Kettingreactie ondersteunt lokale initiatieven die het leven van kansarme vrouwen in India verbeteren. Samen maken wij het verschil."
        showCta
        ctaText="Steun ons"
        ctaHref="/steun-ons"
      />

      {/* Onze Missie */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              Onze Missie
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Het verbeteren van de positie van kansarme vrouwen in India
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Stichting Kettingreactie zet zich in voor het verbeteren van de
              positie van kansarme vrouwen in India. Wij doen dit door lokale
              initiatieven in India te ondersteunen met fondsenwerving in
              Nederland. Elke gedoneerde euro gaat volledig naar de projecten.
            </p>
          </div>
        </div>
      </section>

      {/* Onze Projecten */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              Onze Projecten
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Waar wij ons voor inzetten
            </h2>
            <p className="mt-4 text-gray-600">
              Wij ondersteunen drie projecten in en rondom Bangalore, India.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Abayashram – Vision India"
              description="Een opvanghuis voor geestelijk zieke vrouwen nabij Bangalore. Hier krijgen zij medische en psychologische hulp en een veilig onderkomen."
              href="/projecten/abayashram"
              icon={<Home className="h-6 w-6" />}
            />
            <ProjectCard
              title="UWA – Working Women's Hostel"
              description="Huisvesting voor jonge werkende vrouwen uit landelijke gebieden die naar Bangalore komen om te werken. Een veilige plek om te wonen."
              href="/projecten/uwa-hostel"
              icon={<Building className="h-6 w-6" />}
            />
            <ProjectCard
              title="ASHA Foundation"
              description="HIV-preventie en behandeling voor vrouwen. Medicatie voor weduwen en jonge HIV-positieve vrouwen, en een programma om moeder-kind-overdracht te voorkomen."
              href="/projecten/asha-foundation"
              icon={<Shield className="h-6 w-6" />}
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-600 px-6 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              Bekijk alle projecten
            </Link>
          </div>
        </div>
      </section>

      {/* Laatste Nieuws */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              Laatste Nieuws
            </div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Blijf op de hoogte
            </h2>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Binnenkort verschijnen hier onze nieuwsberichten.
            </p>
          </div>
        </div>
      </section>

      {/* Steun Ons CTA */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <HandHeart className="mx-auto mb-6 h-12 w-12 text-white/80" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Steun ons werk
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Elke donatie maakt een verschil. 100% van uw gift gaat direct naar
            de projecten in India. U kunt doneren via onze bankrekening.
          </p>
          <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur-sm inline-block">
            <p className="font-mono text-lg font-semibold text-white">
              NL87 INGB 0005313860
            </p>
            <p className="mt-1 text-sm text-primary-200">
              t.n.v. Stichting Kettingreactie Amsterdam
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/steun-ons"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Heart className="h-5 w-5" />
              Meer over doneren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

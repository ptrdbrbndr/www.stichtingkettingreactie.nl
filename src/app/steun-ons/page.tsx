import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import DonateForm from "@/components/DonateForm";
import DonatieBedankt from "./DonatieBedankt";
import { features } from "@/lib/features";

export const metadata: Metadata = {
  title: "Steun ons",
  description:
    "Een gift aan Stichting Kettingreactie gaat volledig naar de drie projecten in Bangalore. ANBI: giften zijn aftrekbaar. IBAN NL87 INGB 0005313860.",
};

export default function SteunOnsPage() {
  return (
    <>
      <Hero
        eyebrow="Katern · Steunen"
        title="Een gift komt zonder omwegen aan"
        subtitle="De stichting heeft geen kantoor en geen betaalde krachten; bestuursleden betalen hun eigen reizen. Wat u geeft, gaat naar Abayashram, het UWA-hostel en de ASHA Foundation."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Steun Ons", href: "/steun-ons" },
        ]}
      />

      <DonatieBedankt />

      {/* De ene, rustige doneer-route */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-t-2 border-rule pt-12 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-2">
            <p className="kicker text-magenta">Overmaken</p>
            <p className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-wide text-ink">
              NL87 INGB 0005313860
            </p>
            <p className="mt-2 font-serif text-lg text-ink-2">
              t.n.v. Stichting Kettingreactie Amsterdam
            </p>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink">
              Een eenmalige of periodieke overschrijving is de eenvoudigste
              manier om bij te dragen. Giften zijn aftrekbaar van de
              inkomstenbelasting; de stichting is ANBI-geregistreerd onder
              RSIN 821887300.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-7">
              <Link
                href="/belastingaftrek-schenkingen"
                className="link-editorial font-serif text-lg"
              >
                Hoe belastingaftrek werkt
              </Link>
              <a
                href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/anbi-status-controleren"
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial font-serif text-lg"
              >
                ANBI-status controleren
              </a>
            </div>
          </div>

          <aside className="lg:col-span-3 lg:col-start-9">
            <div className="border-t-2 border-rule pt-5">
              <p className="kicker text-ink-2">Kantlijn</p>
              <p className="mt-3 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                Jaarlijks legt de stichting verantwoording af over de
                besteding.{" "}
                <Link
                  href="/financieel-overzicht-2012"
                  className="link-editorial"
                >
                  De jaarcijfers staan hier
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>

      {features.mollieDonations && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 border-t-2 border-rule pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:col-start-2">
              <p className="kicker text-magenta">Online doneren</p>
              <h2 className="mt-3 font-display text-2xl font-medium text-ink">
                Via iDEAL
              </h2>
              <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-2">
                Betalingen lopen via een externe betaalprovider; wij slaan
                geen bank- of kaartgegevens op. Zie de{" "}
                <Link href="/privacyverklaring" className="link-editorial">
                  privacyverklaring
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-7">
              <DonateForm />
            </div>
          </div>
        </section>
      )}

      {/* Andere manieren — als katernregels, geen kaarten */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="folio">
          <p className="kicker text-magenta">Andere manieren om te steunen</p>
        </div>
        <ul>
          <li className="grid grid-cols-1 gap-4 border-b border-rule-soft py-8 lg:grid-cols-12 lg:gap-8">
            <h3 className="font-display text-xl font-semibold text-ink lg:col-span-3">
              SponsorKliks
            </h3>
            <div className="lg:col-span-6">
              <p className="font-serif text-[1.0625rem] leading-relaxed text-ink">
                Wie via{" "}
                <a
                  href="https://www.sponsorkliks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial"
                >
                  sponsorkliks.com
                </a>{" "}
                bij een aangesloten webshop bestelt, laat de webshop een
                percentage van het aankoopbedrag aan de stichting afdragen.
                De aankoop zelf wordt er niet duurder van.
              </p>
            </div>
            <div className="lg:col-span-2 lg:col-start-11">
              <Image
                src="/images/logos/sponsorkliks.png"
                alt="SponsorKliks"
                width={200}
                height={88}
                className="h-9 w-auto"
              />
            </div>
          </li>
          <li className="grid grid-cols-1 gap-4 border-b border-rule-soft py-8 lg:grid-cols-12 lg:gap-8">
            <h3 className="font-display text-xl font-semibold text-ink lg:col-span-3">
              Wilde Ganzen
            </h3>
            <div className="lg:col-span-6">
              <p className="font-serif text-[1.0625rem] leading-relaxed text-ink">
                Voor grotere projectinvesteringen werkt de stichting samen
                met Wilde Ganzen, dat kleinschalige projecten in
                ontwikkelingslanden meefinanciert en zo een ingezameld bedrag
                vergroot.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-8">
            <h3 className="font-display text-xl font-semibold text-ink lg:col-span-3">
              Tijd en kennis
            </h3>
            <div className="lg:col-span-6">
              <p className="font-serif text-[1.0625rem] leading-relaxed text-ink">
                Hulp hoeft niet financieel te zijn. Wie wil meedenken of
                meehelpen, in Nederland of in Bangalore, kan{" "}
                <Link href="/contact" className="link-editorial">
                  contact opnemen
                </Link>
                .
              </p>
            </div>
          </li>
        </ul>

        <p className="border-t-2 border-rule pt-6 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
          Donaties worden verwerkt conform de AVG. Wij bewaren alleen de
          gegevens die nodig zijn voor de fiscale bewaarplicht van zeven jaar
          en delen geen donateursinformatie met derden. Zie de{" "}
          <Link href="/privacyverklaring" className="link-editorial">
            privacyverklaring
          </Link>
          .
        </p>
      </section>
    </>
  );
}

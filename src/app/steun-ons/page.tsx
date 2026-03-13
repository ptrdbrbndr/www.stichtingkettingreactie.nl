import type { Metadata } from "next";
import Image from "next/image";
import {
  Heart,
  Landmark,
  Receipt,
  Handshake,
} from "lucide-react";
import Hero from "@/components/Hero";
import DonateForm from "@/components/DonateForm";
import DonatieBedankt from "./DonatieBedankt";
import { features } from "@/lib/features";

export const metadata: Metadata = {
  title: "Steun Ons - Stichting Kettingreactie",
  description:
    "Steun Stichting Kettingreactie met een donatie. Elke euro gaat 100% naar projecten voor kansarme vrouwen in India.",
};

export default function SteunOnsPage() {
  return (
    <>
      <Hero
        title="Steun Ons"
        subtitle="Elke bijdrage maakt een verschil voor kansarme vrouwen in India."
      />

      <DonatieBedankt />

      {/* Donatie info */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Online doneren via Mollie (feature toggle) */}
            {features.mollieDonations && (
              <div className="mb-12">
                <DonateForm />
              </div>
            )}

            {/* Doneren */}
            <div className="mb-12">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Doneren
                  </h2>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    U kunt Stichting Kettingreactie steunen door een donatie
                    over te maken naar onze bankrekening. Elke euro die u
                    doneert gaat 100% naar de projecten in India. Er worden
                    geen kosten ingehouden voor overhead of administratie.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary-700">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Bankgegevens
                    </h3>
                    <p className="mt-2 font-mono text-lg font-semibold text-primary-700">
                      NL87 INGB 0005313860
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      t.n.v. Stichting Kettingreactie Amsterdam
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      RSIN: <span className="font-mono font-medium">821887300</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SponsorKliks */}
            <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-6">
                <a
                  href="https://www.sponsorkliks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/logos/sponsorkliks.png"
                    alt="SponsorKliks logo"
                    width={400}
                    height={175}
                    className="w-48"
                  />
                </a>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    SponsorKliks
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    U kunt ons ook gratis steunen via SponsorKliks. Dit kost
                    u geen cent! Wanneer u via{" "}
                    <a
                      href="https://www.sponsorkliks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-700 underline hover:text-primary-800"
                    >
                      www.sponsorkliks.com
                    </a>{" "}
                    online winkelt bij bekende webshops, ontvangt Stichting
                    Kettingreactie een kleine vergoeding. Dit gaat niet ten
                    koste van uw eigen aankoop.
                  </p>
                </div>
              </div>
            </div>

            {/* Belastingaftrek */}
            <div className="mb-12 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Receipt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Belastingaftrek (ANBI)
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Stichting Kettingreactie heeft een ANBI-status (Algemeen
                    Nut Beogende Instelling). Dit betekent dat uw donaties
                    aftrekbaar zijn van de inkomstenbelasting. U kunt uw
                    giften opgeven in uw belastingaangifte, waardoor uw
                    donatie u effectief minder kost.
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    RSIN: <span className="font-mono font-medium">821887300</span>
                    {" · "}
                    <a
                      href="https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/anbi-status-controleren"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-700 underline hover:text-primary-800"
                    >
                      Controleer ANBI-status
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Wilde Ganzen */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <Handshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Samenwerking met Wilde Ganzen
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    Stichting Kettingreactie werkt samen met Wilde Ganzen.
                    Wilde Ganzen is een organisatie die kleinschalige
                    projecten in ontwikkelingslanden ondersteunt en kan
                    bijdragen aan de financiering van onze projecten.
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

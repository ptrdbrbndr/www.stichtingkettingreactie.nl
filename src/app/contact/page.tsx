import type { Metadata } from "next";
import { Mail, MapPin, Landmark } from "lucide-react";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contact - Stichting Kettingreactie",
  description:
    "Neem contact op met Stichting Kettingreactie. Wij beantwoorden graag uw vragen.",
};

export default function ContactPage() {
  return (
    <>
      <Hero title="Contact" subtitle="Wij horen graag van u." />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Neem contact met ons op
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Heeft u vragen over onze stichting, onze projecten of wilt u
                meer weten over hoe u ons kunt steunen? Neem gerust contact
                met ons op.
              </p>

              <div className="mt-8 space-y-6">
                {/* E-mail */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-mail</h3>
                    <a
                      href="mailto:info@stichtingkettingreactie.nl"
                      className="mt-1 text-primary-700 hover:text-primary-800 hover:underline"
                    >
                      info@stichtingkettingreactie.nl
                    </a>
                  </div>
                </div>

                {/* Locatie */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Locatie</h3>
                    <p className="mt-1 text-gray-600">Amsterdam, Nederland</p>
                  </div>
                </div>

                {/* Bankrekening */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Bankrekening
                    </h3>
                    <p className="mt-1 font-mono text-primary-700">
                      NL87 INGB 0005313860
                    </p>
                    <p className="text-sm text-gray-500">
                      t.n.v. Stichting Kettingreactie Amsterdam
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Over de stichting",
  description:
    "Stichting Kettingreactie is in 2007 opgericht en steunt drie projecten voor vrouwen in en rondom Bangalore. Het bestuur werkt onbetaald.",
};

export default function OverOnsPage() {
  return (
    <>
      <Hero
        eyebrow="Katern · Over ons"
        title="Een kleine stichting die precies weet waar het geld blijft"
        subtitle="Opgericht in 2007 na een bezoek aan de projecten rond Bangalore. Het bestuur werkt onbetaald en betaalt de projectreizen uit eigen zak."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Over Ons", href: "/over-ons" },
        ]}
      />

      <figure className="mx-auto max-w-[96rem]">
        <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden">
          <Image
            src="/images/algemeen/sytze-jelly-joby.jpg"
            alt="Bestuursleden Sytze en Jelly met Joby Varghese van Vision India"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="caption mx-4 sm:mx-6 lg:mx-8">
          Bestuursleden Sytze en Jelly met Joby Varghese van Vision India,
          tijdens een projectbezoek op eigen kosten.
        </figcaption>
      </figure>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              Hoe het begon
            </h2>
            <div className="mt-7 space-y-6 font-serif text-lg leading-relaxed text-ink">
              <p>
                De stichting is opgericht vanuit persoonlijke betrokkenheid.
                Na een bezoek aan de projecten in en rondom Bangalore ontstond
                het plan om vanuit Nederland structureel steun te organiseren
                voor drie lokale organisaties die daar al het werk deden:
                Abayashram, het UWA Working Women&apos;s Hostel en de ASHA
                Foundation.
              </p>
              <p>
                De naam verwijst naar wat we bij die projecten zagen: een
                bijdrage zet een reactie in gang die verder reikt dan de
                eerste ontvanger. Een bewoonster van het hostel die een
                inkomen verdient, ondersteunt daarmee haar familie in het
                dorp. Een moeder die op tijd wordt behandeld, krijgt een kind
                zonder HIV.
              </p>
              <p>
                De stichting is bewust klein gebleven. Er is geen kantoor en
                er zijn geen betaalde krachten; bestuursleden betalen hun
                reizen naar Bangalore zelf. Zo blijft er van elke gedoneerde
                euro niets aan de strijkstok hangen, en zien we ter plaatse
                wat er met het geld gebeurt.
              </p>
            </div>

            <h2 className="mt-14 border-t-2 border-rule pt-8 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              De drie projecten
            </h2>
            <ul className="mt-6">
              {[
                {
                  nummer: "I",
                  title: "Abayashram",
                  omschrijving:
                    "Opvanghuis voor circa 45 vrouwen met psychische problemen, Hoskote.",
                  href: "/projecten/abayashram",
                },
                {
                  nummer: "II",
                  title: "UWA Working Women's Hostel",
                  omschrijving:
                    "Veilige huisvesting voor jonge werkende vrouwen, Bangalore.",
                  href: "/projecten/uwa-hostel",
                },
                {
                  nummer: "III",
                  title: "ASHA Foundation",
                  omschrijving:
                    "ART-medicatie en PMTCT-programma voor HIV-positieve vrouwen, Bangalore.",
                  href: "/projecten/asha-foundation",
                },
              ].map((p) => (
                <li key={p.nummer} className="border-b border-rule-soft py-5">
                  <Link
                    href={p.href}
                    className="group grid grid-cols-12 items-baseline gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="col-span-1 font-serif text-2xl font-medium text-madder"
                    >
                      {p.nummer}
                    </span>
                    <span className="col-span-11 sm:col-span-4">
                      <span className="font-serif text-xl font-medium text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-ink">
                        {p.title}
                      </span>
                    </span>
                    <span className="col-span-11 col-start-2 font-serif text-[1.0625rem] text-ink-2 sm:col-span-7 sm:col-start-6">
                      {p.omschrijving}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="border-t-2 border-rule pt-5">
              <p className="kicker text-ink-2">In dit katern</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "Doelstelling", href: "/doelstelling" },
                  { label: "Missie", href: "/missie" },
                  { label: "Historie", href: "/onze-missie" },
                  { label: "Beleidsplan", href: "/beleidsplan" },
                  {
                    label: "Organisatie en bestuur",
                    href: "/samenstelling-bestuur",
                  },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-serif text-[1.0625rem] text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-rule-soft pt-4 font-serif text-[0.9375rem] leading-relaxed text-ink-2">
                Statutair gevestigd in Amsterdam.{" "}
                <span className="mark-turmeric text-ink">
                  ANBI, RSIN 821887300.
                </span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

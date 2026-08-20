import Link from "next/link";
import Image from "next/image";
import Schakel from "@/components/Schakel";

const katernen = [
  { label: "Over Ons", href: "/over-ons" },
  { label: "Projecten", href: "/projecten" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Steun Ons", href: "/steun-ons" },
  { label: "Verantwoording", href: "/verantwoording" },
  { label: "Contact", href: "/contact" },
];

const projectLinks = [
  { label: "Abayashram – Vision India", href: "/projecten/abayashram" },
  { label: "UWA Working Women's Hostel", href: "/projecten/uwa-hostel" },
  { label: "ASHA Foundation", href: "/projecten/asha-foundation" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="site-footer">
      {/* Verantwoordingsstrook — vast element boven het colofon */}
      <div className="border-t-2 border-rule bg-paper-3">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-5">
            <Image
              src="/images/logos/anbi-logo.svg"
              alt="ANBI, Algemeen Nut Beogende Instelling"
              width={120}
              height={60}
              className="h-12 w-auto shrink-0"
            />
            <p className="max-w-2xl font-serif text-[1.0625rem] leading-relaxed text-ink">
              Stichting Kettingreactie is een ANBI (RSIN 821887300). Het
              bestuur werkt onbetaald en betaalt reizen naar Bangalore uit
              eigen zak.{" "}
              <span className="mark-azure">
                Elke gedoneerde euro gaat naar de drie projecten.
              </span>
            </p>
          </div>
          <Link
            href="/financieel-overzicht-2012"
            className="kicker shrink-0 text-magenta underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            Jaarcijfers inzien
          </Link>
        </div>
      </div>

      {/* Colofon */}
      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 border-b border-paper/20 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="kicker text-paper/60">Stichting</p>
              <p className="mt-2 font-display text-xl font-bold uppercase leading-none tracking-[0.12em]">
                Kettingreactie
              </p>
              <span className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                <Schakel className="h-4 w-auto -rotate-45 text-azure-bright" />
                <Schakel className="h-4 w-auto -rotate-45 text-[#8b83e0]" />
                <Schakel className="h-4 w-auto -rotate-45 text-magenta-bright" />
              </span>
              <p className="mt-5 font-serif text-[0.9375rem] leading-relaxed text-paper/80">
                Steunt sinds 2007 drie projecten voor vrouwen in en rondom
                Bangalore, met fondsenwerving vanuit Nederland.
              </p>
              <p className="mt-4 font-serif text-[0.9375rem] text-paper/80">
                <a
                  href="mailto:info@stichtingkettingreactie.nl"
                  className="underline decoration-1 underline-offset-4 hover:text-paper"
                >
                  info@stichtingkettingreactie.nl
                </a>
                <br />
                Statutair gevestigd in Amsterdam
              </p>
            </div>

            <div>
              <p className="kicker mb-4 text-paper/60">Katernen</p>
              <ul className="space-y-2.5">
                {katernen.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-serif text-[1.0625rem] text-paper/85 underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="kicker mb-4 text-paper/60">De drie projecten</p>
              <ul className="space-y-2.5">
                {projectLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-serif text-[1.0625rem] text-paper/85 underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="kicker mb-4 text-paper/60">Giften</p>
              <p className="font-serif text-xl tracking-wide">
                NL87 INGB 0005313860
              </p>
              <p className="mt-1 font-serif text-[0.9375rem] text-paper/80">
                t.n.v. Stichting Kettingreactie Amsterdam
              </p>
              <p className="mt-4 font-serif text-[0.9375rem] leading-relaxed text-paper/80">
                Giften zijn aftrekbaar; de stichting is ANBI-geregistreerd
                onder RSIN 821887300.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 pt-6 sm:flex-row sm:items-baseline">
            <p className="kicker text-paper/50">
              © {currentYear} Stichting Kettingreactie
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link
                  href="/privacyverklaring"
                  className="kicker text-paper/50 hover:text-paper"
                >
                  Privacyverklaring
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-instellingen"
                  className="kicker text-paper/50 hover:text-paper"
                >
                  Cookie-instellingen
                </Link>
              </li>
              <li>
                <Link
                  href="/rsin"
                  className="kicker text-paper/50 hover:text-paper"
                >
                  ANBI &amp; RSIN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

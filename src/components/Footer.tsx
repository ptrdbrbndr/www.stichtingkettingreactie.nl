import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const snelkoppelingen = [
  { label: "Home", href: "/" },
  { label: "Over Ons", href: "/over-ons" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Steun Ons", href: "/steun-ons" },
  { label: "Verantwoording", href: "/verantwoording" },
];

const projectLinks = [
  { label: "Abayashram – Vision India", href: "/abayashram-vision-india-2" },
  { label: "UWA Working Women's Hostel", href: "/working-womens-hostel-uwa" },
  { label: "ASHA Foundation", href: "/hiv-positive-women-asha-foundation" },
  { label: "Alle projecten", href: "/projecten" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative overflow-hidden border-t-[3px] border-azure-500 bg-primary-800 text-primary-100"
    >
      {/* Subtle three-ring watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-32 opacity-[0.04] text-white"
      >
        <svg width="560" height="560" viewBox="0 0 100 100">
          <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* About column */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/logo-skr.png"
                alt="Stichting Kettingreactie"
                width={96}
                height={96}
                className="h-16 w-16 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-400">
                  Stichting
                </span>
                <span className="font-serif text-2xl font-bold text-white">
                  Kettingreactie
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-primary-200">
              Stichting Kettingreactie zet zich sinds 2007 in voor het
              verbeteren van de positie van kansarme vrouwen in India door
              lokale initiatieven in en rondom Bangalore te ondersteunen.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <Image
                src="/images/logos/anbi-logo.svg"
                alt="ANBI — Algemeen Nut Beogende Instelling"
                width={120}
                height={60}
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Snelkoppelingen column */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-azure-400">
              Snelkoppelingen
            </h3>
            <ul className="space-y-3">
              {snelkoppelingen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projecten column */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-azure-400">
              Projecten
            </h3>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + IBAN column */}
          <div className="space-y-5">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-azure-400">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-primary-200">
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" />
                  <Link
                    href="mailto:info@stichtingkettingreactie.nl"
                    className="transition-colors hover:text-accent-400"
                  >
                    info@stichtingkettingreactie.nl
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" />
                  <span>
                    Stichting Kettingreactie
                    <br />
                    Amsterdam, Nederland
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-azure-400">
                Rekeningnummer
              </p>
              <p className="font-mono text-sm font-semibold text-white">
                NL87 INGB 0005313860
              </p>
              <p className="mt-1 text-xs text-primary-300">
                t.n.v. Stichting Kettingreactie Amsterdam
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-primary-300 sm:flex-row">
            <p>
              &copy; {currentYear} Stichting Kettingreactie · Alle rechten
              voorbehouden
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacyverklaring"
                className="transition-colors hover:text-accent-400"
              >
                Privacyverklaring
              </Link>
              <Link
                href="/cookie-instellingen"
                className="transition-colors hover:text-accent-400"
              >
                Cookie-instellingen
              </Link>
              <Link
                href="/rsin"
                className="transition-colors hover:text-accent-400"
              >
                ANBI & RSIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

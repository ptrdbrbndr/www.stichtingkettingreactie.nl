import Link from "next/link";
import { Heart } from "lucide-react";

const navLinks = [
  { label: "Over Ons", href: "/over-ons" },
  { label: "Projecten", href: "/projecten" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Verantwoording", href: "/verantwoording" },
];

const steunLinks = [
  { label: "Doneren", href: "/steun-ons" },
  { label: "Verantwoording", href: "/verantwoording" },
  { label: "Leden-portal", href: "/leden" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-600">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Stichting Kettingreactie
              </span>
            </div>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Stichting Kettingreactie zet zich in voor het verbeteren van de
              positie van kansarme vrouwen in India door lokale initiatieven te ondersteunen.
            </p>
            <div className="flex items-center gap-3">
              <span className="rounded border border-gray-700 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                ANBI
              </span>
              <span className="text-xs text-gray-600">Erkend door de Belastingdienst</span>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
              Navigatie
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Steun & contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
              Steun & Contact
            </h3>
            <ul className="mb-5 space-y-2.5">
              {steunLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="mailto:info@stichtingkettingreactie.nl"
                  className="text-sm text-gray-400 transition-colors hover:text-primary-400"
                >
                  info@stichtingkettingreactie.nl
                </Link>
              </li>
            </ul>
            <div className="rounded-xl bg-gray-900 px-4 py-3">
              <p className="mb-0.5 text-xs text-gray-500">Bankrekening</p>
              <p className="font-mono text-sm font-semibold text-primary-400">
                NL87 INGB 0005313860
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-gray-600">
              &copy; {currentYear} Stichting Kettingreactie. Alle rechten voorbehouden.
            </p>
            <p className="flex items-center gap-1 text-xs text-gray-600">
              Gemaakt met <Heart className="inline h-3 w-3 text-primary-500" /> voor een betere wereld
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Link2, Heart } from "lucide-react";

const projectLinks = [
  { label: "Alle Projecten", href: "/projecten" },
  { label: "Onderwijs", href: "/projecten#onderwijs" },
  { label: "Gezondheidszorg", href: "/projecten#gezondheidszorg" },
  { label: "Empowerment", href: "/projecten#empowerment" },
];

const steunLinks = [
  { label: "Doneren", href: "/steun-ons" },
  { label: "Vrijwilliger worden", href: "/steun-ons#vrijwilliger" },
  { label: "Verantwoording", href: "/verantwoording" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Link2 className="h-6 w-6 text-primary-400" />
              <span className="text-lg font-bold text-white">
                Stichting Kettingreactie
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              Stichting Kettingreactie zet zich in voor de verbetering van het
              leven van vrouwen in India door onderwijs, gezondheidszorg en
              empowerment. Samen maken wij een verschil.
            </p>
            <p className="text-xs text-gray-500">
              ANBI-geregistreerde instelling
            </p>
          </div>

          {/* Projecten column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Projecten
            </h3>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
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

          {/* Steun Ons column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Steun Ons
            </h3>
            <ul className="space-y-2">
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
            </ul>
            <div className="mt-4 rounded-lg bg-gray-800 p-3">
              <p className="mb-1 text-xs font-medium text-gray-300">
                Bankrekening
              </p>
              <p className="font-mono text-sm text-primary-400">
                NL87 INGB 0005313860
              </p>
              <p className="mt-1 text-xs text-gray-500">
                t.n.v. Stichting Kettingreactie
              </p>
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="mailto:info@stichtingkettingreactie.nl"
                  className="transition-colors hover:text-primary-400"
                >
                  info@stichtingkettingreactie.nl
                </Link>
              </li>
              <li>
                <Link
                  href="/nieuws"
                  className="transition-colors hover:text-primary-400"
                >
                  Laatste nieuws
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} Stichting Kettingreactie. Alle rechten
              voorbehouden.
            </p>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              Gemaakt met{" "}
              <Heart className="inline h-3 w-3 text-primary-500" /> voor een
              betere wereld
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

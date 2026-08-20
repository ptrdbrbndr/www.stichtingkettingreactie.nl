import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/*
 * Typografie van het redesign (2026, v2):
 * - Schibsted Grotesk: moderne krantengrotesk met geometrische inslag, sluit
 *   aan op het kapitale KETTINGREACTIE-woordmerk. Voor koppen, nummering,
 *   labels, meta en navigatie.
 * - Newsreader: krantenserif met optische maten als rustige leesletter voor
 *   broodtekst en verslagen.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stichting Kettingreactie",
    template: "%s | Stichting Kettingreactie",
  },
  description:
    "Stichting Kettingreactie steunt sinds 2007 drie projecten voor vrouwen in en rondom Bangalore: Abayashram, het UWA Working Women's Hostel en de ASHA Foundation. ANBI-erkend; elke gedoneerde euro gaat naar de projecten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${newsreader.variable} ${grotesk.variable} bg-paper text-ink antialiased`}
      >
        <Header />
        <main id="inhoud" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

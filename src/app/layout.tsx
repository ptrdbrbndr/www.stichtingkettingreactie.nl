import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/*
 * Typografie van het redesign (2026, v3 — gekozen via letterproef):
 * Jost, een geometrische grotesk in de lijn van het KETTINGREACTIE-woordmerk.
 * Eén familie voor alles: koppen (600), broodtekst (400) en labels (600 caps).
 */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
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
        className={`${jost.variable} bg-paper text-ink antialiased`}
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

import type { Metadata } from "next";
import { Newsreader, Libre_Franklin } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/*
 * Typografie van het redesign (2026):
 * - Newsreader: krantenserif met optische maten — scherp en karaktervol op
 *   displayformaat, rustige leesletter op tekstformaat. Eén familie voor
 *   koppen én broodtekst, het optische-maat-as doet het werk.
 * - Libre Franklin: Franklin Gothic-erfgoed, de klassieke Amerikaanse
 *   krantengrotesk. Alleen voor labels, meta en navigatie in kapitaal.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const franklin = Libre_Franklin({
  variable: "--font-franklin",
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
        className={`${newsreader.variable} ${franklin.variable} bg-paper text-ink antialiased`}
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

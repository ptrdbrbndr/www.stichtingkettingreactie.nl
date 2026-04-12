import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Stichting Kettingreactie",
    template: "%s | Stichting Kettingreactie",
  },
  description:
    "Stichting Kettingreactie zet zich in voor de verbetering van het leven van kansarme vrouwen in India door lokale initiatieven in en rondom Bangalore te ondersteunen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${inter.variable} ${fraunces.variable} bg-cream text-ink antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

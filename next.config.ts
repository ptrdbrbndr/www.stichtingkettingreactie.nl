import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traefik/Cloudflare handles gzip — Next.js compression causes Content-Encoding mismatch via tunnel
  compress: false,

  transpilePackages: ["@ptrdbrbndr/cms"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flwdwnefhfjagibvjpqh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "supabase-stichtingkettingreactie.cyberductus.nl",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // Oude WP-projectpagina's -> de nieuwe projecthoofdstukken (redesign v3)
      { source: "/projecten/hiv-positive-women-asha-foundation", destination: "/projecten/asha-foundation", permanent: true },
      { source: "/projecten/working-womens-hostel-uwa", destination: "/projecten/uwa-hostel", permanent: true },
      { source: "/projecten/abayashram-vision-india-2", destination: "/projecten/abayashram", permanent: true },
      { source: "/hiv-positive-women-asha-foundation", destination: "/projecten/asha-foundation", permanent: true },
      { source: "/working-womens-hostel-uwa", destination: "/projecten/uwa-hostel", permanent: true },
      { source: "/abayashram-vision-india-2", destination: "/projecten/abayashram", permanent: true },
      // Hierarchische WP page paths -> flat slug routes (na migratie van WP naar Supabase pages)
      { source: "/welkom", destination: "/over-ons", permanent: true },
      { source: "/welkom/beleidsplan", destination: "/beleidsplan", permanent: true },
      { source: "/welkom/doelstelling", destination: "/doelstelling", permanent: true },
      { source: "/welkom/missie", destination: "/missie", permanent: true },
      { source: "/welkom/onze-missie", destination: "/onze-missie", permanent: true },
      { source: "/welkom/samenstelling-bestuur", destination: "/samenstelling-bestuur", permanent: true },
      { source: "/verantwoording/rsin", destination: "/rsin", permanent: true },
      { source: "/verantwoording/beloningsbeleid", destination: "/beloningsbeleid", permanent: true },
      { source: "/verantwoording/financieel-overzicht-2012", destination: "/financieel-overzicht-2012", permanent: true },
      { source: "/verantwoording/betaalwijze-2", destination: "/betaalwijze-2", permanent: true },
      { source: "/steun-ons-2", destination: "/steun-ons", permanent: true },
      { source: "/steun-ons-2/sponsorkliks", destination: "/sponsorkliks", permanent: true },
      { source: "/steun-ons-2/belastingaftrek-schenkingen", destination: "/belastingaftrek-schenkingen", permanent: true },
      { source: "/steun-ons-2/contactgegevens", destination: "/contactgegevens", permanent: true },
      { source: "/steun-ons-2/betaalwijze", destination: "/betaalwijze", permanent: true },
    ];
  },
};

export default nextConfig;

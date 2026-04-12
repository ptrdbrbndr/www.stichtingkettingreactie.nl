"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  Heart,
  Newspaper,
  FileText,
  ClipboardList,
  ArrowRight,
  LogOut,
} from "lucide-react";
import IssueReportButton from "@/components/IssueReportButton";
import IssueListPanel from "@/components/IssueListPanel";

export default function LedenDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIssues, setShowIssues] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/leden/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/leden/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name ?? user?.email ?? "Lid";
  const lidSinds = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const tiles = [
    {
      icon: Heart,
      title: "Doneren",
      body: "Steun onze projecten voor kansarme vrouwen in India.",
      href: "/steun-ons",
      cta: "Bekijk mogelijkheden",
    },
    {
      icon: Newspaper,
      title: "Laatste nieuws",
      body: "Blijf op de hoogte van onze projecten en activiteiten.",
      href: "/nieuws",
      cta: "Bekijk nieuws",
    },
    {
      icon: FileText,
      title: "Verantwoording",
      body: "Bekijk jaarverslagen en financiële verantwoording.",
      href: "/verantwoording",
      cta: "Bekijk documenten",
    },
  ];

  return (
    <>
      {/* Editorial hero */}
      <section className="relative overflow-hidden border-b border-line bg-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-primary-600 opacity-[0.04]"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="60" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-xs font-semibold text-ink-soft"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-accent-600">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-soft/50">
                ›
              </li>
              <li className="text-primary-600">Ledenportaal</li>
            </ol>
          </nav>
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
            Welkom terug
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1
              className="max-w-4xl font-serif text-4xl font-bold leading-[1.05] text-primary-600 sm:text-5xl lg:text-6xl"
              data-testid="leden-greeting"
            >
              Goedendag, {userName}
            </h1>
            <div className="flex items-center gap-3">
              <IssueReportButton source="leden" />
              <button
                type="button"
                data-testid="logout-btn"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-primary-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-200 hover:text-accent-600"
              >
                <LogOut className="h-4 w-4" />
                Uitloggen
              </button>
            </div>
          </div>
          {lidSinds && (
            <p className="mt-6 text-lg text-ink-soft">
              Uw persoonlijke ledenpagina van Stichting Kettingreactie · lid
              sinds {lidSinds}
            </p>
          )}
        </div>
      </section>

      {/* Action tiles */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              Snelkoppelingen
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary-600 sm:text-4xl">
              Waar wilt u naartoe?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-100 bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-primary-600">
                    {tile.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {tile.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent-600">
                    {tile.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}

            {/* Issues toggle tile */}
            <button
              type="button"
              data-testid="issues-tile"
              onClick={() => setShowIssues((v) => !v)}
              className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-azure-100 bg-azure-50 text-azure-600 transition-colors group-hover:bg-azure-500 group-hover:text-white">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold leading-snug text-primary-600">
                Openstaande meldingen
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                Bekijk welke problemen en suggesties al zijn ingediend.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent-600">
                {showIssues ? "Verberg lijst" : "Bekijk meldingen"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>

          {showIssues && (
            <div className="mt-10">
              <IssueListPanel />
            </div>
          )}
        </div>
      </section>

      {/* Account gegevens */}
      <section className="bg-cream-dark/50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-line bg-white p-8 shadow-sm sm:p-10">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-accent-600">
              Uw gegevens
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary-600 sm:text-3xl">
              Account­informatie
            </h2>
            <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Naam
                </dt>
                <dd className="mt-1 font-semibold text-primary-600">
                  {user?.user_metadata?.full_name ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  E-mail
                </dt>
                <dd className="mt-1 font-mono text-sm text-primary-600">
                  {user?.email ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Lid sinds
                </dt>
                <dd className="mt-1 text-primary-600">{lidSinds ?? "—"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

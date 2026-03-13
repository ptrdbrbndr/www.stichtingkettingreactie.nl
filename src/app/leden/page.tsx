"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Heart, Newspaper, FileText, ExternalLink } from "lucide-react";
import IssueReportButton from "@/components/IssueReportButton";

export default function LedenDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name ?? user?.email ?? "Lid";

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welkom, {userName}
            </h1>
            <p className="mt-1 text-gray-500">
              Uw persoonlijke ledenpagina van Stichting Kettingreactie
            </p>
          </div>
          <div className="flex items-center gap-3">
            <IssueReportButton source="leden" />
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Uitloggen
            </button>
          </div>
        </div>

        {/* Dashboard cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Donatie info */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Doneren</h2>
            <p className="mt-2 text-sm text-gray-500">
              Steun onze projecten voor kansarme vrouwen in India.
            </p>
            <Link
              href="/steun-ons"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
            >
              Bekijk mogelijkheden
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Nieuws */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Newspaper className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Laatste nieuws
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Blijf op de hoogte van onze projecten en activiteiten.
            </p>
            <Link
              href="/nieuws"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
            >
              Bekijk nieuws
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Verantwoording */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Verantwoording
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Bekijk jaarverslagen en financiële verantwoording.
            </p>
            <Link
              href="/verantwoording"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
            >
              Bekijk documenten
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Account info */}
        <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Uw gegevens
          </h2>
          <dl className="space-y-3">
            <div className="flex gap-4">
              <dt className="w-32 shrink-0 text-sm font-medium text-gray-500">
                Naam
              </dt>
              <dd className="text-sm text-gray-900">
                {user?.user_metadata?.full_name ?? "-"}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-32 shrink-0 text-sm font-medium text-gray-500">
                E-mail
              </dt>
              <dd className="text-sm text-gray-900">{user?.email ?? "-"}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-32 shrink-0 text-sm font-medium text-gray-500">
                Lid sinds
              </dt>
              <dd className="text-sm text-gray-900">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

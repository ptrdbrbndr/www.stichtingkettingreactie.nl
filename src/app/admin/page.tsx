"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getArticleCount } from "@ptrdbrbndr/cms";
import { Plus, ExternalLink } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const supabase = createClient();
        const [total, published, draft] = await Promise.all([
          getArticleCount(supabase),
          getArticleCount(supabase, "published"),
          getArticleCount(supabase, "draft"),
        ]);
        setStats({ total, published, draft });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Totaal berichten", value: stats.total, color: "bg-blue-500" },
    { label: "Gepubliceerd", value: stats.published, color: "bg-green-500" },
    { label: "Concept", value: stats.draft, color: "bg-gray-400" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="p-6">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {loading ? (
                  <span className="inline-block h-8 w-16 animate-pulse rounded bg-gray-200" />
                ) : (
                  card.value
                )}
              </p>
            </div>
            <div className={`h-1 ${card.color}`} />
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Snelle acties
      </h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
        >
          <Plus className="h-4 w-4" />
          Nieuw bericht
        </Link>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ExternalLink className="h-4 w-4" />
          Bekijk site
        </Link>
      </div>
    </div>
  );
}

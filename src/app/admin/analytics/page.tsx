"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getPopularArticles, getTotalViews } from "@ptrdbrbndr/cms";
import type { ArticleStats } from "@ptrdbrbndr/cms";
import Link from "next/link";
import { TrendingUp, Eye, BarChart2, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const [popular, setPopular] = useState<ArticleStats[]>([]);
  const [totalViews30, setTotalViews30] = useState(0);
  const [totalViews7, setTotalViews7] = useState(0);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<7 | 30>(30);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        const [popularData, views30, views7] = await Promise.all([
          getPopularArticles(supabase, { days: period, limit: 10 }),
          getTotalViews(supabase, 30),
          getTotalViews(supabase, 7),
        ]);
        setPopular(popularData);
        setTotalViews30(views30);
        setTotalViews7(views7);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [period]);

  const maxViews = popular[0]?.total_views ?? 1;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
          {([7, 30] as const).map((days) => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              data-testid={`period-${days}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                period === days ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {days} dagen
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Eye className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-gray-500">Weergaven (30 dagen)</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? <span className="inline-block h-8 w-16 animate-pulse rounded bg-gray-200" /> : totalViews30.toLocaleString("nl-NL")}
            </p>
          </div>
          <div className="h-1 bg-blue-500" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-gray-500">Weergaven (7 dagen)</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? <span className="inline-block h-8 w-16 animate-pulse rounded bg-gray-200" /> : totalViews7.toLocaleString("nl-NL")}
            </p>
          </div>
          <div className="h-1 bg-green-500" />
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                <BarChart2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-gray-500">Populaire artikelen</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? <span className="inline-block h-8 w-16 animate-pulse rounded bg-gray-200" /> : popular.length}
            </p>
          </div>
          <div className="h-1 bg-pink-500" />
        </div>
      </div>

      {/* Popular articles */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900">
            Populaire artikelen — afgelopen {period} dagen
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
          </div>
        ) : popular.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            <Eye className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            Nog geen weergavegegevens beschikbaar.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {popular.map((stat, index) => (
              <div key={stat.article_id} data-testid="analytics-row" className="flex items-center gap-4 px-6 py-4">
                <span className="w-6 text-center text-sm font-bold text-gray-400">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/nieuws/${stat.slug}`}
                    target="_blank"
                    className="text-sm font-medium text-gray-900 hover:text-pink-600 truncate block"
                  >
                    {stat.title}
                  </Link>
                  <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-pink-400"
                      style={{ width: `${(stat.total_views / maxViews) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900">{stat.total_views.toLocaleString("nl-NL")}</p>
                  <p className="text-xs text-gray-400">weergaven</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

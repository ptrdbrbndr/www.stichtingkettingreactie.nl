"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getIssues } from "@ptrdbrbndr/cms";
import type { Issue, IssueCategory, IssuePriority, IssueStatus } from "@ptrdbrbndr/cms";
import { Search, X } from "lucide-react";

const categoryLabels: Record<IssueCategory, string> = {
  bug: "Bug / Fout",
  inhoud: "Inhoud klopt niet",
  technisch: "Technisch probleem",
  toegang: "Toegang / inlogprobleem",
  suggestie: "Suggestie",
  overig: "Overig",
};

const categoryColors: Record<IssueCategory, string> = {
  bug: "bg-red-100 text-red-700",
  inhoud: "bg-yellow-100 text-yellow-700",
  technisch: "bg-blue-100 text-blue-700",
  toegang: "bg-purple-100 text-purple-700",
  suggestie: "bg-green-100 text-green-700",
  overig: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<IssueStatus, string> = {
  open: "Open",
  in_behandeling: "In behandeling",
  opgelost: "Opgelost",
  gesloten: "Gesloten",
};

const statusColors: Record<IssueStatus, string> = {
  open: "bg-red-100 text-red-700",
  in_behandeling: "bg-yellow-100 text-yellow-700",
  opgelost: "bg-green-100 text-green-700",
  gesloten: "bg-gray-100 text-gray-600",
};

const priorityLabels: Record<IssuePriority, string> = {
  laag: "Laag",
  normaal: "Normaal",
  hoog: "Hoog",
  kritiek: "Kritiek",
};

const priorityColors: Record<IssuePriority, string> = {
  laag: "bg-gray-100 text-gray-500",
  normaal: "bg-blue-100 text-blue-600",
  hoog: "bg-orange-100 text-orange-700",
  kritiek: "bg-red-100 text-red-700",
};

const priorityOrder: Record<IssuePriority, number> = {
  kritiek: 4,
  hoog: 3,
  normaal: 2,
  laag: 1,
};

type SortOption = "nieuwste" | "oudste" | "prioriteit";

const sortLabels: Record<SortOption, string> = {
  nieuwste: "Nieuwste eerst",
  oudste: "Oudste eerst",
  prioriteit: "Hoogste prioriteit",
};

const ALL = "alle";

export default function IssueListPanel() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<IssueStatus | typeof ALL>("open");
  const [filterCategory, setFilterCategory] = useState<IssueCategory | typeof ALL>(ALL);
  const [filterPriority, setFilterPriority] = useState<IssuePriority | typeof ALL>(ALL);
  const [sort, setSort] = useState<SortOption>("nieuwste");

  useEffect(() => {
    const supabase = createClient();
    // Laad alle statussen zodat leden ook opgeloste meldingen kunnen bekijken
    getIssues(supabase, { limit: 200 })
      .then(({ issues }) => setIssues(issues))
      .catch(() => setError("Kon de meldingen niet laden."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = issues;

    if (filterStatus !== ALL) {
      result = result.filter((i) => i.status === filterStatus);
    }
    if (filterCategory !== ALL) {
      result = result.filter((i) => i.category === filterCategory);
    }
    if (filterPriority !== ALL) {
      result = result.filter((i) => i.priority === filterPriority);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => {
      if (sort === "oudste") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sort === "prioriteit") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [issues, filterStatus, filterCategory, filterPriority, search, sort]);

  const hasActiveFilters =
    filterStatus !== "open" ||
    filterCategory !== ALL ||
    filterPriority !== ALL ||
    search.trim() !== "";

  const resetFilters = () => {
    setSearch("");
    setFilterStatus("open");
    setFilterCategory(ALL);
    setFilterPriority(ALL);
    setSort("nieuwste");
  };

  if (loading) {
    return (
      <div
        data-testid="issue-list-panel"
        className="mt-6 flex items-center justify-center py-12"
      >
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="issue-list-panel"
        className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600"
      >
        {error}
      </div>
    );
  }

  return (
    <div
      data-testid="issue-list-panel"
      className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Openstaande meldingen
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Controleer of uw bevinding al is ingediend voordat u een nieuwe
              melding doet.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {filtered.length} van {issues.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-50 bg-gray-50/50 px-6 py-4">
        <div className="flex flex-wrap gap-3">
          {/* Zoeken */}
          <div className="relative min-w-48 flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Zoek in meldingen..."
              data-testid="issue-filter-search"
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
            />
          </div>

          {/* Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as IssueStatus | typeof ALL)}
            data-testid="issue-filter-status"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          >
            <option value={ALL}>Alle statussen</option>
            {(Object.entries(statusLabels) as [IssueStatus, string][]).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>

          {/* Categorie */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as IssueCategory | typeof ALL)}
            data-testid="issue-filter-category"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          >
            <option value={ALL}>Alle onderwerpen</option>
            {(Object.entries(categoryLabels) as [IssueCategory, string][]).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>

          {/* Prioriteit */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as IssuePriority | typeof ALL)}
            data-testid="issue-filter-priority"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          >
            <option value={ALL}>Alle prioriteiten</option>
            {(Object.entries(priorityLabels) as [IssuePriority, string][]).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>

          {/* Sortering */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            data-testid="issue-filter-sort"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          >
            {(Object.entries(sortLabels) as [SortOption, string][]).map(
              ([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            )}
          </select>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <X className="h-3.5 w-3.5" />
              Wis filters
            </button>
          )}
        </div>
      </div>

      {/* Lijst */}
      {filtered.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-gray-400">
          {issues.length === 0
            ? "Er zijn momenteel geen meldingen."
            : "Geen meldingen gevonden voor de geselecteerde filters."}
        </div>
      ) : (
        <ul data-testid="issue-list" className="divide-y divide-gray-50">
          {filtered.map((issue) => (
            <li key={issue.id} className="px-6 py-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p
                    data-testid="issue-list-title"
                    className="text-sm font-medium text-gray-900"
                  >
                    {issue.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {issue.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5">
                  <span
                    data-testid="issue-list-category"
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[issue.category]}`}
                  >
                    {categoryLabels[issue.category]}
                  </span>
                  <span
                    data-testid="issue-list-status"
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[issue.status]}`}
                  >
                    {statusLabels[issue.status]}
                  </span>
                  {issue.priority !== "normaal" && (
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[issue.priority]}`}
                    >
                      {priorityLabels[issue.priority]}
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-1.5 text-xs text-gray-400">
                Ingediend op{" "}
                {new Date(issue.created_at).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

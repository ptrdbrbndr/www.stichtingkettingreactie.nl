"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getIssues } from "@ptrdbrbndr/cms";
import type { Issue, IssueCategory, IssueStatus } from "@ptrdbrbndr/cms";

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

export default function IssueListPanel() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    getIssues(supabase, {
      status: ["open", "in_behandeling"],
      limit: 50,
    })
      .then(({ issues }) => setIssues(issues))
      .catch(() => setError("Kon de meldingen niet laden."))
      .finally(() => setLoading(false));
  }, []);

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
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Openstaande meldingen
        </h2>
        <p className="mt-0.5 text-sm text-gray-500">
          Controleer of uw bevinding al is ingediend voordat u een nieuwe melding
          doet.
        </p>
      </div>

      {issues.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-gray-400">
          Er zijn momenteel geen openstaande meldingen.
        </div>
      ) : (
        <ul data-testid="issue-list" className="divide-y divide-gray-50">
          {issues.map((issue) => (
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
                <div className="flex shrink-0 flex-wrap gap-2">
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

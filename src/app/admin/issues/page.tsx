"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getIssues, updateIssue, deleteIssue } from "@ptrdbrbndr/cms";
import type { Issue, IssueStatus, IssuePriority, IssueCategory } from "@ptrdbrbndr/cms";
import { AlertCircle, Search, Filter, Trash2, ChevronDown, ChevronUp, Check } from "lucide-react";

const statusConfig: Record<IssueStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-red-100 text-red-700" },
  in_behandeling: { label: "In behandeling", className: "bg-yellow-100 text-yellow-700" },
  opgelost: { label: "Opgelost", className: "bg-green-100 text-green-700" },
  gesloten: { label: "Gesloten", className: "bg-gray-100 text-gray-600" },
};

const priorityConfig: Record<IssuePriority, { label: string; className: string }> = {
  laag: { label: "Laag", className: "bg-gray-100 text-gray-600" },
  normaal: { label: "Normaal", className: "bg-blue-100 text-blue-700" },
  hoog: { label: "Hoog", className: "bg-orange-100 text-orange-700" },
  kritiek: { label: "Kritiek", className: "bg-red-100 text-red-700" },
};

const categoryLabels: Record<IssueCategory, string> = {
  bug: "Bug",
  inhoud: "Inhoud",
  technisch: "Technisch",
  toegang: "Toegang",
  suggestie: "Suggestie",
  overig: "Overig",
};

export default function IssuesAdminPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "">("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingPriority, setUpdatingPriority] = useState<string | null>(null);
  const [updatingCategory, setUpdatingCategory] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  const fetchIssues = async () => {
    try {
      const supabase = createClient();
      const result = await getIssues(supabase, {
        status: statusFilter || undefined,
        search: search || undefined,
        limit: 100,
      });
      setIssues(result.issues);
      setTotal(result.total);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [search, statusFilter]);

  const handleStatusChange = async (id: string, status: IssueStatus) => {
    setUpdatingStatus(id);
    try {
      const supabase = createClient();
      await updateIssue(supabase, id, { status });
      setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      console.error("Failed to update issue:", err);
      alert("Status bijwerken mislukt.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handlePriorityChange = async (id: string, priority: IssuePriority) => {
    setUpdatingPriority(id);
    try {
      const supabase = createClient();
      await updateIssue(supabase, id, { priority });
      setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, priority } : i)));
    } catch (err) {
      console.error("Failed to update priority:", err);
      alert("Prioriteit bijwerken mislukt.");
    } finally {
      setUpdatingPriority(null);
    }
  };

  const handleCategoryChange = async (id: string, category: IssueCategory) => {
    setUpdatingCategory(id);
    try {
      const supabase = createClient();
      await supabase.from("issues").update({ category }).eq("id", id);
      setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, category } : i)));
    } catch (err) {
      console.error("Failed to update category:", err);
      alert("Onderwerp bijwerken mislukt.");
    } finally {
      setUpdatingCategory(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const supabase = createClient();
      await updateIssue(supabase, id, { admin_notes: adminNotes[id] ?? null });
      setIssues((prev) =>
        prev.map((i) => (i.id === id ? { ...i, admin_notes: adminNotes[id] ?? null } : i))
      );
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  const handleDelete = async (issue: Issue) => {
    if (!confirm(`Weet je zeker dat je issue "${issue.title}" wilt verwijderen?`)) return;
    setDeleting(issue.id);
    try {
      const supabase = createClient();
      await deleteIssue(supabase, issue.id);
      setIssues((prev) => prev.filter((i) => i.id !== issue.id));
    } catch (err) {
      console.error("Failed to delete issue:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const openCount = issues.filter((i) => i.status === "open").length;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
            {openCount > 0 && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                {openCount} open
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{total} meldingen in totaal</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Zoeken..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="issues-search"
            className="w-48 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as IssueStatus | "")}
          data-testid="issues-status-filter"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
        >
          <option value="">Alle statussen</option>
          {(Object.entries(statusConfig) as [IssueStatus, typeof statusConfig[IssueStatus]][]).map(([value, cfg]) => (
            <option key={value} value={value}>{cfg.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : issues.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-gray-300" />
          <p className="text-gray-500">Geen issues gevonden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => {
            const isExpanded = expanded === issue.id;
            const status = statusConfig[issue.status];
            const priority = priorityConfig[issue.priority];

            return (
              <div
                key={issue.id}
                data-testid="issue-row"
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {/* Summary row */}
                <div
                  className="flex cursor-pointer items-center gap-4 px-5 py-4 hover:bg-gray-50"
                  onClick={() => {
                    setExpanded(isExpanded ? null : issue.id);
                    if (!adminNotes[issue.id]) {
                      setAdminNotes((prev) => ({ ...prev, [issue.id]: issue.admin_notes ?? "" }));
                    }
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                        {status.label}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priority.className}`}>
                        {priority.label}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                        {categoryLabels[issue.category]}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                        {issue.source}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {issue.reporter_name ?? "Anoniem"} · {formatDate(issue.created_at)}
                      {issue.page_url && ` · ${issue.page_url}`}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-5 space-y-5 bg-gray-50">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Beschrijving</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{issue.description}</p>
                    </div>

                    {issue.reporter_email && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">E-mail melder</p>
                        <a href={`mailto:${issue.reporter_email}`} className="text-sm text-pink-600 hover:underline">
                          {issue.reporter_email}
                        </a>
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">Status</label>
                        <select
                          value={issue.status}
                          onChange={(e) => handleStatusChange(issue.id, e.target.value as IssueStatus)}
                          disabled={updatingStatus === issue.id}
                          data-testid="admin-issue-status"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50"
                        >
                          {(Object.entries(statusConfig) as [IssueStatus, typeof statusConfig[IssueStatus]][]).map(([value, cfg]) => (
                            <option key={value} value={value}>{cfg.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">Prioriteit</label>
                        <select
                          value={issue.priority}
                          onChange={(e) => handlePriorityChange(issue.id, e.target.value as IssuePriority)}
                          disabled={updatingPriority === issue.id}
                          data-testid="admin-issue-priority"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50"
                        >
                          {(Object.entries(priorityConfig) as [IssuePriority, typeof priorityConfig[IssuePriority]][]).map(([value, cfg]) => (
                            <option key={value} value={value}>{cfg.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">Onderwerp</label>
                        <select
                          value={issue.category}
                          onChange={(e) => handleCategoryChange(issue.id, e.target.value as IssueCategory)}
                          disabled={updatingCategory === issue.id}
                          data-testid="admin-issue-category"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none disabled:opacity-50"
                        >
                          {(Object.entries(categoryLabels) as [IssueCategory, string][]).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">Admin aantekeningen</label>
                      <textarea
                        value={adminNotes[issue.id] ?? ""}
                        onChange={(e) => setAdminNotes((prev) => ({ ...prev, [issue.id]: e.target.value }))}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                        placeholder="Interne notities..."
                      />
                      <button
                        onClick={() => handleSaveNotes(issue.id)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Notitie opslaan
                      </button>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-gray-200">
                      <button
                        onClick={() => handleDelete(issue)}
                        disabled={deleting === issue.id}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deleting === issue.id ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Verwijderen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

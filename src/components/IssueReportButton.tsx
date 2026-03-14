"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createIssue } from "@ptrdbrbndr/cms";
import type { IssueCategory, IssuePriority } from "@ptrdbrbndr/cms";
import { AlertCircle, X, Send, Check } from "lucide-react";

interface IssueReportButtonProps {
  source: "admin" | "leden";
}

const categoryLabels: Record<IssueCategory, string> = {
  bug: "Bug / Fout",
  inhoud: "Inhoud klopt niet",
  technisch: "Technisch probleem",
  toegang: "Toegang / inlogprobleem",
  suggestie: "Suggestie",
  overig: "Overig",
};

const priorityLabels: Record<IssuePriority, string> = {
  laag: "Laag — kleine storing, geen haast",
  normaal: "Normaal — werkt niet zoals verwacht",
  hoog: "Hoog — belemmert mijn gebruik",
  kritiek: "Kritiek — volledig geblokkeerd",
};

export default function IssueReportButton({ source }: IssueReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IssueCategory>("bug");
  const [priority, setPriority] = useState<IssuePriority>("normaal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory("bug");
    setPriority("normaal");
    setName("");
    setEmail("");
    setError(null);
    setSent(false);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSending(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      await createIssue(supabase, {
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        reporter_name: name.trim() || null,
        reporter_email: email.trim() || null,
        reporter_user_id: user?.id ?? null,
        source,
        page_url: typeof window !== "undefined" ? window.location.pathname : null,
      });

      setSent(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err) {
      console.error("Failed to submit issue:", err);
      setError("Verzenden mislukt. Probeer het opnieuw.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-testid="report-issue-btn"
        className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-600"
        title="Meld een probleem"
      >
        <AlertCircle className="h-4 w-4" />
        Probleem melden
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl"
            data-testid="issue-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <h2 className="text-base font-semibold text-gray-900">Probleem melden</h2>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {sent ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Bedankt!</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Je melding is ontvangen. We nemen dit zo snel mogelijk in behandeling.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Naam (optioneel)</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                        placeholder="Jouw naam"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">E-mail (optioneel)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        placeholder="jouw@email.nl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Onderwerp</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as IssueCategory)}
                        data-testid="issue-category"
                        className={inputClass}
                      >
                        {(Object.entries(categoryLabels) as [IssueCategory, string][]).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Ernst</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as IssuePriority)}
                        data-testid="issue-priority"
                        className={inputClass}
                      >
                        {(Object.entries(priorityLabels) as [IssuePriority, string][]).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Titel *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      data-testid="issue-title"
                      className={inputClass}
                      placeholder="Korte beschrijving van het probleem"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Beschrijving *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      data-testid="issue-description"
                      className={inputClass}
                      placeholder="Beschrijf het probleem zo duidelijk mogelijk. Wat gebeurde er? Wat verwachtte je?"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Annuleren
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      data-testid="submit-issue-btn"
                      className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                    >
                      {sending ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Versturen
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getPages, deletePage } from "@ptrdbrbndr/cms";
import type { Page } from "@ptrdbrbndr/cms";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

export default function PagesAdminPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      const supabase = createClient();
      const data = await getPages(supabase, { includeDrafts: true });
      setPages(data);
    } catch (err) {
      console.error("Failed to fetch pages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (page: Page) => {
    if (!confirm(`Weet je zeker dat je "${page.title}" wilt verwijderen?`)) return;
    setDeleting(page.id);
    try {
      const supabase = createClient();
      await deletePage(supabase, page.id);
      setPages((prev) => prev.filter((p) => p.id !== page.id));
    } catch (err) {
      console.error("Failed to delete page:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pagina&apos;s</h1>
        <Link
          href="/admin/pages/new"
          data-testid="new-page-btn"
          className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
        >
          <Plus className="h-4 w-4" />
          Nieuwe pagina
        </Link>
      </div>

      <p className="mb-6 text-sm text-gray-500">
        Beheer de statische pagina&apos;s van de website. Gebruik de editor om de inhoud aan te passen zonder code-deployment.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <p className="text-gray-500">Nog geen pagina&apos;s.</p>
          <Link
            href="/admin/pages/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700"
          >
            <Plus className="h-4 w-4" />
            Maak je eerste pagina
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Pagina</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">URL</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Bijgewerkt</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {pages.map((page) => (
                <tr key={page.id} data-testid="page-row" className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{page.title}</p>
                    {page.subtitle && (
                      <p className="text-xs text-gray-400 truncate max-w-xs">{page.subtitle}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-500 font-mono">/{page.slug}</span>
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      page.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {page.status === "published" ? "Gepubliceerd" : "Concept"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(page.updated_at).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/pages/${page.id}/edit`)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        title="Bewerken"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(page)}
                        disabled={deleting === page.id}
                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="Verwijderen"
                      >
                        {deleting === page.id ? (
                          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

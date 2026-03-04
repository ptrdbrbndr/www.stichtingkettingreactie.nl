"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getArticles, deleteArticle } from "@ptrdbrbndr/cms";
import type { Article } from "@ptrdbrbndr/cms";
import { Plus, Pencil, Trash2 } from "lucide-react";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: {
    label: "Concept",
    className: "bg-gray-100 text-gray-700",
  },
  published: {
    label: "Gepubliceerd",
    className: "bg-green-100 text-green-700",
  },
  archived: {
    label: "Gearchiveerd",
    className: "bg-yellow-100 text-yellow-700",
  },
  scheduled: {
    label: "Ingepland",
    className: "bg-blue-100 text-blue-700",
  },
};

export default function PostsPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const supabase = createClient();
      const { articles: data } = await getArticles(supabase, {
        orderBy: "created_at",
        orderDirection: "desc",
        limit: 100,
      });
      setArticles(data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Weet je zeker dat je "${title}" wilt verwijderen?`)) return;

    setDeleting(id);
    try {
      const supabase = createClient();
      await deleteArticle(supabase, id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Verwijderen mislukt. Probeer het opnieuw.");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Berichten</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
        >
          <Plus className="h-4 w-4" />
          Nieuw bericht
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <p className="text-gray-500">Nog geen berichten.</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700"
          >
            <Plus className="h-4 w-4" />
            Maak je eerste bericht
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Titel
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Datum
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Acties
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {articles.map((article) => {
                const status = statusConfig[article.status] ?? {
                  label: article.status,
                  className: "bg-gray-100 text-gray-700",
                };
                return (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-400">{article.slug}</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDate(
                        article.published_at ?? article.created_at
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/posts/${article.id}/edit`)
                          }
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          title="Bewerken"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(article.id, article.title)
                          }
                          disabled={deleting === article.id}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          title="Verwijderen"
                        >
                          {deleting === article.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  slugify,
} from "@ptrdbrbndr/cms";
import type { Category } from "@ptrdbrbndr/cms";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // New category form
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchCategories = async () => {
    try {
      const supabase = createClient();
      const cats = await getCategories(supabase);
      setCategories(cats);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await createCategory(supabase, {
        name: newName.trim(),
        slug: newSlug.trim() || slugify(newName),
        description: newDesc.trim() || null,
      });
      setNewName("");
      setNewSlug("");
      setNewDesc("");
      await fetchCategories();
    } catch (err) {
      console.error("Failed to create category:", err);
      alert("Aanmaken mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (cat: Category) => {
    setEditing(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditDesc(cat.description ?? "");
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const supabase = createClient();
      await updateCategory(supabase, id, {
        name: editName.trim(),
        slug: editSlug.trim(),
        description: editDesc.trim() || null,
      });
      setEditing(null);
      await fetchCategories();
    } catch (err) {
      console.error("Failed to update category:", err);
      alert("Opslaan mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Weet je zeker dat je "${cat.name}" wilt verwijderen?`)) return;
    setDeleting(cat.id);
    try {
      const supabase = createClient();
      await deleteCategory(supabase, cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Categorieën</h1>

      {/* New category form */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Nieuwe categorie</h2>
        <form onSubmit={handleCreate} className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Naam *"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setNewSlug(slugify(e.target.value));
            }}
            required
            data-testid="new-category-name"
            className="flex-1 min-w-[160px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
          <input
            type="text"
            placeholder="Slug"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            data-testid="new-category-slug"
            className="flex-1 min-w-[160px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
          <input
            type="text"
            placeholder="Beschrijving (optioneel)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="flex-1 min-w-[200px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          />
          <button
            type="submit"
            disabled={saving}
            data-testid="save-category-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Toevoegen
          </button>
        </form>
      </div>

      {/* Categories list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <p className="text-gray-500">Nog geen categorieën.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Naam</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Beschrijving</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {categories.map((cat) =>
                editing === cat.id ? (
                  <tr key={cat.id} className="bg-pink-50">
                    <td className="px-6 py-3">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          disabled={saving}
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={cat.id} data-testid="category-row" className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{cat.slug}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{cat.description ?? "-"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(cat)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          disabled={deleting === cat.id}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

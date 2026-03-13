"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getNavigationItems,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
} from "@ptrdbrbndr/cms";
import type { NavigationItem, NavigationLocation } from "@ptrdbrbndr/cms";
import { Plus, Pencil, Trash2, Check, X, GripVertical, ExternalLink } from "lucide-react";

export default function NavigatieAdminPage() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationLocation>("header");

  // New item form
  const emptyForm = { label: "", href: "", open_in_new_tab: false, active: true };
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    try {
      const supabase = createClient();
      const data = await getNavigationItems(supabase, { includeInactive: true });
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch navigation items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = items.filter((i) => i.location === activeTab && !i.parent_id);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label.trim() || !form.href.trim()) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await createNavigationItem(supabase, {
        label: form.label.trim(),
        href: form.href.trim(),
        open_in_new_tab: form.open_in_new_tab,
        active: form.active,
        location: activeTab,
        sort_order: filtered.length,
      });
      setForm(emptyForm);
      setShowForm(false);
      await fetchItems();
    } catch (err) {
      console.error("Failed to create nav item:", err);
      alert("Aanmaken mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: NavigationItem) => {
    setEditing(item.id);
    setEditForm({
      label: item.label,
      href: item.href,
      open_in_new_tab: item.open_in_new_tab,
      active: item.active,
    });
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const supabase = createClient();
      await updateNavigationItem(supabase, id, {
        label: editForm.label.trim(),
        href: editForm.href.trim(),
        open_in_new_tab: editForm.open_in_new_tab,
        active: editForm.active,
      });
      setEditing(null);
      await fetchItems();
    } catch (err) {
      console.error("Failed to update nav item:", err);
      alert("Opslaan mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: NavigationItem) => {
    if (!confirm(`Weet je zeker dat je "${item.label}" wilt verwijderen?`)) return;
    setDeleting(item.id);
    try {
      const supabase = createClient();
      await deleteNavigationItem(supabase, item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error("Failed to delete nav item:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigatie</h1>
          <p className="mt-1 text-sm text-gray-500">Beheer de menu-items van de header en footer.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            data-testid="new-nav-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-700"
          >
            <Plus className="h-4 w-4" />
            Nieuw item
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1 w-fit">
        {(["header", "footer"] as NavigationLocation[]).map((loc) => (
          <button
            key={loc}
            onClick={() => { setActiveTab(loc); setShowForm(false); setEditing(null); }}
            data-testid={`tab-${loc}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === loc ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {loc === "header" ? "Header" : "Footer"}
            <span className="ml-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs">
              {items.filter((i) => i.location === loc).length}
            </span>
          </button>
        ))}
      </div>

      {/* New item form */}
      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 rounded-xl border border-pink-200 bg-pink-50 p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-800">Nieuw menu-item ({activeTab})</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Label *</label>
              <input type="text" value={form.label} onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))} required className={inputClass} placeholder="Over ons" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">URL *</label>
              <input type="text" value={form.href} onChange={(e) => setForm((p) => ({ ...p, href: e.target.value }))} required className={inputClass} placeholder="/over-ons" />
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.open_in_new_tab} onChange={(e) => setForm((p) => ({ ...p, open_in_new_tab: e.target.checked }))} className="rounded" />
                Nieuw tabblad
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} className="rounded" />
                Actief
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); }} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Annuleren
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50">
              <Plus className="h-4 w-4" />
              Toevoegen
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <p className="text-gray-500">Geen menu-items in {activeTab}.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 px-4 py-3" />
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Label</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">URL</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Opties</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.map((item) =>
                editing === item.id ? (
                  <tr key={item.id} className="bg-pink-50">
                    <td className="px-4 py-3">
                      <GripVertical className="h-4 w-4 text-gray-300" />
                    </td>
                    <td className="px-6 py-3">
                      <input value={editForm.label} onChange={(e) => setEditForm((p) => ({ ...p, label: e.target.value }))} className="w-full rounded border border-gray-300 px-2 py-1 text-sm" />
                    </td>
                    <td className="px-6 py-3">
                      <input value={editForm.href} onChange={(e) => setEditForm((p) => ({ ...p, href: e.target.value }))} className="w-full rounded border border-gray-300 px-2 py-1 text-sm font-mono" />
                    </td>
                    <td className="px-6 py-3">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600">
                        <input type="checkbox" checked={editForm.open_in_new_tab} onChange={(e) => setEditForm((p) => ({ ...p, open_in_new_tab: e.target.checked }))} className="rounded" />
                        Nieuw tabblad
                      </label>
                    </td>
                    <td className="px-6 py-3">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600">
                        <input type="checkbox" checked={editForm.active} onChange={(e) => setEditForm((p) => ({ ...p, active: e.target.checked }))} className="rounded" />
                        Actief
                      </label>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleUpdate(item.id)} disabled={saving} className="rounded-lg p-2 text-green-600 hover:bg-green-50 disabled:opacity-50">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => setEditing(null)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.id} data-testid="nav-item-row" className={`hover:bg-gray-50 ${!item.active ? "opacity-60" : ""}`}>
                    <td className="px-4 py-4">
                      <GripVertical className="h-4 w-4 text-gray-300 cursor-grab" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.label}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-mono text-gray-500">{item.href}</span>
                        {item.open_in_new_tab && <ExternalLink className="h-3.5 w-3.5 text-gray-400" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {item.open_in_new_tab ? "Nieuw tabblad" : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${item.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {item.active ? "Actief" : "Verborgen"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(item)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deleting === item.id}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          {deleting === item.id ? (
                            <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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

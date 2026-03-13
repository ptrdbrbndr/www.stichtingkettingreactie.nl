"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@ptrdbrbndr/cms";
import type { TeamMember } from "@ptrdbrbndr/cms";
import { Plus, Pencil, Trash2, X, Check, GripVertical, Eye, EyeOff } from "lucide-react";

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const emptyForm = { name: "", role: "", bio: "", email: "", photo_url: "", active: true };
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);

  const fetchMembers = async () => {
    try {
      const supabase = createClient();
      const data = await getTeamMembers(supabase, { includeInactive: true });
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch team members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;
    setSaving(true);
    try {
      const supabase = createClient();
      await createTeamMember(supabase, {
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim() || null,
        email: form.email.trim() || null,
        photo_url: form.photo_url.trim() || null,
        active: form.active,
        sort_order: members.length,
      });
      setForm(emptyForm);
      setShowForm(false);
      await fetchMembers();
    } catch (err) {
      console.error("Failed to create team member:", err);
      alert("Aanmaken mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (member: TeamMember) => {
    setEditing(member.id);
    setEditForm({
      name: member.name,
      role: member.role,
      bio: member.bio ?? "",
      email: member.email ?? "",
      photo_url: member.photo_url ?? "",
      active: member.active,
    });
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const supabase = createClient();
      await updateTeamMember(supabase, id, {
        name: editForm.name.trim(),
        role: editForm.role.trim(),
        bio: editForm.bio.trim() || null,
        email: editForm.email.trim() || null,
        photo_url: editForm.photo_url.trim() || null,
        active: editForm.active,
      });
      setEditing(null);
      await fetchMembers();
    } catch (err) {
      console.error("Failed to update team member:", err);
      alert("Opslaan mislukt.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Weet je zeker dat je "${member.name}" wilt verwijderen?`)) return;
    setDeleting(member.id);
    try {
      const supabase = createClient();
      await deleteTeamMember(supabase, member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch (err) {
      console.error("Failed to delete team member:", err);
      alert("Verwijderen mislukt.");
    } finally {
      setDeleting(null);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";
  const labelClass = "mb-1 block text-xs font-medium text-gray-600";

  const MemberForm = ({
    values,
    onChange,
    onSubmit,
    onCancel,
    submitLabel,
  }: {
    values: typeof emptyForm;
    onChange: (key: string, value: string | boolean) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    submitLabel: string;
  }) => (
    <form onSubmit={onSubmit} className="rounded-xl border border-pink-200 bg-pink-50 p-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Naam *</label>
          <input type="text" value={values.name} onChange={(e) => onChange("name", e.target.value)} required className={inputClass} placeholder="Naam" />
        </div>
        <div>
          <label className={labelClass}>Functie *</label>
          <input type="text" value={values.role} onChange={(e) => onChange("role", e.target.value)} required className={inputClass} placeholder="Voorzitter, Penningmeester..." />
        </div>
        <div>
          <label className={labelClass}>E-mail</label>
          <input type="email" value={values.email} onChange={(e) => onChange("email", e.target.value)} className={inputClass} placeholder="naam@example.com" />
        </div>
        <div>
          <label className={labelClass}>Foto URL</label>
          <input type="url" value={values.photo_url} onChange={(e) => onChange("photo_url", e.target.value)} className={inputClass} placeholder="https://..." />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Bio</label>
          <textarea value={values.bio} onChange={(e) => onChange("bio", e.target.value)} rows={2} className={inputClass} placeholder="Korte introductie" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="active-check" checked={values.active} onChange={(e) => onChange("active", e.target.checked)} className="rounded border-gray-300" />
          <label htmlFor="active-check" className="text-sm text-gray-700">Zichtbaar op website</label>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-pink-200">
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Annuleren
        </button>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:opacity-50">
          {saving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Check className="h-4 w-4" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team / Bestuur</h1>
          <p className="mt-1 text-sm text-gray-500">Beheer de bestuursleden die op de website worden getoond.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            data-testid="new-member-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-pink-700"
          >
            <Plus className="h-4 w-4" />
            Nieuw lid
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <MemberForm
            values={form}
            onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
            onSubmit={handleCreate}
            onCancel={() => { setShowForm(false); setForm(emptyForm); }}
            submitLabel="Toevoegen"
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-16 text-center">
          <p className="text-gray-500">Nog geen teamleden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) =>
            editing === member.id ? (
              <div key={member.id}>
                <MemberForm
                  values={editForm}
                  onChange={(key, value) => setEditForm((prev) => ({ ...prev, [key]: value }))}
                  onSubmit={(e) => { e.preventDefault(); handleUpdate(member.id); }}
                  onCancel={() => setEditing(null)}
                  submitLabel="Opslaan"
                />
              </div>
            ) : (
              <div
                key={member.id}
                data-testid="team-member-row"
                className={`flex items-center gap-4 rounded-xl border bg-white p-4 ${!member.active ? "opacity-60" : "border-gray-200"}`}
              >
                <GripVertical className="h-5 w-5 shrink-0 text-gray-300 cursor-grab" />

                {member.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo_url} alt={member.name} className="h-12 w-12 rounded-full object-cover border border-gray-200" />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 text-lg font-semibold">
                    {member.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  {member.bio && <p className="text-xs text-gray-400 mt-0.5 truncate">{member.bio}</p>}
                </div>

                <div className="flex items-center gap-1">
                  {!member.active && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Verborgen</span>
                  )}
                  <button onClick={() => startEdit(member)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    disabled={deleting === member.id}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    {deleting === member.id ? (
                      <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

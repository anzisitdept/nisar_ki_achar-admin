"use client";
import { useEffect, useState, FormEvent } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/firestoreServices";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Category } from "@/types/admin";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY: Omit<Category, "id"> = { slug: "", name: "", urduName: "", description: "", image: "", itemCount: 0 };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<Omit<Category, "id">>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() { setCategories(await getCategories()); }
  useEffect(() => { load(); }, []);

  function openNew() { setEditing(null); setForm(EMPTY); setShowForm(true); }
  function openEdit(c: Category) { setEditing(c); setForm({ slug: c.slug, name: c.name, urduName: c.urduName, description: c.description, image: c.image, itemCount: c.itemCount }); setShowForm(true); }

  async function handleSave(e: FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await updateCategory(editing.id, form); toast.success("Category updated!"); }
      else { await createCategory(form); toast.success("Category created!"); }
      setShowForm(false); load();
    } catch { toast.error("Failed to save."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    await deleteCategory(id); toast.success("Deleted"); load();
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div><h2 className="page-title">Categories</h2><p className="page-subtitle">{categories.length} categories</p></div>
        <button onClick={openNew} className="btn btn-primary"><Plus size={16} /> New Category</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700 }}>{editing ? "Edit Category" : "New Category"}</h3>
            <button onClick={() => setShowForm(false)} className="btn btn-ghost" style={{ padding: "6px 10px" }}><X size={16} /></button>
          </div>
          <form onSubmit={handleSave}>
            <div className="grid-2">
              <div className="form-group"><label className="label">Name</label><input className="input" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="form-group"><label className="label">Urdu Name</label><input className="input" value={form.urduName} onChange={(e) => setForm(f => ({ ...f, urduName: e.target.value }))} /></div>
              <div className="form-group"><label className="label">Slug</label><input className="input" required value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
              <div className="form-group"><label className="label">Item Count</label><input className="input" type="number" value={form.itemCount} onChange={(e) => setForm(f => ({ ...f, itemCount: Number(e.target.value) }))} /></div>
            </div>
            <div className="form-group"><label className="label">Description</label><textarea className="input" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <ImageUploader label="Category Image" value={form.image} onChange={(url) => setForm(f => ({ ...f, image: url }))} path="categories" />
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button type="submit" disabled={saving} className="btn btn-primary"><Save size={14} /> {saving ? "Saving…" : "Save"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead><tr><th>Category</th><th>Slug</th><th>Items</th><th>Actions</th></tr></thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {c.image && <img src={c.image} alt={c.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", border: "1px solid var(--border)" }} />}
                    <div>
                      <p style={{ fontWeight: 600 }}>{c.name}</p>
                      {c.urduName && <p style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{c.urduName}</p>}
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-processing">{c.slug}</span></td>
                <td>{c.itemCount}</td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => openEdit(c)} className="btn btn-ghost" style={{ padding: "6px 12px" }}><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(c.id, c.name)} className="btn btn-danger" style={{ padding: "6px 12px" }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
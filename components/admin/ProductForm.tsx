"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, getProduct } from "@/lib/firestoreServices";
import ImageUploader from "@/components/admin/ImageUploader";
import { Plus, X, Save, ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types/admin";

const EMPTY: Omit<Product, "id"> = {
  slug: "", name: "", urduName: "", category: "", categoryName: "",
  originalPrice: 0, price: 0, discountBadge: "",
  isBestSeller: false, isNew: false, inStock: true,
  showInAllProducts: true,
  image: "", hoverImage: "", images: [], weights: [], weightPrices: {},
  description: "", ingredients: "", benefits: "",
  rating: 5, reviewsCount: 0,
};

interface Props { productId?: string; initialData?: Partial<Product>; }

export default function ProductForm({ productId, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Product, "id">>({
    ...EMPTY,
    ...initialData,
    showInAllProducts: initialData?.showInAllProducts !== undefined ? initialData.showInAllProducts : true,
  });
  const [saving, setSaving] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [newWeightPrice, setNewWeightPrice] = useState("");

  function set(key: keyof typeof form, val: any) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function addWeight() {
    if (!newWeight || !newWeightPrice) return;
    set("weights", [...form.weights, newWeight]);
    set("weightPrices", { ...form.weightPrices, [newWeight]: Number(newWeightPrice) });
    setNewWeight(""); setNewWeightPrice("");
  }

  function removeWeight(w: string) {
    const wp = { ...form.weightPrices };
    delete wp[w];
    set("weights", form.weights.filter((x) => x !== w));
    set("weightPrices", wp);
  }

  function addGalleryImage(url: string) {
    if (url) set("images", [...form.images, url]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (productId) {
        await updateProduct(productId, form);
        toast.success("Product updated!");
      } else {
        await createProduct(form);
        toast.success("Product created!");
      }
      router.push("/admin/products");
    } catch (err) {
      toast.error("Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/admin/products" className="btn btn-ghost" style={{ padding: "8px 12px" }}>
            <ArrowLeft size={16} />
          </a>
          <div>
            <h2 className="page-title">{productId ? "Edit Product" : "New Product"}</h2>
            <p className="page-subtitle">Fill all fields to match the storefront schema</p>
          </div>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
          {productId ? "Update Product" : "Create Product"}
        </button>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Basic Info</h3>
            <div className="form-group">
              <label className="label">Product Name (English)</label>
              <input className="input" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Aam Ka Achar" />
            </div>
            <div className="form-group">
              <label className="label">Urdu Name</label>
              <input className="input" value={form.urduName} onChange={(e) => set("urduName", e.target.value)} placeholder="آم کا اچار" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="label">Slug (URL)</label>
                <input className="input" required value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="aam-ka-achar" />
              </div>
              <div className="form-group">
                <label className="label">Discount Badge</label>
                <input className="input" value={form.discountBadge} onChange={(e) => set("discountBadge", e.target.value)} placeholder="-30%" />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="label">Category ID</label>
                <input className="input" value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="pickles" />
              </div>
              <div className="form-group">
                <label className="label">Category Name</label>
                <input className="input" value={form.categoryName} onChange={(e) => set("categoryName", e.target.value)} placeholder="Desi Pickles" />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Pricing</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="label">Sale Price (PKR)</label>
                <input className="input" type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label className="label">Original Price (PKR)</label>
                <input className="input" type="number" value={form.originalPrice} onChange={(e) => set("originalPrice", Number(e.target.value))} />
              </div>
            </div>

            <h4 style={{ fontWeight: 600, marginBottom: 12, fontSize: "0.875rem" }}>Weight Variants</h4>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <input className="input" placeholder="e.g. 500g" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} style={{ flex: "1 1 120px" }} />
              <input className="input" placeholder="Price (PKR)" type="number" value={newWeightPrice} onChange={(e) => setNewWeightPrice(e.target.value)} style={{ flex: "1 1 120px" }} />
              <button type="button" onClick={addWeight} className="btn btn-primary" style={{ flexShrink: 0 }}>
                <Plus size={14} /> Add
              </button>
            </div>
            {form.weights.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {form.weights.map((w) => (
                  <div key={w} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    borderRadius: 8, padding: "6px 12px", fontSize: "0.85rem",
                  }}>
                    <span style={{ fontWeight: 600 }}>{w}</span>
                    <span style={{ color: "var(--accent)" }}>Rs. {form.weightPrices[w]?.toLocaleString()}</span>
                    <button type="button" onClick={() => removeWeight(w)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red)", display: "flex" }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Flags & Status</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  key: "inStock",
                  label: "In Stock",
                  desc: "Available for customer purchase",
                },
                {
                  key: "showInAllProducts",
                  label: "Show on All Products Page",
                  desc: "Display this product on the storefront's /collections/all-products catalog",
                },
                {
                  key: "isBestSeller",
                  label: "Best Seller",
                  desc: "Show in Best Seller sections and display badge",
                },
                {
                  key: "isNew",
                  label: "New Arrival",
                  desc: "Show in New Arrivals collection and highlights",
                },
              ].map(({ key, label, desc }) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "6px 0",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem", display: "block" }}>{label}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block", marginTop: 2 }}>
                      {desc}
                    </span>
                  </div>
                  <label className="toggle" style={{ flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={!!form[key as keyof typeof form]}
                      onChange={(e) => set(key as keyof typeof form, e.target.checked)}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>
              ))}
            </div>
            <div className="form-group" style={{ marginTop: 20 }}>
              <label className="label">Rating (1–5)</label>
              <input className="input" type="number" min="1" max="5" step="0.1" value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="label">Reviews Count</label>
              <input className="input" type="number" value={form.reviewsCount} onChange={(e) => set("reviewsCount", Number(e.target.value))} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Images</h3>
            <div className="form-group">
              <ImageUploader label="Main Image" value={form.image} onChange={(url) => set("image", url)} path="products/main" />
            </div>
            <div className="form-group">
              <ImageUploader label="Hover Image" value={form.hoverImage} onChange={(url) => set("hoverImage", url)} path="products/hover" />
            </div>
            <div>
              <label className="label">Gallery Images ({form.images.length})</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                {form.images.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={img} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }} />
                    <button type="button" onClick={() => set("images", form.images.filter((_, j) => j !== i))} style={{
                      position: "absolute", top: -6, right: -6,
                      background: "var(--red)", border: "none", borderRadius: "50%",
                      width: 20, height: 20, cursor: "pointer", color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <ImageUploader label="Add Gallery Image" onChange={addGalleryImage} path="products/gallery" />
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Product Content</h3>
            <div className="form-group">
              <label className="label">Description</label>
              <textarea className="input" rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Rich product narrative…" />
            </div>
            <div className="form-group">
              <label className="label">Ingredients</label>
              <textarea className="input" rows={4} value={form.ingredients} onChange={(e) => set("ingredients", e.target.value)} placeholder="Natural ingredients list…" />
            </div>
            <div className="form-group">
              <label className="label">Benefits</label>
              <textarea className="input" rows={4} value={form.benefits} onChange={(e) => set("benefits", e.target.value)} placeholder="Health & wellness benefits…" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

"use client";
import { useEffect, useState, FormEvent } from "react";
import { getStoreContent, updateStoreContent } from "@/lib/firestoreServices";
import ImageUploader from "@/components/admin/ImageUploader";
import type { StoreContent, HeroSlide, Banner } from "@/types/admin";
import { Plus, X, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const EMPTY_CONTENT: StoreContent = { topBarMessages: [], heroSlides: [], midBanners: [] };

export default function ContentPage() {
  const [content, setContent] = useState<StoreContent>(EMPTY_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    getStoreContent().then((c) => { if (c) setContent(c); setLoading(false); });
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault(); setSaving(true);
    try { await updateStoreContent(content); toast.success("Content saved! Storefront updated."); }
    catch { toast.error("Save failed."); }
    finally { setSaving(false); }
  }

  function addMsg() {
    if (!newMsg.trim()) return;
    setContent(c => ({ ...c, topBarMessages: [...c.topBarMessages, newMsg.trim()] }));
    setNewMsg("");
  }

  function removeMsg(i: number) {
    setContent(c => ({ ...c, topBarMessages: c.topBarMessages.filter((_, j) => j !== i) }));
  }

  function addSlide() {
    const slide: HeroSlide = { id: Date.now().toString(), desktopImage: "", mobileImage: "", alt: "" };
    setContent(c => ({ ...c, heroSlides: [...c.heroSlides, slide] }));
  }

  function updateSlide(i: number, key: keyof HeroSlide, val: string) {
    setContent(c => {
      const slides = [...c.heroSlides];
      slides[i] = { ...slides[i], [key]: val };
      return { ...c, heroSlides: slides };
    });
  }

  function removeSlide(i: number) {
    setContent(c => ({ ...c, heroSlides: c.heroSlides.filter((_, j) => j !== i) }));
  }

  function addBanner() {
    const b: Banner = { id: Date.now().toString(), image: "", link: "", alt: "" };
    setContent(c => ({ ...c, midBanners: [...c.midBanners, b] }));
  }

  function updateBanner(i: number, key: keyof Banner, val: string) {
    setContent(c => {
      const banners = [...c.midBanners];
      banners[i] = { ...banners[i], [key]: val };
      return { ...c, midBanners: banners };
    });
  }

  function removeBanner(i: number) {
    setContent(c => ({ ...c, midBanners: c.midBanners.filter((_, j) => j !== i) }));
  }

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Loader2 size={32} color="var(--accent)" className="spin" /></div>;

  return (
    <form onSubmit={handleSave} className="fade-in">
      <div className="page-header">
        <div><h2 className="page-title">Content Manager</h2><p className="page-subtitle">Manage TopBar, Hero Slides, and Banners</p></div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />} Save All
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* TopBar Messages */}
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: 4 }}>📢 TopBar Announcement Messages</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: 20 }}>Auto-rotating messages in the storefront top bar</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input className="input" placeholder="e.g. 🚚 Free delivery on orders over Rs. 2,999!" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
            <button type="button" onClick={addMsg} className="btn btn-primary" style={{ flexShrink: 0 }}><Plus size={14} /> Add</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {content.topBarMessages.map((msg, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "var(--bg-elevated)", borderRadius: 8, padding: "10px 14px",
                border: "1px solid var(--border)",
              }}>
                <span style={{ flex: 1, fontSize: "0.875rem" }}>{msg}</span>
                <button type="button" onClick={() => removeMsg(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red)", display: "flex" }}>
                  <X size={16} />
                </button>
              </div>
            ))}
            {content.topBarMessages.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No messages yet.</p>}
          </div>
        </div>

        {/* Hero Slides */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 4 }}>🖼️ Hero Slides</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Homepage hero slider images</p>
            </div>
            <button type="button" onClick={addSlide} className="btn btn-ghost"><Plus size={14} /> Add Slide</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {content.heroSlides.map((slide, i) => (
              <div key={slide.id} style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Slide {i + 1}</span>
                  <button type="button" onClick={() => removeSlide(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red)" }}><X size={16} /></button>
                </div>
                <div className="grid-2">
                  <ImageUploader label="Desktop Image" value={slide.desktopImage} onChange={(url) => updateSlide(i, "desktopImage", url)} path="slides/desktop" />
                  <ImageUploader label="Mobile Image" value={slide.mobileImage} onChange={(url) => updateSlide(i, "mobileImage", url)} path="slides/mobile" />
                </div>
                <div className="form-group" style={{ marginTop: 12 }}>
                  <label className="label">Alt Text</label>
                  <input className="input" value={slide.alt} onChange={(e) => updateSlide(i, "alt", e.target.value)} placeholder="Slide description" />
                </div>
              </div>
            ))}
            {content.heroSlides.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No slides yet.</p>}
          </div>
        </div>

        {/* Mid Banners */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 4 }}>🏷️ Mid Banners</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Promotional banners in the middle of homepage</p>
            </div>
            <button type="button" onClick={addBanner} className="btn btn-ghost"><Plus size={14} /> Add Banner</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {content.midBanners.map((banner, i) => (
              <div key={banner.id} style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Banner {i + 1}</span>
                  <button type="button" onClick={() => removeBanner(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--red)" }}><X size={16} /></button>
                </div>
                <div className="grid-2">
                  <ImageUploader label="Banner Image" value={banner.image} onChange={(url) => updateBanner(i, "image", url)} path="banners" />
                  <div>
                    <div className="form-group">
                      <label className="label">Link URL</label>
                      <input className="input" value={banner.link} onChange={(e) => updateBanner(i, "link", e.target.value)} placeholder="/collections/pickles" />
                    </div>
                    <div className="form-group">
                      <label className="label">Alt Text</label>
                      <input className="input" value={banner.alt} onChange={(e) => updateBanner(i, "alt", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {content.midBanners.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No banners yet.</p>}
          </div>
        </div>
      </div>
    </form>
  );
}
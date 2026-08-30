"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { uploadImage } from "@/lib/firestoreServices";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  path?: string;
  label?: string;
}

export default function ImageUploader({ value, onChange, path = "uploads", label = "Image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const filename = `${path}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const url = await uploadImage(file, filename, (p) => setProgress(p));
      onChange(url);
    } catch (e) {
      setError("Upload failed. Check Firebase Storage rules.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [onChange, path]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div>
      <label className="label">{label}</label>
      {value ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={value} alt="preview" style={{
            width: 120, height: 120, objectFit: "cover",
            borderRadius: 10, border: "1px solid var(--border)",
          }} />
          <button onClick={() => onChange("")} style={{
            position: "absolute", top: -8, right: -8,
            background: "var(--red)", border: "none", borderRadius: "50%",
            width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "white",
          }}>
            <X size={12} />
          </button>
        </div>
      ) : (
        <div {...getRootProps()} style={{
          border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 10,
          padding: "28px 20px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragActive ? "var(--accent-glow)" : "var(--bg-elevated)",
          transition: "all 0.2s",
        }}>
          <input {...getInputProps()} />
          {uploading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Loader2 size={28} color="var(--accent)" className="spin" />
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{progress}% uploaded…</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              {isDragActive ? <ImageIcon size={28} color="var(--accent)" /> : <Upload size={28} color="var(--text-muted)" />}
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {isDragActive ? "Drop it!" : "Drag & drop or click to upload"}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PNG, JPG, WebP up to 5MB</p>
            </div>
          )}
        </div>
      )}
      {error && <p style={{ color: "var(--red)", fontSize: "0.8rem", marginTop: 6 }}>{error}</p>}
    </div>
  );
}

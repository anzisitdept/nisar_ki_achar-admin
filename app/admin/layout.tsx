"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });
    return () => unsub();
  }, [pathname, router]);

  if (user === undefined) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)" }}>
        <Loader2 size={40} color="var(--accent)" className="spin" />
      </div>
    );
  }

  if (!user && pathname === "/admin/login") {
    return <>{children}<Toaster position="top-right" /></>;
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{
        flex: 1,
        marginLeft: "260px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        transition: "margin-left 0.3s ease",
      }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: "28px", background: "var(--bg-base)" }}>
          {children}
        </main>
      </div>
      <Toaster position="top-right" toastOptions={{
        style: { background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }
      }} />
    </div>
  );
}

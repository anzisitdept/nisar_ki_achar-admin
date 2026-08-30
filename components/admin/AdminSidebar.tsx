"use client";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Star,
  FileImage, Settings, LogOut, ChevronLeft, ChevronRight, Store
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/content", label: "Content", icon: FileImage },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <aside style={{
      width: collapsed ? 72 : 260,
      minHeight: "100vh",
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s ease",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: collapsed ? "20px 0" : "20px 20px",
        borderBottom: "1px solid var(--border)",
        height: 64,
      }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Store size={18} color="#0a0a0f" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", lineHeight: 1.2 }}>Nisar Ki Achar</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Admin Panel</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Store size={18} color="#0a0a0f" />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: "var(--bg-elevated)", border: "1px solid var(--border)",
          borderRadius: 6, padding: "4px 6px", cursor: "pointer", color: "var(--text-secondary)",
          display: "flex", alignItems: "center",
        }}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <a key={href} href={href} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: collapsed ? "12px 0" : "12px 20px",
              justifyContent: collapsed ? "center" : "flex-start",
              margin: "2px 8px",
              borderRadius: 10,
              background: active ? "var(--accent-glow)" : "transparent",
              color: active ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: active ? 600 : 400,
              fontSize: "0.9rem",
              transition: "all 0.2s",
              borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
            }}>
              <Icon size={18} />
              {!collapsed && label}
            </a>
          );
        })}
      </nav>

      {/* Logout */}
      <button onClick={handleLogout} style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: collapsed ? "16px 0" : "16px 28px",
        justifyContent: collapsed ? "center" : "flex-start",
        borderTop: "1px solid var(--border)",
        background: "none",
        border: "none",
        borderTop: "1px solid var(--border)",
        color: "var(--red)",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: 500,
        width: "100%",
        transition: "background 0.2s",
      }}>
        <LogOut size={18} />
        {!collapsed && "Sign Out"}
      </button>
    </aside>
  );
}

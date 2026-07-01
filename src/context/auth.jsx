import * as React from "react";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Autenticación del panel INDEPENDIENTE por magic-link (enlace de un solo uso).
// No hay iframe ni niveles por URL: la sesión es una cookie del propio dominio y
// el nivel real se lee en el backend desde GHL.

const AuthContext = createContext(null);
const API_BASE =
  import.meta.env.BASE_URL.replace(/\/$/, "").replace("/dashboard", "") + "/api";

// Modo demo (solo previsualización, sin backend): ?demo o VITE_DEMO=1.
const DEMO =
  import.meta.env.VITE_DEMO === "1" ||
  (typeof location !== "undefined" && new URLSearchParams(location.search).has("demo"));
const DEMO_MEMBER = { firstName: "Natalia", lastName: "E", email: "demo@aceai.com", p: 1, ia: 1, pmf: 0 };

export function AuthProvider({ children }) {
  const [member, setMember] = useState(DEMO ? DEMO_MEMBER : null);
  const [loading, setLoading] = useState(DEMO ? false : true);

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
      const data = res.ok ? await res.json() : null;
      setMember(data && data.authenticated ? data : null);
    } catch (e) {
      setMember(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (!DEMO) fetchMe(); }, [fetchMe]);

  // Solicitar acceso: envía el correo con el enlace de un solo uso.
  const requestLink = async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { error: data.error || "No se pudo enviar el enlace." };
      return { ok: true };
    } catch (e) {
      return { error: "Error de conexión. Inténtalo de nuevo." };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" });
    } catch (e) {}
    setMember(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { member, loading, requestLink, logout } },
    children
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

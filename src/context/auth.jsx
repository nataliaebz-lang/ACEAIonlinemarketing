import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { createContext, useContext, useState, useEffect, useCallback, } from "react";















const AuthContext = createContext(null);

const TOKEN_KEY = "aceai_token";
const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "").replace("/dashboard", "") + "/api";

// Modo demo (solo previsualización): entra al dashboard sin backend.
// Se activa con VITE_DEMO=1 en build o con ?demo en la URL. Off en producción.
const DEMO = import.meta.env.VITE_DEMO === "1" ||
  (typeof location !== "undefined" && new URLSearchParams(location.search).has("demo"));
// El demo trae niveles de ejemplo (P1 e IA1, sin PMF) para que se vean unas
// secciones abiertas y otras con candado. En producción los niveles llegan de
// GHL en el objeto `member` del login.
const DEMO_MEMBER = { firstName: "Natalia", lastName: "E", email: "demo@aceai.com", p: 1, ia: 1, pmf: 0 };

// ── Modo GHL (incrustado por iframe) ─────────────────────────────────────────
// El dashboard se incrusta en GHL y recibe el nivel por la URL:
//   ?cid=<id contacto>&p=<nivel_p>&ia=<nivel_ia>&pmf=<0|1>&nombre=&email=
// No hay login: GHL ya autenticó a la persona. Los niveles de la URL son
// spoofeables → sirven SOLO para mostrar/ocultar (los candados). La seguridad
// real la aplica el Worker en cada acción de pago ("la interfaz oculta, el
// Worker decide").
function readGhlParams() {
  if (typeof location === "undefined") return null;
  const q = new URLSearchParams(location.search);
  if (!q.has("p") && !q.has("ia") && !q.has("pmf") && !q.has("cid")) return null;
  const n = (v) => { const x = parseInt(v, 10); return Number.isNaN(x) ? 0 : x; };
  return {
    cid: q.get("cid") || "",
    p: n(q.get("p")),
    ia: n(q.get("ia")),
    pmf: n(q.get("pmf")),
    firstName: q.get("nombre") || q.get("name") || "",
    email: q.get("email") || "",
  };
}
// Niveles por URL (?p=&ia=&pmf=). Funcionan tanto en producción (GHL) como en
// el preview/demo: así se puede previsualizar cualquier nivel de candados, p. ej.
//   preview/dashboard.html?p=2&ia=0   ó   ?pmf=1
const URL_MEMBER = readGhlParams();

export function AuthProvider({ children }) {
  // Prioridad: niveles en la URL > (en demo) miembro de ejemplo > login real.
  const [member, setMember] = useState(URL_MEMBER || (DEMO ? DEMO_MEMBER : null));
  const [loading, setLoading] = useState(URL_MEMBER || DEMO ? false : true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setLoading(false); return; }

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMember(await res.json());
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setMember(null);
      }
    } catch (e) {
      setMember(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Si el nivel ya vino por la URL (GHL/preview) o es demo, no consultamos /auth/me.
  useEffect(() => { if (!DEMO && !URL_MEMBER) fetchMe(); }, [fetchMe]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() ;
      if (!res.ok) return { error: _nullishCoalesce(data.error, () => ( "Credenciales incorrectas")) };
      localStorage.setItem(TOKEN_KEY, data.token);
      setMember(data.member);
      return {};
    } catch (e2) {
      return { error: "Error de conexión. Inténtalo de nuevo." };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setMember(null);
  };

  return (
    React.createElement(AuthContext.Provider, { value: { member, loading, login, logout }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
      , children
    )
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

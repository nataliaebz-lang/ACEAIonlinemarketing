import * as React from "react";
const _jsxFileName = ""; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { createContext, useContext, useState, useEffect, useCallback, } from "react";















const AuthContext = createContext(null);

const TOKEN_KEY = "aceai_token";
const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "").replace("/dashboard", "") + "/api";

export function AuthProvider({ children }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => { fetchMe(); }, [fetchMe]);

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

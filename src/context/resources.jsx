import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/language";

// Puente entre el gestor /admin (backend) y el dashboard.
// Trae el contenido de /api/resources (enlaces + textos por sección, según el
// nivel) y lo expone por ruta. Si el backend no está disponible (p. ej. el
// preview/demo sin worker), queda vacío y cada página usa su contenido estático
// de respaldo — así nada se rompe.

const API_BASE =
  import.meta.env.BASE_URL.replace(/\/$/, "").replace("/dashboard", "") + "/api";

const ResourcesContext = createContext({ byRoute: {}, ready: false });

export function ResourcesProvider({ children }) {
  const { member } = useAuth();
  const { lang } = useLanguage();
  const [byRoute, setByRoute] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancel = false;
    const p = member?.p ?? "";
    const ia = member?.ia ?? "";
    const pmf = member?.pmf ?? "";
    const url = `${API_BASE}/resources?p=${p}&ia=${ia}&pmf=${pmf}&lang=${lang}`;

    fetch(url, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancel || !data || !Array.isArray(data.resources)) return;
        const map = {};
        data.resources.forEach((res) => {
          if (res.route) map[res.route] = res;
        });
        setByRoute(map);
        setReady(true);
      })
      .catch(() => {
        /* sin backend (preview/demo): se usa el contenido estático de respaldo */
      });

    return () => {
      cancel = true;
    };
  }, [member, lang]);

  // URL (con nivel) para leer un archivo subido desde /admin.
  const fileUrl = (id, fileLang) =>
    `${API_BASE}/file/${id}?lang=${fileLang || ""}` +
    `&p=${member?.p ?? ""}&ia=${member?.ia ?? ""}&pmf=${member?.pmf ?? ""}`;

  return React.createElement(
    ResourcesContext.Provider,
    { value: { byRoute, ready, fileUrl } },
    children
  );
}

// Devuelve el contenido gestionado de una ruta, o null si no hay backend.
// Uso en una página:  const r = useResource("/proposito/ebook");
//                     const link = r?.link || ENLACE_ESTATICO;
export function useResource(route) {
  const { byRoute } = useContext(ResourcesContext);
  return byRoute[route] || null;
}

export function useResources() {
  return useContext(ResourcesContext);
}

// Devuelve una función fileUrl(id, lang) para abrir un archivo subido.
export function useFileUrl() {
  return useContext(ResourcesContext).fileUrl;
}

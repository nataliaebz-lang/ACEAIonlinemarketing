// Interfaz del panel /admin. Es una sola página autocontenida (HTML + CSS + JS)
// que habla con /api/admin/*. Pensada para que Natalia suba y edite recursos
// sin tocar código.

export function adminPageHtml(env) {
  const brand = env.BRAND_NAME || "ACEAI";
  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${brand} · Gestor de contenidos</title>
<style>
  :root { --bg:#faf8f5; --card:#fff; --ink:#2b2b2b; --muted:#8a8a8a; --line:#ece7e0; --accent:#1a1a1a; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif; }
  header { padding:20px 28px; border-bottom:1px solid var(--line); background:var(--card); display:flex; justify-content:space-between; align-items:center; }
  header h1 { font-size:18px; margin:0; font-weight:600; }
  header .lvl { font-size:13px; color:var(--muted); }
  main { max-width:1100px; margin:0 auto; padding:28px; }
  .hidden { display:none !important; }
  button { cursor:pointer; border:none; border-radius:999px; padding:10px 18px; font-size:14px; background:var(--accent); color:#fff; }
  button.ghost { background:transparent; color:var(--ink); border:1px solid var(--line); }
  button.danger { background:#c0392b; }
  input, textarea, select { width:100%; padding:10px 12px; border:1px solid var(--line); border-radius:10px; font-size:14px; font-family:inherit; background:#fff; }
  label { display:block; font-size:12px; color:var(--muted); margin:0 0 4px; text-transform:uppercase; letter-spacing:.04em; }
  .field { margin-bottom:14px; }
  .row { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:12px; }
  .row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:24px; margin-bottom:24px; }
  table { width:100%; border-collapse:collapse; background:var(--card); border-radius:16px; overflow:hidden; }
  th, td { text-align:left; padding:12px 14px; border-bottom:1px solid var(--line); font-size:14px; vertical-align:top; }
  th { font-size:12px; text-transform:uppercase; color:var(--muted); letter-spacing:.04em; }
  .pill { display:inline-block; padding:2px 10px; border-radius:999px; font-size:12px; background:#f1ece4; }
  .actions { display:flex; gap:8px; }
  .login-wrap { max-width:380px; margin:80px auto; }
  .toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .muted { color:var(--muted); font-size:13px; }
  .err { color:#c0392b; font-size:13px; margin-top:8px; }
  .grid-lang { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
</style>
</head>
<body>

<!-- Pantalla de login -->
<div id="login" class="login-wrap">
  <div class="card">
    <h1 style="margin-top:0">${brand} · Gestor de contenidos</h1>
    <p class="muted">Introduce la contraseña de administración.</p>
    <div class="field">
      <label>Contraseña</label>
      <input id="pw" type="password" autocomplete="current-password" />
    </div>
    <button onclick="login()">Entrar</button>
    <div id="loginErr" class="err"></div>
  </div>
</div>

<!-- Panel -->
<div id="panel" class="hidden">
  <header>
    <h1>${brand} · Gestor de contenidos</h1>
    <button class="ghost" onclick="logout()">Salir</button>
  </header>
  <main>
    <div class="toolbar">
      <span class="muted" id="count"></span>
      <button onclick="openForm()">+ Nuevo recurso</button>
    </div>

    <!-- Formulario crear/editar -->
    <div id="form" class="card hidden">
      <h2 id="formTitle" style="margin-top:0">Nuevo recurso</h2>
      <input id="rid" type="hidden" />
      <div class="row">
        <div class="field">
          <label>Tipo</label>
          <select id="type">
            <option value="course">Curso</option>
            <option value="book">Libro</option>
            <option value="audio">Audio</option>
            <option value="app">App</option>
          </select>
        </div>
        <div class="field">
          <label>Área</label>
          <select id="area">
            <option value="abierto">Abierto (todas)</option>
            <option value="P">Propósito (P)</option>
            <option value="IA">Inteligencia Artificial (IA)</option>
          </select>
        </div>
        <div class="field">
          <label>Nivel mínimo</label>
          <input id="level" type="number" min="0" value="0" />
        </div>
        <div class="field">
          <label>Orden</label>
          <input id="sort_order" type="number" min="0" value="0" />
        </div>
      </div>
      <div class="field">
        <label>Enlace (URL del recurso)</label>
        <input id="link" type="url" placeholder="https://..." />
      </div>
      <div class="field">
        <label>Imagen de portada (URL, opcional)</label>
        <input id="image_url" type="url" placeholder="https://..." />
      </div>

      <h3 style="margin:18px 0 8px;font-size:14px">Títulos</h3>
      <div class="grid-lang">
        <div class="field"><label>Español</label><input id="title_es" /></div>
        <div class="field"><label>English</label><input id="title_en" /></div>
        <div class="field"><label>Português</label><input id="title_pt" /></div>
      </div>

      <h3 style="margin:8px 0 8px;font-size:14px">Descripciones</h3>
      <div class="grid-lang">
        <div class="field"><label>Español</label><textarea id="desc_es" rows="3"></textarea></div>
        <div class="field"><label>English</label><textarea id="desc_en" rows="3"></textarea></div>
        <div class="field"><label>Português</label><textarea id="desc_pt" rows="3"></textarea></div>
      </div>

      <div class="field">
        <label><input type="checkbox" id="active" checked style="width:auto;margin-right:6px" /> Visible (publicado)</label>
      </div>

      <div class="actions">
        <button onclick="save()">Guardar</button>
        <button class="ghost" onclick="closeForm()">Cancelar</button>
      </div>
      <div id="formErr" class="err"></div>
    </div>

    <!-- Tabla de recursos -->
    <table>
      <thead>
        <tr><th>Título (ES)</th><th>Tipo</th><th>Área</th><th>Nivel</th><th>Estado</th><th></th></tr>
      </thead>
      <tbody id="rows"></tbody>
    </table>
  </main>
</div>

<script>
const API = "/api/admin/resources";
const ERRORS = {
  invalid_password: "Contraseña incorrecta.",
  type_invalid: "Selecciona un tipo válido.",
  area_invalid: "Selecciona un área válida.",
  level_invalid: "El nivel no es válido.",
  link_required: "El enlace es obligatorio.",
  title_required: "Pon al menos un título.",
  unauthorized: "Sesión caducada. Vuelve a entrar.",
};
function msg(code){ return ERRORS[code] || code || "Error"; }

async function login(){
  document.getElementById("loginErr").textContent = "";
  const password = document.getElementById("pw").value;
  const r = await fetch("/api/admin/login", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password}) });
  const d = await r.json().catch(()=>({}));
  if(!r.ok){ document.getElementById("loginErr").textContent = msg(d.error); return; }
  show();
}
async function logout(){ await fetch("/api/admin/logout",{method:"POST"}); location.reload(); }

async function show(){
  const r = await fetch(API);
  if(!r.ok){ return; } // no autenticado -> queda en login
  document.getElementById("login").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
  await load();
}

async function load(){
  const r = await fetch(API);
  const d = await r.json();
  const rows = document.getElementById("rows");
  rows.innerHTML = "";
  (d.resources||[]).forEach(res=>{
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>"+esc(res.title_es||"—")+"</td>"+
      "<td><span class='pill'>"+res.type+"</span></td>"+
      "<td><span class='pill'>"+res.area+"</span></td>"+
      "<td>"+res.level+"</td>"+
      "<td>"+(res.active? "Visible":"Oculto")+"</td>"+
      "<td class='actions'></td>";
    const cell = tr.querySelector(".actions");
    const e = document.createElement("button"); e.className="ghost"; e.textContent="Editar"; e.onclick=()=>openForm(res);
    const x = document.createElement("button"); x.className="danger"; x.textContent="Borrar"; x.onclick=()=>del(res.id);
    cell.append(e,x);
    rows.appendChild(tr);
  });
  document.getElementById("count").textContent = (d.resources||[]).length + " recursos";
}

function esc(s){ const d=document.createElement("div"); d.textContent=s; return d.innerHTML; }

const F = ["type","area","level","sort_order","link","image_url","title_es","title_en","title_pt","desc_es","desc_en","desc_pt"];
function openForm(res){
  document.getElementById("formErr").textContent="";
  document.getElementById("form").classList.remove("hidden");
  document.getElementById("formTitle").textContent = res? "Editar recurso":"Nuevo recurso";
  document.getElementById("rid").value = res? res.id : "";
  F.forEach(k=>{ document.getElementById(k).value = res? (res[k]??"") : (k==="level"||k==="sort_order"?0:""); });
  document.getElementById("active").checked = res? !!res.active : true;
  if(!res){ document.getElementById("type").value="course"; document.getElementById("area").value="abierto"; }
  window.scrollTo({top:0,behavior:"smooth"});
}
function closeForm(){ document.getElementById("form").classList.add("hidden"); }

async function save(){
  document.getElementById("formErr").textContent="";
  const id = document.getElementById("rid").value;
  const body = { active: document.getElementById("active").checked ? 1 : 0 };
  F.forEach(k=> body[k] = document.getElementById(k).value);
  const r = await fetch(id? API+"/"+id : API, {
    method: id? "PUT":"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(body),
  });
  const d = await r.json().catch(()=>({}));
  if(!r.ok){ document.getElementById("formErr").textContent = msg(d.error); return; }
  closeForm(); await load();
}

async function del(id){
  if(!confirm("¿Borrar este recurso? No se puede deshacer.")) return;
  await fetch(API+"/"+id,{method:"DELETE"});
  await load();
}

// Al cargar, intenta mostrar el panel (por si ya hay sesión de admin).
show();
</script>
</body></html>`;
}

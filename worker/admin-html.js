// Interfaz del gestor /admin. Página autocontenida que habla con /api/admin/*.
// Natalia entra con contraseña y edita el enlace y los textos de cada sección.

export function adminPageHtml(env) {
  const brand = env.BRAND_NAME || "ACEAI";
  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${brand} · Gestor de contenidos</title>
<style>
  :root{--bg:#faf7f2;--card:#fff;--ink:#2c2a27;--muted:#8d877e;--line:#ece6dc;--accent:#e0426a}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif}
  header{padding:18px 26px;border-bottom:1px solid var(--line);background:var(--card);display:flex;justify-content:space-between;align-items:center}
  header h1{font-size:17px;margin:0;font-weight:600}
  main{max-width:900px;margin:0 auto;padding:24px}
  .hidden{display:none!important}
  button{cursor:pointer;border:none;border-radius:999px;padding:10px 18px;font-size:14px;background:var(--ink);color:#fff}
  button.ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}
  input,textarea,select{width:100%;padding:9px 11px;border:1px solid var(--line);border-radius:9px;font-size:14px;font-family:inherit;background:#fff}
  label{display:block;font-size:11px;color:var(--muted);margin:0 0 3px;text-transform:uppercase;letter-spacing:.04em}
  .field{margin-bottom:10px}
  .row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin-bottom:12px}
  .card summary{cursor:pointer;font-weight:600;font-size:15px;display:flex;align-items:center;gap:10px;list-style:none}
  .pill{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;background:#f1ece4;color:var(--muted)}
  .login-wrap{max-width:360px;margin:80px auto}
  .muted{color:var(--muted);font-size:13px}
  .err{color:#c0392b;font-size:13px;margin-top:8px}
  .ok{color:#2e7d4f;font-size:13px}
  .saved{color:#2e7d4f;font-size:12px;margin-left:auto}
  h3{font-size:12px;color:var(--muted);margin:14px 0 6px;text-transform:uppercase;letter-spacing:.05em}
</style></head><body>

<div id="login" class="login-wrap hidden">
  <div class="card">
    <h1 style="margin-top:0">${brand} · Gestor de contenidos</h1>
    <p class="muted">Introduce la contraseña de administración.</p>
    <div class="field"><label>Contraseña</label><input id="pw" type="password"/></div>
    <button onclick="login()">Entrar</button>
    <div id="loginErr" class="err"></div>
  </div>
</div>

<div id="panel" class="hidden">
  <header>
    <h1>${brand} · Gestor de contenidos</h1>
    <button class="ghost" onclick="logout()">Salir</button>
  </header>
  <main>
    <p class="muted" style="margin-top:0">Edita el <b>enlace</b> y los <b>textos</b> de cada sección. Los cambios alimentan el dashboard al instante.</p>
    <div id="list"></div>
  </main>
</div>

<script>
const API="/api/admin/resources";
const ERR={invalid_password:"Contraseña incorrecta.",unauthorized:"Sesión caducada. Vuelve a entrar."};
function msg(c){return ERR[c]||c||"Error"}
function esc(s){const d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML}

async function login(){
  document.getElementById("loginErr").textContent="";
  const password=document.getElementById("pw").value;
  const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok){document.getElementById("loginErr").textContent=msg(d.error);return}
  show();
}
async function logout(){await fetch("/api/admin/logout",{method:"POST"});location.reload()}

async function show(){
  const r=await fetch(API);
  if(!r.ok){document.getElementById("panel").classList.add("hidden");document.getElementById("login").classList.remove("hidden");return}
  document.getElementById("login").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
  const d=await r.json();
  render(d.resources||[]);
}

const F=["link","image_url","title_es","title_en","title_pt","desc_es","desc_en","desc_pt"];
function render(items){
  const list=document.getElementById("list");
  list.innerHTML="";
  items.forEach(res=>{
    const c=document.createElement("details");
    c.className="card";
    c.innerHTML=
      "<summary><span class='pill'>#"+res.id+"</span> "+esc(res.title_es||res.route||"—")+
      " <span class='pill'>"+esc(res.area)+"</span> <span class='pill'>"+esc(res.type)+"</span>"+
      "<span class='saved' data-saved></span></summary>"+
      "<div class='body' style='margin-top:12px'>"+
        "<div class='field'><label>Enlace (URL)</label><input data-f='link' type='url' placeholder='https://...' value=\\""+esc(res.link)+"\\"></div>"+
        "<div class='field'><label>Imagen (URL, opcional)</label><input data-f='image_url' type='url' value=\\""+esc(res.image_url)+"\\"></div>"+
        "<h3>Títulos</h3><div class='row3'>"+
          "<div class='field'><label>ES</label><input data-f='title_es' value=\\""+esc(res.title_es)+"\\"></div>"+
          "<div class='field'><label>EN</label><input data-f='title_en' value=\\""+esc(res.title_en)+"\\"></div>"+
          "<div class='field'><label>PT</label><input data-f='title_pt' value=\\""+esc(res.title_pt)+"\\"></div>"+
        "</div>"+
        "<h3>Descripciones</h3><div class='row3'>"+
          "<div class='field'><label>ES</label><textarea data-f='desc_es' rows='2'>"+esc(res.desc_es)+"</textarea></div>"+
          "<div class='field'><label>EN</label><textarea data-f='desc_en' rows='2'>"+esc(res.desc_en)+"</textarea></div>"+
          "<div class='field'><label>PT</label><textarea data-f='desc_pt' rows='2'>"+esc(res.desc_pt)+"</textarea></div>"+
        "</div>"+
        "<div style='display:flex;align-items:center;gap:12px;margin-top:8px'>"+
          "<label style='display:flex;align-items:center;gap:6px;text-transform:none'><input data-f='active' type='checkbox' style='width:auto' "+(res.active?"checked":"")+"> Visible</label>"+
          "<button style='margin-left:auto' data-save>Guardar</button>"+
        "</div>"+
      "</div>";
    c.querySelector("[data-save]").onclick=()=>save(res.id,c);
    list.appendChild(c);
  });
}

async function save(id,card){
  const body={};
  card.querySelectorAll("[data-f]").forEach(el=>{
    body[el.dataset.f]=el.type==="checkbox"?(el.checked?1:0):el.value;
  });
  const note=card.querySelector("[data-saved]");
  note.textContent="Guardando…";note.className="saved muted";
  const r=await fetch(API+"/"+id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const d=await r.json().catch(()=>({}));
  note.textContent=r.ok?"✓ Guardado":("Error: "+msg(d.error));note.className=r.ok?"saved":"saved err";
}

show();
</script></body></html>`;
}

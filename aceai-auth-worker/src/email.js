// Envío de correos del magic link. Por defecto usa Resend (RESEND_API_KEY).
// En desarrollo, si no hay API key, imprime el enlace en los logs en vez de
// enviarlo (revisa `wrangler dev` / `wrangler tail`).

export async function sendMagicLink(email, link, env) {
  const brand = env.BRAND_NAME || "ACEAI";
  const subject = `Tu acceso a ${brand}`;
  const htmlBody = magicLinkHtml(brand, link);
  const textBody = `Hola,\n\nEntra a tu panel de ${brand} con este enlace (válido 15 minutos):\n${link}\n\nSi no lo solicitaste, ignora este correo.`;

  // Modo desarrollo: sin proveedor configurado, registramos el enlace.
  if (!env.RESEND_API_KEY) {
    console.log(`[DEV magic link] ${email} -> ${link}`);
    return { sent: false, dev: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM || `${brand} <onboarding@resend.dev>`,
      to: [email],
      subject,
      html: htmlBody,
      text: textBody,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    return { sent: false, error: `email_${res.status}` };
  }
  return { sent: true };
}

function magicLinkHtml(brand, link) {
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#faf8f5;font-family:Arial,Helvetica,sans-serif;color:#2b2b2b">
  <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;padding:40px 32px;box-shadow:0 8px 30px rgba(0,0,0,.06)">
    <h1 style="font-size:22px;margin:0 0 8px">${brand}</h1>
    <p style="font-size:15px;line-height:1.6;color:#555">Hola, entra a tu panel con el siguiente botón. El enlace es válido por 15 minutos.</p>
    <p style="text-align:center;margin:28px 0">
      <a href="${link}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px">Entrar a mi panel</a>
    </p>
    <p style="font-size:12px;color:#999;line-height:1.6">Si no solicitaste este acceso, puedes ignorar este correo de forma segura.</p>
  </div>
</body></html>`;
}

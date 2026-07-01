import * as React from "react";
const _jsxFileName = "";import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BASE = import.meta.env.BASE_URL;

const copy = {
  es: {
    title: "PFT Partner", subtitle: "Miembros Fundadoras",
    email: "Correo electrónico", placeholder_email: "tu@email.com",
    cta: "Enviar enlace de acceso", loading: "Enviando...",
    hint: "Te enviaremos un enlace de acceso a tu correo (válido 15 minutos).",
    sentTitle: "Revisa tu correo",
    sentMsg: "Si tu correo está registrado, recibirás un enlace de acceso. Haz clic en él para entrar.",
    invalid: "Escribe un correo válido.",
  },
  en: {
    title: "PFT Partner", subtitle: "Founding Members",
    email: "Email", placeholder_email: "your@email.com",
    cta: "Send access link", loading: "Sending...",
    hint: "We'll email you an access link (valid for 15 minutes).",
    sentTitle: "Check your email",
    sentMsg: "If your email is registered, you'll receive an access link. Click it to sign in.",
    invalid: "Enter a valid email.",
  },
  pt: {
    title: "PFT Partner", subtitle: "Membros Fundadoras",
    email: "E-mail", placeholder_email: "seu@email.com",
    cta: "Enviar link de acesso", loading: "Enviando...",
    hint: "Enviaremos um link de acesso ao seu e-mail (válido por 15 minutos).",
    sentTitle: "Verifique seu e-mail",
    sentMsg: "Se o seu e-mail estiver cadastrado, você receberá um link de acesso. Clique nele para entrar.",
    invalid: "Digite um e-mail válido.",
  },
};

const langLabels = [{ code: "es" }, { code: "en" }, { code: "pt" }];

export default function Login() {
  const { requestLink } = useAuth();
  const { lang: globalLang, toggle } = useLanguage();

  const [uiLang, setUiLang] = useState(globalLang in copy ? globalLang : "es");
  const t = copy[uiLang];

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLangChange = (code) => {
    setUiLang(code);
    if ((code === "es" || code === "en") && code !== globalLang) toggle();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError(t.invalid); return; }
    setLoading(true);
    const result = await requestLink(email.trim());
    setLoading(false);
    if (result.error) setError(result.error);
    else setSent(true);
  };

  return (
    React.createElement('div', { className: "min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FAF7F4]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
      , React.createElement('div', { className: "absolute inset-0 z-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
        , React.createElement('img', { src: `${BASE}hero-bg.png`, alt: "", 'aria-hidden': true, className: "absolute inset-0 w-full h-full object-cover object-center", style: { opacity: 0.45 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}} )
        , React.createElement('div', { className: "absolute inset-0 bg-[#FAF7F4]/58", __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}} )
      )
      , React.createElement('div', { className: "relative z-10 w-full max-w-md mx-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
        , React.createElement('div', { className: "text-center mb-7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
          , React.createElement('img', { src: `${BASE}aceai-logo-red.jpg`, alt: "ACEAI", className: "h-32 w-auto mx-auto mb-5 rounded-2xl shadow-lg", __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}} )
          , React.createElement('h1', { className: "font-serif text-3xl font-light text-foreground leading-tight", __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}, t.title)
          , React.createElement('p', { className: "gradient-text-animated font-semibold text-xl mt-0.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, t.subtitle)
          , React.createElement('div', { className: "flex items-center justify-center gap-2 mt-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
            , langLabels.map(({ code }) => (
              React.createElement('button', {
                key: code, onClick: () => handleLangChange(code),
                className: `px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] border transition-all duration-200 ${uiLang === code ? "bg-accent text-white border-accent shadow-[0_2px_12px_hsl(275_70%_52%_/_0.35)]" : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent bg-white/60"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
                , code
              )
            ))
          )
        )
        , React.createElement('div', { className: "glass rounded-3xl p-8 border border-white/65 shadow-[0_8px_40px_rgba(0,0,0,0.07)]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
          , sent
            ? React.createElement('div', { className: "text-center py-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
                , React.createElement(CheckCircle2, { className: "w-12 h-12 text-accent mx-auto mb-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}} )
                , React.createElement('h2', { className: "font-serif text-2xl font-light mb-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, t.sentTitle)
                , React.createElement('p', { className: "text-sm text-muted-foreground leading-relaxed", __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, t.sentMsg)
              )
            : React.createElement('form', { onSubmit: handleSubmit, className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
                , React.createElement('div', { __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
                  , React.createElement('label', { className: "text-xs font-medium text-muted-foreground uppercase tracking-[0.18em] mb-2 block", __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, t.email)
                  , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                    , React.createElement(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground", __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
                    , React.createElement(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: t.placeholder_email, className: "pl-10 bg-white/70 border-border/50 focus-visible:ring-accent/30", autoComplete: "email", required: true, 'data-testid': "input-email", __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}} )
                  )
                )
                , error && (
                  React.createElement('div', { className: "text-sm text-primary bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 text-center", __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}, error)
                )
                , React.createElement(Button, { type: "submit", disabled: loading, className: "w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-white shadow-[0_4px_20px_hsl(275_70%_52%_/_0.35)] hover:shadow-[0_6px_28px_hsl(275_70%_52%_/_0.50)] transition-all font-medium", 'data-testid': "button-login", __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
                  , loading ? t.loading : t.cta
                )
                , React.createElement('p', { className: "text-xs text-center text-muted-foreground/55 mt-6 leading-relaxed", __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}, t.hint)
              )
        )
      )
    )
  );
}

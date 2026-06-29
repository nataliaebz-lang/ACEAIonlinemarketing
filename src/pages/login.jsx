import * as React from "react";
const _jsxFileName = "";import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BASE = import.meta.env.BASE_URL;

const copy = {
  es: {
    title: "PFT Partner",
    subtitle: "Miembros Fundadoras",
    email: "Correo electrónico",
    password: "Contraseña",
    placeholder_email: "tu@email.com",
    cta: "Entrar al Dashboard",
    loading: "Entrando...",
    hint: "Recibiste tus credenciales por email al completar tu membresía.",
  },
  en: {
    title: "PFT Partner",
    subtitle: "Founding Members",
    email: "Email",
    password: "Password",
    placeholder_email: "your@email.com",
    cta: "Sign In",
    loading: "Signing in...",
    hint: "You received your credentials by email when you completed your membership.",
  },
  pt: {
    title: "PFT Partner",
    subtitle: "Membros Fundadoras",
    email: "E-mail",
    password: "Senha",
    placeholder_email: "seu@email.com",
    cta: "Entrar no Dashboard",
    loading: "Entrando...",
    hint: "Você recebeu suas credenciais por e-mail ao completar sua assinatura.",
  },
};



const langLabels = [
  { code: "es" },
  { code: "en" },
  { code: "pt" },
];

export default function Login() {
  const { login } = useAuth();
  const { lang: globalLang, toggle } = useLanguage();
  const [, setLocation] = useLocation();

  const [uiLang, setUiLang] = useState(
    (globalLang ) in copy ? (globalLang ) : "es"
  );
  const t = copy[uiLang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLangChange = (code) => {
    setUiLang(code);
    if ((code === "es" || code === "en") && code !== globalLang) toggle();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setLocation("/");
    }
  };

  return (
    React.createElement('div', { className: "min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FAF7F4]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
      /* Background photo */
      , React.createElement('div', { className: "absolute inset-0 z-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
        , React.createElement('img', {
          src: `${BASE}hero-bg.png`,
          alt: "",
          'aria-hidden': true,
          className: "absolute inset-0 w-full h-full object-cover object-center"     ,
          style: { opacity: 0.45 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
        )
        , React.createElement('div', { className: "absolute inset-0 bg-[#FAF7F4]/58"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}} )
      )

      /* Card */
      , React.createElement('div', { className: "relative z-10 w-full max-w-md mx-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}

        /* Logo + Language + Title */
        , React.createElement('div', { className: "text-center mb-7" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
          , React.createElement('img', {
            src: `${BASE}aceai-logo-red.jpg`,
            alt: "ACEAI",
            className: "h-32 w-auto mx-auto mb-5 rounded-2xl shadow-lg"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
          )

          , React.createElement('h1', { className: "font-serif text-3xl font-light text-foreground leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
            , t.title
          )
          , React.createElement('p', { className: "gradient-text-animated font-semibold text-xl mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
            , t.subtitle
          )

          , React.createElement('div', { className: "flex items-center justify-center gap-2 mt-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
            , langLabels.map(({ code }) => (
              React.createElement('button', {
                key: code,
                onClick: () => handleLangChange(code),
                className: `px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] border transition-all duration-200 ${
                  uiLang === code
                    ? "bg-accent text-white border-accent shadow-[0_2px_12px_hsl(275_70%_52%_/_0.35)]"
                    : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent bg-white/60"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}

                , code
              )
            ))
          )
        )

        /* Form card */
        , React.createElement('div', { className: "glass rounded-3xl p-8 border border-white/65 shadow-[0_8px_40px_rgba(0,0,0,0.07)]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
          , React.createElement('form', { onSubmit: handleSubmit, className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
              , React.createElement('label', { className: "text-xs font-medium text-muted-foreground uppercase tracking-[0.18em] mb-2 block"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
                , t.email
              )
              , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                , React.createElement(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
                , React.createElement(Input, {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: t.placeholder_email,
                  className: "pl-10 bg-white/70 border-border/50 focus-visible:ring-accent/30"   ,
                  autoComplete: "email",
                  required: true,
                  'data-testid': "input-email", __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                )
              )
            )

            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
              , React.createElement('label', { className: "text-xs font-medium text-muted-foreground uppercase tracking-[0.18em] mb-2 block"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
                , t.password
              )
              , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
                , React.createElement(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}} )
                , React.createElement(Input, {
                  type: showPassword ? "text" : "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "••••••••••••",
                  className: "pl-10 pr-10 bg-white/70 border-border/50 focus-visible:ring-accent/30"    ,
                  autoComplete: "current-password",
                  required: true,
                  'data-testid': "input-password", __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
                )
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}

                  , showPassword ? React.createElement(EyeOff, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}} ) : React.createElement(Eye, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}} )
                )
              )
            )

            , error && (
              React.createElement('div', { className: "text-sm text-primary bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 text-center"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                , error
              )
            )

            , React.createElement(Button, {
              type: "submit",
              disabled: loading,
              className: "w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-white shadow-[0_4px_20px_hsl(275_70%_52%_/_0.35)] hover:shadow-[0_6px_28px_hsl(275_70%_52%_/_0.50)] transition-all font-medium"         ,
              'data-testid': "button-login", __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}

              , loading ? t.loading : t.cta
            )
          )

          , React.createElement('p', { className: "text-xs text-center text-muted-foreground/55 mt-6 leading-relaxed"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}
            , t.hint
          )
        )
      )
    )
  );
}

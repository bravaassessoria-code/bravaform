"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

const C = {
  bg: "#07010F", bgCard: "#0F0520", purple: "#7C3AED",
  purpleLight: "#A855F7", white: "#FFFFFF", muted: "#9478C0",
  border: "#2D1458", green: "#22C55E", red: "#EF4444",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage("");
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else window.location.href = "/dashboard";
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Verifique seu e-mail para confirmar o cadastro!");
    }
    setLoading(false);
  }

  const input: React.CSSProperties = {
    width: "100%", background: "#160830",
    border: `1px solid ${C.border}`, borderRadius: 12,
    padding: "13px 16px", fontSize: 15, color: C.white,
    boxSizing: "border-box", outline: "none", fontFamily: "sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "sans-serif" }}>
      {/* BG glow */}
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #6B21E833 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="logo" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", marginBottom: 12, display: "block", margin: "0 auto 12px" }} />
          <h1 style={{ fontSize: 24, fontWeight: 900, color: C.white, margin: 0, letterSpacing: "-0.03em" }}>
            Brava<span style={{ color: C.purpleLight }}>Form</span>
          </h1>
          <p style={{ color: C.muted, fontSize: 14, margin: "6px 0 0" }}>
            {isLogin ? "Entre na sua conta" : "Crie sua conta grátis"}
          </p>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogle} style={{ width: "100%", background: C.white, color: "#1a1a1a", border: "none", borderRadius: 12, padding: "13px 16px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "sans-serif" }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar com Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ fontSize: 12, color: C.muted }}>ou entre com e-mail</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>

        {/* Email/Password */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 600 }}>E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" style={input} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 600 }}>Senha</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={input} />
        </div>

        {message && (
          <div style={{ background: message.includes("mail") ? C.green + "22" : C.red + "22", color: message.includes("mail") ? C.green : C.red, borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
            {message}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16, fontFamily: "sans-serif" }}>
          {loading ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}
        </button>

        <p style={{ textAlign: "center", fontSize: 14, color: C.muted, margin: 0 }}>
          {isLogin ? "Não tem conta? " : "Já tem conta? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: C.purpleLight, cursor: "pointer", fontWeight: 700 }}>
            {isLogin ? "Cadastre-se" : "Entrar"}
          </span>
        </p>

        <p style={{ textAlign: "center", fontSize: 11, color: C.muted + "88", marginTop: 20, lineHeight: 1.5 }}>
          Ao continuar você concorda com nossos{" "}
          <span style={{ color: C.purpleLight, cursor: "pointer" }}>Termos de Uso</span> e{" "}
          <span style={{ color: C.purpleLight, cursor: "pointer" }}>Política de Privacidade</span>
        </p>
      </div>
    </div>
  );
}
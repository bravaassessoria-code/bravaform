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
    boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "sans-serif" }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, width: "100%", maxWidth: 400 }}>
       <h1 style={{ fontSize: 24, fontWeight: 900, color: C.white, margin: "0 0 8px", textAlign: "center" }}>
  <img src="/logo.png" alt="logo" style={{ width: 80, height: 80, borderRadius: "50%", display: "block", margin: "0 auto 8px" }} />
  Brava<span style={{ color: C.purpleLight }}>Form</span>
</h1>
        <p style={{ color: C.muted, textAlign: "center", margin: "0 0 28px", fontSize: 14 }}>
          {isLogin ? "Entre na sua conta" : "Crie sua conta grátis"}
        </p>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 600 }}>E-mail</label>
          <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 600 }}>Senha</label>
          <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {message && (
          <div style={{ background: message.includes("mail") ? C.green + "22" : C.red + "22", color: message.includes("mail") ? C.green : C.red, borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
            {message}
          </div>
        )}
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>
          {loading ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}
        </button>
        <p style={{ textAlign: "center", fontSize: 14, color: C.muted, margin: 0 }}>
          {isLogin ? "Não tem conta? " : "Já tem conta? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: C.purpleLight, cursor: "pointer", fontWeight: 700 }}>
            {isLogin ? "Cadastre-se" : "Entrar"}
          </span>
        </p>
      </div>
    </div>
  );
}
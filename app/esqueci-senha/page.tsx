"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => setMounted(true), []);

  async function handleReset() {
    if (!email) { setError("Digite seu e-mail"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nova-senha`,
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  }

  const input: React.CSSProperties = {
    width: "100%", background: "#0D0225",
    border: "1px solid #2D1458", borderRadius: 12,
    padding: "14px 16px", fontSize: 15, color: "#fff",
    boxSizing: "border-box", outline: "none",
    fontFamily: "sans-serif", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07010F", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "sans-serif" }}>
      <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #6B21E833 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ background: "#0F0520", border: "1px solid #2D1458", borderRadius: 20, padding: 40, width: "100%", maxWidth: 420, position: "relative", zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/login" style={{ textDecoration: "none" }}>
            <img src="/logo.png" alt="logo" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", marginBottom: 16, display: "block", margin: "0 auto 16px" }} />
          </a>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
            Recuperar senha
          </h1>
          <p style={{ color: "#9478C0", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            {sent ? "Verifique seu e-mail!" : "Digite seu e-mail e enviaremos um link para redefinir sua senha"}
          </p>
        </div>

        {sent ? (
          <div>
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#22C55E22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <p style={{ color: "#EDE9FE", fontSize: 15, lineHeight: 1.7, margin: "0 0 8px" }}>
                Enviamos um link para <strong style={{ color: "#A855F7" }}>{email}</strong>
              </p>
              <p style={{ color: "#9478C0", fontSize: 13, margin: "0 0 32px" }}>
                Verifique sua caixa de entrada e spam
              </p>
            </div>
            <a href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Voltar ao login
            </a>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: "#9478C0", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>E-mail</label>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="voce@email.com"
                style={input}
                onFocus={e => (e.currentTarget.style.borderColor = "#A855F7")}
                onBlur={e => (e.currentTarget.style.borderColor = "#2D1458")}
                onKeyDown={e => e.key === "Enter" && handleReset()}
              />
            </div>

            {error && (
              <div style={{ background: "#EF444422", color: "#EF4444", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16, border: "1px solid #EF444433" }}>
                {error}
              </div>
            )}

            <button onClick={handleReset} disabled={loading}
              style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16, fontFamily: "sans-serif", boxShadow: "0 8px 32px #7C3AED44" }}>
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>

            <a href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#9478C0", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Voltar ao login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
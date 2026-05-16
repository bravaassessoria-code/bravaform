"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = Array.from({ length: 50 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 0.5, speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3, opacity: Math.random() * 0.5 + 0.1, color: Math.random() > 0.5 ? "#A855F7" : "#E879F9" }));
    let running = true;
    function animate() {
      if (!running || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.x += p.speedX; p.y += p.speedY; if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0"); ctx.fill(); });
      requestAnimationFrame(animate);
    }
    animate();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    const m = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  async function handleGoogle() {
    setGoogleLoading(true);
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
    width: "100%", background: "#0D0225",
    border: "1px solid #2D1458", borderRadius: 12,
    padding: "14px 16px", fontSize: 15, color: "#fff",
    boxSizing: "border-box", outline: "none",
    fontFamily: "sans-serif", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07010F", display: "flex", fontFamily: "sans-serif", overflow: "hidden" }}>
      <ParticleField />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED0D, transparent 70%)", pointerEvents: "none", zIndex: 1, transition: "left 0.15s, top 0.15s" }} />

      {/* Left panel — hidden on small screens */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px", position: "relative", zIndex: 1, background: "linear-gradient(160deg, #0D0225 0%, #07010F 100%)", borderRight: "1px solid #2D1458" }}>

        {/* Floating orbs */}
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED33, transparent 70%)", filter: "blur(40px)", animation: "float1 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #E879F922, transparent 70%)", filter: "blur(50px)", animation: "float2 10s ease-in-out infinite", pointerEvents: "none" }} />

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="logo" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Brava<span style={{ color: "#A855F7" }}>Form</span></span>
          </div>
        </div>

        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 1s ease 0.3s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7C3AED22", color: "#C084FC", border: "1px solid #7C3AED44", borderRadius: 24, padding: "6px 16px", fontSize: 13, fontWeight: 700, marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 8px #22C55E" }} />
            4.800+ leads capturados
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#fff", margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
            Seus leads.<br />
            <span style={{ background: "linear-gradient(90deg, #A855F7, #E879F9, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Qualificados pela IA.
            </span>
          </h2>
          <p style={{ color: "#9478C0", fontSize: 17, lineHeight: 1.7, margin: "0 0 48px", maxWidth: 400 }}>
            Entre na plataforma e veja quais leads valem seu tempo — em tempo real.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32 }}>
            {[["4.800+", "Leads capturados"], ["98%", "Taxa de entrega"], ["R$ 2.4M+", "Em vendas geradas"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 12, color: "#9478C0", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "all 1s ease 0.6s", background: "linear-gradient(135deg, #160830, #0F0520)", border: "1px solid #2D1458", borderRadius: 16, padding: 20 }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "#EDE9FE", lineHeight: 1.7, margin: "0 0 14px", fontStyle: "italic" }}>
            "Em 2 semanas qualifiquei 180 leads e fechei 3 contratos. O score de IA mudou tudo."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>CD</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Carla Domingues</div>
              <div style={{ fontSize: 11, color: "#9478C0" }}>Agência de Marketing, SP</div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-30px)}}
          @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,20px)}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        `}</style>
      </div>

      {/* Right panel — Login form */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.2s" }}>

          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
            {isLogin ? "Bem-vindo de volta" : "Criar sua conta"}
          </h1>
          <p style={{ color: "#9478C0", fontSize: 15, margin: "0 0 32px" }}>
            {isLogin ? "Entre para acessar seu painel de leads" : "Comece grátis, sem cartão de crédito"}
          </p>

          {/* Google Button */}
          <button onClick={handleGoogle} disabled={googleLoading}
            style={{ width: "100%", background: "#fff", color: "#1a1a1a", border: "none", borderRadius: 12, padding: "14px 16px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "sans-serif", boxShadow: "0 4px 20px #00000033", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px #00000044"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px #00000033"; }}>
            {googleLoading ? (
              <span style={{ color: "#666" }}>Conectando...</span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar com Google
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "#2D1458" }} />
            <span style={{ fontSize: 12, color: "#9478C0", fontWeight: 600 }}>ou continue com e-mail</span>
            <div style={{ flex: 1, height: 1, background: "#2D1458" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, color: "#9478C0", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" style={input}
              onFocus={e => (e.currentTarget.style.borderColor = "#A855F7")}
              onBlur={e => (e.currentTarget.style.borderColor = "#2D1458")} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 12, color: "#9478C0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Senha</label>
              {isLogin && <span style={{ fontSize: 12, color: "#A855F7", cursor: "pointer", fontWeight: 600 }}>Esqueceu?</span>}
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={input}
              onFocus={e => (e.currentTarget.style.borderColor = "#A855F7")}
              onBlur={e => (e.currentTarget.style.borderColor = "#2D1458")} />
          </div>

          {/* Message */}
          {message && (
            <div style={{ background: message.includes("mail") ? "#22C55E22" : "#EF444422", color: message.includes("mail") ? "#22C55E" : "#EF4444", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16, border: `1px solid ${message.includes("mail") ? "#22C55E33" : "#EF444433"}` }}>
              {message}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 16, fontWeight: 800, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif", boxShadow: "0 8px 32px #7C3AED44", transition: "transform 0.2s, box-shadow 0.2s", letterSpacing: "-0.01em" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px #7C3AED66"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px #7C3AED44"; }}>
            {loading ? "Aguarde..." : isLogin ? "Entrar na plataforma" : "Criar minha conta"}
          </button>

          {/* Toggle */}
          <p style={{ textAlign: "center", fontSize: 14, color: "#9478C0", margin: "0 0 24px" }}>
            {isLogin ? "Não tem conta? " : "Já tem conta? "}
            <span onClick={() => { setIsLogin(!isLogin); setMessage(""); }} style={{ color: "#A855F7", cursor: "pointer", fontWeight: 700 }}>
              {isLogin ? "Cadastre-se grátis" : "Entrar"}
            </span>
          </p>

          {/* Security badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9478C0" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: "SSL seguro" },
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9478C0" strokeWidth="1.5" strokeLinecap="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text: "Dados criptografados" },
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9478C0" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>, text: "LGPD compliant" },
            ].map(b => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {b.icon}
                <span style={{ fontSize: 11, color: "#9478C0" }}>{b.text}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 11, color: "#9478C0" + "88", marginTop: 20, lineHeight: 1.6 }}>
            Ao continuar você concorda com nossos{" "}
            <span style={{ color: "#A855F7", cursor: "pointer" }}>Termos de Uso</span> e{" "}
            <span style={{ color: "#A855F7", cursor: "pointer" }}>Política de Privacidade</span>
          </p>
        </div>
      </div>
    </div>
  );
}
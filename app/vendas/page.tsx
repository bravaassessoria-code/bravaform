"use client";
import { useState, useEffect, useRef } from "react";
import { Brain, MessageCircle, Instagram, Zap, Filter, LayoutDashboard, Download, Link2, BarChart2, Check, X, ArrowRight, Star, Users, TrendingUp, Shield, Clock, ChevronDown, Sparkles, AlertCircle, Frown, PieChart } from "lucide-react";

function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #9B59F5aa, #4A0FAD44, transparent 70%)", animation: "float1 8s ease-in-out infinite", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", top: "50%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle at 60% 40%, #E879F944, #7C3AED33, transparent 70%)", animation: "float2 10s ease-in-out infinite", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "30%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle at 40% 60%, #F59E0B33, #E879F922, transparent 70%)", animation: "float3 12s ease-in-out infinite", filter: "blur(60px)" }} />
      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-40px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-40px,30px) scale(1.08)} 66%{transform:translate(20px,-20px) scale(0.95)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,40px) scale(1.03)} 66%{transform:translate(-30px,-10px) scale(0.97)} }
      `}</style>
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 0.5, speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3, opacity: Math.random() * 0.5 + 0.1, color: Math.random() > 0.5 ? "#A855F7" : "#E879F9" }));
    let running = true;
    function animate() {
      if (!running || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Card3D({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setRotate({ x: (e.clientY - r.top - r.height / 2) / r.height * -10, y: (e.clientX - r.left - r.width / 2) / r.width * 10 }); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setRotate({ x: 0, y: 0 }); }}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hover ? 1.02 : 1})`, transition: hover ? "transform 0.1s ease" : "transform 0.5s ease", ...style }}>
      {children}
    </div>
  );
}

function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0; const step = end / (2000 / 16);
    const timer = setInterval(() => { start += step; if (start >= end) { setCount(end); clearInterval(timer); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(timer);
  }, [visible, end]);
  return <span ref={ref}>{prefix}{count.toLocaleString("pt-BR")}{suffix}</span>;
}

const plans = [
  {
    id: "free", name: "Starter", price: 0, tag: "Grátis para sempre",
    color: "#9478C0", highlight: false, cta: "Começar grátis", ctaNote: "Sem cartão de crédito",
    features: [
      { text: "1 formulário ativo", ok: true },
      { text: "Até 20 leads/mês", ok: true },
      { text: "3 perguntas por formulário", ok: true },
      { text: "Dashboard básico", ok: true },
      { text: "WhatsApp e E-mail direto", ok: false },
      { text: "Score de IA por lead", ok: false },
      { text: "Filtros avançados", ok: false },
      { text: "Exportar CSV / Excel", ok: false },
      { text: "Integração Instagram Ads", ok: false },
    ],
  },
  {
    id: "pro", name: "Pro", price: 97, tag: "Mais popular",
    color: "#A855F7", highlight: true, cta: "Assinar Pro", ctaNote: "7 dias grátis · Cancele quando quiser",
    features: [
      { text: "10 formulários ativos", ok: true },
      { text: "Leads ilimitados", ok: true },
      { text: "Perguntas ilimitadas", ok: true },
      { text: "Dashboard completo", ok: true },
      { text: "WhatsApp e E-mail direto", ok: true },
      { text: "Score de IA por lead", ok: true },
      { text: "Filtros avançados", ok: true },
      { text: "Exportar CSV / Excel", ok: true },
      { text: "Integração Instagram Ads", ok: false },
    ],
  },
  {
    id: "agency", name: "Agência", price: 297, tag: "Para times",
    color: "#F59E0B", highlight: false, cta: "Assinar Agência", ctaNote: "7 dias grátis · Multi-usuário",
    features: [
      { text: "Formulários ilimitados", ok: true },
      { text: "Leads ilimitados", ok: true },
      { text: "Perguntas ilimitadas", ok: true },
      { text: "Dashboard completo", ok: true },
      { text: "WhatsApp e E-mail direto", ok: true },
      { text: "Score de IA por lead", ok: true },
      { text: "Filtros avançados", ok: true },
      { text: "Exportar CSV / Excel", ok: true },
      { text: "Integração Instagram Ads", ok: true },
    ],
  },
];

const faqs = [
  { q: "Como funciona o período grátis?", a: "Você cadastra seu e-mail e já acessa o plano Starter sem cartão. Para planos pagos, 7 dias grátis — só cobra depois." },
  { q: "Posso cancelar quando quiser?", a: "Sim. Sem fidelidade, sem multa. Cancele em 1 clique no painel." },
  { q: "Como recebo meu acesso após o pagamento?", a: "Acesso liberado automaticamente por e-mail em até 2 minutos via Mercado Pago." },
  { q: "O que é o Score de IA?", a: "Cada lead recebe pontuação automática de 0 a 100. Você sabe quem vale seu tempo sem ligar pra todo mundo." },
  { q: "Funciona para Instagram e Google Ads?", a: "Perfeitamente. Gere um link único e use em qualquer anúncio, bio ou WhatsApp." },
  { q: "O que é a integração com Instagram Ads?", a: "No plano Agência você conecta direto com o Meta Ads Manager para capturar leads dos anúncios sem link externo." },
];

function CheckoutModal({ plan, onClose }: { plan: typeof plans[0]; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("pix");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handlePay() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setDone(true);
    setLoading(false);
  }

  const input: React.CSSProperties = { width: "100%", background: "#160830", border: "1px solid #2D1458", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#fff", fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", backdropFilter: "blur(16px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "linear-gradient(160deg, #160830, #0F0520)", border: "1px solid #2D1458", borderRadius: 24, padding: 32, maxWidth: 420, width: "100%", position: "relative", fontFamily: "sans-serif", boxShadow: "0 40px 80px #00000088" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#2D145833", border: "none", color: "#9478C0", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={16} />
        </button>

        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#22C55E22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Check size={36} color="#22C55E" />
            </div>
            <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.03em" }}>Acesso liberado!</h3>
            <p style={{ color: "#9478C0", fontSize: 14, margin: "0 0 24px", lineHeight: 1.6 }}>Enviamos os dados para <strong style={{ color: "#EDE9FE" }}>{email}</strong></p>
            <a href="/dashboard" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Acessar plataforma <ArrowRight size={18} />
            </a>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#9478C0", marginBottom: 4 }}>Plano selecionado</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{plan.name}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#A855F7" }}>{plan.price === 0 ? "Grátis" : `R$ ${plan.price}/mês`}</div>
              </div>
            </div>
            {step === 1 && (
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#9478C0", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>E-mail de acesso</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" style={input} />
                <button onClick={() => plan.price === 0 ? handlePay() : setStep(2)} disabled={!email}
                  style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: !email ? "not-allowed" : "pointer", opacity: !email ? 0.6 : 1, fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {plan.price === 0 ? "Criar conta grátis" : "Continuar"} <ArrowRight size={18} />
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div style={{ fontSize: 12, color: "#9478C0", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Forma de pagamento</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {[["pix", "PIX", <Zap size={14} />], ["card", "Cartão", <Shield size={14} />], ["boleto", "Boleto", <Clock size={14} />]].map(([id, label, icon]) => (
                    <button key={id as string} onClick={() => setMethod(id as string)}
                      style={{ flex: 1, background: method === id ? "#7C3AED33" : "#160830", color: method === id ? "#A855F7" : "#9478C0", border: `1px solid ${method === id ? "#7C3AED" : "#2D1458"}`, borderRadius: 10, padding: "10px 4px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      {icon as React.ReactNode} {label as string}
                    </button>
                  ))}
                </div>
                {method === "pix" && (
                  <div style={{ textAlign: "center", padding: "24px 20px", background: "#160830", borderRadius: 14, marginBottom: 16, border: "1px solid #2D1458" }}>
                    <Zap size={48} color="#A855F7" style={{ margin: "0 auto 8px" }} />
                    <div style={{ fontSize: 14, color: "#EDE9FE", fontWeight: 600, marginBottom: 4 }}>Pague via PIX</div>
                    <div style={{ fontSize: 12, color: "#9478C0" }}>QR Code gerado após confirmação</div>
                    <div style={{ marginTop: 12, background: "#7C3AED22", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#A855F7", fontWeight: 700 }}>Aprovação instantânea</div>
                  </div>
                )}
                {method === "card" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                    <input placeholder="0000 0000 0000 0000" style={input} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <input placeholder="MM/AA" style={input} />
                      <input placeholder="CVV" style={input} />
                    </div>
                    <input placeholder="Nome no cartão" style={input} />
                  </div>
                )}
                {method === "boleto" && (
                  <div style={{ textAlign: "center", padding: 20, background: "#160830", borderRadius: 14, marginBottom: 16, border: "1px solid #2D1458" }}>
                    <div style={{ fontSize: 13, color: "#9478C0", lineHeight: 1.6 }}>Boleto enviado por e-mail.<br />Acesso em até 1 dia útil após compensação.</div>
                  </div>
                )}
                <button onClick={handlePay} disabled={loading}
                  style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Shield size={16} /> {loading ? "Processando..." : `Finalizar · R$ ${plan.price}/mês`}
                </button>
                <div style={{ fontSize: 11, color: "#9478C0", textAlign: "center", marginTop: 10 }}>Pagamento 100% seguro via Mercado Pago</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Vendas() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState("monthly");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const s = () => setScrollY(window.scrollY);
    const m = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", s);
    window.addEventListener("mousemove", m);
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("mousemove", m); };
  }, []);

  return (
    <div style={{ background: "#07010F", minHeight: "100vh", fontFamily: "sans-serif", color: "#EDE9FE", overflowX: "hidden" }}>
      <ParticleField />
      <FloatingOrbs />
      <div style={{ position: "fixed", left: mousePos.x - 150, top: mousePos.y - 150, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED11, transparent 70%)", pointerEvents: "none", zIndex: 1, transition: "left 0.1s, top 0.1s" }} />

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#07010Fcc", backdropFilter: "blur(20px)", borderBottom: scrollY > 50 ? "1px solid #2D1458" : "1px solid transparent", transition: "border-color 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Brava<span style={{ color: "#A855F7" }}>Form</span></span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["funcionalidades", "Funcionalidades"], ["planos", "Planos"], ["faq", "FAQ"]].map(([id, label]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", color: "#9478C0", border: "none", fontSize: 14, cursor: "pointer", fontFamily: "sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9478C0")}>
              {label}
            </button>
          ))}
          <button onClick={() => setSelectedPlan(plans[0])} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            Começar grátis <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 32px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 780 }}>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7C3AED22", color: "#C084FC", border: "1px solid #7C3AED44", borderRadius: 24, padding: "6px 18px", fontSize: 13, fontWeight: 700, marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 8px #22C55E" }} />
              Plataforma ao vivo · 4.800+ leads capturados
            </div>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards" }}>
            <h1 style={{ fontSize: "clamp(42px, 7vw, 76px)", fontWeight: 900, color: "#fff", margin: "0 0 24px", lineHeight: 1.0, letterSpacing: "-0.05em" }}>
              Capture leads.<br />
              <span style={{ background: "linear-gradient(90deg, #A855F7, #E879F9, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Feche contratos.
              </span>
            </h1>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.6s forwards" }}>
            <p style={{ fontSize: 20, color: "#9478C0", lineHeight: 1.7, margin: "0 0 48px", maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
              A IA qualifica seus leads automaticamente. Você foca só em quem vai comprar.
            </p>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.8s forwards", display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setSelectedPlan(plans[0])} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 16, padding: "18px 40px", fontSize: 17, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 40px #7C3AED66", display: "flex", alignItems: "center", gap: 8 }}>
              Começar grátis agora <ArrowRight size={20} />
            </button>
            <button onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: "#EDE9FE", border: "1px solid #2D1458", borderRadius: 16, padding: "18px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Ver planos
            </button>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 1s forwards", marginTop: 80, display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap" }}>
            {[
              { icon: <Users size={20} color="#A855F7" />, n: 4800, suffix: "+", label: "leads capturados" },
              { icon: <LayoutDashboard size={20} color="#A855F7" />, n: 320, suffix: "+", label: "formulários ativos" },
              { icon: <TrendingUp size={20} color="#A855F7" />, n: 2400000, prefix: "R$ ", suffix: "", label: "em vendas geradas" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>
                  <Counter end={s.n} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, color: "#9478C0", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dores */}
      <section style={{ padding: "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#fff", textAlign: "center", margin: "0 0 16px", letterSpacing: "-0.04em" }}>
              Quanto dinheiro você está<br /><span style={{ color: "#EF4444" }}>deixando na mesa?</span>
            </h2>
            <p style={{ color: "#9478C0", textAlign: "center", fontSize: 16, margin: "0 0 56px" }}>Se você não qualifica seus leads, está perdendo tempo e dinheiro.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: <AlertCircle size={40} color="#EF4444" />, title: "Liga pra todo mundo", desc: "Perde horas com leads frios que nunca vão comprar. Energia desperdiçada.", color: "#EF4444" },
              { icon: <TrendingUp size={40} color="#F59E0B" />, title: "Sem critério de qualidade", desc: "Não sabe qual lead tem potencial real. Fecha menos do que poderia.", color: "#F59E0B" },
              { icon: <Frown size={40} color="#E879F9" />, title: "Dados espalhados", desc: "Instagram, DM, WhatsApp, planilha... você não sabe onde estão seus clientes.", color: "#E879F9" },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 150}>
                <Card3D style={{ background: `linear-gradient(160deg, ${p.color}11, #0F0520)`, border: `1px solid ${p.color}33`, borderRadius: 20, padding: 28, height: "100%", boxSizing: "border-box" as React.CSSProperties["boxSizing"] }}>
                  <div style={{ marginBottom: 16 }}>{p.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: "#9478C0", lineHeight: 1.7 }}>{p.desc}</div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" style={{ padding: "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#22C55E22", color: "#22C55E", border: "1px solid #22C55E33", borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                <Sparkles size={14} /> 3 diferenciais exclusivos
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.04em" }}>
                Nenhum concorrente tem<br />tudo isso junto
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 40 }}>
            {[
              { icon: <Brain size={44} color="#A855F7" />, title: "Score de IA por lead", desc: "Cada lead recebe pontuação automática de 0 a 100. Foque só nos quentes.", gradient: "linear-gradient(135deg, #7C3AED22, #E879F911)", border: "#A855F744" },
              { icon: <MessageCircle size={44} color="#25D366" />, title: "WhatsApp com 1 clique", desc: "Abra o WhatsApp do lead direto do dashboard. Zero fricção, mais vendas.", gradient: "linear-gradient(135deg, #25D36622, #22C55E11)", border: "#25D36644" },
              { icon: <Instagram size={44} color="#F59E0B" />, title: "Integração Instagram Ads", desc: "Conecte ao Meta Ads Manager e capture leads dos anúncios sem link externo.", gradient: "linear-gradient(135deg, #F59E0B22, #E879F911)", border: "#F59E0B44" },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 200}>
                <Card3D style={{ background: f.gradient, border: `1px solid ${f.border}`, borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: f.border, filter: "blur(20px)", opacity: 0.5 }} />
                  <div style={{ marginBottom: 20 }}>{f.icon}</div>
                  <div style={{ display: "inline-block", background: "#fff1", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>EXCLUSIVO</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#9478C0", lineHeight: 1.7 }}>{f.desc}</div>
                </Card3D>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {[
                { icon: <Zap size={24} color="#A855F7" />, title: "Formulário em 5 min" },
                { icon: <Filter size={24} color="#A855F7" />, title: "Filtros inteligentes" },
                { icon: <LayoutDashboard size={24} color="#A855F7" />, title: "Dashboard completo" },
                { icon: <Download size={24} color="#A855F7" />, title: "Exportar CSV/Excel" },
                { icon: <Link2 size={24} color="#A855F7" />, title: "Link universal" },
                { icon: <BarChart2 size={24} color="#A855F7" />, title: "Relatórios avançados" },
              ].map(f => (
                <div key={f.title} style={{ background: "#0F0520", border: "1px solid #2D1458", borderRadius: 14, padding: "20px 14px", textAlign: "center", transition: "border-color 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#A855F7"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2D1458"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#EDE9FE" }}>{f.title}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Depoimentos */}
      <section style={{ padding: "80px 32px", position: "relative", zIndex: 1, background: "linear-gradient(180deg, transparent, #0F052088, transparent)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: "#fff", textAlign: "center", margin: "0 0 48px", letterSpacing: "-0.04em" }}>
              Quem usa, <span style={{ color: "#A855F7" }}>não para</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { name: "Carla Domingues", role: "Agência de Marketing, SP", text: "Em 2 semanas qualifiquei 180 leads e fechei 3 contratos. Antes perdia horas ligando pra todo mundo.", avatar: "CD" },
              { name: "Felipe Rezende", role: "Infoprodutor, Educação", text: "O score de IA mudou tudo. Agora só ligo pra quem tem fit real com meu produto.", avatar: "FR" },
              { name: "Bruna Lacerda", role: "Proprietária, Varejo", text: "Simples de usar e os filtros são incríveis. Vejo só leads de alto faturamento em 1 clique.", avatar: "BL" },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 150}>
                <Card3D style={{ background: "linear-gradient(160deg, #160830, #0F0520)", border: "1px solid #2D1458", borderRadius: 20, padding: 24, height: "100%", boxSizing: "border-box" as React.CSSProperties["boxSizing"] }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />)}
                  </div>
                  <p style={{ fontSize: 14, color: "#EDE9FE", lineHeight: 1.8, margin: "0 0 20px", fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#9478C0" }}>{t.role}</div>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" style={{ padding: "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#A855F722", color: "#A855F7", border: "1px solid #A855F744", borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                <PieChart size={14} /> Planos e preços
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.04em" }}>
                Comece grátis.<br />Cresça quando quiser.
              </h2>
              <p style={{ color: "#9478C0", fontSize: 16, margin: "0 0 28px" }}>Sem contratos. Sem surpresas. Cancele quando quiser.</p>
              <div style={{ display: "inline-flex", background: "#0F0520", border: "1px solid #2D1458", borderRadius: 14, padding: 4, gap: 4 }}>
                {[["monthly", "Mensal"], ["annual", "Anual  −20%"]].map(([b, label]) => (
                  <button key={b} onClick={() => setBilling(b)}
                    style={{ background: billing === b ? "linear-gradient(135deg, #7C3AED, #A855F7)" : "transparent", color: billing === b ? "#fff" : "#9478C0", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.2s" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "start" }}>
            {plans.map((plan, i) => {
              const price = billing === "annual" && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price;
              return (
                <Reveal key={plan.id} delay={i * 150}>
                  <Card3D style={{ background: plan.highlight ? "linear-gradient(160deg, #1E0845, #160830)" : "#0F0520", border: `2px solid ${plan.highlight ? "#A855F7" : "#2D1458"}`, borderRadius: 24, padding: 28, position: "relative", boxShadow: plan.highlight ? "0 0 60px #7C3AED33" : "none" }}>
                    {plan.highlight && (
                      <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #7C3AED, #E879F9)", borderRadius: 24, padding: "5px 20px", fontSize: 12, fontWeight: 800, color: "#fff", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
                        <Star size={12} fill="#fff" /> {plan.tag}
                      </div>
                    )}
                    {!plan.highlight && <div style={{ display: "inline-block", background: plan.color + "22", color: plan.color, borderRadius: 20, padding: "2px 12px", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{plan.tag}</div>}
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginTop: plan.highlight ? 16 : 4, letterSpacing: "-0.03em" }}>{plan.name}</div>
                    <div style={{ margin: "20px 0 24px", display: "flex", alignItems: "flex-end", gap: 4 }}>
                      <span style={{ fontSize: 48, fontWeight: 900, color: plan.highlight ? "#A855F7" : plan.price === 0 ? "#9478C0" : plan.color, letterSpacing: "-0.05em", lineHeight: 1 }}>
                        {plan.price === 0 ? "Grátis" : `R$ ${price}`}
                      </span>
                      {plan.price > 0 && <span style={{ fontSize: 14, color: "#9478C0", paddingBottom: 8 }}>/mês</span>}
                    </div>
                    <button onClick={() => setSelectedPlan(plan)}
                      style={{ width: "100%", background: plan.highlight ? "linear-gradient(135deg, #7C3AED, #A855F7)" : `${plan.color}22`, color: plan.highlight ? "#fff" : plan.color, border: plan.highlight ? "none" : `1px solid ${plan.color}44`, borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 10, fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      {plan.cta} <ArrowRight size={16} />
                    </button>
                    <div style={{ fontSize: 11, color: "#9478C0", textAlign: "center", marginBottom: 24 }}>{plan.ctaNote}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {plan.features.map(f => (
                        <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ width: 20, height: 20, borderRadius: "50%", background: f.ok ? "#22C55E22" : "#9478C018", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {f.ok ? <Check size={11} color="#22C55E" /> : <X size={10} color="#9478C0" />}
                          </span>
                          <span style={{ fontSize: 13, color: f.ok ? "#EDE9FE" : "#9478C088" }}>{f.text}</span>
                        </div>
                      ))}
                    </div>
                  </Card3D>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={300}>
            <div style={{ marginTop: 28, background: "linear-gradient(135deg, #7C3AED11, #0F0520)", border: "1px solid #7C3AED33", borderRadius: 18, padding: 20, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <Sparkles size={24} color="#A855F7" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Por que somos mais baratos que os concorrentes?</div>
                <div style={{ fontSize: 14, color: "#9478C0", lineHeight: 1.7 }}>
                  Typeform cobra R$ 199/mês. Jotform cobra R$ 149/mês. O BravaForm foi criado especialmente para o mercado brasileiro com <strong style={{ color: "#A855F7" }}>Score de IA, WhatsApp integrado e integração com Instagram Ads</strong> — sem cobrar pelo que você não usa.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: "#fff", textAlign: "center", margin: "0 0 48px", letterSpacing: "-0.04em" }}>Perguntas frequentes</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: openFaq === i ? "linear-gradient(135deg, #7C3AED11, #0F0520)" : "#0F0520", border: `1px solid ${openFaq === i ? "#A855F7" : "#2D1458"}`, borderRadius: 16, padding: "18px 22px", cursor: "pointer", transition: "all 0.3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{f.q}</span>
                    <ChevronDown size={20} color="#A855F7" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }} />
                  </div>
                  {openFaq === i && <div style={{ marginTop: 14, fontSize: 14, color: "#9478C0", lineHeight: 1.8, borderTop: "1px solid #2D1458", paddingTop: 14 }}>{f.a}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding: "100px 32px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED33 0%, transparent 70%)", pointerEvents: "none" }} />
        <Reveal>
          <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>Pronto para fechar mais?</h2>
            <p style={{ color: "#9478C0", fontSize: 18, margin: "0 0 40px", lineHeight: 1.6 }}>Comece grátis agora. Sem cartão de crédito.</p>
            <button onClick={() => setSelectedPlan(plans[0])}
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7, #E879F9)", color: "#fff", border: "none", borderRadius: 18, padding: "20px 48px", fontSize: 18, fontWeight: 900, cursor: "pointer", boxShadow: "0 12px 48px #7C3AED66", display: "inline-flex", alignItems: "center", gap: 10, transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
              Criar minha conta grátis <ArrowRight size={22} />
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #2D1458", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="logo" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Brava<span style={{ color: "#A855F7" }}>Form</span></span>
        </div>
        <div style={{ fontSize: 13, color: "#9478C0" }}>© 2025 BravaForm · Todos os direitos reservados</div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Termos", "Privacidade", "Suporte"].map(l => (
            <span key={l} style={{ fontSize: 13, color: "#9478C0", cursor: "pointer" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#A855F7")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#9478C0")}>
              {l}
            </span>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {selectedPlan && <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
  );
}
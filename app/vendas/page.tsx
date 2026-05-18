"use client";
import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#07010F", bgCard: "#0F0520", bgCard2: "#160830",
  purple: "#7C3AED", purpleLight: "#A855F7", accent: "#E879F9",
  accentGold: "#F59E0B", white: "#FFFFFF", text: "#EDE9FE",
  muted: "#9478C0", green: "#22C55E", red: "#EF4444",
  border: "#2D1458",
};

const plans = [
  {
    id: "free", name: "Grátis", price: 0, tag: "Para começar",
    color: C.muted, highlight: false, cta: "Começar grátis", ctaNote: "Sem cartão de crédito",
    respostas: "100 respostas/mês",
    features: [
      { text: "1 formulário ativo", ok: true },
      { text: "100 respostas por mês", ok: true },
      { text: "Personalizar cores e logo", ok: true },
      { text: "Suporte em português", ok: true },
      { text: "Busca de CEP", ok: true },
      { text: "Validação CPF/CNPJ", ok: false },
      { text: "Remover marca BravaForm", ok: false },
      { text: "Score de IA por lead", ok: false },
      { text: "WhatsApp integrado", ok: false },
      { text: "Webhooks e integrações", ok: false },
      { text: "Múltiplos usuários", ok: false },
    ],
  },
  {
    id: "solo", name: "Solo", price: 47, tag: "Para freelancers",
    color: C.purpleLight, highlight: false, cta: "Assinar Solo", ctaNote: "7 dias grátis",
    respostas: "1.000 respostas/mês",
    features: [
      { text: "Formulários ilimitados", ok: true },
      { text: "1.000 respostas por mês", ok: true },
      { text: "Personalizar cores e logo", ok: true },
      { text: "Suporte em português", ok: true },
      { text: "Busca de CEP", ok: true },
      { text: "Validação CPF/CNPJ", ok: true },
      { text: "Remover marca BravaForm", ok: true },
      { text: "Score de IA por lead", ok: false },
      { text: "WhatsApp integrado", ok: false },
      { text: "Webhooks e integrações", ok: false },
      { text: "Múltiplos usuários", ok: false },
    ],
  },
  {
    id: "pro", name: "Pro", price: 97, tag: "🔥 Mais popular",
    color: C.purpleLight, highlight: true, cta: "Assinar Pro", ctaNote: "7 dias grátis · Cancele quando quiser",
    respostas: "5.000 respostas/mês",
    features: [
      { text: "Formulários ilimitados", ok: true },
      { text: "5.000 respostas por mês", ok: true },
      { text: "Personalizar cores e logo", ok: true },
      { text: "Suporte em português", ok: true },
      { text: "Busca de CEP", ok: true },
      { text: "Validação CPF/CNPJ", ok: true },
      { text: "Remover marca BravaForm", ok: true },
      { text: "Score de IA por lead", ok: true },
      { text: "WhatsApp integrado", ok: true },
      { text: "Webhooks e integrações", ok: true },
      { text: "Múltiplos usuários", ok: false },
    ],
  },
  {
    id: "empresa", name: "Empresa", price: 197, tag: "Para times",
    color: C.accentGold, highlight: false, cta: "Assinar Empresa", ctaNote: "7 dias grátis · Multi-usuário",
    respostas: "15.000 respostas/mês",
    features: [
      { text: "Formulários ilimitados", ok: true },
      { text: "15.000 respostas por mês", ok: true },
      { text: "Personalizar cores e logo", ok: true },
      { text: "Suporte prioritário", ok: true },
      { text: "Busca de CEP", ok: true },
      { text: "Validação CPF/CNPJ", ok: true },
      { text: "Remover marca BravaForm", ok: true },
      { text: "Score de IA por lead", ok: true },
      { text: "WhatsApp integrado", ok: true },
      { text: "Webhooks e integrações", ok: true },
      { text: "Múltiplos usuários + Times", ok: true },
    ],
  },
];

const integrations = [
  { name: "Google Sheets", color: "#34A853", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { name: "WhatsApp", color: "#25D366", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { name: "Zapier", color: "#FF4A00", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF4A00" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { name: "Make", color: "#6D00CC", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6D00CC" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
  { name: "n8n", color: "#EA4B71", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA4B71" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { name: "Slack", color: "#4A154B", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9C5FD6" strokeWidth="1.5" strokeLinecap="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg> },
  { name: "Pipedrive", color: "#1A1F38", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12V2"/><path d="M22 2 12 12"/></svg> },
  { name: "RD Station", color: "#00A3E0", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00A3E0" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg> },
  { name: "Webhooks", color: "#F59E0B", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
];

const faqs = [
  { q: "O limite mensal se refere a quê?", a: "O limite mensal se refere ao número de respostas recebidas por mês. Cada preenchimento individual conta como uma resposta, independente do número de perguntas. Todo dia 1º do mês o limite é zerado." },
  { q: "Posso cancelar quando quiser?", a: "Sim. Sem fidelidade, sem multa. Cancele em 1 clique no painel a qualquer momento. A conta permanece ativa até o fim do ciclo atual." },
  { q: "Como funcionam os Webhooks?", a: "Webhooks enviam os dados das respostas automaticamente para qualquer sistema externo (Zapier, Make, n8n, Google Sheets, etc.) em tempo real, assim que o formulário é enviado." },
  { q: "O que é o Score de IA?", a: "Cada resposta recebe uma pontuação automática de 0 a 100 baseada nas respostas do formulário. Isso ajuda a identificar quais leads têm maior potencial de conversão." },
  { q: "Vocês validam CPF e CNPJ?", a: "Sim! Temos campos avançados que validam se o CPF ou CNPJ informado está no formato correto, evitando dados inválidos no seu banco." },
  { q: "Posso personalizar o formulário com minha marca?", a: "Sim. Você pode adicionar seu logotipo, escolher cores e personalizar a aparência do formulário mesmo no plano grátis." },
  { q: "Aceitam boleto e PIX?", a: "Sim! Aceitamos PIX, boleto bancário e cartão de crédito via Mercado Pago. Pague em real, sem taxas internacionais." },
  { q: "Vocês emitem nota fiscal?", a: "Sim! Como empresa brasileira, emitimos nota fiscal para todos os planos pagos." },
];

// Hook responsivo
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, #9B59F5aa, #4A0FAD44, transparent 70%)", animation: "float1 8s ease-in-out infinite", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", top: "50%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle at 60% 40%, #E879F944, #7C3AED33, transparent 70%)", animation: "float2 10s ease-in-out infinite", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "30%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle at 40% 60%, #F59E0B33, #E879F922, transparent 70%)", animation: "float3 12s ease-in-out infinite", filter: "blur(60px)" }} />
      <style>{`
        @keyframes float1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-40px) scale(1.05)}66%{transform:translate(-20px,20px) scale(0.95)}}
        @keyframes float2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-40px,30px) scale(1.08)}66%{transform:translate(20px,-20px) scale(0.95)}}
        @keyframes float3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,40px) scale(1.03)}66%{transform:translate(-30px,-10px) scale(0.97)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        * { box-sizing: border-box; }
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

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Card3D({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const isMobile = useIsMobile();
  if (isMobile) {
    return <div style={style}>{children}</div>;
  }
  return (
    <div
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setRotate({ x: (e.clientY - r.top - r.height / 2) / r.height * -8, y: (e.clientX - r.left - r.width / 2) / r.width * 8 }); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setRotate({ x: 0, y: 0 }); }}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hover ? 1.02 : 1})`, transition: hover ? "transform 0.1s" : "transform 0.5s", ...style }}>
      {children}
    </div>
  );
}

function CheckoutModal({ plan, onClose }: { plan: typeof plans[0]; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("pix");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handlePay() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setDone(true); setLoading(false);
  }

  const input: React.CSSProperties = { width: "100%", background: "#160830", border: "1px solid #2D1458", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#fff", fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", backdropFilter: "blur(16px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "linear-gradient(160deg, #160830, #0F0520)", border: "1px solid #2D1458", borderRadius: 24, padding: 32, maxWidth: 420, width: "100%", position: "relative", fontFamily: "sans-serif", boxShadow: "0 40px 80px #00000088" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#2D145833", border: "none", color: "#9478C0", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#22C55E22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 8px" }}>Acesso liberado!</h3>
            <p style={{ color: "#9478C0", fontSize: 14, margin: "0 0 24px" }}>Enviamos os dados para <strong style={{ color: "#EDE9FE" }}>{email}</strong></p>
            <a href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Acessar plataforma →
            </a>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#9478C0", marginBottom: 4 }}>Plano selecionado</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{plan.name}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#A855F7" }}>{plan.price === 0 ? "Grátis" : `R$ ${plan.price}/mês`}</div>
              </div>
              <div style={{ fontSize: 12, color: "#9478C0", marginTop: 4 }}>{plan.respostas}</div>
            </div>
            {step === 1 && (
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#9478C0", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>E-mail de acesso</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" style={input} />
                <button onClick={() => plan.price === 0 ? handlePay() : setStep(2)} disabled={!email}
                  style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: !email ? "not-allowed" : "pointer", opacity: !email ? 0.6 : 1, fontFamily: "sans-serif" }}>
                  {plan.price === 0 ? "Criar conta grátis →" : "Continuar →"}
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div style={{ fontSize: 12, color: "#9478C0", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Forma de pagamento</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {[["pix", "PIX"], ["card", "Cartão"], ["boleto", "Boleto"]].map(([id, label]) => (
                    <button key={id} onClick={() => setMethod(id)}
                      style={{ flex: 1, background: method === id ? "#7C3AED33" : "#160830", color: method === id ? "#A855F7" : "#9478C0", border: `1px solid ${method === id ? "#7C3AED" : "#2D1458"}`, borderRadius: 10, padding: "10px 4px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>
                      {label}
                    </button>
                  ))}
                </div>
                {method === "pix" && (
                  <div style={{ textAlign: "center", padding: "20px", background: "#160830", borderRadius: 14, marginBottom: 16, border: "1px solid #2D1458" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" style={{ margin: "0 auto 8px", display: "block" }}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <div style={{ fontSize: 14, color: "#EDE9FE", fontWeight: 600, marginBottom: 4 }}>Pague via PIX</div>
                    <div style={{ fontSize: 12, color: "#9478C0" }}>Aprovação instantânea</div>
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
                    <div style={{ fontSize: 13, color: "#9478C0", lineHeight: 1.6 }}>Boleto enviado por e-mail.<br />Acesso em até 1 dia útil.</div>
                  </div>
                )}
                <button onClick={handlePay} disabled={loading}
                  style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>
                  {loading ? "Processando..." : `Finalizar · R$ ${plan.price}/mês`}
                </button>
                <div style={{ fontSize: 11, color: "#9478C0", textAlign: "center", marginTop: 10 }}>Pagamento seguro via Mercado Pago · Nota fiscal inclusa</div>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const s = () => setScrollY(window.scrollY);
    const m = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", s);
    window.addEventListener("mousemove", m);
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("mousemove", m); };
  }, []);

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.price === 0) return 0;
    return billing === "annual" ? Math.round(plan.price * 0.8) : plan.price;
  };

  const navItems: [string, string][] = [["funcionalidades", "Funcionalidades"], ["integracoes", "Integrações"], ["planos", "Planos"], ["faq", "FAQ"]];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif", color: C.text, overflowX: "hidden" }}>
      <ParticleField />
      <FloatingOrbs />
      {!isMobile && (
        <div style={{ position: "fixed", left: mousePos.x - 150, top: mousePos.y - 150, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED0D, transparent 70%)", pointerEvents: "none", zIndex: 1, transition: "left 0.1s, top 0.1s" }} />
      )}

      {/* ── Nav ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? "14px 20px" : "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 50 ? C.bg + "ee" : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? `1px solid ${C.border}` : "1px solid transparent", transition: "all 0.3s" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 20, fontWeight: 900, color: C.white, letterSpacing: "-0.03em" }}>Brava<span style={{ color: C.purpleLight }}>Form</span></span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "none", color: C.muted, border: "none", fontSize: 14, cursor: "pointer", fontFamily: "sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                {label}
              </button>
            ))}
            <a href="/login" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Começar grátis
            </a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
            {menuOpen
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        )}

        {/* Mobile menu dropdown */}
        {isMobile && menuOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: C.bg + "f8", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }}
                style={{ background: "none", color: C.text, border: "none", fontSize: 16, cursor: "pointer", fontFamily: "sans-serif", textAlign: "left", padding: "12px 0", borderBottom: `1px solid ${C.border}33` }}>
                {label}
              </button>
            ))}
            <a href="/login" onClick={() => setMenuOpen(false)} style={{ marginTop: 8, background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center", display: "block" }}>
              Começar grátis
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "100px 20px 60px" : "120px 32px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 780, width: "100%" }}>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.2s forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7C3AED22", color: "#C084FC", border: "1px solid #7C3AED44", borderRadius: 24, padding: "6px 18px", fontSize: 13, fontWeight: 700, marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block", boxShadow: `0 0 8px ${C.green}` }} />
              Produto 100% brasileiro · Pague em real
            </div>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards" }}>
            <h1 style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 900, color: C.white, margin: "0 0 24px", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
              Formulários inteligentes<br />
              <span style={{ background: "linear-gradient(90deg, #A855F7, #E879F9, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                com IA brasileira.
              </span>
            </h1>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.6s forwards" }}>
            <p style={{ fontSize: isMobile ? 16 : 20, color: C.muted, lineHeight: 1.7, margin: "0 0 48px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
              Crie formulários, qualifique leads com IA, integre com seus apps favoritos via Webhooks. Tudo em português, pago em real.
            </p>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.8s forwards", display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, borderRadius: 16, padding: isMobile ? "16px 32px" : "18px 40px", fontSize: isMobile ? 15 : 17, fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 40px #7C3AED66" }}>
              Criar conta grátis →
            </a>
            <button onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: C.text, border: `1px solid ${C.border}`, borderRadius: 16, padding: isMobile ? "16px 24px" : "18px 32px", fontSize: isMobile ? 14 : 16, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
              Ver planos
            </button>
          </div>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 1s forwards", marginTop: 80, display: "flex", justifyContent: "center", gap: isMobile ? 32 : 60, flexWrap: "wrap" }}>
            {[["4.800+", "respostas coletadas"], ["320+", "formulários criados"], ["100%", "produto brasileiro"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? 24 : 30, fontWeight: 900, color: C.white, letterSpacing: "-0.04em" }}>{n}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Funcionalidades ── */}
      <section id="funcionalidades" style={{ padding: isMobile ? "60px 20px" : "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ display: "inline-block", background: C.green + "22", color: C.green, border: `1px solid ${C.green}33`, borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Funcionalidades
              </div>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 900, color: C.white, margin: 0, letterSpacing: "-0.04em" }}>
                Simples de usar.<br />
                <span style={{ color: C.purpleLight }}>Poderoso pra vender.</span>
              </h2>
            </div>
          </Reveal>

          {/* Cards principais */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
            {[
              { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>, title: "Score de IA por lead", desc: "Cada resposta recebe pontuação automática de 0 a 100. Identifique seus melhores leads sem esforço.", tag: "Exclusivo", color: C.purpleLight },
              { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: "WhatsApp com 1 clique", desc: "Abra o WhatsApp do respondente direto do dashboard. Zero fricção, mais conversões.", tag: "Exclusivo", color: "#25D366" },
              { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, title: "Webhooks e integrações", desc: "Conecte com Zapier, Make, n8n, Google Sheets e qualquer ferramenta que você já usa.", tag: "Pro+", color: C.accentGold },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 150}>
                <Card3D style={{ background: `linear-gradient(135deg, ${f.color}11, ${C.bgCard})`, border: `1px solid ${f.color}33`, borderRadius: 24, padding: 28, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: f.color + "22", filter: "blur(20px)" }} />
                  <div style={{ marginBottom: 16 }}>{f.icon}</div>
                  <div style={{ display: "inline-block", background: f.color + "22", color: f.color, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, marginBottom: 12, letterSpacing: "0.05em" }}>{f.tag}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 8, letterSpacing: "-0.02em" }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{f.desc}</div>
                </Card3D>
              </Reveal>
            ))}
          </div>

          {/* Mini-features: 3 colunas em mobile, 6 em desktop */}
          <Reveal delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: isMobile ? 10 : 12 }}>
              {[
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>, title: "Editor rápido" },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>, title: "Lógica condicional" },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>, title: "Exportar CSV" },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, title: "Busca de CEP" },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: "CPF e CNPJ" },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Sua marca" },
              ].map(f => (
                <div key={f.title} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: isMobile ? "14px 8px" : "16px 14px", textAlign: "center", transition: "border-color 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.purpleLight; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{f.title}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Integrações ── */}
      <section id="integracoes" style={{ padding: isMobile ? "60px 20px" : "80px 32px", position: "relative", zIndex: 1, background: `linear-gradient(180deg, transparent, ${C.bgCard}88, transparent)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-block", background: C.accentGold + "22", color: C.accentGold, border: `1px solid ${C.accentGold}33`, borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Integrações via Webhook
              </div>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 900, color: C.white, margin: "0 0 16px", letterSpacing: "-0.04em" }}>
                Conecte com tudo que você já usa
              </h2>
              <p style={{ color: C.muted, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
                Quando alguém preenche seu formulário, os dados vão automaticamente para onde você quiser — em tempo real.
              </p>
            </div>
          </Reveal>

          {/* Grid de integrações: 4 colunas em mobile, auto-fit em desktop */}
          {/* 9 itens: mobile → 4+4+1 → usamos grid com coluna extra no último */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? 10 : 14, marginBottom: 40 }}>
            {integrations.slice(0, 8).map((int, i) => (
              <Reveal key={int.name} delay={i * 60}>
                <Card3D style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: isMobile ? "16px 8px" : "20px 14px", textAlign: "center", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{int.icon}</div>
                  <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: C.text }}>{int.name}</div>
                </Card3D>
              </Reveal>
            ))}
            {/* Webhooks (último) ocupa 2 colunas para ficar centralizado */}
            <Reveal delay={8 * 60}>
              <Card3D style={{ background: C.bgCard, border: `1px solid ${C.accentGold}44`, borderRadius: 16, padding: isMobile ? "16px 8px" : "20px 14px", textAlign: "center", cursor: "pointer", gridColumn: isMobile ? "2 / 4" : "3 / 4" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{integrations[8].icon}</div>
                <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: C.accentGold }}>{integrations[8].name}</div>
              </Card3D>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div style={{ background: `linear-gradient(135deg, ${C.accentGold}11, ${C.bgCard})`, border: `1px solid ${C.accentGold}33`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 8 }}>Como funcionam os Webhooks?</div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>
                Sempre que alguém enviar um formulário, o BravaForm dispara automaticamente uma requisição HTTP para a URL que você configurar — seja Zapier, Make, n8n, ou qualquer sistema próprio. Os dados chegam em JSON em tempo real, prontos para automação.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Depoimentos ── */}
      <section style={{ padding: isMobile ? "60px 20px" : "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: C.white, textAlign: "center", margin: "0 0 48px", letterSpacing: "-0.04em" }}>
              Quem usa, <span style={{ color: C.purpleLight }}>não para</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {[
              { name: "Carla Domingues", role: "Agência de Marketing, SP", text: "Em 2 semanas qualifiquei 180 leads e fechei 3 contratos. O score de IA mostrou exatamente quem valia meu tempo.", avatar: "CD" },
              { name: "Felipe Rezende", role: "Infoprodutor, Educação", text: "Migrei do Typeform e economizo R$150/mês. Tem tudo que eu precisava e ainda mais com o WhatsApp integrado.", avatar: "FR" },
              { name: "Bruna Lacerda", role: "Proprietária, Varejo", text: "O Webhook com Google Sheets mudou minha operação. Todo lead vai direto pra minha planilha automaticamente.", avatar: "BL" },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 150}>
                <Card3D style={{ background: `linear-gradient(160deg, ${C.bgCard2}, ${C.bgCard})`, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, margin: "0 0 20px", fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: C.white, flexShrink: 0 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{t.role}</div>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planos ── */}
      <section id="planos" style={{ padding: isMobile ? "60px 20px" : "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-block", background: C.purple + "22", color: C.purpleLight, border: `1px solid ${C.purple}44`, borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Planos e preços
              </div>
              <h2 style={{ fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 900, color: C.white, margin: "0 0 12px", letterSpacing: "-0.04em" }}>
                Pague em real. Sem flutuação cambial.
              </h2>
              <p style={{ color: C.muted, fontSize: 16, margin: "0 0 28px" }}>Cancele quando quiser. Nota fiscal inclusa. Boleto e PIX aceitos.</p>
              <div style={{ display: "inline-flex", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 4, gap: 4 }}>
                {[["monthly", "Mensal"], ["annual", "Anual  −20%"]].map(([b, label]) => (
                  <button key={b} onClick={() => setBilling(b)}
                    style={{ background: billing === b ? "linear-gradient(135deg, #7C3AED, #A855F7)" : "transparent", color: billing === b ? C.white : C.muted, border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.2s" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Planos: 1 coluna em mobile, 2 em tablet, 4 em desktop */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16, alignItems: "start" }}>
            {plans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 100}>
                <Card3D style={{ background: plan.highlight ? `linear-gradient(160deg, #1E0845, ${C.bgCard2})` : C.bgCard, border: `2px solid ${plan.highlight ? C.purpleLight : C.border}`, borderRadius: 20, padding: 24, position: "relative", boxShadow: plan.highlight ? `0 0 60px ${C.purple}33` : "none" }}>
                  {plan.highlight && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #7C3AED, #E879F9)", borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 800, color: C.white, whiteSpace: "nowrap" }}>
                      {plan.tag}
                    </div>
                  )}
                  {!plan.highlight && <div style={{ display: "inline-block", background: plan.color + "22", color: plan.color, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{plan.tag}</div>}
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.white, marginTop: plan.highlight ? 14 : 4, letterSpacing: "-0.03em" }}>{plan.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4, marginBottom: 16 }}>{plan.respostas}</div>
                  <div style={{ margin: "0 0 20px", display: "flex", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontSize: 40, fontWeight: 900, color: plan.highlight ? C.purpleLight : plan.price === 0 ? C.muted : plan.color, letterSpacing: "-0.05em", lineHeight: 1 }}>
                      {plan.price === 0 ? "Grátis" : `R$ ${getPrice(plan)}`}
                    </span>
                    {plan.price > 0 && <span style={{ fontSize: 13, color: C.muted, paddingBottom: 6 }}>/mês</span>}
                  </div>
                  <button onClick={() => setSelectedPlan(plan)}
                    style={{ width: "100%", background: plan.highlight ? "linear-gradient(135deg, #7C3AED, #A855F7)" : `${plan.color}22`, color: plan.highlight ? C.white : plan.color, border: plan.highlight ? "none" : `1px solid ${plan.color}44`, borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 8, fontFamily: "sans-serif", boxShadow: plan.highlight ? "0 4px 20px #7C3AED44" : "none" }}>
                    {plan.cta}
                  </button>
                  <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginBottom: 20 }}>{plan.ctaNote}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features.map(f => (
                      <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 18, height: 18, borderRadius: "50%", background: f.ok ? C.green + "22" : C.muted + "18", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {f.ok
                            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            : <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          }
                        </span>
                        <span style={{ fontSize: 12, color: f.ok ? C.text : C.muted + "88" }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </Card3D>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div style={{ marginTop: 24, background: `linear-gradient(135deg, ${C.green}11, ${C.bgCard})`, border: `1px solid ${C.green}33`, borderRadius: 16, padding: 20, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 6 }}>Por que somos mais baratos que Typeform e Respondi?</div>
                <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
                  Typeform cobra em dólar (R$200+/mês). Respondi cobra R$147/mês no plano Pro. O BravaForm cobra R$97/mês e ainda entrega <strong style={{ color: C.purpleLight }}>Score de IA + WhatsApp integrado</strong> — funcionalidades que nenhum concorrente tem.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: isMobile ? "60px 20px" : "80px 32px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: C.white, textAlign: "center", margin: "0 0 48px", letterSpacing: "-0.04em" }}>Perguntas frequentes</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: openFaq === i ? `linear-gradient(135deg, ${C.purple}11, ${C.bgCard})` : C.bgCard, border: `1px solid ${openFaq === i ? C.purpleLight : C.border}`, borderRadius: 14, padding: "18px 20px", cursor: "pointer", transition: "all 0.3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.white, lineHeight: 1.4 }}>{f.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.purpleLight} strokeWidth="2" strokeLinecap="round" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  {openFaq === i && <div style={{ marginTop: 14, fontSize: 14, color: C.muted, lineHeight: 1.8, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>{f.a}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section style={{ padding: isMobile ? "80px 20px" : "100px 32px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}33 0%, transparent 70%)`, pointerEvents: "none" }} />
        <Reveal>
          <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: C.white, margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Comece grátis hoje.<br />
              <span style={{ background: "linear-gradient(90deg, #A855F7, #E879F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sem cartão de crédito.</span>
            </h2>
            <p style={{ color: C.muted, fontSize: 16, margin: "0 0 40px" }}>Produto brasileiro · Pague em real · Suporte em português</p>
            <a href="/login" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7, #E879F9)", color: C.white, borderRadius: 18, padding: isMobile ? "16px 36px" : "20px 48px", fontSize: isMobile ? 16 : 18, fontWeight: 900, textDecoration: "none", boxShadow: "0 12px 48px #7C3AED66", display: "inline-block" }}>
              Criar minha conta grátis →
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? "24px 20px" : "28px 32px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo.png" alt="logo" style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 16, fontWeight: 900, color: C.white, letterSpacing: "-0.03em" }}>Brava<span style={{ color: C.purpleLight }}>Form</span></span>
        </div>
        <div style={{ fontSize: 13, color: C.muted, textAlign: "center" }}>© 2025 BravaForm · Produto brasileiro · Nota fiscal inclusa</div>
        <div style={{ display: "flex", gap: 20 }}>
          {[["Termos", "/termos"], ["Privacidade", "/privacidade"], ["Suporte", "mailto:contato@bravaform.com.br"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.purpleLight)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = C.muted)}>
              {l}
            </a>
          ))}
        </div>
      </footer>

      {selectedPlan && <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
  );
}
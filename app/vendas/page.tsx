"use client";
import { useState } from "react";

const C = {
  bg: "#07010F", bgCard: "#0F0520", bgCard2: "#160830",
  purple: "#7C3AED", purpleLight: "#A855F7", accent: "#E879F9",
  accentGold: "#F59E0B", white: "#FFFFFF", text: "#EDE9FE",
  muted: "#9478C0", green: "#22C55E", red: "#EF4444",
  border: "#2D1458",
};

const plans = [
  {
    id: "free", name: "Starter", price: 0, period: "",
    tag: "Grátis para sempre", color: C.muted, highlight: false,
    cta: "Começar grátis", ctaNote: "Sem cartão de crédito",
    features: [
      { text: "1 formulário ativo", ok: true },
      { text: "Até 20 leads/mês", ok: true },
      { text: "3 perguntas por formulário", ok: true },
      { text: "Dashboard básico", ok: true },
      { text: "Botão WhatsApp e E-mail", ok: false },
      { text: "Score de IA por lead", ok: false },
      { text: "Filtros avançados", ok: false },
      { text: "Exportar CSV / Excel", ok: false },
      { text: "Relatórios completos", ok: false },
      { text: "Integração Instagram Ads", ok: false },
    ],
  },
  {
    id: "pro", name: "Pro", price: 97, period: "/mês",
    tag: "🔥 Mais popular", color: C.purpleLight, highlight: true,
    cta: "Assinar Pro", ctaNote: "7 dias grátis · Cancele quando quiser",
    features: [
      { text: "10 formulários ativos", ok: true },
      { text: "Leads ilimitados", ok: true },
      { text: "Perguntas ilimitadas", ok: true },
      { text: "Dashboard completo", ok: true },
      { text: "Botão WhatsApp e E-mail", ok: true },
      { text: "Score de IA por lead", ok: true },
      { text: "Filtros avançados", ok: true },
      { text: "Exportar CSV / Excel", ok: true },
      { text: "Relatórios completos", ok: true },
      { text: "Integração Instagram Ads", ok: false },
    ],
  },
  {
    id: "agency", name: "Agência", price: 297, period: "/mês",
    tag: "Para times", color: C.accentGold, highlight: false,
    cta: "Assinar Agência", ctaNote: "7 dias grátis · Multi-usuário",
    features: [
      { text: "Formulários ilimitados", ok: true },
      { text: "Leads ilimitados", ok: true },
      { text: "Perguntas ilimitadas", ok: true },
      { text: "Dashboard completo", ok: true },
      { text: "Botão WhatsApp e E-mail", ok: true },
      { text: "Score de IA por lead", ok: true },
      { text: "Filtros avançados", ok: true },
      { text: "Exportar CSV / Excel", ok: true },
      { text: "Relatórios completos", ok: true },
      { text: "Integração Instagram Ads", ok: true },
    ],
  },
];

const faqs = [
  { q: "Como funciona o período grátis?", a: "Você cadastra seu e-mail e já acessa o plano Starter sem cartão. Para planos pagos, oferecemos 7 dias grátis — só cobra depois." },
  { q: "Posso cancelar quando quiser?", a: "Sim. Sem fidelidade, sem multa. Cancele em 1 clique no painel a qualquer momento." },
  { q: "Como recebo meu acesso após o pagamento?", a: "O acesso é liberado automaticamente por e-mail em até 2 minutos após a confirmação do pagamento via Mercado Pago." },
  { q: "Funciona para anúncios no Instagram e Google?", a: "Perfeitamente. Você gera um link único e usa em qualquer anúncio, bio, WhatsApp ou e-mail." },
  { q: "O que é o Score de IA?", a: "Cada lead recebe uma pontuação automática de 0 a 100 baseada nas respostas do formulário. Assim você sabe quais leads valem seu tempo sem precisar ligar para todo mundo." },
  { q: "O que é a integração com Instagram Ads?", a: "No plano Agência você conecta diretamente com o Meta Ads Manager para capturar leads dos seus anúncios sem precisar de link externo." },
];

const testimonials = [
  { name: "Carla Domingues", role: "Agência de Marketing, SP", text: "Em 2 semanas qualifiquei 180 leads e fechei 3 contratos. Antes perdia horas ligando pra todo mundo.", avatar: "CD" },
  { name: "Felipe Rezende", role: "Infoprodutor, Educação", text: "O score de IA mudou tudo. Agora só ligo pra quem tem fit real com meu produto.", avatar: "FR" },
  { name: "Bruna Lacerda", role: "Proprietária, Varejo", text: "Simples de usar e os filtros são incríveis. Vejo só leads de alto faturamento em 1 clique.", avatar: "BL" },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
      <span style={{ fontSize: 22, fontWeight: 900, color: C.white, letterSpacing: "-0.03em" }}>
        Brava<span style={{ color: C.purpleLight }}>Form</span>
      </span>
    </div>
  );
}

function CheckIcon({ ok }: { ok: boolean }) {
  return (
    <span style={{ width: 20, height: 20, borderRadius: "50%", background: ok ? C.green + "22" : C.muted + "18", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {ok
        ? <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
        : <svg width="8" height="8" viewBox="0 0 8 8"><path d="M2 2l4 4M6 2L2 6" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" /></svg>
      }
    </span>
  );
}

function CheckoutModal({ plan, onClose }: { plan: typeof plans[0]; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handlePay() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    if (plan.price === 0) {
      setDone(true);
    } else {
      // Aqui vai a integração real com Mercado Pago
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, userEmail: email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setDone(true);
    }
    setLoading(false);
  }

  const input: React.CSSProperties = {
    width: "100%", background: C.bgCard2, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "12px 14px", fontSize: 14,
    color: C.white, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box",
  };

  if (done) return (
    <div style={{ position: "fixed", inset: 0, background: "#00000088", backdropFilter: "blur(8px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h3 style={{ color: C.white, fontSize: 22, fontWeight: 800, margin: "0 0 8px", fontFamily: "sans-serif" }}>Acesso liberado!</h3>
        <p style={{ color: C.muted, fontSize: 14, margin: "0 0 24px" }}>Enviamos os dados para <strong style={{ color: C.text }}>{email}</strong></p>
        <a href="/dashboard" style={{ display: "block", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>
          Acessar plataforma →
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000088", backdropFilter: "blur(8px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, maxWidth: 420, width: "100%", position: "relative", fontFamily: "sans-serif" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
        <Logo />
        <div style={{ marginTop: 20, marginBottom: 20, background: C.bgCard2, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.white }}>Plano {plan.name}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{plan.price === 0 ? "Gratuito" : "Assinatura mensal"}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.purpleLight }}>
            {plan.price === 0 ? "Grátis" : `R$ ${plan.price}/mês`}
          </div>
        </div>

        {step === 1 && (
          <div>
            <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 600 }}>Seu e-mail de acesso *</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" style={input} />
            <button onClick={() => plan.price === 0 ? handlePay() : setStep(2)} disabled={!email || loading}
              style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: !email ? 0.6 : 1 }}>
              {loading ? "Aguarde..." : plan.price === 0 ? "Criar conta grátis →" : "Continuar para pagamento →"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 10, fontWeight: 600 }}>Forma de pagamento</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["card", "💳 Cartão"], ["pix", "⚡ PIX"], ["boleto", "📄 Boleto"]].map(([id, label]) => (
                <button key={id} onClick={() => setMethod(id)}
                  style={{ flex: 1, background: method === id ? C.purple + "33" : C.bgCard2, color: method === id ? C.purpleLight : C.muted, border: `1px solid ${method === id ? C.purple : C.border}`, borderRadius: 10, padding: "10px 4px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
                  {label}
                </button>
              ))}
            </div>
            {method === "card" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input placeholder="Número do cartão" style={input} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input placeholder="MM/AA" style={input} />
                  <input placeholder="CVV" style={input} />
                </div>
                <input placeholder="Nome no cartão" style={input} />
              </div>
            )}
            {method === "pix" && (
              <div style={{ textAlign: "center", padding: 20, background: C.bgCard2, borderRadius: 12 }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>📱</div>
                <div style={{ fontSize: 13, color: C.muted }}>QR Code gerado após confirmação</div>
              </div>
            )}
            {method === "boleto" && (
              <div style={{ background: C.bgCard2, borderRadius: 10, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Boleto enviado por e-mail. Acesso liberado em até 1 dia útil.</div>
              </div>
            )}
            <button onClick={handlePay} disabled={loading}
              style={{ marginTop: 16, width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {loading ? "Processando..." : `Finalizar · R$ ${plan.price}/mês`}
            </button>
            <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 10 }}>🔒 Pagamento seguro via Mercado Pago</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Vendas() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState("monthly");

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "sans-serif", color: C.text }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: `1px solid ${C.border}`, padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: C.bg + "ee", backdropFilter: "blur(20px)" }}>
        <Logo />
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <button onClick={() => scrollTo("funcionalidades")} style={{ background: "none", color: C.muted, border: "none", fontSize: 14, cursor: "pointer", fontFamily: "sans-serif" }}>Funcionalidades</button>
          <button onClick={() => scrollTo("planos")} style={{ background: "none", color: C.muted, border: "none", fontSize: 14, cursor: "pointer", fontFamily: "sans-serif" }}>Planos</button>
          <button onClick={() => scrollTo("faq")} style={{ background: "none", color: C.muted, border: "none", fontSize: 14, cursor: "pointer", fontFamily: "sans-serif" }}>FAQ</button>
          <button onClick={() => setSelectedPlan(plans[0])} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Começar grátis
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 32px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #6B21E855 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: C.purple + "22", color: C.purpleLight, border: `1px solid ${C.purple}44`, borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            🚀 A plataforma de leads mais inteligente do Brasil
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 58px)", fontWeight: 900, color: C.white, margin: "0 0 20px", lineHeight: 1.08, letterSpacing: "-0.04em" }}>
            Pare de perder tempo<br />
            com leads que <span style={{ background: "linear-gradient(90deg, #A855F7, #E879F9, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>não fecham.</span>
          </h1>
          <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.7, margin: "0 0 40px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Crie formulários de qualificação, deixe a IA classificar seus leads e foque só em quem realmente vai comprar.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setSelectedPlan(plans[0])} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 14, padding: "16px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 32px #7C3AED55" }}>
              Começar grátis agora →
            </button>
            <button onClick={() => scrollTo("planos")} style={{ background: "transparent", color: C.text, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Ver planos
            </button>
          </div>
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[["4.800+", "leads capturados"], ["320+", "formulários ativos"], ["R$ 2.4M+", "em vendas geradas"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: C.white, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dores */}
      <section style={{ padding: "48px 32px", background: C.bgCard + "88" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: C.white, textAlign: "center", margin: "0 0 32px", letterSpacing: "-0.03em" }}>Você se identifica com isso?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[
              { icon: "😩", title: "Liga pra todo mundo", desc: "Perde horas com leads frios que nunca vão comprar." },
              { icon: "📉", title: "Sem filtro de qualidade", desc: "Não sabe qual lead tem potencial real de fechamento." },
              { icon: "🤯", title: "Dados espalhados", desc: "Leads no Instagram, DM, WhatsApp, planilha... caos total." },
            ].map(p => (
              <div key={p.title} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: C.green + "22", color: C.green, border: `1px solid ${C.green}33`, borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Funcionalidades</div>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: C.white, margin: 0, letterSpacing: "-0.03em" }}>3 diferenciais que nenhum concorrente tem</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 40 }}>
            {[
              { icon: "🤖", title: "Score de IA por lead", desc: "Cada lead recebe uma pontuação automática de 0 a 100. Foque só nos quentes, feche mais rápido.", tag: "Exclusivo" },
              { icon: "💬", title: "WhatsApp integrado", desc: "Abra o WhatsApp do lead em 1 clique direto do dashboard. Sem copiar número, sem perder tempo.", tag: "Exclusivo" },
              { icon: "📱", title: "Integração Instagram Ads", desc: "Conecte diretamente com o Meta Ads Manager e capture leads dos seus anúncios sem link externo.", tag: "Agência" },
            ].map(f => (
              <div key={f.title} style={{ background: C.bgCard, border: `1px solid ${C.purple}44`, borderRadius: 16, padding: 24, position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 16, background: C.purple + "33", color: C.purpleLight, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{f.tag}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.white, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {[
              { icon: "⚡", title: "Formulário em 5 min", desc: "Sem desenvolvedor" },
              { icon: "🔍", title: "Filtros inteligentes", desc: "Por faturamento, cargo e mais" },
              { icon: "📊", title: "Dashboard completo", desc: "Tudo em um só lugar" },
              { icon: "📥", title: "Exportar CSV", desc: "Seus dados sempre com você" },
              { icon: "🔗", title: "Link para qualquer canal", desc: "Instagram, Google, WhatsApp" },
              { icon: "📈", title: "Relatórios avançados", desc: "Entenda seus leads" },
            ].map(f => (
              <div key={f.title} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section style={{ padding: "48px 32px", background: C.bgCard + "88" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.white, textAlign: "center", margin: "0 0 32px", letterSpacing: "-0.03em" }}>Quem usa, não para</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
                <div style={{ color: C.accentGold, fontSize: 16, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: C.white }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: C.purple + "22", color: C.purpleLight, border: `1px solid ${C.purple}44`, borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Planos e preços</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: C.white, margin: "0 0 8px", letterSpacing: "-0.04em" }}>Comece grátis. Cresça quando quiser.</h2>
            <p style={{ color: C.muted, fontSize: 15, margin: "0 0 24px" }}>Sem contratos. Sem surpresas. Cancele quando quiser.</p>
            <div style={{ display: "inline-flex", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 4, gap: 4 }}>
              {["monthly", "annual"].map(b => (
                <button key={b} onClick={() => setBilling(b)}
                  style={{ background: billing === b ? "linear-gradient(135deg, #7C3AED, #A855F7)" : "transparent", color: billing === b ? C.white : C.muted, border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>
                  {b === "monthly" ? "Mensal" : <span>Anual <span style={{ background: C.green + "22", color: C.green, borderRadius: 8, padding: "1px 7px", fontSize: 11 }}>-20%</span></span>}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, alignItems: "start" }}>
            {plans.map(plan => {
              const price = billing === "annual" && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price;
              return (
                <div key={plan.id} style={{ background: plan.highlight ? `linear-gradient(180deg, ${C.bgCard2} 0%, ${C.bgCard} 100%)` : C.bgCard, border: `2px solid ${plan.highlight ? C.purpleLight : C.border}`, borderRadius: 20, padding: 24, position: "relative", boxShadow: plan.highlight ? `0 0 40px ${C.purple}33` : "none" }}>
                  {plan.highlight && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #7C3AED, #E879F9)", borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 700, color: C.white, whiteSpace: "nowrap" }}>
                      {plan.tag}
                    </div>
                  )}
                  {!plan.highlight && <div style={{ display: "inline-block", background: plan.color + "22", color: plan.color, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{plan.tag}</div>}
                  <div style={{ fontSize: 20, fontWeight: 800, color: C.white, marginTop: plan.highlight ? 12 : 4 }}>{plan.name}</div>
                  <div style={{ margin: "16px 0 20px", display: "flex", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontSize: 42, fontWeight: 900, color: plan.highlight ? C.purpleLight : plan.price === 0 ? C.muted : plan.color, letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {plan.price === 0 ? "Grátis" : `R$ ${price}`}
                    </span>
                    {plan.price > 0 && <span style={{ fontSize: 14, color: C.muted, paddingBottom: 6 }}>/mês</span>}
                  </div>
                  <button onClick={() => setSelectedPlan(plan)} style={{ width: "100%", background: plan.highlight ? "linear-gradient(135deg, #7C3AED, #A855F7)" : `${plan.color}22`, color: plan.highlight ? C.white : plan.color, border: plan.highlight ? "none" : `1px solid ${plan.color}44`, borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 8, fontFamily: "sans-serif", boxShadow: plan.highlight ? "0 4px 20px #7C3AED44" : "none" }}>
                    {plan.cta}
                  </button>
                  <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginBottom: 20 }}>{plan.ctaNote}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features.map(f => (
                      <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckIcon ok={f.ok} />
                        <span style={{ fontSize: 13, color: f.ok ? C.text : C.muted + "88" }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 24, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 4 }}>Por que somos mais baratos que os concorrentes?</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Typeform cobra R$ 199/mês. Jotform cobra R$ 149/mês. O BravaForm foi criado especialmente para o mercado brasileiro, com Score de IA, WhatsApp integrado e integração com Instagram Ads — sem cobrar pelo que você não usa.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "48px 32px", background: C.bgCard + "88" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.white, textAlign: "center", margin: "0 0 32px", letterSpacing: "-0.03em" }}>Perguntas frequentes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((f, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: C.bgCard, border: `1px solid ${openFaq === i ? C.purpleLight : C.border}`, borderRadius: 14, padding: "16px 18px", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.white, lineHeight: 1.4 }}>{f.q}</span>
                  <span style={{ color: C.muted, fontSize: 18, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>+</span>
                </div>
                {openFaq === i && <div style={{ marginTop: 12, fontSize: 14, color: C.muted, lineHeight: 1.7, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding: "80px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #6B21E855 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: C.white, margin: "0 0 16px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Pronto para capturar leads que <span style={{ background: "linear-gradient(90deg, #A855F7, #E879F9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>realmente fecham?</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 16, margin: "0 0 32px", lineHeight: 1.6 }}>Comece grátis hoje. Sem cartão de crédito.</p>
          <button onClick={() => setSelectedPlan(plans[0])} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7, #E879F9)", color: C.white, border: "none", borderRadius: 16, padding: "18px 40px", fontSize: 17, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 40px #7C3AED55", letterSpacing: "-0.01em" }}>
            Criar minha conta grátis →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <Logo />
        <div style={{ fontSize: 12, color: C.muted }}>© 2025 BravaForm · Todos os direitos reservados</div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 12, color: C.purple, cursor: "pointer" }}>Termos</span>
          <span style={{ fontSize: 12, color: C.purple, cursor: "pointer" }}>Privacidade</span>
        </div>
      </footer>

      {selectedPlan && <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
  );
}
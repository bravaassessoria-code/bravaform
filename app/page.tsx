"use client";
import { useState } from "react";

const C = {
  bg: "#07010F", bgCard: "#0F0520", bgCard2: "#160830",
  purple: "#7C3AED", purpleLight: "#A855F7", accent: "#E879F9",
  accentGold: "#F59E0B", white: "#FFFFFF", text: "#EDE9FE",
  muted: "#9478C0", green: "#22C55E", red: "#EF4444",
  border: "#2D1458",
};

const LEADS = [
  { id: 1, name: "Carlos Mendes", email: "carlos@empresa.com", phone: "11999001122", company: "TechVentures", answers: { "Faturamento": "De 51 mil a 100 mil", "Cargo": "Proprietário", "Segmento": "Serviços" }, score: 85 },
  { id: 2, name: "Ana Beatriz", email: "ana@educa.com", phone: "21988776655", company: "EducaMais", answers: { "Faturamento": "De 101 mil a 300 mil", "Cargo": "Diretor", "Segmento": "Educação" }, score: 92 },
  { id: 3, name: "Rafael Oliveira", email: "rafael@varejo.com", phone: "31977665544", company: "VarejoX", answers: { "Faturamento": "Até 30 mil", "Cargo": "Gerente", "Segmento": "Varejo" }, score: 58 },
  { id: 4, name: "Fernanda Costa", email: "fernanda@ind.com", phone: "41966554433", company: "IndustriaPlus", answers: { "Faturamento": "De 301 mil a 1 milhão", "Cargo": "Proprietário", "Segmento": "Indústria" }, score: 96 },
];

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <img src="/logo.png" alt="logo" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
      <span style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.03em" }}>
        Brava<span style={{ color: "#A855F7" }}>Form</span>
      </span>
    </div>
  );
}

function ScoreDot({ score }: { score: number }) {
  const color = score >= 85 ? C.green : score >= 65 ? C.accentGold : C.red;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
      <span style={{ color, fontWeight: 700, fontSize: 13 }}>{score}</span>
    </span>
  );
}

function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 52, fontWeight: 900, color: C.white, textAlign: "center", letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: 1.1 }}>
        Capture leads.<br /><span style={{ color: C.purpleLight }}>Feche contratos.</span>
      </h1>
      <p style={{ color: C.muted, fontSize: 18, textAlign: "center", margin: "0 0 40px", maxWidth: 480, lineHeight: 1.6 }}>
        Crie formulários de qualificação, gere links para anúncios e gerencie leads com filtros inteligentes.
      </p>
      <button onClick={onEnter} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 14, padding: "16px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
        Acessar plataforma →
      </button>
      <div style={{ marginTop: 48, display: "flex", gap: 40 }}>
        {[["4.800+", "leads capturados"], ["320+", "formulários ativos"], ["R$ 2.4M+", "em vendas geradas"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.white }}>{n}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ onLeads, onForm }: { onLeads: () => void; onForm: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard }}>
        <Logo />
        <button onClick={onForm} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          + Novo formulário
        </button>
      </div>
      <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ color: C.white, fontSize: 22, fontWeight: 800, margin: "0 0 24px" }}>Olá, Vinícius 👋</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {[["👤", LEADS.length, "Total de Leads", C.purpleLight], ["🔥", LEADS.filter(l => l.score >= 85).length, "Leads Quentes", C.accentGold], ["⭐", Math.round(LEADS.reduce((a, b) => a + b.score, 0) / LEADS.length), "Score Médio", C.green]].map(([icon, val, label, color]) => (
            <div key={label as string} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 22 }}>{icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: color as string, marginTop: 8 }}>{val}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>Formulário de Qualificação</div>
              <div style={{ fontSize: 12, color: C.muted }}>7 perguntas · bravaform.com/f/qualificacao</div>
            </div>
            <span style={{ background: C.green + "22", color: C.green, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>Ativo</span>
          </div>
          <button onClick={onLeads} style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            📊 Ver Leads ({LEADS.length})
          </button>
        </div>
        <h3 style={{ color: C.white, fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Últimos leads</h3>
        {LEADS.slice(0, 3).map(lead => (
          <div key={lead.id} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{lead.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{lead.company} · {lead.answers["Segmento"]}</div>
            </div>
            <ScoreDot score={lead.score} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Leads({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("");
  const [segmento, setSegmento] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = LEADS.filter(l => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (segmento && l.answers["Segmento"] !== segmento) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16, background: C.bgCard }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>←</button>
        <Logo />
        <span style={{ color: C.white, fontWeight: 700 }}>Leads</span>
      </div>
      <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <input placeholder="🔍 Buscar por nome ou empresa..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.white, marginBottom: 10, boxSizing: "border-box" }} />
          <select value={segmento} onChange={e => setSegmento(e.target.value)}
            style={{ width: "100%", background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.white }}>
            <option value="">Todos os segmentos</option>
            {["Serviços", "Varejo", "Indústria", "Educação"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {filtered.map(lead => (
          <div key={lead.id} onClick={() => setSelected(selected === lead.id ? null : lead.id)}
            style={{ background: selected === lead.id ? C.bgCard2 : C.bgCard, border: `1px solid ${selected === lead.id ? C.purpleLight : C.border}`, borderRadius: 14, padding: 16, marginBottom: 10, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{lead.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{lead.email} · {lead.phone}</div>
              </div>
              <ScoreDot score={lead.score} />
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
              {Object.values(lead.answers).map(a => (
                <span key={a} style={{ background: C.purple + "22", color: C.purpleLight, border: `1px solid ${C.purple}33`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 }}>{a}</span>
              ))}
            </div>
            {selected === lead.id && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                {Object.entries(lead.answers).map(([q, a]) => (
                  <div key={q} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: C.muted }}>{q}</span>
                    <span style={{ color: C.white, fontWeight: 600 }}>{a}</span>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button style={{ flex: 1, background: "#25D366", color: C.white, border: "none", borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>💬 WhatsApp</button>
                  <button style={{ flex: 1, background: C.purple + "33", color: C.purpleLight, border: `1px solid ${C.purple}44`, borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✉️ E-mail</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PublicForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const questions = [
    { id: "fat", label: "Faturamento mensal", options: ["Até 30 mil", "De 31 mil a 50 mil", "De 51 mil a 100 mil", "De 101 mil a 300 mil", "De 301 mil a 1 milhão", "Mais de 1 milhão"] },
    { id: "cargo", label: "Cargo atual", options: ["Proprietário / Sócio", "Diretor", "Gerente", "Operacional", "Outro"] },
    { id: "seg", label: "Segmento da empresa", options: ["Serviços", "Varejo", "Indústria", "Educação", "Outro"] },
  ];

  if (done) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: 24 }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h2 style={{ color: C.white, fontSize: 26, fontWeight: 800, margin: "0 0 12px", textAlign: "center" }}>Recebemos suas informações!</h2>
      <p style={{ color: C.muted, margin: "0 0 32px", textAlign: "center" }}>Em breve entraremos em contato.</p>
      <button onClick={onBack} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Voltar</button>
    </div>
  );

  const q = questions[step - 1];
  const progress = (step / (questions.length + 1)) * 100;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
      </div>
      <div style={{ height: 3, background: C.bgCard2, margin: "0 24px" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7C3AED, #A855F7)", borderRadius: 3, transition: "width 0.4s" }} />
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
        {step === 0 ? (
          <div>
            <h2 style={{ color: C.white, fontSize: 22, fontWeight: 800, margin: "24px 0 24px" }}>Informações de contato</h2>
            {[["name", "Nome completo", "text"], ["email", "E-mail", "email"], ["phone", "WhatsApp", "tel"], ["company", "Empresa", "text"]].map(([id, label, type]) => (
              <div key={id} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 600 }}>{label}</label>
                <input type={type} value={values[id] || ""} onChange={e => setValues(v => ({ ...v, [id]: e.target.value }))}
                  style={{ width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, color: C.white, boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 style={{ color: C.white, fontSize: 22, fontWeight: 800, margin: "24px 0 24px", lineHeight: 1.3 }}>{q.label}</h2>
            {q.options.map(opt => (
              <button key={opt} onClick={() => setValues(v => ({ ...v, [q.id]: opt }))}
                style={{ width: "100%", background: values[q.id] === opt ? C.purple + "33" : C.bgCard, border: `1px solid ${values[q.id] === opt ? C.purpleLight : C.border}`, borderRadius: 12, padding: "14px 16px", color: C.white, fontSize: 15, textAlign: "left", cursor: "pointer", marginBottom: 10, fontFamily: "sans-serif", fontWeight: values[q.id] === opt ? 700 : 400 }}>
                {opt}
              </button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ background: C.bgCard, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 20px", fontSize: 15, cursor: "pointer" }}>←</button>}
          <button onClick={() => step < questions.length ? setStep(s => s + 1) : setDone(true)}
            style={{ flex: 1, background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 14, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            {step === questions.length ? "Enviar" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("landing");
  return (
    <>
      {screen === "landing" && <Landing onEnter={() => setScreen("dashboard")} />}
      {screen === "dashboard" && <Dashboard onLeads={() => setScreen("leads")} onForm={() => setScreen("form")} />}
      {screen === "leads" && <Leads onBack={() => setScreen("dashboard")} />}
      {screen === "form" && <PublicForm onBack={() => setScreen("dashboard")} />}
    </>
  );
}
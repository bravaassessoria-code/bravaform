"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#07010F", bgCard: "#0F0520", bgCard2: "#160830",
  purple: "#7C3AED", purpleLight: "#A855F7", accent: "#E879F9",
  accentGold: "#F59E0B", white: "#FFFFFF", text: "#EDE9FE",
  muted: "#9478C0", green: "#22C55E", red: "#EF4444",
  border: "#2D1458",
};

type FieldType =
  | "welcome" | "name" | "email" | "phone" | "short" | "long"
  | "number" | "money" | "date" | "cpf" | "cnpj"
  | "choice" | "dropdown" | "scale" | "image_choice"
  | "address" | "file" | "terms" | "message" | "thanks";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

interface FormConfig {
  id: string;
  title: string;
  fields: FormField[];
  style: {
    buttonColor: string;
    questionColor: string;
    answerColor: string;
    bgColor: string;
    font: string;
    rounded: number;
    removeBrand: boolean;
  };
}

const LEADS = [
  { id: 1, name: "Carlos Mendes", email: "carlos@empresa.com", phone: "11999001122", company: "TechVentures", answers: { "Faturamento": "De 51 mil a 100 mil", "Cargo": "Proprietário", "Segmento": "Serviços" }, score: 85, date: "2025-05-10" },
  { id: 2, name: "Ana Beatriz", email: "ana@educa.com", phone: "21988776655", company: "EducaMais", answers: { "Faturamento": "De 101 mil a 300 mil", "Cargo": "Diretor", "Segmento": "Educação" }, score: 92, date: "2025-05-11" },
  { id: 3, name: "Rafael Oliveira", email: "rafael@varejo.com", phone: "31977665544", company: "VarejoX", answers: { "Faturamento": "Até 30 mil", "Cargo": "Gerente", "Segmento": "Varejo" }, score: 58, date: "2025-05-12" },
  { id: 4, name: "Fernanda Costa", email: "fernanda@ind.com", phone: "41966554433", company: "IndustriaPlus", answers: { "Faturamento": "De 301 mil a 1 milhão", "Cargo": "Proprietário", "Segmento": "Indústria" }, score: 96, date: "2025-05-13" },
  { id: 5, name: "Marcos Souza", email: "marcos@sols.com", phone: "51955443322", company: "Sols Agency", answers: { "Faturamento": "De 31 mil a 50 mil", "Cargo": "Operacional", "Segmento": "Serviços" }, score: 71, date: "2025-05-14" },
  { id: 6, name: "Juliana Pires", email: "juliana@edutop.com", phone: "62944332211", company: "EduTop", answers: { "Faturamento": "De 1 milhão a 4 milhões", "Cargo": "Diretor", "Segmento": "Educação" }, score: 99, date: "2025-05-14" },
];

const FIELD_TYPES: { type: FieldType; label: string; icon: string; group: string }[] = [
  { type: "welcome", label: "Boas-vindas", icon: "👋", group: "Estrutura" },
  { type: "thanks", label: "Agradecimento", icon: "🎉", group: "Estrutura" },
  { type: "message", label: "Mensagem", icon: "💬", group: "Estrutura" },
  { type: "name", label: "Nome", icon: "👤", group: "Texto" },
  { type: "email", label: "E-mail", icon: "✉️", group: "Texto" },
  { type: "phone", label: "Telefone", icon: "📱", group: "Texto" },
  { type: "short", label: "Resposta curta", icon: "📝", group: "Texto" },
  { type: "long", label: "Texto longo", icon: "📄", group: "Texto" },
  { type: "number", label: "Número", icon: "🔢", group: "Número" },
  { type: "money", label: "Valor Monetário", icon: "💰", group: "Número" },
  { type: "date", label: "Data", icon: "📅", group: "Número" },
  { type: "cpf", label: "CPF", icon: "🪪", group: "Documentos" },
  { type: "cnpj", label: "CNPJ", icon: "🏢", group: "Documentos" },
  { type: "choice", label: "Múltipla Escolha", icon: "☑️", group: "Escolha" },
  { type: "dropdown", label: "Lista (dropdown)", icon: "📋", group: "Escolha" },
  { type: "scale", label: "Escala de satisfação", icon: "⭐", group: "Escolha" },
  { type: "image_choice", label: "Escolha de imagem", icon: "🖼️", group: "Escolha" },
  { type: "address", label: "Endereço / CEP", icon: "📍", group: "Especiais" },
  { type: "file", label: "Arquivo anexo", icon: "📎", group: "Especiais" },
  { type: "terms", label: "Termos de Uso", icon: "✅", group: "Especiais" },
];

const makeField = (type: FieldType): FormField => {
  const labels: Partial<Record<FieldType, string>> = {
    welcome: "Bem-vindo(a)!", thanks: "Obrigado pelo seu tempo!",
    message: "Informação importante", name: "Qual é o seu nome?",
    email: "Qual é o seu e-mail?", phone: "Qual é o seu WhatsApp?",
    short: "Sua pergunta aqui", long: "Descreva com detalhes",
    number: "Insira um número", money: "Qual é o faturamento mensal?",
    date: "Selecione uma data", cpf: "Informe seu CPF",
    cnpj: "Informe o CNPJ", choice: "Selecione uma opção",
    dropdown: "Escolha da lista", scale: "Como você avalia?",
    image_choice: "Escolha uma opção", address: "Qual é o seu endereço?",
    file: "Envie um arquivo", terms: "Aceite os termos para continuar",
  };
  const base: FormField = { id: Math.random().toString(36).slice(2), type, label: labels[type] || "Nova pergunta", required: false };
  if (["choice", "dropdown", "image_choice"].includes(type)) base.options = ["Opção A", "Opção B", "Opção C"];
  if (type === "scale") { base.scaleMin = 1; base.scaleMax = 10; base.scaleMinLabel = "Péssimo"; base.scaleMaxLabel = "Excelente"; }
  return base;
};

const makeForm = (): FormConfig => ({
  id: Math.random().toString(36).slice(2),
  title: "Novo Formulário",
  fields: [
    { ...makeField("welcome"), label: "Bem-vindo(a) ao nosso formulário!" },
    makeField("name"), makeField("email"),
    { ...makeField("choice"), label: "Qual é o seu cargo?", options: ["Proprietário", "Diretor", "Gerente", "Operacional"] },
    { ...makeField("thanks"), label: "Obrigado! Entraremos em contato em breve." },
  ],
  style: { buttonColor: "#7C3AED", questionColor: "#EDE9FE", answerColor: "#A855F7", bgColor: "#07010F", font: "sans-serif", rounded: 12, removeBrand: false },
});

// ─── icons ────────────────────────────────────────────────
const IC = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  fire: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
  form: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  whatsapp: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  trash: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  drag: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="1" fill="currentColor"/><circle cx="15" cy="7" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="17" r="1" fill="currentColor"/><circle cx="15" cy="17" r="1" fill="currentColor"/></svg>,
  settings: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  eye: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  share: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  download: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  chevron: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  check: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  copy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  up: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>,
  down: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, v };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, v } = useReveal();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? C.green : score >= 65 ? C.accentGold : C.red;
  const label = score >= 85 ? "Quente" : score >= 65 ? "Morno" : "Frio";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{score}</span>
      <span style={{ background: color + "22", color, borderRadius: 20, padding: "1px 8px", fontSize: 11, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, background: value ? C.purpleLight : C.bgCard2, border: `1px solid ${value ? C.purpleLight : C.border}`, position: "relative", transition: "all 0.2s", cursor: "pointer", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 2, left: value ? 19 : 3, width: 16, height: 16, borderRadius: "50%", background: C.white, transition: "left 0.2s" }} />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────
function Sidebar({ screen, setScreen }: { screen: string; setScreen: (s: string) => void }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: IC.dashboard },
    { id: "leads", label: "Todos os Leads", icon: IC.users },
    { id: "hot", label: "Leads Quentes", icon: IC.fire },
    { id: "reports", label: "Relatórios", icon: IC.chart },
    { id: "builder", label: "Formulários", icon: IC.form },
  ];
  return (
    <div style={{ width: 240, minHeight: "100vh", background: C.bgCard, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "relative" }}>
      <div style={{ position: "absolute", top: "30%", left: -30, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED22, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />
      <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 18, fontWeight: 900, color: C.white, letterSpacing: "-0.03em" }}>Brava<span style={{ color: C.purpleLight }}>Form</span></span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "16px 0" }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", background: screen === item.id ? C.purple + "22" : "transparent", borderLeft: `3px solid ${screen === item.id ? C.purpleLight : "transparent"}`, border: "none", color: screen === item.id ? C.white : C.muted, fontSize: 14, fontWeight: screen === item.id ? 700 : 400, cursor: "pointer", textAlign: "left", fontFamily: "sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { if (screen !== item.id) (e.currentTarget as HTMLElement).style.color = C.white; }}
            onMouseLeave={e => { if (screen !== item.id) (e.currentTarget as HTMLElement).style.color = C.muted; }}>
            <span style={{ color: screen === item.id ? C.purpleLight : "inherit" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ padding: 16, borderTop: `1px solid ${C.border}` }}>
        <div style={{ background: C.purple + "22", border: `1px solid ${C.purple}44`, borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.purpleLight, marginBottom: 4 }}>Plano Grátis</div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>1 formulário · 20 leads</div>
          <a href="/vendas#planos" style={{ display: "block", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
            Fazer upgrade
          </a>
        </div>
        <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: C.muted, fontSize: 13, cursor: "pointer", padding: "8px 4px", fontFamily: "sans-serif" }}>
          {IC.logout} Sair
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────
function Dashboard({ setScreen }: { setScreen: (s: string) => void }) {
  const [periodo, setPeriodo] = useState("mes");
  const total = LEADS.length;
  const quentes = LEADS.filter(l => l.score >= 85).length;
  const mornos = LEADS.filter(l => l.score >= 65 && l.score < 85).length;
  const avgScore = Math.round(LEADS.reduce((a, b) => a + b.score, 0) / total);
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Olá, Vinícius 👋</h1>
          <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>Aqui está o resumo dos seus leads hoje</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["semana", "mes", "ano"].map(p => (
            <button key={p} onClick={() => setPeriodo(p)}
              style={{ background: periodo === p ? "linear-gradient(135deg,#7C3AED,#A855F7)" : C.bgCard2, color: periodo === p ? C.white : C.muted, border: `1px solid ${periodo === p ? "transparent" : C.border}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
              {p === "mes" ? "Mês" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button onClick={() => setScreen("builder")}
            style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", color: C.white, border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px #7C3AED44" }}>
            {IC.plus} Novo formulário
          </button>
        </div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { icon: IC.users, value: total, label: "Total de Leads", color: C.purpleLight, bg: C.purple + "22", fn: () => setScreen("leads") },
            { icon: IC.fire, value: quentes, label: "Leads Quentes", color: C.red, bg: C.red + "22", fn: () => setScreen("hot") },
            { icon: IC.chart, value: mornos, label: "Leads Mornos", color: C.accentGold, bg: C.accentGold + "22", fn: () => setScreen("leads") },
            { icon: IC.star, value: avgScore, label: "Score Médio", color: C.green, bg: C.green + "22", fn: () => setScreen("reports") },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div onClick={s.fn} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, cursor: "pointer", transition: "transform .2s,box-shadow .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${s.color}22`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: s.color }}>{s.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Atalhos rápidos</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { label: "Leads quentes", color: C.red, icon: IC.fire, fn: () => setScreen("hot") },
                { label: "Formulários", color: C.purpleLight, icon: IC.form, fn: () => setScreen("builder") },
                { label: "Relatórios", color: C.green, icon: IC.chart, fn: () => setScreen("reports") },
                { label: "Exportar leads", color: C.accentGold, icon: IC.download, fn: () => {} },
              ].map(a => (
                <button key={a.label} onClick={a.fn}
                  style={{ background: a.color + "18", border: `1px solid ${a.color}33`, borderRadius: 12, padding: "14px", color: a.color, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "transform .2s,box-shadow .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${a.color}33`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>Score por Lead</div>
              <button onClick={() => setScreen("reports")} style={{ background: "none", color: C.purpleLight, border: "none", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>Ver relatórios {IC.arrow}</button>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 120 }}>
              {LEADS.map(lead => {
                const color = lead.score >= 85 ? C.green : lead.score >= 65 ? C.accentGold : C.red;
                return (
                  <div key={lead.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{lead.score}</div>
                    <div style={{ width: "100%", height: `${lead.score}%`, background: `linear-gradient(180deg,${color},${color}88)`, borderRadius: "4px 4px 0 0", maxHeight: 100, boxShadow: `0 0 12px ${color}44` }} />
                    <div style={{ fontSize: 10, color: C.muted }}>{lead.name.split(" ")[0]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>Últimos leads</div>
              <button onClick={() => setScreen("leads")} style={{ background: "none", color: C.purpleLight, border: "none", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>Ver todos {IC.arrow}</button>
            </div>
            {LEADS.slice(0, 5).map((lead, i) => (
              <div key={lead.id} style={{ padding: "14px 20px", borderBottom: i < 4 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bgCard2)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#A855F7)", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{lead.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{lead.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{lead.company} · {lead.answers["Segmento"]}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ScoreBadge score={lead.score} />
                  <a href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`} target="_blank" style={{ width: 32, height: 32, borderRadius: 8, background: "#25D36622", display: "flex", alignItems: "center", justifyContent: "center", color: "#25D366", textDecoration: "none" }}>{IC.whatsapp}</a>
                  <a href={`mailto:${lead.email}`} style={{ width: 32, height: 32, borderRadius: 8, background: C.purple + "22", display: "flex", alignItems: "center", justifyContent: "center", color: C.purpleLight, textDecoration: "none" }}>{IC.mail}</a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── LeadsList ────────────────────────────────────────────
function LeadsList({ filter }: { filter?: string }) {
  const [search, setSearch] = useState(""); const [seg, setSeg] = useState(""); const [qual, setQual] = useState(""); const [sel, setSel] = useState<number | null>(null);
  const filtered = LEADS.filter(l => {
    if (filter === "hot" && l.score < 85) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (seg && l.answers["Segmento"] !== seg) return false;
    if (qual === "quente" && l.score < 85) return false;
    if (qual === "morno" && (l.score < 65 || l.score >= 85)) return false;
    if (qual === "frio" && l.score >= 65) return false;
    return true;
  });
  const si: React.CSSProperties = { background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.white, fontFamily: "sans-serif", outline: "none" };
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0 }}>{filter === "hot" ? "Leads Quentes" : "Todos os Leads"}</h1><p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>{filtered.length} leads encontrados</p></div>
          <button style={{ background: C.bgCard2, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6 }}>{IC.download} Exportar CSV</button>
        </div>
      </div>
      <div style={{ padding: 32 }}>
        <Reveal>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...si, flex: 1, minWidth: 180 }} />
            <select value={seg} onChange={e => setSeg(e.target.value)} style={si}><option value="">Todos segmentos</option>{["Serviços","Varejo","Indústria","Educação"].map(s=><option key={s}>{s}</option>)}</select>
            <select value={qual} onChange={e => setQual(e.target.value)} style={si}><option value="">Todos scores</option><option value="quente">Quentes (85+)</option><option value="morno">Mornos (65-84)</option><option value="frio">Frios (&lt;65)</option></select>
            {(search||seg||qual)&&<button onClick={()=>{setSearch("");setSeg("");setQual("");}} style={{background:C.red+"22",color:C.red,border:`1px solid ${C.red}33`,borderRadius:10,padding:"10px 14px",fontSize:13,cursor:"pointer",fontFamily:"sans-serif"}}>Limpar</button>}
          </div>
        </Reveal>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          {filtered.map((lead, i) => (
            <Reveal key={lead.id} delay={i * 40}>
              <div>
                <div onClick={() => setSel(sel === lead.id ? null : lead.id)} style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: sel === lead.id ? C.bgCard2 : "transparent", transition: "background .2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#A855F7)", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 700, fontSize: 15 }}>{lead.name.charAt(0)}</div>
                    <div><div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{lead.name}</div><div style={{ fontSize: 12, color: C.muted }}>{lead.email} · {lead.company}</div></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ScoreBadge score={lead.score} />
                    <span style={{ color: C.muted, display: "inline-block", transform: sel === lead.id ? "rotate(180deg)" : "none", transition: "transform .2s" }}>{IC.chevron}</span>
                  </div>
                </div>
                {sel === lead.id && (
                  <div style={{ padding: 20, background: C.bgCard2, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Respostas</div>
                        {Object.entries(lead.answers).map(([q,a]) => (
                          <div key={q} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                            <span style={{ color: C.muted }}>{q}</span><span style={{ color: C.white, fontWeight: 600 }}>{a}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Contato</div>
                        <div style={{ fontSize: 13, color: C.text, marginBottom: 6 }}>{lead.email}</div>
                        <div style={{ fontSize: 13, color: C.text, marginBottom: 20 }}>{lead.phone}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <a href={`https://wa.me/55${lead.phone.replace(/\D/g,"")}`} target="_blank" style={{ flex:1, background:"#25D366", color:C.white, borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, textDecoration:"none", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{IC.whatsapp} WhatsApp</a>
                          <a href={`mailto:${lead.email}`} style={{ flex:1, background:C.purple+"33", color:C.purpleLight, border:`1px solid ${C.purple}44`, borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, textDecoration:"none", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{IC.mail} E-mail</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────
function Reports() {
  const quentes = LEADS.filter(l => l.score >= 85).length;
  const mornos = LEADS.filter(l => l.score >= 65 && l.score < 85).length;
  const frios = LEADS.filter(l => l.score < 65).length;
  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0 }}>Relatórios</h1>
        <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>Análise completa dos seus leads</p>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <Reveal>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 20 }}>Qualidade dos Leads</div>
              {[{l:"Quentes",v:quentes,c:C.green},{l:"Mornos",v:mornos,c:C.accentGold},{l:"Frios",v:frios,c:C.red}].map(item => {
                const p = Math.round(item.v/LEADS.length*100);
                return (<div key={item.l} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}><span style={{color:C.text}}>{item.l}</span><span style={{color:item.c,fontWeight:700}}>{item.v} ({p}%)</span></div><div style={{height:8,background:C.bgCard2,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${item.c},${item.c}88)`,borderRadius:4,boxShadow:`0 0 8px ${item.c}44`}}/></div></div>);
              })}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 20 }}>Leads por Segmento</div>
              {["Serviços","Varejo","Indústria","Educação"].map(s => {
                const c = LEADS.filter(l=>l.answers["Segmento"]===s).length; const p = Math.round(c/LEADS.length*100);
                return (<div key={s} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}><span style={{color:C.text}}>{s}</span><span style={{color:C.purpleLight,fontWeight:700}}>{c} leads</span></div><div style={{height:8,background:C.bgCard2,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#7C3AED,#A855F7)",borderRadius:4}}/></div></div>);
              })}
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 20 }}>Score Individual</div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 140 }}>
              {LEADS.map(lead => { const color = lead.score>=85?C.green:lead.score>=65?C.accentGold:C.red; return (<div key={lead.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}><div style={{fontSize:12,color:C.muted,fontWeight:600}}>{lead.score}</div><div style={{width:"100%",height:`${lead.score}%`,background:`linear-gradient(180deg,${color},${color}66)`,borderRadius:"6px 6px 0 0",maxHeight:120,boxShadow:`0 0 16px ${color}44`}}/><div style={{fontSize:10,color:C.muted,textAlign:"center",lineHeight:1.3}}>{lead.name.split(" ")[0]}</div></div>); })}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Form Builder ─────────────────────────────────────────
function FormBuilder() {
  const [forms, setForms] = useState<FormConfig[]>([makeForm()]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tab, setTab] = useState<"fields"|"style"|"share">("fields");
  const [selId, setSelId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [pvStep, setPvStep] = useState(0);
  const [pvVals, setPvVals] = useState<Record<string, string>>({});
  const [pvDone, setPvDone] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const active = forms.find(f => f.id === activeId) ?? null;
  const selField = active?.fields.find(f => f.id === selId) ?? null;
  const upForm = useCallback((id: string, u: Partial<FormConfig>) => setForms(fs => fs.map(f => f.id === id ? { ...f, ...u } : f)), []);
  const upField = useCallback((fid: string, id: string, u: Partial<FormField>) => setForms(fs => fs.map(f => f.id === fid ? { ...f, fields: f.fields.map(fi => fi.id === id ? { ...fi, ...u } : fi) } : f)), []);
  const addField = (type: FieldType) => { if (!activeId) return; const nf = makeField(type); setForms(fs => fs.map(f => f.id === activeId ? { ...f, fields: [...f.fields, nf] } : f)); setSelId(nf.id); };
  const delField = (fid: string, id: string) => { setForms(fs => fs.map(f => f.id === fid ? { ...f, fields: f.fields.filter(fi => fi.id !== id) } : f)); if (selId === id) setSelId(null); };
  const moveField = (fid: string, id: string, dir: "up"|"down") => {
    setForms(fs => fs.map(f => {
      if (f.id !== fid) return f;
      const idx = f.fields.findIndex(fi => fi.id === id); if (dir==="up"&&idx===0||dir==="down"&&idx===f.fields.length-1) return f;
      const arr = [...f.fields]; const s = dir==="up"?idx-1:idx+1; [arr[idx],arr[s]]=[arr[s],arr[idx]]; return { ...f, fields: arr };
    }));
  };
  const newForm = () => { const nf = makeForm(); setForms(fs => [...fs, nf]); setActiveId(nf.id); setSelId(null); };
  const openPreview = () => { setPvStep(0); setPvVals({}); setPvDone(false); setPreview(true); };
  const inp: React.CSSProperties = { width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, color: C.white, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" };
  const groups = [...new Set(FIELD_TYPES.map(f => f.group))];

  // ── lista de formulários ──
  if (!activeId) return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div><h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0 }}>Meus Formulários</h1><p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>{forms.length} formulário{forms.length !== 1 ? "s" : ""}</p></div>
        <button onClick={newForm} style={{ background: "linear-gradient(135deg,#7C3AED,#A855F7)", color: C.white, border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px #7C3AED44" }}>
          {IC.plus} Novo formulário
        </button>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {forms.map((form, i) => (
            <Reveal key={form.id} delay={i * 70}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", transition: "transform .2s,box-shadow .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${C.purple}22`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div style={{ height: 110, background: "linear-gradient(135deg,#160830,#1E0845)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 50%,${C.purple}22,transparent 60%)` }} />
                  <div style={{ textAlign: "center", position: "relative" }}>
                    <div style={{ fontSize: 30, marginBottom: 4 }}>📋</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{form.fields.length} campos</div>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 4 }}>{form.title}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>{form.fields.length} perguntas · 0 respostas</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setActiveId(form.id)} style={{ flex: 1, background: "linear-gradient(135deg,#7C3AED,#A855F7)", color: C.white, border: "none", borderRadius: 10, padding: "9px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>Editar</button>
                    <button onClick={() => { setActiveId(form.id); setTimeout(openPreview, 0); }} style={{ background: C.bgCard2, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center" }}>{IC.eye}</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={forms.length * 70}>
            <div onClick={newForm} style={{ background: C.bgCard, border: `2px dashed ${C.border}`, borderRadius: 16, height: 196, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.purpleLight; (e.currentTarget as HTMLElement).style.background = C.purple + "11"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bgCard; }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.purple + "22", display: "flex", alignItems: "center", justifyContent: "center", color: C.purpleLight }}>{IC.plus}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.muted }}>Novo formulário</div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );

  // ── editor ──
  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden", background: C.bg }}>
      {/* PREVIEW MODAL */}
      {preview && active && (
        <div style={{ position: "fixed", inset: 0, background: "#000000dd", backdropFilter: "blur(20px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <style>{"@keyframes slideIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}"}</style>
          <div style={{ background: active.style.bgColor, borderRadius: 24, width: "100%", maxWidth: 520, maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", border: `1px solid ${C.border}33`, boxShadow: "0 40px 80px #000000aa" }}>
            {/* progress */}
            <div style={{ height: 4, background: "#ffffff11", flexShrink: 0 }}>
              <div style={{ height: "100%", width: `${(pvStep / Math.max(active.fields.length - 1, 1)) * 100}%`, background: `linear-gradient(90deg,${active.style.buttonColor},#E879F9)`, transition: "width .4s ease" }} />
            </div>
            {/* header */}
            <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}22`, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img src="/logo.png" alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
                <span style={{ fontSize: 13, fontWeight: 900, color: active.style.questionColor, fontFamily: active.style.font }}>Brava<span style={{ color: active.style.buttonColor }}>Form</span></span>
              </div>
              <button onClick={() => setPreview(false)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>✕</button>
            </div>
            {/* body */}
            <div style={{ flex: 1, overflow: "auto", padding: "32px 28px" }}>
              {pvDone ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
                  <h2 style={{ color: active.style.questionColor, fontSize: 24, fontWeight: 800, margin: "0 0 10px", fontFamily: active.style.font }}>Resposta enviada!</h2>
                  <p style={{ color: C.muted, fontSize: 14 }}>Obrigado por preencher o formulário.</p>
                  <button onClick={() => setPreview(false)} style={{ marginTop: 22, background: active.style.buttonColor, color: C.white, border: "none", borderRadius: active.style.rounded, padding: "13px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: active.style.font }}>Fechar preview</button>
                </div>
              ) : (() => {
                const field = active.fields[pvStep]; if (!field) return null;
                const Q = ({ children }: { children: React.ReactNode }) => (
                  <div key={field.id} style={{ animation: "slideIn .3s ease" }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                      {!["welcome","thanks","message"].includes(field.type) && `${pvStep + 1} / ${active.fields.length}`}
                    </div>
                    <h2 style={{ color: active.style.questionColor, fontSize: 22, fontWeight: 800, margin: "0 0 22px", fontFamily: active.style.font, lineHeight: 1.3 }}>{field.label}</h2>
                    {children}
                  </div>
                );
                if (field.type === "welcome") return <Q><div style={{ textAlign: "center", paddingTop: 8 }}><div style={{ fontSize: 52, marginBottom: 12 }}>👋</div>{field.placeholder && <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7 }}>{field.placeholder}</p>}</div></Q>;
                if (field.type === "thanks") return <Q><div style={{ textAlign: "center", paddingTop: 8 }}><div style={{ fontSize: 52 }}>🎉</div></div></Q>;
                if (field.type === "message") return <Q><div style={{ background: C.bgCard2, borderRadius: active.style.rounded, padding: 16, border: `1px solid ${C.border}` }}><p style={{ color: C.muted, fontSize: 14, margin: 0, lineHeight: 1.8 }}>{field.placeholder || "Texto informativo."}</p></div></Q>;
                if (["name","email","phone","short","number","money","date","cpf","cnpj","address"].includes(field.type)) return <Q>
                  <input placeholder={field.placeholder || ""} value={pvVals[field.id]||""} onChange={e=>setPvVals(v=>({...v,[field.id]:e.target.value}))}
                    style={{ width:"100%", background:C.bgCard2, border:`2px solid ${C.border}`, borderRadius:active.style.rounded, padding:"14px 16px", fontSize:16, color:active.style.questionColor, fontFamily:active.style.font, outline:"none", boxSizing:"border-box", transition:"border-color .2s" }}
                    onFocus={e=>(e.currentTarget.style.borderColor=active.style.answerColor)} onBlur={e=>(e.currentTarget.style.borderColor=C.border)} />
                </Q>;
                if (field.type === "long") return <Q>
                  <textarea rows={4} placeholder={field.placeholder||""} value={pvVals[field.id]||""} onChange={e=>setPvVals(v=>({...v,[field.id]:e.target.value}))}
                    style={{ width:"100%", background:C.bgCard2, border:`2px solid ${C.border}`, borderRadius:active.style.rounded, padding:"14px 16px", fontSize:15, color:active.style.questionColor, fontFamily:active.style.font, outline:"none", boxSizing:"border-box", resize:"vertical" }}
                    onFocus={e=>(e.currentTarget.style.borderColor=active.style.answerColor)} onBlur={e=>(e.currentTarget.style.borderColor=C.border)} />
                </Q>;
                if (field.type === "choice" || field.type === "dropdown") return <Q>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {(field.options||[]).map((opt,idx) => {
                      const sel = pvVals[field.id]===opt;
                      return (<button key={opt} onClick={()=>setPvVals(v=>({...v,[field.id]:opt}))}
                        style={{ background:sel?active.style.buttonColor+"22":C.bgCard2, border:`2px solid ${sel?active.style.answerColor:C.border}`, borderRadius:active.style.rounded, padding:"14px 16px", color:sel?active.style.questionColor:C.muted, fontSize:15, textAlign:"left", cursor:"pointer", fontFamily:active.style.font, fontWeight:sel?700:400, display:"flex", alignItems:"center", gap:12, transition:"all .15s" }}
                        onMouseEnter={e=>{if(!sel)(e.currentTarget as HTMLElement).style.borderColor=C.muted;}} onMouseLeave={e=>{if(!sel)(e.currentTarget as HTMLElement).style.borderColor=C.border;}}>
                        <span style={{ width:26, height:26, borderRadius:6, background:sel?active.style.answerColor:C.bgCard, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:sel?C.white:C.muted, flexShrink:0 }}>
                          {sel ? IC.check : String.fromCharCode(65+idx)}
                        </span>{opt}
                      </button>);
                    })}
                  </div>
                </Q>;
                if (field.type === "scale") return <Q>
                  <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:10 }}>
                    {Array.from({length:(field.scaleMax||10)-(field.scaleMin||1)+1},(_,i)=>i+(field.scaleMin||1)).map(n=>{
                      const s=pvVals[field.id]===String(n);
                      return (<button key={n} onClick={()=>setPvVals(v=>({...v,[field.id]:String(n)}))}
                        style={{ width:48, height:48, borderRadius:active.style.rounded, background:s?active.style.buttonColor:C.bgCard2, border:`2px solid ${s?active.style.answerColor:C.border}`, color:s?C.white:C.muted, fontSize:16, fontWeight:s?700:400, cursor:"pointer", fontFamily:active.style.font, transition:"all .15s" }}>
                        {n}</button>);
                    })}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:12, color:C.muted }}>{field.scaleMinLabel}</span><span style={{ fontSize:12, color:C.muted }}>{field.scaleMaxLabel}</span></div>
                </Q>;
                if (field.type === "terms") return <Q>
                  <div style={{ background:C.bgCard2, borderRadius:active.style.rounded, padding:14, marginBottom:14, maxHeight:120, overflow:"auto" }}><p style={{ color:C.muted, fontSize:13, margin:0, lineHeight:1.7 }}>{field.placeholder||"Termos e condições..."}</p></div>
                  <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                    <input type="checkbox" checked={pvVals[field.id]==="yes"} onChange={e=>setPvVals(v=>({...v,[field.id]:e.target.checked?"yes":""}))} style={{ width:18, height:18, accentColor:active.style.buttonColor }} />
                    <span style={{ fontSize:14, color:active.style.questionColor, fontFamily:active.style.font }}>Aceito os termos de uso</span>
                  </label>
                </Q>;
                return <Q><div style={{ color:C.muted, fontSize:13 }}>Campo não suportado no preview.</div></Q>;
              })()}
            </div>
            {/* nav */}
            {!pvDone && (
              <div style={{ padding: "14px 28px 22px", display: "flex", gap: 10, flexShrink: 0 }}>
                {pvStep > 0 && <button onClick={()=>setPvStep(s=>s-1)} style={{ background:C.bgCard2, color:C.muted, border:`1px solid ${C.border}`, borderRadius:active.style.rounded, padding:"13px 20px", fontSize:14, cursor:"pointer", fontFamily:active.style.font }}>←</button>}
                <button onClick={() => pvStep===active.fields.length-1?setPvDone(true):setPvStep(s=>s+1)}
                  style={{ flex:1, background:active.style.buttonColor, color:C.white, border:"none", borderRadius:active.style.rounded, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:active.style.font, boxShadow:`0 4px 20px ${active.style.buttonColor}44` }}>
                  {pvStep===active.fields.length-1?"Enviar":"Continuar →"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAINEL ESQ — tipos de campo */}
      <div style={{ width: 212, borderRight: `1px solid ${C.border}`, overflow: "auto", background: C.bgCard, flexShrink: 0 }}>
        <div style={{ padding: "14px 12px 8px", borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => setActiveId(null)} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:12, fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:4, marginBottom:10, padding:0 }}>← Formulários</button>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Adicionar campo</div>
        </div>
        <div style={{ padding: "8px 6px" }}>
          {groups.map(group => (
            <div key={group} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 6px 5px" }}>{group}</div>
              {FIELD_TYPES.filter(f => f.group === group).map(ft => (
                <button key={ft.type} onClick={() => addField(ft.type)}
                  style={{ display:"flex", alignItems:"center", gap:7, background:"none", border:"none", color:C.text, fontSize:12, cursor:"pointer", fontFamily:"sans-serif", padding:"7px 8px", borderRadius:8, textAlign:"left", width:"100%", transition:"background .15s" }}
                  onMouseEnter={e=>(e.currentTarget.style.background=C.purple+"22")}
                  onMouseLeave={e=>(e.currentTarget.style.background="none")}>
                  <span style={{ fontSize: 13 }}>{ft.icon}</span> {ft.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CENTRO — canvas */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* barra topo */}
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard + "cc", backdropFilter: "blur(20px)", flexShrink: 0 }}>
          <input value={active?.title || ""} onChange={e => upForm(activeId!, { title: e.target.value })}
            style={{ background:"none", border:"none", color:C.white, fontSize:15, fontWeight:700, fontFamily:"sans-serif", outline:"none", minWidth: 180 }} placeholder="Nome do formulário" />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={openPreview} style={{ background:C.bgCard2, color:C.muted, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 14px", fontSize:13, cursor:"pointer", fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:5 }}>{IC.eye} Preview</button>
            <button onClick={()=>setTab("share")} style={{ background:"linear-gradient(135deg,#7C3AED,#A855F7)", color:C.white, border:"none", borderRadius:10, padding:"8px 14px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:5, boxShadow:"0 4px 16px #7C3AED44" }}>{IC.share} Compartilhar</button>
          </div>
        </div>
        {/* canvas lista campos */}
        <div style={{ flex: 1, overflow: "auto", padding: 20, background: C.bg }}>
          <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {active?.fields.map((field) => (
              <div key={field.id} draggable
                onDragStart={() => setDragging(field.id)}
                onDragOver={e => { e.preventDefault(); setDragOver(field.id); }}
                onDrop={e => {
                  e.preventDefault();
                  if (!dragging || !activeId || dragging === field.id) { setDragging(null); setDragOver(null); return; }
                  setForms(fs => fs.map(f => {
                    if (f.id !== activeId) return f;
                    const arr = [...f.fields]; const fi = arr.findIndex(x=>x.id===dragging); const ti = arr.findIndex(x=>x.id===field.id);
                    const [m] = arr.splice(fi,1); arr.splice(ti,0,m); return {...f,fields:arr};
                  }));
                  setDragging(null); setDragOver(null);
                }}
                onClick={() => setSelId(field.id)}
                style={{ background:selId===field.id?C.bgCard2:C.bgCard, border:`2px solid ${selId===field.id?C.purpleLight:dragOver===field.id?C.purpleLight+"66":C.border}`, borderRadius:14, padding:"13px 15px", cursor:"pointer", transition:"all .15s", opacity:dragging===field.id?0.4:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:C.muted, cursor:"grab" }}>{IC.drag}</span>
                  <span style={{ fontSize:15 }}>{FIELD_TYPES.find(f=>f.type===field.type)?.icon||"📝"}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{field.label||"Sem título"}</div>
                    <div style={{ fontSize:11, color:C.muted }}>{FIELD_TYPES.find(f=>f.type===field.type)?.label}{field.required?" · Obrigatório":""}</div>
                  </div>
                  <div style={{ display:"flex", gap:2 }}>
                    {(["up","down"] as const).map((dir)=>(
                      <button key={dir} onClick={e=>{e.stopPropagation();moveField(activeId!,field.id,dir);}}
                        style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", padding:4, borderRadius:6 }}
                        onMouseEnter={e=>(e.currentTarget.style.color=C.white)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>
                        {dir==="up"?IC.up:IC.down}
                      </button>
                    ))}
                    <button onClick={e=>{e.stopPropagation();delField(activeId!,field.id);}}
                      style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", padding:4, borderRadius:6 }}
                      onMouseEnter={e=>(e.currentTarget.style.color=C.red)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>
                      {IC.trash}
                    </button>
                  </div>
                </div>
                {field.type==="choice"&&field.options&&(
                  <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${C.border}`, display:"flex", flexWrap:"wrap", gap:6 }}>
                    {field.options.map((o,i)=><span key={i} style={{ background:C.purple+"22", color:C.purpleLight, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{String.fromCharCode(65+i)} {o}</span>)}
                  </div>
                )}
                {field.type==="scale"&&(
                  <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${C.border}`, display:"flex", gap:4, alignItems:"center" }}>
                    {[1,2,3,4,5].map(n=><div key={n} style={{ width:28, height:28, borderRadius:6, background:C.bgCard2, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:C.muted }}>{n}</div>)}
                    <span style={{ fontSize:11, color:C.muted }}>…{field.scaleMax}</span>
                  </div>
                )}
              </div>
            ))}
            {active?.fields.length===0&&(
              <div style={{ textAlign:"center", padding:"60px 20px", color:C.muted }}>
                <div style={{ fontSize:38, marginBottom:10 }}>📋</div>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:6 }}>Formulário vazio</div>
                <div style={{ fontSize:12 }}>Clique em um tipo de campo à esquerda para adicionar</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PAINEL DIR — propriedades */}
      <div style={{ width: 276, borderLeft: `1px solid ${C.border}`, overflow: "auto", background: C.bgCard, flexShrink: 0 }}>
        {/* tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
          {([["fields",IC.settings,"Campo"],["style",IC.eye,"Estilo"],["share",IC.share,"Partilhar"]] as const).map(([t,icon,label])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1, background:tab===t?C.bgCard2:"none", color:tab===t?C.white:C.muted, border:"none", borderBottom:`2px solid ${tab===t?C.purpleLight:"transparent"}`, padding:"11px 4px", fontSize:12, fontWeight:tab===t?700:400, cursor:"pointer", fontFamily:"sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
              {icon} {label}
            </button>
          ))}
        </div>
        <div style={{ padding: 16 }}>
          {/* ABA CAMPO */}
          {tab==="fields"&&selField&&active&&(
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ fontSize:11, color:C.purpleLight, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", display:"flex", alignItems:"center", gap:6 }}>
                <span>{FIELD_TYPES.find(f=>f.type===selField.type)?.icon}</span>
                {FIELD_TYPES.find(f=>f.type===selField.type)?.label}
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Pergunta</label>
                <textarea value={selField.label} onChange={e=>upField(activeId!,selField.id,{label:e.target.value})} rows={3} style={{...inp,resize:"vertical"}} />
              </div>
              {["name","email","phone","short","long","number","money","date","cpf","cnpj","address"].includes(selField.type)&&(
                <div>
                  <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Placeholder</label>
                  <input value={selField.placeholder||""} onChange={e=>upField(activeId!,selField.id,{placeholder:e.target.value})} style={inp} />
                </div>
              )}
              {["welcome","thanks","message","terms"].includes(selField.type)&&(
                <div>
                  <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Descrição</label>
                  <textarea value={selField.placeholder||""} onChange={e=>upField(activeId!,selField.id,{placeholder:e.target.value})} rows={4} style={{...inp,resize:"vertical"}} placeholder="Texto de apoio..." />
                </div>
              )}
              {["choice","dropdown","image_choice"].includes(selField.type)&&(
                <div>
                  <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Opções</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {(selField.options||[]).map((opt,idx)=>(
                      <div key={idx} style={{ display:"flex", gap:6 }}>
                        <span style={{ width:22, height:36, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:C.muted, flexShrink:0 }}>{String.fromCharCode(65+idx)}</span>
                        <input value={opt} onChange={e=>{const o=[...(selField.options||[])];o[idx]=e.target.value;upField(activeId!,selField.id,{options:o});}} style={{...inp,flex:1}} />
                        <button onClick={()=>upField(activeId!,selField.id,{options:(selField.options||[]).filter((_,i)=>i!==idx)})}
                          style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", padding:"0 4px" }}
                          onMouseEnter={e=>(e.currentTarget.style.color=C.red)} onMouseLeave={e=>(e.currentTarget.style.color=C.muted)}>
                          {IC.trash}
                        </button>
                      </div>
                    ))}
                    <button onClick={()=>upField(activeId!,selField.id,{options:[...(selField.options||[]),`Opção ${(selField.options?.length||0)+1}`]})}
                      style={{ background:C.purple+"22", border:`1px dashed ${C.purple}66`, borderRadius:8, padding:"8px", color:C.purpleLight, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                      {IC.plus} Adicionar opção
                    </button>
                  </div>
                </div>
              )}
              {selField.type==="scale"&&(
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Mínimo</label><input type="number" value={selField.scaleMin??1} onChange={e=>upField(activeId!,selField.id,{scaleMin:Number(e.target.value)})} style={inp}/></div>
                    <div><label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Máximo</label><input type="number" value={selField.scaleMax??10} onChange={e=>upField(activeId!,selField.id,{scaleMax:Number(e.target.value)})} style={inp}/></div>
                  </div>
                  <div><label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Label mínimo</label><input value={selField.scaleMinLabel||""} onChange={e=>upField(activeId!,selField.id,{scaleMinLabel:e.target.value})} style={inp} placeholder="Ex: Péssimo"/></div>
                  <div><label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>Label máximo</label><input value={selField.scaleMaxLabel||""} onChange={e=>upField(activeId!,selField.id,{scaleMaxLabel:e.target.value})} style={inp} placeholder="Ex: Excelente"/></div>
                </div>
              )}
              {!["welcome","thanks","message"].includes(selField.type)&&(
                <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                  <Toggle value={selField.required} onChange={()=>upField(activeId!,selField.id,{required:!selField.required})} />
                  <span style={{ fontSize:13, color:C.text }}>Obrigatório</span>
                </label>
              )}
            </div>
          )}
          {tab==="fields"&&!selField&&(
            <div style={{ textAlign:"center", padding:"40px 14px", color:C.muted }}>
              <div style={{ fontSize:30, marginBottom:10 }}>👈</div>
              <div style={{ fontSize:13 }}>Clique em um campo para editar</div>
            </div>
          )}
          {/* ABA ESTILO */}
          {tab==="style"&&active&&(
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ fontSize:11, color:C.purpleLight, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Personalização visual</div>
              {([["Cor do botão","buttonColor"],["Cor da pergunta","questionColor"],["Cor da resposta","answerColor"],["Cor de fundo","bgColor"]] as const).map(([label,key])=>(
                <div key={key}>
                  <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>{label}</label>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <input type="color" value={active.style[key]} onChange={e=>upForm(activeId!,{style:{...active.style,[key]:e.target.value}})}
                      style={{ width:40, height:36, borderRadius:8, border:`1px solid ${C.border}`, background:"none", cursor:"pointer", padding:2 }} />
                    <input value={active.style[key]} onChange={e=>upForm(activeId!,{style:{...active.style,[key]:e.target.value}})} style={{...inp,flex:1}} />
                  </div>
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Arredondamento</label>
                <input type="range" min={0} max={24} value={active.style.rounded} onChange={e=>upForm(activeId!,{style:{...active.style,rounded:Number(e.target.value)}})} style={{ width:"100%", accentColor:C.purpleLight }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginTop:2 }}><span>Quadrado</span><span>{active.style.rounded}px</span><span>Redondo</span></div>
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Fonte</label>
                <select value={active.style.font} onChange={e=>upForm(activeId!,{style:{...active.style,font:e.target.value}})} style={inp}>
                  {["sans-serif","serif","monospace","Georgia","Trebuchet MS","Verdana"].map(f=><option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
                <Toggle value={active.style.removeBrand} onChange={()=>upForm(activeId!,{style:{...active.style,removeBrand:!active.style.removeBrand}})} />
                <div><span style={{ fontSize:13, color:C.text }}>Remover marca</span><div style={{ fontSize:11, color:C.muted }}>Plano Pro ou superior</div></div>
              </label>
            </div>
          )}
          {/* ABA COMPARTILHAR */}
          {tab==="share"&&active&&(
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ fontSize:11, color:C.purpleLight, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>Compartilhar</div>
              <div>
                <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Link direto</label>
                <div style={{ display:"flex", gap:6 }}>
                  <input readOnly value={`https://bravaform.vercel.app/f/${active.id}`} style={{...inp,flex:1,fontSize:11,color:C.muted}} />
                  <button onClick={()=>{navigator.clipboard.writeText(`https://bravaform.vercel.app/f/${active.id}`);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
                    style={{ background:copied?C.green+"33":C.purple+"22", color:copied?C.green:C.purpleLight, border:`1px solid ${copied?C.green+"44":C.purple+"44"}`, borderRadius:8, padding:"0 10px", fontSize:11, cursor:"pointer", fontFamily:"sans-serif", whiteSpace:"nowrap", transition:"all .2s" }}>
                    {copied?"✓ Copiado":<>{IC.copy} Copiar</>}
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Incorporar no site</label>
                {["Normal (iframe)","Tela cheia","Botão popup"].map(mode=>(
                  <div key={mode} style={{ background:C.bgCard2, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontSize:12, color:C.text }}>{mode}</span>
                    <button style={{ background:"none", border:"none", color:C.purpleLight, cursor:"pointer", fontSize:11, fontFamily:"sans-serif", fontWeight:700 }}>Copiar</button>
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display:"block", fontSize:11, color:C.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Redes sociais</label>
                <div style={{ display:"flex", gap:8 }}>
                  {[["WhatsApp","#25D366"],["LinkedIn","#0A66C2"],["E-mail",C.purpleLight]].map(([l,c])=>(
                    <button key={l} style={{ flex:1, background:c+"22", color:c, border:`1px solid ${c}33`, borderRadius:8, padding:"8px 4px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"sans-serif" }}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ background:C.accentGold+"11", border:`1px solid ${C.accentGold}33`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.accentGold, marginBottom:8 }}>📊 Estatísticas</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[["Visualizações","0"],["Respostas","0"],["Concluídos","0%"],["Score médio","—"]].map(([l,v])=>(
                    <div key={l} style={{ textAlign:"center", background:C.bgCard2, borderRadius:8, padding:"8px 4px" }}>
                      <div style={{ fontSize:18, fontWeight:900, color:C.white }}>{v}</div>
                      <div style={{ fontSize:10, color:C.muted }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── root ─────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState("dashboard");
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#07010F;}
        ::-webkit-scrollbar-thumb{background:#2D1458;border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:#7C3AED;}
        input[type=color]::-webkit-color-swatch-wrapper{padding:0;}
        input[type=color]::-webkit-color-swatch{border:none;border-radius:6px;}
      `}</style>
      <Sidebar screen={screen} setScreen={setScreen} />
      {screen === "dashboard" && <Dashboard setScreen={setScreen} />}
      {screen === "leads" && <LeadsList />}
      {screen === "hot" && <LeadsList filter="hot" />}
      {screen === "reports" && <Reports />}
      {screen === "builder" && <FormBuilder />}
    </div>
  );
}

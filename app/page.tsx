"use client";
import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#07010F", bgCard: "#0F0520", bgCard2: "#160830",
  purple: "#7C3AED", purpleLight: "#A855F7", accent: "#E879F9",
  accentGold: "#F59E0B", white: "#FFFFFF", text: "#EDE9FE",
  muted: "#9478C0", green: "#22C55E", red: "#EF4444",
  border: "#2D1458",
};

const LEADS = [
  { id: 1, name: "Carlos Mendes", email: "carlos@empresa.com", phone: "11999001122", company: "TechVentures", answers: { "Faturamento": "De 51 mil a 100 mil", "Cargo": "Proprietário", "Segmento": "Serviços" }, score: 85, date: "2025-05-10" },
  { id: 2, name: "Ana Beatriz", email: "ana@educa.com", phone: "21988776655", company: "EducaMais", answers: { "Faturamento": "De 101 mil a 300 mil", "Cargo": "Diretor", "Segmento": "Educação" }, score: 92, date: "2025-05-11" },
  { id: 3, name: "Rafael Oliveira", email: "rafael@varejo.com", phone: "31977665544", company: "VarejoX", answers: { "Faturamento": "Até 30 mil", "Cargo": "Gerente", "Segmento": "Varejo" }, score: 58, date: "2025-05-12" },
  { id: 4, name: "Fernanda Costa", email: "fernanda@ind.com", phone: "41966554433", company: "IndustriaPlus", answers: { "Faturamento": "De 301 mil a 1 milhão", "Cargo": "Proprietário", "Segmento": "Indústria" }, score: 96, date: "2025-05-13" },
  { id: 5, name: "Marcos Souza", email: "marcos@sols.com", phone: "51955443322", company: "Sols Agency", answers: { "Faturamento": "De 31 mil a 50 mil", "Cargo": "Operacional", "Segmento": "Serviços" }, score: 71, date: "2025-05-14" },
  { id: 6, name: "Juliana Pires", email: "juliana@edutop.com", phone: "62944332211", company: "EduTop", answers: { "Faturamento": "De 1 milhão a 4 milhões", "Cargo": "Diretor", "Segmento": "Educação" }, score: 99, date: "2025-05-14" },
];

const IC = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  fire: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
  form: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  whatsapp: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  filter: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  download: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  logout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  chevron: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
};

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

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? C.green : score >= 65 ? C.accentGold : C.red;
  const label = score >= 85 ? "Quente" : score >= 65 ? "Morno" : "Frio";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{score}</span>
      <span style={{ background: color + "22", color, borderRadius: 20, padding: "1px 8px", fontSize: 11, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function Sidebar({ screen, setScreen }: { screen: string; setScreen: (s: string) => void }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: IC.dashboard },
    { id: "leads", label: "Todos os Leads", icon: IC.users },
    { id: "hot", label: "Leads Quentes", icon: IC.fire },
    { id: "reports", label: "Relatórios", icon: IC.chart },
    { id: "form", label: "Formulário", icon: IC.form },
  ];

  return (
    <div style={{ width: 240, minHeight: "100vh", background: C.bgCard, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "relative" }}>
      <div style={{ position: "absolute", top: "30%", left: "-30px", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED22, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />

      <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 18, fontWeight: 900, color: C.white, letterSpacing: "-0.03em" }}>Brava<span style={{ color: C.purpleLight }}>Form</span></span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "16px 0" }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", background: screen === item.id ? C.purple + "22" : "transparent", borderLeft: `3px solid ${screen === item.id ? C.purpleLight : "transparent"}`, border: "none", borderRight: "none", borderTop: "none", borderBottom: "none", borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: screen === item.id ? C.purpleLight : "transparent", color: screen === item.id ? C.white : C.muted, fontSize: 14, fontWeight: screen === item.id ? 700 : 400, cursor: "pointer", textAlign: "left", fontFamily: "sans-serif", transition: "all 0.2s" }}
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
          <a href="/vendas#planos" style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 8, padding: "8px", fontSize: 12, fontWeight: 700, cursor: "pointer", textAlign: "center", textDecoration: "none" }}>
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

function Dashboard({ setScreen }: { setScreen: (s: string) => void }) {
  const [periodo, setPeriodo] = useState("mes");
  const total = LEADS.length;
  const quentes = LEADS.filter(l => l.score >= 85).length;
  const mornos = LEADS.filter(l => l.score >= 65 && l.score < 85).length;
  const avgScore = Math.round(LEADS.reduce((a, b) => a + b.score, 0) / total);

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      {/* Header */}
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Olá, Vinícius 👋</h1>
          <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>Aqui está o resumo dos seus leads hoje</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["semana", "mes", "ano"].map(p => (
            <button key={p} onClick={() => setPeriodo(p)}
              style={{ background: periodo === p ? "linear-gradient(135deg, #7C3AED, #A855F7)" : C.bgCard2, color: periodo === p ? C.white : C.muted, border: `1px solid ${periodo === p ? "transparent" : C.border}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif", textTransform: "capitalize" }}>
              {p === "mes" ? "Mês" : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button onClick={() => setScreen("form")}
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px #7C3AED44" }}>
            {IC.plus} Novo formulário
          </button>
        </div>
      </div>

      <div style={{ padding: 32 }}>
        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { icon: IC.users, value: total, label: "Total de Leads", color: C.purpleLight, bg: C.purple + "22", onClick: () => setScreen("leads") },
            { icon: IC.fire, value: quentes, label: "Leads Quentes", color: C.red, bg: C.red + "22", onClick: () => setScreen("hot") },
            { icon: IC.chart, value: mornos, label: "Leads Mornos", color: C.accentGold, bg: C.accentGold + "22", onClick: () => setScreen("leads") },
            { icon: IC.star, value: avgScore, label: "Score Médio", color: C.green, bg: C.green + "22", onClick: () => setScreen("reports") },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <Card3D style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, cursor: "pointer" }}
                // @ts-ignore
                onClick={s.onClick}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: s.color }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>{s.label}</div>
              </Card3D>
            </Reveal>
          ))}
        </div>

        {/* Atalhos rápidos */}
        <Reveal delay={200}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Atalhos rápidos</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { label: "Ver leads quentes", color: C.red, icon: IC.fire, onClick: () => setScreen("hot") },
                { label: "Abrir formulário", color: C.purpleLight, icon: IC.form, onClick: () => setScreen("form") },
                { label: "Ver relatórios", color: C.green, icon: IC.chart, onClick: () => setScreen("reports") },
                { label: "Exportar leads", color: C.accentGold, icon: IC.download, onClick: () => {} },
              ].map(a => (
                <button key={a.label} onClick={a.onClick}
                  style={{ background: a.color + "18", border: `1px solid ${a.color}33`, borderRadius: 12, padding: "14px", color: a.color, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${a.color}33`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Score bar chart */}
        <Reveal delay={300}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>Score por Lead</div>
              <button onClick={() => setScreen("reports")} style={{ background: "none", color: C.purpleLight, border: "none", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                Ver relatórios {IC.arrow}
              </button>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 120 }}>
              {LEADS.map(lead => {
                const color = lead.score >= 85 ? C.green : lead.score >= 65 ? C.accentGold : C.red;
                return (
                  <div key={lead.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{lead.score}</div>
                    <div style={{ width: "100%", height: `${lead.score}%`, background: `linear-gradient(180deg, ${color}, ${color}88)`, borderRadius: "4px 4px 0 0", maxHeight: 100, transition: "height 1s ease", boxShadow: `0 0 12px ${color}44` }} />
                    <div style={{ fontSize: 10, color: C.muted, textAlign: "center" }}>{lead.name.split(" ")[0]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Recent leads */}
        <Reveal delay={400}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>Últimos leads</div>
              <button onClick={() => setScreen("leads")} style={{ background: "none", color: C.purpleLight, border: "none", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                Ver todos {IC.arrow}
              </button>
            </div>
            {LEADS.slice(0, 5).map((lead, i) => (
              <div key={lead.id} style={{ padding: "14px 20px", borderBottom: i < 4 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bgCard2)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{lead.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{lead.company} · {lead.answers["Segmento"]}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ScoreBadge score={lead.score} />
                  <a href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`} target="_blank"
                    style={{ width: 32, height: 32, borderRadius: 8, background: "#25D36622", display: "flex", alignItems: "center", justifyContent: "center", color: "#25D366", textDecoration: "none", transition: "background 0.2s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#25D36633")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#25D36622")}>
                    {IC.whatsapp}
                  </a>
                  <a href={`mailto:${lead.email}`}
                    style={{ width: 32, height: 32, borderRadius: 8, background: C.purple + "22", display: "flex", alignItems: "center", justifyContent: "center", color: C.purpleLight, textDecoration: "none", transition: "background 0.2s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = C.purple + "33")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = C.purple + "22")}>
                    {IC.mail}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function LeadsList({ filter }: { filter?: string }) {
  const [search, setSearch] = useState("");
  const [segmento, setSegmento] = useState("");
  const [qualidade, setQualidade] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = LEADS.filter(l => {
    if (filter === "hot" && l.score < 85) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (segmento && l.answers["Segmento"] !== segmento) return false;
    if (qualidade === "quente" && l.score < 85) return false;
    if (qualidade === "morno" && (l.score < 65 || l.score >= 85)) return false;
    if (qualidade === "frio" && l.score >= 65) return false;
    return true;
  });

  const selectStyle: React.CSSProperties = { background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.white, fontFamily: "sans-serif", outline: "none" };

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>
              {filter === "hot" ? "Leads Quentes" : "Todos os Leads"}
            </h1>
            <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>{filtered.length} leads encontrados</p>
          </div>
          <button style={{ background: C.bgCard2, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
            {IC.download} Exportar CSV
          </button>
        </div>
      </div>

      <div style={{ padding: 32 }}>
        <Reveal>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input placeholder="Buscar por nome ou empresa..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...selectStyle, flex: 1, minWidth: 200 }} />
            <select value={segmento} onChange={e => setSegmento(e.target.value)} style={selectStyle}>
              <option value="">Todos segmentos</option>
              {["Serviços", "Varejo", "Indústria", "Educação"].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={qualidade} onChange={e => setQualidade(e.target.value)} style={selectStyle}>
              <option value="">Todos os scores</option>
              <option value="quente">Quentes (85+)</option>
              <option value="morno">Mornos (65-84)</option>
              <option value="frio">Frios (abaixo de 65)</option>
            </select>
            {(search || segmento || qualidade) && (
              <button onClick={() => { setSearch(""); setSegmento(""); setQualidade(""); }}
                style={{ background: C.red + "22", color: C.red, border: `1px solid ${C.red}33`, borderRadius: 10, padding: "10px 14px", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif" }}>
                Limpar
              </button>
            )}
          </div>
        </Reveal>

        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          {filtered.map((lead, i) => (
            <Reveal key={lead.id} delay={i * 50}>
              <div>
                <div onClick={() => setSelected(selected === lead.id ? null : lead.id)}
                  style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: selected === lead.id ? C.bgCard2 : "transparent", transition: "background 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 700, fontSize: 15 }}>
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{lead.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{lead.email} · {lead.company}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ScoreBadge score={lead.score} />
                    <span style={{ color: C.muted, transform: selected === lead.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{IC.chevron}</span>
                  </div>
                </div>
                {selected === lead.id && (
                  <div style={{ padding: "20px", background: C.bgCard2, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Respostas</div>
                        {Object.entries(lead.answers).map(([q, a]) => (
                          <div key={q} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                            <span style={{ color: C.muted }}>{q}</span>
                            <span style={{ color: C.white, fontWeight: 600 }}>{a}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Contato</div>
                        <div style={{ fontSize: 13, color: C.text, marginBottom: 6 }}>{lead.email}</div>
                        <div style={{ fontSize: 13, color: C.text, marginBottom: 20 }}>{lead.phone}</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <a href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`} target="_blank"
                            style={{ flex: 1, background: "#25D366", color: C.white, borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                            {IC.whatsapp} WhatsApp
                          </a>
                          <a href={`mailto:${lead.email}`}
                            style={{ flex: 1, background: C.purple + "33", color: C.purpleLight, border: `1px solid ${C.purple}44`, borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                            {IC.mail} E-mail
                          </a>
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

function Reports() {
  const quentes = LEADS.filter(l => l.score >= 85).length;
  const mornos = LEADS.filter(l => l.score >= 65 && l.score < 85).length;
  const frios = LEADS.filter(l => l.score < 65).length;

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "24px 32px", borderBottom: `1px solid ${C.border}`, background: C.bgCard + "88", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <h1 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>Relatórios</h1>
        <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>Análise completa dos seus leads</p>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <Reveal>
            <Card3D style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 20 }}>Qualidade dos Leads</div>
              {[
                { label: "Quentes", value: quentes, color: C.green, pct: Math.round(quentes / LEADS.length * 100) },
                { label: "Mornos", value: mornos, color: C.accentGold, pct: Math.round(mornos / LEADS.length * 100) },
                { label: "Frios", value: frios, color: C.red, pct: Math.round(frios / LEADS.length * 100) },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: C.text }}>{item.label}</span>
                    <span style={{ color: item.color, fontWeight: 700 }}>{item.value} ({item.pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: C.bgCard2, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.pct}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`, borderRadius: 4, boxShadow: `0 0 8px ${item.color}44` }} />
                  </div>
                </div>
              ))}
            </Card3D>
          </Reveal>

          <Reveal delay={100}>
            <Card3D style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 20 }}>Leads por Segmento</div>
              {["Serviços", "Varejo", "Indústria", "Educação"].map(s => {
                const count = LEADS.filter(l => l.answers["Segmento"] === s).length;
                const pct = Math.round(count / LEADS.length * 100);
                return (
                  <div key={s} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                      <span style={{ color: C.text }}>{s}</span>
                      <span style={{ color: C.purpleLight, fontWeight: 700 }}>{count} leads</span>
                    </div>
                    <div style={{ height: 8, background: C.bgCard2, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #7C3AED, #A855F7)", borderRadius: 4 }} />
                    </div>
                  </div>
                );
              })}
            </Card3D>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <Card3D style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 20 }}>Score Individual por Lead</div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 140 }}>
              {LEADS.map(lead => {
                const color = lead.score >= 85 ? C.green : lead.score >= 65 ? C.accentGold : C.red;
                return (
                  <div key={lead.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{lead.score}</div>
                    <div style={{ width: "100%", height: `${lead.score}%`, background: `linear-gradient(180deg, ${color}, ${color}66)`, borderRadius: "6px 6px 0 0", maxHeight: 120, boxShadow: `0 0 16px ${color}44` }} />
                    <div style={{ fontSize: 10, color: C.muted, textAlign: "center", lineHeight: 1.3 }}>{lead.name.split(" ")[0]}</div>
                  </div>
                );
              })}
            </div>
          </Card3D>
        </Reveal>
      </div>
    </div>
  );
}

function PublicForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const questions = [
    { id: "fat", label: "Faturamento mensal da empresa", options: ["Até 30 mil", "De 31 mil a 50 mil", "De 51 mil a 100 mil", "De 101 mil a 300 mil", "De 301 mil a 1 milhão", "Mais de 1 milhão"] },
    { id: "cargo", label: "Qual o seu cargo atual?", options: ["Proprietário / Sócio", "Diretor", "Gerente", "Operacional", "Outro"] },
    { id: "seg", label: "Qual o segmento da sua empresa?", options: ["Serviços", "Varejo", "Indústria", "Educação", "Outro"] },
  ];

  const progress = (step / (questions.length + 1)) * 100;

  if (done) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.bg, padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.green + "22", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2 style={{ color: C.white, fontSize: 26, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.03em" }}>Recebemos suas informações!</h2>
        <p style={{ color: C.muted, margin: "0 0 32px", lineHeight: 1.6 }}>Em breve entraremos em contato com você.</p>
        <button onClick={onBack} style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>
          Voltar ao dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflow: "auto", background: C.bg }}>
      <div style={{ padding: "16px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.bgCard + "88", backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="logo" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 16, fontWeight: 900, color: C.white }}>Brava<span style={{ color: C.purpleLight }}>Form</span></span>
        </div>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
      </div>
      <div style={{ height: 3, background: C.bgCard2 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7C3AED, #A855F7)", transition: "width 0.4s ease" }} />
      </div>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "40px 24px" }}>
        {step === 0 ? (
          <div>
            <h2 style={{ color: C.white, fontSize: 24, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em" }}>Informações de contato</h2>
            <p style={{ color: C.muted, fontSize: 14, margin: "0 0 28px" }}>Preencha para falar com um consultor</p>
            {[["name", "Nome completo", "text"], ["email", "E-mail", "email"], ["phone", "WhatsApp", "tel"], ["company", "Empresa", "text"]].map(([id, label, type]) => (
              <div key={id} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                <input type={type} value={values[id] || ""} onChange={e => setValues(v => ({ ...v, [id]: e.target.value }))}
                  style={{ width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, color: C.white, boxSizing: "border-box", fontFamily: "sans-serif", outline: "none" }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.purpleLight)}
                  onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Pergunta {step} de {questions.length}</div>
            <h2 style={{ color: C.white, fontSize: 22, fontWeight: 800, margin: "0 0 24px", lineHeight: 1.3, letterSpacing: "-0.03em" }}>{questions[step - 1].label}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {questions[step - 1].options.map(opt => (
                <button key={opt} onClick={() => setValues(v => ({ ...v, [questions[step - 1].id]: opt }))}
                  style={{ background: values[questions[step - 1].id] === opt ? C.purple + "33" : C.bgCard, border: `1px solid ${values[questions[step - 1].id] === opt ? C.purpleLight : C.border}`, borderRadius: 12, padding: "14px 16px", color: C.white, fontSize: 15, textAlign: "left", cursor: "pointer", fontFamily: "sans-serif", fontWeight: values[questions[step - 1].id] === opt ? 700 : 400, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s" }}>
                  {opt}
                  {values[questions[step - 1].id] === opt && (
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.purpleLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ background: C.bgCard, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 20px", fontSize: 15, cursor: "pointer", fontFamily: "sans-serif" }}>←</button>
          )}
          <button onClick={() => step < questions.length ? setStep(s => s + 1) : setDone(true)}
            style={{ flex: 1, background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: C.white, border: "none", borderRadius: 14, padding: 15, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif", boxShadow: "0 4px 20px #7C3AED44" }}>
            {step === questions.length ? "Enviar" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #07010F; }
        ::-webkit-scrollbar-thumb { background: #2D1458; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #7C3AED; }
      `}</style>
      <Sidebar screen={screen} setScreen={setScreen} />
      {screen === "dashboard" && <Dashboard setScreen={setScreen} />}
      {screen === "leads" && <LeadsList />}
      {screen === "hot" && <LeadsList filter="hot" />}
      {screen === "reports" && <Reports />}
      {screen === "form" && <PublicForm onBack={() => setScreen("dashboard")} />}
    </div>
  );
}
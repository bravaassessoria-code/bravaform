"use client";
import { useState, useEffect } from "react";

export default function Termos() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content: "Ao acessar e usar o BravaForm, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço."
    },
    {
      title: "2. Descrição do Serviço",
      content: "O BravaForm é uma plataforma SaaS de captura e qualificação de leads com inteligência artificial. Oferecemos ferramentas para criação de formulários, gestão de leads e análise de dados comerciais."
    },
    {
      title: "3. Conta de Usuário",
      content: "Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em notificar imediatamente o BravaForm sobre qualquer uso não autorizado de sua conta. O BravaForm não será responsável por perdas resultantes do uso não autorizado de sua conta."
    },
    {
      title: "4. Uso Aceitável",
      content: "Você concorda em não usar o BravaForm para: (a) violar leis ou regulamentos; (b) transmitir material ilegal, ofensivo ou prejudicial; (c) tentar acessar sistemas não autorizados; (d) coletar dados de usuários sem consentimento; (e) enviar spam ou comunicações não solicitadas."
    },
    {
      title: "5. Dados e Privacidade",
      content: "O BravaForm coleta e processa dados conforme nossa Política de Privacidade. Você é responsável pelos dados que coleta através de nossos formulários e deve garantir conformidade com a LGPD (Lei nº 13.709/2018) e demais legislações aplicáveis."
    },
    {
      title: "6. Pagamentos e Reembolsos",
      content: "Os planos pagos são cobrados mensalmente via Mercado Pago. Cancelamentos podem ser feitos a qualquer momento sem multa. Não oferecemos reembolso proporcional por período não utilizado após a cobrança mensal."
    },
    {
      title: "7. Propriedade Intelectual",
      content: "O BravaForm e todo seu conteúdo, recursos e funcionalidades são propriedade da Brava Assessoria e protegidos por direitos autorais, marcas registradas e outras leis de propriedade intelectual."
    },
    {
      title: "8. Limitação de Responsabilidade",
      content: "O BravaForm não será responsável por danos indiretos, incidentais, especiais ou consequentes resultantes do uso ou impossibilidade de uso do serviço, incluindo perda de dados, lucros cessantes ou interrupção de negócios."
    },
    {
      title: "9. Modificações",
      content: "O BravaForm reserva o direito de modificar estes termos a qualquer momento. Notificaremos usuários sobre mudanças significativas por e-mail. O uso continuado após as modificações constitui aceitação dos novos termos."
    },
    {
      title: "10. Lei Aplicável",
      content: "Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil, na comarca de São Paulo/SP."
    },
  ];

  return (
    <div style={{ background: "#07010F", minHeight: "100vh", fontFamily: "sans-serif", color: "#EDE9FE" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #2D1458", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#07010Fcc", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <img src="/logo.png" alt="logo" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Brava<span style={{ color: "#A855F7" }}>Form</span></span>
        </a>
        <a href="/login" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          Voltar ao login
        </a>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 32px" }}>
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7C3AED22", color: "#C084FC", border: "1px solid #7C3AED44", borderRadius: 24, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            Documento legal
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.04em" }}>
            Termos de Uso
          </h1>
          <p style={{ color: "#9478C0", fontSize: 15, margin: "0 0 48px", lineHeight: 1.7 }}>
            Última atualização: 16 de maio de 2025 · Versão 1.0
          </p>

          <div style={{ background: "#0F0520", border: "1px solid #2D1458", borderRadius: 16, padding: 24, marginBottom: 40 }}>
            <p style={{ color: "#EDE9FE", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              Bem-vindo ao <strong style={{ color: "#A855F7" }}>BravaForm</strong>. Estes Termos de Uso regem o seu acesso e uso da nossa plataforma. Por favor, leia atentamente antes de utilizar nossos serviços.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {sections.map((s, i) => (
              <div key={i} style={{ background: "#0F0520", border: "1px solid #2D1458", borderRadius: 16, padding: 24, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#A855F744")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#2D1458")}>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: "#9478C0", lineHeight: 1.8, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, background: "linear-gradient(135deg, #7C3AED11, #0F0520)", border: "1px solid #7C3AED33", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ color: "#9478C0", fontSize: 14, margin: "0 0 16px" }}>Dúvidas sobre nossos termos?</p>
            <a href="mailto:contato@bravaform.com.br" style={{ color: "#A855F7", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              contato@bravaform.com.br
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
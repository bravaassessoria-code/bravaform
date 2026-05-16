"use client";
import { useState, useEffect } from "react";

export default function Privacidade() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sections = [
    {
      title: "1. Informações que Coletamos",
      content: "Coletamos informações que você nos fornece diretamente: nome, e-mail, telefone, dados da empresa e informações de pagamento. Também coletamos automaticamente dados de uso, endereço IP, tipo de navegador e páginas visitadas."
    },
    {
      title: "2. Como Usamos suas Informações",
      content: "Usamos suas informações para: fornecer e melhorar nossos serviços, processar pagamentos, enviar comunicações relacionadas ao serviço, personalizar sua experiência e cumprir obrigações legais."
    },
    {
      title: "3. Compartilhamento de Dados",
      content: "Não vendemos seus dados pessoais. Compartilhamos apenas com: provedores de serviço essenciais (Supabase, Mercado Pago, Vercel), quando exigido por lei, ou com seu consentimento explícito."
    },
    {
      title: "4. Segurança dos Dados",
      content: "Implementamos medidas de segurança técnicas e organizacionais: criptografia SSL/TLS, autenticação segura, controle de acesso, monitoramento contínuo e backups regulares para proteger seus dados."
    },
    {
      title: "5. Seus Direitos (LGPD)",
      content: "Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a: acessar seus dados, corrigir informações incorretas, solicitar exclusão, portabilidade dos dados e revogar consentimento a qualquer momento."
    },
    {
      title: "6. Cookies",
      content: "Usamos cookies essenciais para funcionamento da plataforma e cookies analíticos para melhorar nossos serviços. Você pode controlar cookies nas configurações do seu navegador."
    },
    {
      title: "7. Retenção de Dados",
      content: "Mantemos seus dados enquanto sua conta estiver ativa. Após cancelamento, excluímos seus dados em até 30 dias, salvo obrigação legal de retenção por prazo maior."
    },
    {
      title: "8. Dados de Leads",
      content: "Os leads capturados através dos seus formulários são de sua responsabilidade. Você, como controlador dos dados, deve garantir conformidade com a LGPD ao coletar e usar dados de terceiros."
    },
    {
      title: "9. Transferência Internacional",
      content: "Seus dados podem ser processados em servidores fora do Brasil (EUA) pelos nossos provedores. Garantimos que essas transferências seguem as adequações de proteção exigidas pela LGPD."
    },
    {
      title: "10. Contato e DPO",
      content: "Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato com nosso responsável pela proteção de dados: contato@bravaform.com.br"
    },
  ];

  return (
    <div style={{ background: "#07010F", minHeight: "100vh", fontFamily: "sans-serif", color: "#EDE9FE" }}>
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22C55E22", color: "#22C55E", border: "1px solid #22C55E33", borderRadius: 24, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            LGPD Compliant
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.04em" }}>
            Política de Privacidade
          </h1>
          <p style={{ color: "#9478C0", fontSize: 15, margin: "0 0 48px", lineHeight: 1.7 }}>
            Última atualização: 16 de maio de 2025 · Versão 1.0
          </p>

          <div style={{ background: "#0F0520", border: "1px solid #22C55E33", borderRadius: 16, padding: 24, marginBottom: 40 }}>
            <p style={{ color: "#EDE9FE", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              O <strong style={{ color: "#A855F7" }}>BravaForm</strong> está comprometido com a proteção dos seus dados pessoais. Esta política explica como coletamos, usamos e protegemos suas informações conforme a <strong style={{ color: "#22C55E" }}>LGPD (Lei nº 13.709/2018)</strong>.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {sections.map((s, i) => (
              <div key={i} style={{ background: "#0F0520", border: "1px solid #2D1458", borderRadius: 16, padding: 24, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#22C55E44")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#2D1458")}>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: "#9478C0", lineHeight: 1.8, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, background: "linear-gradient(135deg, #22C55E11, #0F0520)", border: "1px solid #22C55E33", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ color: "#9478C0", fontSize: 14, margin: "0 0 16px" }}>Quer exercer seus direitos ou tem dúvidas?</p>
            <a href="mailto:contato@bravaform.com.br" style={{ color: "#22C55E", fontWeight: 700, fontSize: 15, textDecoration: "none" }}></a>
"use client";
import { useState, useEffect } from "react";

export default function Privacidade() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sections = [
    { title: "1. Informacoes que Coletamos", content: "Coletamos informacoes que voce nos fornece diretamente: nome, e-mail, telefone, dados da empresa e informacoes de pagamento." },
    { title: "2. Como Usamos suas Informacoes", content: "Usamos suas informacoes para fornecer e melhorar nossos servicos, processar pagamentos e cumprir obrigacoes legais." },
    { title: "3. Compartilhamento de Dados", content: "Nao vendemos seus dados pessoais. Compartilhamos apenas com provedores essenciais como Supabase, Mercado Pago e Vercel." },
    { title: "4. Seguranca dos Dados", content: "Implementamos criptografia SSL/TLS, autenticacao segura, controle de acesso e monitoramento continuo." },
    { title: "5. Seus Direitos (LGPD)", content: "Voce tem direito a acessar, corrigir, excluir e portar seus dados conforme a Lei 13.709/2018." },
    { title: "6. Cookies", content: "Usamos cookies essenciais para funcionamento da plataforma. Voce pode controlar cookies nas configuracoes do navegador." },
    { title: "7. Retencao de Dados", content: "Mantemos seus dados enquanto sua conta estiver ativa. Apos cancelamento, excluimos em ate 30 dias." },
    { title: "8. Contato", content: "Duvidas? Entre em contato: contato@bravaform.com.br" },
  ];

  return (
    <div style={{ background: "#07010F", minHeight: "100vh", fontFamily: "sans-serif", color: "#EDE9FE" }}>
      <nav style={{ borderBottom: "1px solid #2D1458", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#07010Fcc", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <img src="/logo.png" alt="logo" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>Brava<span style={{ color: "#A855F7" }}>Form</span></span>
        </a>
        <a href="/login" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Voltar ao login</a>
      </nav>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 32px" }}>
        <div style={{ opacity: mounted ? 1 : 0, transition: "all 0.6s ease" }}>
          <div style={{ display: "inline-block", background: "#22C55E22", color: "#22C55E", border: "1px solid #22C55E33", borderRadius: 24, padding: "4px 16px", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>LGPD Compliant</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.04em" }}>Politica de Privacidade</h1>
          <p style={{ color: "#9478C0", fontSize: 15, margin: "0 0 48px" }}>Ultima atualizacao: 16 de maio de 2025</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {sections.map((s, i) => (
              <div key={i} style={{ background: "#0F0520", border: "1px solid #2D1458", borderRadius: 16, padding: 24 }}>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: "#9478C0", lineHeight: 1.8, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, background: "#22C55E11", border: "1px solid #22C55E33", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ color: "#9478C0", fontSize: 14, margin: "0 0 8px" }}>Duvidas sobre privacidade?</p>
            <p style={{ color: "#22C55E", fontWeight: 700, fontSize: 15, margin: 0 }}>contato@bravaform.com.br</p>
          </div>
        </div>
      </div>
    </div>
  );
}
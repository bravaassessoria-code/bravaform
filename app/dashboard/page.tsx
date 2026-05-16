"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Dashboard() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = "/login";
      } else {
        window.location.href = "/";
      }
      setChecking(false);
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#07010F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "3px solid #7C3AED", borderTop: "3px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#9478C0", fontSize: 15 }}>Carregando...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
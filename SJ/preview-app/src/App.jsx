import { useState } from "react";
import TarmaqAuditChallenger from "./Tarmaq_Audit_Challenger";
import TarmaqGestionLocative from "./Tarmaq_Gestion_Locative";

const TABS = [
  { id: "audit",    label: "Audit & Challenger",  Component: TarmaqAuditChallenger },
  { id: "gestion",  label: "Gestion Locative",     Component: TarmaqGestionLocative },
];

export default function App() {
  const [active, setActive] = useState("audit");
  const { Component } = TABS.find((t) => t.id === active);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 0, borderBottom: "2px solid #DA2F2C",
        background: "#111", position: "sticky", top: 0, zIndex: 999,
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "12px 28px",
              background: active === tab.id ? "#DA2F2C" : "transparent",
              color: active === tab.id ? "#fff" : "#aaa",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.03em",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "#555", fontSize: 12, padding: "14px 16px" }}>
          TARMAQ — Preview
        </span>
      </div>

      {/* Active component */}
      <Component />
    </div>
  );
}

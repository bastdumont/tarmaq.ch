import { useState, useMemo, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid, AreaChart, Area, ComposedChart,
  ScatterChart, Scatter, Cell, ReferenceLine
} from "recharts";

/* ═══════════════════════════════════════════════════════════════════════
   TARMAQ AUDIT & CHALLENGER — Vérification et Stress-Testing
   Avenue De-Luserna 9, 1203 Genève
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── SOURCE DATA (MIRROR) ──────────────────────────────────────────── */
const PROPERTY = {
  name: "Avenue De-Luserna 9", city: "1203 Genève", ppe: "426‰",
  price: 12500000, year: 1972, floors: 6,
  totalApts: 20, totalParkings: 13,
  etatLocatif: 489756, charges2024: 175477,
  fondsReno: 96899, grossYield: 3.92, netYield: 2.96, cashOnCash: 3.50,
  dscr: 1.37, ltv: 65, hypotheque: 8125000,
  fondsPropresPct: 35, fondsPropres: 4375000, tauxHypo: 1.8,
};

const APARTMENTS = [
  { id:"00013.01",floor:1,type:"3p",m2:65,rent:17400,status:"occupé",marketRent:19200 },
  { id:"00023.01",floor:2,type:"3p",m2:65,rent:12660,status:"occupé",marketRent:19200 },
  { id:"00033.01",floor:3,type:"3p",m2:65,rent:12396,status:"occupé",marketRent:19200 },
  { id:"00043.01",floor:4,type:"3p",m2:65,rent:9840,status:"occupé",marketRent:19200 },
  { id:"00053.01",floor:5,type:"3p",m2:65,rent:12000,status:"occupé",marketRent:19200 },
  { id:"00063.01",floor:6,type:"3p",m2:65,rent:24000,status:"occupé",marketRent:19200 },
  { id:"00056.01",floor:5,type:"3p",m2:65,rent:10020,status:"vacant",marketRent:19200 },
  { id:"00066.01",floor:6,type:"3p",m2:65,rent:12480,status:"vacant",marketRent:19200 },
  { id:"00014.01",floor:1,type:"4p",m2:90,rent:27600,status:"occupé",marketRent:25200 },
  { id:"00024.01",floor:2,type:"4p",m2:90,rent:24960,status:"occupé",marketRent:25200 },
  { id:"00034.01",floor:3,type:"4p",m2:90,rent:15960,status:"occupé",marketRent:25200 },
  { id:"00044.01",floor:4,type:"4p",m2:90,rent:22200,status:"occupé",marketRent:25200 },
  { id:"00054.01",floor:5,type:"4p",m2:90,rent:24000,status:"occupé",marketRent:25200 },
  { id:"00064.01",floor:6,type:"4p",m2:90,rent:27600,status:"occupé",marketRent:25200 },
  { id:"00016.01",floor:1,type:"6p",m2:130,rent:30000,status:"occupé",marketRent:34800 },
  { id:"00026.01",floor:2,type:"6p",m2:130,rent:33000,status:"occupé",marketRent:34800 },
  { id:"00036.01",floor:3,type:"6p",m2:130,rent:24000,status:"occupé",marketRent:34800 },
  { id:"00046.01",floor:4,type:"6p",m2:130,rent:26340,status:"occupé",marketRent:34800 },
  { id:"00015.01",floor:1,type:"6p",m2:130,rent:43020,status:"occupé",marketRent:34800 },
  { id:"00025.01",floor:2,type:"6p",m2:130,rent:30120,status:"occupé",marketRent:34800 },
];

const PARKINGS = [
  { id:"P-501",rent:2400,status:"occupé" },{ id:"P-502",rent:2400,status:"occupé" },
  { id:"P-503",rent:2400,status:"occupé" },{ id:"P-504",rent:2400,status:"vacant" },
  { id:"P-505",rent:2400,status:"occupé" },{ id:"P-506",rent:2400,status:"occupé" },
  { id:"P-507",rent:2400,status:"occupé" },{ id:"P-508",rent:2160,status:"occupé" },
  { id:"P-509",rent:2160,status:"occupé" },{ id:"P-510",rent:2160,status:"occupé" },
  { id:"P-511",rent:2160,status:"vacant" },{ id:"P-512",rent:2520,status:"occupé" },
  { id:"P-513",rent:2160,status:"occupé" },
];

/* ─── FORMATTING ─────────────────────────────────────────────────────── */
const fmt = (v) => new Intl.NumberFormat("fr-CH",{maximumFractionDigits:0}).format(v);
const fmtK = (v) => v>=1e6?`${(v/1e6).toFixed(1)}M`:v>=1000?`${(v/1000).toFixed(0)}K`:fmt(v);
const fmtPct = (v) => `${v.toFixed(1)}%`;

/* ─── COLORS ─────────────────────────────────────────────────────────── */
const RED = "#DA2F2C";
const BLK = "#111111";
const GRY = "#777777";
const BG = "#F9F8F5";
const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const BLUE = "#3B82F6";

/* ═══════════════════════════════════════════════════════════════════════
   1. CROSS-CHECK ENGINE — Vérifie chaque formule
   ═══════════════════════════════════════════════════════════════════════ */
function runCrossChecks() {
  const checks = [];
  const ok = (name, computed, expected, tolerance, source) => {
    const diff = Math.abs(computed - expected);
    const pct = expected !== 0 ? (diff / Math.abs(expected)) * 100 : 0;
    const pass = pct <= tolerance;
    checks.push({ name, computed, expected, diff, pct: Math.round(pct*10)/10, pass, source, tolerance });
  };

  // 1. État locatif = somme loyers apparts + parkings
  const sumApts = APARTMENTS.reduce((s,a) => s+a.rent, 0);
  const sumPark = PARKINGS.reduce((s,p) => s+p.rent, 0);
  const sumTotal = sumApts + sumPark;
  ok("État locatif total", sumTotal, PROPERTY.etatLocatif, 1, "Brochure de vente p.2 + État locatif détaillé");

  // 2. Rendement brut = état locatif / prix
  const rendBrut = (PROPERTY.etatLocatif / PROPERTY.price) * 100;
  ok("Rendement brut", rendBrut, PROPERTY.grossYield, 2, "Brochure de vente p.1: 3,92%");

  // 3. NOI = revenus - charges
  const noi = PROPERTY.etatLocatif - PROPERTY.charges2024;
  const noiExpected = PROPERTY.price * (PROPERTY.netYield / 100);
  ok("NOI (rendement net)", noi, noiExpected, 5, "Calcul: revenus 489'756 - charges 175'477");

  // 4. Fonds propres = prix × 35%
  const fp = PROPERTY.price * (PROPERTY.fondsPropresPct / 100);
  ok("Fonds propres", fp, PROPERTY.fondsPropres, 0.1, "Structure: 35% de 12'500'000");

  // 5. Hypothèque = prix × LTV
  const hypo = PROPERTY.price * (PROPERTY.ltv / 100);
  ok("Hypothèque", hypo, PROPERTY.hypotheque, 0.1, "Structure: 65% de 12'500'000");

  // 6. Intérêts hypothécaires annuels
  const interets = PROPERTY.hypotheque * (PROPERTY.tauxHypo / 100);
  ok("Intérêts annuels", interets, 146250, 0.1, "8'125'000 × 1.8% = 146'250");

  // 7. Cash-on-cash = (NOI - intérêts) / fonds propres
  const cashOnCash = ((noi - interets) / PROPERTY.fondsPropres) * 100;
  ok("Cash-on-cash return", cashOnCash, PROPERTY.cashOnCash, 10, "Brochure: 3.50%");

  // 8. DSCR = NOI / intérêts
  const dscr = noi / interets;
  ok("DSCR", dscr, PROPERTY.dscr, 5, "Brochure: 1.37x");

  // 9. Nombre de logements vacants
  const vacants = APARTMENTS.filter(a => a.status === "vacant").length;
  ok("Logements vacants", vacants, 2, 0, "État locatif: 00056.01 + 00066.01");

  // 10. Parkings vacants
  const parkVac = PARKINGS.filter(p => p.status === "vacant").length;
  ok("Parkings vacants", parkVac, 2, 0, "État locatif: P-504 + P-511");

  // 11. Loyer moyen par type
  const apts3p = APARTMENTS.filter(a => a.type === "3p");
  const avg3p = apts3p.reduce((s,a)=>s+a.rent,0) / apts3p.length;
  ok("Loyer moyen 3p", avg3p, 13850, 5, "Moyenne pondérée 8 appts 3 pièces");

  // 12. Écart total loyer actuel vs marché
  const gapTotal = APARTMENTS.reduce((s,a) => s + (a.marketRent - a.rent), 0);
  ok("Écart loyer-marché total", gapTotal, 119844, 3, "Somme (marketRent - rent) sur 20 appts");

  // 13. Fonds + propres = prix
  ok("FP + Hypo = Prix", PROPERTY.fondsPropres + PROPERTY.hypotheque, PROPERTY.price, 0, "Vérification comptable");

  // 14. Surface totale habitable
  const totalM2 = APARTMENTS.reduce((s,a)=>s+a.m2,0);
  ok("Surface totale habitable", totalM2, 1700, 2, "20 appts × mix 65/90/130 m²");

  // 15. CHF/m² moyen
  const prixM2 = PROPERTY.price / totalM2;
  ok("Prix au m²", prixM2, 7353, 5, "12'500'000 / surface totale");

  return checks;
}

/* ═══════════════════════════════════════════════════════════════════════
   2. SENSITIVITY ANALYSIS — Tornado Chart
   ═══════════════════════════════════════════════════════════════════════ */
function runSensitivity(horizon = 10) {
  const baseParams = {
    turnoverRate: 0.10, indexation: 0.01, hypoRate: 0.018,
    capexY5: 150000, chargesGrowth: 0.015, capRate: 0.04,
  };

  function calcIRR(params) {
    const { turnoverRate, indexation, hypoRate, capexY5, chargesGrowth, capRate } = params;
    let cumulCash = 0;
    let lastNoi = 0;
    for (let y = 0; y <= horizon; y++) {
      const rev = PROPERTY.etatLocatif * Math.pow(1 + indexation + turnoverRate * 0.05, y);
      const ch = PROPERTY.charges2024 * Math.pow(1 + chargesGrowth, y);
      const noi = rev - ch;
      const interest = PROPERTY.hypotheque * hypoRate;
      const capex = y === 5 ? capexY5 : 0;
      const cash = noi - interest - capex;
      cumulCash += cash;
      lastNoi = noi;
    }
    const exitValue = lastNoi / capRate;
    const totalReturn = cumulCash + (exitValue - PROPERTY.price);
    const equity = PROPERTY.fondsPropres + totalReturn;
    const multiple = equity / PROPERTY.fondsPropres;
    return (Math.pow(multiple, 1 / horizon) - 1) * 100;
  }

  const baseIRR = calcIRR(baseParams);
  const variables = [
    { name: "Taux de rotation", key: "turnoverRate", low: 0.05, high: 0.15, unit: "%" },
    { name: "Indexation loyers", key: "indexation", low: 0.00, high: 0.025, unit: "%" },
    { name: "Taux hypothécaire", key: "hypoRate", low: 0.012, high: 0.035, unit: "%" },
    { name: "CAPEX énergie Y5", key: "capexY5", low: 50000, high: 300000, unit: "CHF" },
    { name: "Croiss. charges", key: "chargesGrowth", low: 0.005, high: 0.03, unit: "%" },
    { name: "Cap rate sortie", key: "capRate", low: 0.03, high: 0.055, unit: "%" },
  ];

  return variables.map(v => {
    const lowParams = { ...baseParams, [v.key]: v.low };
    const highParams = { ...baseParams, [v.key]: v.high };
    const irrLow = calcIRR(lowParams);
    const irrHigh = calcIRR(highParams);
    return {
      name: v.name,
      base: Math.round(baseIRR * 10) / 10,
      lowVal: v.unit === "%" ? `${(v.low * 100).toFixed(1)}%` : fmtK(v.low),
      highVal: v.unit === "%" ? `${(v.high * 100).toFixed(1)}%` : fmtK(v.high),
      lowIRR: Math.round(irrLow * 10) / 10,
      highIRR: Math.round(irrHigh * 10) / 10,
      spread: Math.round(Math.abs(irrHigh - irrLow) * 10) / 10,
      downside: Math.round((Math.min(irrLow, irrHigh) - baseIRR) * 10) / 10,
      upside: Math.round((Math.max(irrLow, irrHigh) - baseIRR) * 10) / 10,
    };
  }).sort((a, b) => b.spread - a.spread);
}

/* ═══════════════════════════════════════════════════════════════════════
   3. STRESS TESTS — Scénarios extrêmes
   ═══════════════════════════════════════════════════════════════════════ */
function runStressTests(horizon = 10) {
  const scenarios = [
    { name: "Base Case", turnover: 0.10, indexation: 0.01, hypoRate: 0.018, capex: 150000, chargesGr: 0.015, vacancy: 0 },
    { name: "Récession", turnover: 0.04, indexation: -0.005, hypoRate: 0.025, capex: 200000, chargesGr: 0.02, vacancy: 3 },
    { name: "Taux à 3.5%", turnover: 0.10, indexation: 0.01, hypoRate: 0.035, capex: 150000, chargesGr: 0.015, vacancy: 0 },
    { name: "Zéro rotation", turnover: 0.0, indexation: 0.005, hypoRate: 0.018, capex: 150000, chargesGr: 0.015, vacancy: 0 },
    { name: "Réno majeure", turnover: 0.10, indexation: 0.01, hypoRate: 0.018, capex: 800000, chargesGr: 0.02, vacancy: 4 },
    { name: "Boom immobilier", turnover: 0.15, indexation: 0.025, hypoRate: 0.015, capex: 100000, chargesGr: 0.01, vacancy: 0 },
  ];

  return scenarios.map(sc => {
    const rows = [];
    let cumulCash = 0;
    let minCash = Infinity;
    let minCashYear = 0;

    for (let y = 0; y <= horizon; y++) {
      const growthFactor = sc.indexation + sc.turnover * 0.05;
      const rev = PROPERTY.etatLocatif * Math.pow(1 + growthFactor, y);
      const vacancyLoss = sc.vacancy * 19200;
      const effRev = rev - vacancyLoss;
      const ch = PROPERTY.charges2024 * Math.pow(1 + sc.chargesGr, y);
      const noi = effRev - ch;
      const interest = PROPERTY.hypotheque * sc.hypoRate;
      const capex = y === 5 ? sc.capex : 0;
      const cash = noi - interest - capex;
      cumulCash += cash;
      if (cash < minCash) { minCash = cash; minCashYear = y; }
      rows.push({ year: y, label: `A${y}`, cash: Math.round(cash), cumul: Math.round(cumulCash), noi: Math.round(noi) });
    }

    const lastNoi = rows[rows.length - 1].noi;
    const exitValue = lastNoi / 0.04;
    const totalReturn = cumulCash + (exitValue - PROPERTY.price);
    const equity = PROPERTY.fondsPropres + totalReturn;
    const multiple = equity / PROPERTY.fondsPropres;
    const irr = (Math.pow(Math.max(multiple, 0.01), 1 / horizon) - 1) * 100;
    const dscr0 = rows[0].noi > 0 ? rows[0].noi / (PROPERTY.hypotheque * sc.hypoRate) : 0;

    return {
      name: sc.name,
      irr: Math.round(irr * 10) / 10,
      multiple: Math.round(multiple * 100) / 100,
      cumulCash: Math.round(cumulCash),
      exitValue: Math.round(exitValue),
      dscr: Math.round(dscr0 * 100) / 100,
      minCash: Math.round(minCash),
      minCashYear,
      survives: cumulCash > 0 && irr > -5,
      rows,
    };
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   4. MONTE CARLO — 1000 Simulations Probabilistes
   ═══════════════════════════════════════════════════════════════════════ */
function runMonteCarlo(n = 1000, horizon = 10) {
  // Box-Muller transform for normal distribution
  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function randRange(mean, std) {
    return mean + randn() * std;
  }

  const results = [];
  for (let i = 0; i < n; i++) {
    const turnover = Math.max(0, Math.min(0.25, randRange(0.10, 0.03)));
    const indexation = Math.max(-0.01, Math.min(0.04, randRange(0.01, 0.008)));
    const hypoRate = Math.max(0.008, Math.min(0.05, randRange(0.02, 0.008)));
    const capex = Math.max(0, randRange(150000, 80000));
    const chargesGr = Math.max(0, Math.min(0.05, randRange(0.015, 0.005)));
    const capRate = Math.max(0.025, Math.min(0.06, randRange(0.04, 0.008)));
    const extraVacancy = Math.random() < 0.15 ? Math.floor(Math.random() * 3) + 1 : 0;

    let cumulCash = 0;
    let lastNoi = 0;
    for (let y = 0; y <= horizon; y++) {
      const growthFactor = indexation + turnover * 0.05;
      const rev = PROPERTY.etatLocatif * Math.pow(1 + growthFactor, y);
      const vacLoss = extraVacancy * 19200;
      const ch = PROPERTY.charges2024 * Math.pow(1 + chargesGr, y);
      const noi = rev - vacLoss - ch;
      const interest = PROPERTY.hypotheque * hypoRate;
      const cx = y === 5 ? capex : 0;
      cumulCash += noi - interest - cx;
      lastNoi = noi;
    }

    const exitVal = lastNoi / capRate;
    const totalReturn = cumulCash + (exitVal - PROPERTY.price);
    const equity = PROPERTY.fondsPropres + totalReturn;
    const multiple = equity / PROPERTY.fondsPropres;
    const irr = (Math.pow(Math.max(multiple, 0.01), 1 / horizon) - 1) * 100;

    results.push({
      irr: Math.round(irr * 10) / 10,
      multiple: Math.round(multiple * 100) / 100,
      cumulCash: Math.round(cumulCash),
      exitVal: Math.round(exitVal),
      turnover, indexation, hypoRate, capex, capRate,
    });
  }

  results.sort((a, b) => a.irr - b.irr);

  // Build histogram
  const minIRR = Math.floor(results[0].irr);
  const maxIRR = Math.ceil(results[results.length - 1].irr);
  const bucketSize = 0.5;
  const histogram = [];
  for (let b = minIRR; b <= maxIRR; b += bucketSize) {
    const count = results.filter(r => r.irr >= b && r.irr < b + bucketSize).length;
    histogram.push({ irr: `${b.toFixed(1)}%`, count, pct: Math.round(count / n * 1000) / 10 });
  }

  // Percentiles
  const p = (pct) => results[Math.floor(pct / 100 * n)];
  const mean = results.reduce((s, r) => s + r.irr, 0) / n;
  const negCount = results.filter(r => r.irr < 0).length;

  return {
    histogram,
    percentiles: {
      p5: p(5), p10: p(10), p25: p(25), p50: p(50),
      p75: p(75), p90: p(90), p95: p(95),
    },
    mean: Math.round(mean * 10) / 10,
    median: p(50).irr,
    probNegative: Math.round(negCount / n * 1000) / 10,
    probAbove5: Math.round(results.filter(r => r.irr >= 5).length / n * 1000) / 10,
    probAbove8: Math.round(results.filter(r => r.irr >= 8).length / n * 1000) / 10,
    worstCase: results[0],
    bestCase: results[results.length - 1],
    n,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   5. AUDIT TRAIL — Sources documentaires
   ═══════════════════════════════════════════════════════════════════════ */
const AUDIT_TRAIL = [
  { item: "Prix d'acquisition", value: "CHF 12'500'000", source: "Brochure de vente p.1", confidence: "CERTAIN", note: "Quote-part PPE 426‰" },
  { item: "État locatif annuel", value: "CHF 489'756", source: "État locatif détaillé (PDF)", confidence: "CERTAIN", note: "Somme des 20 appts + 13 parkings" },
  { item: "Charges 2024", value: "CHF 175'477", source: "Comptes de gestion 2024", confidence: "CERTAIN", note: "Ligne total charges PPE" },
  { item: "Charges 2023", value: "CHF 170'954", source: "Comptes de gestion 2023", confidence: "CERTAIN", note: "Tendance +2.6% vs 2022" },
  { item: "Gros travaux 2023", value: "CHF 263'389", source: "Comptes de gestion 2023", confidence: "CERTAIN", note: "Façade + toiture" },
  { item: "Fonds de rénovation", value: "CHF 96'899", source: "Comptes de gestion 2024", confidence: "CERTAIN", note: "Solde au 31.12.2024" },
  { item: "Assurance RC immeuble", value: "CHF 17'388'170", source: "Police Generali #45.703.854", confidence: "CERTAIN", note: "Valeur à neuf bâtiment" },
  { item: "Loyer marché 3p (65m²)", value: "CHF 1'600/mois", source: "Estimation marché Genève", confidence: "HYPOTHÈSE", note: "Basé sur données OCSTAT + annonces" },
  { item: "Loyer marché 4p (90m²)", value: "CHF 2'100/mois", source: "Estimation marché Genève", confidence: "HYPOTHÈSE", note: "Zone Saint-Jean / Petit-Lancy" },
  { item: "Loyer marché 6p (130m²)", value: "CHF 2'900/mois", source: "Estimation marché Genève", confidence: "HYPOTHÈSE", note: "Fourchette haute pour surfaces" },
  { item: "Taux de rotation", value: "8-10% / an", source: "Statistiques OCSTAT Genève", confidence: "HYPOTHÈSE", note: "Moyenne cantonale, à valider local" },
  { item: "Taux hypothécaire", value: "1.8%", source: "Offre indicative bancaire", confidence: "HYPOTHÈSE", note: "SARON + marge, peut fluctuer" },
  { item: "Indexation loyers", value: "1% / an", source: "Hypothèse modèle", confidence: "HYPOTHÈSE", note: "Corrigé inflation, historique 0.5-2%" },
  { item: "Cap rate de sortie", value: "4%", source: "Marché immobilier GE", confidence: "HYPOTHÈSE", note: "3.5-4.5% selon qualité/localisation" },
  { item: "CAPEX énergie Y5", value: "CHF 150'000", source: "Estimation prudente", confidence: "HYPOTHÈSE", note: "Chauffage gaz 1972 → norme 2030" },
];

/* ═══════════════════════════════════════════════════════════════════════
   UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

const StatusBadge = ({ pass }) => (
  <span style={{
    display:"inline-flex",alignItems:"center",gap:4,
    padding:"2px 10px",borderRadius:20,fontSize:12,fontWeight:700,
    fontFamily:"Inter,sans-serif",
    background: pass ? "rgba(34,197,94,0.12)" : "rgba(218,47,44,0.12)",
    color: pass ? GREEN : RED,
  }}>
    {pass ? "✓ OK" : "✗ ÉCART"}
  </span>
);

const ConfBadge = ({ level }) => {
  const col = level === "CERTAIN" ? GREEN : AMBER;
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:3,
      padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,
      fontFamily:"Inter,sans-serif",
      background: level === "CERTAIN" ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)",
      color: col,
    }}>
      {level === "CERTAIN" ? "📎" : "⚠️"} {level}
    </span>
  );
};

const ScoreGauge = ({ score, label }) => {
  const color = score >= 80 ? GREEN : score >= 50 ? AMBER : RED;
  return (
    <div style={{textAlign:"center",padding:"1.5rem"}}>
      <div style={{position:"relative",width:100,height:100,margin:"0 auto"}}>
        <svg viewBox="0 0 36 36" style={{transform:"rotate(-90deg)"}}>
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" stroke="#eee" strokeWidth="3" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${score}, 100`} strokeLinecap="round" />
        </svg>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,color}}>
          {score}
        </div>
      </div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRY,marginTop:8}}>{label}</div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#fff",border:"1px solid #eee",borderRadius:8,padding:"10px 14px",
      boxShadow:"0 4px 12px rgba(0,0,0,0.1)",fontFamily:"Inter,sans-serif",fontSize:12}}>
      <div style={{fontWeight:700,marginBottom:6,color:BLK}}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{display:"flex",justifyContent:"space-between",gap:16,color:p.color||GRY}}>
          <span>{p.name}</span>
          <span style={{fontWeight:600}}>{typeof p.value==="number" ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════ */
export default function TarmaqAuditChallenger() {
  const [tab, setTab] = useState("crosscheck");
  const [mcRuns, setMcRuns] = useState(1000);
  const [horizon, setHorizon] = useState(10);

  const checks = useMemo(() => runCrossChecks(), []);
  const sensitivity = useMemo(() => runSensitivity(horizon), [horizon]);
  const stressTests = useMemo(() => runStressTests(horizon), [horizon]);
  const monteCarlo = useMemo(() => runMonteCarlo(mcRuns, horizon), [mcRuns, horizon]);

  const passRate = Math.round(checks.filter(c=>c.pass).length / checks.length * 100);
  const certCount = AUDIT_TRAIL.filter(a => a.confidence === "CERTAIN").length;
  const hypoCount = AUDIT_TRAIL.filter(a => a.confidence === "HYPOTHÈSE").length;

  const tabs = [
    { id: "crosscheck", label: "Cross-Check", icon: "🔍" },
    { id: "sensitivity", label: "Sensitivity", icon: "🌪️" },
    { id: "stress", label: "Stress Tests", icon: "⚡" },
    { id: "montecarlo", label: "Monte Carlo", icon: "🎲" },
    { id: "audit", label: "Audit Trail", icon: "📋" },
  ];

  return (
    <div style={{fontFamily:"Inter,sans-serif",background:BG,minHeight:"100vh",color:BLK}}>
      {/* HEADER */}
      <header style={{background:BLK,padding:"1.5rem 2rem",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:18,color:"#fff"}}>TARMAQ</span>
            <span style={{color:RED,fontWeight:800,fontFamily:"Montserrat,sans-serif",fontSize:14}}>AUDIT</span>
            <span style={{color:GRY,fontSize:13}}>|</span>
            <span style={{color:"rgba(255,255,255,0.6)",fontSize:13}}>{PROPERTY.name}</span>
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.08)",borderRadius:8,padding:"6px 14px"}}>
              <span style={{color:GRY,fontSize:12}}>Horizon</span>
              {[10,15,20].map(h => (
                <button key={h} onClick={()=>setHorizon(h)}
                  style={{padding:"4px 10px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                    background:horizon===h?RED:"transparent",color:horizon===h?"#fff":"rgba(255,255,255,0.5)"}}>
                  {h}A
                </button>
              ))}
            </div>
            <ScoreGauge score={passRate} label="Fiabilité" />
          </div>
        </div>
      </header>

      {/* NAV TABS */}
      <nav style={{background:"#fff",borderBottom:"1px solid #eee",padding:"0 2rem",position:"sticky",top:80,zIndex:49}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:0}}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{padding:"14px 24px",border:"none",borderBottom:tab===t.id?`3px solid ${RED}`:"3px solid transparent",
                background:"transparent",cursor:"pointer",fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:tab===t.id?700:500,
                color:tab===t.id?BLK:GRY,display:"flex",gap:6,alignItems:"center"}}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{maxWidth:1400,margin:"0 auto",padding:"2rem"}}>

        {/* ═══ CROSS-CHECK ═══ */}
        {tab === "crosscheck" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div>
                <h2 style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,margin:0}}>
                  VÉRIFICATION AUTOMATIQUE
                </h2>
                <p style={{color:GRY,fontSize:13,marginTop:4}}>
                  {checks.length} formules vérifiées — {checks.filter(c=>c.pass).length} OK, {checks.filter(c=>!c.pass).length} écarts
                </p>
              </div>
              <div style={{display:"flex",gap:16}}>
                <div style={{textAlign:"center",padding:"8px 20px",background:"rgba(34,197,94,0.08)",borderRadius:10}}>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:28,color:GREEN}}>
                    {checks.filter(c=>c.pass).length}
                  </div>
                  <div style={{fontSize:11,color:GRY}}>VALIDÉS</div>
                </div>
                <div style={{textAlign:"center",padding:"8px 20px",background:"rgba(218,47,44,0.08)",borderRadius:10}}>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:28,color:RED}}>
                    {checks.filter(c=>!c.pass).length}
                  </div>
                  <div style={{fontSize:11,color:GRY}}>ÉCARTS</div>
                </div>
              </div>
            </div>

            <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{background:"#fafafa",borderBottom:"2px solid #eee"}}>
                    {["Vérification","Calculé","Attendu","Écart","Tolérance","Statut","Source documentaire"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontWeight:700,color:GRY,fontSize:11,
                        textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {checks.map((c,i) => (
                    <tr key={i} style={{borderBottom:"1px solid #f3f3f3",background:c.pass?"transparent":"rgba(218,47,44,0.02)"}}>
                      <td style={{padding:"10px 16px",fontWeight:600}}>{c.name}</td>
                      <td style={{padding:"10px 16px",fontFamily:"monospace"}}>{typeof c.computed==="number"?fmt(Math.round(c.computed*100)/100):c.computed}</td>
                      <td style={{padding:"10px 16px",fontFamily:"monospace"}}>{typeof c.expected==="number"?fmt(Math.round(c.expected*100)/100):c.expected}</td>
                      <td style={{padding:"10px 16px",color:c.pass?GRY:RED,fontWeight:c.pass?400:700}}>{c.pct}%</td>
                      <td style={{padding:"10px 16px",color:GRY}}>±{c.tolerance}%</td>
                      <td style={{padding:"10px 16px"}}><StatusBadge pass={c.pass} /></td>
                      <td style={{padding:"10px 16px",color:GRY,fontSize:11,maxWidth:200}}>{c.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ SENSITIVITY ═══ */}
        {tab === "sensitivity" && (
          <div>
            <h2 style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,marginBottom:4}}>
              ANALYSE DE SENSIBILITÉ
            </h2>
            <p style={{color:GRY,fontSize:13,marginBottom:24}}>
              Impact de chaque variable sur l'IRR à {horizon} ans — Tornado Chart
            </p>

            <div style={{background:"#fff",borderRadius:12,padding:"2rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",marginBottom:24}}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={sensitivity} layout="vertical" margin={{left:130,right:40}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{fontSize:11,fill:GRY}} label={{value:"Impact sur IRR (%)",position:"bottom",fontSize:11,fill:GRY}} />
                  <YAxis dataKey="name" type="category" tick={{fontSize:12,fontWeight:600,fill:BLK}} width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x={sensitivity[0]?.base||0} stroke={BLK} strokeDasharray="3 3" label={{value:`Base ${sensitivity[0]?.base}%`,fontSize:10,fill:GRY}} />
                  <Bar dataKey="downside" name="Downside" stackId="a" fill={RED} radius={[4,0,0,4]} />
                  <Bar dataKey="upside" name="Upside" stackId="a" fill={GREEN} radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{background:"#fafafa",borderBottom:"2px solid #eee"}}>
                    {["Variable","Valeur basse","IRR basse","Valeur haute","IRR haute","Spread","Rang d'impact"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontWeight:700,color:GRY,fontSize:11,
                        textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sensitivity.map((s,i) => (
                    <tr key={i} style={{borderBottom:"1px solid #f3f3f3"}}>
                      <td style={{padding:"10px 16px",fontWeight:600}}>{s.name}</td>
                      <td style={{padding:"10px 16px",color:RED,fontFamily:"monospace"}}>{s.lowVal}</td>
                      <td style={{padding:"10px 16px",fontFamily:"monospace"}}>{s.lowIRR}%</td>
                      <td style={{padding:"10px 16px",color:GREEN,fontFamily:"monospace"}}>{s.highVal}</td>
                      <td style={{padding:"10px 16px",fontFamily:"monospace"}}>{s.highIRR}%</td>
                      <td style={{padding:"10px 16px",fontWeight:700,color:s.spread>3?RED:s.spread>1.5?AMBER:GREEN}}>
                        {s.spread}%
                      </td>
                      <td style={{padding:"10px 16px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{width:60,height:6,background:"#eee",borderRadius:3,overflow:"hidden"}}>
                            <div style={{width:`${Math.min(100,s.spread/sensitivity[0].spread*100)}%`,height:"100%",
                              background:i===0?RED:i===1?AMBER:BLUE,borderRadius:3}} />
                          </div>
                          <span style={{fontSize:11,color:GRY}}>#{i+1}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ STRESS TESTS ═══ */}
        {tab === "stress" && (
          <div>
            <h2 style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,marginBottom:4}}>
              STRESS TESTS
            </h2>
            <p style={{color:GRY,fontSize:13,marginBottom:24}}>
              6 scénarios extrêmes pour tester la résilience de l'investissement à {horizon} ans
            </p>

            {/* Summary cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
              {stressTests.map((st,i) => (
                <div key={i} style={{background:"#fff",borderRadius:12,padding:"1.5rem",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                  borderLeft:`4px solid ${st.survives ? (st.irr > 5 ? GREEN : AMBER) : RED}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:12}}>
                    <div>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:14}}>{st.name}</div>
                      <div style={{fontSize:11,color:GRY,marginTop:2}}>
                        {st.survives ? "✅ Survit" : "❌ Défaut"}
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:24,
                        color:st.irr>5?GREEN:st.irr>0?AMBER:RED}}>{st.irr}%</div>
                      <div style={{fontSize:10,color:GRY}}>IRR</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,fontSize:11}}>
                    <div>
                      <div style={{color:GRY}}>Multiple</div>
                      <div style={{fontWeight:700}}>{st.multiple}x</div>
                    </div>
                    <div>
                      <div style={{color:GRY}}>DSCR</div>
                      <div style={{fontWeight:700,color:st.dscr<1.2?RED:BLK}}>{st.dscr}x</div>
                    </div>
                    <div>
                      <div style={{color:GRY}}>Cash cumulé</div>
                      <div style={{fontWeight:700,color:st.cumulCash<0?RED:BLK}}>{fmtK(st.cumulCash)}</div>
                    </div>
                  </div>
                  <div style={{marginTop:8,fontSize:10,color:st.minCash<0?RED:GRY}}>
                    Pire année: A{st.minCashYear} ({fmtK(st.minCash)} CHF)
                  </div>
                </div>
              ))}
            </div>

            {/* Cash flow comparison chart */}
            <div style={{background:"#fff",borderRadius:12,padding:"2rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <h3 style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:15,marginBottom:16}}>
                Cash-flow cumulé par scénario
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart margin={{top:10,right:30,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{fontSize:11,fill:GRY}} />
                  <YAxis tick={{fontSize:11,fill:GRY}} tickFormatter={v=>fmtK(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{fontSize:11}} />
                  <ReferenceLine y={0} stroke="#ccc" strokeDasharray="3 3" />
                  {stressTests.map((st, i) => {
                    const colors = [BLUE, RED, AMBER, GRY, "#9333EA", GREEN];
                    return <Line key={i} data={st.rows} dataKey="cumul" name={st.name}
                      stroke={colors[i]} strokeWidth={st.name==="Base Case"?3:1.5}
                      dot={false} strokeDasharray={st.name==="Base Case"?"0":"5 5"} />;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ═══ MONTE CARLO ═══ */}
        {tab === "montecarlo" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:24}}>
              <div>
                <h2 style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,margin:0}}>
                  SIMULATION MONTE CARLO
                </h2>
                <p style={{color:GRY,fontSize:13,marginTop:4}}>
                  {monteCarlo.n} simulations aléatoires — distribution probabiliste du rendement
                </p>
              </div>
              <div style={{display:"flex",gap:8}}>
                {[500,1000,2000].map(n => (
                  <button key={n} onClick={()=>setMcRuns(n)}
                    style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                      background:mcRuns===n?RED:"#eee",color:mcRuns===n?"#fff":BLK}}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Key metrics */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:24}}>
              {[
                { label:"IRR Moyen", value:`${monteCarlo.mean}%`, color:monteCarlo.mean>0?GREEN:RED },
                { label:"IRR Médian", value:`${monteCarlo.median}%`, color:monteCarlo.median>0?GREEN:RED },
                { label:"Prob. perte", value:`${monteCarlo.probNegative}%`, color:monteCarlo.probNegative>20?RED:monteCarlo.probNegative>10?AMBER:GREEN },
                { label:"Prob. > 5%", value:`${monteCarlo.probAbove5}%`, color:monteCarlo.probAbove5>50?GREEN:AMBER },
                { label:"Prob. > 8%", value:`${monteCarlo.probAbove8}%`, color:monteCarlo.probAbove8>25?GREEN:GRY },
              ].map((m,i) => (
                <div key={i} style={{background:"#fff",borderRadius:12,padding:"1.5rem",textAlign:"center",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:28,color:m.color}}>{m.value}</div>
                  <div style={{fontSize:11,color:GRY,marginTop:4}}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Histogram */}
            <div style={{background:"#fff",borderRadius:12,padding:"2rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",marginBottom:24}}>
              <h3 style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:15,marginBottom:16}}>
                Distribution des IRR — {monteCarlo.n} simulations
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monteCarlo.histogram} margin={{top:10,right:30,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="irr" tick={{fontSize:9,fill:GRY}} interval={3} />
                  <YAxis tick={{fontSize:11,fill:GRY}} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x={`${monteCarlo.mean.toFixed(1)}%`} stroke={RED} strokeWidth={2} label={{value:"Moyenne",fontSize:10,fill:RED}} />
                  <Bar dataKey="count" name="Simulations" radius={[2,2,0,0]}>
                    {monteCarlo.histogram.map((entry, i) => {
                      const irrVal = parseFloat(entry.irr);
                      return <Cell key={i} fill={irrVal < 0 ? RED : irrVal < 3 ? AMBER : irrVal < 6 ? BLUE : GREEN} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Percentile table */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div style={{background:"#fff",borderRadius:12,padding:"1.5rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                <h3 style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:14,marginBottom:12}}>
                  Percentiles IRR
                </h3>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <tbody>
                    {[
                      { label:"P5 (pire 5%)", p:monteCarlo.percentiles.p5, color:RED },
                      { label:"P10", p:monteCarlo.percentiles.p10, color:RED },
                      { label:"P25 (Q1)", p:monteCarlo.percentiles.p25, color:AMBER },
                      { label:"P50 (Médiane)", p:monteCarlo.percentiles.p50, color:BLK },
                      { label:"P75 (Q3)", p:monteCarlo.percentiles.p75, color:GREEN },
                      { label:"P90", p:monteCarlo.percentiles.p90, color:GREEN },
                      { label:"P95 (top 5%)", p:monteCarlo.percentiles.p95, color:GREEN },
                    ].map((row,i) => (
                      <tr key={i} style={{borderBottom:"1px solid #f3f3f3"}}>
                        <td style={{padding:"8px 0",fontWeight:600}}>{row.label}</td>
                        <td style={{padding:"8px 0",textAlign:"right",fontFamily:"monospace",fontWeight:700,color:row.color}}>
                          {row.p.irr}%
                        </td>
                        <td style={{padding:"8px 0",textAlign:"right",color:GRY,fontSize:11}}>
                          {row.p.multiple}x
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{background:"#fff",borderRadius:12,padding:"1.5rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                <h3 style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:14,marginBottom:12}}>
                  Scénarios extrêmes
                </h3>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:GRY,marginBottom:4}}>🔴 Pire simulation</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,fontSize:12}}>
                    <div>IRR: <strong style={{color:RED}}>{monteCarlo.worstCase.irr}%</strong></div>
                    <div>Multiple: <strong>{monteCarlo.worstCase.multiple}x</strong></div>
                    <div>Taux hypo: <strong>{(monteCarlo.worstCase.hypoRate*100).toFixed(1)}%</strong></div>
                    <div>Cap rate: <strong>{(monteCarlo.worstCase.capRate*100).toFixed(1)}%</strong></div>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:11,color:GRY,marginBottom:4}}>🟢 Meilleure simulation</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,fontSize:12}}>
                    <div>IRR: <strong style={{color:GREEN}}>{monteCarlo.bestCase.irr}%</strong></div>
                    <div>Multiple: <strong>{monteCarlo.bestCase.multiple}x</strong></div>
                    <div>Taux hypo: <strong>{(monteCarlo.bestCase.hypoRate*100).toFixed(1)}%</strong></div>
                    <div>Cap rate: <strong>{(monteCarlo.bestCase.capRate*100).toFixed(1)}%</strong></div>
                  </div>
                </div>

                <div style={{marginTop:20,padding:"12px",background:BG,borderRadius:8}}>
                  <div style={{fontSize:11,fontWeight:700,marginBottom:4}}>🧠 Interprétation</div>
                  <div style={{fontSize:11,color:GRY,lineHeight:1.6}}>
                    {monteCarlo.probNegative < 10
                      ? "Risque de perte très faible. L'investissement est robuste même en cas de conditions adverses."
                      : monteCarlo.probNegative < 25
                      ? "Risque modéré. ~1 simulation sur 5 résulte en perte. Surveiller les taux hypothécaires."
                      : "Risque élevé. Plus de 25% de probabilité de perte. Revoir les hypothèses fondamentales."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ AUDIT TRAIL ═══ */}
        {tab === "audit" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div>
                <h2 style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,margin:0}}>
                  AUDIT TRAIL — TRAÇABILITÉ
                </h2>
                <p style={{color:GRY,fontSize:13,marginTop:4}}>
                  Chaque donnée du modèle est rattachée à sa source documentaire
                </p>
              </div>
              <div style={{display:"flex",gap:16}}>
                <div style={{textAlign:"center",padding:"8px 20px",background:"rgba(34,197,94,0.08)",borderRadius:10}}>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:28,color:GREEN}}>{certCount}</div>
                  <div style={{fontSize:11,color:GRY}}>CERTAINS</div>
                </div>
                <div style={{textAlign:"center",padding:"8px 20px",background:"rgba(245,158,11,0.08)",borderRadius:10}}>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:28,color:AMBER}}>{hypoCount}</div>
                  <div style={{fontSize:11,color:GRY}}>HYPOTHÈSES</div>
                </div>
              </div>
            </div>

            <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{background:"#fafafa",borderBottom:"2px solid #eee"}}>
                    {["Donnée","Valeur","Source","Confiance","Note"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontWeight:700,color:GRY,fontSize:11,
                        textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AUDIT_TRAIL.map((a,i) => (
                    <tr key={i} style={{borderBottom:"1px solid #f3f3f3",
                      background:a.confidence==="HYPOTHÈSE"?"rgba(245,158,11,0.02)":"transparent"}}>
                      <td style={{padding:"10px 16px",fontWeight:600}}>{a.item}</td>
                      <td style={{padding:"10px 16px",fontFamily:"monospace",fontWeight:600}}>{a.value}</td>
                      <td style={{padding:"10px 16px",color:GRY,fontSize:12}}>{a.source}</td>
                      <td style={{padding:"10px 16px"}}><ConfBadge level={a.confidence} /></td>
                      <td style={{padding:"10px 16px",color:GRY,fontSize:11}}>{a.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hypothesis challenge section */}
            <div style={{marginTop:24,background:"#fff",borderRadius:12,padding:"2rem",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <h3 style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:16,marginBottom:16,color:RED}}>
                ⚠️ HYPOTHÈSES À CHALLENGER
              </h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                {[
                  { hyp:"Loyers de marché", risk:"HIGH", detail:"Les loyers marché (3p: 1'600, 4p: 2'100, 6p: 2'900) sont des estimations. Valider avec au moins 3 agences de la zone Saint-Jean.",
                    action:"Commander une expertise OCSTAT ou mandater un gérant pour étude comparative." },
                  { hyp:"Taux de rotation 8-10%", risk:"MED", detail:"Genève a un marché locatif tendu, la rotation peut être plus faible (6%) dans les anciens immeubles avec locataires stables.",
                    action:"Demander l'historique de rotation au gérant actuel sur les 5 dernières années." },
                  { hyp:"CAPEX énergie 150K", risk:"HIGH", detail:"Chauffage gaz de 1972 → la réglementation genevoise (loi énergie) pourrait imposer un remplacement. Le coût réel peut être 200-400K.",
                    action:"Faire réaliser un audit énergétique CECB avant l'acquisition." },
                  { hyp:"Cap rate de sortie 4%", risk:"MED", detail:"Le cap rate de 4% suppose un marché stable. En cas de hausse des taux, il pourrait monter à 4.5-5%, réduisant la valeur de sortie de 10-20%.",
                    action:"Modéliser des scénarios avec cap rate 3.5%, 4%, 4.5%, 5%." },
                  { hyp:"Taux hypothécaire 1.8%", risk:"HIGH", detail:"Le SARON peut fluctuer. Un passage à 2.5-3.5% augmenterait les charges d'intérêt de 40-90%, comprimant le cash-flow.",
                    action:"Obtenir une offre ferme de la banque et considérer un taux fixe 5-10 ans." },
                  { hyp:"État du bâtiment", risk:"MED", detail:"Bâtiment de 1972, travaux façade/toiture réalisés en 2023 (263K). Mais quid de la plomberie, l'électricité, l'ascenseur?",
                    action:"Exiger un rapport technique complet (due diligence technique) avant signature." },
                ].map((h,i) => (
                  <div key={i} style={{background:BG,borderRadius:10,padding:"1.25rem",
                    borderLeft:`4px solid ${h.risk==="HIGH"?RED:AMBER}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{fontWeight:700,fontSize:13}}>{h.hyp}</div>
                      <span style={{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700,
                        background:h.risk==="HIGH"?"rgba(218,47,44,0.12)":"rgba(245,158,11,0.12)",
                        color:h.risk==="HIGH"?RED:AMBER}}>
                        RISQUE {h.risk}
                      </span>
                    </div>
                    <p style={{fontSize:12,color:GRY,lineHeight:1.5,margin:"0 0 8px 0"}}>{h.detail}</p>
                    <div style={{fontSize:11,fontWeight:600,color:BLK}}>
                      📌 {h.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{background:BLK,padding:"2rem",textAlign:"center",marginTop:48}}>
        <span style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:14,color:"#fff"}}>TARMAQ</span>
        <span style={{color:RED,fontWeight:800,fontFamily:"Montserrat,sans-serif",fontSize:12,marginLeft:8}}>AUDIT</span>
        <div style={{color:GRY,fontSize:11,marginTop:8}}>
          Module de vérification et stress-testing — {PROPERTY.name} — {new Date().toLocaleDateString("fr-CH")}
        </div>
      </footer>
    </div>
  );
}

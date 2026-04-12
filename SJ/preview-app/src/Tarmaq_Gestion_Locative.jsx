import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, ScatterChart, Scatter
} from "recharts";

// ─── TARMAQ DESIGN TOKENS ───
const RED = "#DA2F2C", BLK = "#111111", GRY = "#777777", BG = "#F9F8F5";
const GREEN = "#22C55E", AMBER = "#F59E0B", BLUE = "#3B82F6";

// ─── SHARED DATA ───
const PROPERTY = {
  address: "Avenue De-Luserna 9, 1203 Genève",
  ppe: "426‰", price: 12_500_000, notary: 625_000, totalInvest: 13_125_000,
  mortgage: 8_125_000, equity: 5_000_000, mortgageRate: 0.0165,
  charges: 170_000, renovation: 50_000, management: 0.05,
  buildYear: 1965, lastReno: 2018, floors: 7, units: 20, parkings: 13
};

const APARTMENTS = [
  { id: 1, floor: 1, type: "3p", m2: 65, rent: 1350, status: "loué", marketRent: 1750 },
  { id: 2, floor: 1, type: "4p", m2: 90, rent: 1850, status: "loué", marketRent: 2400 },
  { id: 3, floor: 1, type: "2p", m2: 45, rent: 950, status: "vacant", marketRent: 1300 },
  { id: 4, floor: 2, type: "3p", m2: 68, rent: 1400, status: "loué", marketRent: 1800 },
  { id: 5, floor: 2, type: "5p", m2: 110, rent: 2600, status: "loué", marketRent: 3200 },
  { id: 6, floor: 2, type: "3p", m2: 65, rent: 1380, status: "loué", marketRent: 1780 },
  { id: 7, floor: 3, type: "4p", m2: 92, rent: 1900, status: "loué", marketRent: 2450 },
  { id: 8, floor: 3, type: "3p", m2: 67, rent: 1350, status: "vacant", marketRent: 1800 },
  { id: 9, floor: 3, type: "2p", m2: 48, rent: 1050, status: "loué", marketRent: 1350 },
  { id: 10, floor: 4, type: "4p", m2: 90, rent: 1850, status: "loué", marketRent: 2400 },
  { id: 11, floor: 4, type: "3p", m2: 70, rent: 1450, status: "loué", marketRent: 1850 },
  { id: 12, floor: 4, type: "5p", m2: 115, rent: 2700, status: "loué", marketRent: 3300 },
  { id: 13, floor: 5, type: "3p", m2: 65, rent: 1350, status: "loué", marketRent: 1750 },
  { id: 14, floor: 5, type: "4p", m2: 88, rent: 1800, status: "vacant", marketRent: 2350 },
  { id: 15, floor: 5, type: "2p", m2: 46, rent: 980, status: "loué", marketRent: 1300 },
  { id: 16, floor: 6, type: "6p", m2: 130, rent: 3200, status: "loué", marketRent: 3800 },
  { id: 17, floor: 6, type: "3p", m2: 66, rent: 1380, status: "loué", marketRent: 1780 },
  { id: 18, floor: 6, type: "4p", m2: 91, rent: 1900, status: "vacant", marketRent: 2450 },
  { id: 19, floor: 7, type: "5p", m2: 120, rent: 2800, status: "loué", marketRent: 3400 },
  { id: 20, floor: 7, type: "3p", m2: 68, rent: 1420, status: "loué", marketRent: 1820 }
];

const PARKINGS = [
  { id: "P1", rent: 200, status: "loué" }, { id: "P2", rent: 200, status: "loué" },
  { id: "P3", rent: 200, status: "loué" }, { id: "P4", rent: 200, status: "loué" },
  { id: "P5", rent: 200, status: "loué" }, { id: "P6", rent: 200, status: "loué" },
  { id: "P7", rent: 150, status: "loué" }, { id: "P8", rent: 150, status: "loué" },
  { id: "P9", rent: 150, status: "loué" }, { id: "P10", rent: 150, status: "loué" },
  { id: "P11", rent: 150, status: "vacant" }, { id: "P12", rent: 150, status: "loué" },
  { id: "P13", rent: 200, status: "loué" }
];

const CHARGES_HISTORY = [
  { year: 2020, amount: 155000 }, { year: 2021, amount: 160000 },
  { year: 2022, amount: 165000 }, { year: 2023, amount: 170000 }
];

const TYPE_COLORS = { "2p": "#60A5FA", "3p": "#34D399", "4p": "#FBBF24", "5p": "#F87171", "6p": "#A78BFA" };
const TYPE_BG = { "2p": "#EFF6FF", "3p": "#ECFDF5", "4p": "#FFFBEB", "5p": "#FEF2F2", "6p": "#F5F3FF" };
const TYPE_MARKET = { "2p": 28, "3p": 27, "4p": 26, "5p": 27, "6p": 29 };

// ─── SOURCE DOCUMENTS REGISTRY ───
const SOURCE_DOCUMENTS = [
  { id: "D1", title: "Fiche descriptive de l'immeuble", type: "PDF", pages: 4, source: "Régie / Propriétaire", key: "Description complète, état locatif, caractéristiques" },
  { id: "D2", title: "État locatif détaillé 2023", type: "PDF", pages: 2, source: "Régie Zimmermann", key: "Loyers actuels par appartement et parking" },
  { id: "D3", title: "Décompte de charges PPE 2023", type: "PDF", pages: 6, source: "Copropriété", key: "Ventilation charges, fonds de rénovation" },
  { id: "D4", title: "Décompte de charges PPE 2022", type: "PDF", pages: 5, source: "Copropriété", key: "Historique charges N-1" },
  { id: "D5", title: "Décompte de charges PPE 2021", type: "PDF", pages: 5, source: "Copropriété", key: "Historique charges N-2" },
  { id: "D6", title: "Décompte de charges PPE 2020", type: "PDF", pages: 5, source: "Copropriété", key: "Historique charges N-3" },
  { id: "D7", title: "PV Assemblée générale 2023", type: "PDF", pages: 8, source: "Copropriété", key: "Décisions travaux, budget, contentieux" },
  { id: "D8", title: "PV Assemblée générale 2022", type: "PDF", pages: 7, source: "Copropriété", key: "Historique décisions" },
  { id: "D9", title: "Extrait du registre foncier", type: "PDF", pages: 3, source: "RF Genève", key: "Quote-part 426‰, servitudes, hypothèques" },
  { id: "D10", title: "Plans d'architecte", type: "PDF", pages: 12, source: "Archives", key: "Surfaces, distribution, rénovations" },
  { id: "D11", title: "Rapport technique — État du bâtiment", type: "PDF", pages: 15, source: "Expert technique", key: "État toiture, façade, installations" },
  { id: "D12", title: "Certificat CECB", type: "PDF", pages: 2, source: "Canton de Genève", key: "Performance énergétique" },
  { id: "D13", title: "Assurance bâtiment (ECA)", type: "PDF", pages: 3, source: "ECA", key: "Valeur assurée, couverture" },
  { id: "D14", title: "Analyse comparative du marché", type: "PDF", pages: 6, source: "Wüest Partner / CBRE", key: "Loyers marché par type, tendances GE" }
];

// ─── UTILITIES ───
const fmt = v => v.toLocaleString("fr-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 });
const fmtK = v => (v / 1000).toFixed(0) + "k";
const fmtPct = v => (v * 100).toFixed(2) + "%";

// ─── CORE SIMULATION ENGINE ───
function simulateFullModel(apartments, parkings, params) {
  const { turnoverRate, indexation, years } = params;
  const annualRentApts = apartments.reduce((s, a) => s + (a.status === "loué" ? a.rent : 0), 0) * 12;
  const annualRentPark = parkings.reduce((s, p) => s + (p.status === "loué" ? p.rent : 0), 0) * 12;
  const potentialRentApts = apartments.reduce((s, a) => s + a.rent, 0) * 12;
  const potentialRentPark = parkings.reduce((s, p) => s + p.rent, 0) * 12;
  const totalRevenue = annualRentApts + annualRentPark;
  const vacancy = 1 - totalRevenue / (potentialRentApts + potentialRentPark);
  const mortgageCost = PROPERTY.mortgage * PROPERTY.mortgageRate;
  const mgmtCost = totalRevenue * PROPERTY.management;
  const netIncome = totalRevenue - PROPERTY.charges - mortgageCost - mgmtCost - PROPERTY.renovation;
  const grossYield = totalRevenue / PROPERTY.totalInvest;
  const netYield = netIncome / PROPERTY.totalInvest;
  const cashOnCash = netIncome / PROPERTY.equity;
  const dscr = totalRevenue / (mortgageCost + PROPERTY.charges);

  const projections = [];
  let cumCash = 0;
  for (let y = 1; y <= years; y++) {
    const rentGrowth = Math.pow(1 + indexation, y);
    const marketAdj = apartments.reduce((s, a) => {
      const gap = a.marketRent - a.rent;
      return s + gap * (turnoverRate * y > 1 ? 1 : turnoverRate * y);
    }, 0) * 12;
    const projRevApts = annualRentApts * rentGrowth + marketAdj * (rentGrowth * 0.8);
    const projRevPark = annualRentPark * (1 + indexation * 0.5 * y);
    const projRevTotal = projRevApts + projRevPark;
    const projCharges = PROPERTY.charges * Math.pow(1.02, y);
    const projMgmt = projRevTotal * PROPERTY.management;
    const projNet = projRevTotal - projCharges - mortgageCost - projMgmt - PROPERTY.renovation;
    cumCash += projNet;
    const propertyValue = PROPERTY.price * Math.pow(1.01, y);
    const equity = propertyValue * (PROPERTY.ppe / 1000) - PROPERTY.mortgage + cumCash;

    projections.push({
      year: y, label: `A${y}`, revenue: Math.round(projRevTotal),
      charges: Math.round(projCharges), mortgage: Math.round(mortgageCost),
      management: Math.round(projMgmt), net: Math.round(projNet),
      cumCash: Math.round(cumCash), propertyValue: Math.round(propertyValue),
      equity: Math.round(equity), yieldNet: projNet / PROPERTY.totalInvest
    });
  }
  return {
    totalRevenue, annualRentApts, annualRentPark, vacancy,
    mortgageCost, mgmtCost, netIncome, grossYield, netYield,
    cashOnCash, dscr, projections
  };
}

// ─── AUDIT FUNCTIONS ───
function runCrossChecks() {
  const totalLoyer = APARTMENTS.reduce((s, a) => s + a.rent, 0) * 12;
  const totalParking = PARKINGS.reduce((s, p) => s + p.rent, 0) * 12;
  const checks = [
    { id: 1, label: "Prix total = Prix + Notaire", formula: `${fmt(PROPERTY.price)} + ${fmt(PROPERTY.notary)}`, expected: PROPERTY.totalInvest, actual: PROPERTY.price + PROPERTY.notary, docRef: "D1, D9" },
    { id: 2, label: "LTV = Hypothèque / Invest", formula: `${fmt(PROPERTY.mortgage)} / ${fmt(PROPERTY.totalInvest)}`, expected: 0.619, actual: PROPERTY.mortgage / PROPERTY.totalInvest, docRef: "D9" },
    { id: 3, label: "Fonds propres = Invest - Hypo", formula: `${fmt(PROPERTY.totalInvest)} - ${fmt(PROPERTY.mortgage)}`, expected: PROPERTY.equity, actual: PROPERTY.totalInvest - PROPERTY.mortgage, docRef: "D9" },
    { id: 4, label: "État locatif apparts (potentiel)", formula: "Σ loyers × 12", expected: 489756, actual: totalLoyer, docRef: "D2" },
    { id: 5, label: "État locatif parkings", formula: "Σ parkings × 12", expected: 27600, actual: totalParking, docRef: "D2" },
    { id: 6, label: "Charge hypothécaire annuelle", formula: `${fmt(PROPERTY.mortgage)} × ${(PROPERTY.mortgageRate*100).toFixed(2)}%`, expected: 134062, actual: Math.round(PROPERTY.mortgage * PROPERTY.mortgageRate), docRef: "D9" },
    { id: 7, label: "Frais de gérance (5%)", formula: "5% × revenus effectifs", expected: 24488, actual: Math.round((totalLoyer + totalParking) * 0.05), docRef: "D1" },
    { id: 8, label: "Nombre d'appartements", formula: "count(APARTMENTS)", expected: 20, actual: APARTMENTS.length, docRef: "D1, D10" },
    { id: 9, label: "Nombre de parkings", formula: "count(PARKINGS)", expected: 13, actual: PARKINGS.length, docRef: "D2" },
    { id: 10, label: "Vacances actuelles (appts)", formula: "count(vacant)", expected: 4, actual: APARTMENTS.filter(a => a.status === "vacant").length, docRef: "D2" },
    { id: 11, label: "Surface totale", formula: "Σ m²", expected: 1559, actual: APARTMENTS.reduce((s, a) => s + a.m2, 0), docRef: "D10" },
    { id: 12, label: "Loyer moyen /m²/mois", formula: "Σ loyers / Σ m²", expected: 26.19, actual: +(APARTMENTS.reduce((s, a) => s + a.rent, 0) / APARTMENTS.reduce((s, a) => s + a.m2, 0)).toFixed(2), docRef: "D2, D10" },
    { id: 13, label: "Rendement brut", formula: "revenus / invest total", expected: 0.0394, actual: +((totalLoyer + totalParking) / PROPERTY.totalInvest).toFixed(4), docRef: "D1, D2" },
    { id: 14, label: "Quote-part PPE", formula: "426‰", expected: 426, actual: 426, docRef: "D9" },
    { id: 15, label: "Potentiel revalorisation", formula: "Σ (marché - actuel) × 12", expected: 113880, actual: APARTMENTS.reduce((s, a) => s + (a.marketRent - a.rent), 0) * 12, docRef: "D14" }
  ];
  return checks.map(c => {
    const tolerance = typeof c.expected === "number" && c.expected > 100 ? 0.02 : 0.005;
    const diff = c.expected === 0 ? 0 : Math.abs(c.actual - c.expected) / Math.abs(c.expected);
    return { ...c, status: diff <= tolerance ? "OK" : diff <= tolerance * 3 ? "WARN" : "FAIL", diff: (diff * 100).toFixed(1) + "%" };
  });
}

function runSensitivity(horizon) {
  function calcIRR(cashFlows) {
    let r = 0.05;
    for (let i = 0; i < 100; i++) {
      let npv = 0, dnpv = 0;
      cashFlows.forEach((cf, t) => { npv += cf / Math.pow(1 + r, t); dnpv -= t * cf / Math.pow(1 + r, t + 1); });
      if (Math.abs(dnpv) < 1e-10) break;
      r -= npv / dnpv;
    }
    return r;
  }
  const baseRevenue = APARTMENTS.reduce((s, a) => s + a.rent, 0) * 12 + PARKINGS.reduce((s, p) => s + p.rent, 0) * 12;
  const baseCF = [-PROPERTY.equity];
  for (let y = 1; y <= horizon; y++) {
    const rev = baseRevenue * Math.pow(1.01, y);
    const ch = PROPERTY.charges * Math.pow(1.02, y);
    baseCF.push(rev - ch - PROPERTY.mortgage * PROPERTY.mortgageRate - rev * 0.05 - PROPERTY.renovation);
  }
  baseCF[horizon] += PROPERTY.price * Math.pow(1.01, horizon) * 0.426;
  const baseIRR = calcIRR(baseCF);
  const vars = [
    { name: "Indexation loyers", field: "indexation", low: 0.005, high: 0.025, base: 0.01 },
    { name: "Taux rotation", field: "turnover", low: 0.05, high: 0.15, base: 0.08 },
    { name: "Taux hypothécaire", field: "mortgage", low: 0.012, high: 0.035, base: 0.0165 },
    { name: "Charges annuelles", field: "charges", low: 150000, high: 200000, base: 170000 },
    { name: "Appréciation capital", field: "capRate", low: 0.005, high: 0.02, base: 0.01 },
    { name: "Taux de vacance", field: "vacancy", low: 0.02, high: 0.10, base: 0.05 }
  ];
  return vars.map(v => {
    function buildCF(override) {
      const cfs = [-PROPERTY.equity];
      for (let y = 1; y <= horizon; y++) {
        const idx = override.indexation || 0.01;
        const turnover = override.turnover || 0.08;
        const mRate = override.mortgage || PROPERTY.mortgageRate;
        const ch = (override.charges || PROPERTY.charges) * Math.pow(1.02, y);
        const vac = override.vacancy || 0.05;
        const revGrowth = baseRevenue * Math.pow(1 + idx, y);
        const mktAdj = APARTMENTS.reduce((s, a) => s + (a.marketRent - a.rent), 0) * 12 * Math.min(turnover * y, 1);
        const rev = (revGrowth + mktAdj) * (1 - vac);
        cfs.push(rev - ch - PROPERTY.mortgage * mRate - rev * 0.05 - PROPERTY.renovation);
      }
      const capR = override.capRate || 0.01;
      cfs[horizon] += PROPERTY.price * Math.pow(1 + capR, horizon) * 0.426;
      return cfs;
    }
    const lowIRR = calcIRR(buildCF({ [v.field]: v.low }));
    const highIRR = calcIRR(buildCF({ [v.field]: v.high }));
    return { name: v.name, low: lowIRR, high: highIRR, base: baseIRR, range: Math.abs(highIRR - lowIRR) };
  }).sort((a, b) => b.range - a.range);
}

function runStressTests(horizon) {
  const baseRevenue = APARTMENTS.reduce((s, a) => s + a.rent, 0) * 12 + PARKINGS.reduce((s, p) => s + p.rent, 0) * 12;
  const scenarios = [
    { name: "Base", color: BLUE, idx: 0.01, turn: 0.08, mRate: 0.0165, vacAdj: 0, chAdj: 1, capRate: 0.01 },
    { name: "Récession", color: RED, idx: 0.00, turn: 0.03, mRate: 0.02, vacAdj: 0.05, chAdj: 1.05, capRate: 0.005 },
    { name: "Taux 3.5%", color: AMBER, idx: 0.01, turn: 0.08, mRate: 0.035, vacAdj: 0, chAdj: 1, capRate: 0.008 },
    { name: "Zéro rotation", color: GRY, idx: 0.01, turn: 0.00, mRate: 0.0165, vacAdj: 0, chAdj: 1, capRate: 0.01 },
    { name: "Réno majeure", color: "#8B5CF6", idx: 0.01, turn: 0.08, mRate: 0.0165, vacAdj: 0.08, chAdj: 1, capRate: 0.01, renoExtra: 500000 },
    { name: "Boom", color: GREEN, idx: 0.025, turn: 0.15, mRate: 0.015, vacAdj: -0.03, chAdj: 0.98, capRate: 0.02 }
  ];
  return scenarios.map(sc => {
    let cumCash = 0;
    const data = [];
    for (let y = 1; y <= horizon; y++) {
      const revGrowth = baseRevenue * Math.pow(1 + sc.idx, y);
      const mktAdj = APARTMENTS.reduce((s, a) => s + (a.marketRent - a.rent), 0) * 12 * Math.min(sc.turn * y, 1);
      const vac = Math.max(0, 0.05 + sc.vacAdj);
      const rev = (revGrowth + mktAdj) * (1 - vac);
      const ch = PROPERTY.charges * sc.chAdj * Math.pow(1.02, y);
      const reno = PROPERTY.renovation + (sc.renoExtra && y === 3 ? sc.renoExtra : 0);
      const net = rev - ch - PROPERTY.mortgage * sc.mRate - rev * 0.05 - reno;
      cumCash += net;
      data.push({ year: y, cumCash: Math.round(cumCash), net: Math.round(net) });
    }
    const finalVal = PROPERTY.price * Math.pow(1 + sc.capRate, horizon) * 0.426 + cumCash;
    const totalReturn = (finalVal - PROPERTY.equity) / PROPERTY.equity;
    return { ...sc, data, finalVal: Math.round(finalVal), totalReturn };
  });
}

function runMonteCarlo(n, horizon) {
  function boxMuller() { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  const baseRevenue = APARTMENTS.reduce((s, a) => s + a.rent, 0) * 12 + PARKINGS.reduce((s, p) => s + p.rent, 0) * 12;
  const mktPotential = APARTMENTS.reduce((s, a) => s + (a.marketRent - a.rent), 0) * 12;
  const results = [];
  for (let i = 0; i < n; i++) {
    const idx = 0.01 + boxMuller() * 0.008;
    const turn = Math.max(0, 0.08 + boxMuller() * 0.03);
    const mRate = Math.max(0.005, 0.0165 + boxMuller() * 0.008);
    const vac = Math.max(0, Math.min(0.20, 0.05 + boxMuller() * 0.03));
    const capRate = 0.01 + boxMuller() * 0.005;
    const cfs = [-PROPERTY.equity];
    for (let y = 1; y <= horizon; y++) {
      const rev = (baseRevenue * Math.pow(1 + idx, y) + mktPotential * Math.min(turn * y, 1)) * (1 - vac);
      const ch = PROPERTY.charges * Math.pow(1.02, y);
      cfs.push(rev - ch - PROPERTY.mortgage * mRate - rev * 0.05 - PROPERTY.renovation);
    }
    cfs[horizon] += PROPERTY.price * Math.pow(1 + capRate, horizon) * 0.426;
    let r = 0.05;
    for (let j = 0; j < 80; j++) {
      let npv = 0, dnpv = 0;
      cfs.forEach((cf, t) => { npv += cf / Math.pow(1 + r, t); dnpv -= t * cf / Math.pow(1 + r, t + 1); });
      if (Math.abs(dnpv) < 1e-10) break;
      r -= npv / dnpv;
    }
    if (isFinite(r) && r > -0.5 && r < 1) results.push(r);
  }
  results.sort((a, b) => a - b);
  const bins = 30;
  const min = results[0], max = results[results.length - 1];
  const step = (max - min) / bins;
  const histogram = Array.from({ length: bins }, (_, i) => ({
    x: +((min + step * i + step / 2) * 100).toFixed(1),
    count: results.filter(r => r >= min + step * i && r < min + step * (i + 1)).length
  }));
  const pct = p => results[Math.floor(results.length * p)];
  return { histogram, stats: { mean: results.reduce((a, b) => a + b, 0) / results.length, median: pct(0.5), p5: pct(0.05), p25: pct(0.25), p75: pct(0.75), p95: pct(0.95), min: results[0], max: results[results.length - 1], n: results.length } };
}

const AUDIT_TRAIL = [
  { item: "Prix d'achat", value: "CHF 12'500'000", confidence: "CERTAIN", source: "D1 — Fiche descriptive" },
  { item: "Frais de notaire", value: "CHF 625'000 (5%)", confidence: "HYPOTHÈSE", source: "Estimation standard GE" },
  { item: "Hypothèque", value: "CHF 8'125'000", confidence: "HYPOTHÈSE", source: "Calcul 65% LTV" },
  { item: "Taux hypothécaire", value: "1.65%", confidence: "HYPOTHÈSE", source: "Marché actuel (SARON+)" },
  { item: "État locatif total", value: "CHF 489'756/an", confidence: "CERTAIN", source: "D2 — État locatif" },
  { item: "Charges PPE", value: "CHF 170'000/an", confidence: "CERTAIN", source: "D3 — Décompte charges" },
  { item: "Frais de gérance", value: "5%", confidence: "HYPOTHÈSE", source: "Standard marché GE" },
  { item: "Provision rénovation", value: "CHF 50'000/an", confidence: "HYPOTHÈSE", source: "D11 — Rapport technique" },
  { item: "Indexation loyers", value: "+1%/an (base)", confidence: "HYPOTHÈSE", source: "IPC Suisse moyen" },
  { item: "Taux de rotation", value: "8%/an", confidence: "HYPOTHÈSE", source: "Statistiques OCSTAT GE" },
  { item: "Loyers marché", value: "+23% potentiel", confidence: "HYPOTHÈSE", source: "D14 — Analyse comparative" },
  { item: "Vacance structurelle", value: "~5%", confidence: "HYPOTHÈSE", source: "D2 — Observation actuelle" },
  { item: "Appréciation capital", value: "+1%/an", confidence: "HYPOTHÈSE", source: "Tendance marché GE" },
  { item: "Quote-part PPE", value: "426‰", confidence: "CERTAIN", source: "D9 — Registre foncier" },
  { item: "Surface totale", value: "1'559 m²", confidence: "CERTAIN", source: "D10 — Plans architecte" }
];

// ─── COLIVING / COWORKING TRANSFORMATION PRESETS ───
const COLIVING_PRESETS = {
  "2p": { rooms: 1, rentPerRoom: 1100, setupCost: 8000, label: "Studio coliving" },
  "3p": { rooms: 3, rentPerRoom: 950, setupCost: 18000, label: "Colocation 3 ch." },
  "4p": { rooms: 4, rentPerRoom: 900, setupCost: 24000, label: "Colocation 4 ch." },
  "5p": { rooms: 5, rentPerRoom: 900, setupCost: 30000, label: "Colocation 5 ch." },
  "6p": { rooms: 6, rentPerRoom: 950, setupCost: 38000, label: "Grande colocation 6 ch." }
};
const COWORKING_PRESETS = {
  "2p": { desks: 3, rentPerDesk: 400, setupCost: 12000, label: "Micro-bureau" },
  "3p": { desks: 5, rentPerDesk: 380, setupCost: 20000, label: "Petit espace" },
  "4p": { desks: 8, rentPerDesk: 370, setupCost: 32000, label: "Espace standard" },
  "5p": { desks: 10, rentPerDesk: 360, setupCost: 40000, label: "Grand espace" },
  "6p": { desks: 14, rentPerDesk: 350, setupCost: 55000, label: "Hub coworking" }
};

// ─── INITIAL REPORT DATA ───
const REPORT_SUMMARY = {
  date: "Février 2026",
  analyst: "Tarmaq Analytics",
  verdict: "FAVORABLE AVEC RÉSERVES",
  verdictColor: AMBER,
  keyFindings: [
    { label: "Rendement brut", value: "3.94%", assessment: "Acceptable pour GE", color: GREEN },
    { label: "Rendement net", value: "2.96%", assessment: "Correct après charges", color: GREEN },
    { label: "Cash-on-Cash", value: "3.50%", assessment: "Supérieur au SARON", color: GREEN },
    { label: "DSCR", value: "1.37x", assessment: "Solvabilité solide", color: GREEN },
    { label: "Potentiel LDTR", value: "+23%", assessment: "Revalorisation à la rotation", color: BLUE },
    { label: "Vacance", value: "4 appts (20%)", assessment: "Point d'attention", color: AMBER },
    { label: "État technique", value: "Rénovation 2018", assessment: "Bon état général", color: GREEN },
    { label: "Risque taux", value: "Sensibilité modérée", assessment: "Stress test 3.5% viable", color: AMBER }
  ],
  strengths: [
    "Emplacement Servette — excellente desserte TPG et commodités",
    "Immeuble rénové en 2018 — charges prévisibles à moyen terme",
    "Mix locatif diversifié (2p à 6p) — résilience de marché",
    "Potentiel LDTR significatif (+23%) réalisable progressivement",
    "Cash flow positif dès l'année 1 avec hypothèse conservative"
  ],
  risks: [
    "Taux de vacance actuel de 20% (4 appartements) — nécessite relocation rapide",
    "Sensibilité au taux hypothécaire — scénario 3.5% réduit significativement le cash flow",
    "Dépendance à la rotation pour capturer le potentiel marché",
    "Charges PPE élevées (CHF 170k/an) — tendance haussière",
    "Risque réglementaire genevois (LDTR, LGL) sur la stratégie de revalorisation"
  ],
  recommendation: "L'acquisition est recommandée sous réserve de: (1) négociation du prix à CHF 12M max, (2) plan de relocation des 4 vacants sous 6 mois, (3) sécurisation d'un taux fixe 5-7 ans, (4) budget rénovation confirmé par expertise technique."
};

// ─── SVG ICONS ───
const IconBuilding = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 3v15"/><path d="M9 9h1M9 13h1M9 17h1M17 9h1M17 13h1M17 17h1"/></svg>;
const IconChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>;
const IconKey = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const IconTarget = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IconSettings = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconFile = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;

// ─── SHARED UI COMPONENTS ───
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: BLK, padding: "10px 14px", borderRadius: 8, border: `1px solid ${RED}` }}>
      <p style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "#ccc", fontSize: 13 }}>{p.name}: {typeof p.value === "number" ? p.value > 1 ? fmt(p.value) : fmtPct(p.value) : p.value}</p>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, sub, color = RED }) => (
  <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderTop: `3px solid ${color}` }}>
    <div style={{ fontSize: 12, color: GRY, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 800, color: BLK, fontFamily: "Montserrat,sans-serif", marginTop: 4 }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: GRY, marginTop: 4 }}>{sub}</div>}
  </div>
);

const Gauge = ({ value, max, label, color = RED }) => {
  const pct = Math.min(value / max, 1);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100" height="60" viewBox="0 0 100 60">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${pct * 126} 126`} />
        <text x="50" y="45" textAnchor="middle" fontSize="14" fontWeight="800" fill={BLK}>{typeof value === "number" && value < 1 ? fmtPct(value) : value}</text>
      </svg>
      <div style={{ fontSize: 11, color: GRY, marginTop: -4 }}>{label}</div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const colors = { OK: GREEN, WARN: AMBER, FAIL: RED };
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: "#fff", background: colors[status] || GRY }}>{status}</span>;
};

const ConfBadge = ({ level }) => {
  const colors = { CERTAIN: GREEN, HYPOTHÈSE: AMBER };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: colors[level] || GRY, background: level === "CERTAIN" ? "#ECFDF5" : "#FFFBEB", border: `1px solid ${colors[level] || GRY}` }}>
      {level === "CERTAIN" ? "✓" : "~"} {level}
    </span>
  );
};

const ScoreGauge = ({ score, max = 15, label }) => {
  const pct = score / max;
  const color = pct >= 0.9 ? GREEN : pct >= 0.7 ? AMBER : RED;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="90" height="55" viewBox="0 0 100 60">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${pct * 126} 126`} />
        <text x="50" y="42" textAnchor="middle" fontSize="16" fontWeight="800" fill={BLK}>{score}/{max}</text>
      </svg>
      <div style={{ fontSize: 11, color: GRY }}>{label}</div>
    </div>
  );
};

// ─── FLOOR VIEW ───
const FloorView = ({ apartments, selectedApt, setSelectedApt }) => {
  const floors = [7, 6, 5, 4, 3, 2, 1];
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Vue par étage</h3>
      {floors.map(f => {
        const apts = apartments.filter(a => a.floor === f);
        return (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 30, fontSize: 12, fontWeight: 700, color: GRY }}>{f}e</div>
            {apts.map(a => (
              <div key={a.id} onClick={() => setSelectedApt(a.id === selectedApt ? null : a.id)}
                style={{ flex: 1, padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12,
                  background: a.id === selectedApt ? RED : a.status === "vacant" ? "#FEE2E2" : TYPE_BG[a.type],
                  color: a.id === selectedApt ? "#fff" : BLK, border: `1px solid ${a.id === selectedApt ? RED : TYPE_COLORS[a.type]}`,
                  transition: "all 0.2s" }}>
                <div style={{ fontWeight: 700 }}>#{a.id} · {a.type}</div>
                <div>{a.m2}m² · {fmt(a.rent)}</div>
                {a.status === "vacant" && <div style={{ color: a.id === selectedApt ? "#fcc" : RED, fontWeight: 600 }}>Vacant</div>}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// ─── APT DETAIL ───
const AptDetail = ({ apt, params }) => {
  if (!apt) return null;
  const gap = apt.marketRent - apt.rent;
  const gapPct = gap / apt.rent;
  const projData = [];
  for (let y = 0; y <= params.years; y++) {
    const currentRent = y === 0 ? apt.rent : apt.rent * Math.pow(1 + params.indexation, y) + gap * Math.min(params.turnoverRate * y, 1);
    projData.push({ year: `A${y}`, rent: Math.round(currentRent), market: Math.round(apt.marketRent * Math.pow(1.01, y)) });
  }
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `4px solid ${TYPE_COLORS[apt.type]}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 18, fontWeight: 700 }}>Appartement #{apt.id}</h3>
          <span style={{ fontSize: 13, color: GRY }}>{apt.type.toUpperCase()} · {apt.m2}m² · Étage {apt.floor}</span>
        </div>
        <span style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#fff", background: apt.status === "loué" ? GREEN : RED }}>
          {apt.status.toUpperCase()}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <div style={{ textAlign: "center", padding: 12, background: BG, borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: GRY }}>Loyer actuel</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{fmt(apt.rent)}</div>
        </div>
        <div style={{ textAlign: "center", padding: 12, background: BG, borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: GRY }}>Loyer marché</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: GREEN }}>{fmt(apt.marketRent)}</div>
        </div>
        <div style={{ textAlign: "center", padding: 12, background: BG, borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: GRY }}>Potentiel</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: RED }}>+{fmt(gap)} ({(gapPct * 100).toFixed(0)}%)</div>
        </div>
        <div style={{ textAlign: "center", padding: 12, background: BG, borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: GRY }}>CHF/m²</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{(apt.rent / apt.m2).toFixed(1)}</div>
          <div style={{ fontSize: 10, color: GRY }}>marché: {TYPE_MARKET[apt.type]}</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={projData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => fmtK(v)} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="rent" stroke={TYPE_COLORS[apt.type]} fill={TYPE_BG[apt.type]} name="Loyer projeté" />
          <Area type="monotone" dataKey="market" stroke={GREEN} fill="transparent" strokeDasharray="5 5" name="Marché" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════
export default function TarmaqGestionLocative() {
  const [page, setPage] = useState("report");
  const [turnoverRate, setTurnoverRate] = useState(0.08);
  const [indexation, setIndexation] = useState(0.01);
  const [years, setYears] = useState(20);
  const [selectedApt, setSelectedApt] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [auditTab, setAuditTab] = useState("crosscheck");
  const [mcRuns, setMcRuns] = useState(1000);
  const [auditHorizon, setAuditHorizon] = useState(15);
  const [transformations, setTransformations] = useState({});
  const [coviewMode, setCoviewMode] = useState("summary");

  const params = useMemo(() => ({ turnoverRate, indexation, years }), [turnoverRate, indexation, years]);
  const model = useMemo(() => simulateFullModel(APARTMENTS, PARKINGS, params), [params]);

  const crossChecks = useMemo(() => runCrossChecks(), []);
  const sensitivity = useMemo(() => runSensitivity(auditHorizon), [auditHorizon]);
  const stressTests = useMemo(() => runStressTests(auditHorizon), [auditHorizon]);
  const monteCarlo = useMemo(() => runMonteCarlo(mcRuns, auditHorizon), [mcRuns, auditHorizon]);

  const transformedModel = useMemo(() => {
    const entries = Object.entries(transformations);
    if (entries.length === 0) return null;
    let totalSetupCost = 0, newMonthlyRevenue = 0, oldMonthlyRevenue = 0;
    const details = entries.map(([aptId, mode]) => {
      const apt = APARTMENTS.find(a => a.id === parseInt(aptId));
      if (!apt || mode === "none") return null;
      oldMonthlyRevenue += apt.rent;
      if (mode === "coliving") {
        const preset = COLIVING_PRESETS[apt.type];
        const revenue = preset.rooms * preset.rentPerRoom;
        totalSetupCost += preset.setupCost;
        newMonthlyRevenue += revenue;
        return { apt, mode, preset, revenue, gain: revenue - apt.rent };
      } else {
        const preset = COWORKING_PRESETS[apt.type];
        const revenue = preset.desks * preset.rentPerDesk;
        totalSetupCost += preset.setupCost;
        newMonthlyRevenue += revenue;
        return { apt, mode, preset, revenue, gain: revenue - apt.rent };
      }
    }).filter(Boolean);
    const monthlyGain = newMonthlyRevenue - oldMonthlyRevenue;
    const annualGain = monthlyGain * 12;
    const paybackMonths = totalSetupCost > 0 && monthlyGain > 0 ? Math.ceil(totalSetupCost / monthlyGain) : 0;
    return { details, totalSetupCost, newMonthlyRevenue, oldMonthlyRevenue, monthlyGain, annualGain, paybackMonths };
  }, [transformations]);

  const toggleTransform = (aptId, mode) => {
    setTransformations(prev => {
      const next = { ...prev };
      if (next[aptId] === mode) delete next[aptId];
      else next[aptId] = mode;
      return next;
    });
  };

  const NAV = [
    { id: "report", label: "Rapport", icon: <IconFile /> },
    { id: "overview", label: "Dashboard", icon: <IconTarget /> },
    { id: "building", label: "Immeuble", icon: <IconBuilding /> },
    { id: "projections", label: "Projections", icon: <IconChart /> },
    { id: "apartments", label: "Appartements", icon: <IconKey /> },
    { id: "audit", label: "Audit", icon: <IconShield /> },
    { id: "transform", label: "Coliving", icon: <IconHome /> }
  ];

  // ─── REPORT PAGE ───
  const renderReport = () => (
    <div>
      {/* Report Header */}
      <div style={{ background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)", borderRadius: 16, padding: 32, marginBottom: 24, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: GRY, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Rapport d'Analyse Immobilière</div>
            <h1 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 26, fontWeight: 900, marginBottom: 4 }}>
              <span style={{ color: RED }}>De-Luserna 9</span> · 1203 Genève
            </h1>
            <p style={{ color: "#aaa", fontSize: 14 }}>PPE {PROPERTY.ppe} · {PROPERTY.units} appartements · {PROPERTY.parkings} parkings · {PROPERTY.floors} étages</p>
            <p style={{ color: "#666", fontSize: 12, marginTop: 8 }}>{REPORT_SUMMARY.date} · {REPORT_SUMMARY.analyst}</p>
          </div>
          <div style={{ textAlign: "center", padding: "16px 24px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: `2px solid ${REPORT_SUMMARY.verdictColor}` }}>
            <div style={{ fontSize: 10, color: GRY, textTransform: "uppercase", letterSpacing: 1 }}>Verdict</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: REPORT_SUMMARY.verdictColor, marginTop: 4 }}>{REPORT_SUMMARY.verdict}</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        {REPORT_SUMMARY.keyFindings.map((kf, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `3px solid ${kf.color}` }}>
            <div style={{ fontSize: 11, color: GRY, textTransform: "uppercase" }}>{kf.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: BLK, fontFamily: "Montserrat,sans-serif", marginTop: 2 }}>{kf.value}</div>
            <div style={{ fontSize: 11, color: kf.color, fontWeight: 600, marginTop: 2 }}>{kf.assessment}</div>
          </div>
        ))}
      </div>

      {/* Strengths & Risks */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 12, color: GREEN }}>✓ Points forts</h3>
          {REPORT_SUMMARY.strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>+</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 12, color: RED }}>⚠ Risques identifiés</h3>
          {REPORT_SUMMARY.risks.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: RED, fontWeight: 700, flexShrink: 0 }}>!</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `4px solid ${AMBER}` }}>
        <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Recommandation</h3>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: BLK }}>{REPORT_SUMMARY.recommendation}</p>
      </div>

      {/* Source Documents */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Documents sources ({SOURCE_DOCUMENTS.length})</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: BG }}>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Réf.</th>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Document</th>
                <th style={{ padding: "8px 10px", textAlign: "center" }}>Type</th>
                <th style={{ padding: "8px 10px", textAlign: "center" }}>Pages</th>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Source</th>
                <th style={{ padding: "8px 10px", textAlign: "left" }}>Données clés</th>
              </tr>
            </thead>
            <tbody>
              {SOURCE_DOCUMENTS.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 700, color: RED }}>{d.id}</td>
                  <td style={{ padding: "8px 10px", fontWeight: 500 }}>{d.title}</td>
                  <td style={{ padding: "8px 10px", textAlign: "center" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, background: "#EFF6FF", color: BLUE }}>{d.type}</span>
                  </td>
                  <td style={{ padding: "8px 10px", textAlign: "center" }}>{d.pages}</td>
                  <td style={{ padding: "8px 10px", color: GRY }}>{d.source}</td>
                  <td style={{ padding: "8px 10px", color: GRY, fontSize: 11 }}>{d.key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ─── AUDIT PAGE ───
  const renderAudit = () => {
    const TABS = [
      { id: "crosscheck", label: "Cross-Check" }, { id: "sensitivity", label: "Sensibilité" },
      { id: "stress", label: "Stress Tests" }, { id: "montecarlo", label: "Monte Carlo" }, { id: "trail", label: "Audit Trail" }
    ];
    const okCount = crossChecks.filter(c => c.status === "OK").length;
    return (
      <div>
        <div style={{ background: BLK, borderRadius: 12, padding: 24, marginBottom: 24, color: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}><span style={{ color: RED }}>AUDIT</span> CHALLENGER</h2>
              <p style={{ fontSize: 13, color: GRY }}>Vérification indépendante · Stress-testing · Monte Carlo</p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div>
                <label style={{ fontSize: 10, color: GRY }}>Horizon</label>
                <select value={auditHorizon} onChange={e => setAuditHorizon(+e.target.value)}
                  style={{ display: "block", padding: "4px 8px", borderRadius: 6, border: "1px solid #444", background: "#222", color: "#fff", fontSize: 13 }}>
                  <option value={10}>10 ans</option><option value={15}>15 ans</option><option value={20}>20 ans</option>
                </select>
              </div>
              <ScoreGauge score={okCount} max={15} label="Vérifications OK" />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setAuditTab(t.id)}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: auditTab === t.id ? RED : "#fff", color: auditTab === t.id ? "#fff" : BLK,
                boxShadow: auditTab === t.id ? "none" : "0 1px 3px rgba(0,0,0,0.08)" }}>{t.label}</button>
          ))}
        </div>

        {auditTab === "crosscheck" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>15 Vérifications Croisées</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ background: BG }}>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>#</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>Vérification</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>Formule</th>
                  <th style={{ padding: "8px 12px", textAlign: "right" }}>Attendu</th>
                  <th style={{ padding: "8px 12px", textAlign: "right" }}>Calculé</th>
                  <th style={{ padding: "8px 12px", textAlign: "center" }}>Doc</th>
                  <th style={{ padding: "8px 12px", textAlign: "center" }}>Statut</th>
                </tr></thead>
                <tbody>{crossChecks.map(c => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 600 }}>{c.id}</td>
                    <td style={{ padding: "8px 12px" }}>{c.label}</td>
                    <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11, color: GRY }}>{c.formula}</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>
                      {typeof c.expected === "number" && c.expected > 100 ? fmt(c.expected) : typeof c.expected === "number" && c.expected < 1 ? fmtPct(c.expected) : c.expected}
                    </td>
                    <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>
                      {typeof c.actual === "number" && c.actual > 100 ? fmt(c.actual) : typeof c.actual === "number" && c.actual < 1 ? fmtPct(c.actual) : c.actual}
                    </td>
                    <td style={{ padding: "8px 12px", textAlign: "center", fontSize: 11, color: BLUE, fontWeight: 600 }}>{c.docRef}</td>
                    <td style={{ padding: "8px 12px", textAlign: "center" }}><StatusBadge status={c.status} /></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {auditTab === "sensitivity" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Analyse de Sensibilité — Tornado</h3>
            <p style={{ fontSize: 12, color: GRY, marginBottom: 16 }}>Impact sur le TRI à {auditHorizon} ans</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sensitivity} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" tickFormatter={v => (v * 100).toFixed(1) + "%"} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={110} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={sensitivity[0]?.base || 0} stroke={BLK} strokeWidth={2} strokeDasharray="5 5" />
                <Bar dataKey="low" fill={BLUE} name="Scénario bas" />
                <Bar dataKey="high" fill={RED} name="Scénario haut" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {auditTab === "stress" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>6 Scénarios de Stress</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="year" type="number" domain={[1, auditHorizon]} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke={GRY} strokeDasharray="3 3" />
                <Legend />
                {stressTests.map(sc => (
                  <Line key={sc.name} data={sc.data} dataKey="cumCash" name={sc.name} stroke={sc.color} strokeWidth={2} dot={false} type="monotone" />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {stressTests.map(sc => (
                <div key={sc.name} style={{ padding: 14, background: BG, borderRadius: 8, borderLeft: `3px solid ${sc.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{sc.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: sc.totalReturn >= 0 ? GREEN : RED }}>{(sc.totalReturn * 100).toFixed(1)}%</div>
                  <div style={{ fontSize: 11, color: GRY }}>Valeur finale: {fmt(sc.finalVal)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {auditTab === "montecarlo" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Simulation Monte Carlo</h3>
                <p style={{ fontSize: 12, color: GRY }}>{monteCarlo.stats.n} simulations · IRR à {auditHorizon} ans</p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[500, 1000, 2000].map(n => (
                  <button key={n} onClick={() => setMcRuns(n)}
                    style={{ padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                      background: mcRuns === n ? RED : BG, color: mcRuns === n ? "#fff" : BLK }}>{n}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monteCarlo.histogram}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="x" tick={{ fontSize: 10 }} label={{ value: "IRR (%)", position: "insideBottom", offset: -5, fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={+(monteCarlo.stats.median * 100).toFixed(1)} stroke={RED} strokeWidth={2} />
                <Bar dataKey="count" fill={BLUE} name="Fréquence" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
              {[
                { label: "Moyenne", value: fmtPct(monteCarlo.stats.mean) },
                { label: "Médiane", value: fmtPct(monteCarlo.stats.median) },
                { label: "P5", value: fmtPct(monteCarlo.stats.p5) },
                { label: "P25", value: fmtPct(monteCarlo.stats.p25) },
                { label: "P75", value: fmtPct(monteCarlo.stats.p75) },
                { label: "P95", value: fmtPct(monteCarlo.stats.p95) }
              ].map(s => (
                <div key={s.label} style={{ padding: 12, background: BG, borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: GRY, textTransform: "uppercase" }}>{s.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {auditTab === "trail" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Piste d'Audit — Sources & Confiance</h3>
            <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ padding: 16, background: "#ECFDF5", borderRadius: 8, flex: 1, minWidth: 150, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: GREEN }}>{AUDIT_TRAIL.filter(a => a.confidence === "CERTAIN").length}</div>
                <div style={{ fontSize: 12, color: GRY }}>Données certaines</div>
              </div>
              <div style={{ padding: 16, background: "#FFFBEB", borderRadius: 8, flex: 1, minWidth: 150, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: AMBER }}>{AUDIT_TRAIL.filter(a => a.confidence === "HYPOTHÈSE").length}</div>
                <div style={{ fontSize: 12, color: GRY }}>Hypothèses</div>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr style={{ background: BG }}>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Donnée</th>
                <th style={{ padding: "8px 12px", textAlign: "right" }}>Valeur</th>
                <th style={{ padding: "8px 12px", textAlign: "center" }}>Confiance</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Source</th>
              </tr></thead>
              <tbody>{AUDIT_TRAIL.map((a, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 12px", fontWeight: 500 }}>{a.item}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>{a.value}</td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}><ConfBadge level={a.confidence} /></td>
                  <td style={{ padding: "8px 12px", fontSize: 12, color: GRY }}>{a.source}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // ─── COLIVING/COWORKING PAGE ───
  const renderTransform = () => {
    const SUB_TABS = [{ id: "summary", label: "Vue d'ensemble" }, { id: "select", label: "Sélectionner" }, { id: "compare", label: "Comparaison" }];
    return (
      <div>
        <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 12, padding: 24, marginBottom: 24, color: "#fff" }}>
          <h2 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
            <span style={{ color: RED }}>COLIVING</span> & <span style={{ color: BLUE }}>COWORKING</span>
          </h2>
          <p style={{ fontSize: 13, color: "#aaa" }}>Simulez la transformation d'appartements pour maximiser les revenus</p>
          {transformedModel && (
            <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
              <div><div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" }}>Gain mensuel</div><div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>+{fmt(transformedModel.monthlyGain)}</div></div>
              <div><div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" }}>Gain annuel</div><div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>+{fmt(transformedModel.annualGain)}</div></div>
              <div><div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" }}>Setup</div><div style={{ fontSize: 22, fontWeight: 800, color: AMBER }}>{fmt(transformedModel.totalSetupCost)}</div></div>
              <div><div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" }}>Payback</div><div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{transformedModel.paybackMonths} mois</div></div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
          {SUB_TABS.map(t => (
            <button key={t.id} onClick={() => setCoviewMode(t.id)}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: coviewMode === t.id ? RED : "#fff", color: coviewMode === t.id ? "#fff" : BLK }}>{t.label}</button>
          ))}
        </div>

        {coviewMode === "summary" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderTop: `3px solid ${RED}` }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 12, color: RED }}>Coliving</h3>
                <p style={{ fontSize: 13, color: GRY, marginBottom: 16 }}>Colocations meublées, loyer par chambre</p>
                {Object.entries(COLIVING_PRESETS).map(([type, p]) => (
                  <div key={type} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 12 }}>
                    <span style={{ fontWeight: 600 }}>{type.toUpperCase()}</span>
                    <span>{p.rooms} ch. × {fmt(p.rentPerRoom)} = <strong style={{ color: GREEN }}>{fmt(p.rooms * p.rentPerRoom)}/m</strong></span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderTop: `3px solid ${BLUE}` }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 12, color: BLUE }}>Coworking</h3>
                <p style={{ fontSize: 13, color: GRY, marginBottom: 16 }}>Espaces de travail partagés, bureaux flexibles</p>
                {Object.entries(COWORKING_PRESETS).map(([type, p]) => (
                  <div key={type} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0f0f0", fontSize: 12 }}>
                    <span style={{ fontWeight: 600 }}>{type.toUpperCase()}</span>
                    <span>{p.desks} postes × {fmt(p.rentPerDesk)} = <strong style={{ color: GREEN }}>{fmt(p.desks * p.rentPerDesk)}/m</strong></span>
                  </div>
                ))}
              </div>
            </div>
            {!transformedModel && (
              <div style={{ background: "#fff", borderRadius: 12, padding: 32, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Aucune transformation sélectionnée</h3>
                <p style={{ fontSize: 13, color: GRY }}>Allez dans "Sélectionner" pour choisir les appartements.</p>
              </div>
            )}
          </div>
        )}

        {coviewMode === "select" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Sélectionner les transformations</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ background: BG }}>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>#</th><th style={{ padding: "8px 12px", textAlign: "left" }}>Type</th>
                  <th style={{ padding: "8px 12px", textAlign: "right" }}>m²</th><th style={{ padding: "8px 12px", textAlign: "right" }}>Loyer</th>
                  <th style={{ padding: "8px 12px", textAlign: "center" }}>Coliving</th><th style={{ padding: "8px 12px", textAlign: "center" }}>Coworking</th>
                  <th style={{ padding: "8px 12px", textAlign: "right" }}>Nouveau</th><th style={{ padding: "8px 12px", textAlign: "right" }}>Gain</th>
                </tr></thead>
                <tbody>{APARTMENTS.map(apt => {
                  const mode = transformations[apt.id];
                  const colP = COLIVING_PRESETS[apt.type], cowP = COWORKING_PRESETS[apt.type];
                  const newRent = mode === "coliving" ? colP.rooms * colP.rentPerRoom : mode === "coworking" ? cowP.desks * cowP.rentPerDesk : apt.rent;
                  const gain = newRent - apt.rent;
                  return (
                    <tr key={apt.id} style={{ borderBottom: "1px solid #f0f0f0", background: mode ? (mode === "coliving" ? "#FEF2F2" : "#EFF6FF") : "transparent" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 600 }}>#{apt.id}</td>
                      <td style={{ padding: "8px 12px" }}><span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: TYPE_BG[apt.type], color: TYPE_COLORS[apt.type] }}>{apt.type.toUpperCase()}</span></td>
                      <td style={{ padding: "8px 12px", textAlign: "right" }}>{apt.m2}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace" }}>{fmt(apt.rent)}</td>
                      <td style={{ padding: "8px 12px", textAlign: "center" }}>
                        <button onClick={() => toggleTransform(apt.id, "coliving")} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${mode === "coliving" ? RED : "#ddd"}`, background: mode === "coliving" ? RED : "#fff", color: mode === "coliving" ? "#fff" : BLK, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                          {colP.rooms}ch · {fmt(colP.rooms * colP.rentPerRoom)}
                        </button>
                      </td>
                      <td style={{ padding: "8px 12px", textAlign: "center" }}>
                        <button onClick={() => toggleTransform(apt.id, "coworking")} style={{ padding: "4px 12px", borderRadius: 6, border: `2px solid ${mode === "coworking" ? BLUE : "#ddd"}`, background: mode === "coworking" ? BLUE : "#fff", color: mode === "coworking" ? "#fff" : BLK, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                          {cowP.desks}p · {fmt(cowP.desks * cowP.rentPerDesk)}
                        </button>
                      </td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", fontWeight: mode ? 700 : 400, color: mode ? GREEN : BLK }}>{fmt(newRent)}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: gain > 0 ? GREEN : BLK }}>{gain > 0 ? `+${fmt(gain)}` : "—"}</td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
            {Object.keys(transformations).length > 0 && (
              <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setTransformations({})} style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${RED}`, background: "#fff", color: RED, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Réinitialiser</button>
              </div>
            )}
          </div>
        )}

        {coviewMode === "compare" && transformedModel && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 24 }}>
              {transformedModel.details.map((d, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `4px solid ${d.mode === "coliving" ? RED : BLUE}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <div><span style={{ fontWeight: 700, fontSize: 14 }}>Apt #{d.apt.id}</span>
                      <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: d.mode === "coliving" ? "#FEF2F2" : "#EFF6FF", color: d.mode === "coliving" ? RED : BLUE }}>{d.mode.toUpperCase()}</span>
                    </div>
                    <span style={{ fontSize: 11, color: GRY }}>{d.apt.type.toUpperCase()} · {d.apt.m2}m²</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" }}>
                    <div style={{ textAlign: "center", padding: 10, background: BG, borderRadius: 8 }}><div style={{ fontSize: 10, color: GRY }}>Avant</div><div style={{ fontSize: 16, fontWeight: 700 }}>{fmt(d.apt.rent)}</div></div>
                    <div style={{ fontSize: 20, color: GREEN }}>→</div>
                    <div style={{ textAlign: "center", padding: 10, background: "#ECFDF5", borderRadius: 8 }}><div style={{ fontSize: 10, color: GRY }}>Après</div><div style={{ fontSize: 16, fontWeight: 700, color: GREEN }}>{fmt(d.revenue)}</div></div>
                  </div>
                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: GRY }}>Setup: {fmt(d.preset.setupCost || 0)}</span>
                    <span style={{ fontWeight: 700, color: GREEN }}>+{fmt(d.gain)}/mois</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Impact sur les revenus — 10 ans</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={Array.from({ length: 11 }, (_, y) => {
                  const g = Math.pow(1 + indexation, y);
                  return { year: `A${y}`, sans: Math.round(model.totalRevenue * g), avec: Math.round((model.totalRevenue + transformedModel.annualGain) * g) };
                })}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="sans" stroke={GRY} fill="#E5E7EB" name="Sans transformation" />
                  <Area type="monotone" dataKey="avec" stroke={GREEN} fill="#DCFCE7" name="Avec transformation" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 16, padding: 16, background: BG, borderRadius: 8, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, textAlign: "center" }}>
                <div><div style={{ fontSize: 10, color: GRY }}>REVENUS ACTUELS /AN</div><div style={{ fontSize: 18, fontWeight: 700 }}>{fmt(model.totalRevenue)}</div></div>
                <div><div style={{ fontSize: 10, color: GRY }}>REVENUS TRANSFORMÉS /AN</div><div style={{ fontSize: 18, fontWeight: 700, color: GREEN }}>{fmt(model.totalRevenue + transformedModel.annualGain)}</div></div>
                <div><div style={{ fontSize: 10, color: GRY }}>NOUVEAU RDT BRUT</div><div style={{ fontSize: 18, fontWeight: 700, color: RED }}>{fmtPct((model.totalRevenue + transformedModel.annualGain) / PROPERTY.totalInvest)}</div></div>
                <div><div style={{ fontSize: 10, color: GRY }}>ROI TRANSFORMATION</div><div style={{ fontSize: 18, fontWeight: 700, color: GREEN }}>{transformedModel.totalSetupCost > 0 ? (transformedModel.annualGain / transformedModel.totalSetupCost * 100).toFixed(0) : 0}%/an</div></div>
              </div>
            </div>
          </div>
        )}
        {coviewMode === "compare" && !transformedModel && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
            <p style={{ fontSize: 13, color: GRY }}>Sélectionnez des appartements pour voir la comparaison.</p>
          </div>
        )}
      </div>
    );
  };

  // ═══════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "Inter,system-ui,sans-serif", color: BLK }}>
      <nav style={{ background: BLK, padding: "0 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: RED, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>T</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Montserrat,sans-serif" }}>TARMAQ</span>
            <span style={{ color: GRY, fontSize: 12, marginLeft: 4 }}>Immo</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => { setPage(n.id); setMobileMenu(false); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, border: "none",
                  cursor: "pointer", fontSize: 12, fontWeight: 600, background: page === n.id ? RED : "transparent",
                  color: page === n.id ? "#fff" : GRY, transition: "all 0.2s" }}>
                {n.icon} <span>{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {page !== "report" && (
          <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap", alignItems: "center", background: "#fff", padding: "12px 20px", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <IconSettings />
            <div>
              <label style={{ fontSize: 11, color: GRY }}>Rotation</label>
              <select value={turnoverRate} onChange={e => setTurnoverRate(+e.target.value)}
                style={{ display: "block", padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }}>
                {[0.05, 0.08, 0.10, 0.12, 0.15].map(v => <option key={v} value={v}>{(v * 100).toFixed(0)}%</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: GRY }}>Indexation</label>
              <select value={indexation} onChange={e => setIndexation(+e.target.value)}
                style={{ display: "block", padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }}>
                {[0.005, 0.01, 0.015, 0.02, 0.025].map(v => <option key={v} value={v}>{(v * 100).toFixed(1)}%</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: GRY }}>Horizon</label>
              <select value={years} onChange={e => setYears(+e.target.value)}
                style={{ display: "block", padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", fontSize: 13 }}>
                {[5, 10, 15, 20, 25].map(v => <option key={v} value={v}>{v} ans</option>)}
              </select>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontSize: 11, color: GRY }}>Rendement net</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: RED }}>{fmtPct(model.netYield)}</div>
            </div>
          </div>
        )}

        {page === "report" && renderReport()}

        {page === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <StatCard label="Revenus bruts" value={fmt(model.totalRevenue)} sub={`${APARTMENTS.length} appts + ${PARKINGS.length} parkings`} />
              <StatCard label="Cash flow net" value={fmt(model.netIncome)} sub="Après charges et hypothèque" color={GREEN} />
              <StatCard label="Rendement brut" value={fmtPct(model.grossYield)} sub={`Sur ${fmt(PROPERTY.totalInvest)}`} />
              <StatCard label="Cash-on-Cash" value={fmtPct(model.cashOnCash)} sub={`Sur FP de ${fmt(PROPERTY.equity)}`} color={BLUE} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Décomposition des charges</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={[{ name: "Charges PPE", value: PROPERTY.charges }, { name: "Hypothèque", value: Math.round(model.mortgageCost) }, { name: "Gérance", value: Math.round(model.mgmtCost) }, { name: "Rénovation", value: PROPERTY.renovation }, { name: "Cash flow", value: Math.round(model.netIncome) }]}
                      cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {[RED, BLK, AMBER, GRY, GREEN].map((c, i) => <Cell key={i} fill={c} />)}
                    </Pie>
                    <Tooltip formatter={v => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Gauge value={model.grossYield} max={0.08} label="Rdt brut" />
                <Gauge value={model.dscr} max={2.5} label="DSCR" color={model.dscr > 1.2 ? GREEN : RED} />
                <Gauge value={model.vacancy} max={0.15} label="Vacance" color={model.vacancy < 0.05 ? GREEN : AMBER} />
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Cash flow net — {years} ans</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={model.projections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="net" fill={RED} name="Cash flow net" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {page === "building" && (
          <div>
            <FloorView apartments={APARTMENTS} selectedApt={selectedApt} setSelectedApt={setSelectedApt} />
            {selectedApt && <div style={{ marginTop: 16 }}><AptDetail apt={APARTMENTS.find(a => a.id === selectedApt)} params={params} /></div>}
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Répartition par type</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={Object.entries(APARTMENTS.reduce((acc, a) => { acc[a.type] = (acc[a.type] || 0) + 1; return acc; }, {})).map(([type, count]) => ({ name: type.toUpperCase(), value: count }))}
                      cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {Object.keys(TYPE_COLORS).map((t, i) => <Cell key={i} fill={TYPE_COLORS[t]} />)}
                    </Pie><Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Loyer vs Marché</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={Object.keys(TYPE_COLORS).map(t => { const a = APARTMENTS.filter(x => x.type === t); return { type: t.toUpperCase(), actuel: Math.round(a.reduce((s, x) => s + x.rent, 0) / a.length), marche: Math.round(a.reduce((s, x) => s + x.marketRent, 0) / a.length) }; })}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="actuel" fill={BLK} name="Actuel" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="marche" fill={GREEN} name="Marché" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {page === "projections" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <StatCard label={`Cash cumulé (${years}a)`} value={fmt(model.projections[model.projections.length - 1]?.cumCash || 0)} color={GREEN} />
              <StatCard label={`Valeur (${years}a)`} value={fmt(model.projections[model.projections.length - 1]?.propertyValue || 0)} color={BLUE} />
              <StatCard label={`Équité (${years}a)`} value={fmt(model.projections[model.projections.length - 1]?.equity || 0)} color={RED} />
              <StatCard label="Rdt net final" value={fmtPct(model.projections[model.projections.length - 1]?.yieldNet || 0)} />
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Revenus vs Charges</h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={model.projections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} /><Legend />
                  <Area type="monotone" dataKey="revenue" stroke={GREEN} fill="#DCFCE7" name="Revenus" />
                  <Area type="monotone" dataKey="charges" stroke={AMBER} fill="#FEF3C7" name="Charges" />
                  <Area type="monotone" dataKey="mortgage" stroke={RED} fill="#FEE2E2" name="Hypothèque" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Cash cumulé</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={model.projections}><CartesianGrid strokeDasharray="3 3" stroke="#eee" /><XAxis dataKey="label" tick={{ fontSize: 11 }} /><YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} /><Tooltip content={<CustomTooltip />} /><Area type="monotone" dataKey="cumCash" stroke={RED} fill="#FEE2E2" name="Cash cumulé" /></AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Équité</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={model.projections}><CartesianGrid strokeDasharray="3 3" stroke="#eee" /><XAxis dataKey="label" tick={{ fontSize: 11 }} /><YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} /><Tooltip content={<CustomTooltip />} /><Line type="monotone" dataKey="equity" stroke={BLUE} strokeWidth={2} dot={false} name="Équité" /><Line type="monotone" dataKey="propertyValue" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="5 5" name="Valeur" /></LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {page === "apartments" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily: "Montserrat,sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Potentiel de revalorisation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={APARTMENTS.map(a => ({ name: `#${a.id}`, actuel: a.rent, potentiel: a.marketRent - a.rent }))}><CartesianGrid strokeDasharray="3 3" stroke="#eee" /><XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis tickFormatter={v => fmtK(v)} tick={{ fontSize: 11 }} /><Tooltip content={<CustomTooltip />} /><Legend /><Bar dataKey="actuel" stackId="a" fill={BLK} name="Actuel" /><Bar dataKey="potentiel" stackId="a" fill={GREEN} name="Potentiel" radius={[4, 4, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
              {APARTMENTS.map(apt => (
                <div key={apt.id} onClick={() => setSelectedApt(apt.id === selectedApt ? null : apt.id)}
                  style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `4px solid ${TYPE_COLORS[apt.type]}`, cursor: "pointer", outline: selectedApt === apt.id ? `2px solid ${RED}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><span style={{ fontWeight: 700 }}>#{apt.id}</span> <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: TYPE_BG[apt.type] }}>{apt.type.toUpperCase()}</span></div>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, color: "#fff", background: apt.status === "loué" ? GREEN : RED }}>{apt.status}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
                    <span>{apt.m2}m² · Ét. {apt.floor}</span>
                    <span style={{ fontWeight: 700 }}>{fmt(apt.rent)} → <span style={{ color: GREEN }}>{fmt(apt.marketRent)}</span></span>
                  </div>
                  <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: "#E5E7EB" }}><div style={{ height: "100%", borderRadius: 2, background: GREEN, width: `${(apt.rent / apt.marketRent) * 100}%` }} /></div>
                </div>
              ))}
            </div>
            {selectedApt && <div style={{ marginTop: 24 }}><AptDetail apt={APARTMENTS.find(a => a.id === selectedApt)} params={params} /></div>}
          </div>
        )}

        {page === "audit" && renderAudit()}
        {page === "transform" && renderTransform()}
      </main>

      <footer style={{ background: BLK, padding: "20px 24px", marginTop: 40, textAlign: "center" }}>
        <span style={{ color: GRY, fontSize: 12 }}>TARMAQ Immo · {PROPERTY.address} · PPE {PROPERTY.ppe}</span><br />
        <span style={{ color: "#444", fontSize: 11 }}>Simulation financière · Données à valider avec un professionnel</span>
      </footer>
    </div>
  );
}

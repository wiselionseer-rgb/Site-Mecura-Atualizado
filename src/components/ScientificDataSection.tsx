import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BookOpen, Dna, FlaskConical, Activity } from "lucide-react";
import { BRAND } from "../data/mecuraContent";
import {
  CANNABINOID_PROFILES,
  CLINICAL_STUDIES,
  PHARMACOKINETICS_ROUTES,
  PHARMACOKINETICS_TIME_LABELS,
  SCIENTIFIC_RECEPTORS,
} from "../data/clinicalScientificData";

type ScienceTabKey = "sec" | "moleculas" | "estudos" | "farmacocinetica";

const SCIENCE_TABS: Array<{
  key: ScienceTabKey;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    key: "sec",
    label: "Sistema Endocanabinoide",
    shortLabel: "Sistema SEC",
    icon: Dna,
  },
  {
    key: "moleculas",
    label: "Fitocanabinoides & Terpenos",
    shortLabel: "Moléculas",
    icon: FlaskConical,
  },
  {
    key: "estudos",
    label: "Estudos Clínicos & PubMed",
    shortLabel: "Estudos",
    icon: BookOpen,
  },
  {
    key: "farmacocinetica",
    label: "Farmacocinética & Vias",
    shortLabel: "Vias & Curvas",
    icon: Activity,
  },
];

/* --- Precision SVG Pharmacokinetic Curve Visualizer --- */

function PharmacokineticsChart({
  selectedRouteId,
  onSelectRoute,
}: {
  selectedRouteId: string;
  onSelectRoute: (id: string) => void;
}) {
  const width = 680;
  const height = 270;
  const padLeft = 46;
  const padRight = 24;
  const padTop = 22;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (idx: number) =>
    padLeft + (idx / (PHARMACOKINETICS_TIME_LABELS.length - 1)) * plotW;
  const getY = (val: number) => padTop + plotH - (val / 100) * plotH;

  const buildPath = (points: number[]) =>
    points
      .map((val, idx) => {
        const x = getX(idx);
        const y = getY(val);
        if (idx === 0) return `M ${x} ${y}`;
        const prevX = getX(idx - 1);
        const prevY = getY(points[idx - 1]);
        const cx = (prevX + x) / 2;
        return `C ${cx} ${prevY}, ${cx} ${y}, ${x} ${y}`;
      })
      .join(" ");

  const activeRoute =
    PHARMACOKINETICS_ROUTES.find((r) => r.id === selectedRouteId) ??
    PHARMACOKINETICS_ROUTES[0];

  return (
    <div className="space-y-6">
      {/* Route Selector Controls */}
      <div className="flex flex-wrap gap-2">
        {PHARMACOKINETICS_ROUTES.map((route) => {
          const isActive = route.id === activeRoute.id;
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => onSelectRoute(route.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-surface-elevated border-accent text-text-primary"
                  : "bg-background border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
              }`}
            >
              <span
                className="w-2.5 h-0.5 rounded-full shrink-0"
                style={{ backgroundColor: route.strokeColor }}
                aria-hidden="true"
              />
              <span>{route.label}</span>
            </button>
          );
        })}
      </div>

      {/* Responsive Precision SVG Graph */}
      <div className="rounded-2xl bg-background border border-border p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            Perfil Relativo de Concentração Plasmática / Ação Terapêutica (0h – 10h)
          </p>
          <p className="font-mono text-xs text-accent tabular-nums">
            Via selecionada: {activeRoute.label}
          </p>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Gráfico comparativo de farmacocinética das vias sublingual, oral, vaporizada e tópica"
          className="w-full h-auto overflow-visible"
        >
          {/* Horizontal gridlines */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="rgba(235,246,238,0.08)"
                  strokeDasharray={tick === 0 ? undefined : "3 4"}
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-white/40 font-mono text-[10px]"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* X-Axis time labels */}
          {PHARMACOKINETICS_TIME_LABELS.map((label, idx) => (
            <text
              key={label}
              x={getX(idx)}
              y={height - 10}
              textAnchor="middle"
              className="fill-white/50 font-mono text-[10px]"
            >
              {label}
            </text>
          ))}

          {/* Curves for all routes */}
          {PHARMACOKINETICS_ROUTES.map((route) => {
            const isSelected = route.id === activeRoute.id;
            const d = buildPath(route.curve);
            return (
              <g
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                className="cursor-pointer"
              >
                <path
                  d={d}
                  fill="none"
                  stroke={route.strokeColor}
                  strokeWidth={isSelected ? 3 : 1.5}
                  strokeOpacity={isSelected ? 1 : 0.28}
                  strokeDasharray={
                    route.id === "oral" && !isSelected ? "5 4" : undefined
                  }
                />
                {isSelected &&
                  route.curve.map((val, idx) => (
                    <circle
                      key={idx}
                      cx={getX(idx)}
                      cy={getY(val)}
                      r={3.5}
                      fill="#070b08"
                      stroke={route.strokeColor}
                      strokeWidth={2}
                    />
                  ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Route Precision Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            Início de Ação (Onset)
          </p>
          <p className="font-mono text-lg sm:text-xl font-semibold text-accent tabular-nums mt-1">
            {activeRoute.onsetMinutes}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            Pico Plasmático (Tmax)
          </p>
          <p className="font-mono text-lg sm:text-xl font-semibold text-text-primary tabular-nums mt-1">
            {activeRoute.peakHours}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            Duração Média
          </p>
          <p className="font-mono text-lg sm:text-xl font-semibold text-text-primary tabular-nums mt-1">
            {activeRoute.durationHours}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-background border border-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            Biodisponibilidade
          </p>
          <p className="font-mono text-base sm:text-lg font-semibold text-text-primary tabular-nums mt-1">
            {activeRoute.bioavailability}
          </p>
        </div>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">
        <strong className="text-text-primary">Aplicação clínica:</strong>{" "}
        {activeRoute.clinicalUse}
      </p>
    </div>
  );
}

/* --- Main Dedicated Scientific Data Hub Section --- */

export function ScientificDataSection() {
  const [activeTab, setActiveTab] = useState<ScienceTabKey>("sec");
  const [selectedReceptor, setSelectedReceptor] = useState(
    SCIENTIFIC_RECEPTORS[0].code
  );
  const [studyGradeFilter, setStudyGradeFilter] = useState<
    "Todos" | "Grau A" | "Grau B"
  >("Todos");
  const [selectedRouteId, setSelectedRouteId] = useState(
    PHARMACOKINETICS_ROUTES[0].id
  );

  const activeReceptor =
    SCIENTIFIC_RECEPTORS.find((r) => r.code === selectedReceptor) ??
    SCIENTIFIC_RECEPTORS[0];

  const filteredStudies = useMemo(() => {
    if (studyGradeFilter === "Todos") return CLINICAL_STUDIES;
    return CLINICAL_STUDIES.filter((s) => s.evidenceGrade === studyGradeFilter);
  }, [studyGradeFilter]);

  return (
    <section
      id="dados-cientificos"
      className="py-24 lg:py-36 px-6 lg:px-12 bg-surface border-t border-border scroll-mt-20"
    >
      <div className="max-w-[1320px] mx-auto space-y-12">
        {/* Header & Quantitative Reference Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Observatório Científico Mecura · Medicina Baseada em Evidências
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-text-primary">
              Dados científicos sobre o{" "}
              <span className="italic text-accent">Sistema Endocanabinoide</span>.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Explore mecanismos moleculares, receptores celulares, literatura médica revisada por pares (NEJM, JAMA, Nature, OMS e NASEM) e curvas farmacocinéticas que fundamentam as prescrições no aplicativo.
            </p>
          </div>
        </div>

        {/* Precision Quantitative Evidence Strip (Explicit Sources & Units) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-y border-border py-6">
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-accent tabular-nums">
              +10.000
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Resumos revisados no consenso NASEM (EUA, 2017)
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-text-primary tabular-nums">
              79,2%
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Redução de ansiedade no 1º mês (Shannon et al., Permanente J.)
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-text-primary tabular-nums">
              38,9%
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Redução mediana de crises convulsivas (Devinsky et al., NEJM)
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-text-primary tabular-nums">
              6 Vias
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Receptores mapeados (CB1, CB2, 5-HT1A, TRPV1, GPR55, PPARγ)
            </p>
          </div>
        </div>

        {/* Dedicated 4-Tab Scientific Navigation Bar */}
        <div
          role="tablist"
          aria-label="Seções de Dados Científicos"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-background border border-border"
        >
          {SCIENCE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-accent text-accent-ink font-semibold shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Scientific Tab Panel */}
        <AnimatePresence mode="wait">
          {activeTab === "sec" && (
            <motion.div
              key="sec"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Receptor Selector Column */}
              <div className="lg:col-span-5 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted mb-3">
                  Selecione um receptor molecular para inspecionar:
                </p>
                {SCIENTIFIC_RECEPTORS.map((rec) => {
                  const isSelected = rec.code === activeReceptor.code;
                  return (
                    <button
                      key={rec.code}
                      type="button"
                      onClick={() => setSelectedReceptor(rec.code)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? "bg-background border-accent text-text-primary"
                          : "bg-background/45 border-border text-text-secondary hover:border-border-strong"
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="font-mono text-xs text-accent font-semibold">
                          {rec.code}
                        </span>
                        <span className="block text-sm font-medium text-text-primary truncate mt-0.5">
                          {rec.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-text-muted tabular-nums shrink-0">
                        {rec.affinityIndex}%
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Receptor Precision Readout Stage */}
              <div className="lg:col-span-7 rounded-2xl bg-background border border-border-strong p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-border">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      Alvo Molecular · {activeReceptor.code}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary mt-1">
                      {activeReceptor.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      Relevância Terapêutica Mapeada
                    </span>
                    <span className="font-mono text-2xl font-semibold text-accent tabular-nums">
                      {activeReceptor.affinityIndex}%
                    </span>
                  </div>
                </div>

                {/* Calibrated Linear Indicator Bar */}
                <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
                  <motion.div
                    key={activeReceptor.code}
                    initial={{ width: 0 }}
                    animate={{ width: `${activeReceptor.affinityIndex}%` }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      Distribuição Anatômica
                    </p>
                    <p className="text-sm text-text-primary leading-relaxed">
                      {activeReceptor.distribution}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      Ligantes Endógenos &amp; Fitoativos
                    </p>
                    <p className="text-sm text-text-primary leading-relaxed">
                      {activeReceptor.endogenousLigand}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-5 border-t border-border">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted mb-1">
                      Função Fisiológica Primária
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {activeReceptor.primaryRole}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted mb-1">
                      Correlação Clínica Direta
                    </p>
                    <p className="text-sm text-text-primary leading-relaxed">
                      {activeReceptor.clinicalImpact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "moleculas" && (
            <motion.div
              key="moleculas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {CANNABINOID_PROFILES.map((mol) => (
                <article
                  key={mol.symbol}
                  className="rounded-2xl bg-background border border-border p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-border/80">
                      <div>
                        <span className="font-mono text-2xl font-semibold text-accent">
                          {mol.symbol}
                        </span>
                        <h3 className="font-display text-lg text-text-primary">
                          {mol.name}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-text-muted tabular-nums">
                        Evidência {mol.evidenceStrength}%
                      </span>
                    </div>

                    <div className="h-1 w-full rounded-full bg-surface-elevated overflow-hidden">
                      <div
                        style={{ width: `${mol.evidenceStrength}%` }}
                        className="h-full bg-accent/85 rounded-full"
                      />
                    </div>

                    <p className="text-xs font-mono text-text-secondary">
                      {mol.psychoactive}
                    </p>
                    <p className="text-xs text-text-muted font-mono">
                      Alvos: {mol.targets}
                    </p>
                    <p className="text-sm text-text-primary leading-relaxed">
                      {mol.primaryActions}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/70">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted mb-1">
                      Foco Clínico Estudado
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {mol.therapeuticFocus}
                    </p>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {activeTab === "estudos" && (
            <motion.div
              key="estudos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-text-secondary">
                  Publicações científicas de referência utilizadas no embasamento de protocolos médicos e laudos técnicos.
                </p>
                <div className="flex items-center gap-1.5">
                  {(["Todos", "Grau A", "Grau B"] as const).map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setStudyGradeFilter(grade)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        studyGradeFilter === grade
                          ? "bg-accent text-accent-ink font-semibold"
                          : "bg-background border border-border text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStudies.map((study) => (
                  <article
                    key={study.id}
                    className="rounded-2xl bg-background border border-border p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-accent">{study.sourceLabel}</span>
                        <span className="text-text-muted tabular-nums">
                          {study.year} · {study.evidenceGrade}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-medium text-text-primary leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-xs text-text-muted">
                        {study.authors} — {study.journal}
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed pt-2 border-t border-border/70">
                        {study.keyFinding}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/70 text-xs font-mono text-text-muted">
                      <span>Foco: {study.pathology}</span>
                      <span className="text-text-secondary tabular-nums">
                        {study.sampleOrType}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "farmacocinetica" && (
            <motion.div
              key="farmacocinetica"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <PharmacokineticsChart
                selectedRouteId={selectedRouteId}
                onSelectRoute={setSelectedRouteId}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Scientific CTA Strip */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-text-muted max-w-2xl">
            Cada protocolo emitido no aplicativo Mecura considera evidência científica atualizada, interações hepáticas (CYP450) e titulação individualizada.
          </p>
          <a
            href={BRAND.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:text-text-primary transition-colors whitespace-nowrap shrink-0"
          >
            <span>{BRAND.ctaFull}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}

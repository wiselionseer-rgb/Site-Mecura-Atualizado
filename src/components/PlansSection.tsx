import React, { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight, Check, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { BRAND } from "../data/mecuraContent";
import {
  MECURA_PLANS,
  PLAN_COMPARISON_ROWS,
  type MecuraPlan,
} from "../data/clinicalScientificData";
import {
  PLANS_FILM_DURATION,
  PLANS_FILM_FPS,
  PlansLuxuryFilm,
} from "../remotion/PlansLuxuryFilm";

const GOAL_SHORTCUTS: Array<{
  planId: MecuraPlan["id"];
  order: string;
  label: string;
  hint: string;
}> = [
  {
    planId: "basic",
    order: "01",
    label: "Laudo Inicial + Receitas (Nac. & Imp.)",
    hint: "Entrada rápida via chat",
  },
  {
    planId: "psychologist",
    order: "02",
    label: "Avaliação Psicológica & Laudo CRP",
    hint: "Marco Antônio · Saúde Mental",
  },
  {
    planId: "premium",
    order: "03",
    label: "VIP: Inicial + Evolutivo + Agrônomo + 24h",
    hint: "Mais procurado · CRM + CREA",
  },
  {
    planId: "complete",
    order: "04",
    label: "Completo 360° (3 Especialistas + 24h)",
    hint: "Escolha Nº 1 · Dossiê Triplo",
  },
];

const CARD_LUXURY_STYLES: Record<
  MecuraPlan["id"],
  {
    ambientGradient: string;
    activeBorder: string;
    shimmerTint: string;
  }
> = {
  basic: {
    ambientGradient:
      "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(196,255,26,0.16) 0%, rgba(11,22,15,0.88) 62%, rgba(7,11,8,0.98) 100%)",
    activeBorder: "border-accent/65",
    shimmerTint: "from-transparent via-[#c4ff1a]/15 to-transparent",
  },
  psychologist: {
    ambientGradient:
      "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(110,231,183,0.16) 0%, rgba(11,24,20,0.88) 62%, rgba(7,11,8,0.98) 100%)",
    activeBorder: "border-emerald-300/60",
    shimmerTint: "from-transparent via-emerald-300/15 to-transparent",
  },
  premium: {
    ambientGradient:
      "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(228,224,135,0.18) 0%, rgba(22,22,13,0.88) 62%, rgba(7,11,8,0.98) 100%)",
    activeBorder: "border-[#e4e087]/65",
    shimmerTint: "from-transparent via-[#e4e087]/18 to-transparent",
  },
  complete: {
    ambientGradient:
      "radial-gradient(ellipse 95% 85% at 50% 0%, rgba(196,255,26,0.24) 0%, rgba(16,32,19,0.9) 58%, rgba(7,11,8,0.98) 100%)",
    activeBorder: "border-accent",
    shimmerTint: "from-transparent via-[#c4ff1a]/25 to-transparent",
  },
};

export function PlansSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  const [focusedPlanId, setFocusedPlanId] =
    useState<MecuraPlan["id"]>("complete");
  const [userInteracted, setUserInteracted] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isDesktop || !playerRef.current) return;
    if (isInView) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [isDesktop, isInView]);

  // Auto-showcase emphasizes Complete 360° and VIP first while visible (stops on click/hover)
  useEffect(() => {
    if (!isInView || userInteracted) return;
    const order: MecuraPlan["id"][] = [
      "complete",
      "premium",
      "basic",
      "psychologist",
    ];
    const timer = window.setInterval(() => {
      setFocusedPlanId((prev) => {
        const nextIdx = (order.indexOf(prev) + 1) % order.length;
        return order[nextIdx];
      });
    }, 6400);
    return () => window.clearInterval(timer);
  }, [isInView, userInteracted]);

  const selectPlan = (id: MecuraPlan["id"]) => {
    setUserInteracted(true);
    setFocusedPlanId(id);
  };

  const activePlan =
    MECURA_PLANS.find((p) => p.id === focusedPlanId) ?? MECURA_PLANS[3];

  return (
    <section
      id="planos"
      ref={sectionRef}
      className="relative py-24 lg:py-36 px-6 lg:px-12 bg-surface border-t border-border overflow-hidden scroll-mt-20"
    >
      {/* Subtle Ambient Architectural Emerald Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[960px] h-[420px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,255,26,0.16) 0%, rgba(16,42,26,0.08) 55%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto space-y-12 lg:space-y-14">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-4">
              Modalidades &amp; Jornadas Oficiais do App
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.04] tracking-tight text-text-primary">
              Experiências clínicas desenhadas para{" "}
              <span className="italic text-accent">cada momento</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-3">
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Do primeiro atendimento imediato via chat à jornada completa 360° com médico, psicólogo e dossiê documental para Salvo-Conduto — explore cada modalidade e consulte as condições atualizadas diretamente no aplicativo Mecura.
            </p>
            <p className="font-mono text-xs text-text-muted">
              CFM · CFP · CREA · Assinatura Digital ICP-Brasil
            </p>
          </div>
        </div>

        {/* Synchronized Luxury Remotion Stage (Desktop/Tablet) + Mobile Animated Mirror */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-white/12 bg-[#060a07] shadow-[0_32px_90px_rgba(0,0,0,0.65)]"
        >
          {/* Desktop & Tablet Live Remotion Player (Never mounted on mobile so iOS stays 60fps) */}
          {isDesktop && (
            <div className="aspect-[1280/500] w-full">
              <Player
                ref={playerRef}
                component={PlansLuxuryFilm}
                inputProps={{ activePlanId: focusedPlanId }}
                durationInFrames={PLANS_FILM_DURATION}
                compositionWidth={1280}
                compositionHeight={500}
                fps={PLANS_FILM_FPS}
                autoPlay={isInView}
                loop
                controls={false}
                acknowledgeRemotionLicense
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}

          {/* Mobile Responsive Luxury Stage Mirror (Crystal-sharp legibility on narrow screens) */}
          <div className="md:hidden relative p-6 min-h-[300px] flex flex-col justify-between overflow-hidden">
            <img
              src={activePlan.coverImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(6,10,7,0.92) 0%, rgba(12,24,16,0.85) 55%, rgba(6,10,7,0.98) 100%)",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 space-y-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Modalidade {activePlan.order} · {activePlan.tierLabel}
                </p>
                <h3 className="font-display text-3xl font-medium text-text-primary leading-tight">
                  {activePlan.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {activePlan.tagline}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {activePlan.professionals.map((prof) => (
                    <div
                      key={prof.credential}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-background/85 border border-accent/30"
                    >
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-8 h-8 rounded-lg object-cover object-top"
                      />
                      <div className="text-xs leading-tight">
                        <span className="block font-medium text-text-primary">
                          {prof.name}
                        </span>
                        <span className="font-mono text-[10px] text-accent">
                          {prof.credential}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Interactive Goal Selector Rail */}
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
            Escolha o seu objetivo para sincronizar a apresentação:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {GOAL_SHORTCUTS.map((goal) => {
              const isSelected = focusedPlanId === goal.planId;
              return (
                <button
                  key={goal.planId}
                  type="button"
                  onClick={() => selectPlan(goal.planId)}
                  className={`relative text-left px-4 py-3.5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? "bg-background border-accent text-text-primary shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                      : "bg-background/55 border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="plan-goal-indicator"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="absolute top-0 inset-x-0 h-[2px] bg-accent"
                    />
                  )}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] text-accent tabular-nums">
                      {goal.order}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted truncate">
                      {goal.hint}
                    </span>
                  </div>
                  <span className="block text-sm font-medium leading-snug">
                    {goal.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Luxury Editorial Cards (Zero Prices — Pure Experience, Portraits & Motion) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {MECURA_PLANS.map((plan, idx) => {
            const isActive = focusedPlanId === plan.id;
            const styleTokens = CARD_LUXURY_STYLES[plan.id];

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                onMouseEnter={() => selectPlan(plan.id)}
                onClick={() => selectPlan(plan.id)}
                className={`group relative flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                  plan.recommended
                    ? "border-accent shadow-[0_32px_80px_rgba(0,0,0,0.75),0_0_0_1px_rgba(196,255,26,0.28)]"
                    : isActive
                      ? `${styleTokens.activeBorder} shadow-[0_28px_70px_rgba(0,0,0,0.68),0_0_0_1px_rgba(196,255,26,0.16)]`
                      : "border-white/10 hover:border-white/25 shadow-[0_14px_38px_rgba(0,0,0,0.4)]"
                }`}
                style={{ background: styleTokens.ambientGradient }}
              >
                {/* Animated Metallic Luxury Light Sweep on Active Card */}
                {isActive && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ x: "-120%" }}
                    animate={{ x: "220%" }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      repeatDelay: 3.4,
                      ease: "easeInOut",
                    }}
                    className={`pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r ${styleTokens.shimmerTint} z-20`}
                  />
                )}

                {/* Luxury Photographic Top Canopy with Framed Specialist Portrait(s) */}
                <div className="relative h-36 w-full overflow-hidden shrink-0 border-b border-white/10">
                  <motion.img
                    animate={{ scale: isActive ? 1.08 : 1.01 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    src={plan.coverImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full h-full object-cover object-center opacity-45"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,11,8,0.28) 0%, rgba(7,11,8,0.88) 100%)",
                    }}
                  />

                  {/* Top Row: Editorial Number + Tier Label */}
                  <div className="absolute top-4 inset-x-5 flex items-center justify-between gap-2 z-10">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent font-semibold">
                      {plan.order} · {plan.tierLabel}
                    </span>
                    {plan.recommended && (
                      <Sparkles className="w-4 h-4 text-accent shrink-0" />
                    )}
                  </div>

                  {/* Bottom Canopy Row: Crisp Framed Specialist Portraits */}
                  <div className="absolute bottom-3.5 inset-x-5 flex items-center justify-between gap-3 z-10">
                    <div className="flex items-center -space-x-2.5">
                      {plan.professionals.map((prof) => (
                        <div
                          key={prof.credential}
                          className="w-11 h-11 rounded-xl overflow-hidden border border-accent/60 bg-background shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                        >
                          <img
                            src={prof.avatar}
                            alt={prof.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-primary/85 text-right leading-snug">
                      {plan.highlightKicker}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative z-10 p-6 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-medium text-text-primary leading-tight mb-2 group-hover:text-accent transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 min-h-[3.5rem]">
                    {plan.tagline}
                  </p>
                  {(plan.id === "premium" || plan.id === "complete") && (
                    <p
                      className={`font-mono text-[11px] leading-snug mb-4 px-3 py-2 rounded-lg border ${
                        plan.id === "complete"
                          ? "bg-accent/12 border-accent/35 text-accent"
                          : "bg-[#e4e087]/10 border-[#e4e087]/30 text-[#e4e087]"
                      }`}
                    >
                      {plan.idealFor}
                    </p>
                  )}

                  {/* Assigned Registered Professionals */}
                  <div className="space-y-2 mb-5 pb-5 border-y border-white/10 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      Assinado &amp; Conduzido por
                    </p>
                    {plan.professionals.map((prof) => (
                      <div key={prof.credential} className="text-xs leading-snug">
                        <span className="text-text-primary font-semibold block">
                          {prof.name}
                        </span>
                        <span className="font-mono text-[11px] text-accent">
                          {prof.credential}
                        </span>
                        <span className="text-text-muted"> · {prof.role}</span>
                      </div>
                    ))}
                  </div>

                  {/* Itemized Deliverables */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.deliverables.map((item) => (
                      <li key={item.title} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div className="text-xs leading-relaxed">
                          <span className="text-text-primary font-medium block">
                            {item.title}
                          </span>
                          <span className="text-text-muted block mt-0.5">
                            {item.detail}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Transparency Scope Note */}
                  <p className="text-[11px] text-text-muted leading-relaxed pt-4 mb-5 border-t border-white/10">
                    {plan.transparencyNote}
                  </p>

                  {/* Pinned Luxury CTA */}
                  <a
                    href={plan.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] ${
                      plan.recommended || isActive
                        ? "bg-accent text-accent-ink hover:bg-accent-hover shadow-[0_14px_34px_rgba(196,255,26,0.26)]"
                        : "bg-white/[0.06] border border-white/15 text-text-primary hover:border-accent hover:text-accent"
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Habeas Corpus 3-Step Technical Roadmap Band */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0e1912] via-[#090f0b] to-[#070b08] border border-white/12 p-6 sm:p-8 lg:p-10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-[0.16em]">
                <Scale className="w-4 h-4" />
                <span>Caminho do Salvo-Conduto (HC)</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary leading-tight">
                80% da instrução documental pronta no{" "}
                <span className="italic text-accent">VIP &amp; Completo 360°</span>.
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Os Tribunais (STJ · REsp 1.972.092/SP) avaliam a solidez técnica do dossiê. O ecossistema Mecura integra médico, psicólogo e engenheiro agrônomo em uma jornada documental unificada.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/75 border border-white/10 space-y-1.5">
                <span className="font-mono text-xs text-accent tabular-nums">
                  Passo 01
                </span>
                <h4 className="font-display text-lg text-text-primary">
                  Dossiê Inicial
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Receita ICP-Brasil, Laudo Pericial com CID (CRM/MT 17259) e Laudo Psicológico (CRP 08/49215).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/75 border border-white/10 space-y-1.5">
                <span className="font-mono text-xs text-accent tabular-nums">
                  Passo 02
                </span>
                <h4 className="font-display text-lg text-text-primary">
                  Evolução em 90 dias
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Retorno clínico incluso + Relatório Evolutivo comprovando resposta positiva e segurança psicomotora.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background/75 border border-white/10 space-y-1.5">
                <span className="font-mono text-xs text-accent tabular-nums">
                  Passo 03
                </span>
                <h4 className="font-display text-lg text-text-primary">
                  Laudo Agronômico
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Calculadora GACP &amp; Parecer do Eng. Agr. Wilian Dalenogare Pereira (CREA-BA Nº 052193520-2).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Side-by-Side Comparison Matrix (No Prices) */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-sm text-text-secondary">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>
                Compare lado a lado todos os documentos e atendimentos de cada modalidade:
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowComparison((prev) => !prev)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-accent hover:text-text-primary transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>
                {showComparison
                  ? "Ocultar tabela comparativa"
                  : "Ver tabela comparativa completa"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {showComparison && (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="border-b border-border text-xs font-mono text-text-muted">
                    <th className="py-4 px-5 font-medium">Documento / Recurso</th>
                    <th className="py-4 px-4 font-medium">Consulta Essencial</th>
                    <th className="py-4 px-4 font-medium">Psicólogo CRP</th>
                    <th className="py-4 px-4 font-medium">VIP Médico + HC</th>
                    <th className="py-4 px-4 font-semibold text-accent">
                      Plano Completo 360°
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-border/70">
                  {PLAN_COMPARISON_ROWS.map((row) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-5 text-text-primary font-medium">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-text-secondary">
                        {row.basic}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-text-secondary">
                        {row.psychologist}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-text-secondary">
                        {row.premium}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-accent">
                        {row.complete}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Direct CTA Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-text-muted">
            Consulte disponibilidade imediata e condições atualizadas direto dentro do aplicativo Mecura ou fale com nossa equipe de acolhimento.
          </p>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-text-primary transition-colors whitespace-nowrap"
          >
            <span>Falar com acolhimento no WhatsApp ({BRAND.whatsappDisplay})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

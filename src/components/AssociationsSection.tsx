import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight, Instagram, ZoomIn } from "lucide-react";
import {
  BRAND,
  PARTNER_ASSOCIATIONS,
  type PartnerAssociation,
} from "../data/mecuraContent";
import type { InteractivePopupPayload } from "./InteractivePopupModal";

export function AssociationsSection({
  onOpenPopup,
}: {
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [activeChip, setActiveChip] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Subtle automatic alternation between the floating Motion Pop-ups
  useEffect(() => {
    if (!isInView || isHovering) return;
    const timer = window.setInterval(() => {
      setActiveChip((prev) => (prev + 1) % 2);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [isInView, isHovering]);

  const openAssociationModal = (assoc: PartnerAssociation) => {
    onOpenPopup({
      kind: "media",
      tag: `Associação Parceira ${assoc.order} · ${assoc.region}`,
      title: `${assoc.name} — ${assoc.subtitle}`,
      description: assoc.description,
      image: assoc.image,
      imageAlt: `${assoc.name} — ${assoc.subtitle}`,
      points: assoc.pillars,
      ctaLabel: `Seguir ${assoc.instagramHandle} no Instagram`,
      ctaHref: assoc.instagramUrl,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="associacoes"
      className="py-24 lg:py-36 px-6 lg:px-12 bg-background border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Associações Terapêuticas Parceiras
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-medium leading-[1.06] tracking-tight text-text-primary">
              Acesso associativo com{" "}
              <span className="italic text-accent">acolhimento</span> e respaldo.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-text-secondary max-w-md leading-relaxed">
            Além da importação nominal pela ANVISA, conectamos pacientes a associações terapêuticas brasileiras comprometidas com saúde integrativa e acompanhamento próximo.
          </p>
        </div>

        {/* Scalable Association Showcase (Featured Spotlight when 1, Responsive Grid when more are added) */}
        <div className="space-y-10">
          {PARTNER_ASSOCIATIONS.map((assoc, idx) => (
            <motion.article
              key={assoc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl bg-surface/75 border border-border-strong p-6 sm:p-8 lg:p-10"
            >
              {/* Left: Deep Obsidian Logo Stage + Motion Zoom + Non-Overlapping Pop-up Strip */}
              <div
                onClick={() => openAssociationModal(assoc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openAssociationModal(assoc);
                  }
                }}
                aria-label={`Ampliar detalhes da associação ${assoc.name}`}
                className="group lg:col-span-5 relative rounded-2xl bg-[#030504] border border-white/10 overflow-hidden flex flex-col justify-between gap-6 p-5 sm:p-6 cursor-zoom-in"
              >
                {/* Soft botanical obsidian halo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 42%, rgba(196,255,26,0.08) 0%, rgba(10,34,20,0.14) 44%, rgba(3,5,4,0.96) 86%)",
                  }}
                />

                {/* Top Row: Partner Badge + Zoom Hint */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent/90 bg-background/80 backdrop-blur-md border border-white/12 px-3 py-1 rounded-full">
                    Parceira {assoc.order}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-white/12 flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/50 transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Middle Row: 100% Unobstructed SouCannabis Emblem */}
                <div className="relative z-10 py-6 sm:py-8 px-4 flex items-center justify-center">
                  <motion.img
                    animate={{ scale: isHovering ? 1.05 : [1, 1.025, 1] }}
                    transition={
                      isHovering
                        ? { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                        : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
                    }
                    src={assoc.image}
                    alt={`${assoc.name} — ${assoc.subtitle}`}
                    loading="lazy"
                    className="w-full max-w-[300px] h-auto object-contain select-none"
                  />
                </div>

                {/* Bottom Row: Synchronized Motion Pop-up cleanly BELOW the logo (Zero Text Overlap) */}
                <div className="relative z-10 min-h-[78px] flex items-end pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={assoc.popups[activeChip]?.label ?? "chip"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-xl bg-background/90 backdrop-blur-xl border border-accent/40 px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.55)]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                          {assoc.popups[activeChip]?.label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-accent shrink-0" />
                      </div>
                      <p className="text-xs text-text-secondary mt-1 leading-snug">
                        {assoc.popups[activeChip]?.detail}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: Editorial Copy, Pillars & Direct Links */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted mb-3">
                    <span className="text-accent uppercase tracking-[0.16em]">
                      {assoc.subtitle}
                    </span>
                    <span>·</span>
                    <span>{assoc.region}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight mb-4">
                    {assoc.name}
                  </h3>

                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                    {assoc.description}
                  </p>
                </div>

                <ul className="space-y-3 border-t border-border pt-6">
                  {assoc.pillars.map((pillar) => (
                    <li
                      key={pillar}
                      className="text-sm text-text-primary flex items-baseline gap-3"
                    >
                      <span className="text-accent font-mono text-xs">—</span>
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openAssociationModal(assoc)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-ink text-xs sm:text-sm font-semibold hover:bg-accent-hover active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Conhecer a {assoc.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={assoc.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border-strong bg-background text-xs sm:text-sm font-medium text-text-primary hover:border-accent hover:text-accent transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-accent" />
                    <span>{assoc.instagramHandle}</span>
                  </a>

                  <a
                    href={BRAND.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition-colors ml-auto"
                  >
                    <span>Emitir receita no app</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

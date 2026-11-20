import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight, Instagram, ZoomIn } from "lucide-react";
import { ECOSYSTEM_PARTNERS, type EcosystemPartner } from "../data/mecuraContent";
import type { InteractivePopupPayload } from "./InteractivePopupModal";

const SPOTLIGHT_INTERVAL_MS = 3600;

export function PartnersShowcase({
  onOpenPopup,
}: {
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Automatic subtle spotlight rotation across the 4 partners when visible
  useEffect(() => {
    if (!isInView || hoveredIdx !== null) return;
    const timer = window.setInterval(() => {
      setSpotlightIdx((prev) => (prev + 1) % ECOSYSTEM_PARTNERS.length);
    }, SPOTLIGHT_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isInView, hoveredIdx]);

  const activeIdx = hoveredIdx !== null ? hoveredIdx : spotlightIdx;

  const openPartnerModal = (partner: EcosystemPartner) => {
    onOpenPopup({
      kind: "media",
      tag: `${partner.category} · ${partner.origin}`,
      title: partner.name,
      description: partner.description,
      image: partner.image,
      imageAlt: partner.name,
      points: [
        partner.popupDetail,
        "Rastreabilidade completa de lote e pureza laboratorial.",
        "Importação legal mediante prescrição médica e autorização ANVISA (RDC nº 660/2022).",
      ],
      ctaLabel: partner.instagramHandle
        ? `Seguir ${partner.instagramHandle} no Instagram`
        : undefined,
      ctaHref: partner.instagramUrl,
    });
  };

  return (
    <div ref={sectionRef} className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Rede Internacional
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.08]">
            Pureza farmacêutica e genética com origem conhecida.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-text-secondary max-w-md">
          Rastreabilidade completa da semente ao extrato final, com documentação auditada para importação nominal via ANVISA.
        </p>
      </div>

      {/* Equal-Height, Color-Balanced 4-Column Grid with Synchronized Motion Pop-ups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
        {ECOSYSTEM_PARTNERS.map((partner, idx) => {
          const isSpotlight = activeIdx === idx;
          return (
            <motion.article
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.65,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group flex flex-col h-full rounded-2xl bg-surface/65 border transition-colors duration-300 overflow-hidden ${
                isSpotlight
                  ? "border-accent/55 shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_0_1px_rgba(196,255,26,0.14)]"
                  : "border-border hover:border-border-strong"
              }`}
            >
              {/* Uniform 1:1 Studio-Graded Media Frame + Floating Motion Pop-up */}
              <div
                onClick={() => openPartnerModal(partner)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPartnerModal(partner);
                  }
                }}
                aria-label={`Ver detalhes de ${partner.name}`}
                style={{ backgroundColor: partner.logoBg ?? "#080e0a" }}
                className="relative aspect-square w-full overflow-hidden cursor-zoom-in shrink-0"
              >
                <motion.img
                  animate={{ scale: isSpotlight ? 1.06 : 1 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  src={partner.image}
                  alt={`${partner.name} · ${partner.category}`}
                  loading="lazy"
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    partner.toneFilter ?? ""
                  } group-hover:saturate-100 group-hover:brightness-100`}
                />

                {/* Unified Obsidian Edge Vignette to Harmonize All 4 Brand Palettes */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 82% 78% at 50% 45%, rgba(7,11,8,0.04) 32%, rgba(7,11,8,0.52) 78%, rgba(7,11,8,0.92) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0d1410] via-[#0d1410]/65 to-transparent pointer-events-none" />

                {/* Top-right subtle zoom indicator */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-background/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/50 transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>

                {/* Synchronized Animated Motion Pop-up Chip */}
                <div className="absolute inset-x-3.5 bottom-3.5 z-10 pointer-events-none">
                  <motion.div
                    animate={{
                      y: isSpotlight ? 0 : 4,
                      scale: isSpotlight ? 1 : 0.97,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className={`rounded-xl px-3.5 py-2.5 backdrop-blur-xl border transition-colors duration-300 ${
                      isSpotlight
                        ? "bg-background/92 border-accent/60 shadow-[0_12px_30px_rgba(0,0,0,0.65)]"
                        : "bg-background/80 border-white/12"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent truncate">
                        {partner.popupHighlight}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-accent shrink-0" />
                    </div>
                    <AnimatePresence initial={false}>
                      {isSpotlight && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden text-[11px] text-text-secondary leading-snug line-clamp-2"
                        >
                          {partner.popupDetail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              {/* Uniform Aligned Copy Area */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-2">
                  {partner.category}
                </span>

                <h3 className="font-display text-2xl font-medium text-text-primary leading-tight mb-2">
                  {partner.name}
                </h3>

                <p className="text-xs text-text-muted mb-3 leading-snug">
                  {partner.origin}
                </p>

                <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                  {partner.description}
                </p>

                {/* Pinned Bottom Action Row (Consistent Baseline Across All 4 Cards) */}
                <div className="mt-auto pt-4 border-t border-border/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openPartnerModal(partner)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary hover:text-accent transition-colors cursor-pointer"
                  >
                    <span>Ver detalhes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                  </button>

                  {partner.instagramUrl && partner.instagramHandle && (
                    <a
                      href={partner.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-text-primary transition-colors truncate"
                    >
                      <Instagram className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{partner.instagramHandle}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, X, ZoomIn, ZoomOut } from "lucide-react";
import { BRAND } from "../data/mecuraContent";

export interface InteractivePopupPayload {
  kind: "feature" | "media";
  tag: string;
  title: string;
  description: string;
  points?: string[];
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function InteractivePopupModal({
  payload,
  onClose,
}: {
  payload: InteractivePopupPayload | null;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
    if (!payload) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [payload, onClose]);

  return (
    <AnimatePresence>
      {payload && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={payload.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/82 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Scrollable Mobile Sheet / Split Desktop Modal */}
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="relative z-10 w-full max-w-4xl max-h-[92dvh] rounded-t-3xl sm:rounded-2xl bg-surface border border-border-strong shadow-[0_40px_120px_rgba(0,0,0,0.85)] flex flex-col lg:grid lg:grid-cols-12 overflow-y-auto lg:overflow-hidden overscroll-contain"
          >
            {/* Mobile Sticky Top Bar (Always Reachable Close Button) */}
            <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-5 py-3.5 bg-surface/95 backdrop-blur-md border-b border-border shrink-0">
              <p className="font-mono text-[11px] text-accent truncate">{payload.tag}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar pop-up"
                className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-text-secondary hover:text-text-primary shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Optional Media Column with Interactive Motion Zoom */}
            {payload.image && (
              <div className="lg:col-span-6 relative bg-[#050806] overflow-hidden h-[42dvh] sm:h-[48dvh] lg:h-auto lg:min-h-[540px] flex items-center justify-center p-4 shrink-0">
                <motion.img
                  src={payload.image}
                  alt={payload.imageAlt || payload.title}
                  referrerPolicy="no-referrer"
                  animate={{ scale: zoomed ? 1.45 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  onClick={() => setZoomed((z) => !z)}
                  className={`max-h-full max-w-full w-auto h-full object-contain ${
                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? "Reduzir zoom da imagem" : "Ampliar zoom da imagem"}
                  className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-background/85 backdrop-blur-md border border-white/15 text-xs font-medium text-text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  {zoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5" />
                      <span>Reduzir zoom</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Ampliar zoom</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Content Column (Flows naturally on mobile scroll, independently scrollable on desktop) */}
            <div
              data-lenis-prevent
              className={`${
                payload.image ? "lg:col-span-6" : "lg:col-span-12"
              } p-5 sm:p-8 lg:p-10 flex flex-col justify-between lg:overflow-y-auto lg:max-h-[90dvh] overscroll-contain`}
            >
              <div>
                {/* Desktop Header Row */}
                <div className="hidden lg:flex items-start justify-between gap-4 mb-6">
                  <p className="font-mono text-xs text-accent">{payload.tag}</p>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar pop-up"
                    className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary leading-[1.12] mb-3.5">
                  {payload.title}
                </h3>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5">
                  {payload.description}
                </p>

                {payload.points && payload.points.length > 0 && (
                  <ul className="space-y-3 border-t border-border pt-5 mb-7">
                    {payload.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-sm text-text-primary"
                      >
                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-5 pb-2 sm:pb-0 border-t border-border flex flex-col sm:flex-row gap-3">
                <a
                  href={payload.ctaHref || BRAND.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-accent text-accent-ink font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-colors text-center"
                >
                  <span>{payload.ctaLabel || BRAND.ctaFull}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
          transition={{ duration: 0.24 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={payload.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/82 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Pop-up Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-4xl max-h-[90dvh] bg-surface border border-border-strong overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Optional Media Column with Interactive Motion Zoom */}
            {payload.image && (
              <div className="lg:col-span-6 relative bg-[#050806] overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-[540px] flex items-center justify-center p-4">
                <motion.img
                  src={payload.image}
                  alt={payload.imageAlt || payload.title}
                  referrerPolicy="no-referrer"
                  animate={{ scale: zoomed ? 1.5 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  onClick={() => setZoomed((z) => !z)}
                  className={`max-h-[72dvh] w-full h-full object-contain ${
                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? "Reduzir zoom da imagem" : "Ampliar zoom da imagem"}
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-background/80 backdrop-blur-md border border-white/15 text-xs font-medium text-text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
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

            {/* Content Column */}
            <div
              className={`${
                payload.image ? "lg:col-span-6" : "lg:col-span-12"
              } p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[60dvh] lg:max-h-[90dvh]`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
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

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary leading-[1.12] mb-4">
                  {payload.title}
                </h3>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                  {payload.description}
                </p>

                {payload.points && payload.points.length > 0 && (
                  <ul className="space-y-3 border-t border-border pt-5 mb-8">
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

              <div className="pt-5 border-t border-border flex flex-col sm:flex-row gap-3">
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

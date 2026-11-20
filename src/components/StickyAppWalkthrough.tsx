import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight, Pause, Play, ZoomIn } from "lucide-react";
import {
  APP_SCREENS,
  BRAND,
  type AppScreenItem,
  type ScreenPopupHotspot,
} from "../data/mecuraContent";
import type { InteractivePopupPayload } from "./InteractivePopupModal";

const AUTO_CYCLE_MS = 4800;
const POPUP_SWAP_MS = 2350;
const APP_WALKTHROUGH_VIDEO_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent(
  "User_scrolling_medical_service_w…_1b9323c5.mp4"
)}`;

const ChapterBlock: React.FC<{
  item: AppScreenItem;
  index: number;
  isActive: boolean;
  onSelect: (i: number) => void;
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}> = ({ item, index, isActive, onSelect, onOpenPopup }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const prevInView = useRef(false);

  useEffect(() => {
    if (inView && !prevInView.current) {
      onSelect(index);
    }
    prevInView.current = inView;
  }, [inView, index, onSelect]);

  return (
    <div
      ref={ref}
      onClick={() => onSelect(index)}
      className={`py-12 lg:py-20 border-t border-border transition-opacity duration-500 cursor-pointer ${
        isActive ? "opacity-100" : "opacity-45 hover:opacity-85"
      }`}
    >
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-mono text-xs text-accent tabular-nums">
          {item.step}
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
          {item.label}
        </span>
      </div>

      <h3 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-text-primary mb-6">
        {item.title}
      </h3>

      <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
        {item.description}
      </p>

      {/* Interactive Hotspot Triggers (Mobile & Desktop) */}
      <div className="flex flex-wrap gap-3 mb-7">
        {item.popups.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPopup({
                kind: "feature",
                tag: hotspot.modalTag,
                title: hotspot.modalTitle,
                description: hotspot.modalDescription,
                points: hotspot.modalPoints,
                image: item.image,
                imageAlt: item.alt,
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong bg-surface text-xs font-medium text-text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
          >
            <span>{hotspot.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
          </button>
        ))}
      </div>

      <ul className="space-y-3 border-t border-border/60 pt-6">
        {item.highlights.map((h) => (
          <li key={h} className="text-sm text-text-primary flex items-baseline gap-3">
            <span className="text-accent font-mono text-xs">—</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function StickyAppWalkthrough({
  onOpenPopup,
}: {
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSectionVisible = useInView(sectionRef, { amount: 0.12 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [spotlightPopup, setSpotlightPopup] = useState(0);
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [cycleTick, setCycleTick] = useState(0);

  const isRunning = isSectionVisible && !isHoveringStage && !isUserPaused;
  const shouldPlayVideo = isSectionVisible && !isUserPaused;
  const current = APP_SCREENS[activeIndex];

  const handleSelectScreen = useCallback((idx: number) => {
    setActiveIndex(idx);
    setSpotlightPopup(0);
    setCycleTick((t) => t + 1);
  }, []);

  // Sync phone demo video playback with viewport visibility & play/pause toggle
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (!shouldPlayVideo) return;
      el.muted = true;
      el.play().catch(() => {});
    };

    if (shouldPlayVideo) {
      tryPlay();
    } else if (!el.paused) {
      el.pause();
    }

    const onUnlock = () => {
      if (shouldPlayVideo && el.paused) {
        tryPlay();
      }
    };

    window.addEventListener("touchstart", onUnlock, { passive: true });
    window.addEventListener("pointerdown", onUnlock, { passive: true });
    window.addEventListener("scroll", onUnlock, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onUnlock);
      window.removeEventListener("pointerdown", onUnlock);
      window.removeEventListener("scroll", onUnlock);
    };
  }, [shouldPlayVideo]);

  // Automatically advance chapter highlights + synchronized pop-up spotlight
  useEffect(() => {
    if (!isRunning) return;

    setSpotlightPopup(0);
    const swapPopupTimer = window.setTimeout(() => {
      setSpotlightPopup(1);
    }, POPUP_SWAP_MS);

    const nextScreenTimer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % APP_SCREENS.length);
      setCycleTick((t) => t + 1);
    }, AUTO_CYCLE_MS);

    return () => {
      window.clearTimeout(swapPopupTimer);
      window.clearTimeout(nextScreenTimer);
    };
  }, [activeIndex, isRunning, cycleTick]);

  const openHotspot = (hotspot: ScreenPopupHotspot) => {
    onOpenPopup({
      kind: "feature",
      tag: hotspot.modalTag,
      title: hotspot.modalTitle,
      description: hotspot.modalDescription,
      points: hotspot.modalPoints,
      image: current.image,
      imageAlt: current.alt,
    });
  };

  const openCurrentZoom = () => {
    onOpenPopup({
      kind: "media",
      tag: `${current.step} · ${current.label}`,
      title: current.title,
      description: current.description,
      points: current.highlights,
      image: current.image,
      imageAlt: current.alt,
    });
  };

  return (
    <section ref={sectionRef} id="app" className="py-24 lg:py-36 px-6 lg:px-12 bg-background">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-3xl mb-14 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-5">
            Por dentro do aplicativo
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.06] tracking-tight">
            Todo o seu tratamento em um só{" "}
            <span className="italic text-accent">lugar</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Animated Auto-Playing Full-Bleed Phone Stage + Synchronized Pop-ups (Mobile & Desktop Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseLeave={() => setIsHoveringStage(false)}
              className="flex flex-col items-center relative py-4"
            >
              {/* Main Edge-to-Edge Phone Container Playing Official App Walkthrough Video */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={openCurrentZoom}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCurrentZoom();
                  }
                }}
                aria-label={`Ampliar detalhes de ${current.label} do aplicativo Mecura`}
                className="relative group w-[250px] sm:w-[284px] lg:w-[306px] rounded-[2.4rem] lg:rounded-[2.6rem] p-[6px] lg:p-[7px] bg-[#141e17] border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.82)] cursor-zoom-in"
              >
                <div className="relative rounded-[2rem] lg:rounded-[2.2rem] overflow-hidden aspect-[9/16] bg-[#070b08]">
                  {/* Crisp Fallback Screen While Video Buffers (Zero Black Frame / Zero iOS Play Icon) */}
                  <img
                    src={current.image}
                    alt={current.alt}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover bg-[#070b08] pointer-events-none select-none"
                  />

                  {/* Official 9:16 App Walkthrough Video */}
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    preload="auto"
                    onLoadedData={(e) => {
                      const el = e.currentTarget;
                      if (shouldPlayVideo && el.paused) {
                        el.muted = true;
                        el.play().catch(() => {});
                      }
                    }}
                    onCanPlay={(e) => {
                      const el = e.currentTarget;
                      if (shouldPlayVideo && el.paused) {
                        el.muted = true;
                        el.play().catch(() => {});
                      }
                    }}
                    onPlaying={() => setIsVideoPlaying(true)}
                    onTimeUpdate={(e) => {
                      if (!isVideoPlaying && e.currentTarget.currentTime > 0.04) {
                        setIsVideoPlaying(true);
                      }
                    }}
                    className={`relative z-[2] w-full h-full object-cover transition-opacity duration-500 pointer-events-none select-none ${
                      isVideoPlaying ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <source src={APP_WALKTHROUGH_VIDEO_SRC} type="video/mp4" />
                  </video>

                  {/* Hover Motion Zoom Hint */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
                      <ZoomIn className="w-3.5 h-3.5 text-accent" />
                      <span>Clique para ampliar</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Desktop Only: Floating Interactive Pop-ups orbiting outside the phone (Zero Overlap) */}
              <div className="hidden lg:block pointer-events-none absolute inset-0">
                <AnimatePresence initial={false}>
                  {current.popups.map((hotspot, idx) => {
                    const isTopRight = hotspot.position === "top-right";
                    const isSpotlight = spotlightPopup === idx;

                    return (
                      <motion.div
                        key={hotspot.id}
                        initial={{
                          opacity: 0,
                          x: isTopRight ? 22 : -22,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: isSpotlight ? 1.03 : 0.97,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.92,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        transition={{
                          opacity: { duration: 0.3, delay: 0.08 + idx * 0.14 },
                          x: {
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                            delay: 0.08 + idx * 0.14,
                          },
                          scale: { type: "spring", stiffness: 280, damping: 24 },
                        }}
                        className={`pointer-events-auto absolute z-20 ${
                          isTopRight
                            ? "top-14 -right-4 xl:-right-8"
                            : "bottom-24 -left-4 xl:-left-8"
                        }`}
                      >
                        <motion.button
                          type="button"
                          onClick={() => openHotspot(hotspot)}
                          animate={{ y: isSpotlight ? [0, -5, 0] : [0, -2, 0] }}
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{
                            y: {
                              duration: isSpotlight ? 2.4 : 3.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          className={`max-w-[228px] bg-surface/95 backdrop-blur-xl border px-4 py-3 rounded-xl text-left transition-colors duration-300 cursor-pointer ${
                            isSpotlight
                              ? "border-accent shadow-[0_20px_50px_rgba(196,255,26,0.16),0_16px_40px_rgba(0,0,0,0.75)]"
                              : "border-white/15 hover:border-accent/70 shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-text-primary leading-tight">
                                {hotspot.label}
                              </div>
                              <div className="text-[11px] text-text-secondary mt-0.5 leading-snug">
                                {hotspot.sublabel}
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          </div>

                          {/* Auto-expanding live detail line on spotlighted pop-up */}
                          <AnimatePresence initial={false}>
                            {isSpotlight && hotspot.modalPoints[0] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden border-t border-white/10 pt-2"
                              >
                                <p className="text-[11px] text-accent/95 leading-snug line-clamp-2">
                                  {hotspot.modalPoints[0]}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Mobile Only: Clean Synchronized Pop-ups Below Phone (Never Covers Screen Text) */}
              <div className="lg:hidden w-full max-w-[340px] mt-5 grid grid-cols-1 gap-2.5">
                {current.popups.map((hotspot, idx) => {
                  const isSpotlight = spotlightPopup === idx;
                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      onClick={() => openHotspot(hotspot)}
                      className={`w-full rounded-xl px-4 py-3 text-left border transition-all duration-300 cursor-pointer ${
                        isSpotlight
                          ? "bg-surface border-accent shadow-[0_12px_30px_rgba(196,255,26,0.12)]"
                          : "bg-surface/65 border-border hover:border-border-strong"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-text-primary leading-tight">
                            {hotspot.label}
                          </p>
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            {hotspot.sublabel}
                          </p>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-accent shrink-0" />
                      </div>
                      {isSpotlight && hotspot.modalPoints[0] && (
                        <p className="mt-2 pt-2 border-t border-white/10 text-[11px] text-accent/95 leading-snug">
                          {hotspot.modalPoints[0]}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Animated Progress Bars + Auto-Play Toggle */}
              <div className="mt-7 flex items-center gap-3">
                {APP_SCREENS.map((s, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectScreen(idx)}
                      aria-label={`Ver tela ${s.label}`}
                      className={`relative h-[3px] rounded-full overflow-hidden transition-all cursor-pointer ${
                        isCurrent ? "w-12 bg-white/20" : "w-5 bg-white/15 hover:bg-white/40"
                      }`}
                    >
                      {isCurrent && (
                        <motion.span
                          key={`${activeIndex}-${cycleTick}-${isRunning ? "run" : "pause"}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isRunning ? 1 : 0.45 }}
                          transition={{
                            duration: isRunning ? AUTO_CYCLE_MS / 1000 : 0.25,
                            ease: "linear",
                          }}
                          style={{ transformOrigin: "left" }}
                          className="absolute inset-0 bg-accent"
                        />
                      )}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setIsUserPaused((p) => !p)}
                  aria-label={isUserPaused ? "Retomar animação automática" : "Pausar animação automática"}
                  className="ml-2 w-7 h-7 rounded-full border border-white/15 bg-surface/80 text-text-secondary hover:text-accent hover:border-accent/60 flex items-center justify-center transition-colors cursor-pointer"
                >
                  {isUserPaused ? (
                    <Play className="w-3 h-3 fill-current" />
                  ) : (
                    <Pause className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Scrolling Chapters */}
          <div className="lg:col-span-7">
            {APP_SCREENS.map((item, idx) => (
              <ChapterBlock
                key={item.id}
                item={item}
                index={idx}
                isActive={idx === activeIndex}
                onSelect={handleSelectScreen}
                onOpenPopup={onOpenPopup}
              />
            ))}

            <div className="pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <a
                href={BRAND.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-accent text-accent-ink font-semibold text-sm hover:bg-accent-hover active:scale-[0.98] transition-all"
              >
                <span>{BRAND.ctaFull}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <span className="text-xs text-text-muted">
                Instalável direto no Android e iPhone
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

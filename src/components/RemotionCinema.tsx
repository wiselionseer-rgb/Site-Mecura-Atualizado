import React, { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import {
  BRAND_FILM_DURATION,
  BRAND_FILM_FPS,
  FILM_CHAPTERS,
  MecuraBrandFilm,
} from "../remotion/MecuraBrandFilm";

const MOBILE_STORYBOARD_SCENES = [
  {
    id: 0,
    eyebrow: "Instituto Mecura · Brasil",
    headline: "A pureza da natureza, guiada pela ciência.",
    accentWord: "natureza,",
    caption:
      "Um aplicativo pensado para simplificar a consulta médica e o acesso legal à Cannabis Medicinal no Brasil.",
    image: "/unnamed.jpg",
    imagePosition: "object-center",
    isLime: false,
  },
  {
    id: 1,
    eyebrow: "Tudo em um só lugar",
    headline: "Escalas clínicas e fila ao vivo.",
    accentWord: "ao vivo.",
    caption:
      "Testes ASRS-18 (OMS), AQ-10 (Cambridge), prontuário protegido e notificação no WhatsApp quando o médico chamar.",
    image: "/screen-fila.jpg",
    imagePosition: "object-top",
    isLime: true,
  },
  {
    id: 2,
    eyebrow: "Corpo Clínico Especializado",
    headline: "Receita e laudo médico em 5 a 45 minutos.",
    accentWord: "5 a 45 minutos.",
    caption:
      "Avaliação clínica individualizada sob normas do CFM e emissão digital segura ICP-Brasil.",
    image: "/grok-image-29e89451-033b-4b4f-a232-c734b224a8b1.png",
    imagePosition: "object-top",
    isLime: false,
  },
  {
    id: 3,
    eyebrow: "Resolução RDC nº 660/2022 · ANVISA",
    headline: "Origem rastreável, importação 100% legalizada.",
    accentWord: "100% legalizada.",
    caption: "GreenBudz · FlowerMed · Pangaia · HighBreed Seeds — Da semente ao paciente.",
    image: "/galeria-9.jpg.png",
    imagePosition: "object-center",
    isLime: false,
  },
] as const;

export function RemotionCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: sync Remotion player frame updates & auto-pause off-screen
  useEffect(() => {
    if (!isDesktop) return;
    const player = playerRef.current;
    if (!player) return;

    const onFrame = (e: { detail: { frame: number } }) => {
      const f = e.detail.frame;
      if (f >= 366) setActiveIndex(3);
      else if (f >= 244) setActiveIndex(2);
      else if (f >= 122) setActiveIndex(1);
      else setActiveIndex(0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);

    return () => {
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop || !playerRef.current) return;
    if (isInView && isPlaying) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [isDesktop, isInView, isPlaying]);

  // Mobile: silky 60fps GPU-composited chapter auto-advance (zero 30fps Remotion CPU freeze)
  useEffect(() => {
    if (isDesktop || !isInView || !isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOBILE_STORYBOARD_SCENES.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isDesktop, isInView, isPlaying]);

  const seekToChapter = (index: number, frame: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
    if (isDesktop && playerRef.current) {
      playerRef.current.seekTo(frame);
      playerRef.current.play();
    }
  };

  const togglePlayback = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (isDesktop && playerRef.current) {
      if (next) playerRef.current.play();
      else playerRef.current.pause();
    }
  };

  const activeMobileScene =
    MOBILE_STORYBOARD_SCENES[activeIndex] ?? MOBILE_STORYBOARD_SCENES[0];

  return (
    <section
      ref={sectionRef}
      id="filme"
      className="py-12 lg:py-24 px-4 sm:px-8 lg:px-12 bg-background"
    >
      <div className="max-w-[1380px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-none border border-border sm:border-0 bg-[#050806]">
          {isDesktop ? (
            <div className="aspect-video w-full">
              <Player
                ref={playerRef}
                component={MecuraBrandFilm}
                durationInFrames={BRAND_FILM_DURATION}
                compositionWidth={1280}
                compositionHeight={720}
                fps={BRAND_FILM_FPS}
                autoPlay={isInView}
                loop
                controls={false}
                acknowledgeRemotionLicense
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            /* Native 60fps Mobile Cinema Storyboard — Smooth even on iOS Low Power Mode & Instagram WebView */
            <div
              className={`relative min-h-[420px] flex flex-col justify-between p-6 overflow-hidden transition-colors duration-500 ${
                activeMobileScene.isLime
                  ? "bg-accent text-forest"
                  : "bg-[#060a07] text-text-primary"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobileScene.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <img
                    src={activeMobileScene.image}
                    alt={activeMobileScene.headline}
                    className={`w-full h-full object-cover ${activeMobileScene.imagePosition} ${
                      activeMobileScene.isLime
                        ? "opacity-20 mix-blend-multiply"
                        : "opacity-45 mecura-hero-breathe"
                    }`}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: activeMobileScene.isLime
                        ? "linear-gradient(180deg, rgba(196,255,26,0.92) 0%, rgba(196,255,26,0.75) 55%, rgba(196,255,26,0.96) 100%)"
                        : "linear-gradient(180deg, rgba(6,10,7,0.72) 0%, rgba(6,10,7,0.52) 45%, rgba(6,10,7,0.96) 100%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Eyebrow + Chapter Counter */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    activeMobileScene.isLime ? "text-forest/80 font-semibold" : "text-accent"
                  }`}
                >
                  {activeMobileScene.eyebrow}
                </span>
                <span
                  className={`font-mono text-[10px] tabular-nums ${
                    activeMobileScene.isLime ? "text-forest/70" : "text-text-muted"
                  }`}
                >
                  0{activeIndex + 1} / 04
                </span>
              </div>

              {/* Animated Kinetic Scene Copy */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobileScene.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 my-auto py-8 space-y-4"
                >
                  <h3
                    className={`font-display text-4xl font-semibold leading-[1.02] tracking-tight ${
                      activeMobileScene.isLime ? "text-forest" : "text-text-primary"
                    }`}
                  >
                    {activeMobileScene.headline.replace(activeMobileScene.accentWord, "")}
                    <span
                      className={`italic ${
                        activeMobileScene.isLime ? "text-forest" : "text-accent"
                      }`}
                    >
                      {activeMobileScene.accentWord}
                    </span>
                  </h3>
                  <p
                    className={`text-sm leading-relaxed max-w-sm ${
                      activeMobileScene.isLime
                        ? "text-forest/85"
                        : "text-text-secondary"
                    }`}
                  >
                    {activeMobileScene.caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Smooth Chapter Progress Rail */}
              <div className="relative z-10 pr-14 flex items-center gap-1.5">
                {MOBILE_STORYBOARD_SCENES.map((scene) => {
                  const isCurrent = scene.id === activeIndex;
                  return (
                    <div
                      key={scene.id}
                      className={`h-[2.5px] flex-1 rounded-full overflow-hidden ${
                        activeMobileScene.isLime ? "bg-forest/20" : "bg-white/15"
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          activeMobileScene.isLime ? "bg-forest" : "bg-accent"
                        }`}
                        style={{
                          width: isCurrent
                            ? "100%"
                            : scene.id < activeIndex
                              ? "100%"
                              : "0%",
                          opacity: isCurrent ? 1 : scene.id < activeIndex ? 0.55 : 0,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quiet floating play/pause trigger */}
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={
              isPlaying ? "Pausar filme da marca" : "Reproduzir filme da marca"
            }
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-background/80 backdrop-blur-md border border-white/15 text-text-primary hover:bg-accent hover:text-accent-ink transition-colors flex items-center justify-center cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </div>

        {/* Minimal editorial chapter rail — zero pill clutter */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {FILM_CHAPTERS.map((chapter) => {
            const active = activeIndex === chapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => seekToChapter(chapter.id, chapter.frame)}
                className="group text-left pt-4 border-t border-border relative cursor-pointer"
              >
                {active && (
                  <motion.span
                    layoutId="cinema-chapter-bar"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    className="absolute top-[-1px] left-0 right-0 h-[2px] bg-accent"
                  />
                )}
                <span
                  className={`block font-mono text-[11px] tabular-nums mb-1 transition-colors ${
                    active
                      ? "text-accent"
                      : "text-text-muted group-hover:text-text-secondary"
                  }`}
                >
                  0{chapter.id + 1}
                </span>
                <span
                  className={`block text-sm sm:text-base font-medium transition-colors whitespace-nowrap truncate ${
                    active
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {chapter.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

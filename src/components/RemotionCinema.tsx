import React, { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import {
  BRAND_FILM_DURATION,
  BRAND_FILM_FPS,
  FILM_CHAPTERS,
  MecuraBrandFilm,
} from "../remotion/MecuraBrandFilm";

export function RemotionCinema() {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
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
  }, []);

  const seekToChapter = (index: number, frame: number) => {
    setActiveIndex(index);
    playerRef.current?.seekTo(frame);
    playerRef.current?.play();
  };

  const togglePlayback = () => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.pause();
    else playerRef.current.play();
  };

  return (
    <section id="filme" className="py-12 lg:py-24 px-4 sm:px-8 lg:px-12 bg-background">
      <div className="max-w-[1380px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-[#050806]"
        >
          <div className="aspect-video w-full">
            <Player
              ref={playerRef}
              component={MecuraBrandFilm}
              durationInFrames={BRAND_FILM_DURATION}
              compositionWidth={1280}
              compositionHeight={720}
              fps={BRAND_FILM_FPS}
              autoPlay
              loop
              controls={false}
              acknowledgeRemotionLicense
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Quiet floating play/pause trigger */}
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pausar filme da marca" : "Reproduzir filme da marca"}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 rounded-full bg-background/70 backdrop-blur-md text-text-primary hover:bg-accent hover:text-accent-ink transition-colors flex items-center justify-center cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </motion.div>

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
                    active ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
                  }`}
                >
                  0{chapter.id + 1}
                </span>
                <span
                  className={`block text-sm sm:text-base font-medium transition-colors whitespace-nowrap truncate ${
                    active ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
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

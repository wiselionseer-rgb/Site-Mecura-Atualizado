import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

export const BRAND_FILM_FPS = 30;
const SCENE_LEN = 140;
const TRANS_LEN = 18;
// 4 scenes x 140 - 3 transitions x 18 = 506 frames
export const BRAND_FILM_DURATION = SCENE_LEN * 4 - TRANS_LEN * 3;

export const FILM_CHAPTERS = [
  { id: 0, title: "A Essência", frame: 0 },
  { id: 1, title: "O Aplicativo", frame: 122 },
  { id: 2, title: "Receita em 3–5 min", frame: 244 },
  { id: 3, title: "Origem & ANVISA", frame: 366 },
] as const;

const BG_DARK = "#070b08";
const FOREST = "#0a2214";
const LIME = "#c4ff1a";
const IVORY = "#f4f7f2";
const MUTED_LIGHT = "rgba(244, 247, 242, 0.76)";

const KineticWords: React.FC<{
  words: Array<{ text: string; italic?: boolean; accent?: boolean }>;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
}> = ({
  words,
  startFrame = 8,
  fontSize = 72,
  color = IVORY,
  accentColor = LIME,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: 18,
        rowGap: 4,
        fontFamily: "Fraunces, Georgia, serif",
        fontSize,
        lineHeight: 1.04,
        fontWeight: 500,
        letterSpacing: "-0.02em",
      }}
    >
      {words.map((word, idx) => {
        const progress = spring({
          frame: Math.max(0, frame - (startFrame + idx * 4)),
          fps,
          config: { damping: 24, stiffness: 125 },
        });
        const y = interpolate(progress, [0, 1], [44, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={`${word.text}-${idx}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: 6,
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${y}px)`,
                opacity: progress,
                fontStyle: word.italic ? "italic" : "normal",
                color: word.accent ? accentColor : color,
              }}
            >
              {word.text}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/* --- SCENE 1: Editorial Portrait with Zero-Crop 9:16 Showcase + Cinema Motion Zoom --- */
const SceneEssence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = interpolate(frame, [0, SCENE_LEN], [0.97, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(frame, [0, SCENE_LEN], [10, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ambientScale = interpolate(frame, [0, SCENE_LEN], [1.14, 1.24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardReveal = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 24, stiffness: 110 },
  });
  const subFade = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK, display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: "46%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Soft ambient blurred backdrop so edges blend seamlessly */}
        <Img
          src="/unnamed.jpg"
          style={{
            position: "absolute",
            inset: -36,
            width: "calc(100% + 72px)",
            height: "calc(100% + 72px)",
            objectFit: "cover",
            objectPosition: "center",
            filter: "blur(34px) saturate(1.15)",
            opacity: 0.28,
            transform: `scale(${ambientScale})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(7,11,8,0.38) 0%, rgba(7,11,8,0.18) 58%, rgba(7,11,8,0.96) 100%)",
          }}
        />

        {/* Uncropped 9:16 Vertical Poster Card with Smooth Motion Zoom */}
        <div
          style={{
            position: "relative",
            width: 368,
            height: 654,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "#070b08",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 32px 84px rgba(0,0,0,0.78)",
            opacity: cardReveal,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
          }}
        >
          <Img
            src="/unnamed.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      </div>

      <div
        style={{
          width: "54%",
          height: "100%",
          padding: "72px 76px 72px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 15,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: LIME,
            opacity: subFade,
          }}
        >
          Instituto Mecura · Brasil
        </div>

        <KineticWords
          fontSize={74}
          words={[
            { text: "A" },
            { text: "pureza" },
            { text: "da" },
            { text: "natureza,", italic: true, accent: true },
            { text: "guiada" },
            { text: "pela" },
            { text: "ciência." },
          ]}
        />

        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 22,
            lineHeight: 1.5,
            color: MUTED_LIGHT,
            maxWidth: 500,
            opacity: subFade,
            transform: `translateY(${interpolate(subFade, [0, 1], [18, 0])}px)`,
          }}
        >
          Um aplicativo pensado para simplificar a consulta médica e o acesso legal à Cannabis Medicinal no Brasil.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 2: Bold Lime Band with Full-Bleed Cropped App Screens + Motion Zoom + Pop-up --- */
const SceneAppScreens: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneLeft = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 20, stiffness: 105 },
  });
  const phoneRight = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 20, stiffness: 105 },
  });
  const popupSpring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 16, stiffness: 140 },
  });

  // Smooth Motion Zoom inside each full-bleed phone screen
  const screenZoomA = interpolate(frame, [0, SCENE_LEN], [1.0, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const screenZoomB = interpolate(frame, [0, SCENE_LEN], [1.07, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, SCENE_LEN], [14, -16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LIME,
        padding: "56px 76px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 44,
      }}
    >
      <div style={{ width: "42%", display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: FOREST,
          }}
        >
          Tudo em um só lugar
        </div>

        <KineticWords
          fontSize={62}
          color={FOREST}
          accentColor={FOREST}
          startFrame={6}
          words={[
            { text: "Escalas" },
            { text: "clínicas" },
            { text: "e" },
            { text: "fila" },
            { text: "ao", italic: true },
            { text: "vivo.", italic: true },
          ]}
        />

        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 20,
            lineHeight: 1.5,
            color: "rgba(10, 34, 20, 0.84)",
          }}
        >
          Testes ASRS-18 (OMS), AQ-10 (Cambridge), prontuário protegido e notificação no WhatsApp quando o médico chamar.
        </div>
      </div>

      {/* Edge-to-Edge Full-Bleed App Screens inside Clean Sleek Frames */}
      <div
        style={{
          width: "56%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          position: "relative",
        }}
      >
        {/* Phone 1: Triagem (exact edge-to-edge aspect) */}
        <div
          style={{
            width: 264,
            height: 552,
            borderRadius: 34,
            padding: 7,
            backgroundColor: "#0a140d",
            boxShadow: "0 32px 75px rgba(10,34,20,0.34)",
            transform: `translateY(${interpolate(phoneLeft, [0, 1], [64, -12]) + driftY * 0.45}px)`,
            opacity: phoneLeft,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 27,
              overflow: "hidden",
              backgroundColor: "#070b08",
            }}
          >
            <Img
              src="/screen-triagem.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transform: `scale(${screenZoomA})`,
              }}
            />
          </div>
        </div>

        {/* Phone 2: Fila ao Vivo (exact edge-to-edge aspect) */}
        <div
          style={{
            width: 264,
            height: 552,
            borderRadius: 34,
            padding: 7,
            backgroundColor: "#0a140d",
            boxShadow: "0 32px 75px rgba(10,34,20,0.34)",
            transform: `translateY(${interpolate(phoneRight, [0, 1], [90, 18]) - driftY * 0.45}px)`,
            opacity: phoneRight,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 27,
              overflow: "hidden",
              backgroundColor: "#070b08",
            }}
          >
            <Img
              src="/screen-fila.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transform: `scale(${screenZoomB})`,
              }}
            />
          </div>
        </div>

        {/* Floating Spring Pop-up Notification */}
        <div
          style={{
            position: "absolute",
            bottom: 34,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(popupSpring, [0, 1], [0.85, 1])}) translateY(${interpolate(popupSpring, [0, 1], [24, 0])}px)`,
            opacity: popupSpring,
            backgroundColor: FOREST,
            color: IVORY,
            padding: "14px 24px",
            borderRadius: 999,
            boxShadow: "0 18px 44px rgba(10,34,20,0.42)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: LIME }}>Dr. Guilherme</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Sala médica liberada agora</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 3: Specialists + Smooth Cinema Zoom + 3-5 min Pop-up --- */
const SceneSpecialists: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgZoom = interpolate(frame, [0, SCENE_LEN], [1.02, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const timerReveal = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 20, stiffness: 110 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <Img
        src="/grok-image-29e89451-033b-4b4f-a232-c734b224a8b1.png"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "68% center",
          transform: `scale(${imgZoom})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(7,11,8,0.95) 0%, rgba(7,11,8,0.78) 44%, rgba(7,11,8,0.14) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "62%",
          height: "100%",
          padding: "76px 84px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 15,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: LIME,
          }}
        >
          Corpo Clínico Especializado
        </div>

        <KineticWords
          fontSize={68}
          startFrame={6}
          words={[
            { text: "Receita" },
            { text: "e" },
            { text: "laudo" },
            { text: "médico" },
            { text: "em" },
            { text: "3" },
            { text: "a" },
            { text: "5", accent: true, italic: true },
            { text: "minutos.", accent: true, italic: true },
          ]}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: timerReveal,
            transform: `translateY(${interpolate(timerReveal, [0, 1], [22, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: 48,
              color: LIME,
              fontStyle: "italic",
            }}
          >
            3–5 min
          </div>
          <div
            style={{
              width: 1,
              height: 44,
              backgroundColor: "rgba(244,247,242,0.25)",
            }}
          />
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 19,
              color: MUTED_LIGHT,
              maxWidth: 360,
              lineHeight: 1.4,
            }}
          >
            Avaliação clínica individualizada sob normas do CFM e emissão digital segura.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* --- SCENE 4: International Genetics & ANVISA Legalization --- */
const SceneOriginAnvisa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgZoom = interpolate(frame, [0, SCENE_LEN], [1.12, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const legalReveal = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050705" }}>
      <Img
        src="/galeria-9.jpg.png"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "75% center",
          transform: `scale(${imgZoom})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,7,5,0.94) 0%, rgba(5,7,5,0.78) 46%, rgba(5,7,5,0.14) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "60%",
          height: "100%",
          padding: "76px 84px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 15,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: LIME,
          }}
        >
          Resolução RDC nº 660/2022 · ANVISA
        </div>

        <KineticWords
          fontSize={64}
          startFrame={6}
          words={[
            { text: "Origem" },
            { text: "rastreável," },
            { text: "importação" },
            { text: "100%", accent: true, italic: true },
            { text: "legalizada.", accent: true, italic: true },
          ]}
        />

        <div
          style={{
            borderTop: "1px solid rgba(244,247,242,0.18)",
            paddingTop: 22,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: 17,
            color: MUTED_LIGHT,
            opacity: legalReveal,
          }}
        >
          <span>GreenBudz · FlowerMed · Pangaia · HighBreed Seeds</span>
          <span style={{ color: IVORY }}>Da semente ao paciente</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MecuraBrandFilm: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_LEN}>
          <SceneEssence />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANS_LEN })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_LEN}>
          <SceneAppScreens />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANS_LEN })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_LEN}>
          <SceneSpecialists />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS_LEN })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_LEN}>
          <SceneOriginAnvisa />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

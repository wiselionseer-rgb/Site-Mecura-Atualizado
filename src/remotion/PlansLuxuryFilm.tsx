import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { MecuraPlan } from "../data/clinicalScientificData";

export const PLANS_FILM_FPS = 30;
export const PLANS_FILM_DURATION = 240; // 8-second seamless luxury motion loop

interface PlanFilmConfig {
  eyebrow: string;
  title: string;
  accentWord: string;
  subtitle: string;
  bgPhoto: string;
  accentColor: string;
  glowColor: string;
  documents: string[];
  specialists: Array<{
    name: string;
    credential: string;
    avatar: string;
  }>;
}

const PLAN_FILM_CONFIG: Record<MecuraPlan["id"], PlanFilmConfig> = {
  basic: {
    eyebrow: "MODALIDADE 01 · ENTRADA IMEDIATA",
    title: "Consulta Essencial via",
    accentWord: "Chat Direto",
    subtitle:
      "Atendimento sem agenda com emissão rápida do seu Laudo Médico Inicial e Receitas Digitais ICP-Brasil (Nacional e Importado).",
    bgPhoto: "/hero-oil-still.jpg",
    accentColor: "#c4ff1a",
    glowColor: "rgba(196, 255, 26, 0.24)",
    documents: [
      "Laudo Médico Inicial",
      "Receita Nacional & Importado",
      "Protocolo de Dosagem",
    ],
    specialists: [
      {
        name: "Dr. Guilherme Taveira Dias",
        credential: "CRM/MT 17259",
        avatar: "/dr-guilherme.png",
      },
    ],
  },
  psychologist: {
    eyebrow: "MODALIDADE 02 · SAÚDE MENTAL",
    title: "Avaliação Clínica &",
    accentWord: "Laudo CRP",
    subtitle:
      "Escuta psicológica qualificada focada em ansiedade, estresse, humor e trauma — com emissão de Parecer Psicológico Oficial.",
    bgPhoto: "/galeria-9.jpg.png",
    accentColor: "#b8f28a",
    glowColor: "rgba(167, 243, 208, 0.22)",
    documents: [
      "Anamnese Psicológica",
      "Parecer Oficial CRP",
      "Reforço Documental p/ HC",
    ],
    specialists: [
      {
        name: "Marco Antônio Boastik",
        credential: "CRP 08/49215",
        avatar: "/assets/aistudio/image_ca75a6e7.png",
      },
    ],
  },
  premium: {
    eyebrow: "MODALIDADE 03 · MAIS PROCURADO · SUPORTE VIP 24H",
    title: "Acompanhamento VIP",
    accentWord: "Inicial + Evolutivo",
    subtitle:
      "Vídeo 45 min, Laudo Inicial + Laudo Evolutivo (90d), Receitas Nacional e Importado, Laudo Agronômico (CREA) e Suporte VIP 24h.",
    bgPhoto: "/grok-image-29e89451-033b-4b4f-a232-c734b224a8b1.png",
    accentColor: "#e4e087",
    glowColor: "rgba(228, 224, 135, 0.24)",
    documents: [
      "Laudo Inicial + Evolutivo",
      "Laudo Agronômico CREA",
      "Suporte VIP 24h",
    ],
    specialists: [
      {
        name: "Dr. Guilherme Taveira Dias",
        credential: "CRM/MT 17259",
        avatar: "/dr-guilherme.png",
      },
      {
        name: "Wilian Dalenogare Pereira",
        credential: "CREA-BA Nº 052193520-2",
        avatar: "/wilian.jpg",
      },
    ],
  },
  complete: {
    eyebrow: "MODALIDADE 04 · ESCOLHA Nº 1 · TUDO INCLUSO 360°",
    title: "Jornada Completa",
    accentWord: "Dossiê Triplo + 24h",
    subtitle:
      "Os 3 especialistas (Médico + Psicólogo + Agrônomo), Laudo Inicial + Evolutivo Duplo, Receitas Nacional & Importado e Concierge 24h.",
    bgPhoto: "/hero-oil-still.jpg",
    accentColor: "#c4ff1a",
    glowColor: "rgba(196, 255, 26, 0.34)",
    documents: [
      "Laudo Inicial + Evolutivo Duplo",
      "Dossiê CRM + CRP + CREA",
      "Concierge VIP 24h",
    ],
    specialists: [
      {
        name: "Dr. Guilherme Taveira Dias",
        credential: "CRM/MT 17259",
        avatar: "/dr-guilherme.png",
      },
      {
        name: "Marco Antônio Boastik",
        credential: "CRP 08/49215",
        avatar: "/assets/aistudio/image_ca75a6e7.png",
      },
      {
        name: "Wilian Dalenogare Pereira",
        credential: "CREA-BA Nº 052193520-2",
        avatar: "/wilian.jpg",
      },
    ],
  },
};

export interface PlansLuxuryFilmProps {
  activePlanId: MecuraPlan["id"];
}

export const PlansLuxuryFilm: React.FC<PlansLuxuryFilmProps> = ({
  activePlanId,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = PLAN_FILM_CONFIG[activePlanId] ?? PLAN_FILM_CONFIG.complete;

  // Seamless looping breathing wave (0 -> 1 -> 0 over 240 frames)
  const wave = Math.sin((frame / PLANS_FILM_DURATION) * Math.PI * 2);
  const slowZoom = interpolate(wave, [-1, 1], [1.03, 1.1]);
  const lightSweepX = interpolate(
    frame % PLANS_FILM_DURATION,
    [0, PLANS_FILM_DURATION],
    [-35, 135]
  );

  // Subtle orbital ring rotation
  const ringRotate = interpolate(frame, [0, PLANS_FILM_DURATION], [0, 360]);

  const enterSpring = spring({
    frame: frame % PLANS_FILM_DURATION < 15 ? frame : 18,
    fps,
    config: { damping: 24, stiffness: 110 },
  });

  const docFloat0 = Math.sin((frame / 40) * Math.PI) * 4;
  const docFloat1 = Math.sin(((frame + 26) / 40) * Math.PI) * 4;
  const docFloat2 = Math.sin(((frame + 52) / 40) * Math.PI) * 4;
  const docFloats = [docFloat0, docFloat1, docFloat2];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060a07",
        fontFamily: '"Outfit", system-ui, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* Background Cinematic Photography with Smooth Breathing Zoom */}
      <AbsoluteFill style={{ opacity: 0.34 }}>
        <Img
          src={cfg.bgPhoto}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${slowZoom})`,
          }}
        />
      </AbsoluteFill>

      {/* Luxury Obsidian Vignette + Emerald Radial Glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 65% 80% at 74% 48%, ${cfg.glowColor} 0%, rgba(7,12,9,0.72) 52%, rgba(6,10,7,0.97) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(6,10,7,0.96) 0%, rgba(6,10,7,0.82) 52%, rgba(6,10,7,0.45) 100%)",
        }}
      />

      {/* Diagonal Metallic Light Sheen Sweep */}
      <div
        style={{
          position: "absolute",
          top: -80,
          bottom: -80,
          left: `${lightSweepX}%`,
          width: 240,
          transform: "rotate(18deg)",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(196,255,26,0.06) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Architectural Rotating Geometric Emblem on Right */}
      <div
        style={{
          position: "absolute",
          right: 68,
          top: "50%",
          width: 340,
          height: 340,
          marginTop: -170,
          borderRadius: "50%",
          border: "1px solid rgba(196,255,26,0.14)",
          transform: `rotate(${ringRotate}deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 274,
            height: 274,
            borderRadius: "50%",
            border: "1px dashed rgba(243,247,244,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -4,
            left: "50%",
            marginLeft: -4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: cfg.accentColor,
            boxShadow: `0 0 18px ${cfg.accentColor}`,
          }}
        />
      </div>

      {/* Main Editorial Content Composition */}
      <AbsoluteFill
        style={{
          padding: "46px 64px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
        }}
      >
        {/* Left Copy Column */}
        <div
          style={{
            flex: "1 1 60%",
            maxWidth: 680,
            transform: `translateY(${(1 - enterSpring) * 10}px)`,
          }}
        >
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 12,
              letterSpacing: "0.22em",
              color: cfg.accentColor,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            {cfg.eyebrow}
          </div>

          <div
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 62,
              lineHeight: 0.98,
              color: "#f4f8f5",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: 18,
            }}
          >
            {cfg.title}{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: cfg.accentColor,
                textShadow: `0 0 32px ${cfg.glowColor}`,
              }}
            >
              {cfg.accentWord}
            </span>
          </div>

          <div
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(243,247,244,0.78)",
              maxWidth: 590,
              marginBottom: 28,
            }}
          >
            {cfg.subtitle}
          </div>

          {/* Floating Official Document Ribbons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {cfg.documents.map((doc, idx) => (
              <div
                key={doc}
                style={{
                  transform: `translateY(${docFloats[idx % 3]}px)`,
                  padding: "10px 18px",
                  borderRadius: 12,
                  backgroundColor: "rgba(13, 20, 16, 0.84)",
                  border: `1px solid ${
                    idx === 0
                      ? "rgba(196,255,26,0.45)"
                      : "rgba(243,247,244,0.14)"
                  }`,
                  color: "#f3f7f4",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  style={{
                    color: cfg.accentColor,
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: 12,
                  }}
                >
                  0{idx + 1}
                </span>
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Luxury Specialist Showcase Card(s) */}
        <div
          style={{
            flex: "0 0 390px",
            display: "flex",
            flexDirection: "column",
            gap: cfg.specialists.length >= 3 ? 10 : 14,
            zIndex: 4,
          }}
        >
          {cfg.specialists.map((spec, idx) => {
            const compact = cfg.specialists.length >= 3;
            return (
              <div
                key={spec.credential}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: compact ? 14 : 18,
                  padding: compact ? "11px 16px" : "16px 20px",
                  borderRadius: compact ? 16 : 20,
                  backgroundColor: "rgba(11, 18, 14, 0.9)",
                  border: "1px solid rgba(196, 255, 26, 0.28)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                  transform: `translateY(${
                    docFloats[idx % 3] * (compact ? 0.45 : 0.7)
                  }px)`,
                }}
              >
                <div
                  style={{
                    width: compact ? 54 : 70,
                    height: compact ? 54 : 70,
                    borderRadius: compact ? 12 : 16,
                    overflow: "hidden",
                    border: `1.5px solid ${cfg.accentColor}`,
                    flexShrink: 0,
                    backgroundColor: "#0c1410",
                  }}
                >
                  <Img
                    src={spec.avatar}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: compact ? 10 : 11,
                      letterSpacing: "0.14em",
                      color: cfg.accentColor,
                      marginBottom: 2,
                    }}
                  >
                    {spec.credential}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: compact ? 20 : 24,
                      color: "#f4f8f5",
                      lineHeight: 1.1,
                      fontWeight: 600,
                    }}
                  >
                    {spec.name}
                  </div>
                  {!compact && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(243,247,244,0.6)",
                        marginTop: 4,
                      }}
                    >
                      Assinatura oficial · Padrão ICP-Brasil
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div
            style={{
              padding: "10px 16px",
              borderRadius: 12,
              backgroundColor: "rgba(196,255,26,0.08)",
              border: "1px solid rgba(196,255,26,0.22)",
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 11,
              color: "rgba(243,247,244,0.84)",
              textAlign: "center",
              letterSpacing: "0.06em",
            }}
          >
            CFM · CFP · CREA · ANVISA RDC Nº 660/2022
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

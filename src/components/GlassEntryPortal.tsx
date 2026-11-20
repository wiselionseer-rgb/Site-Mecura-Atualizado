import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Crown,
  Droplets,
  FlaskConical,
  Instagram,
  MessageCircle,
  Newspaper,
  Sparkles,
  Sprout,
  Stethoscope,
  Wind,
  X,
} from "lucide-react";
import { BRAND } from "../data/mecuraContent";
import botanicalCanopyImg from "../assets/images/botanical_glass_canopy_1795193967807.jpg";

function publicMediaUrl(filename: string): string {
  return `${import.meta.env.BASE_URL}${encodeURIComponent(filename)}`;
}

const BROCOLIS_CLUB_URL = "https://www.brocolisclub.com.br/";

const PORTAL_MEDIA = {
  officialSiteVideo: publicMediaUrl("Logo_outro_animation_sequence_1080p_20260923174030.mp4"),
  officialSitePoster: "/hero-oil-still.jpg",
  consultationStudio: publicMediaUrl("FLOWERMED_bottles_and_gummies_pr…_a63e969c_2K.jpg"),
  newsCollage: publicMediaUrl("Vaporizações.jpg"),
  fertilizers: "/assets/aistudio/image_4d6771fb.png",
  extractionVideo: publicMediaUrl("extrações.mp4"),
  extractionRig: publicMediaUrl("Equipamento  extraços.jpg"),
  extractionLogo: publicMediaUrl("Equipamento de extração.jpg"),
  seedsHighbreed: publicMediaUrl("Whisk_0dc4c71167beee0ba7b4840785bc172bdr.png"),
  vaporizers: publicMediaUrl("Vaporização.jpg"),
  mentorias: publicMediaUrl("Mentorias.jpg"),
  brocolisClub: "/assets/aistudio/image_81c06caa.png",
} as const;

interface CuratedVerticalDetail {
  id: string;
  index: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  heroImage: string;
  heroPosition?: string;
  partnerBadgeImage?: string;
  partnerBadgeLabel?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  whatsappMessage: string;
  whatsappCta: string;
  siteSectionId: string;
  siteSectionLabel: string;
}

const CURATED_VERTICALS: Record<string, CuratedVerticalDetail> = {
  fertilizantes: {
    id: "fertilizantes",
    index: "04",
    kicker: "BKM Flowers · Bio Fertilizante JLF · Solo Vivo",
    title: "Os Melhores Fertilizantes do Mundo",
    subtitle:
      "Curadoria de nutrição orgânica em solo vivo (JLF — Jadam Liquid Fertilizer) e protocolos GACP de alta pureza.",
    description:
      "Selecionamos referências mundiais em nutrição botânica — com destaque para o Bio Fertilizante JLF (BKM Flowers), 100% natural e com alta carga microbiológica para solo vivo — promovendo estabilidade de canabinoides e terpenos sob orientação agronômica.",
    highlights: [
      "BKM Flowers JLF: fertilizante orgânico fermentado 100% natural para uso via solo vivo.",
      "Alta carga microbiológica e biodisponibilidade limpa para cultivo medicinal padrão GACP.",
      "Orientação técnica integrada com o Eng. Agrônomo Wilian Dalenogare Pereira (CREA-BA Nº 052193520-2).",
    ],
    heroImage: PORTAL_MEDIA.fertilizers,
    heroPosition: "object-[50%_46%]",
    whatsappMessage:
      "Olá! Acessei o Portal Mecura e gostaria de conhecer a curadoria dos melhores fertilizantes do mundo (BKM Flowers JLF / Solo Vivo) e protocolos GACP.",
    whatsappCta: "Consultar curadoria no WhatsApp",
    siteSectionId: "equipe",
    siteSectionLabel: "Ver suporte agronômico no site",
  },
  extracoes: {
    id: "extracoes",
    index: "05",
    kicker: "Bob Prensa Rosin · Solventless & Lab",
    title: "Equipamentos para Extrações",
    subtitle:
      "Prensas Rosin solventless, filtragem mícron e controle térmico de precisão para extratos puros.",
    description:
      "Em parceria com a Bob Prensa Rosin, oferecemos curadoria completa do processo de extração medicinal — da matéria-prima ao equipamento, análise e controle de temperatura — preservando terpenos voláteis e o efeito comitiva.",
    highlights: [
      "Prensas térmicas solventless Bob Prensa Rosin com controle digital de pressão e temperatura.",
      "Fluxo completo: matéria-prima selecionada, equipamento calibrado, processo e análise.",
      "Suporte consultivo sobre preservação molecular de CBD, THC, CBG e perfil terpênico.",
    ],
    heroImage: PORTAL_MEDIA.extractionRig,
    heroPosition: "object-center",
    partnerBadgeImage: PORTAL_MEDIA.extractionLogo,
    partnerBadgeLabel: "Bob Prensa Rosin",
    whatsappMessage:
      "Olá! Acessei o Portal Mecura e gostaria de receber informações sobre Equipamentos para Extrações (Bob Prensa Rosin).",
    whatsappCta: "Falar com especialista no WhatsApp",
    siteSectionId: "dados-cientificos",
    siteSectionLabel: "Ver dados científicos no site",
  },
  sementes: {
    id: "sementes",
    index: "06",
    kicker: "HighBreed Seeds · Espanha → Brasil",
    title: "Banco de Sementes Nacional e Europeu",
    subtitle:
      "Genéticas estabilizadas (CBD/THC) com rastreabilidade quimiotípica via rede internacional.",
    description:
      "Acesso orientado a bancos de sementes nacionais e europeus com linhagens estabilizadas, origem documentada e consistência entre a prescrição médica, o laudo agronômico e jornadas autorizadas de cultivo medicinal.",
    highlights: [
      "Rede internacional com destaque para HighBreed Seeds (Espanha → Brasil) e quimiotipos balanceados.",
      "Rastreabilidade genética alinhada ao cálculo de fitomassa GACP e suporte para Habeas Corpus.",
      "Integração completa com a prescrição digital e laudo pericial do Instituto Mecura.",
    ],
    heroImage: PORTAL_MEDIA.seedsHighbreed,
    heroPosition: "object-center",
    whatsappMessage:
      "Olá! Acessei o Portal Mecura e gostaria de saber mais sobre o Banco de Sementes Nacional e Europeu e genéticas HighBreed Seeds.",
    whatsappCta: "Solicitar orientação no WhatsApp",
    siteSectionId: "parceiros",
    siteSectionLabel: "Ver parceiros no site",
  },
  vaporizacao: {
    id: "vaporizacao",
    index: "07",
    kicker: "Cortez Imports · Redução de Danos",
    title: "Equipamentos para Vaporização de Flores e Extrações",
    subtitle:
      "Vaporizadores medicinais de convecção e e-rigs de precisão térmica para flores e concentrados.",
    description:
      "A vaporização medicinal substitui a combustão por aquecimento controlado entre 160 °C e 210 °C, liberando canabinoides e terpenos com biodisponibilidade imediata e expressiva redução de danos às vias respiratórias.",
    highlights: [
      "Linha premium de e-rigs e vaporizadores de convecção com câmara isolada de grau medicinal.",
      "Compatibilidade dedicada para flores secas, rosin e extrações puras sem combustão.",
      "Indicação personalizada conforme prescrição clínica e objetivo terapêutico do paciente.",
    ],
    heroImage: PORTAL_MEDIA.vaporizers,
    heroPosition: "object-[50%_42%]",
    whatsappMessage:
      "Olá! Acessei o Portal Mecura e gostaria de indicação de equipamentos para vaporização de flores e extrações.",
    whatsappCta: "Receber indicação no WhatsApp",
    siteSectionId: "patologias",
    siteSectionLabel: "Explorar tratamentos no site",
  },
  mentorias: {
    id: "mentorias",
    index: "08",
    kicker: "O Leão da Montanha · Educação & Prática",
    title: "Mentorias · O Leão da Montanha",
    subtitle:
      "Acompanhamento estratégico, formação prática e conexão direta com o ecossistema Instituto Mecura.",
    description:
      "Mentorias conduzidas em aliança com O Leão da Montanha para pacientes, cultivadores autorizados e entusiastas que buscam clareza técnica, segurança documental e domínio responsável de ponta a ponta.",
    highlights: [
      "Orientação personalizada sobre jornada terapêutica, cultivo medicinal e boas práticas.",
      "Integração direta com o corpo clínico, agronômico e jurídico do Instituto Mecura.",
      "Comunidade ativa e acompanhamento contínuo pelo Instagram e central no WhatsApp.",
    ],
    heroImage: PORTAL_MEDIA.mentorias,
    heroPosition: "object-[50%_35%]",
    instagramUrl: "https://www.instagram.com/___l340__d4___m0nt4nh4___/",
    instagramHandle: "@___l340__d4___m0nt4nh4___",
    whatsappMessage:
      "Olá! Acessei o Portal Mecura e gostaria de saber mais sobre as Mentorias com O Leão da Montanha.",
    whatsappCta: "Quero saber sobre Mentorias",
    siteSectionId: "equipe",
    siteSectionLabel: "Conhecer equipe no site",
  },
};

function useLiveBrazilClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" })
    .format(now)
    .replace("-feira", "")
    .toLowerCase();
  const day = String(now.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("pt-BR", { month: "short" })
    .format(now)
    .replace(".", "")
    .toLowerCase();

  return {
    time: `${hours}:${minutes}`,
    dateLine: `${weekday} | ${day} ${month}`,
  };
}

/* --- Liquid Water Surface Card (Cursor Ripples + Caustic Refraction + 3D Hydro Tilt + Mobile Touch Ripples) --- */

interface WaterRipple {
  id: number;
  x: number;
  y: number;
}

interface LiquidWaterCardProps {
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  delayIndex?: number;
  ambientWave?: boolean;
  className?: string;
  children: React.ReactNode;
}

const LiquidWaterCard: React.FC<LiquidWaterCardProps> = ({
  as = "button",
  href,
  onClick,
  delayIndex = 0,
  ambientWave = false,
  className = "",
  children,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const rippleIdRef = useRef(0);
  const lastHoverRippleRef = useRef(0);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [pointerGlow, setPointerGlow] = useState({ x: 50, y: 50, visible: false });

  const spawnRipple = useCallback((clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const id = ++rippleIdRef.current;
    setRipples((prev) => [...prev.slice(-2), { id, x, y }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1250);
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      spawnRipple(e.clientX, e.clientY);
      lastHoverRippleRef.current = Date.now();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    setPointerGlow({
      x: Math.round(relX * 100),
      y: Math.round(relY * 100),
      visible: true,
    });

    // Gentle floating-on-water buoyancy tilt
    setTilt({
      rotateX: (0.5 - relY) * 6.5,
      rotateY: (relX - 0.5) * 7.5,
    });

    // Emit subtle trailing droplet ripple while gliding across the surface
    const now = Date.now();
    if (now - lastHoverRippleRef.current > 760) {
      lastHoverRippleRef.current = now;
      spawnRipple(e.clientX, e.clientY);
    }
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setPointerGlow((prev) => ({ ...prev, visible: false }));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    spawnRipple(e.clientX, e.clientY);
  };

  const sharedMotionProps = {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: tilt.rotateX,
      rotateY: tilt.rotateY,
    },
    transition: {
      opacity: {
        duration: 0.56,
        delay: 0.08 + delayIndex * 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      },
      y: {
        duration: 0.56,
        delay: 0.08 + delayIndex * 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      },
      rotateX: { type: "spring" as const, stiffness: 170, damping: 20, mass: 0.7 },
      rotateY: { type: "spring" as const, stiffness: 170, damping: 20, mass: 0.7 },
    },
    onPointerEnter: handlePointerEnter,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    onPointerDown: handlePointerDown,
    style: { transformPerspective: 900 },
    className: `${className} [transform-style:preserve-3d]`,
  };

  const waterLayers = (
    <>
      {/* Cursor-Tracked Liquid Light Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-300"
        style={{
          opacity: pointerGlow.visible ? 1 : 0,
          background: `radial-gradient(230px circle at ${pointerGlow.x}% ${pointerGlow.y}%, rgba(226, 255, 168, 0.24) 0%, rgba(196, 255, 26, 0.09) 42%, transparent 72%)`,
        }}
      />

      {/* Flowing Sunlit Water Caustic Wave */}
      <div
        aria-hidden="true"
        className={`mecura-water-caustic-wave z-[6] ${
          ambientWave ? "mecura-water-caustic-ambient" : ""
        }`}
      />

      {/* Concentric Expanding Liquid Ripples */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[7] overflow-hidden">
        {ripples.map((r) => (
          <React.Fragment key={r.id}>
            <span
              className="mecura-water-ripple-ring"
              style={{ left: r.x, top: r.y }}
            />
            <span
              className="mecura-water-ripple-echo"
              style={{ left: r.x, top: r.y }}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );

  if (as === "a" && href) {
    return (
      <motion.a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedMotionProps}
      >
        {children}
        {waterLayers}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={cardRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...sharedMotionProps}
    >
      {children}
      {waterLayers}
    </motion.button>
  );
}

function CardBackgroundVideo({
  videoSrc,
  posterImage,
}: {
  videoSrc: string;
  posterImage: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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
      el.muted = true;
      el.play().catch(() => {});
    };

    tryPlay();

    const onGesture = () => {
      if (el.paused) tryPlay();
    };

    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("pointerdown", onGesture, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
    };
  }, [videoSrc]);

  return (
    <>
      <img
        src={posterImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
      />
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
        onPlaying={() => setPlaying(true)}
        onTimeUpdate={(e) => {
          if (!playing && e.currentTarget.currentTime > 0.04) {
            setPlaying(true);
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 pointer-events-none select-none ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </>
  );
}

export function GlassEntryPortal({
  todayNewsCount,
  onEnterSite,
  onEnterNews,
  onEnterSection,
}: {
  todayNewsCount: number;
  onEnterSite: () => void;
  onEnterNews: () => void;
  onEnterSection: (sectionId: string) => void;
}) {
  const { time, dateLine } = useLiveBrazilClock();
  const [activeDetailKey, setActiveDetailKey] = useState<string | null>(null);
  const [canopyFailed, setCanopyFailed] = useState(false);

  const activeDetail = activeDetailKey ? CURATED_VERTICALS[activeDetailKey] : null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeDetailKey) {
          setActiveDetailKey(null);
        } else {
          onEnterSite();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeDetailKey, onEnterSite]);

  const buildWhatsappHref = (message: string) =>
    `${BRAND.whatsappUrl}?text=${encodeURIComponent(message)}`;

  const ecosystemCards = [
    {
      id: "fertilizantes",
      index: "04",
      kicker: "04 · BKM Flowers · JLF",
      title: "Os Melhores Fertilizantes do Mundo",
      desc: "Bio fertilizante orgânico para solo vivo e padrão GACP.",
      cta: "Ver curadoria",
      image: PORTAL_MEDIA.fertilizers,
      imgPos: "object-[50%_46%]",
      icon: Droplets,
      accentKicker: true,
      href: undefined as string | undefined,
      isVideo: false,
    },
    {
      id: "extracoes",
      index: "05",
      kicker: "05 · Bob Prensa Rosin",
      title: "Equipamentos para Extrações",
      desc: "Prensas Rosin solventless e controle térmico.",
      cta: "Ver curadoria",
      image: PORTAL_MEDIA.extractionRig,
      imgPos: "object-center",
      icon: FlaskConical,
      accentKicker: true,
      href: undefined as string | undefined,
      isVideo: true,
    },
    {
      id: "sementes",
      index: "06",
      kicker: "06 · HighBreed Seeds",
      title: "Banco de Sementes Nacional e Europeu",
      desc: "Genéticas estabilizadas CBD/THC rastreadas.",
      cta: "Ver curadoria",
      image: PORTAL_MEDIA.seedsHighbreed,
      imgPos: "object-center",
      icon: Sprout,
      accentKicker: false,
      href: undefined as string | undefined,
      isVideo: false,
    },
    {
      id: "vaporizacao",
      index: "07",
      kicker: "07 · Redução de Danos",
      title: "Equipamentos para Vaporização de Flores e Extrações",
      desc: "Convecção medicinal e preservação de terpenos.",
      cta: "Ver curadoria",
      image: PORTAL_MEDIA.vaporizers,
      imgPos: "object-[50%_42%]",
      icon: Wind,
      accentKicker: false,
      href: undefined as string | undefined,
      isVideo: false,
    },
    {
      id: "mentorias",
      index: "08",
      kicker: "08 · Mentorias",
      title: "Mentorias · O Leão da Montanha",
      desc: "Formação prática e acompanhamento no ecossistema Mecura.",
      cta: "Ver mentoria",
      image: PORTAL_MEDIA.mentorias,
      imgPos: "object-[50%_38%]",
      icon: Crown,
      accentKicker: true,
      href: undefined as string | undefined,
      isVideo: false,
    },
    {
      id: "brocolis",
      index: "09",
      kicker: "09 · São Paulo · Club",
      title: "O Melhor Club de São Paulo · Brocolis",
      desc: "Cultura, comunidade e experiências exclusivas no Brocolis Club.",
      cta: "Acessar Brocolis Club",
      image: PORTAL_MEDIA.brocolisClub,
      imgPos: "object-center",
      icon: Sparkles,
      accentKicker: true,
      href: BROCOLIS_CLUB_URL,
      isVideo: false,
    },
  ];

  const renderEcosystemCard = (
    card: (typeof ecosystemCards)[number],
    idx: number
  ) => {
    const Icon = card.icon;
    return (
      <LiquidWaterCard
        key={card.id}
        as={card.href ? "a" : "button"}
        href={card.href}
        onClick={card.href ? undefined : () => setActiveDetailKey(card.id)}
        delayIndex={3 + idx}
        ambientWave={idx % 2 === 0}
        className="mecura-liquid-card mecura-mobile-buoy group text-left rounded-[20px] overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[182px] sm:min-h-[186px] cursor-pointer"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 overflow-hidden opacity-80 group-hover:opacity-95 transition-opacity"
        >
          {card.isVideo ? (
            <CardBackgroundVideo
              videoSrc={PORTAL_MEDIA.extractionVideo}
              posterImage={PORTAL_MEDIA.extractionRig}
            />
          ) : (
            <img
              src={card.image}
              alt=""
              className={`w-full h-full object-cover ${card.imgPos} transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030b06]/96 via-[#051009]/62 to-[#040d07]/28" />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-2">
          <span
            className={`font-mono text-[9.5px] tracking-[0.14em] uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] ${
              card.accentKicker ? "text-accent/95" : "text-white/85"
            }`}
          >
            {card.kicker}
          </span>
          <span className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-accent shrink-0">
            <Icon className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="relative z-10 mt-auto pt-7">
          <h3 className="font-display text-[1.26rem] sm:text-[1.32rem] font-medium leading-[1.1] text-white group-hover:text-accent transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            {card.title}
          </h3>
          <p className="mt-1 text-[11.5px] text-white/82 leading-snug line-clamp-2">
            {card.desc}
          </p>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-accent">
            <span>{card.cta}</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </LiquidWaterCard>
    );
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Portal de Entrada Instituto Mecura"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.025,
        filter: "blur(8px)",
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-[#040a06]"
    >
      {/* Full-Bleed Lush Botanical Foliage Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {!canopyFailed ? (
          <img
            src={botanicalCanopyImg}
            alt=""
            aria-hidden="true"
            onError={() => setCanopyFailed(true)}
            className="w-full h-full object-cover object-center mecura-canopy-drift"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,#274d24_0%,#0c2013_50%,#040a06_100%)]" />
        )}

        {/* Warm Sunlit Canopy Bokeh & Balanced Contrast Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 68% 54% at 18% 12%, rgba(214, 255, 110, 0.22) 0%, rgba(196, 255, 26, 0.05) 38%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4, 12, 7, 0.34) 0%, rgba(4, 12, 7, 0.26) 45%, rgba(3, 9, 5, 0.72) 100%)",
          }}
        />
      </div>

      {/* Centered Architectural Liquid Glass Stage */}
      <div className="relative z-10 min-h-[100dvh] w-full flex items-center justify-center px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.988 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="mecura-liquid-stage w-full max-w-[1260px] rounded-[28px] sm:rounded-[36px] p-4 sm:p-6 lg:p-7 overflow-hidden"
        >
          {/* Delicate Sunlit Specular Glow Inside the Glass */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(220,255,130,0.22)_0%,transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-10 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(196,255,26,0.12)_0%,transparent_72%)] blur-3xl"
          />

          {/* Compact Luxury Header Inside Liquid Glass */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 sm:pb-5 border-b border-white/14">
            <div className="space-y-1 max-w-2xl">
              <p className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] text-accent/95">
                Instituto Mecura · Ecossistema Canabinoide
              </p>
              <h1 className="font-display text-[1.95rem] sm:text-4xl lg:text-[2.7rem] font-medium leading-[1.0] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.38)]">
                A pureza da <span className="italic text-accent">natureza</span>, em um só acesso.
              </h1>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                Escolha para onde deseja ir agora — site oficial, consulta médica imediata, redação ao vivo ou nossa curadoria.
              </p>
            </div>

            {/* Smoked-Glass Live Clock Widget + Quick Direct Entry */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
              <div className="mecura-liquid-clock rounded-2xl px-3.5 py-2 sm:px-5 sm:py-2.5 text-left sm:text-right">
                <div className="font-sans font-light text-2xl sm:text-[2.1rem] leading-none tracking-[-0.03em] text-white tabular-nums">
                  {time}
                </div>
                <div className="mt-1 text-[10.5px] sm:text-[11px] font-normal tracking-[0.04em] text-white/75 capitalize">
                  {dateLine}
                </div>
              </div>

              <button
                type="button"
                onClick={onEnterSite}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/12 hover:bg-white/20 border border-white/22 text-xs font-medium text-white/95 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Entrar no site</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>
          </div>

          {/* ROW 1: 3 Flagship Destinations — 01 Site Oficial FIRST! */}
          <div className="relative z-10 mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Card 01 (FIRST!): Site Oficial with Live Animated Mecura Logo Video */}
            <LiquidWaterCard
              as="button"
              onClick={onEnterSite}
              delayIndex={0}
              ambientWave
              className="mecura-liquid-card group text-left rounded-[22px] overflow-hidden min-h-[188px] sm:min-h-[196px] flex flex-col justify-between p-5 cursor-pointer mecura-mobile-buoy"
            >
              {/* Animated Official Mecura Logo Video Backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 overflow-hidden opacity-88 group-hover:opacity-100 transition-opacity"
              >
                <CardBackgroundVideo
                  videoSrc={PORTAL_MEDIA.officialSiteVideo}
                  posterImage={PORTAL_MEDIA.officialSitePoster}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040c07]/92 via-[#05120b]/48 to-[#05140c]/28" />
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                  01 · Instituto Mecura
                </span>
                <span className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/22 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-ink transition-colors shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-7">
                <h2 className="font-display text-2xl sm:text-[1.6rem] font-medium leading-[1.08] text-white group-hover:text-accent transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
                  Site Oficial
                </h2>
                <p className="mt-1.5 text-xs text-white/84 leading-relaxed line-clamp-2">
                  Conheça o app, planos, evidências científicas, associações e jurídico.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-medium text-white/95 group-hover:text-accent transition-colors">
                  <span>Acessar experiência completa</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </LiquidWaterCard>

            {/* Card 02: Consulta Imediata (Primary Neon-Glass Spotlight) */}
            <LiquidWaterCard
              as="a"
              href={BRAND.appUrl}
              delayIndex={1}
              className="mecura-liquid-card-accent group text-left rounded-[22px] overflow-hidden min-h-[188px] sm:min-h-[196px] flex flex-col justify-between p-5 cursor-pointer"
            >
              {/* Emerald Studio Medicinal Drops & Gummies Backdrop */}
              <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={PORTAL_MEDIA.consultationStudio}
                  alt=""
                  className="w-full h-full object-cover object-[50%_46%] opacity-76 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-88 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051208]/95 via-[#07190c]/58 to-[#081d0e]/30" />
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
                  02 · Telemedicina · 5 a 45 min
                </span>
                <span className="w-8 h-8 rounded-full bg-accent text-accent-ink flex items-center justify-center shadow-[0_0_22px_rgba(196,255,26,0.5)] shrink-0">
                  <Stethoscope className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-7">
                <h2 className="font-display text-2xl sm:text-[1.6rem] font-medium leading-[1.08] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
                  Consulta Imediata
                </h2>
                <p className="mt-1.5 text-xs text-white/86 leading-relaxed line-clamp-2">
                  Receita digital e laudo médico com prescritores especialistas pelo app Mecura.
                </p>
                <div className="mt-3 pt-2.5 border-t border-accent/30 flex items-center justify-between text-xs font-semibold text-accent">
                  <span>Iniciar consulta no aplicativo</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </LiquidWaterCard>

            {/* Card 03: Notícias do Mundo Canábico */}
            <LiquidWaterCard
              as="button"
              onClick={onEnterNews}
              delayIndex={2}
              className="mecura-liquid-card group text-left rounded-[22px] overflow-hidden min-h-[188px] sm:min-h-[196px] flex flex-col justify-between p-5 cursor-pointer"
            >
              {/* Photographic Backdrop */}
              <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={PORTAL_MEDIA.newsCollage}
                  alt=""
                  className="w-full h-full object-cover object-[50%_68%] opacity-68 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-82 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040c07]/96 via-[#051009]/66 to-[#051109]/40" />
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                  03 · Redação ao vivo{todayNewsCount > 0 ? ` · ${todayNewsCount} hoje` : ""}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/22 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-ink transition-colors shrink-0">
                  <Newspaper className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-7">
                <h2 className="font-display text-2xl sm:text-[1.6rem] font-medium leading-[1.08] text-white group-hover:text-accent transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
                  Notícias do Mundo Canábico
                </h2>
                <p className="mt-1.5 text-xs text-white/82 leading-relaxed line-clamp-2">
                  20 portais do Brasil e do mundo atualizados em tempo real.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-medium text-white/92 group-hover:text-accent transition-colors">
                  <span>Abrir redação agora</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </LiquidWaterCard>
          </div>

          {/* Unified Sequential Liquid Glass Grid (04–09 directly following 01–03 on Mobile & Desktop) */}
          <div className="relative z-10 mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ecosystemCards.map((card, idx) => renderEcosystemCard(card, idx))}
          </div>

          {/* Quiet Glass Footer Strip */}
          <div className="relative z-10 mt-4 sm:mt-5 pt-3.5 border-t border-white/12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/74">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="font-display text-base font-semibold tracking-[0.08em] text-white">
                {BRAND.shortName}
              </span>
              <span aria-hidden="true" className="text-white/35">
                ·
              </span>
              <span>ANVISA RDC nº 660/2022 · LGPD · CFM</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent transition-colors whitespace-nowrap"
              >
                <Instagram className="w-3.5 h-3.5 text-accent" />
                <span>{BRAND.instagramHandle}</span>
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-accent transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-accent" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Liquid Glass Curated Detail Modal for Verticals 04–08 */}
      <AnimatePresence>
        {activeDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActiveDetailKey(null)}
            className="fixed inset-0 z-[80] bg-black/68 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mecura-liquid-sheet relative w-full max-w-xl rounded-[28px] overflow-hidden text-white my-auto"
            >
              {/* Visual Artwork Header Inside Modal */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#06110a]">
                <img
                  src={activeDetail.heroImage}
                  alt={activeDetail.title}
                  className={`w-full h-full object-cover ${activeDetail.heroPosition ?? "object-center"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08160d] via-[#08160d]/35 to-black/30" />

                {activeDetail.partnerBadgeImage && (
                  <div className="absolute bottom-3.5 left-5 flex items-center gap-2.5 bg-black/65 backdrop-blur-md border border-white/18 rounded-xl px-2.5 py-1.5">
                    <img
                      src={activeDetail.partnerBadgeImage}
                      alt={activeDetail.partnerBadgeLabel ?? ""}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="text-xs font-semibold text-white">
                      {activeDetail.partnerBadgeLabel}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setActiveDetailKey(null)}
                  aria-label="Fechar detalhes"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md border border-white/22 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-7 pt-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                  {activeDetail.index} · {activeDetail.kicker}
                </p>

                <h3 className="mt-2 font-display text-2xl sm:text-[1.95rem] font-medium leading-[1.08] text-white">
                  {activeDetail.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-white/86 font-medium leading-relaxed">
                  {activeDetail.subtitle}
                </p>

                <p className="mt-2.5 text-xs sm:text-sm text-white/74 leading-relaxed">
                  {activeDetail.description}
                </p>

                <ul className="mt-4 space-y-2 border-t border-white/12 pt-4">
                  {activeDetail.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/85 leading-relaxed"
                    >
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-accent/18 border border-accent/45 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-accent" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5">
                  <a
                    href={buildWhatsappHref(activeDetail.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-ink text-xs sm:text-sm font-semibold hover:bg-accent-hover transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{activeDetail.whatsappCta}</span>
                  </a>

                  {activeDetail.instagramUrl && activeDetail.instagramHandle && (
                    <a
                      href={activeDetail.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/18 border border-white/20 text-xs font-medium text-white transition-colors whitespace-nowrap"
                    >
                      <Instagram className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{activeDetail.instagramHandle}</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const target = activeDetail.siteSectionId;
                      setActiveDetailKey(null);
                      onEnterSection(target);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/16 border border-white/20 text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{activeDetail.siteSectionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

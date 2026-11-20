import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Menu,
  MessageCircle,
  Plus,
  X,
  ZoomIn,
} from "lucide-react";
import {
  BRAND,
  CLINICAL_TRACKS,
  PROCESS_PILLARS,
  TEAM_MEMBERS,
  type ModalContentKey,
} from "./data/mecuraContent";
import { SmoothScroll } from "./components/SmoothScroll";
import { EditorialManifesto } from "./components/EditorialManifesto";
import { RemotionCinema } from "./components/RemotionCinema";
import { StickyAppWalkthrough } from "./components/StickyAppWalkthrough";
import { InfoDrawer } from "./components/InfoDrawer";
import { NewsBlogSection } from "./components/NewsBlogSection";
import { PartnersShowcase } from "./components/PartnersShowcase";
import { AssociationsSection } from "./components/AssociationsSection";
import {
  InteractivePopupModal,
  type InteractivePopupPayload,
} from "./components/InteractivePopupModal";

/* --- Parallax Photographic Frame (Unboxed Editorial) --- */

function ParallaxPhoto({
  src,
  alt,
  className = "",
  imgPosition = "object-center",
  fitMode = "parallax",
  onInspect,
}: {
  src: string;
  alt: string;
  className?: string;
  imgPosition?: string;
  fitMode?: "parallax" | "poster";
  onInspect?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const zoom = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.1]);

  return (
    <div
      ref={ref}
      onClick={onInspect}
      role={onInspect ? "button" : undefined}
      tabIndex={onInspect ? 0 : undefined}
      onKeyDown={
        onInspect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onInspect();
              }
            }
          : undefined
      }
      aria-label={onInspect ? `Ampliar: ${alt}` : undefined}
      className={`group relative overflow-hidden bg-surface ${
        onInspect ? "cursor-zoom-in" : ""
      } ${className}`}
    >
      {!failed ? (
        fitMode === "poster" ? (
          <motion.img
            initial={{ opacity: 0.85, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imgPosition}`}
          />
        ) : (
          <motion.img
            style={{ y, scale: zoom }}
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${imgPosition}`}
          />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center p-8 bg-surface-pine text-text-secondary font-display">
          {alt}
        </div>
      )}

      {onInspect && (
        <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-background/80 backdrop-blur-md border border-white/15 text-[11px] font-medium text-text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5 text-accent" />
          <span>Ampliar</span>
        </div>
      )}
    </div>
  );
}

/* --- 3-Zone Editorial Top Bar --- */

function TopBar({ onOpenLegal }: { onOpenLegal: (key: ModalContentKey) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "O Filme", href: "#filme" },
    { label: "O App", href: "#app" },
    { label: "A Jornada", href: "#jornada" },
    { label: "Ciência", href: "#ciencia" },
    { label: "Blog", href: "#blog" },
    { label: "Jurídico", href: "#juridico" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#inicio"
            className="font-display text-xl font-semibold tracking-tight text-text-primary hover:text-accent transition-colors whitespace-nowrap shrink-0"
          >
            {BRAND.shortName}
          </a>

          {/* Zone 2: 5 clean text nav links */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-8 text-sm text-text-secondary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-text-primary transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BRAND.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
            >
              <span>{BRAND.ctaCompact}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="lg:hidden w-10 h-10 rounded-full border border-white/15 bg-background/60 backdrop-blur-md flex items-center justify-center text-text-primary cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        <motion.div
          style={{ scaleX }}
          className="h-[1.5px] bg-accent origin-left w-full"
        />
      </header>

      {/* Fullscreen Editorial Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-text-primary">
                {BRAND.shortName}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-primary cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 my-auto">
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-text-primary hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenLegal("termos");
                }}
                className="text-left font-display text-3xl text-text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                ANVISA · RDC 660
              </button>
            </nav>

            <div className="space-y-5 pt-6 border-t border-border">
              <a
                href={BRAND.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 px-5 rounded-full bg-accent text-accent-ink font-semibold text-sm text-center"
              >
                <span>{BRAND.ctaFull}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {BRAND.instagramHandle}
                </a>
                <a href={BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {BRAND.whatsappDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* --- Act 1: Pure Cinema Full-Bleed Hero --- */

function HeroCinema() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.12]);

  useEffect(() => {
    const play = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    };
    play();
    window.addEventListener("touchstart", play, { once: true });
    window.addEventListener("click", play, { once: true });
    return () => {
      window.removeEventListener("touchstart", play);
      window.removeEventListener("click", play);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-between pt-28 pb-10 px-6 lg:px-12 overflow-hidden"
    >
      {/* Full-bleed Ambient Botanical Film */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none bg-background"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/MECURA_app_editorial_cover_design_2K_20260927234936.jpg"
          className="w-full h-full object-cover"
        >
          <source
            src={`${import.meta.env.BASE_URL}Cannabis_oil_bottle_on_moss_202608201452.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/88 via-background/52 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/55" />
      </motion.div>

      {/* Center / Lower-left Editorial Composition */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-[1380px] w-full mx-auto my-auto pt-12 pb-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm uppercase tracking-[0.22em] text-accent mb-7"
        >
          Instituto Mecura · Medicina Canabinoide
        </motion.p>

        <h1 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-text-primary text-[clamp(2.75rem,6.8vw,6.2rem)] max-w-5xl">
          <span className="block overflow-hidden pb-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              A pureza da <span className="italic text-accent">natureza</span>,
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              guiada pela ciência.
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
            Consultas com médicos prescritores e importação legalizada pela ANVISA (RDC nº 660/2022) direto pelo aplicativo Mecura.
          </p>

          <a
            href={BRAND.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-accent text-accent-ink font-semibold text-sm sm:text-base hover:bg-accent-hover active:scale-[0.98] transition-all shadow-[0_16px_50px_rgba(196,255,26,0.24)] shrink-0"
          >
            <span>{BRAND.ctaFull}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </motion.div>
      </motion.div>

      {/* Quiet Editorial Footer Bar inside Hero */}
      <div className="relative z-10 max-w-[1380px] w-full mx-auto pt-6 border-t border-white/12 flex items-center justify-between gap-4 text-xs text-text-secondary">
        <span>100% legalizado pela ANVISA · Diretrizes LGPD &amp; CFM</span>
        <a
          href="#filme"
          className="inline-flex items-center gap-2 text-text-primary hover:text-accent transition-colors whitespace-nowrap"
        >
          <span>Explorar</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

/* --- Act 5: Iconic Full-Bleed Lime Brand Section (Matches Brand Slide!) --- */

function ConnectedJourneyLime({
  onOpenPopup,
}: {
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}) {
  const pillarImages = [
    "/screen-triagem.jpg",
    "/screen-clinico.jpg",
    "/galeria-9.jpg.png",
    "/screen-fila.jpg",
  ];

  return (
    <section
      id="jornada"
      className="py-24 sm:py-32 lg:py-40 px-6 lg:px-12 bg-accent text-forest"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/70 mb-5">
              Como o Instituto atua
            </p>
            <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight text-forest">
              Uma jornada. Diferentes áreas{" "}
              <span className="italic">conectadas</span>.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-forest/80 leading-relaxed">
              Do acolhimento inicial à chegada do medicamento no Brasil, você não caminha sozinho. Clique em qualquer etapa para explorar os detalhes.
            </p>
          </div>
        </div>

        {/* Clean Unboxed Interactive Editorial List on Lime */}
        <div className="border-t border-forest/20">
          {PROCESS_PILLARS.map((pillar, idx) => (
            <motion.button
              key={pillar.number}
              type="button"
              onClick={() =>
                onOpenPopup({
                  kind: "feature",
                  tag: `Etapa ${pillar.number} · Jornada Mecura`,
                  title: pillar.title,
                  description: pillar.description,
                  image: pillarImages[idx],
                  imageAlt: pillar.title,
                  points: [
                    "Atendimento 100% digital e humanizado pelo aplicativo Mecura.",
                    "Receita e laudo médico emitidos em 3 a 5 minutos após avaliação.",
                    "Importação amparada pela Resolução ANVISA RDC nº 660/2022.",
                  ],
                })
              }
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group w-full text-left grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 sm:py-10 border-b border-forest/20 items-baseline cursor-pointer hover:bg-forest/[0.04] transition-colors px-2 -mx-2"
            >
              <div className="md:col-span-2 font-mono text-sm font-semibold text-forest/65 tabular-nums">
                {pillar.number}
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-forest group-hover:translate-x-2 transition-transform duration-300">
                  {pillar.title}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-base text-forest/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <ArrowUpRight className="w-5 h-5 text-forest/70 group-hover:text-forest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <a
            href={BRAND.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-forest text-accent font-semibold text-sm sm:text-base hover:bg-forest/90 active:scale-[0.98] transition-all"
          >
            <span>{BRAND.ctaFull}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>

          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            <span>Conversar com a Central de Apoio</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* --- Act 6: Photographic Editorial Spreads + Quiet Science Index --- */

function PhotographicSpreadsAndScience({
  onOpenPopup,
}: {
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}) {
  const [openTrack, setOpenTrack] = useState<string>(CLINICAL_TRACKS[0].id);

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-background">
      <div className="max-w-[1280px] mx-auto space-y-32 lg:space-y-44">
        {/* Spread 1: Broken-Grid Specialists & Lifestyle Photography (Full Native Ratios — Zero Cut) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <ParallaxPhoto
              src="/Imagem do ChatGPT 28 de set. de 2026, 00_22_08.png"
              alt="Especialistas do Instituto Mecura prontos para acolher pacientes"
              className="aspect-[4/5] w-full"
              imgPosition="object-center"
              fitMode="poster"
              onInspect={() =>
                onOpenPopup({
                  kind: "media",
                  tag: "Acolhimento & Central de Apoio",
                  title: "Você não precisa saber por onde começar.",
                  description:
                    "Nossa equipe multidisciplinar guia cada paciente desde a primeira dúvida até a emissão da receita, autorização da ANVISA e acompanhamento contínuo da dosagem.",
                  image: "/Imagem do ChatGPT 28 de set. de 2026, 00_22_08.png",
                  imageAlt: "Especialistas do Instituto Mecura",
                  points: [
                    "Orientação especializada sem julgamentos.",
                    "Plano terapêutico individualizado.",
                    "Suporte humano direto pelo WhatsApp.",
                  ],
                })
              }
            />
            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-t border-border pt-5">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary">
                Você não precisa saber por onde começar.
              </h3>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-text-primary transition-colors whitespace-nowrap shrink-0"
              >
                Falar com acolhimento →
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:mt-16">
            <ParallaxPhoto
              src="/unnamed.jpg"
              alt="Paciente segurando celular com o aplicativo Instituto Mecura"
              className="aspect-[9/16] w-full max-w-[420px] lg:max-w-none mx-auto"
              imgPosition="object-top"
              fitMode="poster"
              onInspect={() =>
                onOpenPopup({
                  kind: "media",
                  tag: "Comunidade Mecura · @mecura.app",
                  title: "Seu tratamento na palma da mão.",
                  description:
                    "Acompanhe conteúdos educativos sobre Medicina Canabinoide, depoimentos, novidades regulatórias e orientações diretas no perfil oficial @mecura.app.",
                  image: "/unnamed.jpg",
                  imageAlt: "Paciente com o aplicativo Instituto Mecura",
                  ctaLabel: "Seguir @mecura.app no Instagram",
                  ctaHref: BRAND.instagramUrl,
                })
              }
            />
            <div className="mt-6 border-t border-border pt-5 flex items-baseline justify-between gap-4">
              <p className="text-sm text-text-secondary">
                Conteúdo educativo, histórias reais e orientações diárias no nosso Instagram.
              </p>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-accent transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-4 h-4 text-accent" />
                <span>{BRAND.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Spread 2: Editorial Science & Therapeutic Index (Zero Fake Graphs) */}
        <div id="ciencia" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-5">
              Ciência &amp; Indicações
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.06] tracking-tight mb-6">
              Sistema Endocanabinoide e cuidado{" "}
              <span className="italic text-accent">individualizado</span>.
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-8">
              Não existe protocolo padrão. Cada paciente passa por avaliação clínica detalhada para definir a relação CBD/THC, a via de administração e a titulação segura para sua rotina.
            </p>
            <a
              href={BRAND.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-text-primary transition-colors"
            >
              <span>Iniciar avaliação clínica</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-7 border-t border-border">
            {CLINICAL_TRACKS.map((track, idx) => {
              const isOpen = openTrack === track.id;
              return (
                <div key={track.id} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenTrack(isOpen ? "" : track.id)}
                    aria-expanded={isOpen}
                    className="w-full py-7 flex items-center justify-between gap-6 text-left group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-text-muted tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-medium text-text-primary group-hover:text-accent transition-colors">
                        {track.category}
                      </span>
                    </div>
                    <Plus
                      className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-0 sm:pl-9 space-y-5">
                          <p className="text-base text-text-secondary leading-relaxed">
                            {track.summary}
                          </p>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-primary">
                            {track.conditions.map((cond) => (
                              <span key={cond} className="inline-flex items-center gap-2">
                                <span className="text-accent">·</span>
                                {cond}
                              </span>
                            ))}
                          </div>
                          <p className="font-mono text-xs text-text-muted pt-2">
                            Vias de atuação: {track.receptors} — {track.mechanism}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spread 3: International Partners (Equal Size, Color-Balanced, Motion Pop-ups) */}
        <PartnersShowcase onOpenPopup={onOpenPopup} />
      </div>
    </section>
  );
}

/* --- Staggered Editorial Team Section --- */

function TeamEditorial({
  onOpenPopup,
}: {
  onOpenPopup: (payload: InteractivePopupPayload) => void;
}) {
  const offsets = ["md:mt-0", "md:mt-16", "md:mt-8"];

  return (
    <section
      id="equipe"
      className="py-24 lg:py-36 px-6 lg:px-12 bg-surface border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-5">
            Quem conduz o Mecura
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.06]">
            Especialistas com propósito e{" "}
            <span className="italic text-accent">rigor clínico</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col ${offsets[idx]}`}
            >
              <ParallaxPhoto
                src={member.image}
                alt={`${member.name} — ${member.role}`}
                className="aspect-[3/4] w-full mb-6"
                imgPosition="object-top"
                onInspect={() =>
                  onOpenPopup({
                    kind: "media",
                    tag: `${member.role} · ${member.credential}`,
                    title: member.name,
                    description: member.bio,
                    image: member.image,
                    imageAlt: `${member.name} — ${member.role}`,
                  })
                }
              />
              <div className="border-t border-border pt-5">
                <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">
                  {member.role}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Act 7: Editorial Legal Shield & Transparency Band (Unboxed, Zero Video Overlap) --- */

function LegalTransparencyBand({
  onOpenLegal,
}: {
  onOpenLegal: (key: ModalContentKey) => void;
}) {
  const legalDocs: Array<{
    key: ModalContentKey;
    code: string;
    title: string;
    detail: string;
  }> = [
    {
      key: "parecer",
      code: "01",
      title: "Parecer Técnico-Jurídico",
      detail: "CF/88 Art. 196 · ANVISA RDC nº 660/2022 · Salvo-Conduto & STJ",
    },
    {
      key: "privacidade",
      code: "02",
      title: "Política de Privacidade (LGPD)",
      detail: "Dados sensíveis de saúde · Sigilo médico CFM · Cookies essenciais",
    },
    {
      key: "termos",
      code: "03",
      title: "Termos de Uso & Resguardo",
      detail: "Plataforma facilitadora · Autonomia do ato médico · Uso nominal",
    },
    {
      key: "dados",
      code: "04",
      title: "Dados, Direitos do Titular & DPO",
      detail: "Art. 18 da Lei nº 13.709/2018 · Segurança & canal direto",
    },
    {
      key: "sobre",
      code: "05",
      title: "Sobre o Instituto Mecura",
      detail: `${BRAND.legalEntity} · CNPJ ${BRAND.cnpj}`,
    },
  ];

  return (
    <section
      id="juridico"
      className="py-24 lg:py-32 px-6 lg:px-12 bg-background border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Transparência &amp; Resguardo Jurídico
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.08] tracking-tight text-text-primary">
            Legalidade clara,{" "}
            <span className="italic text-accent">documentada</span> e auditável.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Diretrizes de conformidade sanitária, privacidade e segurança jurídica estruturadas para resguardar o {BRAND.legalEntity} (CNPJ {BRAND.cnpj}) e cada paciente em tratamento.
          </p>

          <div className="pt-5 border-t border-border space-y-1.5">
            <p className="font-display text-lg text-text-primary">
              Dr. Max Warner Santos Souza — OAB/MG 154.052
            </p>
            <p className="text-xs text-accent">
              Consultor Jurídico Especialista em Direito Canábico &amp; Salvo-Conduto
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 border-t border-border">
          {legalDocs.map((doc) => (
            <button
              key={doc.key}
              type="button"
              onClick={() => onOpenLegal(doc.key)}
              className="group w-full text-left py-5 sm:py-6 border-b border-border flex items-center justify-between gap-6 hover:pl-2 transition-all cursor-pointer"
            >
              <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                <span className="font-mono text-xs text-accent tabular-nums shrink-0">
                  {doc.code}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-text-primary group-hover:text-accent transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">
                    {doc.detail}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Act 8: Unobstructed Brand Outro Film & Legal Conversion Closing --- */

function BrandOutroClosing({
  onOpenLegal,
}: {
  onOpenLegal: (key: ModalContentKey) => void;
}) {
  return (
    <section className="relative min-h-[78dvh] py-32 lg:py-44 px-6 lg:px-12 bg-background overflow-hidden border-t border-border flex items-center">
      {/* Official Brand Outro Video cleanly visible in background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source
            src={`${import.meta.env.BASE_URL}Logo_outro_animation_sequence_1080p_20260923174030.mp4`}
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 68% 58% at 50% 50%, rgba(7,11,8,0.68) 0%, rgba(7,11,8,0.34) 55%, rgba(7,11,8,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto text-center flex flex-col items-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
          ANVISA RDC nº 660/2022 · LGPD · Diretrizes CFM
        </p>

        <h2 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.03] tracking-tight text-text-primary mb-7 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          Comece seu tratamento com{" "}
          <span className="italic text-accent">segurança jurídica</span>.
        </h2>

        <p className="text-base sm:text-lg text-text-primary/85 max-w-2xl leading-relaxed mb-11 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
          Somos um aplicativo facilitador em saúde que conecta você a médicos especialistas para emissão de receita e laudo em 3 a 5 minutos, com suporte completo para importação legalizada junto à ANVISA.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={BRAND.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-ink font-semibold text-sm sm:text-base hover:bg-accent-hover active:scale-[0.98] transition-all shadow-[0_16px_50px_rgba(196,255,26,0.28)]"
          >
            <span>{BRAND.ctaFull}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-mono text-text-secondary">
          <button
            type="button"
            onClick={() => onOpenLegal("parecer")}
            className="hover:text-accent underline underline-offset-4 decoration-white/25 transition-colors cursor-pointer"
          >
            Parecer Jurídico
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal("privacidade")}
            className="hover:text-accent underline underline-offset-4 decoration-white/25 transition-colors cursor-pointer"
          >
            Privacidade &amp; LGPD
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal("termos")}
            className="hover:text-accent underline underline-offset-4 decoration-white/25 transition-colors cursor-pointer"
          >
            Termos de Uso
          </button>
        </div>
      </div>
    </section>
  );
}

/* --- Quiet Editorial Footer --- */

function Footer({
  onOpenModal,
}: {
  onOpenModal: (key: ModalContentKey) => void;
}) {
  return (
    <footer className="py-16 px-6 lg:px-12 bg-background border-t border-border">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-border">
          <div className="space-y-3">
            <a
              href="#inicio"
              className="font-display text-2xl font-semibold text-text-primary block"
            >
              {BRAND.shortName}
            </a>
            <p className="text-sm text-text-secondary">
              Da semente ao paciente. A pureza da natureza, guiada pela ciência.
            </p>
            <p className="font-mono text-xs text-text-muted tabular-nums pt-2">
              {BRAND.legalEntity}
              <br />
              CNPJ {BRAND.cnpj}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted mb-1">
              Instituto
            </span>
            <button
              type="button"
              onClick={() => onOpenModal("sobre")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Sobre Nós
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("equipe")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Corpo Médico-Científico
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("ciencia")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Nossa Ciência
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("tratamentos")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Tratamentos
            </button>
            <a
              href="#associacoes"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit"
            >
              Associações Parceiras
            </a>
            <a
              href="#blog"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit"
            >
              Diário &amp; Notícias (Blog)
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted mb-1">
              Transparência &amp; Jurídico
            </span>
            <button
              type="button"
              onClick={() => onOpenModal("parecer")}
              className="text-sm font-medium text-accent hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Parecer Jurídico (OAB/MG 154.052)
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("privacidade")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Política de Privacidade (LGPD)
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("termos")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Termos de Uso (RDC 660/2022)
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("dados")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Dados, Direitos &amp; DPO
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("duvidas")}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors text-left w-fit cursor-pointer"
            >
              Dúvidas Frequentes
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted mb-1">
              Canais
            </span>
            <a
              href={BRAND.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:text-text-primary transition-colors w-fit"
            >
              Abrir Aplicativo Mecura
            </a>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors w-fit"
            >
              <Instagram className="w-4 h-4 text-accent" />
              <span>{BRAND.instagramHandle}</span>
            </a>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors w-fit tabular-nums"
            >
              <MessageCircle className="w-4 h-4 text-accent" />
              <span>{BRAND.whatsappDisplay}</span>
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors w-fit"
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <span>© {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.</span>
          <span className="font-mono">ANVISA RDC nº 660/2022 · LGPD · CFM</span>
        </div>
      </div>
    </footer>
  );
}

/* --- Compact Floating WhatsApp --- */

function FloatingWhatsApp() {
  return (
    <a
      href={BRAND.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Central de Apoio no WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-accent text-accent-ink flex items-center justify-center shadow-[0_8px_28px_rgba(196,255,26,0.32)] hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle className="w-5 h-5" />
    </a>
  );
}

/* --- App Root --- */

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalContentKey | null>(null);
  const [activePopup, setActivePopup] = useState<InteractivePopupPayload | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div className="min-h-screen bg-background text-text-primary relative">
        <div className="botanical-grain" aria-hidden="true" />

        <TopBar onOpenLegal={setActiveModal} />

        <main>
          <HeroCinema />
          <EditorialManifesto />
          <RemotionCinema />
          <StickyAppWalkthrough onOpenPopup={setActivePopup} />
          <ConnectedJourneyLime onOpenPopup={setActivePopup} />
          <PhotographicSpreadsAndScience onOpenPopup={setActivePopup} />
          <AssociationsSection onOpenPopup={setActivePopup} />
          <TeamEditorial onOpenPopup={setActivePopup} />
          <NewsBlogSection />
          <LegalTransparencyBand onOpenLegal={setActiveModal} />
          <BrandOutroClosing onOpenLegal={setActiveModal} />
        </main>

        <Footer onOpenModal={setActiveModal} />
        <FloatingWhatsApp />
        <InfoDrawer contentKey={activeModal} onClose={() => setActiveModal(null)} />
        <InteractivePopupModal
          payload={activePopup}
          onClose={() => setActivePopup(null)}
        />
      </div>
    </MotionConfig>
  );
}

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, ArrowLeft, ArrowRight, Leaf, MessageCircle, CheckCircle2, Star, FileText, Mic } from "lucide-react";

// --- Utilities ---

const RevealText = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string 
}) => {
  return (
    <div className={`overflow-hidden py-3 -my-3 ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ParallaxImage = ({ 
  src, 
  alt, 
  className = "" 
}: { 
  src: string, 
  alt: string, 
  className?: string 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`overflow-hidden bg-surface ${className}`}>
      <motion.img 
        style={{ y, scale: 1.15 }} 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover origin-center" 
      />
    </div>
  );
};

// --- Sections ---

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <>
      {/* Floating Pill Navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-0 w-full z-40 px-4 md:px-8 flex justify-center pointer-events-none"
      >
        <div className="w-full max-w-[1400px] flex justify-between items-center bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-3 md:py-3.5 shadow-2xl shadow-black/80 pointer-events-auto relative">
          
          {/* Logo (Left on Mobile, Absolute Center on Desktop) */}
          <div className="font-display text-2xl md:text-3xl tracking-[0.15em] uppercase text-white cursor-pointer hover:text-accent transition-colors md:absolute md:left-1/2 md:-translate-x-1/2 z-10">
            Mecura
          </div>

          {/* Desktop Left Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.15em] text-text-secondary w-full justify-start pl-2">
            <a 
              href="https://mecura.sementesagrada.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-accent text-accent-text font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all duration-300"
            >
              Agendar Consulta
            </a>
            <a href="#processo" className="hover:text-white transition-colors">O Processo</a>
            <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
          </nav>

          {/* Desktop Right Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.15em] text-text-secondary w-full justify-end pr-2">
            <a href="#ciencia" className="hover:text-white transition-colors">A Ciência</a>
            <a href="#equipe" className="hover:text-white transition-colors">A Equipe</a>
            <button 
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 hover:text-white transition-colors group"
            >
              Menu
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-surface-elevated group-hover:border-accent group-hover:text-accent transition-colors">
                <Menu className="w-4 h-4" />
              </div>
            </button>
          </nav>

          {/* Mobile Right Action */}
          <div className="md:hidden flex items-center justify-end">
            <button 
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-surface-elevated text-white active:scale-95 transition-all"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }} 
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }} 
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-surface flex flex-col justify-center px-6 md:px-24"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-4 group text-text-primary"
            >
              <span className="uppercase tracking-widest text-xs font-sans group-hover:opacity-70 transition-opacity hidden md:block">Fechar</span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-text-primary group-hover:text-background transition-all duration-300 bg-background">
                <X className="w-4 h-4" />
              </div>
            </button>

            <nav className="flex flex-col gap-6 md:gap-10 text-5xl md:text-7xl font-display">
              {[
                { name: 'Início', href: '#' },
                { name: 'O Processo', href: '#processo' },
                { name: 'Serviços', href: '#servicos' },
                { name: 'A Ciência', href: '#ciencia' },
                { name: 'Equipe', href: '#equipe' },
                { name: 'Contato', href: 'https://wa.me/5566996280883', target: '_blank' }
              ].map((item, i) => (
                <div key={item.name} className="overflow-hidden">
                  <motion.a 
                    href={item.href}
                    target={item.target || '_self'}
                    rel={item.target ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hover:text-accent transition-colors w-fit block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                </div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-10 left-6 md:left-24 text-text-muted text-sm uppercase tracking-widest"
            >
              Instituto Mecura © {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroAndMission() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    };
    
    // Attempt play immediately
    playVideo();
    
    // Add touch/click listeners to force play if blocked (e.g. iOS low power mode)
    window.addEventListener('touchstart', playVideo, { once: true });
    window.addEventListener('click', playVideo, { once: true });
    window.addEventListener('scroll', playVideo, { once: true });

    return () => {
      window.removeEventListener('touchstart', playVideo);
      window.removeEventListener('click', playVideo);
      window.removeEventListener('scroll', playVideo);
    };
  }, []);
  
  // Parallax for the combined tall section
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative w-full">
       <motion.div 
         style={{ y }} 
         className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-neutral-900"
       >
         {/* Subtler contrast, elegant dark overlay for legibility across both sections */}
         <div className="absolute inset-0 bg-black/40 z-10" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
         
         <video 
           ref={videoRef}
           autoPlay 
           loop 
           muted 
           playsInline
           preload="auto"
           className="w-full h-full object-cover relative z-0" 
         >
           <source src={`${import.meta.env.BASE_URL}Cannabis_oil_bottle_on_moss_202608201452.mp4`} type="video/mp4" />
         </video>
       </motion.div>

       <div className="relative z-10">
         {/* Hero Content */}
         <section className="relative h-[100dvh] w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-10">
           <div className="flex flex-col items-start mt-8 md:mt-0">
             <RevealText className="text-accent text-xs md:text-sm tracking-[0.2em] uppercase font-sans mb-4">
               Instituto de Medicina
             </RevealText>
           </div>

           <div className="w-full flex flex-col justify-end gap-12 md:gap-0">
             <h1 className="text-[18vw] md:text-[14vw] leading-[1.0] tracking-tight font-display uppercase m-0 flex flex-col items-start relative z-20">
                <span className="block overflow-hidden pt-4 pb-2 md:pt-8 md:pb-6 -mt-4 md:-mt-8">
                  <motion.span initial={{y:"100%"}} animate={{y:0}} transition={{duration:1.4, ease:[0.16,1,0.3,1]}} className="block text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.7)] md:[-webkit-text-stroke:4px_rgba(255,255,255,0.7)] hover:text-white transition-colors duration-700">
                    ME
                  </motion.span>
                </span>
                <span className="block overflow-hidden pl-[4vw] md:pl-[8vw] pt-4 pb-2 md:pt-8 md:pb-6 -mt-8 md:-mt-16">
                  <motion.span 
                    initial={{y:"100%"}} 
                    animate={{y:0}} 
                    transition={{duration:1.4, delay:0.1, ease:[0.16,1,0.3,1]}} 
                    className="block text-white"
                  >
                    CURA<span className="text-accent">.</span>
                  </motion.span>
                </span>
             </h1>
             <div className="w-full flex justify-end md:-mt-12">
               <div className="max-w-md pb-4 md:pb-8 pr-4 md:pr-12">
                 <RevealText delay={0.4} className="text-text-secondary text-base md:text-lg mb-8">
                   Facilitando o acesso seguro, legal e humanizado ao tratamento com Cannabis Medicinal no Brasil.
                 </RevealText>
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 >
                   <a 
                     href="https://mecura.sementesagrada.com/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-accent text-accent-text font-display uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                   >
                     Agendar Consulta
                     <ArrowRight className="w-4 h-4" />
                   </a>
                 </motion.div>
               </div>
             </div>
           </div>
         </section>

         {/* Mission Content */}
         <section className="py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
             <div className="md:col-span-3 flex flex-col justify-start pt-2">
               <span className="text-accent text-xs uppercase tracking-widest block">
                 [ 01 ] Nossa Visão
               </span>
             </div>
             <div className="md:col-span-9">
               <RevealText>
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-16 tracking-tight">
                   Da semente ao paciente. Acreditamos no poder transformador da natureza aliado ao rigor científico.
                 </h2>
               </RevealText>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-text-secondary text-lg">
                 <RevealText delay={0.1}>
                   <p>
                     O Instituto Mecura nasceu da necessidade de desmistificar e democratizar o acesso à terapia canabinoide. Trabalhamos incansavelmente para oferecer um caminho seguro e amparado por lei para pacientes que buscam qualidade de vida.
                   </p>
                 </RevealText>
                 <RevealText delay={0.2}>
                   <p>
                     Nossa equipe multidisciplinar une conhecimento médico de ponta, suporte jurídico especializado e acolhimento humano, garantindo que cada paciente receba o cuidado integral que merece, sem julgamentos.
                   </p>
                 </RevealText>
               </div>
             </div>
           </div>
         </section>
       </div>
    </div>
  );
}

const carouselData = [
  { img: "/galeria-2.jpg.png", title: "Cultivo Rigoroso", desc: "Atenção a cada detalhe e controle de qualidade superior." },
  { img: "/galeria-3.jpg.png", title: "Extração Pura", desc: "Métodos avançados para máxima eficácia do óleo." },
  { img: "/galeria-4.jpg.png", title: "Cuidado Clínico", desc: "Acompanhamento médico especializado contínuo." },
  { img: "/galeria-5.jpg.png", title: "Pesquisa", desc: "Inovação contínua em terapias canabinoides." },
  { img: "/galeria-6.jpg.png", title: "Bem-estar", desc: "Foco total na qualidade de vida do paciente." },
];

function InfoCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section 
      className="py-24 md:py-32 overflow-hidden bg-background border-y border-border/50"
      onClick={() => setIsPaused(!isPaused)}
    >
       <div className="px-6 md:px-12 mb-16 max-w-[1600px] mx-auto w-full">
         <span className="text-accent text-xs uppercase tracking-widest block mb-6">
           [ Galeria ]
         </span>
         <RevealText>
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight">Processo & Cuidado.</h2>
         </RevealText>
       </div>
       
       <div className="flex overflow-hidden w-full">
         <div 
           className="flex w-max cursor-pointer"
           title="Clique para pausar/retomar"
           style={{
             animation: 'scroll-left 40s linear infinite',
             animationPlayState: isPaused ? 'paused' : 'running'
           }}
         >
           <div className="flex gap-6 md:gap-10 pr-6 md:pr-10">
             {carouselData.map((item, i) => (
               <div 
                 key={i} 
                 className="w-[85vw] md:w-[450px] flex-shrink-0 group cursor-pointer"
               >
                 <div className="aspect-[4/3] overflow-hidden mb-6 bg-surface relative">
                   <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-10" />
                   <img 
                     src={item.img} 
                     alt={item.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]" 
                   />
                 </div>
                 <div className="flex justify-between items-start border-t border-border pt-6 group-hover:border-accent transition-colors duration-500">
                   <h4 className="text-2xl font-display group-hover:text-accent transition-colors duration-500">{item.title}</h4>
                   <p className="text-sm text-text-secondary max-w-[200px] text-right font-sans leading-relaxed">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
           
           {/* Clone for seamless loop */}
           <div className="flex gap-6 md:gap-10 pr-6 md:pr-10">
             {carouselData.map((item, i) => (
               <div 
                 key={`clone-${i}`} 
                 className="w-[85vw] md:w-[450px] flex-shrink-0 group cursor-pointer"
               >
                 <div className="aspect-[4/3] overflow-hidden mb-6 bg-surface relative">
                   <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-10" />
                   <img 
                     src={item.img} 
                     alt={item.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]" 
                   />
                 </div>
                 <div className="flex justify-between items-start border-t border-border pt-6 group-hover:border-accent transition-colors duration-500">
                   <h4 className="text-2xl font-display group-hover:text-accent transition-colors duration-500">{item.title}</h4>
                   <p className="text-sm text-text-secondary max-w-[200px] text-right font-sans leading-relaxed">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
    </section>
  );
}

const services = [
  {
    title: "Consulta Médica",
    desc: "Avaliação individualizada com profissionais especialistas em medicina canabinoide, focados em encontrar a melhor dosagem e cepa para sua condição clínica específica.",
    img: "/consulta-medica.jpg"
  },
  {
    title: "Suporte Jurídico",
    desc: "Assessoria completa para obtenção de habeas corpus e autorizações da Anvisa, garantindo seu direito constitucional à saúde sem riscos legais ou burocracia excessiva.",
    img: "/suporte-juridico.jpg"
  },
  {
    title: "Educação & Acolhimento",
    desc: "Informação baseada em evidências. Guiamos você e sua família em cada etapa do tratamento, quebrando estigmas e construindo autonomia através do conhecimento.",
    img: "/educacao.jpg"
  }
];

function Services() {
  return (
    <section className="py-24 md:py-48 px-6 md:px-12 bg-surface">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 md:mb-40 flex justify-between items-end">
          <span className="text-accent text-xs uppercase tracking-widest block">
            [ 02 ] Pilares de Atuação
          </span>
        </div>
        
        <div className="flex flex-col gap-32 md:gap-48">
          {services.map((srv, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
              <div className="w-full md:w-5/12">
                <ParallaxImage 
                  src={srv.img} 
                  alt={srv.title} 
                  className="aspect-[4/5] md:aspect-[3/4] w-full" 
                />
              </div>
              <div className="w-full md:w-7/12 flex flex-col items-start md:px-12">
                <RevealText>
                  <span className="font-sans text-text-muted text-sm tracking-[0.2em] mb-8 block">02.{i+1}</span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8">{srv.title}</h3>
                </RevealText>
                <RevealText delay={0.2}>
                  <p className="text-xl md:text-2xl text-text-secondary mb-12 font-light leading-relaxed">
                    {srv.desc}
                  </p>
                </RevealText>
                <RevealText delay={0.3}>
                  <button className="group flex items-center gap-4 text-text-primary hover:text-accent transition-colors pb-3 border-b border-border hover:border-accent">
                    <span className="uppercase tracking-[0.15em] text-sm">Explorar Serviço</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </RevealText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const therapeuticBenefits = [
  "Neuroprotetor", "Antioxidante", "Anticonvulsionante", "Antidepressivo",
  "Antipsicótico", "Anti-inflamatório", "Ansiolítico", "Analgésico",
  "Oncoterápico", "Relaxante muscular", "Indutor de Sono"
];

function TherapeuticProperties() {
  return (
    <section className="py-24 md:py-32 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16">
        <span className="text-accent text-xs uppercase tracking-widest block mb-6">
          [ A Ciência ]
        </span>
        <RevealText>
          <h2 className="text-4xl md:text-6xl font-display tracking-tight">Propriedades<br/>Terapêuticas.</h2>
        </RevealText>
      </div>
      
      {/* Marquee Effect */}
      <div className="relative w-full flex overflow-hidden mt-12 py-8 md:py-12">
        <div className="flex w-max" style={{ animation: 'scroll-left 50s linear infinite' }}>
          <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
            {therapeuticBenefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-16">
                <span className="text-4xl md:text-6xl font-display text-white drop-shadow-[0_0_12px_rgba(204,255,0,0.4)] hover:drop-shadow-[0_0_20px_rgba(204,255,0,0.8)] transition-all duration-500 whitespace-nowrap cursor-default">
                  {benefit}
                </span>
                <Leaf className="w-8 h-8 text-accent opacity-50" />
              </div>
            ))}
          </div>
          {/* Clone for seamless loop */}
          <div className="flex items-center gap-8 md:gap-16 px-4 md:px-8">
            {therapeuticBenefits.map((benefit, i) => (
              <div key={`clone-${i}`} className="flex items-center gap-8 md:gap-16">
                <span className="text-4xl md:text-6xl font-display text-white drop-shadow-[0_0_12px_rgba(204,255,0,0.4)] hover:drop-shadow-[0_0_20px_rgba(204,255,0,0.8)] transition-all duration-500 whitespace-nowrap cursor-default">
                  {benefit}
                </span>
                <Leaf className="w-8 h-8 text-accent opacity-50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const journeySteps = [
  {
    num: "01",
    title: "Consulta Especializada",
    desc: "Avaliação médica detalhada para entender seu histórico e definir o melhor tratamento canabinoide para o seu caso."
  },
  {
    num: "02",
    title: "Autorização Anvisa",
    desc: "Nossa equipe cuida de toda a burocracia para emissão da receita e autorização de importação ou compra legal."
  },
  {
    num: "03",
    title: "Aquisição Segura",
    desc: "Acesso a produtos certificados internacionalmente com nossa rede de parceiros, garantindo pureza e eficácia."
  },
  {
    num: "04",
    title: "Acompanhamento",
    desc: "Monitoramento contínuo da dosagem e da sua evolução clínica para garantir os melhores resultados ao longo do tempo."
  }
];

function PatientJourney() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-surface">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 md:mb-32">
          <span className="text-accent text-xs uppercase tracking-widest block mb-6">
            [ O Processo ]
          </span>
          <RevealText>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight">A Jornada Mecura.</h2>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-border z-0" />
          
          {journeySteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-start group"
            >
              <div className="w-24 h-24 rounded-full bg-background border border-border flex items-center justify-center mb-8 group-hover:border-accent group-hover:scale-105 transition-all duration-500 shadow-xl">
                <span className="font-display text-2xl text-accent">{step.num}</span>
              </div>
              <h3 className="text-2xl font-display tracking-wide mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed font-sans text-sm md:text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const partnersData = [
  { 
    name: "GreenBudz", 
    subtitle: "MEDICAMENTOS E ÓLEOS",
    tag: "PARTNER.V1",
    desc: "\"Excelência em medicina canabinoide. Formulações exclusivas de óleos e gummies com pureza farmacêutica e certificação internacional, garantindo máxima eficácia terapêutica.\"", 
    img: "/Whisk_4470564e35c5e8f83cd4c2a00f161bdcdr.png"
  },
  { 
    name: "Highbreed Seeds", 
    subtitle: "GENÉTICA E SEMENTES",
    tag: "PARTNER.V1",
    desc: "\"A ciência por trás do cultivo. Genéticas de elite e sementes estabilizadas com altos teores de CBD/THC, desenvolvidas para pacientes que buscam autonomia e resultados superiores.\"", 
    img: "/Whisk_0dc4c71167beee0ba7b4840785bc172bdr.png"
  }
];

function Partners() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background relative">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background opacity-50 pointer-events-none" />
       <div className="max-w-[1600px] mx-auto w-full relative z-10">
         <div className="mb-16 md:mb-24 flex flex-col">
           <span className="text-accent text-xs uppercase tracking-widest block mb-6">
             [ 03 ] Qualidade & Segurança
           </span>
           <RevealText>
             <h2 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight">Rede de Confiança.</h2>
           </RevealText>
           <RevealText delay={0.1}>
             <p className="mt-8 text-xl text-text-secondary max-w-2xl font-light leading-relaxed">
               Construímos uma rede sólida para garantir acesso ao que há de mais avançado e seguro no mundo, desde a genética da semente até a extração do óleo final.
             </p>
           </RevealText>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-[1400px] mx-auto mt-16">
           {partnersData.map((partner, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
               className="bg-[#0a0a0a] border border-border rounded-[2.5rem] p-8 md:p-12 flex flex-col hover:border-accent/50 transition-colors duration-500 group"
             >
               <div className="w-full h-72 md:h-[400px] rounded-3xl overflow-hidden mb-12 relative">
                 <img src={partner.img} alt={partner.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
               </div>
               
               <div className="w-12 h-1 border-t-2 border-accent mb-10"></div>
               
               <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-8 group-hover:border-accent transition-colors duration-500">
                 <Leaf className="w-6 h-6 text-accent" />
               </div>
               
               <div className="flex flex-row justify-between items-end mb-4">
                 <h3 className="text-3xl md:text-4xl font-display tracking-wide">{partner.name}</h3>
                 <span className="text-accent text-[10px] uppercase font-bold tracking-widest mb-1">{partner.tag}</span>
               </div>
               
               <div className="flex items-center gap-4 mb-8">
                 <div className="h-px bg-border flex-grow"></div>
                 <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{partner.subtitle}</span>
               </div>
               
               <p className="text-text-secondary leading-relaxed font-sans text-sm md:text-base italic mb-12 flex-grow">
                 {partner.desc}
               </p>
               
               <div className="flex items-center justify-between border-t border-border pt-6 mt-auto">
                 <button className="flex items-center gap-3 text-sm font-bold tracking-[0.15em] uppercase text-text-primary group-hover:text-accent transition-colors">
                   VISITAR SITE <ArrowRight className="w-4 h-4" />
                 </button>
                 <div className="flex gap-1">
                   <div className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors delay-75"></div>
                   <div className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors delay-150"></div>
                   <div className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors delay-200"></div>
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </section>
  );
}

function AppSection() {
  return (
    <section className="py-24 md:py-48 px-6 md:px-12 bg-[#000] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col items-center">
        <span className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold block mb-8 text-center">Tudo em um único lugar</span>
        <RevealText>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display tracking-wide uppercase mb-10 max-w-5xl mx-auto text-center leading-[0.9]">
            Seu tratamento na <span className="text-accent">palma da mão.</span>
          </h2>
        </RevealText>
        <RevealText delay={0.1}>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed mb-24 text-center">
            Acompanhe suas receitas, agende teleconsultas com nossos especialistas e receba suporte jurídico diretamente pelo app exclusivo do Instituto Mecura.
          </p>
        </RevealText>
        <div className="relative w-full max-w-6xl mx-auto h-[650px] flex justify-center items-center mt-10">
            {/* LEFT PHONE (Chat) */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -12 }}
              whileInView={{ opacity: 0.5, x: 0, rotate: -12 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute z-10 -ml-[400px] lg:-ml-[600px] scale-75 md:scale-90 hidden md:flex flex-col w-[300px] h-[620px] bg-[#0a0a0a] rounded-[3rem] border-[8px] border-[#1a1a1a] overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-32 h-full bg-[#1a1a1a] rounded-b-2xl"></div>
              </div>
              <div className="absolute top-16 -left-12 flex items-center gap-3 bg-[#111]/90 backdrop-blur-xl border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl z-40 min-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-border flex items-center justify-center shrink-0">
                   <MessageCircle className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col items-start">
                   <div className="text-sm font-bold text-white leading-tight">Nova Mensagem</div>
                   <div className="text-[10px] text-text-secondary mt-0.5">Dr. Guilherme: "Tudo certo..."</div>
                </div>
              </div>
              <div className="p-6 pt-16 flex flex-col h-full bg-[#050505]">
                <div className="flex items-center gap-4 mb-8">
                  <img src="/dr-guilherme.png" alt="Dr. Guilherme" className="w-12 h-12 rounded-full object-cover border border-border" />
                  <div>
                    <div className="font-bold text-sm text-white">Dr. Guilherme Taveira</div>
                    <div className="text-[10px] text-text-muted mt-1">CRM 123456</div>
                  </div>
                </div>
                <div className="flex flex-col gap-5 text-[13px]">
                  <div className="bg-[#111] p-4 rounded-2xl rounded-tl-sm w-[90%] text-text-secondary leading-relaxed border border-white/5">
                    Olá! Sou o Dr. Guilherme e vou fazer o seu atendimento hoje.
                  </div>
                  <div className="bg-[#111] p-4 rounded-2xl rounded-tl-sm w-[95%] text-text-secondary leading-relaxed border border-white/5">
                    Acabei de ler as informações do seu prontuário. Tem algum ponto que queira reforçar?
                  </div>
                </div>
                <div className="mt-auto relative">
                  <div className="w-full h-12 bg-[#111] border border-white/5 rounded-full flex items-center px-5 text-text-muted text-xs">Escreva sua mensagem...</div>
                  <div className="absolute right-1.5 top-1.5 w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                     <Mic className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </motion.div>
            {/* RIGHT PHONE (Checklist) */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 12 }}
              whileInView={{ opacity: 0.5, x: 0, rotate: 12 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute z-10 ml-[400px] lg:ml-[600px] scale-75 md:scale-90 hidden md:flex flex-col w-[300px] h-[620px] bg-[#0a0a0a] rounded-[3rem] border-[8px] border-[#1a1a1a] overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-32 h-full bg-[#1a1a1a] rounded-b-2xl"></div>
              </div>
              <div className="absolute bottom-24 -left-16 flex items-center gap-3 bg-[#111]/90 backdrop-blur-xl border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl z-40 min-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                   <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col items-start">
                   <div className="text-sm font-bold text-white leading-tight">Análise Concluída</div>
                   <div className="text-[10px] text-text-secondary mt-0.5">Perfil atualizado com sucesso</div>
                </div>
              </div>
              <div className="p-6 pt-16 flex flex-col h-full bg-[#050505]">
                <h3 className="font-display text-2xl uppercase tracking-wide mb-2 text-white">Estado Emocional</h3>
                <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold mb-8">(1) Responda com atenção</p>
                <div className="flex flex-col gap-6">
                  {[
                    "Sente muita tristeza?",
                    "Perde o foco facilmente?",
                    "Tem problemas de memória?",
                    "Fica facilmente irritado?",
                    "Problemas com stress?"
                  ].map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-border/40 pb-4">
                       <span className="text-xs text-text-secondary leading-tight max-w-[70%]">{q}</span>
                       <div className="w-10 h-5 bg-[#222] rounded-full relative shadow-inner">
                         <div className="w-4 h-4 bg-[#555] rounded-full absolute top-0.5 left-0.5 transition-all"></div>
                       </div>
                    </div>
                  ))}
                </div>
                <a href="https://mecura.sementesagrada.com/" target="_blank" rel="noopener noreferrer" className="block text-center w-full py-4 bg-[#111] border border-white/5 text-text-primary font-bold uppercase tracking-[0.2em] rounded-full text-[10px] mt-auto hover:bg-[#1a1a1a] transition-colors">
                  Iniciar Tratamento
                </a>
              </div>
            </motion.div>
            {/* CENTER PHONE (Dashboard) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative z-30 scale-100 md:scale-105 flex flex-col w-[320px] h-[650px] bg-[#0a0a0a] rounded-[3rem] border-[8px] border-[#1a1a1a] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-32 h-full bg-[#1a1a1a] rounded-b-2xl"></div>
              </div>
              <div className="absolute top-48 -right-8 md:-right-24 flex items-center gap-3 bg-[#111]/90 backdrop-blur-xl border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl z-40 min-w-[240px] transform md:hover:scale-105 transition-transform cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-border flex items-center justify-center shrink-0">
                   <FileText className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col items-start">
                   <div className="text-sm font-bold text-white leading-tight">Receita Liberada</div>
                   <div className="text-[10px] text-text-secondary mt-0.5">Disponível para download</div>
                </div>
              </div>
              <div className="p-8 pt-20 flex flex-col items-center h-full text-center relative bg-gradient-to-b from-[#111] to-[#050505]">
                <div className="w-24 h-24 bg-accent rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(204,255,0,0.2)]">
                  <Leaf className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-3xl font-display uppercase tracking-wide mb-3 text-white">Mecura</h3>
                <p className="text-text-secondary text-sm mb-10 px-4">Da consulta à entrega, simples e seguro.</p>
                <a href="https://mecura.sementesagrada.com/" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-accent text-black font-display tracking-widest uppercase rounded-full text-sm mb-10 hover:scale-105 transition-transform duration-300 text-center">
                  Agendar Consulta
                </a>
                <div className="flex items-center justify-center gap-4 border-y border-white/5 py-5 w-full mb-10">
                  <div className="text-center">
                    <div className="text-3xl font-display text-white mb-2">4,9</div>
                    <div className="flex text-accent gap-1.5 justify-center mb-1">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <div className="text-[9px] text-text-muted uppercase tracking-widest font-bold">2,4 mil avaliações</div>
                  </div>
                </div>
                <div className="w-full bg-[#111] p-5 rounded-2xl text-left border border-white/5 relative overflow-hidden mt-auto">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                   <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">Praticidade</span>
                   <p className="text-xs text-text-secondary leading-relaxed">
                     Todo o seu tratamento unificado. Histórico, documentos e acompanhamento médico sem complicação.
                   </p>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}

const team = [
  { name: "Dr. Guilherme", role: "Diretor Médico", img: "/dr-guilherme.png" },
  { name: "Lucas & Alessandra", role: "Diretores de Marketing", img: "/lucas-alessandra-new.png" },
  { name: "Wilian", role: "Diretor Agronômico", img: "/wilian.jpg" }
];

function Team() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-surface">
      <div className="max-w-[1600px] mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32 gap-8">
           <div>
             <span className="text-accent text-xs uppercase tracking-widest mb-8 block">
               [ 04 ] Nossa Equipe
             </span>
             <RevealText>
               <h2 className="text-5xl md:text-7xl font-display leading-tight">
                 Especialistas com<br/>propósito.
               </h2>
             </RevealText>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
           {team.map((member, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
               className="flex flex-col group cursor-pointer"
             >
               <div className="overflow-hidden aspect-[3/4] mb-8 bg-surface">
                 <img 
                   src={member.img} 
                   alt={member.name} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]" 
                 />
               </div>
               <h4 className="text-2xl md:text-3xl font-display mb-2 group-hover:text-accent transition-colors">
                 {member.name}
               </h4>
               <p className="text-text-muted text-sm uppercase tracking-[0.15em] font-sans">
                 {member.role}
               </p>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
}


type ModalContentKey = 'sobre' | 'equipe' | 'ciencia' | 'tratamentos' | 'duvidas' | 'privacidade' | 'termos' | 'cookies';

const modalData: Record<ModalContentKey, { title: string; content: React.ReactNode }> = {
  sobre: {
    title: "Sobre Nós",
    content: (
      <div className="space-y-6">
        <p>O <strong>Instituto Mecura</strong> nasceu com o propósito de democratizar o acesso seguro, legal e humanizado ao tratamento com Cannabis Medicinal no Brasil.</p>
        <p>Compreendemos que a jornada em busca de qualidade de vida e alívio de sintomas complexos pode ser desafiadora. Por isso, aliamos a excelência médica à agilidade regulatória, cuidando de todo o processo burocrático (como autorizações da Anvisa) para que o paciente se preocupe apenas com seu bem-estar.</p>
        <p>Acreditamos em uma medicina integrativa, onde a ciência milenar das plantas encontra o rigor clínico contemporâneo, sempre embasada em estudos robustos e no cuidado empático.</p>
      </div>
    )
  },
  equipe: {
    title: "A Equipe Médico-Científica",
    content: (
      <div className="space-y-6">
        <p>Nossa equipe é formada por especialistas altamente capacitados no <strong>Sistema Endocanabinoide (SEC)</strong>.</p>
        <p>Contamos com médicos prescritores, farmacêuticos, pesquisadores e acolhedores de pacientes que trabalham em sinergia. O foco da nossa junta médica é a personalização absoluta: cada paciente passa por uma anamnese detalhada para definir o quimiotipo (relação CBD/THC), a via de administração e a dosagem ideais.</p>
        <p>Mantemos atualização constante através de simpósios e literaturas científicas globais para oferecer as terapias mais inovadoras aos nossos pacientes.</p>
      </div>
    )
  },
  ciencia: {
    title: "Nossa Ciência",
    content: (
      <div className="space-y-6">
        <p>O <strong>Sistema Endocanabinoide (SEC)</strong> é uma rede complexa de receptores celulares e neurotransmissores espalhados por todo o corpo humano, essencial para a homeostase (equilíbrio) biológico.</p>
        <p>A Fitoterapia Canabinoide atua diretamente neste sistema. Os fitocanabinoides como o CBD (Canabidiol) e o THC (Tetrahidrocanabinol) modulam funções neurológicas, imunológicas e inflamatórias.</p>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li><strong>Neuroproteção:</strong> Modulação sináptica auxiliando em condições neurodegenerativas.</li>
          <li><strong>Analgesia:</strong> Interação com vias da dor crônica e neuropática.</li>
          <li><strong>Regulação Emocional:</strong> Efeito ansiolítico e estabilizador de humor.</li>
        </ul>
      </div>
    )
  },
  tratamentos: {
    title: "Tratamentos",
    content: (
      <div className="space-y-6">
        <p>Atuamos em diversas linhas de cuidado, respaldadas pela literatura médica atual:</p>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li><strong>Dor Crônica:</strong> Fibromialgia, artrite, artrose, dores neuropáticas e oncológicas.</li>
          <li><strong>Saúde Mental:</strong> Ansiedade crônica, insônia resistente, depressão, TEPT (Transtorno de Estresse Pós-Traumático).</li>
          <li><strong>Neurologia:</strong> Epilepsias refratárias, Parkinson, Alzheimer, Esclerose Múltipla, Transtorno do Espectro Autista (TEA).</li>
          <li><strong>Cuidados Paliativos:</strong> Alívio de náuseas, estímulo de apetite e conforto.</li>
        </ul>
      </div>
    )
  },
  duvidas: {
    title: "Dúvidas Frequentes",
    content: (
      <div className="space-y-6">
        <p><strong>1. O tratamento é legalizado no Brasil?</strong><br/>Sim. A Anvisa regulamenta a prescrição e importação de Cannabis Medicinal (RDC 660 e RDC 327). Nossa equipe auxilia em todo o trâmite de autorização.</p>
        <p><strong>2. Quais os efeitos colaterais?</strong><br/>Os efeitos são geralmente leves e temporários, podendo incluir sonolência, boca seca ou alterações de apetite. O acompanhamento médico visa minimizar qualquer desconforto através do ajuste fino da dose.</p>
        <p><strong>3. Quanto tempo leva a autorização da Anvisa?</strong><br/>Atualmente, o processo pela Anvisa costuma ser aprovado em poucos dias úteis após a submissão dos documentos médicos, que nossa equipe realiza por você.</p>
      </div>
    )
  },
  privacidade: {
    title: "Política de Privacidade",
    content: (
      <div className="space-y-6">
        <p>No Instituto Mecura, levamos a sério a privacidade dos seus dados. Esta política rege a forma como coletamos e usamos informações médicas e pessoais.</p>
        <p>Cumprimos rigorosamente com as normas da <strong>LGPD (Lei Geral de Proteção de Dados)</strong> e normas de sigilo médico estabelecidas pelo CFM (Conselho Federal de Medicina).</p>
        <p>Os dados inseridos em nossas plataformas de pré-consulta e prontuário são criptografados de ponta a ponta e acessados exclusivamente pela equipe médica e farmacêutica estritamente necessária para a condução do seu tratamento.</p>
      </div>
    )
  },
  termos: {
    title: "Termos de Uso",
    content: (
      <div className="space-y-6">
        <p>Ao utilizar o site e os serviços do Instituto Mecura, você concorda com nossos Termos de Uso.</p>
        <p>O conteúdo aqui disponibilizado tem caráter estritamente informativo e não substitui a consulta médica. A prescrição de derivados da Cannabis depende de avaliação clínica individual e assinatura do Termo de Consentimento Livre e Esclarecido (TCLE) pelo paciente.</p>
      </div>
    )
  },
  cookies: {
    title: "Política de Cookies",
    content: (
      <div className="space-y-6">
        <p>Nosso site utiliza cookies essenciais para garantir o funcionamento técnico de elementos da interface e de segurança.</p>
        <p>Não utilizamos cookies de rastreamento de marketing invasivo ou compartilhamento de dados com terceiros não autorizados. Respeitamos as restrições e configurações de segurança e de política de não-rastreamento do seu navegador.</p>
      </div>
    )
  }
};

function InfoModal({ contentKey, onClose }: { contentKey: ModalContentKey | null, onClose: () => void }) {
  // Prevent scrolling on body
  useEffect(() => {
    if (contentKey) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [contentKey]);

  return (
    <AnimatePresence>
      {contentKey && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex justify-end"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl h-full bg-surface border-l border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-display text-white uppercase tracking-wide">
                {modalData[contentKey].title}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 md:p-10 flex-1 overflow-y-auto hide-scrollbar text-text-primary text-sm leading-relaxed">
              {modalData[contentKey].content}
            </div>
            
            <div className="p-6 border-t border-border bg-surface-elevated/30">
               <a 
                 href="https://mecura.sementesagrada.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 w-full py-4 bg-accent text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-[1.02] transition-transform duration-300"
               >
                 Agendar Consulta
                 <ArrowUpRight className="w-4 h-4" />
               </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  const [activeModal, setActiveModal] = useState<ModalContentKey | null>(null);

  return (
    <>
      <InfoModal contentKey={activeModal} onClose={() => setActiveModal(null)} />
      <footer className="pt-32 pb-8 px-6 md:px-12 bg-background flex flex-col items-center justify-center overflow-hidden border-t border-border">
       <div className="w-full max-w-[1600px] mx-auto flex flex-col">
         
         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20 md:mb-32 text-left">
           <div className="flex flex-col gap-5">
             <h4 className="text-white font-sans uppercase tracking-[0.15em] text-xs font-bold mb-2">O Instituto</h4>
             <button onClick={() => setActiveModal("sobre")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Sobre Nós</button>
             <button onClick={() => setActiveModal("equipe")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">A Equipe Médico-Científica</button>
             <button onClick={() => setActiveModal("ciencia")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Nossa Ciência</button>
           </div>
           
           <div className="flex flex-col gap-5">
             <h4 className="text-white font-sans uppercase tracking-[0.15em] text-xs font-bold mb-2">Serviços</h4>
             <a href="https://mecura.sementesagrada.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors text-sm font-semibold w-fit">Agendar Consulta</a>
             <button onClick={() => setActiveModal("tratamentos")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Tratamentos</button>
             <button onClick={() => setActiveModal("duvidas")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Dúvidas Frequentes</button>
           </div>

           <div className="flex flex-col gap-5">
             <h4 className="text-white font-sans uppercase tracking-[0.15em] text-xs font-bold mb-2">Legal</h4>
             <button onClick={() => setActiveModal("privacidade")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Política de Privacidade</button>
             <button onClick={() => setActiveModal("termos")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Termos de Uso</button>
             <button onClick={() => setActiveModal("cookies")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Política de Cookies</button>
           </div>

           <div className="flex flex-col gap-5">
             <h4 className="text-white font-sans uppercase tracking-[0.15em] text-xs font-bold mb-2">Contato</h4>
             <a href="https://wa.me/5566996280883" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors text-sm flex items-center gap-2 w-fit">
               <MessageCircle className="w-4 h-4" /> (66) 99628-0883
             </a>
             <a href="mailto:contato@mecura.com.br" className="text-text-muted hover:text-white transition-colors text-sm w-fit">contato@mecura.com.br</a>
             <a href="#" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Instagram @institutomecura</a>
           </div>
         </div>

         <h2 className="text-[20vw] leading-[0.75] tracking-tighter font-display text-surface text-center select-none w-full flex justify-between">
           <span>M</span>
           <span>E</span>
           <span>C</span>
           <span>U</span>
           <span>R</span>
           <span>A</span>
         </h2>

         <div className="w-full flex flex-col md:flex-row justify-between items-center mt-16 md:mt-24 pt-8 border-t border-border gap-6 text-xs text-text-muted uppercase tracking-[0.15em] font-sans">
           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-center md:text-left">
             <p>© {new Date().getFullYear()} Instituto Mecura. Todos os direitos reservados.</p>
           </div>
           <div className="flex gap-8 md:gap-12">
             <span className="text-text-muted">Da semente ao paciente.</span>
           </div>
         </div>
       </div>
    </footer>
    </>
  );
}

function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/5566996280883" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 z-50 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-surface-elevated text-white text-xs font-sans px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
        Fale com Especialista
      </span>
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent selection:text-background">
      <div className="noise-overlay" />
      <NavBar />
      
      <main>
        <HeroAndMission />
        <TherapeuticProperties />
        <InfoCarousel />
        <Services />
        <PatientJourney />
        <Partners />
        <AppSection />
        <Team />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

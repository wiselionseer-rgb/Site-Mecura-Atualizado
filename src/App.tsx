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
      <header className="fixed top-0 left-0 w-full z-40 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="font-display text-2xl tracking-[0.2em] uppercase pointer-events-auto">
          Mecura
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="flex items-center gap-4 group pointer-events-auto"
        >
          <span className="uppercase tracking-widest text-xs font-sans group-hover:opacity-70 transition-opacity hidden md:block">Menu</span>
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <Menu className="w-4 h-4" />
          </div>
        </button>
      </header>

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
              {['Início', 'Visão', 'Atuação', 'Equipe', 'Contato'].map((item, i) => (
                <div key={item} className="overflow-hidden">
                  <motion.a 
                    href="#"
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hover:text-accent transition-colors w-fit block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
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
  
  // Parallax for the combined tall section
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative w-full">
       <motion.div style={{ y }} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Subtler contrast, elegant dark overlay for legibility across both sections */}
         <div className="absolute inset-0 bg-black/40 z-10" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
         <video 
           src="/Cannabis_oil_bottle_on_moss_202608201452-1.mp4" 
           autoPlay 
           loop 
           muted 
           playsInline
           className="w-full h-full object-cover" 
         />
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
                 <RevealText delay={0.4} className="text-text-secondary text-base md:text-lg">
                   Facilitando o acesso seguro, legal e humanizado ao tratamento com Cannabis Medicinal no Brasil.
                 </RevealText>
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
                     className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]" 
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
                     className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]" 
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
                <button className="w-full py-4 bg-[#111] border border-white/5 text-text-primary font-bold uppercase tracking-[0.2em] rounded-full text-[10px] mt-auto hover:bg-[#1a1a1a] transition-colors">
                  Finalizar Análise
                </button>
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
                <button className="w-full py-4 bg-accent text-black font-display tracking-widest uppercase rounded-full text-sm mb-10 hover:scale-105 transition-transform duration-300">
                  Obter App
                </button>
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
  { name: "Lucas & Alessandra", role: "Fundadores", img: "/lucas-alessandra-new.png" },
  { name: "Wilian", role: "Conselheiro Jurídico", img: "/wilian.jpg" }
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
                   className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]" 
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

function Footer() {
  return (
    <footer className="pt-32 pb-8 px-6 md:px-12 bg-background flex flex-col items-center justify-center overflow-hidden">
       <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center">
         <h2 className="text-[20vw] leading-[0.75] tracking-tighter font-display text-surface text-center select-none w-full flex justify-between">
           <span>M</span>
           <span>E</span>
           <span>C</span>
           <span>U</span>
           <span>R</span>
           <span>A</span>
         </h2>
         <div className="w-full flex flex-col md:flex-row justify-between items-center mt-16 md:mt-24 pt-8 border-t border-border gap-6 text-xs text-text-muted uppercase tracking-[0.15em] font-sans">
           <p>© {new Date().getFullYear()} Instituto Mecura.</p>
           <div className="flex gap-8 md:gap-12">
             <a href="#" className="hover:text-text-primary transition-colors">Instagram</a>
             <a href="#" className="hover:text-text-primary transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-text-primary transition-colors">Contato</a>
           </div>
         </div>
       </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent selection:text-background">
      <div className="noise-overlay" />
      <NavBar />
      
      <main>
        <HeroAndMission />
        <InfoCarousel />
        <Services />
        <Partners />
        <AppSection />
        <Team />
      </main>

      <Footer />
    </div>
  );
}

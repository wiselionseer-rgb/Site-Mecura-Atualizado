/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Leaf, 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Scale, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone,
  ChevronDown,
  Menu,
  X,
  Smartphone,
  Apple,
  Play,
  ExternalLink,
  Sprout,
  Package,
  MessageSquare,
  FileText,
  Bell,
  Plus,
  Minus,
  Search,
  HelpCircle,
  Moon,
  Wind,
  Target,
  Heart,
  Activity,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrivacyPolicy } from "./PrivacyPolicy";

interface ConditionItemProps {
  title: string;
  description: string;
  icon: any;
  index: number;
  key?: any;
}

function ConditionItem({ title, description, icon: Icon, index }: ConditionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 px-6 md:px-10 flex items-center justify-between text-left rounded-2xl border transition-all duration-500 relative overflow-hidden bg-white/5"
        style={{
          borderColor: isOpen ? 'rgba(170,255,0,0.3)' : 'rgba(255,255,255,0.05)',
          background: isOpen ? 'linear-gradient(to right, rgba(170,255,0,0.05), transparent)' : 'rgba(255,255,255,0.02)'
        }}
      >
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-accent text-black' : 'bg-white/5 text-white group-hover:bg-accent/20 group-hover:text-accent'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className={`text-xl md:text-2xl font-serif font-bold transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent/80'}`}>
            {title}
          </h3>
        </div>
        
        <div className={`relative z-10 p-2 rounded-full transition-all duration-500 ${isOpen ? 'text-accent rotate-180' : 'text-white/50 group-hover:text-accent'}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="p-6 md:p-10 pt-4 md:pt-6 text-text-secondary leading-relaxed text-lg border-l-2 border-accent/30 ml-12 md:ml-16 mt-2">
          {description}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  category: string;
  key?: any;
}

function FAQItem({ question, answer, index, category }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-start justify-between text-left border-b border-white/10 group-hover:border-accent/30 transition-colors relative overflow-hidden"
      >
        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/0 group-hover:bg-accent/50 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
        
        <div className="flex gap-6 md:gap-12">
          <span className="font-mono text-xs text-accent opacity-50 mt-1.5">0{index + 1}</span>
          <div>
            <div className="text-accent font-mono text-[10px] uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {category}
            </div>
            <h3 className={`text-xl md:text-2xl font-serif font-medium transition-all ${isOpen ? 'text-accent' : 'text-white group-hover:text-accent/80'}`}>
              {question}
            </h3>
          </div>
        </div>
        
        <div className={`mt-1.5 p-1 rounded-full border transition-all duration-500 ${isOpen ? 'border-accent bg-accent text-black rotate-45' : 'border-white/20 text-white group-hover:border-accent group-hover:text-accent'}`}>
          <Plus className="w-5 h-5" />
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        <div className="py-8 pl-16 md:pl-24 pr-12 text-text-secondary text-lg leading-relaxed border-b border-white/10">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const teamScrollRef = useRef<HTMLDivElement>(null);

  const scrollTeam = (direction: 'left' | 'right') => {
    if (teamScrollRef.current) {
      const scrollAmount = teamScrollRef.current.clientWidth * 0.8;
      teamScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services = [
    {
      icon: <Stethoscope strokeWidth={1.2} className="w-6 h-6 text-accent" />,
      title: "Consulta Médica",
      description: "Acesso a médicos especialistas em medicina canabinoide para prescrição e acompanhamento personalizado.",
      image: "/consulta-medica.jpg"
    },
    {
      icon: <Package strokeWidth={1.2} className="w-6 h-6 text-accent" />,
      title: "Acesso Fácil ao Medicamento",
      description: "Fazemos o seu processo para liberação da Anvisa para importação. Consultores canábicos disponíveis para todo suporte e acolhimento.",
      image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Scale strokeWidth={1.2} className="w-6 h-6 text-accent" />,
      title: "Suporte Jurídico",
      description: "Orientação especializada para garantir seu direito ao tratamento dentro da legalidade brasileira.",
      image: "/suporte-juridico.jpg"
    },
    {
      icon: <BookOpen strokeWidth={1.2} className="w-6 h-6 text-accent" />,
      title: "Educação e Cursos",
      description: "Capacitação para pacientes, familiares e profissionais sobre o uso terapêutico da cannabis.",
      image: "/educacao.jpg"
    },
    {
      icon: <Sprout strokeWidth={1.2} className="w-6 h-6 text-accent" />,
      title: "Habeas Corpus p/ Plantio",
      description: "Suporte completo para obtenção de Habeas Corpus preventivo, garantindo seu direito ao auto-cultivo legal e seguro.",
      image: "/grok-image-29e89451-033b-4b4f-a232-c734b224a8b1.png"
    },
    {
      icon: <Leaf strokeWidth={1.2} className="w-6 h-6 text-accent" />,
      title: "Banco de Sementes Premium",
      description: "Facilitamos o acesso ao que há de melhor no mercado internacional, com genéticas exclusivas e acessórios de ponta para o seu cultivo.",
      image: "/22_Hyperrealistic_photography_8K_2_20260321_141901.png"
    }
  ];

  const stats = [
    { 
      value: "100%", 
      label: "Legalidade", 
      description: "Atuação estrita sob as normas da ANVISA e CFM." 
    },
    { 
      value: "Grau", 
      label: "Farmacêutico", 
      description: "Prescrição exclusiva de produtos com certificação internacional." 
    },
    { 
      value: "360º", 
      label: "Cuidado Integral", 
      description: "Acompanhamento contínuo da prescrição à evolução clínica." 
    },
    { 
      value: "+40", 
      label: "Patologias", 
      description: "Protocolos terapêuticos baseados em evidências científicas sólidas." 
    }
  ];

  const team = [
    {
      name: "Dr. Guilherme Taveira Dias",
      role: "Diretor Médico",
      specialty: "Medicina Canabinoide",
      image: "/dr-guilherme.png",
      description: "Médico dedicado ao acolhimento e tratamento humanizado, focado em proporcionar qualidade de vida e bem-estar através da medicina canabinoide."
    },
    {
      name: "Lucas Neres e Alessandra Neres",
      role: "Presidente e Vice-Presidente",
      specialty: "Presidência",
      image: "/lucas-alessandra-new.png",
      description: "Liderando o Instituto Mecura com a missão de democratizar o acesso à medicina canabinoide, oferecendo acolhimento e suporte integral aos pacientes e suas famílias."
    },
    {
      name: "Eng. Agr. Wilian Dalenogare Pereira",
      role: "Diretor Agrônomo",
      specialty: "Cultivo e Genética",
      image: "/wilian.jpg",
      description: "Especialista em Liberações de HC para pessoas físicas e jurídicas, Expert em Produção em escala Agrícola."
    },
    {
      name: "Pedro Nicoletti",
      role: "Diretor de Ensino",
      specialty: "Ensino e Pesquisa",
      image: "/Design sem nome (21)-1.png",
      description: "Especialista e Professor Herbalista com profunda expertise em fitoterapia clínica. Lidera nossos esforços de pesquisa e capacitação, traduzindo evidências científicas em programas educacionais de excelência sobre o uso terapêutico da Cannabis."
    }
  ];

  const partners = [
    {
      name: "GreenBudz",
      category: "MEDICAMENTOS E ÓLEOS",
      description: "Excelência em medicina canabinoide. Formulações exclusivas de óleos e gummies com pureza farmacêutica e certificação internacional, garantindo máxima eficácia terapêutica.",
      image: "/Whisk_4470564e35c5e8f83cd4c2a00f161bdcdr.png",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      )
    },
    {
      name: "Highbreed Seeds",
      category: "GENÉTICA E SEMENTES",
      description: "A ciência por trás do cultivo. Genéticas de elite e sementes estabilizadas com altos teores de CBD/THC, desenvolvidas para pacientes que buscam autonomia e resultados superiores.",
      image: "/Whisk_0dc4c71167beee0ba7b4840785bc172bdr.png",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-accent">
          <path d="M7 20h10" />
          <path d="M10 20c5.5-1.25 6-4.5 9-10.5 0-1 1-1.5 2-1" />
          <path d="M9.5 14.5c-5.35-2.05-6-5.33-6-10.5 0-1-1-1.5-2-1" />
          <path d="M12 20v-8" />
        </svg>
      )
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen selection:bg-accent selection:text-dark-bg relative">
        {/* Global Fixed Background */}
        <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
          <img 
            src="https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=2070&auto=format&fit=crop" 
            alt="Background Texture"
            className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>
        
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}
        >
          <div className="container-custom mx-auto px-6 h-24 flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-wide">
                Instituto<span className="text-accent">Mecura</span>
              </span>
            </div>
          </div>
        </motion.nav>

        <PrivacyPolicy onBack={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-accent selection:text-dark-bg relative">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
        <img 
          src="https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=2070&auto=format&fit=crop" 
          alt="Background Texture"
          className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass border-b border-border' : 'bg-transparent border-b border-transparent'}`}
      >
        <div className="container-custom h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Leaf strokeWidth={1.2} className="text-accent-text w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-white">Instituto Mecura</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
            <a href="#home" className="hover:text-accent transition-colors">Início</a>
            <a href="#servicos" className="hover:text-accent transition-colors">Serviços</a>
            <a href="#equipe" className="hover:text-accent transition-colors">Equipe</a>
            <a href="#parceiros" className="hover:text-accent transition-colors">Parceiros</a>
            <a href="#app" className="hover:text-accent transition-colors">App</a>
            <Button variant="outline" className="border-accent text-white hover:bg-accent hover:text-accent-text border-2 font-bold rounded-full px-6">
              Agendar Consulta
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass border-b border-border p-6 flex flex-col gap-4"
          >
            <a href="#home" className="text-white" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#servicos" className="text-white" onClick={() => setIsMenuOpen(false)}>Serviços</a>
            <a href="#equipe" className="text-white" onClick={() => setIsMenuOpen(false)}>Equipe</a>
            <a href="#parceiros" className="text-white" onClick={() => setIsMenuOpen(false)}>Parceiros</a>
            <a href="#app" className="text-white" onClick={() => setIsMenuOpen(false)}>App</a>
            <Button className="bg-accent text-accent-text w-full font-bold rounded-full">Agendar Consulta</Button>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-overlay z-10" />
          <img 
            src="https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=2070&auto=format&fit=crop" 
            alt="Cannabis Medicinal"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-accent/20 text-accent-dark border-none px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded-full">
              Da Semente ao Paciente
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-6 leading-[1.1] tracking-tight text-white">
              Saúde <span className="text-accent italic">Humanizada</span> e Legalizada.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-[520px] mx-auto mb-10 font-normal leading-[1.7]">
              Facilitamos o acesso ao tratamento com Cannabis Medicinal no Brasil de forma segura, ética e acompanhada por especialistas.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-accent text-accent-text hover:bg-white transition-all px-8 h-14 text-base font-bold rounded-full group">
                Começar Tratamento
                <ArrowRight strokeWidth={1.2} className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Dialog>
                <DialogTrigger render={<Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 h-14 text-base rounded-full">Saber Mais</Button>} />
                <DialogContent className="bg-[#111111] border-white/10 text-white sm:max-w-[700px] rounded-[2rem] p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                  <DialogHeader className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <Sparkles className="w-8 h-8 text-accent" />
                    </div>
                    <DialogTitle className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                      O Poder Transformador da <span className="text-accent italic">Cannabis Medicinal</span>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-light">
                    <p>
                      A cannabis medicinal não é apenas um tratamento; é uma reconexão com o equilíbrio natural do seu corpo. Através do sistema endocanabinoide, presente em todos nós, os compostos da planta atuam como chaves perfeitas para restaurar a harmonia interna, trazendo alívio onde antes havia dor e esperança onde havia incerteza.
                    </p>
                    <p>
                      Nossa missão é guiar você nessa jornada de cura. A terapia canabinoide tem se mostrado uma aliada poderosa e transformadora para uma vida com mais qualidade, dignidade e bem-estar, devolvendo a você o controle sobre a sua própria saúde.
                    </p>
                    
                    <div className="my-8 h-[1px] w-full bg-white/10" />
                    
                    <h4 className="text-xl font-serif font-bold text-white mb-4">Condições que podem ser tratadas:</h4>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {[
                        "Dor Crônica e Fibromialgia",
                        "Ansiedade e Depressão",
                        "Insônia e Distúrbios do Sono",
                        "Epilepsia e Convulsões",
                        "Parkinson e Alzheimer",
                        "Esclerose Múltipla",
                        "Autismo (TEA)",
                        "Efeitos da Quimioterapia",
                        "Doenças Inflamatórias",
                        "Enxaqueca Crônica"
                      ].map((condition, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-base">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="my-8 h-[1px] w-full bg-white/10" />
                    
                    <p className="text-white/90 font-medium">
                      Cada paciente é único, e o tratamento é personalizado para as suas necessidades. Permita-se viver uma vida melhor, mais leve e com menos limitações.
                    </p>
                  </div>
                  
                  <div className="mt-10 flex justify-end">
                    <Button 
                      onClick={() => {
                        const contactSection = document.getElementById('contato');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-accent text-accent-text hover:bg-accent-hover font-bold tracking-widest uppercase text-xs px-8 py-6 rounded-full shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:shadow-[0_0_30px_rgba(170,255,0,0.5)] transition-all duration-300"
                    >
                      Agendar Avaliação
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30"
        >
          <ChevronDown strokeWidth={1.2} className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Image Marquee Section */}
      <section className="py-12 bg-black/20 backdrop-blur-sm overflow-hidden border-y border-white/5">
        <div className="relative w-full flex overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 60,
            }}
          >
            {/* Duplicate the array to create a seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 md:gap-8 px-2 md:px-4">
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-1.jpg.png" alt="Galeria 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-2.jpg.png" alt="Galeria 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-3.jpg.png" alt="Galeria 3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-4.jpg.png" alt="Galeria 4" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-5.jpg.png" alt="Galeria 5" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-6.jpg.png" alt="Galeria 6" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-7.jpg.png" alt="Galeria 7" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-8.jpg.png" alt="Galeria 8" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-9.jpg.png" alt="Galeria 9" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-[280px] h-[180px] md:w-[400px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                  <img src="/galeria-10.jpg.png" alt="Galeria 10" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Cinematic & High-End */}
      <section id="sobre" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
        {/* Cinematic Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Neon Glow Border Effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 rounded-[3rem] blur-lg group-hover:blur-xl transition-all duration-1000 opacity-40 group-hover:opacity-100 animate-[shimmer_4s_infinite]" style={{ backgroundSize: '200% 100%' }} />
            
            <div className="bg-surface/90 backdrop-blur-2xl border border-accent/20 rounded-[3rem] p-12 md:p-20 shadow-[inset_0_0_40px_rgba(170,255,0,0.05)] relative overflow-hidden h-full w-full">
              {/* Animated subtle background elements */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(170,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(170,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 relative z-10">
                {stats.map((stat, i) => (
                  <div 
                    key={i}
                    className={`flex flex-col items-center text-center md:px-8 relative group/stat ${
                      i !== stats.length - 1 ? "md:border-r border-accent/10 pb-16 md:pb-0 border-b md:border-b-0" : ""
                    }`}
                  >
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.3, type: "spring" }}
                      className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 group-hover/stat:to-accent transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/stat:drop-shadow-[0_0_25px_rgba(170,255,0,0.4)]"
                    >
                    {stat.value}
                  </motion.div>
                  <div className="text-accent font-mono font-bold text-xs md:text-sm uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-accent/50" />
                    {stat.label}
                    <span className="w-4 h-[1px] bg-accent/50" />
                  </div>
                  <div className="text-text-secondary text-sm md:text-base leading-relaxed max-w-[240px] font-light group-hover/stat:text-white/80 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section-padding relative overflow-hidden bg-transparent">
        <div className="container-custom relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">Nossas Frentes de Atuação</h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg leading-[1.7]">Oferecemos um ecossistema completo para que sua jornada terapêutica seja tranquila e eficaz.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {services.map((service, i) => (
              <div key={i} className="w-full max-w-[420px]">
                <Dialog>
                  <DialogTrigger render={<motion.button {...fadeInUp} transition={{ delay: i * 0.15 }} className="group w-full text-left" />}>
                    <Card className="bg-[#111] border-white/10 hover:border-accent/50 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(170,255,0,0.15)] transition-all duration-500 overflow-hidden relative h-[500px] rounded-[2.5rem] cursor-pointer text-left">
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-70"
                          referrerPolicy="no-referrer"
                        />
                        {/* Cinematic Gradients - Lighter for more "life" */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />
                        
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-accent/50 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
                      </div>

                      <CardContent className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="w-16 h-16 rounded-2xl bg-[#111]/80 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(170,255,0,0.3)] transition-all duration-500">
                            {/* We clone the icon to ensure it has the right classes on hover if needed, but it's already text-accent */}
                            <div className="scale-125 group-hover:text-white transition-colors duration-500">
                              {service.icon}
                            </div>
                          </div>
                          <div className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase group-hover:text-accent font-bold transition-colors duration-500">
                            0{i + 1}
                          </div>
                        </div>
                        
                        <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                          <h3 className="text-3xl font-serif font-bold mb-4 text-white group-hover:text-accent transition-colors duration-500 leading-tight">
                            {service.title}
                          </h3>
                          
                          <div className="h-[2px] w-12 bg-white/30 mb-6 group-hover:w-full group-hover:bg-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_10px_rgba(170,255,0,0.5)]" />
                          
                          <p className="text-text-secondary text-[1rem] leading-relaxed mb-8 opacity-90 group-hover:opacity-100 group-hover:text-white/90 transition-all duration-500 font-light">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center text-accent font-bold text-sm uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                            <span className="mr-3 relative">
                              Explorar
                              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-accent group-hover:bg-white transition-all duration-500 group-hover:w-full" />
                            </span>
                            <ArrowRight strokeWidth={2.5} className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-[#111111] border-white/10 text-white sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden">
                      <div className="relative h-[250px] w-full">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover opacity-60"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                        <div className="absolute bottom-6 left-8 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                            {service.icon}
                          </div>
                          <DialogTitle className="text-3xl font-serif font-bold text-white">
                            {service.title}
                          </DialogTitle>
                        </div>
                      </div>
                      <div className="p-8 pt-4">
                        <DialogDescription className="text-text-secondary text-lg leading-relaxed font-light mb-8">
                          {service.description}
                          <br/><br/>
                          Nossa equipe está pronta para oferecer um atendimento humanizado e focado nas suas necessidades específicas. Entre em contato para saber mais detalhes sobre como podemos ajudar.
                        </DialogDescription>
                        <div className="flex justify-end">
                          <Button 
                            onClick={() => {
                              const contactSection = document.getElementById('contato');
                              if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="bg-accent text-accent-text hover:bg-accent-hover font-bold tracking-widest uppercase text-xs px-8 py-6 rounded-full shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:shadow-[0_0_30px_rgba(170,255,0,0.5)] transition-all duration-300"
                          >
                            Falar com Especialista
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="section-padding relative overflow-hidden bg-surface-elevated/30 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(170,255,0,0.03)_0%,transparent_70%)]" />
        <div className="container-custom relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white uppercase tracking-tight">
              Cannabis, Ciência e<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">Diferentes Condições</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-[1.7]">
              Descubra como a medicina canabinoide atua no sistema endocanabinoide para transformar sua qualidade de vida em diversas áreas.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { title: "Melhora do Sono", icon: Moon, desc: "A cannabis atua no sistema endocanabinoide para regular os ciclos de sono, reduzindo a insônia e promovendo um descanso profundo e reparador." },
              { title: "Mais Calma", icon: Wind, desc: "Propriedades ansiolíticas ajudam a acalmar o sistema nervoso, reduzindo o estresse diário e promovendo uma sensação contínua de bem-estar." },
              { title: "Aumento do Foco", icon: Target, desc: "Certas formulações auxiliam na clareza mental e concentração, permitindo maior produtividade sem os efeitos colaterais de estimulantes tradicionais." },
              { title: "Controle da Ansiedade", icon: Heart, desc: "O CBD tem demonstrado eficácia significativa na modulação de respostas de ansiedade, oferecendo um alívio natural e seguro." },
              { title: "Dor Crônica", icon: Activity, desc: "Ação anti-inflamatória e analgésica potente, oferecendo uma alternativa natural para o manejo de dores crônicas e neuropáticas." },
              { title: "Melhora no Esporte", icon: Activity, desc: "Auxilia na recuperação muscular, redução de inflamações pós-treino e melhora do foco durante a prática esportiva." },
              { title: "Aumento da Libido", icon: Flame, desc: "Reduz a ansiedade de performance e aumenta a sensibilidade, promovendo uma conexão mais profunda e relaxada." },
              { title: "Outras Possibilidades", icon: Sparkles, desc: "O tratamento é personalizado. A medicina canabinoide também auxilia em casos de epilepsia, Parkinson, Alzheimer, autismo, entre outras condições." }
            ].map((condition, i) => (
              <ConditionItem 
                key={i} 
                index={i}
                title={condition.title} 
                description={condition.desc} 
                icon={condition.icon} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="section-padding relative overflow-hidden bg-transparent">
        <div className="container-custom relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">Especialistas ao seu lado</h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg leading-[1.7]">Uma equipe multidisciplinar dedicada a oferecer o melhor suporte médico, jurídico e agronômico.</p>
          </motion.div>

          <div className="relative w-full flex overflow-hidden -mx-4 px-4 md:mx-0 md:px-0 py-8">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40,
              }}
            >
              {/* Duplicate the array to create a seamless loop */}
              {[...Array(2)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-8">
                  {team.map((member, i) => (
                    <div key={i} className="w-[85vw] md:w-[400px] shrink-0">
                      <div className="group h-full">
                        <Card className="bg-[#111111] border border-border/50 hover:border-accent/30 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(170,255,0,0.05)] transition-all duration-500 overflow-hidden rounded-[2rem] h-full flex flex-col whitespace-normal">
                          <div className="relative h-[400px] shrink-0 overflow-hidden bg-surface-elevated">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent opacity-90" />
                            <Badge className="absolute top-6 left-6 bg-accent text-accent-text hover:bg-accent border-none font-bold text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                              {member.specialty}
                            </Badge>
                          </div>
                          <CardContent className="p-10 relative z-10 bg-[#111111] -mt-20 flex-1 flex flex-col">
                            <h3 className="text-xl font-serif font-bold text-white mb-2">{member.name}</h3>
                            <p className="text-accent font-bold text-[10px] uppercase tracking-widest mb-6">{member.role}</p>
                            <p className="text-text-secondary text-sm leading-relaxed flex-1">
                              {member.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="parceiros" className="relative overflow-hidden" style={{ 
        paddingTop: 'clamp(100px, 14vw, 180px)', 
        paddingBottom: 'clamp(100px, 14vw, 180px)',
        background: 'transparent'
      }}>
        {/* Optional Dot Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="container-custom relative z-10">
          {/* Bloco 1: Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-[60px] h-[1px] bg-accent mx-auto mb-8" />
            <div className="text-[0.65rem] tracking-[0.25em] text-accent font-medium uppercase mb-6">Parceiros Estratégicos</div>
            <h2 className="font-serif font-extrabold text-white leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Quem está ao nosso lado
            </h2>
            <p className="text-[1rem] text-white/50 max-w-[480px] mx-auto mt-5 leading-[1.7]">
              Trabalhamos apenas com marcas que passam pelo nosso rigoroso processo de curadoria técnica e ética.
            </p>
          </motion.div>

          {/* Bloco 2: Faixa de Logos */}
          <div className="mb-20 overflow-hidden relative" style={{
            background: 'rgba(255,255,255,0.03)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '1.25rem 0',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}>
            <div className="flex whitespace-nowrap items-center w-max" style={{ animation: 'scroll-left 20s linear infinite' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                  {["GreenBudz", "Highbreed Seeds"].map((name, j) => (
                    <div key={j} className="flex items-center">
                      <span className="text-white/35 hover:text-white transition-colors duration-300 font-serif text-xl px-8 cursor-default">
                        {name}
                      </span>
                      <span className="text-accent text-lg">•</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bloco 3: Cards Parceiros */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[24px] p-10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-accent/25" style={{
                  background: 'linear-gradient(135deg, #161616 0%, #111111 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 0 0 rgba(0,0,0,0)'
                }}>
                  {/* Hover Box Shadow applied via class for simplicity, or inline if needed. Let's use a wrapper class for hover shadow */}
                  <style>{`
                    .group:hover > div {
                      box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(170,255,0,0.08);
                    }
                  `}</style>

                  {/* Decorative Circle */}
                  <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'rgba(170,255,0,0.03)' }} />
                  
                  {/* Partner Image */}
                  {(partner as any).image && (
                    <div className="relative h-56 mb-8 overflow-hidden rounded-2xl border border-white/5">
                      <img 
                        src={(partner as any).image} 
                        alt={partner.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Top Accent Line (Animated) */}
                  <motion.div 
                    className="h-[2px] bg-accent mb-8"
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.15), ease: "easeOut" }}
                  />

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-7 relative group-hover:scale-110 transition-transform duration-500" style={{
                    background: 'rgba(170,255,0,0.08)',
                    border: '1px solid rgba(170,255,0,0.2)'
                  }}>
                    <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">{partner.icon}</div>
                  </div>
                  
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight group-hover:text-accent transition-colors duration-500">
                      {partner.name}
                    </h3>
                    <span className="font-mono text-[10px] text-accent/40 tracking-widest uppercase">Partner.v1</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-[1px] w-8 bg-accent/30" />
                    <span className="text-[0.7rem] tracking-[0.25em] text-accent uppercase font-bold">
                      {partner.category}
                    </span>
                  </div>
                  
                  <p className="text-lg text-text-secondary leading-relaxed mb-10 font-light italic opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    "{partner.description}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <a href="#" className="inline-flex items-center gap-3 text-xs font-bold text-white uppercase tracking-[0.2em] group/link">
                      <span className="relative">
                        Visitar Site
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover/link:w-full" />
                      </span>
                      <ArrowRight className="w-4 h-4 text-accent group-hover/link:translate-x-1 transition-transform" />
                    </a>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(dot => (
                        <div key={dot} className="w-1 h-1 rounded-full bg-accent/20" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bloco 4: Selo Curadoria */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-3 rounded-full" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '0.75rem 2rem'
            }}>
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-[0.8rem] text-white/45">Todos os parceiros passam por validação técnica e ética do Instituto Mecura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Teleconsultas App Section */}
      <section id="app" className="section-padding relative overflow-hidden bg-transparent">
        {/* Futuristic Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-[0.65rem] tracking-[0.25em] text-accent font-medium uppercase mb-6">
              TUDO EM UM ÚNICO LUGAR
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Seu tratamento na <span className="italic text-accent">palma da mão.</span>
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-[1.7]">
              Acompanhe suas receitas, agende teleconsultas com nossos especialistas e receba suporte jurídico diretamente pelo app do Instituto Mecura.
            </p>
          </motion.div>

          {/* 3 Phones Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative h-[700px] w-full max-w-6xl mx-auto">
            
            {/* Floating Notifications (Futuristic) */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-10 left-0 lg:left-[5%] bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_40px_rgba(170,255,0,0.15)] z-30 hidden md:flex cursor-default hover:bg-black/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-50" />
                <MessageSquare className="w-5 h-5 text-accent relative z-10" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Nova Mensagem</div>
                <div className="text-text-secondary text-[10px]">Dr. Guilherme: "Tudo certo..."</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [15, -15, 15] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 right-0 lg:right-[5%] bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_40px_rgba(170,255,0,0.15)] z-30 hidden md:flex cursor-default hover:bg-black/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-50" style={{ animationDelay: '1s' }} />
                <CheckCircle2 className="w-5 h-5 text-accent relative z-10" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Análise Concluída</div>
                <div className="text-text-secondary text-[10px]">Perfil atualizado com sucesso</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              className="absolute top-24 right-[15%] lg:right-[25%] bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_40px_rgba(170,255,0,0.15)] z-30 hidden lg:flex cursor-default hover:bg-black/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-50" style={{ animationDelay: '2s' }} />
                <FileText className="w-5 h-5 text-accent relative z-10" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Receita Liberada</div>
                <div className="text-text-secondary text-[10px]">Disponível para download</div>
              </div>
            </motion.div>

            {/* Phone 1: Chat/Consultation (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.02, y: -10, zIndex: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[280px] h-[580px] bg-white rounded-[3rem] border-[8px] border-[#222] shadow-2xl overflow-hidden hidden lg:block z-10 scale-95 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 z-30 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#222] rounded-b-2xl z-20" />
              <div className="p-6 pt-12 h-full flex flex-col bg-[#f8f9fa]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="/dr-guilherme.png" alt="Dr" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">Dr. Guilherme Taveira</div>
                    <div className="text-[10px] text-gray-500">CRM 123456</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700 border border-gray-100">
                    Olá! Sou o Dr. Guilherme e vou fazer o seu atendimento hoje.
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700 border border-gray-100">
                    Acabei de ler as informações do seu prontuário. Tem algum ponto que queira reforçar?
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full h-10 border border-gray-200 px-4 flex items-center text-xs text-gray-400">
                    Escreva sua mensagem
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-text">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone 2: Main App Screen (Center) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10, zIndex: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[320px] h-[650px] bg-white rounded-[3rem] border-[8px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden z-20 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 z-30 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222] rounded-b-3xl z-20" />
              <div className="p-6 pt-14 h-full flex flex-col bg-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Leaf className="w-8 h-8 text-accent-text" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-gray-900 leading-tight">Mecura:<br/>da consulta à entrega</div>
                  </div>
                </div>
                <div className="flex justify-center mb-8">
                  <Button className="bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-full px-8 font-bold">Obter</Button>
                </div>
                <div className="flex items-center justify-center gap-4 border-y border-gray-100 py-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400">4,9</div>
                  </div>
                  <div>
                    <div className="flex text-accent mb-1">
                      {[1,2,3,4,5].map(i => <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">2,4 MIL AVALIAÇÕES</div>
                  </div>
                </div>
                <div className="flex-1 bg-[#f0fdf4] rounded-3xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="font-bold text-gray-900 mb-2">Mecura</div>
                    <div className="text-sm text-gray-600 mb-4">O jeito <span className="bg-accent text-accent-text px-1 rounded font-bold">simples e seguro</span> de acessar tratamentos com cannabis medicinal</div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" alt="Paciente" className="absolute bottom-0 left-0 w-full h-1/2 object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Phone 3: Form/Questionnaire (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.02, y: -10, zIndex: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-[280px] h-[580px] bg-white rounded-[3rem] border-[8px] border-[#222] shadow-2xl overflow-hidden hidden lg:block z-10 scale-95 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 z-30 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#222] rounded-b-2xl z-20" />
              <div className="p-6 pt-14 h-full flex flex-col bg-white">
                <div className="font-bold text-xl text-gray-900 mb-2 leading-tight">Sobre o seu estado emocional atual:</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-8">(1) Responda com muita atenção</div>
                
                <div className="flex-1 flex flex-col gap-6">
                  {[
                    "Sente muita tristeza?",
                    "Perde o foco facilmente?",
                    "Tem problemas de memória?",
                    "Fica facilmente irritado ou triste?",
                    "Possui problemas com stress?"
                  ].map((q, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="text-xs font-bold text-gray-700 max-w-[70%]">{q}</div>
                      <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Button className="w-full bg-accent hover:bg-accent-hover text-accent-text font-bold rounded-full h-12">
                    Próximo
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Download Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          >
            <Button size="lg" className="bg-[#161616] border border-white/10 hover:bg-[#222] text-white transition-all h-16 px-8 rounded-full flex items-center gap-4 group">
              <Apple strokeWidth={1.5} className="w-6 h-6 text-text-secondary group-hover:text-white transition-colors" />
              <div className="text-left">
                <div className="text-[9px] uppercase font-bold tracking-widest text-text-secondary">Download na</div>
                <div className="text-base font-bold leading-none mt-1">App Store</div>
              </div>
            </Button>
            <Button size="lg" className="bg-[#161616] border border-white/10 hover:bg-[#222] text-white transition-all h-16 px-8 rounded-full flex items-center gap-4 group">
              <Play strokeWidth={1.5} className="w-6 h-6 text-text-secondary group-hover:text-white transition-colors" />
              <div className="text-left">
                <div className="text-[9px] uppercase font-bold tracking-widest text-text-secondary">Disponível no</div>
                <div className="text-base font-bold leading-none mt-1">Google Play</div>
              </div>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Futuristic & Premium Revamp */}
      <section id="faq" className="section-padding relative overflow-hidden bg-transparent">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Side: Sticky Header & Categories */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-32">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-[1px] bg-accent" />
                    <span className="text-accent font-mono text-xs uppercase tracking-[0.3em]">Knowledge Base</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
                    Dúvidas<br />
                    <span className="text-accent">Frequentes</span>
                  </h2>
                  <p className="text-text-secondary text-lg max-w-sm leading-relaxed">
                    Tudo o que você precisa saber para iniciar sua jornada com segurança e transparência.
                  </p>
                </motion.div>

                {/* Category Selector (Futuristic) */}
                <div className="hidden lg:flex flex-col gap-4">
                  {["Geral", "Consultas", "Legalidade", "Entrega"].map((cat, i) => (
                    <motion.button
                      key={cat}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className={`flex items-center gap-4 group text-left transition-all ${i === 0 ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
                    >
                      <span className="font-mono text-[10px] opacity-50">0{i + 1}</span>
                      <span className="text-sm font-bold uppercase tracking-widest">{cat}</span>
                      {i === 0 && <motion.div layoutId="activeCat" className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(170,255,0,0.5)]" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Questions List */}
            <div className="lg:w-2/3">
              <div className="space-y-0 border-t border-white/10">
                {[
                  { 
                    q: "É legal usar cannabis medicinal no Brasil?", 
                    a: "Sim. Desde 2015, a ANVISA permite a importação de produtos à base de cannabis mediante prescrição médica. O processo é totalmente legalizado e regulamentado pela RDC 660/2022.",
                    cat: "Legalidade"
                  },
                  { 
                    q: "Como consigo uma receita médica?", 
                    a: "Você precisa passar por uma consulta com um médico prescritor. O Instituto Mecura conecta você aos melhores especialistas através de nossa plataforma de telemedicina, simplificando todo o processo.",
                    cat: "Consultas"
                  },
                  { 
                    q: "O Mecura comercializa produtos?", 
                    a: "Não. O Instituto Mecura é uma plataforma de saúde e tecnologia que facilita o acesso à consulta, prescrição e suporte. Nós auxiliamos na jornada, mas não vendemos os medicamentos diretamente.",
                    cat: "Geral"
                  },
                  { 
                    q: "Qual é o valor da consulta?", 
                    a: "Os valores variam de acordo com a especialidade e o profissional escolhido. Nossa plataforma oferece transparência total nos preços antes do agendamento.",
                    cat: "Consultas"
                  },
                  { 
                    q: "Qual é o prazo médio de entrega?", 
                    a: "Para produtos importados, o prazo médio é de 15 a 25 dias úteis, dependendo da logística internacional e liberação alfandegária. Produtos nacionais podem chegar em até 7 dias.",
                    cat: "Entrega"
                  },
                  { 
                    q: "Preciso de autorização da ANVISA?", 
                    a: "Sim, para produtos importados. Mas não se preocupe: nossa equipe de suporte auxilia em todo o processo de solicitação da autorização de importação, tornando-o simples e rápido.",
                    cat: "Legalidade"
                  },
                  { 
                    q: "De onde vêm as formulações prescritas?", 
                    a: "Trabalhamos com parceiros que importam de laboratórios certificados nos EUA, Canadá e Europa, além de opções nacionais de alta qualidade disponíveis em farmácias.",
                    cat: "Entrega"
                  },
                  { 
                    q: "Posso viajar com minhas formulações?", 
                    a: "Sim, dentro do território nacional, desde que porte a receita médica e a nota fiscal. Para viagens internacionais, é necessário consultar a legislação do país de destino.",
                    cat: "Legalidade"
                  }
                ].map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} index={i} category={item.cat} />
                ))}
              </div>

              {/* Support CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Ainda tem dúvidas?</div>
                    <div className="text-text-secondary text-sm">Nossa equipe de suporte está pronta para ajudar.</div>
                  </div>
                </div>
                <Button className="bg-white text-black hover:bg-accent hover:text-black transition-all rounded-full px-8 font-bold">
                  Chamar no WhatsApp
                </Button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding px-6 bg-transparent">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto bg-accent noise-bg rounded-[3rem] p-12 md:p-24 text-accent-text text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight text-accent-text">Pronto para transformar sua qualidade de vida?</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto font-medium text-accent-text/60 leading-[1.7]">
              Agende uma consulta de forma gratuita e descubra o tratamento com Cannabis Medicinal feito para você.
            </p>
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Button 
                size="lg" 
                className="group relative bg-background text-white hover:bg-background transition-all px-12 h-16 text-lg font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-surface-elevated to-background bg-[length:200%_100%] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-20" />
                
                <span className="relative z-10 flex items-center gap-3">
                  Falar com Especialista Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>

                {/* Bottom Highlight */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-accent-text/40 text-xs font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
              </span>
              Especialistas disponíveis agora
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/5 pt-24 pb-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Leaf strokeWidth={1.2} className="text-accent-text w-5 h-5" />
                </div>
                <span className="text-2xl font-serif font-bold text-white">Instituto Mecura</span>
              </div>
              <p className="text-text-secondary max-w-md leading-[1.7] mb-8">
                Líderes em medicina canabinoide no Brasil. Unindo ciência, ética e tecnologia para proporcionar bem-estar e saúde integral.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-text transition-all text-white">
                  <Instagram strokeWidth={1.2} className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-text transition-all text-white">
                  <Linkedin strokeWidth={1.2} className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-8 text-white">Links Rápidos</h4>
              <ul className="space-y-4 text-text-secondary text-sm font-medium">
                <li><a href="#sobre" className="hover:text-accent transition-colors">Sobre Nós</a></li>
                <li><a href="#equipe" className="hover:text-accent transition-colors">Nossos Médicos</a></li>
                <li><a href="#parceiros" className="hover:text-accent transition-colors">Parceiros</a></li>
                <li><a href="#app" className="hover:text-accent transition-colors">App Mecura</a></li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('privacy'); window.scrollTo(0, 0); }}
                    className="hover:text-accent transition-colors"
                  >
                    Política de Privacidade
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-lg mb-8 text-white">Contato</h4>
              <ul className="space-y-4 text-text-secondary text-sm font-medium">
                <li className="flex items-center gap-3">
                  <Mail strokeWidth={1.2} className="w-4 h-4 text-accent" />
                  contato@mecura.com.br
                </li>
                <li className="flex items-center gap-3">
                  <Phone strokeWidth={1.2} className="w-4 h-4 text-accent" />
                  +55 (11) 99999-9999
                </li>
                <li className="mt-6 italic">
                  São Paulo, SP - Brasil
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-border mb-12" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted text-xs">
            <p>© 2026 Instituto Mecura. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => { setCurrentPage('privacy'); window.scrollTo(0, 0); }}
                className="hover:text-accent transition-colors"
              >
                Política de Privacidade
              </button>
              <p>Desenvolvido com foco na vida.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const infoModalComponent = `
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
`;

code = code.replace('function Footer() {', infoModalComponent + '\nfunction Footer() {');

// We need to inject useState in Footer and update the links
const footerMatch = code.match(/function Footer\(\) {[\s\S]*?<footer/);
if (footerMatch) {
  const newFooterStart = `function Footer() {
  const [activeModal, setActiveModal] = useState<ModalContentKey | null>(null);

  return (
    <>
      <InfoModal contentKey={activeModal} onClose={() => setActiveModal(null)} />
      <footer`;
  code = code.replace(footerMatch[0], newFooterStart);
}

// Replace the links inside Footer
code = code.replace('<a href="#processo" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Sobre Nós</a>', '<button onClick={() => setActiveModal("sobre")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Sobre Nós</button>');
code = code.replace('<a href="#equipe" className="text-text-muted hover:text-white transition-colors text-sm w-fit">A Equipe Médico-Científica</a>', '<button onClick={() => setActiveModal("equipe")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">A Equipe Médico-Científica</button>');
code = code.replace('<a href="#ciencia" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Nossa Ciência</a>', '<button onClick={() => setActiveModal("ciencia")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Nossa Ciência</button>');

code = code.replace('<a href="#servicos" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Tratamentos</a>', '<button onClick={() => setActiveModal("tratamentos")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Tratamentos</button>');
code = code.replace('<a href="https://wa.me/5566996280883" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Dúvidas Frequentes</a>', '<button onClick={() => setActiveModal("duvidas")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Dúvidas Frequentes</button>');

code = code.replace('<a href="#" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Política de Privacidade</a>', '<button onClick={() => setActiveModal("privacidade")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Política de Privacidade</button>');
code = code.replace('<a href="#" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Termos de Uso</a>', '<button onClick={() => setActiveModal("termos")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Termos de Uso</button>');
code = code.replace('<a href="#" className="text-text-muted hover:text-white transition-colors text-sm w-fit">Política de Cookies</a>', '<button onClick={() => setActiveModal("cookies")} className="text-text-muted hover:text-white transition-colors text-sm text-left w-fit">Política de Cookies</button>');

fs.writeFileSync('src/App.tsx', code);

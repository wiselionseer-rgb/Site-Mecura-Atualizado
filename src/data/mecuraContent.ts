export const BRAND = {
  name: "Instituto Mecura",
  shortName: "MECURA",
  legalEntity: "Instituto Mecura Ltda",
  cnpj: "69.202.927/0001-19",
  appUrl: "https://mecura.sementesagrada.com/",
  instagramUrl: "https://www.instagram.com/mecura.app/",
  instagramHandle: "@mecura.app",
  whatsappUrl: "https://wa.me/5566996280883",
  whatsappDisplay: "(66) 99628-0883",
  email: "contato@mecura.com.br",
  ctaFull: "Consulte agora mesmo sua receita e laudo médico em 5 a 45 minutos",
  ctaCompact: "Consulta em 5–45 min",
} as const;

export interface ScreenPopupHotspot {
  id: string;
  label: string;
  sublabel: string;
  position: "top-right" | "bottom-left";
  modalTitle: string;
  modalTag: string;
  modalDescription: string;
  modalPoints: string[];
}

export interface AppScreenItem {
  id: string;
  step: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
  popups: ScreenPopupHotspot[];
}

export const APP_SCREENS: AppScreenItem[] = [
  {
    id: "triagem",
    step: "01",
    label: "Avaliação & Escalas",
    title: "Triagem guiada com escalas clínicas validadas",
    description:
      "Logo ao abrir o aplicativo Mecura, o paciente acessa instrumentos reconhecidos internacionalmente — como ASRS-18 (OMS), AQ-10 (Cambridge) e a Calculadora GACP de fitomassa — para organizar seus sintomas antes da consulta.",
    highlights: [
      "Teste TDAH · ASRS-18 (OMS)",
      "Teste Autismo · AQ-10 (Cambridge)",
      "Calculadora GACP · Fitomassa para HC",
    ],
    image: "/screen-triagem.jpg",
    alt: "Tela inicial do aplicativo Mecura mostrando escalas validadas TDAH, Autismo e Calculadora GACP",
    popups: [
      {
        id: "popup-escalas",
        label: "ASRS-18 · AQ-10",
        sublabel: "Escalas OMS & Cambridge",
        position: "top-right",
        modalTitle: "Escalas Clínicas Internacionais no App",
        modalTag: "OMS · Cambridge · CFP",
        modalDescription:
          "Antes mesmo de falar com o médico, você pode preencher rastreios clínicos estruturados direto pelo celular. Os resultados ficam vinculados automaticamente ao seu prontuário para agilizar o diagnóstico e a prescrição.",
        modalPoints: [
          "ASRS-18 (OMS): avaliação estruturada de sintomas de atenção e foco (TDAH).",
          "AQ-10 (Cambridge): rastreio validado para o espectro autista (TEA).",
          "Dados criptografados sob sigilo médico (LGPD & CFM).",
        ],
      },
      {
        id: "popup-gacp",
        label: "Calculadora GACP",
        sublabel: "Fitomassa & Suporte HC",
        position: "bottom-left",
        modalTitle: "Calculadora GACP de Fitomassa",
        modalTag: "Apoio Técnico & Jurídico",
        modalDescription:
          "Ferramenta técnica exclusiva para dimensionamento de fitomassa em padrão GACP, integrando a parte agronômica e médica para pacientes que buscam autonomia e segurança documental.",
        modalPoints: [
          "Cálculo técnico alinhado às diretrizes agronômicas do Instituto.",
          "Integração com o histórico clínico do paciente.",
          "Suporte informativo para jornadas de importação ou Habeas Corpus.",
        ],
      },
    ],
  },
  {
    id: "corpo-clinico",
    step: "02",
    label: "Corpo Clínico",
    title: "Médicos prescritores prontos para atendimento",
    description:
      "Nossa junta médica é especializada em Medicina Canabinoide. O paciente visualiza o corpo clínico ativo, inicia a avaliação em 4 passos simples e avança direto para a teleconsulta sem agendas burocráticas.",
    highlights: [
      "Prescritores capacitados no Sistema Endocanabinoide",
      "Atendimento 100% digital sob diretrizes do CFM",
      "Receita e laudo médico emitidos em 5 a 45 minutos após avaliação",
    ],
    image: "/screen-clinico.jpg",
    alt: "Tela do aplicativo Mecura exibindo o Corpo Clínico Integrado com Dr. Guilherme e os 4 passos simples",
    popups: [
      {
        id: "popup-medico",
        label: "Dr. Guilherme",
        sublabel: "Médico Prescritor · Ativo",
        position: "top-right",
        modalTitle: "Corpo Clínico Especializado em Tempo Real",
        modalTag: "Diretrizes CFM · Telemedicina",
        modalDescription:
          "Nossos médicos atuam com foco exclusivo em terapia canabinoide integrativa, avaliando seu quadro de forma individualizada para definir o quimiotipo e a posologia corretos.",
        modalPoints: [
          "Avaliação clínica direta sem meses de espera.",
          "Receita digital com assinatura válida em todo o território nacional.",
          "Laudo médico fundamentado pronto para submissão na ANVISA.",
        ],
      },
      {
        id: "popup-receita-rapida",
        label: "5 a 45 minutos",
        sublabel: "Receita e laudo digital",
        position: "bottom-left",
        modalTitle: "Receita e Laudo Médico em 5 a 45 Minutos",
        modalTag: "Emissão Digital Segura",
        modalDescription:
          "Assim que o médico conclui a sua avaliação, toda a documentação clínica é gerada e liberada diretamente na Área do Paciente para download imediato e início do processo de importação.",
        modalPoints: [
          "Prescrição médica nominal conforme exigência da RDC nº 660/2022.",
          "Laudo detalhado salvo permanentemente no seu histórico.",
          "Apoio imediato da equipe Mecura para autorização ANVISA.",
        ],
      },
    ],
  },
  {
    id: "painel",
    step: "03",
    label: "Painel do Paciente",
    title: "Prontuário, protocolos e farmácia unificados",
    description:
      "No painel pessoal, ficam reunidos sua triagem clínica salva, histórico de consultas, receitas digitais, protocolos personalizados e atalho direto para a importação legal dos medicamentos.",
    highlights: [
      "Triagem clínica salva e criptografada (LGPD)",
      "Acesso rápido a Minha Fila, Farmácia, Protocolo e Histórico",
      "Acompanhamento contínuo da evolução terapêutica",
    ],
    image: "/screen-painel.jpg",
    alt: "Painel do paciente no aplicativo Mecura mostrando serviços rápidos e triagem clínica salva",
    popups: [
      {
        id: "popup-farmacia",
        label: "Farmácia & Protocolo",
        sublabel: "Importação legal ANVISA",
        position: "top-right",
        modalTitle: "Importação Facilitada sob RDC nº 660/2022",
        modalTag: "ANVISA · Uso Próprio Medicinal",
        modalDescription:
          "Com a receita em mãos, o próprio painel conecta você aos medicamentos importados certificados internacionalmente, com nossa equipe cuidando da autorização nominal na ANVISA.",
        modalPoints: [
          "Produtos com laudo laboratorial e pureza farmacêutica comprovada.",
          "Assessoria completa no cadastro e aprovação junto à ANVISA.",
          "Acompanhamento transparente até a entrega na sua residência.",
        ],
      },
      {
        id: "popup-triagem-salva",
        label: "Triagem Salva",
        sublabel: "Prontuário protegido LGPD",
        position: "bottom-left",
        modalTitle: "Seu Prontuário Sempre à Mão",
        modalTag: "Privacidade · Lei nº 13.709/2018",
        modalDescription:
          "Todas as suas informações clínicas — sintomas de ansiedade, sono, dor crônica e intensidade — ficam registradas com segurança para que cada retorno médico seja ainda mais preciso.",
        modalPoints: [
          "Histórico completo de consultas, receitas e laudos em um só lugar.",
          "Ajuste contínuo de dosagem conforme sua resposta terapêutica.",
          "Acesso exclusivo à equipe assistencial autorizada.",
        ],
      },
    ],
  },
  {
    id: "fila",
    step: "04",
    label: "Fila ao Vivo",
    title: "Acompanhamento em tempo real e aviso no WhatsApp",
    description:
      "Você acompanha sua posição exata na fila e a previsão de chamada em tempo real. Quando chegar a sua vez na sala de consulta, recebe notificação direta no app e no WhatsApp.",
    highlights: [
      "Posição na fila e tempo monitorado ao vivo",
      "Notificação simultânea no aplicativo e no WhatsApp",
      "Acesso imediato à Área do Paciente após o atendimento",
    ],
    image: "/screen-fila.jpg",
    alt: "Tela da Fila de Atendimento ao Vivo no aplicativo Mecura com posição na fila e aviso de notificação",
    popups: [
      {
        id: "popup-fila-live",
        label: "Fila Monitorada",
        sublabel: "Posição e previsão reais",
        position: "top-right",
        modalTitle: "Transparência Total na Espera",
        modalTag: "Tempo Real · Sem Agendamento Engessado",
        modalDescription:
          "Você vê exatamente sua posição na fila e o tempo estimado em tempo real, podendo seguir sua rotina tranquilamente enquanto aguarda o chamado do médico.",
        modalPoints: [
          "Atualização contínua da sua posição sem precisar recarregar.",
          "Consulta garantida assim que o cadastro e a triagem são concluídos.",
          "Entrada com um toque direto na sala médica.",
        ],
      },
      {
        id: "popup-whatsapp-aviso",
        label: "Aviso no WhatsApp",
        sublabel: "Notificação automática",
        position: "bottom-left",
        modalTitle: "Chamado no App e no WhatsApp",
        modalTag: "Zero Risco de Perder a Vez",
        modalDescription:
          "Mesmo que você bloqueie a tela do celular, o sistema envia um aviso direto no aplicativo e no seu WhatsApp no instante em que o médico abrir o atendimento.",
        modalPoints: [
          "Alerta simultâneo para garantir pontualidade e tranquilidade.",
          "Funciona tanto no navegador quanto no app instalado (Android e iOS).",
          "Suporte humano disponível no WhatsApp a qualquer momento.",
        ],
      },
    ],
  },
];

export interface ClinicalTrack {
  id: string;
  category: string;
  headline: string;
  summary: string;
  mechanism: string;
  conditions: string[];
  receptors: string;
}

export const CLINICAL_TRACKS: ClinicalTrack[] = [
  {
    id: "saude-mental",
    category: "Saúde Mental & Sono",
    headline: "Regulação do estresse, ansiedade e arquitetura do sono",
    summary:
      "Fitocanabinoides atuam sobre circuitos serotoninérgicos e gabaérgicos, auxiliando no equilíbrio da resposta ao estresse e na qualidade do sono reparador.",
    mechanism: "Modulação de receptores CB1 e 5-HT1A com ajuste individual de CBD/THC.",
    conditions: [
      "Ansiedade generalizada",
      "Insônia crônica resistente",
      "Estresse e burnout",
      "Transtorno de Estresse Pós-Traumático (TEPT)",
    ],
    receptors: "CB1 · 5-HT1A · GABA",
  },
  {
    id: "dor-cronica",
    category: "Dor Crônica & Inflamação",
    headline: "Analgesia periférica e controle inflamatório sustentado",
    summary:
      "A sinalização via receptores CB2 e TRPV1 reduz a sensibilização central e a resposta inflamatória em quadros dolorosos persistentes.",
    mechanism: "Inibição de citocinas pró-inflamatórias e dessensibilização nociceptiva.",
    conditions: [
      "Fibromialgia",
      "Dores neuropáticas",
      "Artrite e artrose",
      "Enxaqueca crônica e dor oncológica",
    ],
    receptors: "CB2 · TRPV1 · PPARγ",
  },
  {
    id: "neurologia",
    category: "Neurologia & Foco",
    headline: "Neuroproteção, modulação sináptica e suporte cognitivo",
    summary:
      "Protocolos personalizados com base em escalas validadas (ASRS-18 e AQ-10) apoiam o manejo de condições neurológicas e do neurodesenvolvimento.",
    mechanism: "Estabilização da excitabilidade neuronal e efeito antioxidante celular.",
    conditions: [
      "TDAH e foco executivo",
      "Transtorno do Espectro Autista (TEA)",
      "Epilepsias refratárias",
      "Parkinson, Alzheimer e Esclerose Múltipla",
    ],
    receptors: "CB1 · CB2 · GPR55",
  },
  {
    id: "paliativos",
    category: "Cuidados Paliativos",
    headline: "Conforto clínico, apetite e preservação da autonomia",
    summary:
      "Acompanhamento compassivo voltado ao alívio de náuseas, controle de espasticidade muscular e melhora global da qualidade de vida.",
    mechanism: "Sinergia terapêutica (efeito comitiva) ajustada à tolerância individual.",
    conditions: [
      "Controle de náuseas pós-quimioterapia",
      "Estímulo de apetite e ganho de conforto",
      "Relaxamento muscular e espasticidade",
      "Suporte integral ao paciente e família",
    ],
    receptors: "CB1 · CB2 · Efeito Comitiva",
  },
];

export interface EcosystemPartner {
  name: string;
  category: string;
  origin: string;
  description: string;
  image: string;
  isLogo?: boolean;
  containLogo?: boolean;
  lightStage?: boolean;
  logoBg?: string;
  toneFilter?: string;
  popupHighlight: string;
  popupDetail: string;
  modalPoints?: string[];
  instagramUrl?: string;
  instagramHandle?: string;
  websiteUrl?: string;
  websiteLabel?: string;
}

export const ECOSYSTEM_PARTNERS: EcosystemPartner[] = [
  {
    name: "SouCannabis",
    category: "Associação Terapêutica",
    origin: "Brasil · Saúde Integrativa & Acolhimento",
    description:
      "Associação terapêutica brasileira dedicada à saúde integrativa e fitoterápica, com acolhimento multidisciplinar, redução de danos e acesso responsável à Cannabis Medicinal.",
    image: "/assets/aistudio/image_58575dd2.png",
    isLogo: true,
    containLogo: true,
    logoBg: "#030504",
    toneFilter: "brightness-[1.04] contrast-[1.04]",
    popupHighlight: "Associação Parceira · Brasil",
    popupDetail: "Acolhimento multidisciplinar integrado à receita e laudo emitidos no app Mecura.",
    modalPoints: [
      "Acolhimento humanizado e acompanhamento multidisciplinar para associados.",
      "Foco em saúde integrativa, fitoterapia canabinoide e redução de danos.",
      "Integração documental facilitada com a receita e o laudo emitidos no aplicativo Mecura.",
    ],
    instagramUrl: "https://www.instagram.com/_soucannabis/",
    instagramHandle: "@_soucannabis",
  },
  {
    name: "GreenBudz",
    category: "Medicamentos & Óleos",
    origin: "Certificação Internacional · Pureza Farmacêutica",
    description:
      "Formulações padronizadas de óleos e gomas terapêuticas com rastreabilidade de lote, laudo laboratorial completo e importação autorizada pela ANVISA.",
    image: "/Whisk_4470564e35c5e8f83cd4c2a00f161bdcdr.png",
    toneFilter: "saturate-[0.88] contrast-[1.04] brightness-[0.94]",
    popupHighlight: "Laudo COA · Lote Auditado",
    popupDetail: "Óleos e gomas padronizados para importação nominal via ANVISA.",
  },
  {
    name: "FlowerMed",
    category: "Medicina Canabinoide",
    origin: "Qualidade · Pesquisa · Informação Responsável",
    description:
      "A FlowerMed atua em medicina canabinoide com foco em qualidade, pesquisa e informação responsável.",
    image: "/assets/aistudio/image_4fa67a51.png",
    isLogo: true,
    logoBg: "#0A2E2A",
    toneFilter: "brightness-[1.02] contrast-[1.04]",
    popupHighlight: "Pesquisa & Qualidade",
    popupDetail: "Atuação focada em ciência canabinoide e informação responsável.",
    instagramUrl: "https://www.instagram.com/theflowermed_/",
    instagramHandle: "@theflowermed_",
  },
  {
    name: "Pangaia",
    category: "Terapia Canabinoide",
    origin: "Pureza · Inovação · Acesso Internacional",
    description:
      "Formulações canabinoides desenvolvidas com rigor laboratorial, rastreabilidade e foco no bem-estar e acesso terapêutico seguro no Brasil.",
    image: "/assets/aistudio/image_13efb1e7.png",
    isLogo: true,
    logoBg: "#1b1442",
    toneFilter: "saturate-[0.58] brightness-[0.78] contrast-[1.12]",
    popupHighlight: "Rigor Laboratorial",
    popupDetail: "Formulações de alta pureza com acesso legalizado ao paciente.",
    instagramUrl: "https://www.instagram.com/pangaiacbd/",
    instagramHandle: "@pangaiacbd",
  },
  {
    name: "HighBreed Seeds",
    category: "Genética & Rastreabilidade",
    origin: "Espanha → Brasil · Genéticas Estabilizadas",
    description:
      "Genética com origem conhecida e estabilidade quimiotípica (CBD/THC), oferecendo respaldo técnico e caminhos legais para pacientes e projetos de cultivo autorizado.",
    image: "/Whisk_0dc4c71167beee0ba7b4840785bc172bdr.png",
    isLogo: true,
    logoBg: "#070908",
    toneFilter: "saturate-[0.86] contrast-[1.06]",
    popupHighlight: "Espanha → Brasil · GACP",
    popupDetail: "Estabilidade quimiotípica (CBD/THC) da semente ao protocolo.",
  },
  {
    name: "SEQUOIA",
    category: "Associação · Pesquisa",
    origin: "Cannabis Medicinal e Pesquisas · Brasil",
    description:
      "Associação Brasileira para Cannabis Medicinal e Pesquisas, dedicada à ciência, pesquisa clínica e ampliação do acesso seguro e acolhedor à terapia canabinoide.",
    image: "/sequoia-logo.svg",
    isLogo: true,
    containLogo: true,
    lightStage: true,
    logoBg: "#FFFFFF",
    popupHighlight: "Cannabis Medicinal & Pesquisas",
    popupDetail: "Associação brasileira voltada à pesquisa científica e cuidado ao paciente.",
    modalPoints: [
      "Associação Brasileira para Cannabis Medicinal e Pesquisas.",
      "Foco em evidência científica, educação e acolhimento responsável ao paciente.",
      "Integração documental direta com a receita e o laudo emitidos no aplicativo Mecura.",
    ],
    websiteUrl: "https://sequoia.esteio.app/#quem-somos",
    websiteLabel: "Site oficial",
  },
];

export interface PartnerAssociation {
  id: string;
  order: string;
  name: string;
  subtitle: string;
  region: string;
  description: string;
  image: string;
  lightStage?: boolean;
  instagramUrl?: string;
  instagramHandle?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  pillars: string[];
  popups: Array<{
    label: string;
    detail: string;
  }>;
}

export const PARTNER_ASSOCIATIONS: PartnerAssociation[] = [
  {
    id: "soucannabis",
    order: "01",
    name: "SouCannabis",
    subtitle: "Associação Terapêutica",
    region: "Saúde Integrativa · Brasil",
    description:
      "A SouCannabis é uma associação terapêutica brasileira dedicada à saúde integrativa e fitoterápica, promovendo acolhimento multidisciplinar, redução de danos, orientação social e acesso responsável ao tratamento com Cannabis Medicinal.",
    image: "/assets/aistudio/image_58575dd2.png",
    instagramUrl: "https://www.instagram.com/_soucannabis/",
    instagramHandle: "@_soucannabis",
    pillars: [
      "Acolhimento humanizado e acompanhamento multidisciplinar para associados.",
      "Foco em saúde integrativa, fitoterapia canabinoide e redução de danos.",
      "Integração documental facilitada com a receita e o laudo emitidos no aplicativo Mecura.",
    ],
    popups: [
      {
        label: "Acolhimento Associativo",
        detail: "Atendimento próximo, escuta qualificada e suporte contínuo ao paciente.",
      },
      {
        label: "Receita & Laudo Integrados",
        detail: "Sua prescrição digital Mecura pronta para iniciar o vínculo associativo.",
      },
    ],
  },
  {
    id: "sequoia",
    order: "02",
    name: "SEQUOIA",
    subtitle: "Cannabis Medicinal e Pesquisas",
    region: "Associação Brasileira · Pesquisa & Saúde",
    description:
      "A SEQUOIA — Associação Brasileira para Cannabis Medicinal e Pesquisas — une produção de conhecimento científico, orientação responsável e acolhimento associativo para pacientes que buscam terapia canabinoide com respaldo e transparência.",
    image: "/sequoia-logo.svg",
    lightStage: true,
    websiteUrl: "https://sequoia.esteio.app/#quem-somos",
    websiteLabel: "Acessar site SEQUOIA",
    pillars: [
      "Associação Brasileira para Cannabis Medicinal e Pesquisas com foco em evidência científica.",
      "Atendimento acolhedor e orientação contínua para pacientes e familiares associados.",
      "Integração ágil com a receita e o laudo digital emitidos pelos médicos do aplicativo Mecura.",
    ],
    popups: [
      {
        label: "Pesquisa & Ciência",
        detail: "Compromisso com estudos, qualidade e informação responsável em medicina canabinoide.",
      },
      {
        label: "Vínculo Facilitado",
        detail: "Documentação médica emitida no app Mecura pronta para iniciar seu acolhimento.",
      },
    ],
  },
];

export interface TeamMember {
  name: string;
  role: string;
  credential: string;
  location?: string;
  emits?: string[];
  bio: string;
  image: string;
  category: "tecnico" | "gestao";
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Guilherme Taveira Dias",
    role: "Médico Prescritor",
    credential: "CRM/MT 17259",
    location: "Clínico Geral • Primavera do Leste – MT",
    emits: [
      "Receita Digital ICP-Brasil",
      "Laudo Pericial Médico p/ HC",
      "TCLE & Laudo Psicomotor",
      "Relatório Evolutivo (90 dias)",
    ],
    bio: "Médico regulador e prescritor especializado em Medicina Canabinoide. Conduz avaliações clínicas individualizadas, titulação segura de fitocanabinoides e a diretoria técnica do corpo clínico integrado Mecura.",
    image: "/dr-guilherme.png",
    category: "tecnico",
  },
  {
    name: "Marco Antônio Boastik",
    role: "Psicólogo Clínico",
    credential: "CRP 08/49215",
    location: "Avaliação Clínica & Saúde Mental",
    emits: [
      "Avaliação de Saúde Mental",
      "Laudo & Parecer Psicológico Oficial",
      "Acompanhamento Emocional",
      "Relatório Evolutivo p/ Habeas Corpus",
    ],
    bio: "Psicólogo clínico responsável pela escuta qualificada em ansiedade, estresse crônico, humor e trauma, emitindo pareceres e laudos psicológicos oficiais integrados ao tratamento e ao dossiê de Salvo-Conduto.",
    image: "/assets/aistudio/image_ca75a6e7.png",
    category: "tecnico",
  },
  {
    name: "Wilian Dalenogare Pereira",
    role: "Engenheiro Agrônomo",
    credential: "CREA-BA Nº 052193520-2",
    location: "Luís Eduardo Magalhães – BA",
    emits: [
      "Parecer Técnico Agronômico",
      "Dimensionamento GACP de Fitomassa",
      "Cálculo de Plantas & Ciclos Anuais",
      "Suporte Técnico p/ Ações de HC",
    ],
    bio: "Engenheiro Agrônomo especialista em genéticas medicinais, padrão GACP e conversão da prescrição médica em fitomassa e ciclos produtivos para rastreabilidade botânica e instrução documental de Habeas Corpus.",
    image: "/wilian.jpg",
    category: "tecnico",
  },
  {
    name: "Lucas & Alessandra",
    role: "Direção Estratégica & Acolhimento",
    credential: "Experiência do Paciente & Expansão",
    location: "Instituto Mecura · Brasil",
    emits: [
      "Central de Apoio Humanizado",
      "Educação em Medicina Canabinoide",
      "Assessoria Documental ANVISA",
    ],
    bio: "Lideram a educação em saúde, a jornada humanizada do paciente no aplicativo Mecura e a expansão da rede de parceiros internacionais e associações terapêuticas em todo o Brasil.",
    image: "/lucas-alessandra-new.png",
    category: "gestao",
  },
];

export const PROCESS_PILLARS = [
  {
    number: "01",
    title: "Cuidado clínico",
    description:
      "Triagem com escalas validadas (OMS e Cambridge) e teleconsulta com prescritores especialistas no Sistema Endocanabinoide.",
  },
  {
    number: "02",
    title: "Receita e laudo em 5 a 45 min",
    description:
      "Após a avaliação médica, sua prescrição digital e laudo clínico ficam disponíveis diretamente na Área do Paciente.",
  },
  {
    number: "03",
    title: "Autorização ANVISA RDC 660",
    description:
      "Cuidamos de toda a submissão regulatória junto à ANVISA para a importação nominal e legalizada do seu medicamento.",
  },
  {
    number: "04",
    title: "Proteção e acompanhamento",
    description:
      "Orientação farmacêutica, suporte jurídico para autonomia do paciente e acompanhamento contínuo de dosagem pelo aplicativo.",
  },
];

export type ModalContentKey =
  | "sobre"
  | "equipe"
  | "ciencia"
  | "tratamentos"
  | "duvidas"
  | "parecer"
  | "privacidade"
  | "termos"
  | "dados"
  | "cookies";

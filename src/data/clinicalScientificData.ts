export interface PathologyEntry {
  id: string;
  name: string;
  cid10: string;
  category:
    | "Saúde Mental & Sono"
    | "Dor Crônica & Inflamação"
    | "Neurologia & Foco"
    | "Autoimunes & Gastro"
    | "Oncologia & Paliativos";
  summary: string;
  endocannabinoidMechanism: string;
  receptors: string;
  cannabinoidProfile: string;
  appTools: string;
  evidenceLevel: "Nível A · Evidência Robusta" | "Nível B · Evidência Moderada/Crescente";
}

export const PATHOLOGY_CATEGORIES = [
  "Todas",
  "Saúde Mental & Sono",
  "Dor Crônica & Inflamação",
  "Neurologia & Foco",
  "Autoimunes & Gastro",
  "Oncologia & Paliativos",
] as const;

export type PathologyCategory = (typeof PATHOLOGY_CATEGORIES)[number];

export const PATHOLOGY_ATLAS: PathologyEntry[] = [
  {
    id: "ansiedade-generalizada",
    name: "Transtorno de Ansiedade Generalizada (TAG) & Pânico",
    cid10: "CID-10 F41.1 / F41.0",
    category: "Saúde Mental & Sono",
    summary:
      "Atua na redução da hiperatividade da amígdala cerebral e na modulação do eixo HPA (cortisol), promovendo estabilidade emocional sem sedação excessiva ou dependência química.",
    endocannabinoidMechanism:
      "Agonismo alostérico em receptores serotoninérgicos 5-HT1A e preservação da anandamida endógena via inibição parcial da enzima FAAH.",
    receptors: "5-HT1A · CB1 · GABA-A",
    cannabinoidProfile: "CBD Full Spectrum ou Broad Spectrum (baixa ou nula psicoatividade)",
    appTools: "Avaliação Médica (CRM/MT 17259) + Laudo Psicológico (CRP 08/49215)",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
  {
    id: "insonia-cronica",
    name: "Insônia Crônica & Distúrbios da Arquitetura do Sono",
    cid10: "CID-10 G47.0 / F51.0",
    category: "Saúde Mental & Sono",
    summary:
      "Facilita a latência para iniciar o sono e reduz despertares noturnos precoces, restaurando ciclos de sono profundo (NREM) sem o efeito ressaca típico de hipnóticos benzodiazepínicos.",
    endocannabinoidMechanism:
      "Regulação do núcleo supraquiasmático e modulação da adenosina e melatonina endógena por fitocanabinoides noturnos.",
    receptors: "CB1 · 5-HT1A · Adenosina A2A",
    cannabinoidProfile: "CBD + CBN noturno e microdoses tituladas de THC quando indicadas",
    appTools: "Triagem de Sono no App + Protocolo Noturno Individualizado",
    evidenceLevel: "Nível B · Evidência Moderada/Crescente",
  },
  {
    id: "tept-burnout",
    name: "Estresse Pós-Traumático (TEPT) & Burnout Severo",
    cid10: "CID-10 F43.1 / Z73.0",
    category: "Saúde Mental & Sono",
    summary:
      "Auxilia na extinção de memórias aversivas recorrentes, redução de pesadelos traumáticos e reequilíbrio da exaustão neuroendócrina crônica.",
    endocannabinoidMechanism:
      "Reestabelecimento da sinalização CB1 no hipocampo e córtex pré-frontal, facilitando a consolidação emocional saudável.",
    receptors: "CB1 · 5-HT1A · Eixo HPA",
    cannabinoidProfile: "CBD Full Spectrum diurno + formulação balanceada noturna",
    appTools: "Plano Completo 360° (Dr. Guilherme + Psicólogo Marco Antônio)",
    evidenceLevel: "Nível B · Evidência Moderada/Crescente",
  },
  {
    id: "fibromialgia",
    name: "Fibromialgia & Síndrome da Sensibilização Central",
    cid10: "CID-10 M79.7",
    category: "Dor Crônica & Inflamação",
    summary:
      "Atua diretamente na hipótese da deficiência clínica endocanabinoide, diminuindo a hipersensibilidade dolorosa difusa, rigidez matinal e fadiga crônica associada.",
    endocannabinoidMechanism:
      "Dessensibilização de nociceptores TRPV1 e inibição de neurotransmissores excitatórios na medula espinhal.",
    receptors: "CB1 · CB2 · TRPV1",
    cannabinoidProfile: "CBD:THC balanceado (1:1 ou 2:1) com terpeno Beta-Cariofileno",
    appTools: "Mapeamento de Intensidade da Dor + Retorno Evolutivo 90 dias",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
  {
    id: "dor-neuropatica",
    name: "Dor Neuropática Periférica, Ciatalgia & Hérnia Discal",
    cid10: "CID-10 G62.9 / M54.4",
    category: "Dor Crônica & Inflamação",
    summary:
      "Reduz choques, queimação e formigamentos persistentes resistentes a anti-inflamatórios comuns, com potencial de poupar doses elevadas de opioides.",
    endocannabinoidMechanism:
      "Bloqueio retrógrado da hiperexcitabilidade de fibras nervosas lesionadas e supressão de microgliose inflamatória.",
    receptors: "CB1 · CB2 · PPARγ · Glicina",
    cannabinoidProfile: "Óleos Full Spectrum + opções tópicas de permeação profunda",
    appTools: "Prescrição ICP-Brasil + Laudo Psicomotor para rotina ativa",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
  {
    id: "enxaqueca-cronica",
    name: "Enxaqueca Crônica & Cefaleia em Salvas Refratária",
    cid10: "CID-10 G43.9 / G44.0",
    category: "Dor Crônica & Inflamação",
    summary:
      "Diminui a frequência mensal e a intensidade das crises vasculares e neurogênicas, atenuando fotofobia, náuseas e dependência de analgésicos de resgate.",
    endocannabinoidMechanism:
      "Inibição da liberação de CGRP (peptídeo relacionado ao gene da calcitonina) no sistema trigeminovascular.",
    receptors: "CB1 · 5-HT1B/1D · TRPV1",
    cannabinoidProfile: "CBD profilático diário + protocolo de resgate médico",
    appTools: "Diário de Sintomas no Painel + Ajuste de Titulação",
    evidenceLevel: "Nível B · Evidência Moderada/Crescente",
  },
  {
    id: "artrite-artrose",
    name: "Artrite Reumatoide, Osteoartrite & Lombalgia Crônica",
    cid10: "CID-10 M05 / M19 / M54.5",
    category: "Dor Crônica & Inflamação",
    summary:
      "Combate a inflamação sinovial e a dor mecânica articular sem as lesões gástricas e renais comuns ao uso prolongado de AINEs.",
    endocannabinoidMechanism:
      "Ativação periférica de receptores CB2 em macrófagos e células sinoviais, reduzindo TNF-α e IL-6.",
    receptors: "CB2 · TRPV1 · PPARγ",
    cannabinoidProfile: "CBD + CBG / Copaíba (Beta-Cariofileno) oral e tópico",
    appTools: "Farmácia Integrada ANVISA RDC 660 + Protocolo Combinado",
    evidenceLevel: "Nível B · Evidência Moderada/Crescente",
  },
  {
    id: "tdah",
    name: "TDAH (Transtorno de Déficit de Atenção e Hiperatividade)",
    cid10: "CID-10 F90.0",
    category: "Neurologia & Foco",
    summary:
      "Oferece suporte adjuvante no controle da impulsividade, agitação interna, ansiedade secundária e insônia causada por estimulantes tradicionais.",
    endocannabinoidMechanism:
      "Modulação dopaminérgica indireta no córtex pré-frontal e estabilização do tônus ansiolítico basal.",
    receptors: "CB1 · D2 (indireto) · 5-HT1A",
    cannabinoidProfile: "CBD + CBG diurno com foco em clareza executiva",
    appTools: "Teste Validado ASRS-18 (OMS) Integrado no App",
    evidenceLevel: "Nível B · Evidência Moderada/Crescente",
  },
  {
    id: "tea-autismo",
    name: "Transtorno do Espectro Autista (TEA)",
    cid10: "CID-10 F84.0",
    category: "Neurologia & Foco",
    summary:
      "Auxilia na redução de crises de irritabilidade, sobrecarga sensorial, rigidez comportamental e distúrbios do sono, favorecendo interação social e autonomia.",
    endocannabinoidMechanism:
      "Equilíbrio entre sinalização excitatória (glutamato) e inibitória (GABA) e aumento do tônus de ocitocina endógena.",
    receptors: "CB1 · CB2 · GABA · Ocitocina",
    cannabinoidProfile: "Extratos ricos em CBD (razões 20:1 ou isolado/full sob titulação)",
    appTools: "Teste Validado AQ-10 (Cambridge) + Acompanhamento Familiar",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
  {
    id: "epilepsia-refrataria",
    name: "Epilepsias Refratárias (Dravet, Lennox-Gastaut & Focais)",
    cid10: "CID-10 G40",
    category: "Neurologia & Foco",
    summary:
      "Indicação com mais alto grau de evidência clínica global, reduzindo de forma expressiva a frequência e duração de crises convulsivas farmacorresistentes.",
    endocannabinoidMechanism:
      "Antagonismo de receptores GPR55, modulação de canais de cálcio/sódio e dessensibilização de TRPV1.",
    receptors: "GPR55 · TRPV1 · Adenosina",
    cannabinoidProfile: "CBD de grau farmacêutico altamente purificado (titulação por mg/kg)",
    appTools: "Laudo Médico Detalhado + Importação Prioritária ANVISA",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
  {
    id: "parkinson-alzheimer-em",
    name: "Parkinson, Alzheimer & Esclerose Múltipla (Espasticidade)",
    cid10: "CID-10 G20 / G30 / G35",
    category: "Neurologia & Foco",
    summary:
      "Alivia espasticidade muscular dolorosa, tremores, agitação noturna (sundowning) e distúrbios do sono REM, além de oferecer ação neuroprotetora antioxidante.",
    endocannabinoidMechanism:
      "Ativação de receptores CB1 nos gânglios da base e proteção mitocondrial mediada por PPARγ e CB2.",
    receptors: "CB1 · CB2 · PPARγ",
    cannabinoidProfile: "Formulações CBD:THC balanceadas ou CBD rico sob ajuste fino",
    appTools: "Consulta por Vídeo 45 min + Relatório Evolutivo 90 dias",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
  {
    id: "doencas-intestinais",
    name: "Doença de Crohn, Retocolite Ulcerativa & Endometriose",
    cid10: "CID-10 K50 / K51 / N80",
    category: "Autoimunes & Gastro",
    summary:
      "Reduz cólicas pélvicas e abdominais refratárias, inflamação da mucosa intestinal e hiperperistaltismo, devolvendo bem-estar à rotina alimentar e produtiva.",
    endocannabinoidMechanism:
      "Alta densidade de receptores CB2 no plexo mioentérico e tecido endometrial reduzindo prostaglandinas e citocinas inflamatórias.",
    receptors: "CB2 · CB1 Entérico · PPARγ",
    cannabinoidProfile: "CBD + CBG + Beta-Cariofileno (anti-inflamatório visceral)",
    appTools: "Avaliação Integrativa + Acompanhamento de Posologia",
    evidenceLevel: "Nível B · Evidência Moderada/Crescente",
  },
  {
    id: "oncologia-paliativos",
    name: "Cuidados Paliativos, Náuseas Pós-Quimioterapia & Caquexia",
    cid10: "CID-10 R11 / R64 / C80",
    category: "Oncologia & Paliativos",
    summary:
      "Proporciona conforto humano e clínico no controle de náuseas e vômitos refratários, estímulo ao apetite, alívio de dor oncológica e melhora global do sono.",
    endocannabinoidMechanism:
      "Atuação no complexo vagal dorsal (centro do vômito) e modulação hipotalâmica de grelina/apetite.",
    receptors: "CB1 · 5-HT3 · CB2",
    cannabinoidProfile: "Sinergia CBD + THC (efeito comitiva) rigorosamente titulada",
    appTools: "Atendimento Compassivo Prioritário + Suporte à Família",
    evidenceLevel: "Nível A · Evidência Robusta",
  },
];

/* --- Official Mecura Plans (Synced 100% with mecura.sementesagrada.com) --- */

export interface MecuraPlan {
  id: "basic" | "psychologist" | "premium" | "complete";
  order: string;
  tierLabel: string;
  highlightKicker: string;
  name: string;
  tagline: string;
  idealFor: string;
  coverImage: string;
  recommended?: boolean;
  professionals: Array<{
    name: string;
    credential: string;
    role: string;
    avatar: string;
  }>;
  deliverables: Array<{
    title: string;
    detail: string;
  }>;
  transparencyNote: string;
  ctaLabel: string;
  ctaUrl: string;
}

export const MECURA_PLANS: MecuraPlan[] = [
  {
    id: "basic",
    order: "01",
    tierLabel: "Entrada Imediata",
    highlightKicker: "Chat Direto · Sem Agendamento",
    name: "Consulta Essencial",
    tagline:
      "A porta de entrada ágil para iniciar seu tratamento legalizado hoje mesmo, sem filas nem agendas engessadas.",
    idealFor: "Ideal para quem quer começar a terapia importada com agilidade",
    coverImage: "/hero-oil-still.jpg",
    professionals: [
      {
        name: "Dr. Guilherme Taveira Dias",
        credential: "CRM/MT 17259",
        role: "Médico Regulador & Prescritor",
        avatar: "/dr-guilherme.png",
      },
    ],
    deliverables: [
      {
        title: "Atendimento imediato via chat na Fila ao Vivo",
        detail: "Acompanhe sua vez em tempo real com aviso automático no app e WhatsApp.",
      },
      {
        title: "Receita Digital oficial ICP-Brasil com QR Code",
        detail: "Liberada em 3 a 5 minutos após avaliação, válida em todo o Brasil.",
      },
      {
        title: "Protocolo terapêutico inicial de dosagem",
        detail: "Orientação clara em gotas para introdução segura de fitocanabinoides.",
      },
      {
        title: "Escalas validadas & acesso ANVISA RDC 660",
        detail: "Prontuário protegido LGPD com ASRS-18 (OMS) e AQ-10 (Cambridge).",
      },
    ],
    transparencyNote:
      "Modalidade focada em início rápido via chat: não inclui chamada por vídeo de 45 min, retorno 90d, Laudo Pericial de HC nem psicólogo.",
    ctaLabel: "Conhecer no aplicativo",
    ctaUrl: "https://mecura.sementesagrada.com/",
  },
  {
    id: "psychologist",
    order: "02",
    tierLabel: "Saúde Mental & CRP",
    highlightKicker: "Escuta Clínica · Parecer Oficial",
    name: "Consulta + Laudo Psicológico",
    tagline:
      "Avaliação emocional individualizada com emissão de Laudo Psicológico Oficial para tratamento e instrução jurídica.",
    idealFor: "Ideal para acolhimento emocional e emissão de parecer CRP",
    coverImage: "/galeria-9.jpg.png",
    professionals: [
      {
        name: "Marco Antônio Boastik",
        credential: "CRP 08/49215",
        role: "Psicólogo Clínico",
        avatar: "/assets/aistudio/image_ca75a6e7.png",
      },
    ],
    deliverables: [
      {
        title: "Consulta individualizada com Psicólogo Clínico",
        detail: "Escuta qualificada sobre ansiedade, estresse crônico, humor, trauma e rotina.",
      },
      {
        title: "Laudo / Parecer Psicológico Oficial (CRP 08/49215)",
        detail: "Documento clínico assinado atestando as condições emocionais do paciente.",
      },
      {
        title: "Reforço estratégico para Habeas Corpus",
        detail: "Peça documental reconhecida para acompanhamento e instrução de Salvo-Conduto.",
      },
      {
        title: "Integração direta ao Prontuário Mecura",
        detail: "Histórico criptografado salvo permanentemente na sua Área do Paciente.",
      },
    ],
    transparencyNote:
      "Cobre exclusivamente a consulta e o laudo psicológico (CRP). Não inclui receita médica de controlados.",
    ctaLabel: "Conhecer no aplicativo",
    ctaUrl: "https://mecura.sementesagrada.com/",
  },
  {
    id: "premium",
    order: "03",
    tierLabel: "Acompanhamento VIP",
    highlightKicker: "Vídeo 45 min · Médico + Agrônomo",
    name: "VIP Médico + Laudo HC",
    tagline:
      "Consulta aprofundada por vídeo, Laudo Pericial Médico com CID, Laudo Agronômico oficial e retorno evolutivo em 90 dias.",
    idealFor: "Ideal para acompanhamento aprofundado + Laudo Médico e Agronômico p/ HC",
    coverImage: "/grok-image-29e89451-033b-4b4f-a232-c734b224a8b1.png",
    professionals: [
      {
        name: "Dr. Guilherme Taveira Dias",
        credential: "CRM/MT 17259",
        role: "Médico Regulador & Prescritor",
        avatar: "/dr-guilherme.png",
      },
      {
        name: "Wilian Dalenogare Pereira",
        credential: "CREA-BA Nº 052193520-2",
        role: "Engenheiro Agrônomo · Laudo HC",
        avatar: "/wilian.jpg",
      },
    ],
    deliverables: [
      {
        title: "Consulta exclusiva por Vídeo (45 min) + Laudo Médico HC",
        detail: "Avaliação detalhada com CID, histórico de refratariedade e Receita ICP-Brasil + Psicomotor.",
      },
      {
        title: "Laudo & Parecer Técnico Agronômico incluso (CREA)",
        detail: "Dimensionamento GACP de fitomassa, número de plantas e ciclos anuais assinado pelo Eng. Agr. Wilian.",
      },
      {
        title: "Consulta de Retorno + Relatório Evolutivo (90d)",
        detail: "Acompanhamento evolutivo incluso aos 90 dias para ajuste terapêutico de precisão.",
      },
      {
        title: "Assessoria completa ANVISA RDC 660",
        detail: "Suporte documental e resguardo para direção veicular, trabalho e importação legal.",
      },
    ],
    transparencyNote:
      "Já inclui Laudo Médico Pericial + Laudo Agronômico (CREA). Para incluir também o Laudo Psicológico (CRP), escolha o Plano Completo 360°.",
    ctaLabel: "Conhecer no aplicativo",
    ctaUrl: "https://mecura.sementesagrada.com/",
  },
  {
    id: "complete",
    order: "04",
    tierLabel: "Assinatura Suprema · 360°",
    highlightKicker: "Dossiê Triplo · CRM + CRP + CREA",
    name: "Plano Completo 360°",
    tagline:
      "A experiência definitiva com os 3 especialistas: Médico em Vídeo 45 min + Psicólogo Clínico + Engenheiro Agrônomo.",
    idealFor: "A jornada completa com os 3 laudos oficiais (Médico, Psicológico e Agronômico)",
    coverImage: "/hero-oil-still.jpg",
    recommended: true,
    professionals: [
      {
        name: "Dr. Guilherme Taveira Dias",
        credential: "CRM/MT 17259",
        role: "Médico Prescritor (Vídeo 45 min)",
        avatar: "/dr-guilherme.png",
      },
      {
        name: "Marco Antônio Boastik",
        credential: "CRP 08/49215",
        role: "Psicólogo Clínico (Laudo CRP)",
        avatar: "/assets/aistudio/image_ca75a6e7.png",
      },
      {
        name: "Wilian Dalenogare Pereira",
        credential: "CREA-BA Nº 052193520-2",
        role: "Engenheiro Agrônomo (Laudo HC)",
        avatar: "/wilian.jpg",
      },
    ],
    deliverables: [
      {
        title: "Vídeo Médico (45 min) + Laudo Pericial HC + ICP-Brasil",
        detail: "Avaliação completa com CID, refratariedade, Receita Digital e Laudo Psicomotor.",
      },
      {
        title: "Consulta & Laudo Psicológico Oficial (CRP 08/49215)",
        detail: "Atendimento com Marco Antônio Boastik e parecer psicológico integrado ao dossiê.",
      },
      {
        title: "Laudo & Parecer Técnico Agronômico incluso (CREA)",
        detail: "Cálculo GACP de fitomassa, plantas e ciclos assinado pelo Eng. Agr. Wilian Dalenogare Pereira.",
      },
      {
        title: "Retorno 90 dias + Relatório Evolutivo Duplo",
        detail: "Acompanhamento contínuo médico e psicológico com relatórios evolutivos inclusos.",
      },
    ],
    transparencyNote:
      "Reúne os 3 laudos oficiais exigidos na instrução de Salvo-Conduto (CRM + CRP + CREA) em uma única jornada integrada.",
    ctaLabel: "Acessar Jornada Completa 360°",
    ctaUrl: "https://mecura.sementesagrada.com/",
  },
];

export const PLAN_COMPARISON_ROWS: Array<{
  feature: string;
  basic: string;
  psychologist: string;
  premium: string;
  complete: string;
}> = [
  {
    feature: "Receita Digital Oficial ICP-Brasil (QR Code)",
    basic: "Incluso (Chat)",
    psychologist: "—",
    premium: "Incluso",
    complete: "Incluso",
  },
  {
    feature: "Consulta Médica por Vídeo (45 min)",
    basic: "—",
    psychologist: "—",
    premium: "Incluso",
    complete: "Incluso",
  },
  {
    feature: "Laudo Pericial Médico p/ Habeas Corpus (CID)",
    basic: "—",
    psychologist: "—",
    premium: "Incluso",
    complete: "Incluso",
  },
  {
    feature: "Laudo & Parecer Técnico Agronômico (CREA-BA)",
    basic: "—",
    psychologist: "—",
    premium: "Incluso",
    complete: "Incluso",
  },
  {
    feature: "Consulta & Laudo Psicológico (CRP 08/49215)",
    basic: "—",
    psychologist: "Incluso",
    premium: "—",
    complete: "Incluso",
  },
  {
    feature: "Retorno + Relatório Evolutivo aos 90 dias",
    basic: "—",
    psychologist: "—",
    premium: "Médico",
    complete: "Médico + Psico",
  },
  {
    feature: "Laudo Psicomotor (Direção & Trabalho) + ANVISA",
    basic: "ANVISA",
    psychologist: "—",
    premium: "Completo",
    complete: "Completo",
  },
];

/* --- Dedicated Scientific Data Hub --- */

export interface ReceptorData {
  code: string;
  name: string;
  distribution: string;
  endogenousLigand: string;
  primaryRole: string;
  clinicalImpact: string;
  affinityIndex: number;
}

export const SCIENTIFIC_RECEPTORS: ReceptorData[] = [
  {
    code: "CB1",
    name: "Receptor Canabinoide Tipo 1",
    distribution: "Córtex pré-frontal, hipocampo, amígdala, gânglios da base e cerebelo",
    endogenousLigand: "Anandamida (AEA) · 2-Araquidonoilglicerol (2-AG)",
    primaryRole: "Sinalização retrógrada pré-sináptica modulando liberação de GABA e glutamato.",
    clinicalImpact: "Regulação da dor central, arquitetura do sono, espasticidade, memória emocional e controle de náuseas.",
    affinityIndex: 94,
  },
  {
    code: "CB2",
    name: "Receptor Canabinoide Tipo 2",
    distribution: "Sistema imunológico, células da micróglia, baço, intestino e articulações",
    endogenousLigand: "2-AG · Beta-Cariofileno (fitocanabinoide/terpeno dietético)",
    primaryRole: "Controle de cascatas inflamatórias e redução de citocinas pró-inflamatórias (TNF-α, IL-1β, IL-6).",
    clinicalImpact: "Artrite, doenças inflamatórias intestinais, neuroinflamação e analgesia periférica sem psicoatividade.",
    affinityIndex: 88,
  },
  {
    code: "5-HT1A",
    name: "Receptor Serotoninérgico 5-HT1A",
    distribution: "Núcleos da rafe, sistema límbico e córtex cingulado anterior",
    endogenousLigand: "Serotonina (5-HT) · Modulável diretamente pelo Canabidiol (CBD)",
    primaryRole: "Modulação direta da resposta aguda ao estresse, pânico e tônus emocional.",
    clinicalImpact: "Efeito ansiolítico rápido e estabilização do humor em TAG, pânico e TEPT.",
    affinityIndex: 82,
  },
  {
    code: "TRPV1",
    name: "Canal Vaniloide de Potencial Transitório 1",
    distribution: "Nociceptores periféricos, gânglios da raiz dorsal e cérebro",
    endogenousLigand: "Anandamida · Canabidiol (dessensibilização contínua)",
    primaryRole: "Transdução de sinais térmicos, inflamatórios e de dor neuropática.",
    clinicalImpact: "Alívio sustentado em fibromialgia, enxaqueca, neuropatias e controle anticonvulsivante.",
    affinityIndex: 79,
  },
  {
    code: "GPR55",
    name: "Receptor Acoplado à Proteína G55",
    distribution: "SNC, córtex cerebral, estriado e tecido ósseo/vascular",
    endogenousLigand: "Lisofosfatidilinositol (LPI) · Antagonizado pelo CBD",
    primaryRole: "Controle da excitabilidade sináptica e liberação intracelular de cálcio.",
    clinicalImpact: "Mecanismo chave na redução de crises em epilepsias refratárias (Dravet e Lennox-Gastaut).",
    affinityIndex: 76,
  },
  {
    code: "PPARγ",
    name: "Receptor Nuclear Ativado por Proliferadores de Peroxissoma",
    distribution: "Núcleo celular de neurônios, astrócitos e tecido metabólico",
    endogenousLigand: "Ácidos graxos endógenos · CBD e THCA",
    primaryRole: "Transcrição gênica anti-inflamatória, neurogênese e defesa antioxidante mitocondrial.",
    clinicalImpact: "Neuroproteção de longo prazo em quadros degenerativos e dor inflamatória crônica.",
    affinityIndex: 72,
  },
];

export interface CannabinoidMolecule {
  symbol: string;
  name: string;
  psychoactive: string;
  targets: string;
  primaryActions: string;
  therapeuticFocus: string;
  evidenceStrength: number;
}

export const CANNABINOID_PROFILES: CannabinoidMolecule[] = [
  {
    symbol: "CBD",
    name: "Canabidiol",
    psychoactive: "Não psicoativo (Não intoxicante)",
    targets: "5-HT1A · TRPV1 · GPR55 · Modulador alostérico CB1 · Inibidor FAAH",
    primaryActions: "Ansiolítico, anticonvulsivante, anti-inflamatório e neuroprotetor.",
    therapeuticFocus: "Ansiedade, epilepsia refratária, TEA, dor inflamatória, Parkinson e sono.",
    evidenceStrength: 96,
  },
  {
    symbol: "THC",
    name: "Delta-9-Tetrahidrocanabinol",
    psychoactive: "Psicoativo dose-dependente (titulado clinicamente)",
    targets: "Agonista parcial direto CB1 e CB2",
    primaryActions: "Analgésico central potente, miorrelaxante, antiemético e indutor do sono.",
    therapeuticFocus: "Dor neuropática/oncológica, fibromialgia, espasticidade na EM, náuseas pós-quimio.",
    evidenceStrength: 92,
  },
  {
    symbol: "CBG",
    name: "Canabigerol",
    psychoactive: "Não psicoativo",
    targets: "CB2 · α2-adrenérgico · 5-HT1A · PPARγ",
    primaryActions: "Anti-inflamatório visceral, foco cognitivo e regulação do tônus intestinal.",
    therapeuticFocus: "Doença de Crohn, retocolite, TDAH (clareza diurna), glaucoma e dores articulares.",
    evidenceStrength: 76,
  },
  {
    symbol: "CBN",
    name: "Canabinol",
    psychoactive: "Levemente sedativo (10% da afinidade CB1 do THC)",
    targets: "CB2 preferencial · CB1 moderado · TRPV2",
    primaryActions: "Indução de relaxamento noturno, manutenção do sono contínuo e analgesia leve.",
    therapeuticFocus: "Insônia de manutenção (despertares noturnos) e tensão muscular ao deitar.",
    evidenceStrength: 74,
  },
  {
    symbol: "THCA",
    name: "Ácido Tetrahidrocanabinólico",
    psychoactive: "Não psicoativo em forma ácida (pré-descarboxilação)",
    targets: "PPARγ · COX-1/COX-2 · 5-HT1A",
    primaryActions: "Anti-inflamatório de alta potência, antiemético e neuroprotetor.",
    therapeuticFocus: "Resgate clínico sob supervisão, dor refratária e proteção neuronal.",
    evidenceStrength: 70,
  },
  {
    symbol: "β-Cariofileno",
    name: "Terpeno Sesquiterpenoide (Copaíba & Cannabis)",
    psychoactive: "Não psicoativo (GRAS alimentar)",
    targets: "Agonista seletivo total do receptor CB2",
    primaryActions: "Potencializa o efeito comitiva anti-inflamatório e analgésico periférico.",
    therapeuticFocus: "Artrite, endometriose, inflamação intestinal e fibromialgia.",
    evidenceStrength: 82,
  },
];

export interface ClinicalStudyReference {
  id: string;
  year: string;
  journal: string;
  authors: string;
  title: string;
  pathology: string;
  sampleOrType: string;
  keyFinding: string;
  evidenceGrade: "Grau A" | "Grau B";
  sourceLabel: string;
}

export const CLINICAL_STUDIES: ClinicalStudyReference[] = [
  {
    id: "nasem-2017",
    year: "2017",
    journal: "National Academies of Sciences, Engineering, and Medicine (EUA)",
    authors: "NASEM Committee on the Health Effects of Marijuana",
    title: "The Health Effects of Cannabis and Cannabinoids: Current State of Evidence",
    pathology: "Dor Crônica, Espasticidade & Náuseas",
    sampleOrType: "Revisão de +10.000 resumos científicos",
    keyFinding:
      "Concluiu existir evidência conclusiva ou substancial para eficácia no tratamento da dor crônica em adultos, náuseas induzidas por quimioterapia e espasticidade na Esclerose Múltipla.",
    evidenceGrade: "Grau A",
    sourceLabel: "NASEM · Consensus Report",
  },
  {
    id: "devinsky-nejm-2017",
    year: "2017",
    journal: "New England Journal of Medicine (NEJM)",
    authors: "Devinsky O., Cross J.H., Laux L. et al.",
    title: "Trial of Cannabidiol for Drug-Resistant Seizures in the Dravet Syndrome",
    pathology: "Epilepsia Refratária",
    sampleOrType: "Ensaio Clínico Randomizado Duplo-Cego (n = 120)",
    keyFinding:
      "Redução mediana de 38,9% na frequência mensal de crises convulsivas com CBD purificado frente a 13,3% no grupo placebo (p = 0,01).",
    evidenceGrade: "Grau A",
    sourceLabel: "NEJM · DOI 10.1056/NEJMoa1611618",
  },
  {
    id: "shannon-permj-2019",
    year: "2019",
    journal: "The Permanente Journal",
    authors: "Shannon S., Lewis N., Lee H., Hughes S.",
    title: "Cannabidiol in Anxiety and Sleep: A Large Case Series",
    pathology: "Ansiedade & Insônia",
    sampleOrType: "Série Clínica Longitudinal (n = 72 adultos)",
    keyFinding:
      "79,2% dos pacientes apresentaram redução dos escores de ansiedade já no primeiro mês de acompanhamento com CBD e 66,7% relataram melhora inicial da qualidade do sono.",
    evidenceGrade: "Grau B",
    sourceLabel: "Permanente J · PMID 30624194",
  },
  {
    id: "schleider-nature-2019",
    year: "2019",
    journal: "Scientific Reports (Nature Portfolio)",
    authors: "Bar-Lev Schleider L., Mechoulam R., Saban N. et al.",
    title: "Real Life Experience of Medical Cannabis Treatment in Autism",
    pathology: "Transtorno do Espectro Autista (TEA)",
    sampleOrType: "Coorte Prospectiva (n = 188 pacientes)",
    keyFinding:
      "Após 6 meses de óleo rico em CBD (30% CBD / 1,5% THC), 83,8% dos pacientes mantiveram adesão ao protocolo, com melhora significativa ou moderada relatada em mais de 80% dos casos avaliados.",
    evidenceGrade: "Grau B",
    sourceLabel: "Nature Sci Rep · DOI 10.1038/s41598-018-37570-y",
  },
  {
    id: "whiting-jama-2015",
    year: "2015",
    journal: "JAMA — Journal of the American Medical Association",
    authors: "Whiting P.F., Wolff R.F., Deshpande S. et al.",
    title: "Cannabinoids for Medical Use: A Systematic Review and Meta-analysis",
    pathology: "Dor Neuropática & Espasticidade",
    sampleOrType: "Meta-análise de 79 ensaios clínicos (n = 6.462)",
    keyFinding:
      "Evidência moderada a alta de superioridade clínica frente ao placebo na redução de ≥30% da intensidade da dor crônica e na melhora funcional da espasticidade.",
    evidenceGrade: "Grau A",
    sourceLabel: "JAMA · DOI 10.1001/jama.2015.6358",
  },
  {
    id: "who-ecdd-2018",
    year: "2018",
    journal: "Organização Mundial da Saúde (OMS / WHO ECDD)",
    authors: "WHO Expert Committee on Drug Dependence",
    title: "Cannabidiol (CBD) Critical Review Report",
    pathology: "Segurança Farmacológica & Toxicologia",
    sampleOrType: "Revisão Regulatória Internacional da OMS",
    keyFinding:
      "Confirmou que o CBD em estado puro apresenta excelente perfil de segurança, é bem tolerado em humanos e não demonstra potencial de abuso ou dependência.",
    evidenceGrade: "Grau A",
    sourceLabel: "WHO / OMS · 40th ECDD Report",
  },
];

export interface PharmacokineticRoute {
  id: string;
  label: string;
  onsetMinutes: string;
  peakHours: string;
  durationHours: string;
  bioavailability: string;
  clinicalUse: string;
  /** Normalized plasma concentration curve at t = [0h, 0.25h, 0.5h, 1h, 2h, 4h, 6h, 8h, 10h] (0..100) */
  curve: number[];
  strokeColor: string;
}

export const PHARMACOKINETICS_TIME_LABELS = [
  "0h",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "10h",
];

export const PHARMACOKINETICS_ROUTES: PharmacokineticRoute[] = [
  {
    id: "sublingual",
    label: "Sublingual (Óleo em Gotas)",
    onsetMinutes: "15 – 45 min",
    peakHours: "1,5 – 3 h",
    durationHours: "4 – 8 h",
    bioavailability: "13% – 35%",
    clinicalUse:
      "Via de primeira escolha na Medicina Canabinoide: absorção rápida pelos capilares sublinguais evitando perda hepática imediata e permitindo titulação precisa gota a gota.",
    curve: [0, 34, 62, 86, 94, 72, 46, 22, 8],
    strokeColor: "#c4ff1a",
  },
  {
    id: "oral",
    label: "Oral (Cápsulas & Gomas)",
    onsetMinutes: "45 – 120 min",
    peakHours: "3 – 5 h",
    durationHours: "6 – 10 h",
    bioavailability: "6% – 20%",
    clinicalUse:
      "Liberação sustentada e prolongada após metabolismo de primeira passagem hepática — excelente para manutenção da insônia noturna e dores contínuas.",
    curve: [0, 6, 16, 42, 74, 88, 76, 52, 28],
    strokeColor: "#6ee7b7",
  },
  {
    id: "vaporizacao",
    label: "Vaporização Medicinal (Resgate)",
    onsetMinutes: "2 – 5 min",
    peakHours: "10 – 30 min",
    durationHours: "1 – 3 h",
    bioavailability: "30% – 55%",
    clinicalUse:
      "Ação imediata via alvéolos pulmonares para crises agudas (enxaqueca, pânico, espasmos ou dor disruptiva), sob rigorosa indicação médica.",
    curve: [0, 96, 82, 54, 26, 8, 2, 0, 0],
    strokeColor: "#facc15",
  },
  {
    id: "topica",
    label: "Tópica (Cremes & Bálsamos)",
    onsetMinutes: "15 – 30 min",
    peakHours: "1 – 2 h (Local)",
    durationHours: "3 – 6 h",
    bioavailability: "Ação local CB2 (sem efeito sistêmico)",
    clinicalUse:
      "Aplicação direta sobre articulações, músculos e pontos gatilho em osteoartrite, tendinites, lombalgia e fibromialgia articular sem qualquer psicoatividade.",
    curve: [0, 28, 48, 62, 64, 48, 26, 10, 4],
    strokeColor: "#93c5fd",
  },
];

/* --- App Integrated Solutions & Frequently Asked Questions --- */

export interface AppSolutionItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export const APP_SOLUTIONS: AppSolutionItem[] = [
  {
    number: "01",
    title: "Fila ao Vivo + Alerta no WhatsApp",
    subtitle: "Zero burocracia de agenda",
    description:
      "Você acompanha sua posição em tempo real na tela do celular e recebe notificação simultânea no aplicativo e no WhatsApp no instante em que o profissional abrir a sala.",
    highlight: "Atendimento sob demanda",
  },
  {
    number: "02",
    title: "Escalas Clínicas Internacionais",
    subtitle: "ASRS-18 (OMS) & AQ-10 (Cambridge)",
    description:
      "Rastreios validados mundialmente para TDAH, Autismo e sintomas crônicos preenchidos no próprio app e anexados automaticamente ao seu prontuário antes da consulta.",
    highlight: "Diagnóstico estruturado",
  },
  {
    number: "03",
    title: "Documentos ICP-Brasil em 3 a 5 min",
    subtitle: "Validade jurídica nacional",
    description:
      "Receita digital com QR Code, Laudo Médico (CRM/MT 17259), Laudo Psicomotor, TCLE e Laudo Psicológico (CRP 08/49215) liberados direto na Área do Paciente.",
    highlight: "Certificação ICP-Brasil",
  },
  {
    number: "04",
    title: "Calculadora GACP & Dossiê HC",
    subtitle: "Médico + Psicólogo + Agrônomo",
    description:
      "Conversão técnica da prescrição médica em fitomassa anual, número de plantas e ciclos pelo Eng. Agr. Wilian Dalenogare Pereira (CREA-BA Nº 052193520-2) para instrução de Salvo-Conduto.",
    highlight: "80% do caminho do HC pronto",
  },
  {
    number: "05",
    title: "Farmácia Integrada & ANVISA RDC 660",
    subtitle: "Importação legal assistida",
    description:
      "Catálogo transparente com produtos certificados internacionalmente (GreenBudz, FlowerMed, Pangaia) e assessoria documental completa para autorização nominal na ANVISA.",
    highlight: "Validade ANVISA de 2 anos",
  },
  {
    number: "06",
    title: "Prontuário Criptografado & Retorno 90d",
    subtitle: "Sigilo médico CFM & LGPD",
    description:
      "Histórico de consultas, evolução de dosagem, protocolos e relatórios evolutivos aos 90 dias protegidos sob criptografia e guarda legal de 20 anos.",
    highlight: "Lei nº 13.709/2018 (LGPD)",
  },
];

export type FaqCategory =
  | "Todas"
  | "Consulta & Planos"
  | "Receita & ANVISA"
  | "Psicologia & HC"
  | "App & Segurança";

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "Todas">;
  question: string;
  answer: string;
  detailPoints?: string[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  "Todas",
  "Consulta & Planos",
  "Receita & ANVISA",
  "Psicologia & HC",
  "App & Segurança",
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "legalidade-brasil",
    category: "Receita & ANVISA",
    question: "O tratamento com Cannabis Medicinal pelo app Mecura é 100% legalizado no Brasil?",
    answer:
      "Sim. Todo o fluxo segue integralmente a Resolução ANVISA RDC nº 660/2022 (importação nominal por pessoa física para uso próprio medicinal), a Resolução CFM nº 2.314/2022 e a Lei Federal nº 14.510/2022 (Telemedicina). Além disso, o Instituto Mecura Ltda (CNPJ 69.202.927/0001-19) conta com parecer técnico-jurídico assinado pelo Dr. Max Warner Santos Souza (OAB/MG 154.052).",
  },
  {
    id: "tempo-receita",
    category: "Consulta & Planos",
    question: "Em quanto tempo recebo minha receita digital e laudo médico após a avaliação?",
    answer:
      "Quando o tratamento é clinicamente indicado após a avaliação do Dr. Guilherme Taveira Dias (CRM/MT 17259), sua receita digital com assinatura qualificada ICP-Brasil e o laudo ficam disponíveis em 3 a 5 minutos diretamente na Área do Paciente do aplicativo, prontos para download em PDF com QR Code.",
  },
  {
    id: "diferenca-planos",
    category: "Consulta & Planos",
    question: "Qual é a diferença entre a Consulta Essencial, Consulta Psicológica, VIP + Laudo HC e o Plano Completo 360°?",
    answer:
      "Cada modalidade foi desenhada para um momento específico da sua jornada (você consulta as condições atualizadas diretamente ao abrir o aplicativo):",
    detailPoints: [
      "Consulta Essencial: atendimento imediato via chat com Dr. Guilherme (CRM/MT 17259), Receita Digital ICP-Brasil e protocolo inicial de gotas — ideal para começar o tratamento importado sem agendamento.",
      "Consulta + Laudo Psicológico: atendimento individual e emissão de Laudo Psicológico Oficial com Marco Antônio Boastik (CRP 08/49215).",
      "Acompanhamento VIP + Laudo HC: vídeo de 45 min com Dr. Guilherme (CRM/MT 17259), Laudo Pericial Médico p/ HC, Laudo & Parecer Técnico Agronômico incluso com Wilian Dalenogare Pereira (CREA-BA Nº 052193520-2), Laudo Psicomotor e Retorno com Relatório Evolutivo em 90 dias.",
      "Plano Completo 360°: reúne os 3 especialistas em uma única jornada — Médico em vídeo 45 min + Psicólogo Clínico (CRP 08/49215) + Laudo Agronômico (CREA-BA Nº 052193520-2) + Relatório Evolutivo Duplo aos 90 dias.",
    ],
  },
  {
    id: "como-funciona-anvisa",
    category: "Receita & ANVISA",
    question: "Como funciona a autorização na ANVISA e quanto tempo ela vale?",
    answer:
      "Com a prescrição médica nominal emitida no aplicativo, nossa equipe orienta e apoia todo o cadastro gratuito no portal oficial da ANVISA (Gov.br). A autorização é vinculada ao seu CPF e possui validade regulamentar de 2 (dois) anos, permitindo a importação legal e entrega rastreada na sua residência.",
  },
  {
    id: "psicologo-receita",
    category: "Psicologia & HC",
    question: "O Psicólogo Clínico Marco Antônio Boastik pode emitir receita de Cannabis?",
    answer:
      "Não. Conforme a legislação brasileira (CFM e CFP), a prescrição de medicamentos controlados é ato privativo do médico (Dr. Guilherme Taveira Dias — CRM/MT 17259). O psicólogo Marco Antônio Boastik (CRP 08/49215) realiza a avaliação clínica de saúde mental, acompanhamento emocional e emite o Laudo/Parecer Psicológico Oficial, que complementa o tratamento e fortalece drasticamente pedidos de Habeas Corpus.",
  },
  {
    id: "habeas-corpus-laudos",
    category: "Psicologia & HC",
    question: "Quais documentos técnicos o Instituto Mecura prepara para apoiar um pedido de Habeas Corpus (Autocultivo)?",
    answer:
      "Os Tribunais e o STJ (REsp 1.972.092/SP) costumam exigir documentação técnica robusta comprovando a necessidade clínica e a proporcionalidade do cultivo estritamente medicinal. No ecossistema Mecura você consegue estruturar os 3 pilares técnicos:",
    detailPoints: [
      "1. Prescrição, Laudo Pericial Médico com CID e Relatório Evolutivo 90d — Dr. Guilherme Taveira Dias (CRM/MT 17259).",
      "2. Laudo e Relatório Psicológico de Acompanhamento — Marco Antônio Boastik (CRP 08/49215).",
      "3. Calculadora GACP & Parecer Técnico Agronômico (número de plantas e ciclos anuais) — Eng. Agr. Wilian Dalenogare Pereira (CREA-BA Nº 052193520-2).",
    ],
  },
  {
    id: "laudo-psicomotor",
    category: "Receita & ANVISA",
    question: "O que é o Laudo Psicomotor incluso nos planos VIP e Completo 360°?",
    answer:
      "É um documento médico técnico que atesta sua plena capacidade psicomotora e cognitiva durante o uso da posologia prescrita de fitocanabinoides, oferecendo resguardo profissional importante para pacientes que dirigem veículos ou exercem atividades laborais que exigem comprovação clínica.",
  },
  {
    id: "fila-whatsapp",
    category: "App & Segurança",
    question: "Preciso ficar com a tela do celular aberta esperando na Fila ao Vivo?",
    answer:
      "Não. Assim que você conclui a triagem e entra na fila, o aplicativo monitora sua posição automaticamente e envia uma notificação tanto no app quanto no seu WhatsApp no momento em que o profissional iniciar o atendimento. O aviso contém apenas a chamada para a sala, preservando 100% do seu sigilo clínico.",
  },
  {
    id: "formas-pagamento",
    category: "Consulta & Planos",
    question: "Quais formas de pagamento e parcelamento o aplicativo aceita?",
    answer:
      "O pagamento é processado em ambiente 100% criptografado via Pix (liberação imediata na fila) ou Cartão de Crédito (Visa, Mastercard, Elo, Hipercard e Amex) com parcelamento em até 3x na Consulta Essencial/Psicólogo, até 5x no Acompanhamento VIP e até 6x sem burocracia no Plano Completo 360°.",
  },
  {
    id: "dados-lgpd",
    category: "App & Segurança",
    question: "Meus exames, respostas das escalas e receitas ficam protegidos pela LGPD?",
    answer:
      "Sim. Todas as respostas clínicas (incluindo ASRS-18 e AQ-10), histórico médico e documentos são classificados como dados sensíveis de saúde sob a LGPD (Lei nº 13.709/2018) e sigilo profissional do CFM. Utilizamos criptografia HTTPS/TLS, acesso restrito à equipe assistencial e canal direto de DPO em contato@mecura.com.br.",
  },
];

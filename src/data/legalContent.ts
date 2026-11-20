export type LegalTabKey = "parecer" | "privacidade" | "termos" | "dados";

export interface LegalArticle {
  id: string;
  number: string;
  title: string;
  badge: string;
  lead: string;
  paragraphs: string[];
  bullets?: string[];
  keywords: string[];
}

export const LEGAL_COUNSEL = {
  name: "Dr. Max Warner Santos Souza — OAB/MG 154.052",
  role: "Consultor Jurídico Especialista em Direito Canábico & Salvo-Conduto",
  statement:
    "O presente parecer técnico-jurídico estabelece as diretrizes de legalidade, segurança jurídica e resguardo institucional para a atuação do Instituto Mecura Ltda, bem como para os pacientes que realizam tratamento de saúde com produtos à base de Cannabis medicinal e os que optam pelo autocultivo com fins estritamente terapêuticos.",
} as const;

export const LEGAL_TABS: Array<{
  key: LegalTabKey;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    key: "parecer",
    label: "Parecer Jurídico",
    shortLabel: "Parecer Jurídico",
    description:
      "Fundamentação constitucional, sanitária e jurisprudencial que resguarda o Instituto Mecura Ltda e os pacientes em tratamento.",
  },
  {
    key: "privacidade",
    label: "Política de Privacidade",
    shortLabel: "Privacidade",
    description:
      "Como coletamos, protegemos e tratamos seus dados pessoais e dados sensíveis de saúde sob a LGPD e o sigilo médico do CFM.",
  },
  {
    key: "termos",
    label: "Termos de Uso",
    shortLabel: "Termos de Uso",
    description:
      "Regras de utilização da plataforma, natureza facilitadora em saúde, autonomia médica e responsabilidades legais.",
  },
  {
    key: "dados",
    label: "Dados & LGPD",
    shortLabel: "Dados & LGPD",
    description:
      "Direitos do titular previstos no Art. 18 da LGPD, medidas técnicas de segurança e canal direto do Encarregado (DPO).",
  },
];

export const LEGAL_ARTICLES: Record<LegalTabKey, LegalArticle[]> = {
  parecer: [
    {
      id: "cf88-saude",
      number: "1",
      title: "Fundamentação Constitucional: Direito à Saúde e Dignidade",
      badge: "CF/88 ART. 196 E ART. 5º",
      lead: "A saúde é direito de todos e dever do Estado. O acesso a tratamentos eficientes decorre do princípio supremo da dignidade humana.",
      paragraphs: [
        "Nos termos do Art. 1º, inciso III, Art. 5º, caput, Art. 6º e Art. 196 da Constituição Federal de 1988, a proteção integral à vida e à saúde prevalece sobre barreiras burocráticas que impeçam o paciente de alcançar alívio terapêutico comprovado.",
        "A atuação do Instituto Mecura Ltda tem como finalidade exclusiva viabilizar o exercício legítimo desse direito fundamental, conectando pacientes a médicos legalmente habilitados e estruturando o respaldo documental exigido pelos órgãos sanitários brasileiros.",
      ],
      keywords: [
        "constituição",
        "art 196",
        "art 5",
        "dignidade",
        "direito à saúde",
        "fundamental",
        "cf/88",
      ],
    },
    {
      id: "anvisa-rdc-660",
      number: "2",
      title: "Importação Legalizada e Autorização Nominal",
      badge: "ANVISA · RDC Nº 660/2022",
      lead: "A Agência Nacional de Vigilância Sanitária autoriza expressamente a importação de produtos derivados de Cannabis por pessoa física para uso próprio medicinal.",
      paragraphs: [
        "A Resolução da Diretoria Colegiada (RDC) nº 660/2022 da ANVISA define os critérios e procedimentos para importação excepcional mediante prescrição de profissional legalmente habilitado para tratamento de saúde.",
        "O cadastro é individual, vinculado ao CPF do paciente (ou de seu responsável legal) e possui validade regulamentar de 2 (dois) anos, assegurando trânsito alfandegário regular e total segurança sanitária e jurídica.",
      ],
      bullets: [
        "Prescrição médica individualizada com posologia, concentração e duração do tratamento.",
        "Autorização emitida diretamente pela ANVISA em nome do paciente titular.",
        "Uso estritamente pessoal e intransferível, vedada qualquer destinação comercial.",
      ],
      keywords: [
        "anvisa",
        "rdc 660",
        "660/2022",
        "importação",
        "autorização",
        "receita",
        "alfândega",
      ],
    },
    {
      id: "telemedicina-cfm",
      number: "3",
      title: "Telemedicina, Prescrição Digital e Autonomia Médica",
      badge: "CFM RES. Nº 2.314/2022 · LEI Nº 14.510/2022",
      lead: "A telessaúde é regulamentada em âmbito federal com plena equivalência jurídica ao atendimento presencial, resguardando a autonomia científica do médico prescritor.",
      paragraphs: [
        "Conforme a Lei Federal nº 14.510/2022 e a Resolução CFM nº 2.314/2022, a teleconsulta realizada por plataformas seguras permite avaliação clínica completa, emissão de receitas digitais e elaboração de laudos médicos com assinatura eletrônica qualificada (padrão ICP-Brasil / CFM).",
        "Cada prescrição decorre exclusivamente do juízo técnico independente do médico assistente, fundamentado na anamnese, no histórico do paciente e em escalas clínicas internacionalmente validadas.",
      ],
      keywords: [
        "telemedicina",
        "cfm",
        "2314",
        "14510",
        "prescrição digital",
        "laudo médico",
        "icp-brasil",
      ],
    },
    {
      id: "autocultivo-salvo-conduto",
      number: "4",
      title: "Autocultivo Terapêutico e Salvo-Conduto Preventivo",
      badge: "LEI Nº 11.343/2006 ART. 2º § ÚNICO · STJ",
      lead: "A jurisprudência pacificada do Superior Tribunal de Justiça reconhece a possibilidade de Habeas Corpus Preventivo para cultivo doméstico estritamente medicinal.",
      paragraphs: [
        "O parágrafo único do Art. 2º da Lei nº 11.343/2006 prevê exceção expressa para fins medicinais e científicos. Com base nesse dispositivo e no direito constitucional à saúde, o STJ tem concedido salvo-condutos a pacientes que comprovem necessidade clínica e incapacidade de custear continuamente o tratamento importado.",
        "Para fins de resguardo documental, o Instituto Mecura oferece ferramentas técnicas informativas — como a Calculadora GACP de fitomassa e a organização de laudos médicos e históricos clínicos — que subsidiam o trabalho de advogados legalmente constituídos pelo paciente em eventual pedido judicial.",
      ],
      bullets: [
        "O cultivo sem autorização judicial ou sanitária não é incentivado nem substituído pela plataforma.",
        "A concessão de salvo-conduto depende exclusivamente de decisão do Poder Judiciário mediante representação advocatícia.",
      ],
      keywords: [
        "autocultivo",
        "salvo-conduto",
        "habeas corpus",
        "hc",
        "stj",
        "11.343",
        "gacp",
        "fitomassa",
      ],
    },
    {
      id: "resguardo-institucional",
      number: "5",
      title: "Natureza Jurídica do Instituto Mecura e Resguardo Institucional",
      badge: "RESGUARDO INSTITUCIONAL · ATUAÇÃO LÍCITA",
      lead: "O Instituto Mecura Ltda atua exclusivamente como plataforma tecnológica facilitadora de saúde, educação médica e assessoria documental.",
      paragraphs: [
        "O Instituto Mecura Ltda (CNPJ 69.202.927/0001-19) não produz, não armazena, não comercializa, não distribui e não entrega substâncias sujeitas a controle especial em território nacional.",
        "Nossa atuação restringe-se à tecnologia de triagem clínica, intermediação de teleconsultas com profissionais independentes registrados nos Conselhos Regionais de Medicina, educação continuada sobre o Sistema Endocanabinoide e suporte administrativo para solicitações oficiais junto à ANVISA.",
      ],
      keywords: [
        "natureza jurídica",
        "resguardo",
        "instituto mecura",
        "cnpj",
        "facilitadora",
        "intermediação",
      ],
    },
    {
      id: "qualidade-rastreabilidade",
      number: "6",
      title: "Controle de Qualidade, Rastreabilidade e Padrões Sanitários",
      badge: "ANVISA RDC Nº 327/2019 · PADRÃO GACP",
      lead: "A segurança do paciente exige produtos com origem conhecida, estabilidade quimiotípica e laudos laboratoriais auditáveis.",
      paragraphs: [
        "As referências técnicas e parceiros internacionais apresentados na plataforma seguem padrões farmacêuticos e agronômicos rigorosos (como boas práticas GACP e certificados de análise COA), garantindo concentração verificada de canabinoides (CBD/THC) e ausência de contaminantes.",
        "Todo material educativo sobre fitocanabinoides e genética medicinal tem caráter estritamente informativo e científico, em conformidade com as normas sanitárias aplicáveis.",
      ],
      keywords: [
        "rdc 327",
        "gacp",
        "rastreabilidade",
        "laudo laboratorial",
        "coa",
        "qualidade",
        "cbd",
        "thc",
      ],
    },
  ],

  privacidade: [
    {
      id: "priv-controlador",
      number: "1",
      title: "Controlador dos Dados e Finalidade Assistencial",
      badge: "LGPD · LEI Nº 13.709/2018",
      lead: "O Instituto Mecura Ltda (CNPJ 69.202.927/0001-19) é o controlador dos dados pessoais tratados nesta plataforma e no aplicativo oficial.",
      paragraphs: [
        "Os dados coletados são utilizados exclusivamente para finalidades legítimas de saúde: identificação do paciente, realização de triagem clínica pré-consulta, agendamento/fila de telemedicina, emissão e guarda de documentos médicos e apoio administrativo ao pedido de importação junto à ANVISA.",
        "Não utilizamos dados clínicos para publicidade comportamental de terceiros e jamais vendemos, alugamos ou comercializamos bases de pacientes.",
      ],
      keywords: [
        "controlador",
        "lgpd",
        "finalidade",
        "privacidade",
        "cnpj",
        "dados pessoais",
      ],
    },
    {
      id: "priv-sensiveis",
      number: "2",
      title: "Coleta de Dados Pessoais e Dados Sensíveis de Saúde",
      badge: "LGPD · ART. 5º, II E ART. 11",
      lead: "Informações médicas e resultados de escalas clínicas são classificados pela LGPD como dados pessoais sensíveis, recebendo proteção jurídica e técnica reforçada.",
      paragraphs: [
        "Para viabilizar seu atendimento com segurança, podemos tratar as seguintes categorias de informações, sempre sob o princípio da necessidade e minimização:",
      ],
      bullets: [
        "Dados cadastrais e de contato: nome completo, CPF, data de nascimento, e-mail e número de WhatsApp para notificações da fila médica.",
        "Dados sensíveis de saúde: respostas das escalas validadas (ASRS-18 OMS, AQ-10 Cambridge), relato de sintomas, histórico clínico, receitas digitais e laudos médicos.",
        "Dados técnicos mínimos: registros de segurança, consentimento e sessões necessárias ao funcionamento estável do aplicativo PWA.",
      ],
      keywords: [
        "dados sensíveis",
        "art 11",
        "art 5",
        "coleta",
        "asrs-18",
        "aq-10",
        "prontuário",
      ],
    },
    {
      id: "priv-bases-legais",
      number: "3",
      title: "Bases Legais para o Tratamento de Dados",
      badge: "LGPD · ART. 7º E ART. 11, II, 'F'",
      lead: "Todo tratamento realizado no ecossistema Mecura possui enquadramento jurídico explícito na legislação brasileira.",
      paragraphs: [
        "O tratamento de dados clínicos fundamenta-se prioritariamente na tutela da saúde (Art. 11, II, 'f' da LGPD), em procedimentos conduzidos por profissionais de saúde e serviços de saúde, bem como no consentimento específico e destacado do titular (Art. 11, I) e no cumprimento de obrigações legais e regulatórias perante o CFM e a ANVISA.",
      ],
      keywords: [
        "bases legais",
        "tutela da saúde",
        "consentimento",
        "obrigação legal",
        "cfm",
        "anvisa",
      ],
    },
    {
      id: "priv-compartilhamento",
      number: "4",
      title: "Compartilhamento Estritamente Necessário e Sigilo Médico",
      badge: "CFM · SIGILO PROFISSIONAL",
      lead: "Seus registros clínicos são protegidos por sigilo médico inviolável e compartilhados apenas quando indispensável ao seu próprio tratamento.",
      paragraphs: [
        "O acesso aos dados clínicos é restrito ao médico prescritor responsável pelo atendimento, à equipe de acolhimento/suporte regulatório sob termo de confidencialidade e, quando solicitado pelo próprio paciente, aos sistemas oficiais da ANVISA para emissão da autorização nominal de importação.",
        "Fornecedores de infraestrutura em nuvem e mensageria atuam como operadores de dados sujeitos a rigorosos contratos de proteção de dados e padrões internacionais de criptografia.",
      ],
      keywords: [
        "sigilo médico",
        "compartilhamento",
        "confidencialidade",
        "operadores",
        "anvisa",
      ],
    },
    {
      id: "priv-retencao-cookies",
      number: "5",
      title: "Guarda de Prontuário, Retenção e Política de Cookies",
      badge: "CFM RES. 1.821/2007 · LEI Nº 13.787/2018",
      lead: "Prontuários médicos eletrônicos obedecem ao prazo legal mínimo de guarda de 20 anos, enquanto cookies técnicos mantêm sua navegação rápida e segura.",
      paragraphs: [
        "Em respeito às normas do Conselho Federal de Medicina e à Lei nº 13.787/2018, documentos clínicos e prescrições ficam armazenados de forma segura e auditável pelo prazo legal mínimo de 20 (vinte) anos a partir do último registro.",
        "Neste portal e no aplicativo PWA utilizamos exclusivamente cookies essenciais para manter preferências de interface, estabilidade offline e proteção contra acessos indevidos, sem rastreamento invasivo de informações médicas.",
      ],
      keywords: [
        "cookies",
        "retenção",
        "20 anos",
        "prontuário",
        "1821",
        "13787",
        "pwa",
      ],
    },
  ],

  termos: [
    {
      id: "termos-objeto",
      number: "1",
      title: "Objeto e Natureza de Plataforma Facilitadora",
      badge: "TERMOS DE USO · SERVIÇOS DIGITAIS",
      lead: "O Instituto Mecura oferece ambiente digital para triagem estruturada, conexão a médicos prescritores e orientação administrativa em saúde.",
      paragraphs: [
        "Ao acessar o site institucional ou o aplicativo Mecura, o usuário declara compreender que a plataforma atua como meio tecnológico facilitador e informativo, não prestando atendimento de urgência ou emergência médica.",
        "Em situações de risco agudo à vida ou emergência clínica, o paciente deve acionar imediatamente o SAMU (192) ou dirigir-se ao pronto-socorro mais próximo.",
      ],
      keywords: [
        "objeto",
        "plataforma",
        "emergência",
        "samu",
        "facilitadora",
        "termos",
      ],
    },
    {
      id: "termos-autonomia",
      number: "2",
      title: "Independência e Autonomia do Ato Médico",
      badge: "CFM · CÓDIGO DE ÉTICA MÉDICA",
      lead: "A emissão de receita e laudo médico depende exclusivamente da avaliação clínica soberana do profissional prescritor.",
      paragraphs: [
        "A contratação ou acesso à triagem e teleconsulta não garante a emissão automática de prescrição de produtos à base de Cannabis. O médico especialista possui plena autonomia técnica para indicar, ajustar dosagens ou contraindicar o tratamento caso identifique risco clínico ou inadequação terapêutica.",
        "Quando clinicamente indicada após a avaliação, a documentação digital (receita e laudo) é emitida e disponibilizada na Área do Paciente em média entre 5 e 45 minutos.",
      ],
      keywords: [
        "autonomia médica",
        "prescrição",
        "5 a 45 minutos",
        "laudo",
        "ética médica",
        "contraindicação",
      ],
    },
    {
      id: "termos-responsabilidade-usuario",
      number: "3",
      title: "Veracidade das Informações e Uso Exclusivo do Medicamento",
      badge: "RDC Nº 660/2022 · BOA-FÉ OBJETIVA",
      lead: "A segurança do protocolo depende da exatidão dos dados clínicos informados pelo paciente e do uso estritamente pessoal dos medicamentos importados.",
      paragraphs: [
        "O usuário compromete-se a fornecer informações verdadeiras, completas e atualizadas durante o cadastro, preenchimento das escalas clínicas e teleconsulta, informando medicações em uso, alergias e condições pré-existentes.",
        "Medicamentos importados sob autorização da ANVISA destinam-se exclusivamente ao uso terapêutico do paciente titular da receita, sendo expressamente proibida por lei a revenda, doação, cessão ou compartilhamento com terceiros.",
      ],
      keywords: [
        "responsabilidade",
        "veracidade",
        "uso próprio",
        "proibida revenda",
        "posologia",
      ],
    },
    {
      id: "termos-limitacao",
      number: "4",
      title: "Caráter Auxiliar das Escalas, Calculadora GACP e Conteúdos",
      badge: "RESGUARDO TÉCNICO E JURÍDICO",
      lead: "Ferramentas de rastreio clínico e materiais educativos apoiam a preparação do paciente, mas não substituem consulta médica nem assessoria jurídica individual.",
      paragraphs: [
        "As escalas ASRS-18 (OMS), AQ-10 (Cambridge) e a Calculadora GACP de fitomassa são instrumentos auxiliares de organização informativa. Seus resultados não constituem diagnóstico médico isolado nem substituem parecer jurídico particular contratado para fins judiciais.",
        "O Instituto Mecura reserva-se o direito de atualizar estes Termos de Uso sempre que houver evolução regulatória da ANVISA, do CFM ou da legislação brasileira.",
      ],
      keywords: [
        "escalas",
        "gacp",
        "limitação",
        "conteúdo educativo",
        "atualização",
        "diagnóstico",
      ],
    },
    {
      id: "termos-pi-foro",
      number: "5",
      title: "Propriedade Intelectual, Legislação Aplicável e Foro",
      badge: "LEI Nº 9.610/1998 · MARCO CIVIL",
      lead: "Todo o design, marca, códigos, textos e materiais audiovisuais pertencem ao Instituto Mecura Ltda e são protegidos pela legislação brasileira.",
      paragraphs: [
        "É vedada a reprodução não autorizada da marca Instituto Mecura, sua identidade visual, conteúdos editoriais ou fluxos do aplicativo.",
        "Estes Termos são regidos pelas leis da República Federativa do Brasil, incluindo o Código de Defesa do Consumidor e o Marco Civil da Internet (Lei nº 12.965/2014), elegendo-se o foro legal competente para dirimir eventuais controvérsias.",
      ],
      keywords: [
        "propriedade intelectual",
        "marco civil",
        "cdc",
        "foro",
        "direitos autorais",
      ],
    },
  ],

  dados: [
    {
      id: "dados-direitos-art18",
      number: "1",
      title: "Seus Direitos como Titular de Dados Pessoais",
      badge: "LGPD · ART. 18",
      lead: "Você mantém controle transparente sobre seus dados pessoais e pode exercer todos os direitos assegurados pela Lei Geral de Proteção de Dados a qualquer momento.",
      paragraphs: [
        "Mediante requisição simples aos nossos canais oficiais, o titular tem direito a:",
      ],
      bullets: [
        "Confirmação da existência de tratamento e acesso completo aos dados cadastrais e prontuário eletrônico.",
        "Correção de dados incompletos, inexatos ou desatualizados.",
        "Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos (respeitado o dever legal de guarda de prontuário médico).",
        "Portabilidade dos dados a outro serviço de saúde, mediante solicitação expressa.",
        "Revogação do consentimento e informação clara sobre entidades públicas ou privadas com as quais houve compartilhamento.",
      ],
      keywords: [
        "direitos",
        "art 18",
        "titular",
        "exclusão",
        "portabilidade",
        "acesso",
        "revogação",
      ],
    },
    {
      id: "dados-fila-whatsapp",
      number: "2",
      title: "Privacidade nas Notificações da Fila ao Vivo e WhatsApp",
      badge: "SIGILO OPERACIONAL · LGPD",
      lead: "Alertas enviados por aplicativo e WhatsApp limitam-se ao aviso de chamada médica, preservando sua privacidade clínica.",
      paragraphs: [
        "Quando você aguarda atendimento na Fila ao Vivo, nossas notificações informam exclusivamente sua posição e a liberação da sala médica. Diagnósticos, detalhes de sintomas, receitas e laudos permanecem restritos ao ambiente autenticado da Área do Paciente.",
      ],
      keywords: [
        "whatsapp",
        "fila ao vivo",
        "notificações",
        "sigilo",
        "área do paciente",
      ],
    },
    {
      id: "dados-seguranca-art46",
      number: "3",
      title: "Segurança da Informação e Prevenção a Incidentes",
      badge: "LGPD · ART. 46 A ART. 49",
      lead: "Aplicamos controles técnicos e administrativos contínuos para proteger dados clínicos contra acessos não autorizados, vazamentos ou alterações indevidas.",
      paragraphs: [
        "Nossa arquitetura adota conexões criptografadas (HTTPS/TLS), segregação de acessos por perfil assistencial, registros de auditoria e rotinas de resposta a incidentes alinhadas às diretrizes da Autoridade Nacional de Proteção de Dados (ANPD).",
      ],
      keywords: [
        "segurança",
        "art 46",
        "criptografia",
        "anpd",
        "incidentes",
        "https",
      ],
    },
    {
      id: "dados-dpo-canal",
      number: "4",
      title: "Canal do Encarregado de Dados (DPO) e Suporte Jurídico",
      badge: "LGPD · ART. 41 · ATENDIMENTO DIRETO",
      lead: "Disponibilizamos atendimento direto para solicitações de privacidade, exercício de direitos da LGPD e esclarecimentos sobre conformidade legal.",
      paragraphs: [
        "Para exercer seus direitos como titular ou solicitar esclarecimentos sobre este Parecer Jurídico e Políticas Institucionais, entre em contato diretamente com a equipe de Governança & Privacidade do Instituto Mecura Ltda:",
      ],
      bullets: [
        "E-mail oficial (DPO & Jurídico): contato@mecura.com.br",
        "Central de Apoio WhatsApp: (66) 99628-0883",
        "Razão Social: Instituto Mecura Ltda · CNPJ 69.202.927/0001-19",
      ],
      keywords: [
        "dpo",
        "encarregado",
        "art 41",
        "contato",
        "e-mail",
        "whatsapp",
        "solicitação",
      ],
    },
  ],
};

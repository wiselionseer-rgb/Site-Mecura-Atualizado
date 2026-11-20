export type NewsTopicKey =
  | "inicio"
  | "ultimas"
  | "brasil"
  | "mundo"
  | "anvisa"
  | "justica"
  | "ciencia"
  | "saude"
  | "cultivo"
  | "mercado"
  | "associacoes"
  | "canabinoides";

export type NewsDatePeriod = "todos" | "hoje" | "48h" | "7d" | "30d" | "90d";
export type NewsSortOrder = "destaques" | "recentes" | "relevancia";
export type NewsSourceTier = "especializado" | "imprensa" | "cientifico";

export interface MonitoredSourceMeta {
  id: string;
  source: string;
  handle?: string;
  siteUrl?: string;
  region: "brasil" | "mundo";
  articleCount: number;
  latestPublishedAt?: string | null;
}

export interface NewsArticle {
  id: string;
  title: string;
  originalTitle?: string;
  editorialKicker?: string;
  summary: string;
  excerptParagraphs: string[];
  keyPoints?: string[];
  readingTimeMin?: number;
  url: string;
  source: string;
  sourceId?: string;
  sourceHandle?: string;
  sourceTier?: NewsSourceTier;
  region: "brasil" | "mundo";
  category: Exclude<NewsTopicKey, "inicio" | "ultimas">;
  topics: NewsTopicKey[];
  tags: string[];
  publishedAt: string;
  image: string | null;
  language: "pt" | "en";
  translatedFromEn?: boolean;
  editorialScore?: number;
  isDeepResult?: boolean;
  journalName?: string;
}

export interface NewsApiResponse {
  updatedAt: string | null;
  nextUpdateInMinutes: number;
  pollIntervalSeconds?: number;
  total: number;
  todayCount?: number;
  query?: string;
  topic?: string;
  source?: string;
  period?: NewsDatePeriod;
  date?: string;
  sort?: NewsSortOrder;
  deepFetched?: boolean;
  pubmedCount?: number;
  topicCounts?: Record<string, number>;
  sourcesMeta?: MonitoredSourceMeta[];
  articles: NewsArticle[];
}

export const NEWS_DATE_PERIODS: Array<{ key: NewsDatePeriod; label: string; shortLabel: string }> = [
  { key: "todos", label: "Qualquer data", shortLabel: "Tudo" },
  { key: "hoje", label: "Hoje (24h)", shortLabel: "Hoje" },
  { key: "48h", label: "Últimas 48h", shortLabel: "48h" },
  { key: "7d", label: "Últimos 7 dias", shortLabel: "7 dias" },
  { key: "30d", label: "Últimos 30 dias", shortLabel: "30 dias" },
  { key: "90d", label: "Últimos 90 dias", shortLabel: "90 dias" },
];

export interface NewsTopicMeta {
  key: NewsTopicKey;
  label: string;
  shortLabel: string;
  description: string;
  searchHint: string;
}

export const NEWS_TOPICS: NewsTopicMeta[] = [
  {
    key: "inicio",
    label: "Início",
    shortLabel: "Início",
    description: "Capa do portal com os principais destaques do Brasil e do mundo.",
    searchHint: "Destaques do dia",
  },
  {
    key: "ultimas",
    label: "Últimas Notícias",
    shortLabel: "Últimas",
    description: "Linha do tempo ao vivo com as publicações mais recentes.",
    searchHint: "Tempo real",
  },
  {
    key: "brasil",
    label: "Brasil",
    shortLabel: "Brasil",
    description: "Cobertura nacional sobre acesso, clínicas, estados e políticas públicas.",
    searchHint: "Brasil",
  },
  {
    key: "mundo",
    label: "Mundo",
    shortLabel: "Mundo",
    description: "Avanços na Europa, EUA, Canadá, Uruguai e América Latina.",
    searchHint: "Internacional",
  },
  {
    key: "anvisa",
    label: "ANVISA & Leis",
    shortLabel: "ANVISA",
    description: "Resoluções RDC 660, RDC 327, importação, Congresso e regulação sanitária.",
    searchHint: "ANVISA RDC 660",
  },
  {
    key: "justica",
    label: "Habeas Corpus & Justiça",
    shortLabel: "Justiça & HC",
    description: "Decisões do STJ, STF, salvo-conduto, cultivo autorizado e planos de saúde.",
    searchHint: "Habeas Corpus STJ",
  },
  {
    key: "ciencia",
    label: "Ciência & Estudos",
    shortLabel: "Ciência",
    description: "Ensaios clínicos, PubMed, universidades e sistema endocanabinoide.",
    searchHint: "Estudos clínicos",
  },
  {
    key: "saude",
    label: "Saúde & Patologias",
    shortLabel: "Saúde",
    description: "Ansiedade, autismo, dor crônica, epilepsia, sono, Parkinson e fibromialgia.",
    searchHint: "Autismo ansiedade dor",
  },
  {
    key: "cultivo",
    label: "Cultivo & Genética",
    shortLabel: "Cultivo",
    description: "Agronomia, laudos técnicos, cânhamo industrial, sementes e extrações.",
    searchHint: "Cultivo cânhamo genética",
  },
  {
    key: "mercado",
    label: "Mercado & Negócios",
    shortLabel: "Mercado",
    description: "Indústria farmacêutica, farmácias, investimentos e economia da cannabis.",
    searchHint: "Mercado farmácia",
  },
  {
    key: "associacoes",
    label: "Associações & SUS",
    shortLabel: "Associações",
    description: "Associações terapêuticas brasileiras, acolhimento e fornecimento pelo SUS.",
    searchHint: "Associações SUS",
  },
  {
    key: "canabinoides",
    label: "CBD, THC & Terpenos",
    shortLabel: "CBD & THC",
    description: "Full spectrum, CBG, CBN, efeito comitiva, dosagens e farmacologia.",
    searchHint: "CBD THC CBG terpenos",
  },
];

export const NEWS_TOPIC_MAP: Record<NewsTopicKey, NewsTopicMeta> = NEWS_TOPICS.reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<NewsTopicKey, NewsTopicMeta>
);

export const DEEP_SEARCH_SUGGESTIONS: Array<{ label: string; query: string }> = [
  { label: "ANVISA RDC 660", query: "ANVISA RDC 660" },
  { label: "Habeas Corpus", query: "habeas corpus" },
  { label: "Autismo & TEA", query: "autismo" },
  { label: "Ansiedade & Sono", query: "ansiedade insônia" },
  { label: "Dor Crônica", query: "dor crônica fibromialgia" },
  { label: "STJ & Cânhamo", query: "STJ cânhamo" },
  { label: "SUS & Gratuito", query: "SUS canabidiol" },
  { label: "Cultivo Medicinal", query: "cultivo medicinal" },
  { label: "CBD vs THC", query: "CBD THC" },
  { label: "Terpenos & CBG", query: "terpenos CBG" },
  { label: "Epilepsia", query: "epilepsia" },
  { label: "Mercado & Farmácias", query: "mercado farmácia cannabis" },
];

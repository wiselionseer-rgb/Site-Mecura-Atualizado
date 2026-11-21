import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  FlaskConical,
  Loader2,
  Newspaper,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import {
  DEEP_SEARCH_SUGGESTIONS,
  NEWS_DATE_PERIODS,
  NEWS_TOPICS,
  NEWS_TOPIC_MAP,
  type MonitoredSourceMeta,
  type NewsArticle,
  type NewsDatePeriod,
  type NewsSortOrder,
  type NewsTopicKey,
} from "../data/newsTopics";

interface NewsPortalDrawerProps {
  open: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  topicCounts: Record<string, number>;
  sourcesMeta?: MonitoredSourceMeta[];
  todayCount?: number;
  activeTopic: NewsTopicKey;
  articleReaderOpen?: boolean;
  onSelectTopicAndJump: (
    topic: NewsTopicKey,
    query?: string,
    options?: { period?: NewsDatePeriod; exactDate?: string; sort?: NewsSortOrder }
  ) => void;
  onSelectSourceAndJump?: (sourceId: string) => void;
  onRefreshToday?: () => void;
  onOpenArticle: (article: NewsArticle) => void;
}

function getSaoPauloDateKey(isoOrDate: string | number): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(isoOrDate));
  } catch {
    return new Date(isoOrDate).toISOString().slice(0, 10);
  }
}

function isFromToday(isoDate: string): boolean {
  const ms = new Date(isoDate).getTime();
  if (Number.isNaN(ms)) return false;
  return (Date.now() - ms) / 3600000 <= 24 || getSaoPauloDateKey(ms) === getSaoPauloDateKey(Date.now());
}

function formatEditorialStamp(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Recente";
  const diffMin = Math.floor((Date.now() - date.getTime()) / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const timeStr = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  if (diffMin < 10) return "Agora";
  if (diffMin < 60) return `Há ${diffMin} min`;
  if (diffHours < 24 && getSaoPauloDateKey(isoDate) === getSaoPauloDateKey(Date.now())) {
    return `Hoje · ${timeStr}`;
  }
  if (diffHours < 48) return `Ontem · ${timeStr}`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "2-digit" });
}

function filterArticlesByDate(
  list: NewsArticle[],
  period: NewsDatePeriod,
  exactDate: string
): NewsArticle[] {
  if (exactDate && /^\d{4}-\d{2}-\d{2}$/.test(exactDate)) {
    return list.filter((a) => getSaoPauloDateKey(a.publishedAt) === exactDate);
  }
  if (period === "todos") return list;
  if (period === "hoje") return list.filter((a) => isFromToday(a.publishedAt));

  const maxHoursMap: Record<Exclude<NewsDatePeriod, "todos" | "hoje">, number> = {
    "48h": 48,
    "7d": 7 * 24,
    "30d": 30 * 24,
    "90d": 90 * 24,
  };
  const maxHours = maxHoursMap[period];
  const now = Date.now();
  return list.filter((a) => {
    const ms = new Date(a.publishedAt).getTime();
    return !Number.isNaN(ms) && (now - ms) / 3600000 <= maxHours;
  });
}

function getSourceTierLabel(article: NewsArticle): string | null {
  if (article.sourceTier === "cientifico") return "Estudo Científico";
  if (article.sourceTier === "imprensa") return "Grande Imprensa";
  return null;
}

export function NewsPortalDrawer({
  open,
  onClose,
  articles,
  topicCounts,
  sourcesMeta = [],
  todayCount = 0,
  activeTopic,
  articleReaderOpen = false,
  onSelectTopicAndJump,
  onSelectSourceAndJump,
  onRefreshToday,
  onOpenArticle,
}: NewsPortalDrawerProps) {
  const [previewTopic, setPreviewTopic] = useState<NewsTopicKey>(activeTopic);
  const [localQuery, setLocalQuery] = useState("");
  const [datePeriod, setDatePeriod] = useState<NewsDatePeriod>("todos");
  const [exactDate, setExactDate] = useState("");
  const [sortOrder, setSortOrder] = useState<NewsSortOrder>("relevancia");
  const [liveMatches, setLiveMatches] = useState<NewsArticle[] | null>(null);
  const [liveMatchQueryKey, setLiveMatchQueryKey] = useState<string>("");
  const [pubmedMatchCount, setPubmedMatchCount] = useState<number>(0);
  const [searchingLive, setSearchingLive] = useState(false);
  const [refreshingToday, setRefreshingToday] = useState(false);
  const [imageStage, setImageStage] = useState<Record<string, "proxy" | "failed">>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const getImgSrc = (imgUrl: string) =>
    imageStage[imgUrl] === "proxy"
      ? `/api/news/image?url=${encodeURIComponent(imgUrl)}`
      : imgUrl;

  const handleImgError = (imgUrl: string) => {
    setImageStage((prev) => {
      if (!prev[imgUrl]) return { ...prev, [imgUrl]: "proxy" };
      if (prev[imgUrl] === "proxy") return { ...prev, [imgUrl]: "failed" };
      return prev;
    });
  };

  const computedTodayCount = useMemo(
    () => todayCount || articles.filter((a) => isFromToday(a.publishedAt)).length,
    [todayCount, articles]
  );

  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setPreviewTopic(activeTopic);
    }
    wasOpenRef.current = open;
  }, [open, activeTopic]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !articleReaderOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, articleReaderOpen, onClose]);

  const currentSearchSignature = `${localQuery.trim().toLowerCase()}|${previewTopic}|${datePeriod}|${exactDate}|${sortOrder}`;

  // Debounced live deep search across 12 WP portals + Grande Imprensa BR + Global Wire + PubMed NIH
  useEffect(() => {
    if (!open) return;
    const trimmed = localQuery.trim();
    if (trimmed.length < 2) {
      setLiveMatches(null);
      setLiveMatchQueryKey("");
      setPubmedMatchCount(0);
      setSearchingLive(false);
      return;
    }

    // Immediately invalidate previous query results so stale results NEVER appear under a new query
    setLiveMatches(null);
    setLiveMatchQueryKey("");
    setSearchingLive(true);

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: trimmed,
          topic: previewTopic,
          period: datePeriod,
          sort: sortOrder === "destaques" ? "relevancia" : sortOrder,
        });
        if (exactDate) params.set("date", exactDate);

        const res = await fetch(`/api/news/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.articles)) {
          setLiveMatches(data.articles);
          setLiveMatchQueryKey(currentSearchSignature);
          setPubmedMatchCount(typeof data.pubmedCount === "number" ? data.pubmedCount : 0);
        }
      } catch {
        // Ignore abort / transient errors
      } finally {
        if (!controller.signal.aborted) {
          setSearchingLive(false);
        }
      }
    }, 280);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [localQuery, previewTopic, datePeriod, exactDate, sortOrder, open, currentSearchSignature]);

  const displayedArticles = useMemo(() => {
    const trimmed = localQuery.trim();
    if (trimmed.length >= 2) {
      // Only show fresh liveMatches belonging to THIS exact query
      if (liveMatches && liveMatchQueryKey === currentSearchSignature) {
        return liveMatches.slice(0, 6);
      }
      return [];
    }

    let filtered = articles.filter((item) => {
      return previewTopic === "inicio" || previewTopic === "ultimas"
        ? true
        : (Array.isArray(item.topics) && item.topics.includes(previewTopic)) ||
            item.category === previewTopic ||
            item.region === previewTopic;
    });

    filtered = filterArticlesByDate(filtered, datePeriod, exactDate);

    if (sortOrder === "recentes" || previewTopic === "ultimas" || datePeriod === "hoje" || exactDate) {
      const sortedByDate = [...filtered].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      const withPhotos = sortedByDate.filter((a) => a.image && imageStage[a.image] !== "failed");
      const rest = sortedByDate.filter((a) => !a.image || imageStage[a.image] === "failed");
      return [...withPhotos, ...rest].slice(0, 6);
    }

    if (previewTopic === "inicio") {
      const sorted = [...filtered].sort(
        (a, b) => (b.editorialScore || 0) - (a.editorialScore || 0)
      );
      const withPhotos = sorted.filter((a) => a.image && imageStage[a.image] !== "failed");
      const rest = sorted.filter((a) => !a.image || imageStage[a.image] === "failed");
      return [...withPhotos, ...rest].slice(0, 6);
    }

    return filtered.slice(0, 6);
  }, [
    articles,
    previewTopic,
    localQuery,
    datePeriod,
    exactDate,
    sortOrder,
    liveMatches,
    liveMatchQueryKey,
    currentSearchSignature,
    imageStage,
  ]);

  const currentDesk = NEWS_TOPIC_MAP[previewTopic] || NEWS_TOPICS[0];

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectTopicAndJump(previewTopic, localQuery.trim(), {
      period: datePeriod,
      exactDate,
      sort: sortOrder,
    });
  };

  const handleTodayQuickRefresh = () => {
    setRefreshingToday(true);
    setLocalQuery("");
    setExactDate("");
    setDatePeriod("hoje");
    setSortOrder("recentes");
    onRefreshToday?.();
    window.setTimeout(() => setRefreshingToday(false), 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Portal Mundo Cannabis — Mecura News"
        >
          {/* Dimmed backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Major-Portal Masthead & Deep Research Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-h-[94dvh] bg-background border-b border-border-strong shadow-[0_32px_90px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
            {/* Row 1: InfoMoney / Valor Masthead Strip */}
            <div className="border-b border-border bg-surface/95">
              <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-6">
                {/* Left: Deep Search Input */}
                <form
                  onSubmit={handleSubmitSearch}
                  className="md:col-span-4 order-2 md:order-1 relative flex items-center"
                >
                  <Search className="w-4 h-4 text-text-muted absolute left-3.5 pointer-events-none" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    placeholder="Buscar patologias, leis, PubMed, CBD, cultivo..."
                    aria-label="Busca profunda no Mundo Cannabis"
                    className="w-full pl-10 pr-24 py-2.5 rounded-full bg-background border border-border-strong text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  {localQuery && (
                    <button
                      type="button"
                      onClick={() => setLocalQuery("")}
                      aria-label="Limpar busca"
                      className="absolute right-18 text-text-muted hover:text-text-primary p-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-ink text-[11px] font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                  >
                    Buscar
                  </button>
                </form>

                {/* Center: Bold Editorial Masthead */}
                <div className="md:col-span-4 order-1 md:order-2 flex items-center justify-between md:justify-center gap-3">
                  <div className="flex items-center gap-2.5 md:flex-col md:gap-0.5 text-left md:text-center">
                    <div className="inline-flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-accent md:hidden" />
                      <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-text-primary">
                        MECURA <span className="italic text-accent">NEWS</span>
                      </span>
                    </div>
                    <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      Portais · Grande Imprensa · Estudos PubMed
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar portal de notícias"
                    className="md:hidden w-9 h-9 rounded-full border border-border-strong bg-background flex items-center justify-center text-text-primary cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Right: Atualizar Hoje + Jump to Full Portal + Close */}
                <div className="hidden md:flex md:col-span-4 order-3 items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleTodayQuickRefresh}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-accent/60 bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-accent-ink transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshingToday ? "animate-spin" : ""}`} />
                    <span>Atualizar hoje ({computedTodayCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectTopicAndJump(previewTopic, localQuery.trim(), {
                        period: datePeriod,
                        exactDate,
                        sort: sortOrder,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Portal Completo</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar portal de notícias"
                    className="w-9 h-9 rounded-full border border-border-strong bg-background flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Horizontal Editorial Category Ribbon */}
            <div className="border-b border-border bg-background/95">
              <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
                <div
                  role="tablist"
                  aria-label="Editorias do Mundo Cannabis"
                  className="flex items-center gap-5 sm:gap-7 overflow-x-auto hide-scrollbar"
                >
                  {NEWS_TOPICS.map((topic) => {
                    const isSelected = previewTopic === topic.key;
                    const count = topicCounts[topic.key];
                    return (
                      <button
                        key={topic.key}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setPreviewTopic(topic.key)}
                        className={`relative py-3 text-xs sm:text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isSelected
                            ? "text-text-primary font-semibold"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        <span>{topic.label}</span>
                        {typeof count === "number" &&
                          count > 0 &&
                          topic.key !== "inicio" &&
                          topic.key !== "ultimas" && (
                            <span className="ml-1.5 font-mono text-[10px] text-text-muted tabular-nums">
                              {count}
                            </span>
                          )}
                        {isSelected && (
                          <motion.span
                            layoutId="portal-active-underline"
                            className="absolute left-0 right-0 bottom-0 h-[2px] bg-accent"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 3: Major-Portal Date Filter, Exact Date Picker & Sort Bar */}
            <div className="border-b border-border bg-surface/50">
              <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-2.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted mr-1">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>Data:</span>
                  </span>
                  {NEWS_DATE_PERIODS.map((p) => {
                    const isActive = !exactDate && datePeriod === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => {
                          setExactDate("");
                          setDatePeriod(p.key);
                          if (p.key === "hoje") setSortOrder("recentes");
                        }}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          isActive
                            ? "bg-accent text-accent-ink font-semibold"
                            : "bg-background border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary"
                        }`}
                      >
                        {p.key === "hoje" ? `Hoje (${computedTodayCount})` : p.shortLabel}
                      </button>
                    );
                  })}

                  <label className="inline-flex items-center gap-1.5 pl-2 text-[11px] text-text-secondary">
                    <input
                      type="date"
                      value={exactDate}
                      onChange={(e) => {
                        setExactDate(e.target.value);
                        if (e.target.value) setSortOrder("recentes");
                      }}
                      aria-label="Filtrar por data específica"
                      className="px-2 py-1 rounded bg-background border border-border text-[11px] text-text-primary focus:outline-none focus:border-accent [color-scheme:dark]"
                    />
                    {exactDate && (
                      <button
                        type="button"
                        onClick={() => setExactDate("")}
                        className="text-text-muted hover:text-accent cursor-pointer"
                        aria-label="Limpar data específica"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    Ordenar:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSortOrder("recentes")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      sortOrder === "recentes"
                        ? "bg-accent text-accent-ink font-semibold"
                        : "bg-background border border-border text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Mais recentes
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortOrder("relevancia")}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      sortOrder !== "recentes"
                        ? "bg-accent text-accent-ink font-semibold"
                        : "bg-background border border-border text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Relevância
                  </button>
                </div>
              </div>
            </div>

            {/* Row 4: Scrollable Editorial Content */}
            <div
              data-lenis-prevent
              className="overflow-y-auto overscroll-contain flex-1"
            >
              <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-6">
                {/* Desk Header + Direct Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      <span>
                        {localQuery.trim().length >= 2
                          ? "Pesquisa Profunda Multi-Fonte"
                          : "Editoria Selecionada"}
                      </span>
                      {searchingLive && (
                        <span className="inline-flex items-center gap-1.5 text-text-secondary normal-case tracking-normal">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                          Consultando portais BR, Grande Imprensa e estudos PubMed...
                        </span>
                      )}
                      {!searchingLive && localQuery.trim().length >= 2 && liveMatches && (
                        <span className="text-text-secondary normal-case tracking-normal tabular-nums">
                          · {liveMatches.length} resultados exatos
                          {pubmedMatchCount > 0 ? ` (incluindo ${pubmedMatchCount} estudos PubMed/NIH)` : ""}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary">
                      {localQuery.trim().length >= 2
                        ? `Resultados profundos para “${localQuery.trim()}”`
                        : exactDate
                          ? `Edição de ${new Date(`${exactDate}T12:00:00`).toLocaleDateString("pt-BR")}`
                          : datePeriod === "hoje"
                            ? "Notícias de Hoje no Mundo Cannabis"
                            : currentDesk.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary">
                      {localQuery.trim().length >= 2
                        ? "Varredura simultânea em portais especializados do Brasil e do mundo, Grande Imprensa (O Globo, Folha, CNN, JOTA, Poder360, Agência Brasil, Senado, Reuters, BBC), tradução automática e PubMed."
                        : currentDesk.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleTodayQuickRefresh}
                      className="md:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-accent/60 bg-accent/10 text-accent text-xs font-semibold cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${refreshingToday ? "animate-spin" : ""}`} />
                      <span>Hoje ({computedTodayCount})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectTopicAndJump(previewTopic, localQuery.trim(), {
                          period: datePeriod,
                          exactDate,
                          sort: sortOrder,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-accent/60 bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-accent-ink transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span>
                        {localQuery.trim().length >= 2
                          ? "Abrir pesquisa completa no portal"
                          : `Ver tudo em ${currentDesk.label}`}
                      </span>
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Deep-Dive Cannabis Topic Quick Triggers */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted mr-1">
                    Temas em profundidade:
                  </span>
                  {DEEP_SEARCH_SUGGESTIONS.map((item) => (
                    <button
                      key={item.query}
                      type="button"
                      onClick={() => {
                        setLocalQuery(item.query);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        localQuery.toLowerCase() === item.query.toLowerCase()
                          ? "bg-accent text-accent-ink font-semibold"
                          : "bg-surface border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Live Monitored Official Portals & Profiles Strip */}
                {sourcesMeta.length > 0 && onSelectSourceAndJump && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted mr-1">
                      Fontes em tempo real ({sourcesMeta.length}):
                    </span>
                    {sourcesMeta.slice(0, 10).map((src) => (
                      <button
                        key={src.id}
                        type="button"
                        onClick={() => onSelectSourceAndJump(src.id)}
                        className="px-2.5 py-1 rounded text-[11px] font-medium bg-surface/80 border border-border text-text-secondary hover:border-accent/60 hover:text-accent transition-colors cursor-pointer"
                      >
                        {src.source}
                        {src.handle ? ` · ${src.handle}` : ""}
                      </button>
                    ))}
                  </div>
                )}

                {/* Instant Skeleton While Deep Search Runs (prevents stale previous query cards!) */}
                {searchingLive && localQuery.trim().length >= 2 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 animate-pulse">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border bg-surface/40 space-y-3"
                      >
                        <div className="aspect-[16/9] rounded-lg bg-surface" />
                        <div className="h-3 w-1/3 bg-surface rounded" />
                        <div className="h-5 w-11/12 bg-surface rounded" />
                        <div className="h-3 w-full bg-surface rounded" />
                        <div className="h-3 w-4/5 bg-surface rounded" />
                      </div>
                    ))}
                  </div>
                ) : displayedArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {displayedArticles.map((article) => {
                      const hasImg = Boolean(article.image && imageStage[article.image] !== "failed");
                      const tierLabel = getSourceTierLabel(article);
                      return (
                        <article
                          key={`${article.id}-${article.url}`}
                          onClick={() => {
                            onOpenArticle(article);
                          }}
                          className="group flex flex-col justify-between gap-3 p-4 rounded-xl border border-border bg-surface/35 hover:border-accent/50 transition-colors cursor-pointer"
                        >
                          <div className="space-y-3">
                            {hasImg && article.image ? (
                              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-surface border border-border">
                                <img
                                  src={getImgSrc(article.image)}
                                  alt={article.title}
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                  onError={() => handleImgError(article.image!)}
                                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border/80 font-mono text-[10px] uppercase tracking-[0.14em]">
                                <span className="inline-flex items-center gap-1.5 text-accent">
                                  {article.sourceTier === "cientifico" ? (
                                    <FlaskConical className="w-3.5 h-3.5" />
                                  ) : (
                                    <Newspaper className="w-3.5 h-3.5" />
                                  )}
                                  <span>{tierLabel || "Cobertura Editorial"}</span>
                                </span>
                                {article.readingTimeMin && (
                                  <span className="inline-flex items-center gap-1 text-text-muted normal-case tracking-normal">
                                    <Clock className="w-3 h-3" />
                                    {article.readingTimeMin} min
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
                              <span className="uppercase tracking-[0.12em] text-accent truncate">
                                {article.editorialKicker || article.source}
                              </span>
                              <span className="tabular-nums shrink-0">
                                {formatEditorialStamp(article.publishedAt)}
                              </span>
                            </div>

                            <h4 className="font-display text-lg font-medium leading-snug text-text-primary group-hover:text-accent transition-colors line-clamp-3">
                              {article.title}
                            </h4>

                            <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                              {article.summary}
                            </p>

                            {!hasImg && article.keyPoints && article.keyPoints.length > 0 && (
                              <p className="text-[11px] text-text-muted leading-relaxed border-l-2 border-accent/40 pl-2.5 line-clamp-2">
                                {article.keyPoints[0]}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-text-muted">
                              <span className="text-text-secondary">{article.source}</span>
                              {tierLabel && hasImg && <span>· {tierLabel}</span>}
                              {article.readingTimeMin && hasImg && (
                                <span>· {article.readingTimeMin} min</span>
                              )}
                              {article.translatedFromEn && <span>· PT-BR</span>}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-border/70">
                            <span className="inline-flex items-center gap-1 font-semibold text-text-primary group-hover:text-accent transition-colors">
                              <span>Ler análise completa</span>
                              <ArrowUpRight className="w-3 h-3 text-accent" />
                            </span>
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors"
                            >
                              <span>Fonte</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-10 text-center border border-border rounded-xl bg-surface/50 space-y-3 px-6">
                    <p className="text-sm text-text-primary">
                      Nenhuma matéria encontrada para esse recorte de tema e data.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {(datePeriod !== "todos" || exactDate) && (
                        <button
                          type="button"
                          onClick={() => {
                            setDatePeriod("todos");
                            setExactDate("");
                          }}
                          className="px-4 py-2 rounded-full border border-accent/60 bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-accent-ink transition-colors cursor-pointer"
                        >
                          Ampliar para qualquer data
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          onSelectTopicAndJump(previewTopic, localQuery.trim(), {
                            period: "todos",
                            exactDate: "",
                            sort: "relevancia",
                          })
                        }
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                      >
                        <span>Abrir busca completa no portal</span>
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

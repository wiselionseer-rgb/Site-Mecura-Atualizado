import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  FlaskConical,
  Globe,
  Loader2,
  Newspaper,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { BRAND } from "../data/mecuraContent";
import {
  DEEP_SEARCH_SUGGESTIONS,
  NEWS_DATE_PERIODS,
  NEWS_TOPICS,
  NEWS_TOPIC_MAP,
  type MonitoredSourceMeta,
  type NewsApiResponse,
  type NewsArticle,
  type NewsDatePeriod,
  type NewsSortOrder,
  type NewsSourceTier,
  type NewsTopicKey,
} from "../data/newsTopics";

interface NewsBlogSectionProps {
  activeTopic: NewsTopicKey;
  onChangeTopic: (topic: NewsTopicKey) => void;
  activeSourceId: string | null;
  onChangeSourceId: (sourceId: string | null) => void;
  datePeriod: NewsDatePeriod;
  onChangeDatePeriod: (period: NewsDatePeriod) => void;
  exactDate: string;
  onChangeExactDate: (date: string) => void;
  sortOrder: NewsSortOrder;
  onChangeSortOrder: (sort: NewsSortOrder) => void;
  searchQuery: string;
  onChangeSearchQuery: (q: string) => void;
  searchTrigger: number;
  todayRefreshTrigger: number;
  externalSelectedArticle: NewsArticle | null;
  onClearExternalArticle: () => void;
  onArticleReaderChange?: (open: boolean) => void;
  onFeedSynced?: (
    articles: NewsArticle[],
    topicCounts: Record<string, number>,
    sourcesMeta: MonitoredSourceMeta[],
    todayCount: number
  ) => void;
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

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Recente";

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const timeStr = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  if (diffMin < 10) return "Agora";
  if (diffMin < 60) return `Há ${diffMin} min`;
  if (diffHours < 24 && getSaoPauloDateKey(isoDate) === getSaoPauloDateKey(Date.now())) {
    return `Hoje · ${timeStr}`;
  }
  if (diffHours < 48) return `Ontem · ${timeStr}`;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatSyncTime(isoDate: string | null): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTodayEditionLabel(): string {
  try {
    const raw = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "long",
      day: "2-digit",
      month: "long",
    }).format(new Date());
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  } catch {
    return "Edição de Hoje";
  }
}

function normalizeStr(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filterByDate(
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

function getSourceTierLabel(tier?: NewsSourceTier): string | null {
  if (tier === "cientifico") return "Estudo Científico";
  if (tier === "imprensa") return "Grande Imprensa";
  return null;
}

export function NewsBlogSection({
  activeTopic,
  onChangeTopic,
  activeSourceId,
  onChangeSourceId,
  datePeriod,
  onChangeDatePeriod,
  exactDate,
  onChangeExactDate,
  sortOrder,
  onChangeSortOrder,
  searchQuery,
  onChangeSearchQuery,
  searchTrigger,
  todayRefreshTrigger,
  externalSelectedArticle,
  onClearExternalArticle,
  onArticleReaderChange,
  onFeedSynced,
}: NewsBlogSectionProps) {
  const [baseArticles, setBaseArticles] = useState<NewsArticle[]>([]);
  const [sourcesMeta, setSourcesMeta] = useState<MonitoredSourceMeta[]>([]);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [tierFilter, setTierFilter] = useState<"todos" | NewsSourceTier>("todos");
  const [deepResults, setDeepResults] = useState<NewsArticle[] | null>(null);
  const [deepSignatureExecuted, setDeepSignatureExecuted] = useState<string>("");
  const [deepPubmedCount, setDeepPubmedCount] = useState<number>(0);
  const [topicCounts, setTopicCounts] = useState<Record<string, number>>({});
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [freshAlert, setFreshAlert] = useState<{
    count: number;
    article: NewsArticle | null;
  } | null>(null);
  const [showAllSources, setShowAllSources] = useState(false);
  const [visibleCount, setVisibleCount] = useState(11);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchingDeep, setSearchingDeep] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [loadingDeepArticle, setLoadingDeepArticle] = useState(false);
  const [imageStage, setImageStage] = useState<Record<string, "proxy" | "failed">>({});
  const deepAbortRef = useRef<AbortController | null>(null);

  const getImgSrc = useCallback(
    (imgUrl: string) =>
      imageStage[imgUrl] === "proxy"
        ? `/api/news/image?url=${encodeURIComponent(imgUrl)}`
        : imgUrl,
    [imageStage]
  );

  const handleImageError = useCallback((imgUrl: string) => {
    setImageStage((prev) => {
      if (!prev[imgUrl]) return { ...prev, [imgUrl]: "proxy" };
      if (prev[imgUrl] === "proxy") return { ...prev, [imgUrl]: "failed" };
      return prev;
    });
  }, []);

  // Sync externally clicked article (e.g. from top portal menu)
  useEffect(() => {
    if (externalSelectedArticle) {
      setSelectedArticle(externalSelectedArticle);
      onClearExternalArticle();
    }
  }, [externalSelectedArticle, onClearExternalArticle]);

  // On-demand deep reader enrichment when opening an RSS / Grande Imprensa article with a short stub
  useEffect(() => {
    if (!selectedArticle) {
      setLoadingDeepArticle(false);
      return;
    }
    const totalChars = (selectedArticle.excerptParagraphs || []).join(" ").length;
    const isShortStub =
      (selectedArticle.excerptParagraphs?.length || 0) <= 2 &&
      totalChars < 420 &&
      selectedArticle.sourceTier !== "cientifico";

    if (!isShortStub) return;

    const controller = new AbortController();
    setLoadingDeepArticle(true);

    fetch(
      `/api/news/article?url=${encodeURIComponent(selectedArticle.url)}&lang=${encodeURIComponent(
        selectedArticle.language || "pt"
      )}`,
      { signal: controller.signal }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((detail) => {
        if (!detail || controller.signal.aborted) return;
        setSelectedArticle((prev) => {
          if (!prev || prev.id !== selectedArticle.id) return prev;
          const nextParagraphs =
            Array.isArray(detail.paragraphs) && detail.paragraphs.length > (prev.excerptParagraphs?.length || 0)
              ? detail.paragraphs
              : prev.excerptParagraphs;
          const nextKeyPoints =
            Array.isArray(detail.keyPoints) && detail.keyPoints.length > 0
              ? detail.keyPoints
              : prev.keyPoints;
          return {
            ...prev,
            image: prev.image || detail.image || null,
            excerptParagraphs: nextParagraphs,
            keyPoints: nextKeyPoints,
            readingTimeMin: detail.readingTimeMin || prev.readingTimeMin,
          };
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setLoadingDeepArticle(false);
      });

    return () => controller.abort();
  }, [selectedArticle?.id]);

  const loadBaseFeed = useCallback(
    async (forceRefresh = false, silent = false) => {
      try {
        if (forceRefresh) {
          setRefreshing(true);
        } else if (!silent) {
          setLoading(true);
        }
        setError(null);

        const url = forceRefresh ? "/api/news?refresh=1" : "/api/news";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: NewsApiResponse = await response.json();
        const loaded = Array.isArray(data.articles) ? data.articles : [];
        const counts = data.topicCounts || {};
        const sources = Array.isArray(data.sourcesMeta) ? data.sourcesMeta : [];
        const computedToday =
          typeof data.todayCount === "number"
            ? data.todayCount
            : loaded.filter((a) => isFromToday(a.publishedAt)).length;
        setBaseArticles(loaded);
        setTopicCounts(counts);
        setSourcesMeta(sources);
        setTodayCount(computedToday);
        setUpdatedAt(data.updatedAt ?? new Date().toISOString());
        onFeedSynced?.(loaded, counts, sources, computedToday);
      } catch {
        if (!silent) {
          setError("Não foi possível carregar as notícias agora. Tente novamente em instantes.");
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [onFeedSynced]
  );

  // Initial fetch + Real-Time Server-Sent Events (SSE) subscription for instant updates
  useEffect(() => {
    loadBaseFeed(false, false);

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource("/api/news/stream");
      eventSource.addEventListener("news_update", (ev: MessageEvent) => {
        try {
          const payload = JSON.parse(ev.data);
          if (Array.isArray(payload.articles) && payload.articles.length > 0) {
            const counts = payload.topicCounts || {};
            const sources = Array.isArray(payload.sourcesMeta) ? payload.sourcesMeta : [];
            const computedToday =
              typeof payload.todayCount === "number"
                ? payload.todayCount
                : payload.articles.filter((a: NewsArticle) => isFromToday(a.publishedAt)).length;
            setBaseArticles(payload.articles);
            setTopicCounts(counts);
            setSourcesMeta(sources);
            setTodayCount(computedToday);
            setUpdatedAt(payload.updatedAt ?? new Date().toISOString());
            onFeedSynced?.(payload.articles, counts, sources, computedToday);

            if (payload.newCount > 0 && payload.latestNewArticle) {
              setFreshAlert({
                count: payload.newCount,
                article: payload.latestNewArticle,
              });
            }
          }
        } catch {
          // Ignore malformed event chunk
        }
      });
    } catch {
      // Fallback polling below handles environments without EventSource
    }

    const fallbackInterval = window.setInterval(() => {
      loadBaseFeed(false, true);
    }, 3 * 60 * 1000);

    return () => {
      eventSource?.close();
      window.clearInterval(fallbackInterval);
    };
  }, [loadBaseFeed, onFeedSynced]);

  // Triggered when user clicks "Atualizar hoje" inside NewsPortalDrawer
  useEffect(() => {
    if (todayRefreshTrigger > 0) {
      loadBaseFeed(true, false);
    }
  }, [todayRefreshTrigger, loadBaseFeed]);

  const currentSearchSignature = `${searchQuery.trim().toLowerCase()}|${activeTopic}|${datePeriod}|${exactDate}|${sortOrder}`;

  // Deep live backend search across 12 WP Portals + Grande Imprensa BR + Global Wire + PubMed NIH
  const runDeepSearch = useCallback(
    async (
      rawQuery: string,
      topic: NewsTopicKey,
      period: NewsDatePeriod,
      date: string,
      sort: NewsSortOrder
    ) => {
      const trimmed = rawQuery.trim();
      if (trimmed.length < 2) {
        setDeepResults(null);
        setDeepSignatureExecuted("");
        setDeepPubmedCount(0);
        setSearchingDeep(false);
        return;
      }

      deepAbortRef.current?.abort();
      const controller = new AbortController();
      deepAbortRef.current = controller;

      // Immediately clear stale results from any previous query
      setDeepResults(null);
      setDeepSignatureExecuted("");
      setSearchingDeep(true);

      const sig = `${trimmed.toLowerCase()}|${topic}|${period}|${date}|${sort}`;

      try {
        const params = new URLSearchParams({
          q: trimmed,
          topic,
          period,
          sort: sort === "destaques" ? "relevancia" : sort,
        });
        if (date) params.set("date", date);

        const res = await fetch(`/api/news/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: NewsApiResponse = await res.json();
        if (Array.isArray(data.articles) && !controller.signal.aborted) {
          setDeepResults(data.articles);
          setDeepSignatureExecuted(sig);
          setDeepPubmedCount(typeof data.pubmedCount === "number" ? data.pubmedCount : 0);
          setVisibleCount(11);
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          setDeepResults(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearchingDeep(false);
        }
      }
    },
    []
  );

  // Automatic debounced deep search when user types 2+ characters or changes date/sort while searching
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setDeepResults(null);
      setDeepSignatureExecuted("");
      setDeepPubmedCount(0);
      setSearchingDeep(false);
      return;
    }

    const timer = window.setTimeout(() => {
      runDeepSearch(trimmed, activeTopic, datePeriod, exactDate, sortOrder);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [searchQuery, activeTopic, datePeriod, exactDate, sortOrder, searchTrigger, runDeepSearch]);

  useEffect(() => {
    onArticleReaderChange?.(Boolean(selectedArticle));
    if (!selectedArticle) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedArticle, onArticleReaderChange]);

  const activeSourceMeta = useMemo(
    () => (activeSourceId ? sourcesMeta.find((s) => s.id === activeSourceId) || null : null),
    [activeSourceId, sourcesMeta]
  );

  const filteredArticles = useMemo(() => {
    const trimmed = searchQuery.trim();
    let list: NewsArticle[];

    if (
      !activeSourceId &&
      trimmed.length >= 2 &&
      deepResults &&
      deepSignatureExecuted === currentSearchSignature
    ) {
      list = deepResults;
    } else if (trimmed.length >= 2 && !activeSourceId && searchingDeep) {
      return [];
    } else {
      const normQ = normalizeStr(trimmed);
      list = baseArticles.filter((item) => {
        if (activeSourceId && item.sourceId !== activeSourceId) {
          return false;
        }

        const matchesTopic =
          activeTopic === "inicio" || activeTopic === "ultimas"
            ? true
            : (Array.isArray(item.topics) && item.topics.includes(activeTopic)) ||
              item.category === activeTopic ||
              item.region === activeTopic;

        if (!matchesTopic) return false;
        if (!normQ) return true;

        const haystack = normalizeStr(
          `${item.title} ${item.summary} ${item.source} ${item.sourceHandle || ""} ${(item.tags || []).join(" ")} ${(item.excerptParagraphs || []).join(" ")}`
        );
        return haystack.includes(normQ);
      });

      list = filterByDate(list, datePeriod, exactDate);
    }

    if (tierFilter !== "todos") {
      list = list.filter((a) => (a.sourceTier || "especializado") === tierFilter);
    }

    if (
      sortOrder === "recentes" ||
      activeTopic === "ultimas" ||
      activeSourceId ||
      datePeriod === "hoje" ||
      Boolean(exactDate)
    ) {
      return [...list].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    if (activeTopic === "inicio" && trimmed.length < 2) {
      return [...list].sort((a, b) => (b.editorialScore || 0) - (a.editorialScore || 0));
    }

    return list;
  }, [
    baseArticles,
    deepResults,
    deepSignatureExecuted,
    currentSearchSignature,
    searchingDeep,
    activeTopic,
    activeSourceId,
    datePeriod,
    exactDate,
    sortOrder,
    tierFilter,
    searchQuery,
  ]);

  const leadArticle = useMemo(() => {
    const withRealPhoto = filteredArticles.find(
      (a) => a.image && imageStage[a.image] !== "failed"
    );
    return withRealPhoto ?? filteredArticles[0] ?? null;
  }, [filteredArticles, imageStage]);

  const breakingRailArticles = useMemo(() => {
    if (!leadArticle) return [];
    return filteredArticles.filter((a) => a.id !== leadArticle.id).slice(0, 5);
  }, [filteredArticles, leadArticle]);

  const gridFeedArticles = useMemo(() => {
    if (!leadArticle) return [];
    const usedIds = new Set([leadArticle.id, ...breakingRailArticles.map((a) => a.id)]);
    return filteredArticles
      .filter((a) => !usedIds.has(a.id))
      .slice(0, Math.max(0, visibleCount - 6));
  }, [filteredArticles, leadArticle, breakingRailArticles, visibleCount]);

  const hasMore = filteredArticles.length > visibleCount;
  const activeDeskMeta = NEWS_TOPIC_MAP[activeTopic] || NEWS_TOPICS[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runDeepSearch(searchQuery, activeTopic, datePeriod, exactDate, sortOrder);
  };

  const handleRefreshToday = () => {
    onChangeSourceId(null);
    onChangeSearchQuery("");
    onChangeExactDate("");
    onChangeDatePeriod("hoje");
    onChangeSortOrder("recentes");
    onChangeTopic("ultimas");
    setTierFilter("todos");
    setVisibleCount(11);
    loadBaseFeed(true, false);
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    activeTopic !== "inicio" ||
    Boolean(activeSourceId) ||
    datePeriod !== "todos" ||
    Boolean(exactDate) ||
    tierFilter !== "todos";

  return (
    <section
      id="blog"
      className="py-24 lg:py-32 px-6 lg:px-12 bg-background border-t border-border scroll-mt-16"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Major-Portal Masthead Container (InfoMoney / G1 / Valor Inspired) */}
        <div className="rounded-2xl border border-border-strong bg-surface/90 overflow-hidden mb-10">
          {/* Edition Top Utility Strip */}
          <div className="px-5 sm:px-7 py-2.5 border-b border-border bg-background/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-muted">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-accent uppercase tracking-[0.14em]">
                {formatTodayEditionLabel()}
              </span>
              <span>·</span>
              <span>
                {sourcesMeta.length} portais monitorados + Grande Imprensa BR + PubMed/NIH
              </span>
            </div>
            {updatedAt && (
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Clock className="w-3 h-3 text-accent" />
                <span>Atualização automática · {formatSyncTime(updatedAt)}</span>
              </span>
            )}
          </div>

          {/* Masthead Strip: Search Left · Bold Editorial Title Center · "Atualizar Hoje" Right */}
          <div className="px-5 sm:px-7 py-5 grid grid-cols-1 lg:grid-cols-12 items-center gap-5 border-b border-border">
            <form
              onSubmit={handleFormSubmit}
              className="lg:col-span-4 order-2 lg:order-1 relative flex items-center"
            >
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onChangeSearchQuery(e.target.value)}
                placeholder="Buscar patologias, leis, estudos PubMed, CBD..."
                aria-label="Busca profunda no Portal Mundo Cannabis"
                className="w-full pl-10 pr-24 py-2.5 rounded-full bg-background border border-border-strong text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onChangeSearchQuery("");
                    setDeepResults(null);
                    setDeepSignatureExecuted("");
                  }}
                  aria-label="Limpar busca"
                  className="absolute right-18 text-text-muted hover:text-text-primary p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                disabled={searchingDeep}
                className="absolute right-1.5 px-3.5 py-1.5 rounded-full bg-accent text-accent-ink text-[11px] font-semibold hover:bg-accent-hover transition-colors cursor-pointer disabled:opacity-60"
              >
                {searchingDeep ? "..." : "Buscar"}
              </button>
            </form>

            <div className="lg:col-span-4 order-1 lg:order-2 text-left lg:text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-1">
                Portal Editorial · Mundo Cannabis
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
                MECURA <span className="italic text-accent">NEWS</span>
              </h2>
            </div>

            <div className="lg:col-span-4 order-3 flex flex-wrap items-center lg:justify-end gap-2.5">
              <button
                type="button"
                onClick={handleRefreshToday}
                disabled={refreshing || loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                <span>
                  {refreshing
                    ? "Atualizando hoje..."
                    : `Atualizar notícias de hoje (${todayCount})`}
                </span>
              </button>
            </div>
          </div>

          {/* Editorial Category Ribbon */}
          <div className="px-5 sm:px-7 border-b border-border bg-background/60">
            <div
              role="tablist"
              aria-label="Editorias do portal Mundo Cannabis"
              className="flex items-center gap-6 overflow-x-auto hide-scrollbar"
            >
              {NEWS_TOPICS.map((topic) => {
                const isActive = activeTopic === topic.key;
                const count = topicCounts[topic.key];
                return (
                  <button
                    key={topic.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      onChangeTopic(topic.key);
                      if (topic.key === "ultimas") onChangeSortOrder("recentes");
                      setVisibleCount(11);
                    }}
                    className={`relative py-3.5 text-xs sm:text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isActive
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
                    {isActive && (
                      <motion.span
                        layoutId="blog-desk-underline"
                        className="absolute left-0 right-0 bottom-0 h-[2px] bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Major-Portal Date Filter, Exact Date Picker, Source Tier & Sort Controls */}
          <div className="px-5 sm:px-7 py-3.5 border-b border-border bg-surface/75 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            {/* Left: Date Period + Exact Date */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted mr-1">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>Período:</span>
              </span>
              {NEWS_DATE_PERIODS.map((p) => {
                const isActive = !exactDate && datePeriod === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => {
                      onChangeExactDate("");
                      onChangeDatePeriod(p.key);
                      if (p.key === "hoje") onChangeSortOrder("recentes");
                      setVisibleCount(11);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-accent text-accent-ink font-semibold"
                        : "bg-background border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary"
                    }`}
                  >
                    {p.key === "hoje" ? `Hoje (${todayCount})` : p.shortLabel}
                  </button>
                );
              })}

              <label className="inline-flex items-center gap-1.5 pl-1.5">
                <span className="sr-only">Escolher data específica</span>
                <input
                  type="date"
                  value={exactDate}
                  onChange={(e) => {
                    onChangeExactDate(e.target.value);
                    if (e.target.value) onChangeSortOrder("recentes");
                    setVisibleCount(11);
                  }}
                  className="px-2.5 py-1 rounded bg-background border border-border text-[11px] text-text-primary focus:outline-none focus:border-accent [color-scheme:dark]"
                />
                {exactDate && (
                  <button
                    type="button"
                    onClick={() => onChangeExactDate("")}
                    aria-label="Limpar data específica"
                    className="text-text-muted hover:text-accent cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </label>
            </div>

            {/* Right: Source Format Filter + Sort Order */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap items-center gap-1">
                {(
                  [
                    ["todos", "Todas coberturas"],
                    ["especializado", "Portais Cannabis"],
                    ["imprensa", "Grande Imprensa"],
                    ["cientifico", "Estudos PubMed"],
                  ] as Array<["todos" | NewsSourceTier, string]>
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setTierFilter(key);
                      setVisibleCount(11);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      tierFilter === key
                        ? "bg-accent/20 border border-accent/60 text-accent font-semibold"
                        : "bg-background border border-border text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 border-l border-border pl-3">
                <button
                  type="button"
                  onClick={() => onChangeSortOrder("recentes")}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    sortOrder === "recentes"
                      ? "bg-accent text-accent-ink font-semibold"
                      : "bg-background border border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Mais recentes
                </button>
                <button
                  type="button"
                  onClick={() => onChangeSortOrder(searchQuery.trim().length >= 2 ? "relevancia" : "destaques")}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    sortOrder !== "recentes"
                      ? "bg-accent text-accent-ink font-semibold"
                      : "bg-background border border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {searchQuery.trim().length >= 2 ? "Relevância" : "Destaques"}
                </button>
              </div>
            </div>
          </div>

          {/* Monitored Official Portals & Informative Profiles Strip */}
          {sourcesMeta.length > 0 && (
            <div className="px-5 sm:px-7 py-3 border-b border-border bg-background/40 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Portais &amp; Perfis Monitorados em Tempo Real ({sourcesMeta.length} fontes oficiais · sincronização a cada 2 min)
                </span>
                {sourcesMeta.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSources((v) => !v)}
                    className="font-mono text-[11px] text-accent hover:underline underline-offset-4 cursor-pointer"
                  >
                    {showAllSources ? "Mostrar menos" : `Ver todas as ${sourcesMeta.length} fontes`}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    onChangeSourceId(null);
                    setVisibleCount(11);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    !activeSourceId
                      ? "bg-accent text-accent-ink font-semibold"
                      : "bg-surface border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary"
                  }`}
                >
                  Todas as fontes
                </button>
                {(showAllSources ? sourcesMeta : sourcesMeta.slice(0, 8)).map((src) => {
                  const isSelected = activeSourceId === src.id;
                  return (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => {
                        onChangeSourceId(isSelected ? null : src.id);
                        setVisibleCount(11);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-accent text-accent-ink font-semibold"
                          : "bg-surface border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary"
                      }`}
                    >
                      <span>{src.source}</span>
                      {src.handle && (
                        <span
                          className={`font-mono text-[10px] ${
                            isSelected ? "text-accent-ink/80" : "text-text-muted"
                          }`}
                        >
                          {src.handle}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Deep-Dive Topic Suggestions Strip */}
          <div className="px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-surface/60">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted mr-1.5">
                Busca profunda:
              </span>
              {DEEP_SEARCH_SUGGESTIONS.map((item) => {
                const isCurrent =
                  searchQuery.trim().toLowerCase() === item.query.toLowerCase();
                return (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => {
                      onChangeSourceId(null);
                      onChangeSearchQuery(item.query);
                      runDeepSearch(item.query, activeTopic, datePeriod, exactDate, sortOrder);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-accent text-accent-ink font-semibold"
                        : "bg-background/80 border border-border text-text-secondary hover:border-accent/60 hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="font-mono text-[11px] text-text-muted tabular-nums">
              {searchingDeep ? (
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Varrendo portais BR, Grande Imprensa e estudos PubMed...
                </span>
              ) : searchQuery.trim().length >= 2 && !activeSourceId ? (
                <span className="text-accent">
                  {filteredArticles.length} resultados exatos para “{searchQuery.trim()}”
                  {deepPubmedCount > 0 ? ` · ${deepPubmedCount} PubMed/NIH` : ""}
                </span>
              ) : (
                <span>
                  {activeSourceMeta ? activeSourceMeta.source : activeDeskMeta.label} ·{" "}
                  {filteredArticles.length} matérias
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Real-Time Breaking Publication Notification */}
        <AnimatePresence>
          {freshAlert && freshAlert.article && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 px-5 py-3.5 rounded-xl border border-accent/40 bg-accent/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  Nova publicação detectada em tempo real · {freshAlert.article.source}
                  {freshAlert.article.sourceHandle ? ` (${freshAlert.article.sourceHandle})` : ""}
                </p>
                <p className="text-sm font-medium text-text-primary truncate">
                  {freshAlert.article.title}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (freshAlert.article) setSelectedArticle(freshAlert.article);
                    setFreshAlert(null);
                  }}
                  className="px-4 py-1.5 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  Ler agora
                </button>
                <button
                  type="button"
                  onClick={() => setFreshAlert(null)}
                  aria-label="Dispensar aviso"
                  className="text-text-muted hover:text-text-primary p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Desk Editorial Context Line */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 pb-4 border-b border-border">
          <div className="space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary">
              {activeSourceMeta
                ? `${activeSourceMeta.source}${activeSourceMeta.handle ? ` · ${activeSourceMeta.handle}` : ""}`
                : searchQuery.trim().length >= 2
                  ? `Resultados profundos para “${searchQuery.trim()}”`
                  : exactDate
                    ? `Edição de ${new Date(`${exactDate}T12:00:00`).toLocaleDateString("pt-BR")}`
                    : datePeriod === "hoje"
                      ? "Notícias de Hoje no Mundo Cannabis"
                      : activeDeskMeta.label}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              {activeSourceMeta
                ? `Publicações sincronizadas diretamente de ${activeSourceMeta.siteUrl?.replace(/^https?:\/\//, "")} assim que entram no ar.`
                : searchQuery.trim().length >= 2
                  ? "Cruzamento em tempo real entre 12 portais especializados, G1/Folha/CNN/BBC/UOL, cobertura global traduzida e artigos científicos do PubMed."
                  : activeDeskMeta.description}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onChangeTopic("inicio");
                onChangeSourceId(null);
                onChangeDatePeriod("todos");
                onChangeExactDate("");
                onChangeSortOrder("destaques");
                setTierFilter("todos");
                onChangeSearchQuery("");
                setDeepResults(null);
                setDeepSignatureExecuted("");
              }}
              className="text-xs font-medium text-accent hover:underline underline-offset-4 cursor-pointer whitespace-nowrap w-fit"
            >
              Limpar filtros e voltar para a Capa
            </button>
          )}
        </div>

        {/* Loading Skeleton (Initial Load OR Active Deep Search) */}
        {(loading || (searchingDeep && searchQuery.trim().length >= 2 && !activeSourceId)) && (
          <div className="space-y-10 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="aspect-[16/10] bg-surface rounded-2xl" />
                <div className="h-8 w-4/5 bg-surface rounded" />
                <div className="h-4 w-full bg-surface rounded" />
              </div>
              <div className="lg:col-span-5 space-y-5">
                {[0, 1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-16 bg-surface/70 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && baseArticles.length === 0 && (
          <div className="py-16 text-center space-y-4 border border-border rounded-2xl bg-surface/40">
            <p className="text-base text-text-primary">{error}</p>
            <button
              type="button"
              onClick={() => loadBaseFeed(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tentar novamente</span>
            </button>
          </div>
        )}

        {/* Empty Filter State */}
        {!loading && !searchingDeep && !error && filteredArticles.length === 0 && (
          <div className="py-16 text-center space-y-4 border border-border rounded-2xl bg-surface/40 px-6">
            <p className="text-base text-text-primary font-medium">
              Nenhuma matéria encontrada para esse recorte de tema e data.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {(datePeriod !== "todos" || exactDate) && (
                <button
                  type="button"
                  onClick={() => {
                    onChangeDatePeriod("todos");
                    onChangeExactDate("");
                  }}
                  className="px-5 py-2.5 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  Ampliar para qualquer data
                </button>
              )}
              {searchQuery.trim().length >= 2 && activeTopic !== "inicio" && (
                <button
                  type="button"
                  onClick={() => {
                    onChangeTopic("inicio");
                    runDeepSearch(searchQuery, "inicio", "todos", "", sortOrder);
                  }}
                  className="px-5 py-2.5 rounded-full border border-accent/60 bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-accent-ink transition-colors cursor-pointer"
                >
                  Buscar em todas as editorias
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onChangeTopic("inicio");
                  onChangeSourceId(null);
                  onChangeDatePeriod("todos");
                  onChangeExactDate("");
                  setTierFilter("todos");
                  onChangeSearchQuery("");
                  setDeepResults(null);
                  setDeepSignatureExecuted("");
                }}
                className="text-xs font-semibold text-accent hover:underline underline-offset-4 cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          </div>
        )}

        {/* InfoMoney / Valor 3-Tier Editorial Front Page */}
        {!loading && !(searchingDeep && searchQuery.trim().length >= 2 && !activeSourceId) && leadArticle && (
          <div className="space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Tier 1: Lead Featured Story */}
              <article
                onClick={() => setSelectedArticle(leadArticle)}
                className="lg:col-span-7 group space-y-5 cursor-pointer"
              >
                {leadArticle.image && imageStage[leadArticle.image] !== "failed" ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface border border-border">
                    <img
                      src={getImgSrc(leadArticle.image)}
                      alt={leadArticle.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => handleImageError(leadArticle.image!)}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-primary">
                      <span className="text-accent">
                        {leadArticle.editorialKicker ||
                          NEWS_TOPIC_MAP[leadArticle.category]?.shortLabel ||
                          leadArticle.category}
                      </span>
                      <span className="tabular-nums text-text-secondary">
                        {formatRelativeDate(leadArticle.publishedAt)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-border-strong bg-surface/60 space-y-3">
                    <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      <span className="inline-flex items-center gap-2">
                        {leadArticle.sourceTier === "cientifico" ? (
                          <FlaskConical className="w-4 h-4" />
                        ) : (
                          <Newspaper className="w-4 h-4" />
                        )}
                        <span>
                          {getSourceTierLabel(leadArticle.sourceTier) ||
                            leadArticle.editorialKicker ||
                            "Destaque Editorial"}
                        </span>
                      </span>
                      <span className="text-text-muted normal-case tracking-normal">
                        {formatRelativeDate(leadArticle.publishedAt)}
                      </span>
                    </div>
                    {leadArticle.keyPoints && leadArticle.keyPoints.length > 0 && (
                      <ul className="space-y-2 pt-2 border-t border-border text-xs sm:text-sm text-text-secondary">
                        {leadArticle.keyPoints.slice(0, 2).map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent font-mono mt-0.5">0{i + 1}</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
                    <span className="text-accent font-medium">
                      {leadArticle.source}
                      {leadArticle.sourceHandle ? ` (${leadArticle.sourceHandle})` : ""}
                    </span>
                    {getSourceTierLabel(leadArticle.sourceTier) && (
                      <>
                        <span>·</span>
                        <span className="text-text-primary">
                          {getSourceTierLabel(leadArticle.sourceTier)}
                        </span>
                      </>
                    )}
                    <span>·</span>
                    <span className="tabular-nums">{formatRelativeDate(leadArticle.publishedAt)}</span>
                    {leadArticle.readingTimeMin && (
                      <>
                        <span>·</span>
                        <span>{leadArticle.readingTimeMin} min de leitura</span>
                      </>
                    )}
                    {leadArticle.translatedFromEn && (
                      <>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1 text-text-secondary">
                          <Globe className="w-3 h-3 text-accent" />
                          PT-BR
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.1] tracking-tight text-text-primary group-hover:text-accent transition-colors">
                    {leadArticle.title}
                  </h3>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {leadArticle.summary}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-5 text-xs font-semibold">
                    <span className="inline-flex items-center gap-1.5 text-accent">
                      <span>Ler análise completa</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <a
                      href={leadArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <span>Fonte original</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>

              {/* Tier 2: Breaking News Right Rail */}
              {breakingRailArticles.length > 0 && (
                <aside className="lg:col-span-5 lg:border-l lg:border-border lg:pl-8 space-y-1">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      {datePeriod === "hoje"
                        ? "Publicações de Hoje"
                        : searchQuery.trim().length >= 2
                          ? "Mais Relevantes da Pesquisa"
                          : "Últimas do Mundo Cannabis"}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted tabular-nums">
                      Tempo real
                    </span>
                  </div>

                  <div className="divide-y divide-border">
                    {breakingRailArticles.map((article) => {
                      const tierLabel = getSourceTierLabel(article.sourceTier);
                      return (
                        <article
                          key={`rail-${article.id}-${article.url}`}
                          onClick={() => setSelectedArticle(article)}
                          className="group py-4 flex items-start gap-4 cursor-pointer"
                        >
                          {article.image && imageStage[article.image] !== "failed" && (
                            <div className="w-20 h-16 rounded-lg overflow-hidden bg-surface border border-border shrink-0 mt-0.5">
                              <img
                                src={getImgSrc(article.image)}
                                alt={article.title}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                onError={() => handleImageError(article.image!)}
                                className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
                              <span className="uppercase tracking-[0.12em] text-accent truncate">
                                {tierLabel ||
                                  article.editorialKicker ||
                                  NEWS_TOPIC_MAP[article.category]?.shortLabel ||
                                  article.source}
                              </span>
                              <span className="tabular-nums shrink-0">
                                {formatRelativeDate(article.publishedAt)}
                              </span>
                            </div>
                            <h4 className="font-display text-base sm:text-lg font-medium leading-snug text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                            <p className="font-mono text-[11px] text-text-muted truncate">
                              {article.source}
                              {article.readingTimeMin ? ` · ${article.readingTimeMin} min` : ""}
                              {article.translatedFromEn ? " · PT-BR" : ""}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </aside>
              )}
            </div>

            {/* Tier 3: 2-Column Deep Journalistic Feed */}
            {gridFeedArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 border-t border-border pt-8">
                {gridFeedArticles.map((article) => {
                  const hasRealImg = Boolean(
                    article.image && imageStage[article.image] !== "failed"
                  );
                  const tierLabel = getSourceTierLabel(article.sourceTier);
                  return (
                    <article
                      key={`feed-${article.id}-${article.url}`}
                      onClick={() => setSelectedArticle(article)}
                      className="group py-6 border-b border-border flex flex-col justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {hasRealImg && article.image && (
                          <div className="w-full sm:w-40 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-surface border border-border shrink-0">
                            <img
                              src={getImgSrc(article.image)}
                              alt={article.title}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              onError={() => handleImageError(article.image!)}
                              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                            />
                          </div>
                        )}

                        <div className="space-y-2 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
                            <span className="uppercase tracking-[0.14em] text-accent inline-flex items-center gap-1.5">
                              {article.sourceTier === "cientifico" && (
                                <FlaskConical className="w-3 h-3" />
                              )}
                              <span>
                                {tierLabel ||
                                  article.editorialKicker ||
                                  NEWS_TOPIC_MAP[article.category]?.shortLabel ||
                                  article.category}
                              </span>
                            </span>
                            <span className="tabular-nums">
                              {article.source}
                              {article.translatedFromEn ? " (PT-BR)" : ""} ·{" "}
                              {formatRelativeDate(article.publishedAt)}
                            </span>
                          </div>

                          <h3 className="font-display text-lg sm:text-xl font-medium leading-snug text-text-primary group-hover:text-accent transition-colors">
                            {article.title}
                          </h3>

                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                            {article.summary}
                          </p>

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-text-muted pt-0.5">
                            {article.readingTimeMin && <span>{article.readingTimeMin} min</span>}
                            {article.tags && article.tags.length > 0 && (
                              <span>· {article.tags.slice(0, 3).join(" · ")}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-medium text-text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                          <span>Abrir leitura completa</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1"
                        >
                          <span>Fonte original</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + 8)}
                  className="px-6 py-3 rounded-full border border-border-strong bg-surface text-xs font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  Carregar mais notícias ({filteredArticles.length - visibleCount} restantes)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Deep Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selectedArticle.title}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-2xl max-h-[90dvh] rounded-2xl bg-surface border border-border-strong shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 p-6 border-b border-border bg-background/70">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    <span>
                      {getSourceTierLabel(selectedArticle.sourceTier) ||
                        NEWS_TOPIC_MAP[selectedArticle.category]?.label ||
                        selectedArticle.category}
                    </span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-secondary normal-case tracking-normal">
                      {selectedArticle.source}
                      {selectedArticle.sourceHandle ? ` (${selectedArticle.sourceHandle})` : ""} ·{" "}
                      {formatRelativeDate(selectedArticle.publishedAt)}
                      {selectedArticle.readingTimeMin
                        ? ` · ${selectedArticle.readingTimeMin} min`
                        : ""}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary leading-tight">
                    {selectedArticle.title}
                  </h3>
                  {selectedArticle.journalName && (
                    <p className="font-mono text-[11px] text-text-muted">
                      Periódico científico: {selectedArticle.journalName}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  aria-label="Fechar leitura"
                  className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-text-secondary hover:text-text-primary shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="p-6 overflow-y-auto overscroll-contain space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed"
              >
                {selectedArticle.image && imageStage[selectedArticle.image] !== "failed" && (
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-background border border-border">
                    <img
                      src={getImgSrc(selectedArticle.image)}
                      alt={selectedArticle.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(selectedArticle.image!)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {selectedArticle.keyPoints && selectedArticle.keyPoints.length > 0 && (
                  <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-2.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pontos-chave da matéria</span>
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-primary/90">
                      {selectedArticle.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="font-mono text-[11px] text-accent mt-0.5">
                            0{idx + 1}
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <p className="font-mono text-xs text-accent">
                    Temas relacionados: {selectedArticle.tags.join(" · ")}
                  </p>
                )}

                {loadingDeepArticle && (
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Carregando texto aprofundado direto da publicação original...</span>
                  </div>
                )}

                {selectedArticle.excerptParagraphs.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "text-text-primary/95 font-medium" : ""}>
                    {paragraph}
                  </p>
                ))}

                <div className="pt-2">
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-accent/50 bg-accent/10 text-accent text-xs font-semibold hover:bg-accent hover:text-accent-ink transition-colors"
                  >
                    <span>Ler matéria completa em {selectedArticle.source}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6 border-t border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-text-muted max-w-xs">
                  Conteúdo informativo. Quer saber se o tratamento com Cannabis Medicinal é indicado para você?
                </p>
                <a
                  href={BRAND.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors shrink-0"
                >
                  <span>{BRAND.ctaCompact}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

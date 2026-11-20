import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  Globe,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { BRAND } from "../data/mecuraContent";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  excerptParagraphs: string[];
  url: string;
  source: string;
  region: "brasil" | "mundo";
  category: "brasil" | "mundo" | "ciencia" | "juridico";
  publishedAt: string;
  image: string | null;
  language: "pt" | "en";
}

interface NewsApiResponse {
  updatedAt: string | null;
  nextUpdateInMinutes: number;
  total: number;
  articles: NewsArticle[];
}

type FilterKey = "todos" | "brasil" | "mundo" | "ciencia" | "juridico";

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "todos", label: "Todas" },
  { key: "brasil", label: "Brasil" },
  { key: "mundo", label: "Mundo" },
  { key: "ciencia", label: "Ciência & Saúde" },
  { key: "juridico", label: "Leis & ANVISA" },
];

const CATEGORY_LABELS: Record<NewsArticle["category"], string> = {
  brasil: "Brasil",
  mundo: "Mundo",
  ciencia: "Ciência",
  juridico: "Leis & ANVISA",
};

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "Recente";

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 10) return "Agora";
  if (diffMin < 60) return `Há ${diffMin} min`;
  if (diffHours < 24) return `Há ${diffHours}h`;
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `Há ${diffDays} dias`;

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

export function NewsBlogSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(7);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const markImageFailed = useCallback((id: string) => {
    setFailedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const loadNews = useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const url = forceRefresh ? "/api/news?refresh=1" : "/api/news";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: NewsApiResponse = await response.json();
      setArticles(Array.isArray(data.articles) ? data.articles : []);
      setUpdatedAt(data.updatedAt ?? new Date().toISOString());
    } catch {
      setError("Não foi possível carregar as notícias agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNews(false);
    const interval = window.setInterval(() => {
      loadNews(false);
    }, 20 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [loadNews]);

  useEffect(() => {
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
  }, [selectedArticle]);

  const filteredArticles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return articles.filter((item) => {
      const matchesFilter =
        activeFilter === "todos"
          ? true
          : activeFilter === "brasil" || activeFilter === "mundo"
            ? item.category === activeFilter || item.region === activeFilter
            : item.category === activeFilter;

      if (!matchesFilter) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    });
  }, [articles, activeFilter, searchTerm]);

  // Always pick the newest article with a real original news photo (preferring Portuguese unless on Mundo)
  const leadArticle = useMemo(() => {
    const preferPt = activeFilter !== "mundo";
    const withRealPhotoPt = preferPt
      ? filteredArticles.find((a) => a.language === "pt" && a.image && !failedImages[a.id])
      : null;
    const withRealPhoto = filteredArticles.find((a) => a.image && !failedImages[a.id]);
    return withRealPhotoPt ?? withRealPhoto ?? filteredArticles[0] ?? null;
  }, [filteredArticles, failedImages, activeFilter]);

  const feedArticles = useMemo(() => {
    if (!leadArticle) return [];
    return filteredArticles
      .filter((a) => a.id !== leadArticle.id)
      .slice(0, visibleCount - 1);
  }, [filteredArticles, leadArticle, visibleCount]);

  const hasMore = filteredArticles.length > visibleCount;

  return (
    <section
      id="blog"
      className="py-24 lg:py-36 px-6 lg:px-12 bg-background border-t border-border"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Diário Mecura · Radar Brasil &amp; Mundo
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.06] tracking-tight text-text-primary">
              Notícias que atualizam{" "}
              <span className="italic text-accent">automaticamente</span>.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {updatedAt && (
              <span className="inline-flex items-center gap-2 font-mono text-xs text-text-muted tabular-nums">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Sincronizado às {formatSyncTime(updatedAt)}</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => loadNews(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong bg-surface text-xs font-medium text-text-primary hover:border-accent hover:text-accent transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-accent ${refreshing ? "animate-spin" : ""}`}
              />
              <span>{refreshing ? "Atualizando..." : "Atualizar agora"}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-border mb-12">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Categorias do blog">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveFilter(f.key);
                    setVisibleCount(7);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-accent text-accent-ink"
                      : "bg-surface text-text-secondary border border-border hover:border-border-strong hover:text-text-primary"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tema, estudo ou lei..."
              aria-label="Buscar notícias no blog"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface border border-border text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-10 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 aspect-[16/10] bg-surface rounded-2xl" />
              <div className="lg:col-span-6 space-y-4 py-2">
                <div className="h-3 w-36 bg-surface rounded" />
                <div className="h-10 w-full bg-surface rounded" />
                <div className="h-10 w-4/5 bg-surface rounded" />
                <div className="h-4 w-full bg-surface rounded" />
                <div className="h-4 w-3/4 bg-surface rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="h-44 bg-surface/60 rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && articles.length === 0 && (
          <div className="py-16 text-center space-y-4 border border-border rounded-2xl bg-surface/40">
            <p className="text-base text-text-primary">{error}</p>
            <button
              type="button"
              onClick={() => loadNews(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tentar novamente</span>
            </button>
          </div>
        )}

        {/* Empty Filter State */}
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="py-16 text-center space-y-3 border border-border rounded-2xl bg-surface/40">
            <p className="text-base text-text-primary font-medium">
              Nenhuma matéria encontrada para esse filtro.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("todos");
                setSearchTerm("");
              }}
              className="text-xs font-semibold text-accent hover:underline underline-offset-4 cursor-pointer"
            >
              Limpar filtros e ver todas as notícias
            </button>
          </div>
        )}

        {/* Editorial News Layout: Featured Lead (Real News Photo) + 2-Column Journalistic Feed */}
        {!loading && leadArticle && (
          <div className="space-y-14">
            {/* Lead Featured Article */}
            <article
              onClick={() => setSelectedArticle(leadArticle)}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-pointer"
            >
              {leadArticle.image && !failedImages[leadArticle.id] && (
                <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface border border-border">
                  <img
                    src={leadArticle.image}
                    alt={leadArticle.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => markImageFailed(leadArticle.id)}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.14em] px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-white/15 text-accent">
                    Destaque · {CATEGORY_LABELS[leadArticle.category]}
                  </span>
                </div>
              )}

              <div
                className={`${
                  leadArticle.image && !failedImages[leadArticle.id]
                    ? "lg:col-span-6"
                    : "lg:col-span-12 max-w-3xl"
                } space-y-5`}
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
                  <span className="text-accent font-medium">{leadArticle.source}</span>
                  <span>·</span>
                  <span>{formatRelativeDate(leadArticle.publishedAt)}</span>
                  {leadArticle.language === "en" && (
                    <>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Internacional (EN)
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.12] tracking-tight text-text-primary group-hover:text-accent transition-colors">
                  {leadArticle.title}
                </h3>

                <p className="text-base text-text-secondary leading-relaxed">
                  {leadArticle.summary}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    <span>Ler resumo editorial</span>
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

            {/* 2-Column Editorial Feed with Real Article Photos */}
            {feedArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 border-t border-border pt-8">
                {feedArticles.map((article) => {
                  const hasRealImg = Boolean(article.image && !failedImages[article.id]);
                  return (
                    <article
                      key={`${article.id}-${article.url}`}
                      onClick={() => setSelectedArticle(article)}
                      className="group py-6 border-b border-border flex flex-col justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        {hasRealImg && article.image && (
                          <div className="w-full sm:w-36 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-surface border border-border shrink-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              onError={() => markImageFailed(article.id)}
                              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                            />
                          </div>
                        )}

                        <div className="space-y-2.5 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
                            <span className="uppercase tracking-[0.14em] text-accent">
                              {CATEGORY_LABELS[article.category]}
                            </span>
                            <span className="tabular-nums">
                              {article.source} · {formatRelativeDate(article.publishedAt)}
                            </span>
                          </div>

                          <h3 className="font-display text-lg sm:text-xl font-medium leading-snug text-text-primary group-hover:text-accent transition-colors">
                            {article.title}
                          </h3>

                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-medium text-text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                          <span>Abrir leitura</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1"
                        >
                          <span>Matéria completa</span>
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
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="px-6 py-3 rounded-full border border-border-strong bg-surface text-xs font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  Carregar mais notícias ({filteredArticles.length - visibleCount} restantes)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Article Reader Preview Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
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
                    <span>{CATEGORY_LABELS[selectedArticle.category]}</span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-secondary normal-case tracking-normal">
                      {selectedArticle.source} · {formatRelativeDate(selectedArticle.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-text-primary leading-tight">
                    {selectedArticle.title}
                  </h3>
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
                {selectedArticle.image && !failedImages[selectedArticle.id] && (
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-background border border-border">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(selectedArticle.id)}
                      className="w-full h-full object-cover"
                    />
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

              {/* Contextual Patient Conversion Bar */}
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

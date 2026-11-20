import express from "express";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function makeArticleId(url) {
  return crypto.createHash("sha256").update(String(url)).digest("base64url").slice(0, 16);
}

/* --- Auto-Updating Medicinal Cannabis News Aggregator (Brasil & Mundo, Real Article Photos) --- */

const WP_NEWS_SOURCES = [
  {
    id: "cannabis-saude-br",
    source: "Cannabis & Saúde",
    region: "brasil",
    language: "pt",
    url: "https://www.cannabisesaude.com.br/wp-json/wp/v2/posts?per_page=10&_embed=wp:featuredmedia",
  },
  {
    id: "cannabis-monitor-br",
    source: "Cannabis Monitor",
    region: "brasil",
    language: "pt",
    url: "https://cannabismonitor.com.br/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "kaya-mind-br",
    source: "Kaya Mind",
    region: "brasil",
    language: "pt",
    url: "https://kayamind.com/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "smoke-buddies-br",
    source: "Smoke Buddies",
    region: "brasil",
    language: "pt",
    url: "https://smokebuddies.com.br/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "marijuana-moment-world",
    source: "Marijuana Moment",
    region: "mundo",
    language: "en",
    url: "https://www.marijuanamoment.net/wp-json/wp/v2/posts?per_page=10&_embed=wp:featuredmedia",
  },
  {
    id: "norml-world",
    source: "NORML",
    region: "mundo",
    language: "en",
    url: "https://norml.org/wp-json/wp/v2/posts?per_page=6&_embed=wp:featuredmedia",
  },
];

const RSS_FALLBACK_FEEDS = [
  {
    id: "google-news-br-legal",
    region: "brasil",
    language: "pt",
    defaultSource: "Google News Brasil",
    url: "https://news.google.com/rss/search?q=%22cannabis+medicinal%22+ANVISA+OR+STJ+OR+SUS+when:21d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
];

const CACHE_TTL_MS = 20 * 60 * 1000; // Auto-refresh every 20 minutes
const MANUAL_REFRESH_COOLDOWN_MS = 45 * 1000;

let newsCache = {
  articles: [],
  updatedAt: null,
  lastFetchMs: 0,
  fetchingPromise: null,
};

function decodeHtmlEntities(input = "") {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8216;|&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

function stripHtml(html = "") {
  return decodeHtmlEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = block.match(regex);
  return match ? match[1].trim() : "";
}

function classifyArticle(title, rawDescription, feedRegion) {
  const text = `${title} ${rawDescription}`.toLowerCase();

  if (
    /\b(anvisa|rdc|stj|stf|habeas corpus|salvo-conduto|lei|legislação|juiz|justiça|tribunal|jurídico|jurídica|sus|senado|câmara|regulamentação|legislation|law|lawmakers|court|bill|federal|legalization|regulation|congress)\b/.test(
      text
    )
  ) {
    return "juridico";
  }

  if (
    /\b(estudo|pesquisa|científico|científica|clínico|clínica|ensaio|universidade|receptor|endocanabinoide|fibromialgia|dor|mandíbula|ansiedade|insônia|sono|autismo|tdah|epilepsia|alzheimer|parkinson|saúde|médico|pacientes|terapia|canabidiol|clinical|study|research|patients|pain|medical|health|therapy|cbd|thc)\b/.test(
      text
    )
  ) {
    return "ciencia";
  }

  if (
    feedRegion === "mundo" ||
    /\b(europa|alemanha|estados unidos|eua|canadá|espanha|portugal|uruguai|argentina|reino unido|nepal|londres|colômbia|méxico|fda|who|oms|global|internacional|world|europe|germany|uk|texas|california)\b/.test(
      text
    )
  ) {
    return "mundo";
  }

  return "brasil";
}

function extractParagraphsFromHtml(html = "") {
  if (!html) return [];
  const matches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  const paragraphs = [];
  for (const m of matches) {
    const clean = stripHtml(m[1])
      .replace(/O post .*? apareceu primeiro em .*$/i, "")
      .trim();
    if (
      clean.length >= 55 &&
      !/apareceu primeiro em/i.test(clean) &&
      !/leia também/i.test(clean) &&
      !/subscribe to/i.test(clean)
    ) {
      paragraphs.push(clean);
    }
    if (paragraphs.length >= 3) break;
  }
  return paragraphs;
}

function extractWpImage(post) {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (media) {
    const sizes = media.media_details?.sizes;
    const candidate =
      sizes?.large?.source_url ||
      sizes?.medium_large?.source_url ||
      media.source_url ||
      null;
    if (typeof candidate === "string" && candidate.startsWith("http")) {
      return candidate;
    }
  }
  if (typeof post?.jetpack_featured_media_url === "string" && post.jetpack_featured_media_url.startsWith("http")) {
    return post.jetpack_featured_media_url;
  }
  const contentImg = post?.content?.rendered?.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i)?.[1];
  return contentImg || null;
}

async function fetchWpSource(meta) {
  const response = await fetch(meta.url, {
    signal: AbortSignal.timeout(6500),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; InstitutoMecuraNewsBot/1.0)",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`WP source ${meta.id} returned ${response.status}`);
  }
  const posts = await response.json();
  if (!Array.isArray(posts)) return [];

  const articles = [];
  for (const post of posts) {
    const title = stripHtml(post?.title?.rendered || "");
    const url = post?.link;
    if (!title || !url) continue;

    const excerptText = stripHtml(post?.excerpt?.rendered || "")
      .replace(/O post .*? apareceu primeiro em .*$/i, "")
      .replace(/\[\.\.\.\]|\[…\]/g, "…")
      .trim();
    const contentParagraphs = extractParagraphsFromHtml(post?.content?.rendered || "");
    let summary = excerptText || contentParagraphs[0] || "";
    if (summary.length > 235) {
      summary = `${summary.slice(0, 232).trim()}…`;
    }

    const image = extractWpImage(post);
    const publishedDate = post?.date_gmt
      ? new Date(`${post.date_gmt}Z`)
      : post?.date
        ? new Date(post.date)
        : new Date();
    const publishedAt = Number.isNaN(publishedDate.getTime())
      ? new Date().toISOString()
      : publishedDate.toISOString();

    const category = classifyArticle(title, summary, meta.region);

    articles.push({
      id: makeArticleId(url),
      title,
      summary,
      excerptParagraphs:
        contentParagraphs.length > 0 ? contentParagraphs : summary ? [summary] : [],
      url,
      source: meta.source,
      region: meta.region,
      category,
      publishedAt,
      image,
      language: meta.language,
    });
  }
  return articles;
}

async function fetchRssSource(meta) {
  const response = await fetch(meta.url, {
    signal: AbortSignal.timeout(5500),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; InstitutoMecuraNewsBot/1.0)",
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9",
    },
  });
  if (!response.ok) {
    throw new Error(`RSS source ${meta.id} returned ${response.status}`);
  }
  const xml = await response.text();
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  const items = [];

  for (const rawItem of itemMatches.slice(0, 8)) {
    const rawTitle = decodeHtmlEntities(extractTag(rawItem, "title"));
    const link = decodeHtmlEntities(extractTag(rawItem, "link"));
    const pubDateStr = extractTag(rawItem, "pubDate");
    const rawSource = stripHtml(extractTag(rawItem, "source"));
    if (!rawTitle || !link) continue;

    let title = rawTitle.trim();
    let source = rawSource || meta.defaultSource;
    if (!rawSource && title.includes(" - ")) {
      const lastDash = title.lastIndexOf(" - ");
      const maybeSource = title.slice(lastDash + 3).trim();
      if (maybeSource.length > 1 && maybeSource.length < 48) {
        source = maybeSource;
        title = title.slice(0, lastDash).trim();
      }
    } else if (rawSource && title.endsWith(` - ${rawSource}`)) {
      title = title.slice(0, -(rawSource.length + 3)).trim();
    }

    const publishedDate = pubDateStr ? new Date(pubDateStr) : new Date();
    const publishedAt = Number.isNaN(publishedDate.getTime())
      ? new Date().toISOString()
      : publishedDate.toISOString();

    const summary = `Notícia publicada originalmente por ${source} — clique para ler a cobertura completa na fonte jornalística.`;
    const category = classifyArticle(title, "", meta.region);

    items.push({
      id: makeArticleId(link),
      title,
      summary,
      excerptParagraphs: [summary],
      url: link,
      source,
      region: meta.region,
      category,
      publishedAt,
      image: null,
      language: meta.language,
    });
  }
  return items;
}

async function fetchAllNews() {
  const [wpResults, rssResults] = await Promise.all([
    Promise.allSettled(WP_NEWS_SOURCES.map((src) => fetchWpSource(src))),
    Promise.allSettled(RSS_FALLBACK_FEEDS.map((src) => fetchRssSource(src))),
  ]);

  const combined = [];
  for (const res of [...wpResults, ...rssResults]) {
    if (res.status === "fulfilled") {
      combined.push(...res.value);
    }
  }

  // Deduplicate by normalized title prefix, preferring articles with real images
  const byKey = new Map();
  for (const article of combined) {
    const key = article.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 44);
    if (!key) continue;

    const existing = byKey.get(key);
    if (!existing || (!existing.image && article.image)) {
      byKey.set(key, article);
    }
  }

  const deduped = Array.from(byKey.values());
  deduped.sort((a, b) => {
    const timeDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    return timeDiff;
  });

  const finalArticles = deduped.slice(0, 40);
  if (finalArticles.length > 0) {
    newsCache.articles = finalArticles;
    newsCache.updatedAt = new Date().toISOString();
    newsCache.lastFetchMs = Date.now();
  }
  return newsCache;
}

async function getNewsFeed(forceRefresh = false) {
  const now = Date.now();
  const isExpired = now - newsCache.lastFetchMs > CACHE_TTL_MS;
  const canManualRefresh = forceRefresh && now - newsCache.lastFetchMs > MANUAL_REFRESH_COOLDOWN_MS;

  if (newsCache.articles.length === 0 || isExpired || canManualRefresh) {
    if (!newsCache.fetchingPromise) {
      newsCache.fetchingPromise = fetchAllNews().finally(() => {
        newsCache.fetchingPromise = null;
      });
    }
    try {
      await newsCache.fetchingPromise;
    } catch (err) {
      console.error("[Mecura News] Failed refreshing feeds:", err);
    }
  }

  return newsCache;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Warm up cache in background and keep it automatically fresh every 20 minutes
  getNewsFeed(false).catch(() => {});
  setInterval(() => {
    getNewsFeed(false).catch(() => {});
  }, CACHE_TTL_MS);

  // Live Auto-Updating News API Route
  app.get("/api/news", async (req, res) => {
    try {
      const category = typeof req.query.category === "string" ? req.query.category : "todos";
      const forceRefresh = req.query.refresh === "1";

      const cache = await getNewsFeed(forceRefresh);
      let articles = cache.articles;

      if (category && category !== "todos") {
        if (category === "brasil" || category === "mundo") {
          articles = articles.filter(
            (a) => a.category === category || a.region === category
          );
        } else {
          articles = articles.filter((a) => a.category === category);
        }
      }

      const nextUpdateMs = Math.max(
        0,
        CACHE_TTL_MS - (Date.now() - cache.lastFetchMs)
      );

      res.setHeader("Cache-Control", "public, max-age=120");
      res.json({
        updatedAt: cache.updatedAt,
        nextUpdateInMinutes: Math.max(1, Math.ceil(nextUpdateMs / 60000)),
        total: articles.length,
        articles,
      });
    } catch (err) {
      console.error("[/api/news] Error:", err);
      res.status(500).json({
        error: "Não foi possível sincronizar o feed de notícias no momento.",
        articles: newsCache.articles,
        updatedAt: newsCache.updatedAt,
      });
    }
  });

  // Middleware do Vite para desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Em produção, servimos a pasta 'dist'
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

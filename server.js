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

/* --- Deep Auto-Updating Cannabis World News Aggregator, Translator & Strategic Headline Engine --- */

const WP_NEWS_SOURCES = [
  {
    id: "cannabis-monitor-br",
    source: "Cannabis Monitor",
    handle: "@cannabismonitor",
    siteUrl: "https://cannabismonitor.com.br",
    region: "brasil",
    language: "pt",
    baseUrl: "https://cannabismonitor.com.br/wp-json/wp/v2/posts",
    url: "https://cannabismonitor.com.br/wp-json/wp/v2/posts?per_page=10&orderby=date&order=desc&_embed=wp:featuredmedia",
    extraUrls: [
      "https://cannabismonitor.com.br/wp-json/wp/v2/cpt_1704?per_page=18&orderby=date&order=desc&_embed=wp:featuredmedia",
    ],
  },
  {
    id: "cannabis-saude-br",
    source: "Cannabis & Saúde",
    handle: "@cannabisesaude",
    siteUrl: "https://www.cannabisesaude.com.br",
    region: "brasil",
    language: "pt",
    baseUrl: "https://www.cannabisesaude.com.br/wp-json/wp/v2/posts",
    url: "https://www.cannabisesaude.com.br/wp-json/wp/v2/posts?per_page=16&_embed=wp:featuredmedia",
  },
  {
    id: "smoke-buddies-br",
    source: "Smoke Buddies",
    handle: "@smokebuddies",
    siteUrl: "https://smokebuddies.com.br",
    region: "brasil",
    language: "pt",
    baseUrl: "https://smokebuddies.com.br/wp-json/wp/v2/posts",
    url: "https://smokebuddies.com.br/wp-json/wp/v2/posts?per_page=14&_embed=wp:featuredmedia",
  },
  {
    id: "girls-in-green-br",
    source: "Girls in Green",
    handle: "@girlsingreen710",
    siteUrl: "https://girlsingreen.net",
    region: "brasil",
    language: "pt",
    baseUrl: "https://girlsingreen.net/wp-json/wp/v2/posts",
    url: "https://girlsingreen.net/wp-json/wp/v2/posts?per_page=10&_embed=wp:featuredmedia",
  },
  {
    id: "kaya-mind-br",
    source: "Kaya Mind",
    handle: "@kayamind",
    siteUrl: "https://kayamind.com",
    region: "brasil",
    language: "pt",
    baseUrl: "https://kayamind.com/wp-json/wp/v2/posts",
    url: "https://kayamind.com/wp-json/wp/v2/posts?per_page=10&_embed=wp:featuredmedia",
  },
  {
    id: "cannareporter-pt",
    source: "CannaReporter",
    handle: "@cannareporter",
    siteUrl: "https://www.cannareporter.eu",
    region: "mundo",
    language: "pt",
    baseUrl: "https://www.cannareporter.eu/wp-json/wp/v2/posts",
    url: "https://www.cannareporter.eu/wp-json/wp/v2/posts?per_page=10&_embed=wp:featuredmedia",
  },
  {
    id: "apepi-br",
    source: "APEPI",
    handle: "@apepioficial",
    siteUrl: "https://apepi.org",
    region: "brasil",
    language: "pt",
    hintTopic: "associacoes",
    baseUrl: "https://apepi.org/wp-json/wp/v2/posts",
    url: "https://apepi.org/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "abrace-br",
    source: "Abrace Esperança",
    handle: "@abraceesperanca",
    siteUrl: "https://abraceesperanca.org.br",
    region: "brasil",
    language: "pt",
    hintTopic: "associacoes",
    baseUrl: "https://abraceesperanca.org.br/wp-json/wp/v2/posts",
    url: "https://abraceesperanca.org.br/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "santa-cannabis-br",
    source: "Santa Cannabis",
    handle: "@santacannabis",
    siteUrl: "https://santacannabis.com.br",
    region: "brasil",
    language: "pt",
    hintTopic: "associacoes",
    baseUrl: "https://santacannabis.com.br/wp-json/wp/v2/posts",
    url: "https://santacannabis.com.br/wp-json/wp/v2/posts?per_page=6&_embed=wp:featuredmedia",
  },
  {
    id: "abicann-br",
    source: "ABICANN",
    handle: "@abicannoficial",
    siteUrl: "https://abicann.org",
    region: "brasil",
    language: "pt",
    hintTopic: "mercado",
    baseUrl: "https://abicann.org/wp-json/wp/v2/posts",
    url: "https://abicann.org/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "wecann-academy-br",
    source: "WeCann Academy",
    handle: "@wecannacademy",
    siteUrl: "https://wecann.academy",
    region: "brasil",
    language: "pt",
    hintTopic: "ciencia",
    baseUrl: "https://wecann.academy/wp-json/wp/v2/posts",
    url: "https://wecann.academy/wp-json/wp/v2/posts?per_page=6&_embed=wp:featuredmedia",
  },
  {
    id: "marijuana-moment-world",
    source: "Marijuana Moment",
    handle: "@marijuanamoment",
    siteUrl: "https://www.marijuanamoment.net",
    region: "mundo",
    language: "en",
    baseUrl: "https://www.marijuanamoment.net/wp-json/wp/v2/posts",
    url: "https://www.marijuanamoment.net/wp-json/wp/v2/posts?per_page=10&_embed=wp:featuredmedia",
  },
  {
    id: "high-times-world",
    source: "High Times",
    handle: "@hightimesmagazine",
    siteUrl: "https://hightimes.com",
    region: "mundo",
    language: "en",
    baseUrl: "https://hightimes.com/wp-json/wp/v2/posts",
    url: "https://hightimes.com/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "project-cbd-world",
    source: "Project CBD",
    handle: "@projectcbd",
    siteUrl: "https://projectcbd.org",
    region: "mundo",
    language: "en",
    hintTopic: "ciencia",
    baseUrl: "https://projectcbd.org/wp-json/wp/v2/posts",
    url: "https://projectcbd.org/wp-json/wp/v2/posts?per_page=8&_embed=wp:featuredmedia",
  },
  {
    id: "ganjapreneur-world",
    source: "Ganjapreneur",
    handle: "@ganjapreneur",
    siteUrl: "https://www.ganjapreneur.com",
    region: "mundo",
    language: "en",
    hintTopic: "mercado",
    baseUrl: "https://www.ganjapreneur.com/wp-json/wp/v2/posts",
    url: "https://www.ganjapreneur.com/wp-json/wp/v2/posts?per_page=6&_embed=wp:featuredmedia",
  },
  {
    id: "hemp-industry-daily-world",
    source: "Hemp Industry Daily",
    siteUrl: "https://hempindustrydaily.com",
    region: "mundo",
    language: "en",
    hintTopic: "cultivo",
    baseUrl: "https://hempindustrydaily.com/wp-json/wp/v2/posts",
    url: "https://hempindustrydaily.com/wp-json/wp/v2/posts?per_page=6&_embed=wp:featuredmedia",
  },
  {
    id: "norml-world",
    source: "NORML",
    handle: "@norml",
    siteUrl: "https://norml.org",
    region: "mundo",
    language: "en",
    baseUrl: "https://norml.org/wp-json/wp/v2/posts",
    url: "https://norml.org/wp-json/wp/v2/posts?per_page=6&orderby=date&order=desc&_embed=wp:featuredmedia",
    extraUrls: [
      "https://norml.org/wp-json/wp/v2/news?per_page=8&orderby=date&order=desc&_embed=wp:featuredmedia",
    ],
  },
];

// Direct Portal RSS Feeds + Today 24h + Grande Imprensa BR + Thematic Real-Time Radars
const THEMATIC_RSS_FEEDS = [
  {
    id: "gnews-hoje-br",
    region: "brasil",
    language: "pt",
    defaultSource: "Hoje · Brasil",
    hintTopic: "brasil",
    url: "https://news.google.com/rss/search?q=(canabidiol+OR+%22cannabis+medicinal%22+OR+%22maconha+medicinal%22+OR+c%C3%A2nhamo)+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-hoje-mundo",
    region: "mundo",
    language: "en",
    defaultSource: "Hoje · Global",
    hintTopic: "mundo",
    url: "https://news.google.com/rss/search?q=(%22medical+cannabis%22+OR+%22cannabidiol%22+OR+%22CBD+clinical%22)+when:1d&hl=en-US&gl=US&ceid=US:en",
  },
  {
    id: "gnews-grande-imprensa-br",
    region: "brasil",
    language: "pt",
    sourceTier: "imprensa",
    defaultSource: "Grande Imprensa BR",
    hintTopic: "brasil",
    url: "https://news.google.com/rss/search?q=(canabidiol+OR+%22cannabis+medicinal%22+OR+c%C3%A2nhamo+OR+(%22habeas+corpus%22+cannabis))+when:14d+(site:g1.globo.com+OR+site:folha.uol.com.br+OR+site:cnnbrasil.com.br+OR+site:bbc.com+OR+site:uol.com.br+OR+site:estadao.com.br+OR+site:agenciabrasil.ebc.com.br+OR+site:metropoles.com+OR+site:veja.abril.com.br)&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "sechat-br",
    type: "sechat-sitemap",
    isDirectPortal: true,
    sourceName: "Sechat",
    handle: "@sechat_oficial",
    siteUrl: "https://sechat.com.br",
    region: "brasil",
    language: "pt",
    defaultSource: "Sechat",
    hintTopic: "brasil",
    url: "https://sechat.com.br/sitemap-news.xml",
  },
  {
    id: "cannabis-health-news-world",
    isDirectPortal: true,
    sourceName: "Cannabis Health News",
    handle: "@cannabishealthnews",
    siteUrl: "https://cannabishealthnews.co.uk",
    region: "mundo",
    language: "en",
    defaultSource: "Cannabis Health News",
    hintTopic: "saude",
    url: "https://cannabishealthnews.co.uk/feed/",
  },
  {
    id: "business-of-cannabis-world",
    isDirectPortal: true,
    sourceName: "Business of Cannabis",
    handle: "@businessofcannabis",
    siteUrl: "https://businessofcannabis.com",
    region: "mundo",
    language: "en",
    defaultSource: "Business of Cannabis",
    hintTopic: "mercado",
    url: "https://businessofcannabis.com/feed/",
  },
  {
    id: "mjbizdaily-world",
    isDirectPortal: true,
    sourceName: "MJBizDaily",
    handle: "@mjbizdaily",
    siteUrl: "https://mjbizdaily.com",
    region: "mundo",
    language: "en",
    defaultSource: "MJBizDaily",
    hintTopic: "mercado",
    url: "https://mjbizdaily.com/feed/",
  },
  {
    id: "gnews-anvisa-leis",
    region: "brasil",
    language: "pt",
    defaultSource: "Radar ANVISA",
    hintTopic: "anvisa",
    url: "https://news.google.com/rss/search?q=%22cannabis+medicinal%22+(ANVISA+OR+RDC+OR+regulamenta%C3%A7%C3%A3o+OR+Congresso)+when:30d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-hc-justica",
    region: "brasil",
    language: "pt",
    defaultSource: "Radar Jurídico",
    hintTopic: "justica",
    url: "https://news.google.com/rss/search?q=(%22habeas+corpus%22+OR+%22salvo-conduto%22+OR+STJ+OR+STF)+(cannabis+OR+maconha+medicinal)+when:45d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-ciencia-saude",
    region: "brasil",
    language: "pt",
    defaultSource: "Radar Científico",
    hintTopic: "ciencia",
    url: "https://news.google.com/rss/search?q=(canabidiol+OR+%22cannabis+medicinal%22)+(estudo+OR+pesquisa+OR+autismo+OR+ansiedade+OR+dor+cr%C3%B4nica+OR+epilepsia)+when:30d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-cultivo-canhamo",
    region: "brasil",
    language: "pt",
    defaultSource: "Radar Cultivo",
    hintTopic: "cultivo",
    url: "https://news.google.com/rss/search?q=(cultivo+cannabis+OR+c%C3%A2nhamo+industrial+OR+hemp+Brasil)+when:45d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-mercado-negocios",
    region: "brasil",
    language: "pt",
    defaultSource: "Radar Mercado",
    hintTopic: "mercado",
    url: "https://news.google.com/rss/search?q=(mercado+cannabis+medicinal+OR+farm%C3%A1cia+canabidiol+OR+ind%C3%BAstria+cannabis+Brasil)+when:45d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-associacoes-sus",
    region: "brasil",
    language: "pt",
    defaultSource: "Radar Associações & SUS",
    hintTopic: "associacoes",
    url: "https://news.google.com/rss/search?q=(associa%C3%A7%C3%A3o+cannabis+medicinal+OR+SUS+canabidiol+OR+fornecimento+gratuito+canabidiol)+when:45d&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  },
  {
    id: "gnews-mundo-global",
    region: "mundo",
    language: "en",
    defaultSource: "Global Cannabis Wire",
    hintTopic: "mundo",
    url: "https://news.google.com/rss/search?q=(%22medical+cannabis%22+OR+%22CBD+clinical+trial%22+OR+%22cannabis+legalization%22)+when:21d&hl=en-US&gl=US&ceid=US:en",
  },
];

// Real-time continuous monitoring interval: checks all portals every 2 minutes
const LIVE_POLL_INTERVAL_MS = 2 * 60 * 1000;
const CACHE_TTL_MS = LIVE_POLL_INTERVAL_MS;
const MANUAL_REFRESH_COOLDOWN_MS = 15 * 1000;
const SEARCH_CACHE_TTL_MS = 10 * 60 * 1000;

let newsCache = {
  articles: [],
  sourcesMeta: [],
  updatedAt: null,
  lastFetchMs: 0,
  fetchingPromise: null,
};

const sseClients = new Set();

function broadcastNewsEvent(eventName, payload) {
  if (sseClients.size === 0) return;
  const dataStr = `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(dataStr);
    } catch {
      sseClients.delete(res);
    }
  }
}

const deepSearchCache = new Map();
const translationCache = new Map();

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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

/* --- Automatic EN -> PT-BR Translation Engine (Cached & Batched) --- */

function looksLikeEnglish(text = "") {
  if (!text) return false;
  const sample = ` ${text.toLowerCase()} `;
  const enMarkers = [
    " the ",
    " with ",
    " says ",
    " over ",
    " should ",
    " study ",
    " lawmakers ",
    " patients ",
    " medical marijuana ",
    " legalization ",
    " federal ",
    " cannabis companies ",
    " research ",
    " senate ",
    " bill ",
    " voters ",
    " state ",
    " after ",
    " could ",
    " would ",
    " from ",
  ];
  let hits = 0;
  for (const m of enMarkers) {
    if (sample.includes(m)) hits += 1;
  }
  const hasPtAccents = /[ãõçáéíóúâêôà]/i.test(text);
  return hits >= 2 || (!hasPtAccents && hits >= 1 && /\b(marijuana|hemp|rescheduling|congressman|governor|fda|dea|court|legalize)\b/i.test(text));
}

async function translateSingleChunkEnToPt(text) {
  const clean = String(text || "").trim();
  if (!clean) return clean;
  const cached = translationCache.get(clean);
  if (cached) return cached;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(clean)}`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(4500),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; InstitutoMecuraNewsBot/2.0)",
      },
    });
    if (!response.ok) return clean;
    const data = await response.json();
    const translated = Array.isArray(data?.[0])
      ? data[0].map((part) => (Array.isArray(part) ? part[0] : "")).join("").trim()
      : clean;

    if (translated) {
      translationCache.set(clean, translated);
      if (translationCache.size > 1200) {
        const firstKey = translationCache.keys().next().value;
        if (firstKey) translationCache.delete(firstKey);
      }
      return translated;
    }
    return clean;
  } catch {
    return clean;
  }
}

async function translateBatchEnToPt(texts) {
  if (!Array.isArray(texts) || texts.length === 0) return [];
  const results = new Array(texts.length);
  const pendingIndices = [];

  for (let i = 0; i < texts.length; i += 1) {
    const t = String(texts[i] || "").trim();
    if (!t) {
      results[i] = "";
    } else if (translationCache.has(t)) {
      results[i] = translationCache.get(t);
    } else {
      pendingIndices.push(i);
    }
  }

  if (pendingIndices.length === 0) return results;

  // Group pending strings into batches <= 1400 chars separated by a unique token
  const SEP = "\n§§§\n";
  const batches = [];
  let currentBatch = [];
  let currentLen = 0;

  for (const idx of pendingIndices) {
    const txt = String(texts[idx]).trim();
    if (currentBatch.length > 0 && (currentLen + txt.length > 1350 || currentBatch.length >= 8)) {
      batches.push(currentBatch);
      currentBatch = [];
      currentLen = 0;
    }
    currentBatch.push({ idx, txt });
    currentLen += txt.length + SEP.length;
  }
  if (currentBatch.length > 0) batches.push(currentBatch);

  await Promise.all(
    batches.map(async (batch) => {
      const joined = batch.map((b) => b.txt).join(SEP);
      const translatedJoined = await translateSingleChunkEnToPt(joined);
      const parts = translatedJoined.split(/\s*§§§\s*/);

      if (parts.length === batch.length) {
        for (let k = 0; k < batch.length; k += 1) {
          const out = parts[k].trim() || batch[k].txt;
          translationCache.set(batch[k].txt, out);
          results[batch[k].idx] = out;
        }
      } else {
        // Fallback per item if separator split drifted
        await Promise.all(
          batch.map(async (item) => {
            const out = await translateSingleChunkEnToPt(item.txt);
            results[item.idx] = out;
          })
        );
      }
    })
  );

  return results;
}

/* --- Strategic Journalistic Headline & Engagement Engine --- */

function cleanRawHeadline(title = "") {
  return String(title)
    .replace(/\s*\(Newsletter:[^)]+\)\s*/gi, "")
    .replace(/\s*\(Boletim:[^)]+\)\s*/gi, "")
    .replace(/\s*\(Op-Ed\)\s*/gi, "")
    .replace(/^Newsletter:\s*/i, "")
    .replace(/\s+\|\s+[^|]{2,36}$/i, "")
    .replace(/\s+–\s+(Cannabis & Saúde|Sechat|Kaya Mind|Smoke Buddies|Marijuana Moment|NORML)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function polishPtTerminology(text = "") {
  return String(text)
    .replace(/\bmaconha medicinal\b/gi, "cannabis medicinal")
    .replace(/\bMaconha medicinal\b/g, "Cannabis medicinal")
    .replace(/\bmaconha\b/g, "cannabis")
    .replace(/\bMaconha\b/g, "Cannabis")
    .replace(/\bresschedulamento\b/gi, "reclassificação")
    .replace(/\breescalonamento\b/gi, "reclassificação")
    .replace(/\bDEA\b/g, "DEA (EUA)")
    .replace(/\bDEA \(EUA\) \(EUA\)/g, "DEA (EUA)")
    .replace(/\s+/g, " ")
    .trim();
}

function deriveEditorialKicker(article) {
  const norm = normalizeText(`${article.title} ${article.summary}`);

  if (/\b(habeas corpus|salvo-conduto|salvo conduto|stj|stf|liminar|tribunal|juiz|justica)\b/.test(norm)) {
    return "Decisão & Direito";
  }
  if (/\b(anvisa|rdc\s*660|rdc\s*327|regulamentacao|importacao|autorizacao)\b/.test(norm)) {
    return "Radar ANVISA";
  }
  if (/\b(sus|gratuito|fornecimento|associacao|associacoes)\b/.test(norm)) {
    return "Acesso & Pacientes";
  }
  if (/\b(estudo|pesquisa|ensaio clinico|universidade|evidencia|cientistas|descobrem|revela)\b/.test(norm)) {
    return "Avanço Científico";
  }
  if (/\b(autismo|ansiedade|insonia|sono|dor cronica|fibromialgia|epilepsia|alzheimer|parkinson|tdah|depressao|enxaqueca)\b/.test(norm)) {
    return "Saúde na Prática";
  }
  if (/\b(cultivo|canhamo|hemp|semente|genetica|agronom|extracao)\b/.test(norm)) {
    return "Cultivo & Genética";
  }
  if (/\b(mercado|bilhoes|milhoes|investimento|farmacia|industria|negocios|vendas|empresas)\b/.test(norm)) {
    return "Mercado & Negócios";
  }
  if (/\b(cbd|thc|cbg|cbn|terpeno|canabidiol|full spectrum|dosagem)\b/.test(norm)) {
    return "Guia Canabinoide";
  }
  if (article.region === "mundo") {
    return "Impacto Global";
  }
  return "Destaque Brasil";
}

function craftStrategicHeadline(cleanTitle, kicker, category, region) {
  let headline = polishPtTerminology(cleanTitle);
  if (!headline) return headline;

  // Capitalize first letter cleanly
  headline = headline.charAt(0).toUpperCase() + headline.slice(1);

  // If the headline already has a strong journalistic colon structure, question, or high-impact opening, keep it sharp & punchy
  const alreadyStrategic =
    headline.includes(":") ||
    headline.includes("?") ||
    /^(como|por que|entenda|saiba|descubra|veja|o que|novo estudo|estudo revela|justiça|anvisa|stj|stf|alerta|urgente|exclusivo|guia|brasil|pacientes|médicos|ciência|pesquisa|lei|revisão|avanço)/i.test(
      headline
    );

  if (alreadyStrategic || headline.length > 92) {
    return headline;
  }

  // Add a concise, magnetic InfoMoney-style lead-in prefix that hooks curiosity and highlights real-world impact
  const isProperOrCamel =
    /^[A-Z]{2,}\b/.test(headline) ||
    /^[A-Z][a-z]+[A-Z]/.test(headline) ||
    /^(Brasil|ANVISA|Anvisa|STJ|STF|SUS|CBD|THC|CBG|CBN|EUA|DEA|FDA|OMS|ONU|USP|Fiocruz|Europa|Alemanha|Canadá|Uruguai|Espanha|Portugal|Texas|Pensilvânia|Califórnia|Nova York|São Paulo|Rio|Bahia|Minas|Paraná|Sergipe|Goiás)\b/.test(
      headline
    );

  const lowerFirst =
    /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]/.test(headline) && !isProperOrCamel
      ? headline.charAt(0).toLowerCase() + headline.slice(1)
      : headline;

  const hookByCategory = {
    anvisa: "O que muda na regulação: ",
    justica: "Na Justiça: ",
    ciencia: "O que diz a ciência: ",
    saude: "Saúde em foco: ",
    cultivo: "Cultivo & ciência: ",
    mercado: "Movimento no setor: ",
    associacoes: "Acesso ao tratamento: ",
    canabinoides: "Na prática clínica: ",
    mundo: "Cenário global: ",
    brasil: "Em destaque no Brasil: ",
  };

  const prefix = hookByCategory[category] || (region === "mundo" ? "Cenário global: " : "Entenda: ");

  // Avoid echoing the same word between prefix and headline
  const prefixWord = normalizeText(prefix).split(/\s+/)[0];
  if (normalizeText(headline).startsWith(prefixWord)) {
    return headline;
  }

  return `${prefix}${lowerFirst}`;
}

function computeEditorialEngagementScore(article) {
  const norm = normalizeText(`${article.title} ${article.summary}`);
  let score = 50;

  // Strongly prioritize Brazilian & patient-actionable themes on the main Cover ("Início")
  if (article.region === "brasil") score += 22;
  if (article.image) score += 16;

  // High-retention topics for Brazilian patients, physicians & cannabis readers
  if (/\b(anvisa|rdc\s*660|rdc\s*327|habeas corpus|salvo-conduto|stj|stf|sus)\b/.test(norm)) {
    score += 18;
  }
  if (/\b(autismo|ansiedade|insonia|sono|dor cronica|fibromialgia|epilepsia|alzheimer|parkinson|tdah|depressao|enxaqueca)\b/.test(norm)) {
    score += 17;
  }
  if (/\b(estudo|pesquisa|ensaio clinico|descoberta|revela|comprova|eficacia|beneficios)\b/.test(norm)) {
    score += 14;
  }
  if (/\b(cbd|thc|canabidiol|terpenos|cultivo|canhamo|mercado|farmacia|associacao)\b/.test(norm)) {
    score += 10;
  }

  // Demote US local partisan election chatter / daily newsletter roundups on the main Cover
  if (/\b(gop|republican|republicanos|democrat|democratas|congressman|eleicao|eleicoes|pensilvania|texas|indiana|newsletter|boletim|eleitores)\b/.test(norm)) {
    score -= 28;
  }

  // Freshness boost (last 72h favored, smooth decay)
  const ageHours = Math.max(0, (Date.now() - new Date(article.publishedAt).getTime()) / 3600000);
  score += Math.max(0, 18 - ageHours * 0.25);

  return Math.round(score * 10) / 10;
}

/* --- Multi-Topic Semantic Classifier & Tag Extractor --- */

const TOPIC_PATTERNS = [
  {
    key: "anvisa",
    regex:
      /\b(anvisa|rdc\s*660|rdc\s*327|rdc|regulamentacao|regulatorio|importacao|autorizacao sanitaria|ministerio da saude|senado|camara|projeto de lei|pl\s*399|legislacao|fda|dea|schedule\s*iii|reclassificacao|lawmakers|legislation|regulation|bill)\b/,
  },
  {
    key: "justica",
    regex:
      /\b(habeas corpus|salvo-conduto|salvo conduto|stj|stf|justica|tribunal|juiz|juiza|desembargador|liminar|plano de saude|judicial|processo|processam|direito canabico|advogado|oab|court|supreme court|ruling|legalization|legalizar|descriminaliz)\b/,
  },
  {
    key: "ciencia",
    regex:
      /\b(estudo|pesquisa|cientifico|cientifica|ensaio clinico|universidade|pubmed|nature|jama|lancet|evidencia|revisao sistematica|meta-analise|sistema endocanabinoide|receptor cb1|receptor cb2|neurociencia|study|research|clinical trial|university|scientist|findings)\b/,
  },
  {
    key: "saude",
    regex:
      /\b(autismo|tea|ansiedade|depressao|insonia|sono|dor cronica|fibromialgia|epilepsia|alzheimer|parkinson|tdah|enxaqueca|endometriose|cancer|oncologia|esclerose|artrite|estresse|saude mental|paciente|pacientes|tratamento|medico|medica|terapia|prescricao|pain|anxiety|sleep|epilepsy|patients|medical|health)\b/,
  },
  {
    key: "cultivo",
    regex:
      /\b(cultivo|plantio|semente|sementes|genetica|canhamo|hemp|agronomo|agronomico|solo|colheita|flor|flores|extracao|extrato|indoor|outdoor|cepa|strain|cultivation|grow|agriculture|farming|seeds)\b/,
  },
  {
    key: "mercado",
    regex:
      /\b(mercado|negocios|investimento|industria|farmacia|farmacias|faturamento|bilhoes|milhoes|exportacao|empresa|empresas|startup|setor|economia|acoes|bolsa|imposto|vendas|market|business|industry|sales|revenue|dispensary|economy|investment)\b/,
  },
  {
    key: "associacoes",
    regex:
      /\b(associacao|associacoes|sus|gratuito|fornecimento|acolhimento|coletivo|ong|comunidade|paciente associado|abrace|soucannabis|cultive|apepe|santa cannabis|prefeitura|estado fornece)\b/,
  },
  {
    key: "canabinoides",
    regex:
      /\b(cbd|thc|cbg|cbn|cbc|thca|cbda|canabidiol|tetrahidrocanabinol|fitocanabinoide|canabinoide|terpeno|terpenos|mirceno|limoneno|linalol|cariofileno|full spectrum|broad spectrum|isolado|oleo|goma|dosagem|efeito comitiva|entourage|cannabidiol|cannabinoid|terpene)\b/,
  },
];

const TAG_RULES = [
  ["ANVISA", /\banvisa\b/],
  ["RDC 660", /\brdc\s*660\b/],
  ["RDC 327", /\brdc\s*327\b/],
  ["Habeas Corpus", /\b(habeas corpus|salvo-conduto|salvo conduto)\b/],
  ["STJ / STF", /\b(stj|stf)\b/],
  ["SUS", /\bsus\b/],
  ["Associações", /\bassociac(ao|oes)\b/],
  ["CBD", /\b(cbd|canabidiol)\b/],
  ["THC", /\b(thc|tetrahidrocanabinol)\b/],
  ["CBG / CBN", /\b(cbg|cbn)\b/],
  ["Terpenos", /\b(terpeno|terpenos|mirceno|limoneno|linalol|cariofileno)\b/],
  ["Autismo", /\b(autismo|tea)\b/],
  ["Ansiedade & Sono", /\b(ansiedade|insonia|sono|anxiety|sleep)\b/],
  ["Dor Crônica", /\b(dor cronica|fibromialgia|enxaqueca|chronic pain|pain)\b/],
  ["Epilepsia", /\b(epilepsia|epilepsy|convuls)\b/],
  ["Neurologia", /\b(alzheimer|parkinson|esclerose|tdah|neuro)\b/],
  ["Cultivo & Cânhamo", /\b(cultivo|canhamo|hemp|sementes|agronom)\b/],
  ["Mercado", /\b(mercado|farmacia|investimento|industria|market|business|empresas)\b/],
  ["Estudo Clínico", /\b(estudo|pesquisa|ensaio clinico|study|research|clinical)\b/],
];

function classifyArticleMulti(title, summary, bodyText, feedRegion, hintTopic) {
  const normTitle = normalizeText(title);
  const norm = normalizeText(`${title} ${summary} ${bodyText}`);
  const topicsSet = new Set(["inicio", "ultimas"]);

  if (feedRegion === "mundo") {
    topicsSet.add("mundo");
  } else {
    topicsSet.add("brasil");
  }

  if (
    /\b(europa|alemanha|estados unidos|eua|canada|espanha|portugal|uruguai|argentina|reino unido|colombia|mexico|fda|dea|oms|who|global|internacional|europe|germany|uk|usa|california|colorado|israel|australia|thailand|texas|pensilvania)\b/.test(
      norm
    )
  ) {
    topicsSet.add("mundo");
  }

  if (
    /\b(brasil|brasileiro|brasileira|anvisa|stj|stf|sus|sao paulo|rio de janeiro|brasilia|minas gerais|bahia|parana|camara|senado)\b/.test(
      norm
    )
  ) {
    topicsSet.add("brasil");
  }

  if (hintTopic && hintTopic !== "inicio" && hintTopic !== "ultimas") {
    topicsSet.add(hintTopic);
  }

  let primaryCategory = null;
  // Prioritize matches in the headline first so the primary editorial desk is laser-accurate
  for (const rule of TOPIC_PATTERNS) {
    if (rule.regex.test(normTitle)) {
      topicsSet.add(rule.key);
      if (!primaryCategory) {
        primaryCategory = rule.key;
      }
    }
  }
  for (const rule of TOPIC_PATTERNS) {
    if (rule.regex.test(norm)) {
      topicsSet.add(rule.key);
      if (!primaryCategory) {
        primaryCategory = rule.key;
      }
    }
  }

  if (!primaryCategory) {
    primaryCategory =
      hintTopic && hintTopic !== "inicio" && hintTopic !== "ultimas"
        ? hintTopic
        : feedRegion === "mundo"
          ? "mundo"
          : "brasil";
  }

  const tags = [];
  for (const [label, regex] of TAG_RULES) {
    if (regex.test(norm)) {
      tags.push(label);
      if (tags.length >= 4) break;
    }
  }

  return {
    category: primaryCategory,
    topics: Array.from(topicsSet),
    tags,
  };
}

const MAJOR_PRESS_REGEX =
  /\b(g1|folha|uol|cnn|bbc|estadao|estadão|agencia brasil|agência brasil|valor economico|valor econômico|o globo|veja|metropoles|metrópoles|band|sbt|r7|terra|ig|exame|forbes|reuters|bloomberg|ap news|the guardian|new york times|conjur|consultor juridico|consultor jurídico|jota|migalhas)\b/i;

const SCIENTIFIC_SOURCE_REGEX =
  /\b(pubmed|wecann|project cbd|nature|lancet|jama|fiocruz|usp|unicamp|unifesp|nih|frontiers|journal)\b/i;

function classifySourceTier(source = "", explicitTier = null) {
  if (explicitTier) return explicitTier;
  if (SCIENTIFIC_SOURCE_REGEX.test(source)) return "cientifico";
  if (MAJOR_PRESS_REGEX.test(source)) return "imprensa";
  return "especializado";
}

function isOffTopicCrimeBlotter(title = "", desc = "") {
  const norm = normalizeText(`${title} ${desc}`);
  if (/\b(medicinal|canabidiol|cbd|anvisa|habeas corpus|salvo-conduto|paciente|estudo|pesquisa|associacao)\b/.test(norm)) {
    return false;
  }
  return /\b(preso com|presa com|presos com|apreensao de|apreende|flagrante de trafico|trafico de drogas|policia civil prende|policia militar prende|prf apreende|kg de maconha|toneladas de maconha|boca de fumo)\b/.test(
    norm
  );
}

function computeReadingTimeMin(paragraphs = [], summary = "") {
  const fullText = [summary, ...(paragraphs || [])].join(" ").trim();
  const words = fullText ? fullText.split(/\s+/).length : 0;
  return Math.max(1, Math.min(12, Math.ceil(words / 180) + 1));
}

function extractKeyPoints(paragraphs = [], summary = "") {
  const pool = [...(paragraphs || []), summary].filter(Boolean);
  const points = [];
  const seen = new Set();

  for (const block of pool) {
    const sentences = block
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 48 && s.length <= 210);

    for (const sentence of sentences) {
      if (/clique para ler|cobertura publicada por|apareceu primeiro em/i.test(sentence)) continue;
      const key = normalizeText(sentence).slice(0, 40);
      if (seen.has(key)) continue;
      seen.add(key);
      points.push(sentence);
      if (points.length >= 3) return points;
    }
  }
  return points;
}

async function localizeAndEnrichArticles(rawArticles) {
  if (!Array.isArray(rawArticles) || rawArticles.length === 0) return [];

  // Identify every English article (by source language OR content detection)
  const itemsNeedingTranslation = [];
  for (let i = 0; i < rawArticles.length; i += 1) {
    const art = rawArticles[i];
    const cleanTitle = cleanRawHeadline(art.title);
    const isEn = art.language === "en" || looksLikeEnglish(cleanTitle) || looksLikeEnglish(art.summary);
    if (isEn) {
      itemsNeedingTranslation.push({ index: i, cleanTitle });
    }
  }

  // Batch-translate titles, summaries, and up to 4 body paragraphs of English articles in parallel
  if (itemsNeedingTranslation.length > 0) {
    const titlesToTranslate = itemsNeedingTranslation.map((item) => item.cleanTitle);
    const summariesToTranslate = itemsNeedingTranslation.map((item) => rawArticles[item.index].summary || "");
    const p1ToTranslate = itemsNeedingTranslation.map(
      (item) => rawArticles[item.index].excerptParagraphs?.[0] || ""
    );
    const p2ToTranslate = itemsNeedingTranslation.map(
      (item) => rawArticles[item.index].excerptParagraphs?.[1] || ""
    );
    const p3ToTranslate = itemsNeedingTranslation.map(
      (item) => rawArticles[item.index].excerptParagraphs?.[2] || ""
    );
    const p4ToTranslate = itemsNeedingTranslation.map(
      (item) => rawArticles[item.index].excerptParagraphs?.[3] || ""
    );

    const [trTitles, trSummaries, trP1, trP2, trP3, trP4] = await Promise.all([
      translateBatchEnToPt(titlesToTranslate),
      translateBatchEnToPt(summariesToTranslate),
      translateBatchEnToPt(p1ToTranslate),
      translateBatchEnToPt(p2ToTranslate),
      translateBatchEnToPt(p3ToTranslate),
      translateBatchEnToPt(p4ToTranslate),
    ]);

    for (let k = 0; k < itemsNeedingTranslation.length; k += 1) {
      const idx = itemsNeedingTranslation[k].index;
      const art = rawArticles[idx];
      const translatedTitle = polishPtTerminology(trTitles[k] || itemsNeedingTranslation[k].cleanTitle);
      const translatedSummary = polishPtTerminology(trSummaries[k] || art.summary || "");
      const translatedParagraphs = [
        polishPtTerminology(trP1[k] || ""),
        polishPtTerminology(trP2[k] || ""),
        polishPtTerminology(trP3[k] || ""),
        polishPtTerminology(trP4[k] || ""),
      ].filter((p) => p.length > 20);

      rawArticles[idx] = {
        ...art,
        originalTitle: art.title,
        title: translatedTitle,
        summary: translatedSummary || translatedParagraphs[0] || art.summary,
        excerptParagraphs:
          translatedParagraphs.length > 0
            ? translatedParagraphs
            : translatedSummary
              ? [translatedSummary]
              : art.excerptParagraphs,
        language: "pt",
        translatedFromEn: true,
      };
    }
  }

  // Apply strategic editorial headlines, kickers, sourceTier, keyPoints, readingTime, and engagement score
  return rawArticles.map((art) => {
    const cleanedTitle = cleanRawHeadline(art.title);
    const { category, topics, tags } = classifyArticleMulti(
      cleanedTitle,
      art.summary || "",
      (art.excerptParagraphs || []).join(" "),
      art.region,
      art.category
    );

    const editorialKicker = deriveEditorialKicker({
      ...art,
      title: cleanedTitle,
    });
    const strategicTitle = craftStrategicHeadline(
      cleanedTitle,
      editorialKicker,
      category,
      art.region
    );

    const cleanSummary = polishPtTerminology(art.summary || "");
    const paragraphs = Array.isArray(art.excerptParagraphs)
      ? art.excerptParagraphs.map((p) => polishPtTerminology(p)).filter((p) => p.length > 20)
      : cleanSummary
        ? [cleanSummary]
        : [];
    const sourceTier = classifySourceTier(art.source, art.sourceTier);
    const keyPoints = extractKeyPoints(paragraphs, cleanSummary);
    const readingTimeMin = computeReadingTimeMin(paragraphs, cleanSummary);

    const enriched = {
      ...art,
      originalTitle: art.originalTitle || art.title,
      title: strategicTitle,
      summary: cleanSummary,
      excerptParagraphs: paragraphs.length > 0 ? paragraphs : cleanSummary ? [cleanSummary] : [],
      keyPoints,
      readingTimeMin,
      sourceTier,
      editorialKicker,
      category,
      topics,
      tags,
    };

    enriched.editorialScore = computeEditorialEngagementScore(enriched);
    return enriched;
  });
}

function extractParagraphsFromHtml(html = "", maxParagraphs = 8) {
  if (!html) return [];
  const matches = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  const paragraphs = [];
  for (const m of matches) {
    const clean = stripHtml(m[1])
      .replace(/O post .*? apareceu primeiro em .*$/i, "")
      .trim();
    if (
      clean.length >= 45 &&
      !/apareceu primeiro em/i.test(clean) &&
      !/leia também/i.test(clean) &&
      !/subscribe to/i.test(clean) &&
      !/aceitar cookies|política de privacidade/i.test(clean)
    ) {
      paragraphs.push(clean);
    }
    if (paragraphs.length >= maxParagraphs) break;
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
  if (
    typeof post?.jetpack_featured_media_url === "string" &&
    post.jetpack_featured_media_url.startsWith("http")
  ) {
    return post.jetpack_featured_media_url;
  }
  const contentImg = post?.content?.rendered?.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i)?.[1];
  return contentImg || null;
}

function mapWpPostsToArticles(posts, meta, isDeepResult = false) {
  if (!Array.isArray(posts)) return [];
  const articles = [];

  for (const post of posts) {
    const title = stripHtml(post?.title?.rendered || "");
    const rawExternalLink =
      typeof post?.acf?.link === "string" && /^https?:\/\//i.test(post.acf.link.trim())
        ? post.acf.link.trim()
        : null;
    const url = rawExternalLink || post?.link;
    if (!title || !url) continue;

    const acfDesc = stripHtml(post?.acf?.descricao || "").trim();
    const excerptText = stripHtml(post?.excerpt?.rendered || "")
      .replace(/O post .*? apareceu primeiro em .*$/i, "")
      .replace(/\[\.\.\.\]|\[…\]/g, "…")
      .trim();
    const contentParagraphs = extractParagraphsFromHtml(post?.content?.rendered || "", 8);
    let publisherHost = "";
    if (rawExternalLink) {
      try {
        publisherHost = new URL(rawExternalLink).hostname.replace(/^www\./i, "");
      } catch {
        publisherHost = "";
      }
    }
    let summary =
      excerptText ||
      contentParagraphs[0] ||
      acfDesc ||
      (publisherHost
        ? `Curadoria diária ${meta.source} (via ${publisherHost}). Abra o resumo para carregar a leitura aprofundada ou acesse a reportagem original.`
        : "");
    if (summary.length > 290) {
      summary = `${summary.slice(0, 287).trim()}…`;
    }

    if (isOffTopicCrimeBlotter(title, summary)) {
      continue;
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

    const { category, topics, tags } = classifyArticleMulti(
      title,
      summary,
      contentParagraphs.join(" "),
      meta.region,
      meta.hintTopic
    );

    articles.push({
      id: makeArticleId(url),
      title,
      summary,
      excerptParagraphs:
        contentParagraphs.length > 0 ? contentParagraphs : summary ? [summary] : [],
      url,
      source: meta.source,
      sourceId: meta.id,
      sourceHandle: meta.handle,
      sourceTier: classifySourceTier(meta.source, meta.sourceTier),
      region: meta.region,
      category,
      topics,
      tags,
      publishedAt,
      image,
      language: meta.language,
      isDeepResult,
    });
  }
  return articles;
}

async function fetchSingleWpUrl(url, meta, isDeepResult = false) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(7000),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; InstitutoMecuraNewsBot/2.0)",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`WP source ${meta.id} (${url}) returned ${response.status}`);
  }
  const posts = await response.json();
  return mapWpPostsToArticles(posts, meta, isDeepResult);
}

async function fetchWpSource(meta, customUrl = null, isDeepResult = false) {
  if (customUrl) {
    return fetchSingleWpUrl(customUrl, meta, isDeepResult);
  }
  const urlsToFetch = [meta.url, ...(Array.isArray(meta.extraUrls) ? meta.extraUrls : [])];
  if (urlsToFetch.length === 1) {
    return fetchSingleWpUrl(urlsToFetch[0], meta, isDeepResult);
  }
  const settled = await Promise.allSettled(
    urlsToFetch.map((u) => fetchSingleWpUrl(u, meta, isDeepResult))
  );
  const merged = [];
  for (const res of settled) {
    if (res.status === "fulfilled" && Array.isArray(res.value)) {
      merged.push(...res.value);
    }
  }
  return merged;
}

const rssOgImageCache = new Map();
const gnewsUrlCache = new Map();

function isSafeExternalHttpUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "::1" ||
      host === "[::1]" ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      /^fc|^fd|^fe80:/i.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function normalizeExtractedImageUrl(rawCandidate, basePageUrl) {
  if (!rawCandidate || typeof rawCandidate !== "string") return null;
  const decoded = decodeHtmlEntities(rawCandidate).trim();
  if (!decoded || decoded.startsWith("data:")) return null;
  try {
    const resolved = new URL(decoded, basePageUrl).href;
    if (!isSafeExternalHttpUrl(resolved)) return null;
    if (isBlockedPlaceholderImage(resolved)) return null;
    return resolved;
  } catch {
    return null;
  }
}

function extractMetaContent(html, attrName, attrValue) {
  const escaped = attrValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re1 = new RegExp(
    `<meta[^>]+${attrName}=["']${escaped}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+${attrName}=["']${escaped}["']`,
    "i"
  );
  return html.match(re1)?.[1] || html.match(re2)?.[1] || "";
}

function extractArticleMetaFromHtml(html, pageUrl) {
  const imageCandidates = [
    extractMetaContent(html, "property", "og:image:secure_url"),
    extractMetaContent(html, "property", "og:image"),
    extractMetaContent(html, "name", "og:image"),
    extractMetaContent(html, "name", "twitter:image"),
    extractMetaContent(html, "name", "twitter:image:src"),
    extractMetaContent(html, "property", "twitter:image"),
    html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i)?.[1] || "",
  ];

  // Also check JSON-LD Article / NewsArticle image
  const ld = extractSechatJsonLd(html);
  if (ld?.image) {
    if (typeof ld.image === "string") {
      imageCandidates.push(ld.image);
    } else if (Array.isArray(ld.image)) {
      for (const entry of ld.image.slice(0, 3)) {
        imageCandidates.push(typeof entry === "string" ? entry : entry?.url || "");
      }
    } else if (typeof ld.image?.url === "string") {
      imageCandidates.push(ld.image.url);
    }
  }

  // Fallback: first substantive <img> inside <article> or <main>
  const articleScope =
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ||
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ||
    "";
  if (articleScope) {
    const imgMatches = articleScope.matchAll(
      /<img[^>]+(?:data-src|data-lazy-src|src)=["']([^"']+)["'][^>]*>/gi
    );
    let count = 0;
    for (const m of imgMatches) {
      imageCandidates.push(m[1]);
      count += 1;
      if (count >= 4) break;
    }
  }

  let resolvedImage = null;
  for (const cand of imageCandidates) {
    const norm = normalizeExtractedImageUrl(cand, pageUrl);
    if (norm) {
      resolvedImage = norm;
      break;
    }
  }

  const rawDesc =
    extractMetaContent(html, "property", "og:description") ||
    extractMetaContent(html, "name", "description") ||
    extractMetaContent(html, "name", "twitter:description") ||
    (typeof ld?.description === "string" ? ld.description : "");
  const cleanDesc = decodeHtmlEntities(rawDesc).replace(/\s+/g, " ").trim();
  const safeDesc =
    cleanDesc.length >= 40 && !isGoogleNewsBoilerplate(cleanDesc) ? cleanDesc : "";

  const paragraphs = articleScope
    ? extractParagraphsFromHtml(articleScope, 6).filter((p) => !isGoogleNewsBoilerplate(p))
    : [];

  return {
    image: resolvedImage,
    description: safeDesc,
    paragraphs,
  };
}

async function resolveGoogleNewsUrl(rawUrl) {
  if (!rawUrl || !/news\.google\.com/i.test(rawUrl)) return rawUrl;

  const cached = gnewsUrlCache.get(rawUrl);
  if (cached && Date.now() - cached.ts < 24 * 60 * 60 * 1000) {
    return cached.url;
  }

  // 1) Fast path: legacy base64-encoded Google News article token
  const legacyDecoded = tryDecodeGoogleNewsUrl(rawUrl);
  if (legacyDecoded && isSafeExternalHttpUrl(legacyDecoded)) {
    gnewsUrlCache.set(rawUrl, { ts: Date.now(), url: legacyDecoded });
    return legacyDecoded;
  }

  // 2) Modern Google News batchexecute RPC resolver (Fbv4je)
  try {
    const idMatch = rawUrl.match(/\/(?:rss\/)?articles\/([^/?]+)/i);
    if (!idMatch) {
      gnewsUrlCache.set(rawUrl, { ts: Date.now(), url: null });
      return null;
    }
    const articleToken = idMatch[1];
    const pageRes = await fetch(`https://news.google.com/rss/articles/${articleToken}`, {
      redirect: "follow",
      signal: AbortSignal.timeout(3500),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!pageRes.ok) return null;

    if (pageRes.url && !/news\.google\.com|consent\.google\.com|accounts\.google\.com/i.test(pageRes.url)) {
      const safeDirect = isSafeExternalHttpUrl(pageRes.url) ? pageRes.url : null;
      gnewsUrlCache.set(rawUrl, { ts: Date.now(), url: safeDirect });
      return safeDirect;
    }

    const html = await pageRes.text();
    const sg = html.match(/data-n-a-sg=["']([^"']+)["']/i)?.[1];
    const ts = html.match(/data-n-a-ts=["']([^"']+)["']/i)?.[1];
    if (!sg || !ts) {
      gnewsUrlCache.set(rawUrl, { ts: Date.now(), url: null });
      return null;
    }

    const payload = JSON.stringify([
      [
        [
          "Fbv4je",
          JSON.stringify([
            "garturlreq",
            [
              ["X", "X", ["X", "X"], null, null, 1, 1, "US:en", null, 1, null, null, null, null, null, 0, 1],
              "X",
              "X",
              1,
              [1, 1, 1],
              1,
              1,
              null,
              0,
              0,
              null,
              0,
            ],
            articleToken,
            Number(ts),
            sg,
          ]),
          null,
          "generic",
        ],
      ],
    ]);

    const rpcRes = await fetch("https://news.google.com/_/DotsSplashUi/data/batchexecute", {
      method: "POST",
      signal: AbortSignal.timeout(3500),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
      body: `f.req=${encodeURIComponent(payload)}`,
    });
    if (!rpcRes.ok) return null;

    const rpcText = await rpcRes.text();
    const urlMatch = rpcText.match(/garturlres\\",\\"([^\\"]+)/);
    const decodedUrl = urlMatch
      ? urlMatch[1]
          .replace(/\\u003d/gi, "=")
          .replace(/\\u0026/gi, "&")
          .replace(/\\\//g, "/")
      : null;

    const safeResolved =
      decodedUrl &&
      isSafeExternalHttpUrl(decodedUrl) &&
      !/news\.google\.com|google\.com\/|gstatic\.com/i.test(decodedUrl)
        ? decodedUrl
        : null;

    gnewsUrlCache.set(rawUrl, { ts: Date.now(), url: safeResolved });
    if (gnewsUrlCache.size > 600) {
      const oldest = gnewsUrlCache.keys().next().value;
      if (oldest) gnewsUrlCache.delete(oldest);
    }
    return safeResolved;
  } catch {
    return null;
  }
}

async function fetchPageVisualMeta(originalUrl) {
  const cached = rssOgImageCache.get(originalUrl);
  if (cached && Date.now() - cached.ts < 6 * 60 * 60 * 1000) {
    return cached;
  }

  let targetUrl = originalUrl;
  if (/news\.google\.com/i.test(originalUrl)) {
    const resolved = await resolveGoogleNewsUrl(originalUrl);
    if (!resolved) {
      const miss = { ts: Date.now(), image: null, resolvedUrl: null, description: "", paragraphs: [] };
      rssOgImageCache.set(originalUrl, miss);
      return miss;
    }
    targetUrl = resolved;
  }

  if (!isSafeExternalHttpUrl(targetUrl)) {
    const miss = { ts: Date.now(), image: null, resolvedUrl: null, description: "", paragraphs: [] };
    rssOgImageCache.set(originalUrl, miss);
    return miss;
  }

  try {
    const res = await fetch(targetUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(4500),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
    if (!res.ok) {
      const miss = {
        ts: Date.now(),
        image: null,
        resolvedUrl: targetUrl !== originalUrl ? targetUrl : null,
        description: "",
        paragraphs: [],
      };
      rssOgImageCache.set(originalUrl, miss);
      return miss;
    }

    const finalUrl = res.url || targetUrl;
    if (/news\.google\.com|consent\.google\.com|accounts\.google\.com/i.test(finalUrl)) {
      const miss = { ts: Date.now(), image: null, resolvedUrl: null, description: "", paragraphs: [] };
      rssOgImageCache.set(originalUrl, miss);
      return miss;
    }

    const html = await res.text();
    const meta = extractArticleMetaFromHtml(html, finalUrl);
    const result = {
      ts: Date.now(),
      image: meta.image,
      resolvedUrl: finalUrl !== originalUrl && isSafeExternalHttpUrl(finalUrl) ? finalUrl : null,
      description: meta.description,
      paragraphs: meta.paragraphs,
    };
    rssOgImageCache.set(originalUrl, result);
    if (rssOgImageCache.size > 600) {
      const oldest = rssOgImageCache.keys().next().value;
      if (oldest) rssOgImageCache.delete(oldest);
    }
    return result;
  } catch {
    const miss = {
      ts: Date.now(),
      image: null,
      resolvedUrl: targetUrl !== originalUrl ? targetUrl : null,
      description: "",
      paragraphs: [],
    };
    rssOgImageCache.set(originalUrl, miss);
    return miss;
  }
}

function isPlaceholderSummary(summary = "") {
  return /Reportagem publicada por .*Abra o resumo para carregar/i.test(summary);
}

async function hydrateMissingArticleImages(items, maxToHydrate = 32, concurrency = 8) {
  if (!Array.isArray(items) || items.length === 0) return items;

  const missing = items.filter((item) => !item.image && item.url && item.sourceTier !== "cientifico");
  if (missing.length === 0) return items;

  // Prioritize today's articles first (newest -> oldest), then other recent articles
  const prioritized = [...missing].sort((a, b) => {
    const aToday = isArticleFromToday(a) ? 1 : 0;
    const bToday = isArticleFromToday(b) ? 1 : 0;
    if (aToday !== bToday) return bToday - aToday;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Apply cached results instantly to ALL missing items first
  const uncachedQueue = [];
  for (const item of prioritized) {
    const cached = rssOgImageCache.get(item.url);
    if (cached && Date.now() - cached.ts < 6 * 60 * 60 * 1000) {
      if (cached.image) item.image = cached.image;
      if (cached.resolvedUrl) item.url = cached.resolvedUrl;
      if (isPlaceholderSummary(item.summary) && (cached.description || cached.paragraphs?.[0])) {
        const better = (cached.description || cached.paragraphs[0]).slice(0, 290);
        item.summary = better;
        item.excerptParagraphs =
          cached.paragraphs && cached.paragraphs.length > 0 ? cached.paragraphs : [better];
      }
    } else if (uncachedQueue.length < maxToHydrate) {
      uncachedQueue.push(item);
    }
  }

  if (uncachedQueue.length === 0) return items;

  let cursor = 0;
  const workerCount = Math.min(concurrency, uncachedQueue.length);
  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (cursor < uncachedQueue.length) {
        const idx = cursor;
        cursor += 1;
        const item = uncachedQueue[idx];
        const meta = await fetchPageVisualMeta(item.url);
        if (!meta) continue;
        if (meta.image) item.image = meta.image;
        if (meta.resolvedUrl) item.url = meta.resolvedUrl;
        if (isPlaceholderSummary(item.summary) && (meta.description || meta.paragraphs?.[0])) {
          const better = (meta.description || meta.paragraphs[0]).slice(0, 290);
          item.summary = better;
          item.excerptParagraphs =
            meta.paragraphs && meta.paragraphs.length > 0 ? meta.paragraphs : [better];
        }
      }
    })
  );

  return items;
}

async function hydrateDirectRssImages(items) {
  return hydrateMissingArticleImages(items, 10, 6);
}

async function fetchRssSource(meta, maxItems = 10, isDeepResult = false) {
  const response = await fetch(meta.url, {
    signal: AbortSignal.timeout(5500),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; InstitutoMecuraNewsBot/2.0)",
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9",
    },
  });
  if (!response.ok) {
    throw new Error(`RSS source ${meta.id} returned ${response.status}`);
  }
  const xml = await response.text();
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  const items = [];

  for (const rawItem of itemMatches.slice(0, maxItems)) {
    const rawTitle = decodeHtmlEntities(extractTag(rawItem, "title"));
    const link = decodeHtmlEntities(extractTag(rawItem, "link"));
    const pubDateStr = extractTag(rawItem, "pubDate");
    const rawSource = stripHtml(extractTag(rawItem, "source"));
    const rawContentEncoded = extractTag(rawItem, "content:encoded");
    const rawDescHtml = extractTag(rawItem, "description");
    const rawDesc = stripHtml(rawDescHtml);
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

    if (isOffTopicCrimeBlotter(title, rawDesc)) {
      continue;
    }

    const publishedDate = pubDateStr ? new Date(pubDateStr) : new Date();
    const publishedAt = Number.isNaN(publishedDate.getTime())
      ? new Date().toISOString()
      : publishedDate.toISOString();

    const richParagraphs = extractParagraphsFromHtml(rawContentEncoded || rawDescHtml, 6);
    const meaningfulDesc =
      rawDesc &&
      rawDesc.length > 48 &&
      !rawDesc.toLowerCase().startsWith(title.toLowerCase().slice(0, 28))
        ? rawDesc.slice(0, 290)
        : "";

    const cleanDesc =
      richParagraphs[0]?.slice(0, 290) ||
      meaningfulDesc ||
      `Reportagem publicada por ${source}. Abra o resumo para carregar a leitura aprofundada ou acesse a publicação original.`;

    const { category, topics, tags } = classifyArticleMulti(
      title,
      cleanDesc,
      richParagraphs.join(" "),
      meta.region,
      meta.hintTopic
    );

    const rssImageMatch = rawItem.match(
      /<media:content[^>]+url=["'](https?:\/\/[^"']+)["']|<media:thumbnail[^>]+url=["'](https?:\/\/[^"']+)["']|<enclosure[^>]+url=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']|<img[^>]+src=["'](https?:\/\/[^"']+)["']/i
    );
    const rawRssImage =
      rssImageMatch?.[1] || rssImageMatch?.[2] || rssImageMatch?.[3] || rssImageMatch?.[4] || null;
    const rssImage =
      rawRssImage && !/google\.com|gstatic\.com|googleusercontent\.com|ggpht\.com/i.test(rawRssImage)
        ? rawRssImage
        : null;

    const resolvedSource = meta.isDirectPortal ? meta.sourceName || source : source;

    items.push({
      id: makeArticleId(link),
      title,
      summary: cleanDesc,
      excerptParagraphs: richParagraphs.length > 0 ? richParagraphs : [cleanDesc],
      url: link,
      source: resolvedSource,
      sourceId: meta.isDirectPortal ? meta.id : undefined,
      sourceHandle: meta.handle,
      sourceTier: classifySourceTier(resolvedSource, meta.sourceTier),
      region: meta.region,
      category,
      topics,
      tags,
      publishedAt,
      image: rssImage,
      language: meta.language,
      isDeepResult,
    });
  }
  if (meta.isDirectPortal && !isDeepResult) {
    await hydrateDirectRssImages(items);
  }
  return items;
}

function deduplicateArticles(list) {
  const byKey = new Map();
  for (const article of list) {
    const key = normalizeText(article.originalTitle || article.title)
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 48);
    if (!key) continue;

    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, article);
    } else {
      const mergedTopics = Array.from(new Set([...(existing.topics || []), ...(article.topics || [])]));
      const mergedTags = Array.from(new Set([...(existing.tags || []), ...(article.tags || [])])).slice(0, 5);
      const preferNew =
        (!existing.image && article.image) ||
        (Boolean(existing.image) === Boolean(article.image) &&
          (article.excerptParagraphs?.length || 0) > (existing.excerptParagraphs?.length || 0));

      const chosen = preferNew ? { ...article } : { ...existing };
      chosen.topics = mergedTopics;
      chosen.tags = mergedTags;
      byKey.set(key, chosen);
    }
  }

  return Array.from(byKey.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/* --- Semantic Synonym Expansion & Weighted Relevance Scoring --- */

const SYNONYM_GROUPS = [
  ["cbd", "canabidiol", "cannabidiol"],
  ["thc", "tetrahidrocanabinol", "tetrahydrocannabinol"],
  ["hc", "habeas corpus", "salvo-conduto", "salvo conduto"],
  ["anvisa", "rdc 660", "rdc 327", "importacao", "regulatorio"],
  ["autismo", "tea", "espectro autista", "autism"],
  ["tdah", "deficit de atencao", "hiperatividade", "adhd"],
  ["ansiedade", "estresse", "panico", "saude mental", "anxiety"],
  ["depressao", "depressivo", "depression"],
  ["sono", "insonia", "dormir", "sleep", "insomnia"],
  ["dor", "dor cronica", "fibromialgia", "neuropatica", "enxaqueca", "pain", "chronic pain", "fibromyalgia", "migraine"],
  ["cultivo", "plantio", "canhamo", "hemp", "sementes", "agronomo", "grow", "cultivation"],
  ["mercado", "negocios", "industria", "farmacia", "investimento", "market", "business"],
  ["associacao", "associacoes", "sus", "gratuito", "coletivo"],
  ["ciencia", "estudo", "pesquisa", "clinico", "pubmed", "universidade", "study", "research", "clinical"],
  ["terpeno", "terpenos", "mirceno", "limoneno", "linalol", "cariofileno", "comitiva", "terpene", "terpenes", "cbg", "cbn"],
  ["epilepsia", "epileptico", "epileptica", "convulsao", "convulsoes", "crise convulsiva", "dravet", "lennox-gastaut", "antiseizure", "epilepsy", "seizure", "seizures"],
  ["parkinson", "tremor", "parkinsonismo"],
  ["alzheimer", "demencia", "memoria", "dementia"],
  ["endometriose", "colica", "endometriosis"],
  ["cancer", "oncologia", "quimioterapia", "tumor", "oncology"],
  ["esclerose", "esclerose multipla", "multiple sclerosis"],
  ["justica", "stj", "stf", "tribunal", "juiz", "liminar", "lei"],
];

const PT_TO_EN_SEARCH_MAP = [
  [/\bepilepsia\b/gi, "epilepsy"],
  [/\bconvuls(ao|oes|ão|ões)\b/gi, "seizure"],
  [/\bautismo\b|\btea\b/gi, "autism"],
  [/\bansiedade\b/gi, "anxiety"],
  [/\bins(o|ô)nia\b|\bsono\b/gi, "insomnia sleep"],
  [/\bdor cr(o|ô)nica\b/gi, "chronic pain"],
  [/\bfibromialgia\b/gi, "fibromyalgia"],
  [/\benxaqueca\b/gi, "migraine"],
  [/\bdepress(ao|ão)\b/gi, "depression"],
  [/\bendometriose\b/gi, "endometriosis"],
  [/\bc(a|â)ncer\b/gi, "cancer"],
  [/\besclerose\b/gi, "multiple sclerosis"],
  [/\btdah\b/gi, "ADHD"],
  [/\bcanabidiol\b/gi, "cannabidiol CBD"],
  [/\bterpenos?\b/gi, "terpenes"],
  [/\bcultivo\b|\bplantio\b/gi, "cultivation"],
  [/\bc(a|â)nhamo\b/gi, "hemp"],
  [/\bhabeas corpus\b|\bsalvo[- ]conduto\b/gi, "medical cannabis court ruling"],
  [/\bmercado\b|\bfarm(a|á)cias?\b/gi, "medical cannabis market pharmacy"],
  [/\banvisa\b|\brdc\s*660\b/gi, "medical cannabis regulation"],
  [/\bsus\b|\bgratuito\b/gi, "public health medical cannabis"],
];

function translateQueryPtToEn(rawQuery) {
  let out = String(rawQuery || "").trim();
  for (const [pattern, replacement] of PT_TO_EN_SEARCH_MAP) {
    out = out.replace(pattern, replacement);
  }
  return out.replace(/\s+/g, " ").trim();
}

function expandQueryTerms(rawQuery) {
  const norm = normalizeText(rawQuery).trim();
  if (!norm) return { tokens: [], expanded: [] };

  const stopWords = new Set(["de", "da", "do", "das", "dos", "e", "em", "na", "no", "para", "por", "com", "sobre", "um", "uma", "o", "a", "os", "as"]);
  const tokens = norm
    .split(/\s+/)
    .map((t) => t.replace(/[^a-z0-9-]/g, ""))
    .filter((t) => t.length >= 2 && !stopWords.has(t));

  const expandedSet = new Set(tokens);
  expandedSet.add(norm);

  for (const group of SYNONYM_GROUPS) {
    const matchesGroup = group.some(
      (term) =>
        norm === term ||
        (term.length >= 4 && norm.includes(term)) ||
        tokens.some((tok) => tok === term || (tok.length >= 4 && (term.includes(tok) || tok.includes(term))))
    );
    if (matchesGroup) {
      for (const term of group) {
        expandedSet.add(term);
      }
    }
  }

  return {
    tokens,
    expanded: Array.from(expandedSet),
  };
}

function scoreArticleForQuery(article, rawQuery, { tokens, expanded }) {
  const normQuery = normalizeText(rawQuery).trim();
  const normTitle = normalizeText(`${article.title} ${article.originalTitle || ""}`);
  const normSummary = normalizeText(article.summary);
  const normBody = normalizeText((article.excerptParagraphs || []).join(" "));
  const normTags = normalizeText((article.tags || []).join(" "));
  const normSource = normalizeText(`${article.source} ${article.sourceHandle || ""}`);

  let score = 0;

  if (normTitle.includes(normQuery)) score += 24;
  if (normSummary.includes(normQuery)) score += 12;
  if (normBody.includes(normQuery)) score += 6;

  for (const tok of tokens) {
    if (normTitle.includes(tok)) score += 9;
    if (normTags.includes(tok)) score += 6;
    if (normSummary.includes(tok)) score += 4;
    if (normBody.includes(tok)) score += 2;
    if (normSource.includes(tok)) score += 3;
  }

  for (const syn of expanded) {
    if (tokens.includes(syn) || syn === normQuery) continue;
    if (normTitle.includes(syn)) score += 5;
    else if (normTags.includes(syn)) score += 3.5;
    else if (normSummary.includes(syn)) score += 2;
    else if (normBody.includes(syn)) score += 1;
  }

  // Strictly reject unrelated articles that did not match query or its synonyms
  if (score === 0) return 0;

  if (article.sourceTier === "cientifico") score += 2.2;
  if (article.image) score += 1.5;
  if (article.region === "brasil") score += 1.4;
  const ageDays = Math.max(0, (Date.now() - new Date(article.publishedAt).getTime()) / 86400000);
  score += Math.max(0, 3 - ageDays * 0.03);

  return score;
}

/* --- PubMed / NIH Official Scientific Literature Fetcher --- */

async function fetchPubMedStudies(enQuery, maxItems = 4) {
  const cleanEn = String(enQuery || "").trim();
  if (!cleanEn || cleanEn.length < 2) return [];

  const term = /cannabis|cannabidiol|cbd|thc|endocannabinoid/i.test(cleanEn)
    ? cleanEn
    : `(cannabis[Title/Abstract] OR cannabidiol[Title/Abstract] OR cannabinoids[Title/Abstract]) AND (${cleanEn}[Title/Abstract])`;

  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=${maxItems}&sort=date&retmode=json`;
    const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(4500) });
    if (!searchRes.ok) return [];
    const searchJson = await searchRes.json();
    const ids = searchJson?.esearchresult?.idlist || [];
    if (ids.length === 0) return [];

    const idList = ids.join(",");
    const [sumRes, absRes] = await Promise.allSettled([
      fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList}&retmode=json`,
        { signal: AbortSignal.timeout(4500) }
      ).then((r) => (r.ok ? r.json() : null)),
      fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${idList}&retmode=xml`,
        { signal: AbortSignal.timeout(5000) }
      ).then((r) => (r.ok ? r.text() : "")),
    ]);

    const summaryData = sumRes.status === "fulfilled" ? sumRes.value?.result || {} : {};
    const xmlData = absRes.status === "fulfilled" ? absRes.value || "" : "";

    // Map PMID -> Abstract text from XML
    const abstractById = new Map();
    const pubmedArticles = xmlData.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/gi) || [];
    for (const block of pubmedArticles) {
      const pmid = block.match(/<PMID[^>]*>(\d+)<\/PMID>/i)?.[1];
      if (!pmid) continue;
      const absTexts = [...block.matchAll(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/gi)]
        .map((m) => stripHtml(m[1]))
        .filter((t) => t.length > 25);
      if (absTexts.length > 0) {
        abstractById.set(pmid, absTexts.slice(0, 4));
      }
    }

    const studies = [];
    for (const id of ids) {
      const item = summaryData[id];
      if (!item?.title) continue;
      const rawTitle = stripHtml(item.title).replace(/\.$/, "");
      const journal = item.fulljournalname || item.source || "PubMed / NIH";
      const pubDate = item.sortpubdate || item.pubdate || "";
      const parsedDate = pubDate ? new Date(pubDate) : new Date();
      const publishedAt = Number.isNaN(parsedDate.getTime())
        ? new Date().toISOString()
        : parsedDate.toISOString();

      const absParagraphs = abstractById.get(id) || [];
      const firstAuthor = item.authors?.[0]?.name ? `${item.authors[0].name} et al.` : "Equipe científica";
      const leadSummary =
        absParagraphs[0]?.slice(0, 290) ||
        `Estudo clínico indexado no PubMed (${journal}) por ${firstAuthor}, avaliando evidências terapêuticas relacionadas a ${cleanEn}.`;

      const { category, topics, tags } = classifyArticleMulti(
        rawTitle,
        leadSummary,
        absParagraphs.join(" "),
        "mundo",
        "ciencia"
      );

      studies.push({
        id: makeArticleId(`pubmed-${id}`),
        title: rawTitle,
        summary: leadSummary,
        excerptParagraphs:
          absParagraphs.length > 0
            ? absParagraphs
            : [leadSummary, `Referência científica: ${firstAuthor} — ${journal} (PMID ${id}).`],
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        source: `PubMed · ${item.source || "NIH"}`,
        sourceTier: "cientifico",
        journalName: journal,
        region: "mundo",
        category: category === "mundo" ? "ciencia" : category,
        topics: Array.from(new Set([...topics, "ciencia", "saude"])),
        tags: Array.from(new Set(["PubMed / NIH", ...tags])).slice(0, 4),
        publishedAt,
        image: null,
        language: "en",
        isDeepResult: true,
      });
    }

    return studies;
  } catch {
    return [];
  }
}

/* --- Date Filtering & Major-Portal Sorting Helpers --- */

function getSaoPauloDateKey(isoOrDate) {
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

function isArticleFromToday(article) {
  const pubMs = new Date(article.publishedAt).getTime();
  if (Number.isNaN(pubMs)) return false;
  const ageHours = (Date.now() - pubMs) / 3600000;
  return ageHours <= 24 || getSaoPauloDateKey(pubMs) === getSaoPauloDateKey(Date.now());
}

function countTodayArticles(articles) {
  let count = 0;
  for (const a of articles) {
    if (isArticleFromToday(a)) count += 1;
  }
  return count;
}

function filterByDatePeriodAndExactDate(articles, period = "todos", exactDate = "") {
  if (exactDate && /^\d{4}-\d{2}-\d{2}$/.test(exactDate)) {
    return articles.filter((a) => getSaoPauloDateKey(a.publishedAt) === exactDate);
  }
  if (!period || period === "todos") return articles;

  const now = Date.now();
  if (period === "hoje") {
    return articles.filter((a) => isArticleFromToday(a));
  }
  const maxAgeHoursByPeriod = {
    "48h": 48,
    "7d": 7 * 24,
    "30d": 30 * 24,
    "90d": 90 * 24,
  };
  const maxHours = maxAgeHoursByPeriod[period];
  if (!maxHours) return articles;

  return articles.filter((a) => {
    const ms = new Date(a.publishedAt).getTime();
    if (Number.isNaN(ms)) return false;
    return (now - ms) / 3600000 <= maxHours;
  });
}

function periodToGoogleNewsWhen(period = "todos") {
  if (period === "hoje") return "+when:1d";
  if (period === "48h") return "+when:2d";
  if (period === "7d") return "+when:7d";
  if (period === "30d") return "+when:30d";
  if (period === "90d") return "+when:90d";
  return "";
}

async function runLiveDeepSearch(rawQuery, period = "todos") {
  const cleanQuery = String(rawQuery || "").trim();
  const cacheKey = `${normalizeText(cleanQuery)}::${period || "todos"}`;
  const cached = deepSearchCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < SEARCH_CACHE_TTL_MS) {
    return cached.articles;
  }

  const encodedPt = encodeURIComponent(cleanQuery);
  const enQuery = translateQueryPtToEn(cleanQuery);
  const encodedEn = encodeURIComponent(enQuery);
  const whenSuffix = periodToGoogleNewsWhen(period);

  const cannabisContextPt = /cannabis|canabidiol|cbd|thc|maconha|canhamo|hemp/i.test(cleanQuery)
    ? cleanQuery
    : `${cleanQuery} (cannabis OR canabidiol)`;
  const cannabisContextEn = /cannabis|cannabidiol|cbd|thc|hemp|marijuana/i.test(enQuery)
    ? enQuery
    : `${enQuery} (cannabis OR cannabidiol)`;

  // Search 12 top active WP portals in parallel (PT portals with PT query, EN portals with EN translated query)
  const ptWpSources = WP_NEWS_SOURCES.filter((s) => s.language === "pt").slice(0, 9);
  const enWpSources = WP_NEWS_SOURCES.filter((s) => s.language === "en").slice(0, 3);

  const wpPromises = [
    ...ptWpSources.map((src) =>
      fetchWpSource(
        src,
        `${src.baseUrl}?search=${encodedPt}&per_page=10&_embed=wp:featuredmedia`,
        true
      )
    ),
    ...enWpSources.map((src) =>
      fetchWpSource(
        src,
        `${src.baseUrl}?search=${encodedEn}&per_page=8&_embed=wp:featuredmedia`,
        true
      )
    ),
  ];

  // Major Brazilian Press + Specialized BR + Global Press RSS
  const rssPromises = [
    fetchRssSource(
      {
        id: `deep-gnews-pt-${cacheKey}`,
        region: "brasil",
        language: "pt",
        defaultSource: "Radar Brasil",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent(cannabisContextPt)}${whenSuffix}&hl=pt-BR&gl=BR&ceid=BR:pt-419`,
      },
      14,
      true
    ),
    fetchRssSource(
      {
        id: `deep-imprensa-br-${cacheKey}`,
        region: "brasil",
        language: "pt",
        sourceTier: "imprensa",
        defaultSource: "Grande Imprensa BR",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent(
          `${cannabisContextPt} (site:g1.globo.com OR site:folha.uol.com.br OR site:cnnbrasil.com.br OR site:bbc.com OR site:uol.com.br OR site:estadao.com.br OR site:agenciabrasil.ebc.com.br OR site:veja.abril.com.br OR site:metropoles.com)`
        )}${whenSuffix}&hl=pt-BR&gl=BR&ceid=BR:pt-419`,
      },
      10,
      true
    ),
    fetchRssSource(
      {
        id: `deep-gnews-en-${cacheKey}`,
        region: "mundo",
        language: "en",
        defaultSource: "Global Wire",
        url: `https://news.google.com/rss/search?q=${encodeURIComponent(cannabisContextEn)}${whenSuffix}&hl=en-US&gl=US&ceid=US:en`,
      },
      8,
      true
    ),
  ];

  // Official PubMed / NIH peer-reviewed studies
  const pubmedPromise = fetchPubMedStudies(enQuery, 4);

  const settled = await Promise.allSettled([...wpPromises, ...rssPromises, pubmedPromise]);
  const results = [];
  for (const r of settled) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      results.push(...r.value);
    }
  }

  const deduped = deduplicateArticles(results);
  await hydrateMissingArticleImages(deduped, 10, 6);
  const enriched = await localizeAndEnrichArticles(deduped);
  deepSearchCache.set(cacheKey, { ts: Date.now(), articles: enriched });

  if (deepSearchCache.size > 80) {
    const oldestKey = deepSearchCache.keys().next().value;
    if (oldestKey) deepSearchCache.delete(oldestKey);
  }

  return enriched;
}

/* --- Direct Sechat Sitemap + Article Extractor (HD Photos + Full PT-BR Paragraphs) --- */

const sechatArticleCache = new Map();

function isBlockedPlaceholderImage(url) {
  if (!url) return true;
  return /google\.com|gstatic\.com|googleusercontent\.com|ggpht\.com|favicon|sprite|pixel\.gif|1x1|blank\.gif|spacer\.gif|doubleclick\.net|googlesyndication\.com|scorecardresearch\.com/i.test(
    url
  );
}

function isGoogleNewsBoilerplate(text) {
  if (!text) return false;
  return /cobertura jornal[ií]stica abrangente|comprehensive up-to-date news coverage|agregada de fontes do mundo inteiro|google not[ií]cias|aggregated from sources all over the world/i.test(
    text
  );
}

function tryDecodeGoogleNewsUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (!/news\.google\.com$/i.test(parsed.hostname)) return rawUrl;
    const match = parsed.pathname.match(/\/(?:rss\/)?articles\/([^/?]+)/i);
    if (!match) return null;
    const token = match[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = token + "=".repeat((4 - (token.length % 4)) % 4);
    const decoded = Buffer.from(padded, "base64").toString("latin1");
    const urlMatch = decoded.match(/https?:\/\/[^\s"'<>\\\x00-\x1f]+/);
    if (urlMatch && !/news\.google\.com|google\.com\/|gstatic\.com/i.test(urlMatch[0])) {
      return urlMatch[0];
    }
    return null;
  } catch {
    return null;
  }
}

function extractSechatJsonLd(html) {
  const scripts = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const script of scripts) {
    const inner = script.replace(/^<script[^>]*>|<\/script>$/gi, "").trim();
    if (!inner) continue;
    try {
      const parsed = JSON.parse(inner);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      for (const obj of list) {
        if (obj && (obj["@type"] === "NewsArticle" || obj["@type"] === "Article")) {
          return obj;
        }
      }
    } catch {
      // ignore malformed ld+json blocks
    }
  }
  return null;
}

async function fetchSechatArticlePage(entry) {
  const cached = sechatArticleCache.get(entry.loc);
  if (cached && Date.now() - cached.ts < 6 * 60 * 60 * 1000) {
    return cached.data;
  }

  try {
    const res = await fetch(entry.loc, {
      redirect: "follow",
      signal: AbortSignal.timeout(6500),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const ld = extractSechatJsonLd(html);

    const ogTitle =
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)?.[1] ||
      "";
    const ogImg =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["'](https?:\/\/[^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+content=["'](https?:\/\/[^"']+)["'][^>]+property=["']og:image["']/i)?.[1] ||
      null;
    const ogDesc =
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      "";

    const ldImage = Array.isArray(ld?.image)
      ? typeof ld.image[0] === "string"
        ? ld.image[0]
        : ld.image[0]?.url
      : typeof ld?.image === "string"
        ? ld.image
        : ld?.image?.url;

    const title = decodeHtmlEntities(entry.title || ld?.headline || ogTitle)
      .replace(/\s*\|\s*Sechat.*$/i, "")
      .trim();
    if (!title || title.length < 14) return null;

    const articleBlock = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] || "";
    const paragraphs = articleBlock
      ? extractParagraphsFromHtml(articleBlock, 8)
          .filter((p) => !/^resumo\b/i.test(p) && !/sechat play|lista de m[ée]dicos/i.test(p))
          .map((p) => polishPtTerminology(p))
      : [];

    const summary = polishPtTerminology(
      decodeHtmlEntities(ld?.description || ld?.abstract || ogDesc || paragraphs[0] || "").trim()
    );
    const resolvedImage =
      [entry.image, ogImg, ldImage].find((img) => img && /^https?:\/\//i.test(img) && !isBlockedPlaceholderImage(img)) ||
      null;
    const rawDate = entry.publishedAt || ld?.datePublished || ld?.dateModified;
    const parsedDate = rawDate ? new Date(rawDate) : null;
    const publishedAt =
      parsedDate && !Number.isNaN(parsedDate.getTime())
        ? parsedDate.toISOString()
        : new Date().toISOString();

    const data = {
      title,
      summary: summary || paragraphs[0] || `Reportagem publicada pelo portal Sechat.`,
      paragraphs: paragraphs.length > 0 ? paragraphs : summary ? [summary] : [],
      image: resolvedImage,
      publishedAt,
      url: entry.loc,
    };

    sechatArticleCache.set(entry.loc, { ts: Date.now(), data });
    if (sechatArticleCache.size > 80) {
      const oldest = sechatArticleCache.keys().next().value;
      if (oldest) sechatArticleCache.delete(oldest);
    }
    return data;
  } catch {
    return null;
  }
}

async function fetchSechatDirectSource(meta, maxItems = 12) {
  try {
    const now = new Date();
    const ymCurrent = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const ymPrev = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

    const sitemapUrls = [
      "https://sechat.com.br/sitemap-news.xml",
      `https://sechat.com.br/sitemap/${ymCurrent}.xml`,
      `https://sechat.com.br/sitemap/${ymPrev}.xml`,
    ];

    const responses = await Promise.allSettled(
      sitemapUrls.map((u) =>
        fetch(u, {
          signal: AbortSignal.timeout(6500),
          headers: { "User-Agent": "Mozilla/5.0 (compatible; MecuraNewsBot/1.0)" },
        }).then((r) => (r.ok ? r.text() : ""))
      )
    );

    const entryMap = new Map();
    for (const res of responses) {
      if (res.status !== "fulfilled" || !res.value) continue;
      const blocks = res.value.match(/<url>[\s\S]*?<\/url>/gi) || [];
      for (const block of blocks) {
        const loc = block.match(/<loc>(https?:\/\/sechat\.com\.br\/noticia\/[^<]+)<\/loc>/i)?.[1]?.trim();
        if (!loc) continue;
        const pubDate =
          block.match(/<news:publication_date>([^<]+)<\/news:publication_date>/i)?.[1]?.trim() ||
          block.match(/<lastmod>([^<]+)<\/lastmod>/i)?.[1]?.trim() ||
          "";
        const newsTitle = decodeHtmlEntities(
          block.match(/<news:title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/news:title>/i)?.[1] || ""
        ).trim();
        const imgLoc = block.match(/<image:loc>(https?:\/\/[^<]+)<\/image:loc>/i)?.[1]?.trim() || null;

        const existing = entryMap.get(loc);
        if (!existing) {
          entryMap.set(loc, { loc, publishedAt: pubDate, title: newsTitle, image: imgLoc });
        } else {
          if (!existing.title && newsTitle) existing.title = newsTitle;
          if (!existing.image && imgLoc) existing.image = imgLoc;
          if (!existing.publishedAt && pubDate) existing.publishedAt = pubDate;
        }
      }
    }

    const candidates = Array.from(entryMap.values())
      .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
      .slice(0, maxItems);

    if (candidates.length === 0) return [];

    const enrichedPages = [];
    const batchSize = 5;
    for (let i = 0; i < candidates.length; i += batchSize) {
      const slice = candidates.slice(i, i + batchSize);
      const settled = await Promise.allSettled(slice.map((c) => fetchSechatArticlePage(c)));
      for (const s of settled) {
        if (s.status === "fulfilled" && s.value) enrichedPages.push(s.value);
      }
    }

    return enrichedPages
      .filter((art) => !isOffTopicCrimeBlotter(art.title, art.summary))
      .map((art) => {
        const { category, topics, tags } = classifyArticleMulti(
          art.title,
          art.summary,
          art.paragraphs.join(" "),
          meta.region,
          meta.hintTopic
        );
        return {
          id: makeArticleId(art.url),
          title: art.title,
          summary: art.summary,
          excerptParagraphs: art.paragraphs.length > 0 ? art.paragraphs : [art.summary],
          url: art.url,
          source: meta.sourceName || "Sechat",
          sourceId: meta.id,
          sourceHandle: meta.handle,
          sourceTier: classifySourceTier(meta.sourceName || "Sechat", meta.sourceTier),
          region: meta.region,
          category,
          topics,
          tags,
          publishedAt: art.publishedAt,
          image: art.image,
          language: "pt",
          isDeepResult: false,
        };
      });
  } catch {
    return [];
  }
}

/* --- On-Demand Deep Article Content Reader Cache (for RSS / Grande Imprensa links) --- */

const articleDetailCache = new Map();

async function fetchDeepArticleContent(targetUrl, fallbackLanguage = "pt") {
  const cached = articleDetailCache.get(targetUrl);
  if (cached && Date.now() - cached.ts < 60 * 60 * 1000) {
    return cached.data;
  }

  let fetchUrl = targetUrl;
  if (/news\.google\.com/i.test(targetUrl)) {
    const decoded = await resolveGoogleNewsUrl(targetUrl);
    if (!decoded) {
      return null;
    }
    fetchUrl = decoded;
  }

  if (!isSafeExternalHttpUrl(fetchUrl)) return null;

  try {
    const response = await fetch(fetchUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(5500),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
    });
    if (!response.ok) return null;

    const finalUrl = response.url || fetchUrl;
    if (/news\.google\.com|consent\.google\.com|accounts\.google\.com/i.test(finalUrl)) {
      return null;
    }

    const html = await response.text();
    const extracted = extractArticleMetaFromHtml(html, finalUrl);
    const articleBlock = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] || html;
    let paragraphs =
      extracted.paragraphs.length > 0
        ? extracted.paragraphs
        : extractParagraphsFromHtml(articleBlock, 8).filter((p) => !isGoogleNewsBoilerplate(p));

    const cleanOgDesc = extracted.description;
    if (paragraphs.length === 0 && cleanOgDesc.length > 45) {
      paragraphs = [cleanOgDesc];
    }

    if (paragraphs.length > 0 && (fallbackLanguage === "en" || looksLikeEnglish(paragraphs[0]))) {
      const translated = await translateBatchEnToPt(paragraphs.slice(0, 6));
      paragraphs = translated.map((p) => polishPtTerminology(p)).filter((p) => p.length > 25);
    } else {
      paragraphs = paragraphs.map((p) => polishPtTerminology(p));
    }

    const safeImage = extracted.image;
    if (!safeImage && paragraphs.length === 0) {
      return null;
    }

    const data = {
      image: safeImage,
      paragraphs,
      keyPoints: extractKeyPoints(paragraphs, cleanOgDesc),
      readingTimeMin: computeReadingTimeMin(paragraphs, cleanOgDesc),
    };

    articleDetailCache.set(targetUrl, { ts: Date.now(), data });
    if (articleDetailCache.size > 150) {
      const firstKey = articleDetailCache.keys().next().value;
      if (firstKey) articleDetailCache.delete(firstKey);
    }
    return data;
  } catch {
    return null;
  }
}

function buildSourcesMeta(articles) {
  const registeredPortals = [
    ...WP_NEWS_SOURCES.map((s) => ({
      id: s.id,
      source: s.source,
      handle: s.handle,
      siteUrl: s.siteUrl,
      region: s.region,
    })),
    ...THEMATIC_RSS_FEEDS.filter((f) => f.isDirectPortal).map((f) => ({
      id: f.id,
      source: f.sourceName || f.defaultSource,
      handle: f.handle,
      siteUrl: f.siteUrl,
      region: f.region,
    })),
  ];

  const countById = new Map();
  const latestById = new Map();

  for (const art of articles) {
    const key = art.sourceId;
    if (!key) continue;
    countById.set(key, (countById.get(key) || 0) + 1);
    const prevLatest = latestById.get(key);
    if (!prevLatest || new Date(art.publishedAt).getTime() > new Date(prevLatest).getTime()) {
      latestById.set(key, art.publishedAt);
    }
  }

  return registeredPortals
    .map((p) => ({
      ...p,
      articleCount: countById.get(p.id) || 0,
      latestPublishedAt: latestById.get(p.id) || null,
    }))
    .filter((p) => p.articleCount > 0)
    .sort((a, b) => {
      if (a.region !== b.region) return a.region === "brasil" ? -1 : 1;
      return b.articleCount - a.articleCount;
    });
}

async function fetchAllNews() {
  const prevIds = new Set(newsCache.articles.map((a) => a.id));
  const hadPrevious = prevIds.size > 0;

  const [wpResults, rssResults] = await Promise.all([
    Promise.allSettled(WP_NEWS_SOURCES.map((src) => fetchWpSource(src))),
    Promise.allSettled(
      THEMATIC_RSS_FEEDS.map((src) =>
        src.type === "sechat-sitemap"
          ? fetchSechatDirectSource(src, 12)
          : fetchRssSource(
              src,
              src.id === "gnews-hoje-br" || src.id === "gnews-grande-imprensa-br"
                ? 14
                : src.isDirectPortal
                  ? 10
                  : 8
            )
      )
    ),
  ]);

  const combined = [];
  for (const res of [...wpResults, ...rssResults]) {
    if (res.status === "fulfilled") {
      combined.push(...res.value);
    }
  }

  const deduped = deduplicateArticles(combined).slice(0, 340);
  // Resolve Google News links & hydrate real publisher OG images + lead descriptions (today's news prioritized first)
  await hydrateMissingArticleImages(deduped, 34, 8);
  const localizedAndStrategic = await localizeAndEnrichArticles(deduped);

  if (localizedAndStrategic.length > 0) {
    const newlyPublished = hadPrevious
      ? localizedAndStrategic.filter((a) => !prevIds.has(a.id))
      : [];

    newsCache.articles = localizedAndStrategic;
    newsCache.sourcesMeta = buildSourcesMeta(localizedAndStrategic);
    newsCache.updatedAt = new Date().toISOString();
    newsCache.lastFetchMs = Date.now();

    if (sseClients.size > 0) {
      broadcastNewsEvent("news_update", {
        updatedAt: newsCache.updatedAt,
        pollIntervalSeconds: Math.round(LIVE_POLL_INTERVAL_MS / 1000),
        total: localizedAndStrategic.length,
        todayCount: countTodayArticles(localizedAndStrategic),
        newCount: newlyPublished.length,
        latestNewArticle: newlyPublished[0] || null,
        topicCounts: computeTopicCounts(localizedAndStrategic),
        sourcesMeta: newsCache.sourcesMeta,
        articles: localizedAndStrategic,
      });
    }
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

function computeTopicCounts(articles) {
  const counts = {
    inicio: articles.length,
    ultimas: articles.length,
    brasil: 0,
    mundo: 0,
    anvisa: 0,
    justica: 0,
    ciencia: 0,
    saude: 0,
    cultivo: 0,
    mercado: 0,
    associacoes: 0,
    canabinoides: 0,
  };

  for (const article of articles) {
    const topics = Array.isArray(article.topics) ? article.topics : [article.category];
    for (const t of topics) {
      if (t !== "inicio" && t !== "ultimas" && Object.prototype.hasOwnProperty.call(counts, t)) {
        counts[t] += 1;
      }
    }
  }
  return counts;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Warm up cache immediately and monitor all portals in real time every 2 minutes
  getNewsFeed(false).catch(() => {});
  setInterval(() => {
    getNewsFeed(true).catch(() => {});
  }, LIVE_POLL_INTERVAL_MS);

  // Real-Time Server-Sent Events (SSE) Stream — pushes fresh articles to browsers automatically
  app.get("/api/news/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    if (typeof res.flushHeaders === "function") {
      res.flushHeaders();
    }

    sseClients.add(res);

    res.write(
      `event: connected\ndata: ${JSON.stringify({
        updatedAt: newsCache.updatedAt,
        pollIntervalSeconds: Math.round(LIVE_POLL_INTERVAL_MS / 1000),
        total: newsCache.articles.length,
        sourcesCount: newsCache.sourcesMeta.length,
      })}\n\n`
    );

    const keepAlive = setInterval(() => {
      try {
        res.write(`: keepalive ${Date.now()}\n\n`);
      } catch {
        clearInterval(keepAlive);
        sseClients.delete(res);
      }
    }, 25000);

    req.on("close", () => {
      clearInterval(keepAlive);
      sseClients.delete(res);
    });
  });

  // Main Auto-Updating News Feed Route (100% Translated PT-BR + Strategic Headlines + Date & Sort Filters)
  app.get("/api/news", async (req, res) => {
    try {
      const topic =
        typeof req.query.topic === "string"
          ? req.query.topic
          : typeof req.query.category === "string"
            ? req.query.category
            : "inicio";
      const sourceFilter = typeof req.query.source === "string" ? req.query.source.trim() : "";
      const period = typeof req.query.period === "string" ? req.query.period.trim() : "todos";
      const exactDate = typeof req.query.date === "string" ? req.query.date.trim() : "";
      const sort = typeof req.query.sort === "string" ? req.query.sort.trim() : "";
      const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
      const deep = req.query.deep === "1";
      const forceRefresh = req.query.refresh === "1";

      const cache = await getNewsFeed(forceRefresh);
      let pool = cache.articles;
      let deepFetched = false;

      if (query.length >= 2 && deep) {
        try {
          const liveMatches = await runLiveDeepSearch(query, period);
          if (liveMatches.length > 0) {
            pool = deduplicateArticles([...liveMatches, ...pool]);
            deepFetched = true;
          }
        } catch (searchErr) {
          console.error("[/api/news] Deep search partial failure:", searchErr);
        }
      }

      const topicCounts = computeTopicCounts(cache.articles);
      const todayCount = countTodayArticles(cache.articles);

      let articles = pool;
      if (sourceFilter) {
        const normSourceFilter = normalizeText(sourceFilter);
        articles = articles.filter(
          (a) =>
            a.sourceId === sourceFilter ||
            normalizeText(a.source) === normSourceFilter ||
            normalizeText(a.sourceHandle || "") === normSourceFilter
        );
      }

      if (topic && topic !== "inicio" && topic !== "ultimas" && topic !== "todos") {
        articles = articles.filter(
          (a) =>
            (Array.isArray(a.topics) && a.topics.includes(topic)) ||
            a.category === topic ||
            a.region === topic
        );
      }

      articles = filterByDatePeriodAndExactDate(articles, period, exactDate);

      if (query.length >= 2) {
        const expanded = expandQueryTerms(query);
        const scored = articles
          .map((item) => ({
            item,
            score: scoreArticleForQuery(item, query, expanded),
          }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) =>
            sort === "recentes"
              ? new Date(b.item.publishedAt).getTime() - new Date(a.item.publishedAt).getTime()
              : b.score - a.score
          );
        articles = scored.map((entry) => entry.item);
      } else if (
        sort === "recentes" ||
        topic === "ultimas" ||
        period === "hoje" ||
        period === "48h" ||
        Boolean(exactDate) ||
        Boolean(sourceFilter)
      ) {
        articles = [...articles].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      } else if (topic === "inicio" && !sourceFilter) {
        articles = [...articles].sort(
          (a, b) => (b.editorialScore || 0) - (a.editorialScore || 0)
        );
      }

      const nextUpdateMs = Math.max(0, CACHE_TTL_MS - (Date.now() - cache.lastFetchMs));

      res.setHeader("Cache-Control", forceRefresh ? "no-cache" : "public, max-age=30");
      res.json({
        updatedAt: cache.updatedAt,
        nextUpdateInMinutes: Math.max(1, Math.ceil(nextUpdateMs / 60000)),
        pollIntervalSeconds: Math.round(LIVE_POLL_INTERVAL_MS / 1000),
        total: articles.length,
        todayCount,
        topic,
        period,
        date: exactDate || undefined,
        sort: sort || (topic === "ultimas" || period === "hoje" ? "recentes" : "destaques"),
        source: sourceFilter || undefined,
        query: query || undefined,
        deepFetched,
        topicCounts,
        sourcesMeta: cache.sourcesMeta,
        articles,
      });
    } catch (err) {
      console.error("[/api/news] Error:", err);
      res.status(500).json({
        error: "Não foi possível sincronizar o feed de notícias no momento.",
        articles: newsCache.articles,
        sourcesMeta: newsCache.sourcesMeta,
        updatedAt: newsCache.updatedAt,
      });
    }
  });

  // Dedicated Deep Search Route (12 WP Portals + Grande Imprensa BR + Global Wire + PubMed NIH + Date Filters)
  app.get("/api/news/search", async (req, res) => {
    try {
      const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
      const topic = typeof req.query.topic === "string" ? req.query.topic : "inicio";
      const period = typeof req.query.period === "string" ? req.query.period.trim() : "todos";
      const exactDate = typeof req.query.date === "string" ? req.query.date.trim() : "";
      const sort = typeof req.query.sort === "string" ? req.query.sort.trim() : "relevancia";

      if (query.length < 2) {
        const cache = await getNewsFeed(false);
        const filtered = filterByDatePeriodAndExactDate(cache.articles, period, exactDate);
        return res.json({
          updatedAt: cache.updatedAt,
          nextUpdateInMinutes: 2,
          pollIntervalSeconds: Math.round(LIVE_POLL_INTERVAL_MS / 1000),
          total: filtered.length,
          todayCount: countTodayArticles(cache.articles),
          topic,
          period,
          date: exactDate || undefined,
          sort,
          deepFetched: false,
          pubmedCount: 0,
          topicCounts: computeTopicCounts(cache.articles),
          sourcesMeta: cache.sourcesMeta,
          articles: filtered,
        });
      }

      const [cache, liveMatches] = await Promise.all([
        getNewsFeed(false),
        runLiveDeepSearch(query, period).catch(() => []),
      ]);

      let merged = deduplicateArticles([...liveMatches, ...cache.articles]);
      if (topic && topic !== "inicio" && topic !== "ultimas" && topic !== "todos") {
        const narrowed = merged.filter(
          (a) =>
            (Array.isArray(a.topics) && a.topics.includes(topic)) ||
            a.category === topic ||
            a.region === topic
        );
        if (narrowed.length > 0) merged = narrowed;
      }

      merged = filterByDatePeriodAndExactDate(merged, period, exactDate);

      const expanded = expandQueryTerms(query);
      const scored = merged
        .map((item) => ({
          item,
          score: scoreArticleForQuery(item, query, expanded),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) =>
          sort === "recentes"
            ? new Date(b.item.publishedAt).getTime() - new Date(a.item.publishedAt).getTime()
            : b.score - a.score
        )
        .map((entry) => entry.item);

      const pubmedCount = scored.filter((a) => a.sourceTier === "cientifico").length;

      res.setHeader("Cache-Control", "public, max-age=45");
      res.json({
        updatedAt: cache.updatedAt,
        nextUpdateInMinutes: 2,
        pollIntervalSeconds: Math.round(LIVE_POLL_INTERVAL_MS / 1000),
        total: scored.length,
        todayCount: countTodayArticles(cache.articles),
        topic,
        period,
        date: exactDate || undefined,
        sort,
        query,
        deepFetched: true,
        pubmedCount,
        topicCounts: computeTopicCounts(cache.articles),
        sourcesMeta: cache.sourcesMeta,
        articles: scored,
      });
    } catch (err) {
      console.error("[/api/news/search] Error:", err);
      res.status(500).json({
        error: "Não foi possível realizar a busca profunda agora.",
        articles: [],
        updatedAt: newsCache.updatedAt,
      });
    }
  });

  // On-Demand Deep Article Enricher (fetches fuller paragraphs + OG image when opening RSS/Grande Imprensa articles)
  app.get("/api/news/article", async (req, res) => {
    try {
      const targetUrl = typeof req.query.url === "string" ? req.query.url.trim() : "";
      const lang = typeof req.query.lang === "string" ? req.query.lang : "pt";
      if (!targetUrl || !isSafeExternalHttpUrl(targetUrl)) {
        return res.status(400).json({ error: "URL inválida." });
      }
      const enriched = await fetchDeepArticleContent(targetUrl, lang);
      res.setHeader("Cache-Control", "public, max-age=1800");
      return res.json(enriched || { paragraphs: [], keyPoints: [], image: null });
    } catch {
      return res.json({ paragraphs: [], keyPoints: [], image: null });
    }
  });

  // SSRF-safe Image Proxy Fallback (used automatically by <img> onError when a publisher blocks hotlinking)
  app.get("/api/news/image", async (req, res) => {
    try {
      const rawUrl = typeof req.query.url === "string" ? req.query.url.trim() : "";
      if (!rawUrl || !isSafeExternalHttpUrl(rawUrl) || isBlockedPlaceholderImage(rawUrl)) {
        return res.status(400).end();
      }
      const upstream = await fetch(rawUrl, {
        redirect: "follow",
        signal: AbortSignal.timeout(5500),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
      });
      if (!upstream.ok) return res.status(404).end();
      if (upstream.url && !isSafeExternalHttpUrl(upstream.url)) {
        return res.status(403).end();
      }
      const contentType = upstream.headers.get("content-type") || "";
      if (!contentType.toLowerCase().startsWith("image/")) {
        return res.status(415).end();
      }
      const buffer = Buffer.from(await upstream.arrayBuffer());
      if (buffer.length === 0 || buffer.length > 5 * 1024 * 1024) {
        return res.status(413).end();
      }
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=21600");
      return res.send(buffer);
    } catch {
      return res.status(502).end();
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

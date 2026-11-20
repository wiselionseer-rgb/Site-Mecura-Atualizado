import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  Check,
  Copy,
  Printer,
  Scale,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { BRAND, type ModalContentKey } from "../data/mecuraContent";
import {
  LEGAL_ARTICLES,
  LEGAL_COUNSEL,
  LEGAL_TABS,
  type LegalArticle,
  type LegalTabKey,
} from "../data/legalContent";

const LEGAL_MODAL_KEYS: ModalContentKey[] = [
  "parecer",
  "privacidade",
  "termos",
  "dados",
  "cookies",
];

function mapToLegalTab(key: ModalContentKey): LegalTabKey {
  if (key === "parecer") return "parecer";
  if (key === "privacidade" || key === "cookies") return "privacidade";
  if (key === "termos") return "termos";
  if (key === "dados") return "dados";
  return "parecer";
}

function InstitutionalContent({
  contentKey,
  onSwitchToLegal,
}: {
  contentKey: Exclude<ModalContentKey, "parecer" | "privacidade" | "termos" | "dados" | "cookies">;
  onSwitchToLegal: (tab: LegalTabKey) => void;
}) {
  if (contentKey === "sobre") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-background border border-border-strong space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                Pessoa Jurídica Registrada
              </p>
              <p className="font-display text-lg text-text-primary leading-tight">
                {BRAND.legalEntity}
              </p>
              <p className="font-mono text-xs text-accent tabular-nums">
                CNPJ {BRAND.cnpj}
              </p>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Plataforma brasileira de saúde e tecnologia voltada ao acesso seguro, legal e humanizado à Medicina Canabinoide — conectando pacientes a médicos prescritores especialistas e assessorando todo o processo sanitário junto à ANVISA.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-xl text-text-primary">
            Nossa Missão e Escopo de Atuação
          </h4>
          <p>
            O <strong>Instituto Mecura</strong> atua exclusivamente como{" "}
            <strong className="text-text-primary">plataforma facilitadora em saúde</strong>: estruturamos a triagem clínica com escalas internacionais (ASRS-18 da OMS e AQ-10 de Cambridge), viabilizamos teleconsultas com corpo médico independente sob diretrizes do CFM e conduzimos o suporte documental para a importação nominal autorizada pela{" "}
            <strong className="text-text-primary">ANVISA (RDC nº 660/2022)</strong>.
          </p>
          <p>
            Não comercializamos, armazenamos ou distribuímos substâncias controladas em território nacional. Todo o ecossistema opera com rastreabilidade, sigilo médico absoluto e proteção de dados sensíveis conforme a{" "}
            <strong className="text-text-primary">LGPD (Lei nº 13.709/2018)</strong>.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-accent/[0.06] border border-accent/30 space-y-3">
          <div className="flex items-center gap-2.5 text-accent">
            <Scale className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-[0.14em]">
              Resguardo Jurídico &amp; Transparência
            </span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Consulte nosso parecer técnico-jurídico assinado pelo{" "}
            <strong className="text-text-primary">{LEGAL_COUNSEL.name}</strong>, além da Política de Privacidade, Termos de Uso e Direitos LGPD.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onSwitchToLegal("parecer")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-ink text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
            >
              <span>Ler Parecer Jurídico</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onSwitchToLegal("privacidade")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-strong bg-background text-text-primary text-xs font-medium hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              <span>Política de Privacidade</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (contentKey === "equipe") {
    return (
      <div className="space-y-5">
        <p>
          Nosso corpo clínico e multidisciplinar reúne médicos prescritores, especialistas em agronomia medicinal (padrão GACP), consultoria jurídica especializada e acolhedores de pacientes.
        </p>
        <p>
          Cada atendimento parte de uma triagem estruturada — com escalas como ASRS-18 (OMS) e AQ-10 (Cambridge) — para que o médico defina com precisão o quimiotipo (CBD/THC), a via de administração e a titulação gradual ideal para cada caso.
        </p>
      </div>
    );
  }

  if (contentKey === "ciencia") {
    return (
      <div className="space-y-5">
        <p>
          O <strong>Sistema Endocanabinoide (SEC)</strong> é uma rede de receptores celulares (CB1 e CB2) presente no sistema nervoso central, periférico e imunológico, responsável pela regulação do sono, dor, humor e resposta inflamatória.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>
            <strong className="text-text-primary">Neuroproteção:</strong> modulação sináptica em condições neurológicas e do neurodesenvolvimento.
          </li>
          <li>
            <strong className="text-text-primary">Analgesia e controle inflamatório:</strong> redução de dor crônica, fibromialgia e dor neuropática.
          </li>
          <li>
            <strong className="text-text-primary">Regulação emocional e sono:</strong> suporte em quadros de ansiedade, estresse e insônia resistente.
          </li>
        </ul>
      </div>
    );
  }

  if (contentKey === "tratamentos") {
    return (
      <div className="space-y-5">
        <p>Nossos prescritores avaliam e acompanham diferentes linhas terapêuticas:</p>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li>
            <strong className="text-text-primary">Dor Crônica:</strong> fibromialgia, artrite, artrose, enxaqueca e dores neuropáticas.
          </li>
          <li>
            <strong className="text-text-primary">Saúde Mental &amp; Sono:</strong> ansiedade, insônia crônica, estresse e TEPT.
          </li>
          <li>
            <strong className="text-text-primary">Neurologia &amp; Foco:</strong> TDAH, Transtorno do Espectro Autista (TEA), epilepsias refratárias, Parkinson e Alzheimer.
          </li>
          <li>
            <strong className="text-text-primary">Cuidados Paliativos:</strong> alívio de náuseas, estímulo de apetite e conforto clínico.
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-text-primary mb-1.5">
          1. O tratamento através do app é legalizado no Brasil?
        </h4>
        <p>
          Sim, 100% legalizado. Toda a atuação é amparada pela{" "}
          <strong>Resolução (RDC) nº 660/2022 da ANVISA</strong>, que autoriza a importação de produtos derivados de Cannabis para uso próprio medicinal mediante prescrição de profissional legalmente habilitado.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-text-primary mb-1.5">
          2. Quanto tempo leva para receber minha receita e laudo?
        </h4>
        <p>
          Após a realização da consulta clínica pelo aplicativo Mecura, sua receita digital assinada e o laudo médico ficam disponíveis em <strong>3 a 5 minutos</strong> na Área do Paciente.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-text-primary mb-1.5">
          3. Qual o papel do aplicativo Mecura?
        </h4>
        <p>
          Somos uma plataforma facilitadora em saúde. Conectamos você ao médico especialista, organizamos sua fila com notificação no app e no WhatsApp, e conduzimos o suporte administrativo junto à ANVISA para a importação legal.
        </p>
      </div>
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onSwitchToLegal("parecer")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline underline-offset-4 cursor-pointer"
        >
          <span>Acessar Parecer Jurídico completo e Leis aplicáveis</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

const INSTITUTIONAL_META: Record<
  Exclude<ModalContentKey, "parecer" | "privacidade" | "termos" | "dados" | "cookies">,
  { title: string; subtitle: string }
> = {
  sobre: {
    title: "Sobre o Instituto Mecura",
    subtitle: "Plataforma de acesso seguro, legal e humanizado à Medicina Canabinoide",
  },
  equipe: {
    title: "Equipe Médico-Científica",
    subtitle: "Especialistas dedicados ao Sistema Endocanabinoide",
  },
  ciencia: {
    title: "Nossa Ciência",
    subtitle: "Homeostase biológica e Fitoterapia Canabinoide",
  },
  tratamentos: {
    title: "Tratamentos Acompanhados",
    subtitle: "Protocolos individualizados com prescrição médica",
  },
  duvidas: {
    title: "Dúvidas Frequentes",
    subtitle: "Legalidade, prescrição e processo ANVISA",
  },
};

export function InfoDrawer({
  contentKey,
  onClose,
}: {
  contentKey: ModalContentKey | null;
  onClose: () => void;
}) {
  const isInitialLegal = contentKey ? LEGAL_MODAL_KEYS.includes(contentKey) : false;
  const [mode, setMode] = useState<"legal" | "institutional">(
    isInitialLegal ? "legal" : "institutional"
  );
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTabKey>("parecer");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCnpj, setCopiedCnpj] = useState(false);

  useEffect(() => {
    if (!contentKey) return;
    if (LEGAL_MODAL_KEYS.includes(contentKey)) {
      setMode("legal");
      setActiveLegalTab(mapToLegalTab(contentKey));
      setSearchQuery(contentKey === "cookies" ? "cookies" : "");
    } else {
      setMode("institutional");
      setSearchQuery("");
    }
  }, [contentKey]);

  useEffect(() => {
    if (!contentKey) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contentKey, onClose]);

  const handleCopyCnpj = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.cnpj);
      setCopiedCnpj(true);
      window.setTimeout(() => setCopiedCnpj(false), 2200);
    } catch {
      setCopiedCnpj(true);
      window.setTimeout(() => setCopiedCnpj(false), 2200);
    }
  };

  const handleSwitchToLegal = (tab: LegalTabKey) => {
    setMode("legal");
    setActiveLegalTab(tab);
    setSearchQuery("");
  };

  const filteredArticles = useMemo<Array<{ tab: LegalTabKey; article: LegalArticle }>>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return LEGAL_ARTICLES[activeLegalTab].map((article) => ({
        tab: activeLegalTab,
        article,
      }));
    }

    const matches: Array<{ tab: LegalTabKey; article: LegalArticle }> = [];
    (Object.keys(LEGAL_ARTICLES) as LegalTabKey[]).forEach((tab) => {
      LEGAL_ARTICLES[tab].forEach((article) => {
        const haystack = [
          article.title,
          article.badge,
          article.lead,
          ...article.paragraphs,
          ...(article.bullets ?? []),
          ...article.keywords,
        ]
          .join(" ")
          .toLowerCase();
        if (haystack.includes(q)) {
          matches.push({ tab, article });
        }
      });
    });
    return matches;
  }, [activeLegalTab, searchQuery]);

  const institutionalKey =
    contentKey && !LEGAL_MODAL_KEYS.includes(contentKey)
      ? (contentKey as Exclude<
          ModalContentKey,
          "parecer" | "privacidade" | "termos" | "dados" | "cookies"
        >)
      : "sobre";

  return (
    <AnimatePresence>
      {contentKey && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={
            mode === "legal"
              ? "Transparência & Jurídico — Instituto Mecura Ltda"
              : INSTITUTIONAL_META[institutionalKey].title
          }
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className={`relative w-full ${
              mode === "legal" ? "max-w-2xl" : "max-w-xl"
            } h-full bg-surface border-l border-border-strong shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-5 sm:p-7 border-b border-border bg-background/70">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent mb-1">
                  {mode === "legal" ? BRAND.legalEntity : "Instituto Mecura · Institucional"}
                </p>
                <h3 className="text-2xl font-display font-medium text-text-primary leading-tight">
                  {mode === "legal"
                    ? "Transparência & Jurídico"
                    : INSTITUTIONAL_META[institutionalKey].title}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {mode === "legal"
                    ? "Parecer técnico-jurídico, LGPD, Termos de Uso e Resguardo Institucional"
                    : INSTITUTIONAL_META[institutionalKey].subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {mode === "legal" && (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    aria-label="Imprimir documentação jurídica"
                    title="Imprimir ou salvar em PDF"
                    className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/60 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar painel"
                  className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-7 flex-1 overflow-y-auto text-sm sm:text-[15px] leading-relaxed text-text-secondary">
              {mode === "legal" ? (
                <div className="space-y-6">
                  {/* Pessoa Jurídica Registrada Card (faithful to official app) */}
                  <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-[#0f1c14] via-[#0b130e] to-[#080d0a] border border-border-strong flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/12 border border-accent/35 flex items-center justify-center text-accent shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                          Pessoa Jurídica Registrada
                        </p>
                        <p className="font-display text-lg font-medium text-text-primary leading-snug">
                          {BRAND.legalEntity}
                        </p>
                        <p className="font-mono text-xs text-text-secondary tabular-nums mt-0.5">
                          CNPJ: <span className="text-text-primary font-semibold">{BRAND.cnpj}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCnpj}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-strong bg-background/80 hover:border-accent text-xs font-semibold text-text-primary hover:text-accent transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedCnpj ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-accent" />
                          <span className="text-accent">CNPJ Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-text-secondary" />
                          <span>Copiar CNPJ</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 4 Interactive Legal Tabs */}
                  <div
                    role="tablist"
                    aria-label="Seções jurídicas"
                    className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-background border border-border"
                  >
                    {LEGAL_TABS.map((tab) => {
                      const isActive = activeLegalTab === tab.key && !searchQuery.trim();
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => {
                            setActiveLegalTab(tab.key);
                            setSearchQuery("");
                          }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer truncate ${
                            isActive
                              ? "bg-accent text-accent-ink shadow-sm"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                          }`}
                        >
                          {tab.shortLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Laws / Articles / Norms */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquisar leis, artigos, normas ou direitos (ex: 660, LGPD, CFM, salvo-conduto)..."
                      aria-label="Pesquisar leis, artigos, normas ou direitos"
                      className="w-full pl-11 pr-10 py-3 rounded-xl bg-background border border-border-strong text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label="Limpar busca"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Dr. Max Warner Santos Souza Highlight Card on Parecer Jurídico tab */}
                  {activeLegalTab === "parecer" && !searchQuery.trim() && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1a11] border border-accent/45 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-0.5">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display text-lg sm:text-xl font-medium text-text-primary leading-snug">
                            {LEGAL_COUNSEL.name}
                          </h4>
                          <p className="text-xs font-semibold text-accent mt-0.5">
                            {LEGAL_COUNSEL.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {LEGAL_COUNSEL.statement}
                      </p>
                    </div>
                  )}

                  {/* Active tab subtitle or search summary */}
                  {searchQuery.trim() ? (
                    <p className="font-mono text-xs text-text-muted">
                      {filteredArticles.length}{" "}
                      {filteredArticles.length === 1
                        ? "dispositivo encontrado"
                        : "dispositivos encontrados"}{" "}
                      para “{searchQuery.trim()}”
                    </p>
                  ) : (
                    <p className="text-xs text-text-muted">
                      {LEGAL_TABS.find((t) => t.key === activeLegalTab)?.description}
                    </p>
                  )}

                  {/* Legal Article Cards */}
                  <div className="space-y-4">
                    {filteredArticles.length === 0 ? (
                      <div className="p-6 rounded-2xl bg-background border border-border text-center space-y-2">
                        <p className="text-sm text-text-primary font-medium">
                          Nenhum dispositivo encontrado para essa busca.
                        </p>
                        <p className="text-xs text-text-muted">
                          Tente pesquisar por “RDC 660”, “LGPD”, “CFM”, “Art. 196”, “salvo-conduto” ou “cookies”.
                        </p>
                      </div>
                    ) : (
                      filteredArticles.map(({ tab, article }) => (
                        <article
                          key={article.id}
                          className="p-5 sm:p-6 rounded-2xl bg-background border border-border hover:border-border-strong transition-colors space-y-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2.5">
                            <h4 className="font-display text-lg font-medium text-text-primary leading-snug max-w-md">
                              {article.number}. {article.title}
                            </h4>
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-accent/12 border border-accent/35 text-accent shrink-0">
                              {article.badge}
                            </span>
                          </div>

                          {searchQuery.trim() && (
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                              Seção: {LEGAL_TABS.find((t) => t.key === tab)?.label}
                            </p>
                          )}

                          <p className="text-sm font-medium text-text-primary/95 leading-relaxed">
                            {article.lead}
                          </p>

                          <div className="space-y-2.5 text-sm text-text-secondary leading-relaxed border-t border-border/70 pt-3">
                            {article.paragraphs.map((p, idx) => (
                              <p key={idx}>{p}</p>
                            ))}

                            {article.bullets && (
                              <ul className="space-y-1.5 pt-1">
                                {article.bullets.map((b) => (
                                  <li key={b} className="flex items-baseline gap-2.5">
                                    <span className="text-accent font-mono text-xs">—</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <InstitutionalContent
                  contentKey={institutionalKey}
                  onSwitchToLegal={handleSwitchToLegal}
                />
              )}
            </div>

            {/* Sticky Drawer Footer CTA */}
            <div className="p-5 sm:p-6 border-t border-border bg-background space-y-3">
              <a
                href={BRAND.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-xl bg-accent text-accent-ink font-semibold text-sm hover:bg-accent-hover transition-colors text-center"
              >
                <span>{BRAND.ctaFull}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>
              <p className="text-[11px] font-mono text-text-muted text-center">
                {BRAND.legalEntity} · CNPJ {BRAND.cnpj} · DPO: {BRAND.email}
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

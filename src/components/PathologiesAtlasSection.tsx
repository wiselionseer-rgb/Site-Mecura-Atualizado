import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus, Search, X } from "lucide-react";
import { BRAND } from "../data/mecuraContent";
import {
  PATHOLOGY_ATLAS,
  PATHOLOGY_CATEGORIES,
  type PathologyCategory,
} from "../data/clinicalScientificData";

export function PathologiesAtlasSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<PathologyCategory>("Todas");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string>(PATHOLOGY_ATLAS[0].id);

  const filteredPathologies = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PATHOLOGY_ATLAS.filter((entry) => {
      const matchesCat =
        selectedCategory === "Todas" || entry.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return [
        entry.name,
        entry.cid10,
        entry.category,
        entry.summary,
        entry.receptors,
        entry.cannabinoidProfile,
        entry.appTools,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [selectedCategory, query]);

  return (
    <div id="patologias" className="scroll-mt-24 space-y-12">
      {/* Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Atlas Clínico · Doenças &amp; Patologias
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.06] tracking-tight text-text-primary">
            Indicações acompanhadas com{" "}
            <span className="italic text-accent">critério médico</span> e CID.
          </h2>
        </div>
        <div className="lg:col-span-5 space-y-3">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Não existe protocolo genérico. Cada patologia exige avaliação individual da relação CBD/THC, interações medicamentosas, via de administração e titulação gradual sob supervisão médica.
          </p>
          <p className="font-mono text-xs text-text-muted tabular-nums">
            {PATHOLOGY_ATLAS.length} grupos clínicos mapeados · CID-10 · Escalas OMS &amp; Cambridge
          </p>
        </div>
      </div>

      {/* Category Filter Tabs + Search Input */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border">
        <div
          role="tablist"
          aria-label="Filtrar patologias por especialidade"
          className="flex flex-wrap gap-1.5"
        >
          {PATHOLOGY_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-accent text-accent-ink font-semibold"
                    : "bg-surface text-text-secondary border border-border hover:border-border-strong hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar doença, CID ou sintoma..."
            aria-label="Buscar doença, CID ou sintoma"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface border border-border-strong text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpar busca de patologia"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Rich Expandable Clinical Matrix */}
      {filteredPathologies.length === 0 ? (
        <div className="p-10 rounded-2xl bg-surface border border-border text-center space-y-3">
          <p className="text-base text-text-primary font-medium">
            Nenhuma patologia encontrada para “{query.trim()}”.
          </p>
          <p className="text-sm text-text-secondary max-w-lg mx-auto">
            Mesmo que sua condição não esteja listada acima, nossos médicos avaliam cada quadro de forma individualizada na triagem clínica.
          </p>
          <a
            href={BRAND.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline underline-offset-4"
          >
            <span>Conversar com o médico sobre meu caso</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="border-t border-border">
          {filteredPathologies.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-6 sm:py-7 flex items-start sm:items-center justify-between gap-4 sm:gap-6 text-left group cursor-pointer"
                >
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-text-muted">
                      <span className="text-accent tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-text-secondary tabular-nums">
                        {item.cid10}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl lg:text-[26px] font-medium text-text-primary group-hover:text-accent transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <Plus
                    className={`w-5 h-5 text-accent shrink-0 mt-1 sm:mt-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-1 space-y-6">
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
                          {item.summary}
                        </p>

                        {/* Precision Clinical Metadata Grid (Hairline dividers, zero pill clutter) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-5 border-t border-border/70">
                          <div className="space-y-1">
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                              Mecanismo Endocanabinoide
                            </p>
                            <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
                              {item.endocannabinoidMechanism}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                              Receptores &amp; Perfil Estudado
                            </p>
                            <p className="font-mono text-xs text-accent">
                              {item.receptors}
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {item.cannabinoidProfile}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                              Ferramentas no App Mecura
                            </p>
                            <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
                              {item.appTools}
                            </p>
                          </div>

                          <div className="space-y-2 flex flex-col justify-between">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                                Grau de Evidência
                              </p>
                              <p className="text-xs text-accent font-medium mt-1">
                                {item.evidenceLevel}
                              </p>
                            </div>
                            <a
                              href={BRAND.appUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary hover:text-accent transition-colors w-fit pt-2"
                            >
                              <span>Avaliar este quadro no app</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Editorial Clinical Disclaimer + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-text-muted max-w-2xl">
          Conteúdo informativo baseado em literatura médica revisada por pares. A indicação, posologia e emissão de receita dependem exclusivamente da avaliação clínica soberana do médico prescritor.
        </p>
        <a
          href={BRAND.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-ink text-xs sm:text-sm font-semibold hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0"
        >
          <span>Iniciar triagem clínica agora</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus, Scale, Search, X } from "lucide-react";
import { BRAND, type ModalContentKey } from "../data/mecuraContent";
import {
  APP_SOLUTIONS,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  type FaqCategory,
} from "../data/clinicalScientificData";

export function FaqAndSolutionsSection({
  onOpenLegal,
}: {
  onOpenLegal: (key: ModalContentKey) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("Todas");
  const [query, setQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const catMatch =
        selectedCategory === "Todas" || item.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return [
        item.question,
        item.answer,
        ...(item.detailPoints ?? []),
        item.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [selectedCategory, query]);

  return (
    <section
      id="duvidas"
      className="py-24 lg:py-36 px-6 lg:px-12 bg-background border-t border-border scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto space-y-24">
        {/* Part 1: Integrated App Solutions */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                Soluções Integradas no Aplicativo
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.06] tracking-tight text-text-primary">
                Tudo o que resolve a sua jornada{" "}
                <span className="italic text-accent">em um só lugar</span>.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                O aplicativo Mecura elimina filas presenciais, papelada fragmentada e incerteza jurídica — reunindo triagem, telemedicina, psicologia, agronomia GACP e importação ANVISA no seu celular.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APP_SOLUTIONS.map((sol) => (
              <article
                key={sol.number}
                className="rounded-2xl bg-surface/75 border border-border p-6 flex flex-col justify-between space-y-4 hover:border-border-strong transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accent tabular-nums">{sol.number}</span>
                    <span className="text-text-muted">{sol.highlight}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-text-primary leading-snug">
                      {sol.title}
                    </h3>
                    <p className="text-xs font-mono text-accent/90 mt-1">
                      {sol.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Part 2: Categorized & Searchable FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-16 border-t border-border">
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                Dúvidas Frequentes
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.08] text-text-primary">
                Respostas diretas, sem{" "}
                <span className="italic text-accent">letras miúdas</span>.
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              Consulte as perguntas mais frequentes sobre planos, emissão da receita em 3 a 5 minutos, autorização ANVISA, papel do psicólogo e dossiê de Habeas Corpus.
            </p>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar dúvida (ex: ANVISA, HC, Pix, CRP)..."
                aria-label="Buscar nas dúvidas frequentes"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface border border-border-strong text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpar busca de dúvidas"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <button
                type="button"
                onClick={() => onOpenLegal("parecer")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-text-primary transition-colors cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Ler Parecer Técnico-Jurídico (OAB/MG 154.052)</span>
              </button>
              <div>
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
                >
                  <span>Ainda tem dúvida? Chamar no WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Category Filter Controls */}
            <div className="flex flex-wrap gap-1.5">
              {FAQ_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
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

            {/* FAQ Accordion List */}
            <div className="border-t border-border">
              {filteredFaqs.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <p className="text-sm text-text-primary font-medium">
                    Nenhuma pergunta encontrada para “{query.trim()}”.
                  </p>
                  <a
                    href={BRAND.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <span>Perguntar diretamente à nossa Central no WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="border-b border-border">
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? "" : faq.id)}
                        aria-expanded={isOpen}
                        className="w-full py-6 flex items-start justify-between gap-5 text-left group cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                            {faq.category}
                          </span>
                          <span className="block font-display text-lg sm:text-xl font-medium text-text-primary group-hover:text-accent transition-colors leading-snug">
                            {faq.question}
                          </span>
                        </div>
                        <Plus
                          className={`w-5 h-5 text-accent shrink-0 mt-1 transition-transform duration-300 ${
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
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 space-y-3 text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                              <p>{faq.answer}</p>
                              {faq.detailPoints && (
                                <ul className="space-y-2 pt-2 border-t border-border/70">
                                  {faq.detailPoints.map((pt) => (
                                    <li
                                      key={pt}
                                      className="flex items-baseline gap-2.5 text-sm text-text-primary/90"
                                    >
                                      <span className="text-accent font-mono text-xs">
                                        —
                                      </span>
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const STATEMENT =
  "Da semente ao paciente. Conectamos você a médicos prescritores especialistas e cuidamos de toda a autorização na ANVISA para que o seu tratamento comece sem burocracia.";

const ScrubWord: React.FC<{
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}> = ({ word, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(1, start + 1.8 / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const isAccent = word === "semente" || word === "paciente." || word === "ANVISA";

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.26em] ${
        isAccent ? "italic text-accent" : "text-text-primary"
      }`}
    >
      {word}
    </motion.span>
  );
}

export function EditorialManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 82%", "end 45%"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={containerRef}
      className="py-28 sm:py-36 lg:py-48 px-6 lg:px-12 bg-background"
    >
      <div className="max-w-[1160px] mx-auto">
        <p className="font-display font-normal text-[clamp(1.9rem,4.4vw,3.9rem)] leading-[1.16] tracking-[-0.02em] max-w-none">
          {words.map((word, idx) => (
            <ScrubWord
              key={`${word}-${idx}`}
              word={word}
              index={idx}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </p>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-text-secondary">
          <p className="max-w-lg text-sm sm:text-base">
            Plataforma facilitadora em saúde operando integralmente sob a Resolução RDC nº 660/2022 da ANVISA, diretrizes do CFM e proteção de dados LGPD.
          </p>
          <span className="font-mono text-xs text-text-muted whitespace-nowrap tabular-nums">
            Instituto Mecura Ltda · CNPJ 69.202.927/0001-19
          </span>
        </div>
      </div>
    </section>
  );
}

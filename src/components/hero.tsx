"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EMBERS = [
  { left: "6%", size: 3, delay: 0, duration: 9 },
  { left: "14%", size: 2, delay: 2.2, duration: 11 },
  { left: "23%", size: 4, delay: 4.1, duration: 8 },
  { left: "34%", size: 2, delay: 1.1, duration: 12 },
  { left: "45%", size: 3, delay: 3.4, duration: 10 },
  { left: "58%", size: 2, delay: 0.6, duration: 9.5 },
  { left: "67%", size: 4, delay: 5, duration: 11 },
  { left: "76%", size: 2, delay: 2.8, duration: 8.5 },
  { left: "85%", size: 3, delay: 1.7, duration: 10.5 },
  { left: "93%", size: 2, delay: 4.6, duration: 9 },
];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        {EMBERS.map((ember, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: ember.left,
              width: ember.size,
              height: ember.size,
              animationDelay: `${ember.delay}s`,
              animationDuration: `${ember.duration}s`,
            }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-sm font-medium tracking-[0.2em] text-accent uppercase"
      >
        {t("greeting")}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-glow mt-3 text-4xl font-semibold tracking-tight text-accent sm:text-6xl"
      >
        {t("name")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl"
      >
        {t("title")}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 max-w-xl whitespace-pre-line text-base text-muted-foreground"
      >
        {t("tagline")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex items-center gap-4"
      >
        <a
          href="#about"
          className="shimmer-btn rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-[0_0_20px_var(--glow)] transition-transform hover:scale-[1.03]"
        >
          {t("cta")}
        </a>
        <a
          href="#contact"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:bg-muted"
        >
          {t("contactCta")}
        </a>
      </motion.div>
    </section>
  );
}

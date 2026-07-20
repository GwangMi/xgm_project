"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-130%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "130%"]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="bg-dots relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-ink py-24 text-paper"
      style={{ ["--dot-color" as string]: "rgba(244,242,234,0.18)" }}
    >
      <div className="flex flex-col gap-8 py-6 sm:gap-10">
        <motion.p
          style={{ x: xLeft }}
          className="font-display -rotate-2 pr-[15vw] pl-4 text-left text-[9.5vw] leading-[0.95] whitespace-nowrap text-paper sm:pr-[10vw] sm:text-[5.5vw]"
        >
          {t("title")}
        </motion.p>
        <motion.p
          style={{ x: xRight }}
          className="font-script rotate-1 pr-4 pl-[6vw] text-right text-[7.5vw] leading-[1.1] whitespace-nowrap text-teal sm:pl-[10vw] sm:text-[4.2vw]"
        >
          {t("name")}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mx-auto mt-10 flex max-w-xl flex-col items-center px-6 text-center"
      >
        <p className="whitespace-pre-line text-base text-muted-dark sm:text-lg">
          {t("tagline")}
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a
            href="#about"
            className="brutal-shadow-teal rounded-none border-2 border-teal bg-teal px-6 py-3 text-sm font-bold text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            {t("cta")}
          </a>
          <a
            href="#contact"
            className="rounded-none border-2 border-paper px-6 py-3 text-sm font-bold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            {t("contactCta")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

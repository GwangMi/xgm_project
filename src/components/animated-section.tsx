"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export function AnimatedSection({
  id,
  className,
  style,
  children,
}: {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className} style={style}>
      {children}
    </section>
  );
}

export function AnimatedItem({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

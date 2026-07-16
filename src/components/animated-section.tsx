"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

export function AnimatedSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedItem({
  className,
  delay = 0,
  tilt = false,
  children,
}: {
  className?: string;
  delay?: number;
  tilt?: boolean;
  children: ReactNode;
}) {
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useSpring(0, { stiffness: 300, damping: 30 });
  const glowBackground = useMotionTemplate`radial-gradient(240px circle at ${glowX}% ${glowY}%, var(--glow), transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handlePointerEnter() {
    if (!tilt) return;
    glowOpacity.set(1);
  }

  function handlePointerLeave() {
    if (!tilt) return;
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  }

  return (
    <motion.div
      className={className}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 800,
              position: "relative",
              zIndex: 0,
            }
          : undefined
      }
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {tilt && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glowBackground, opacity: glowOpacity, zIndex: -1 }}
        />
      )}
      {children}
    </motion.div>
  );
}

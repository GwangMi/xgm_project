"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Burst = {
  id: number;
  x: number;
  y: number;
  pieces: { dx: number; dy: number; rotate: number; color: string }[];
};

const COLORS = ["bg-teal", "bg-coral", "bg-paper", "bg-ink"];

export function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea")) return;

      const id = counter.current++;
      const pieces = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        const distance = 30 + Math.random() * 30;
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          rotate: Math.random() * 180 - 90,
          color: COLORS[i % COLORS.length],
        };
      });
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY, pieces }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-90">
      <AnimatePresence>
        {bursts.map((burst) => (
          <span
            key={burst.id}
            className="absolute"
            style={{ left: burst.x, top: burst.y }}
          >
            {burst.pieces.map((piece, i) => (
              <motion.span
                key={i}
                className={`absolute size-2 border border-ink ${piece.color}`}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: piece.dx,
                  y: piece.dy,
                  opacity: 0,
                  rotate: piece.rotate,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </span>
        ))}
      </AnimatePresence>
    </div>
  );
}

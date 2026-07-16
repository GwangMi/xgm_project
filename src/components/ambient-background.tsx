"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      glowRef.current?.style.setProperty("--mx", `${e.clientX}px`);
      glowRef.current?.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-parchment-grain opacity-60 dark:opacity-0 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-stars opacity-0 dark:opacity-70 transition-opacity duration-700" />
      <div ref={glowRef} className="absolute inset-0 cursor-glow opacity-0 dark:opacity-100" />
    </div>
  );
}

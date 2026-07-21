"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Burst = {
  id: number;
  x: number;
  y: number;
  pieces: { dx: number; dy: number; rotate: number }[];
};

const EAT_DISTANCE = 12;

export function CursorTrail() {
  const [active, setActive] = useState(false);
  const [dotHidden, setDotHidden] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const burstCounter = useRef(0);
  const wasFar = useRef(false);
  const waitingForMove = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.4 });
  const trailX = useSpring(x, { damping: 30, stiffness: 120, mass: 0.6 });
  const trailY = useSpring(y, { damping: 30, stiffness: 120, mass: 0.6 });

  const vx = useVelocity(trailX);
  const vy = useVelocity(trailY);
  const lastAngle = useRef(0);
  const rotate = useTransform([vx, vy], (latest) => {
    const [latestVx, latestVy] = latest as [number, number];
    const speed = Math.hypot(latestVx, latestVy);
    if (speed > 60) {
      lastAngle.current = Math.atan2(latestVy, latestVx) * (180 / Math.PI);
    }
    return lastAngle.current;
  });

  useAnimationFrame(() => {
    const dist = Math.hypot(trailX.get() - springX.get(), trailY.get() - springY.get());

    if (dist >= EAT_DISTANCE) {
      wasFar.current = true;
      return;
    }
    if (!wasFar.current) return;

    wasFar.current = false;
    const id = burstCounter.current++;
    const originX = springX.get();
    const originY = springY.get();
    const pieces = Array.from({ length: 8 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
      const pieceDistance = 18 + Math.random() * 20;
      return {
        dx: Math.cos(angle) * pieceDistance,
        dy: Math.sin(angle) * pieceDistance,
        rotate: Math.random() * 180 - 90,
      };
    });
    setBursts((prev) => [...prev, { id, x: originX, y: originY, pieces }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 550);

    setDotHidden(true);
    waitingForMove.current = true;
  });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
      if (waitingForMove.current) {
        waitingForMove.current = false;
        setDotHidden(false);
      }
    };
    const handleLeave = () => setActive(false);

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-90 hidden sm:block"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <motion.span
        className="pacman absolute size-8"
        style={{
          left: trailX,
          top: trailY,
          rotate,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.span
        className="absolute size-2 rounded-full bg-coral"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: dotHidden ? 0 : 1,
        }}
      />
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
                className="absolute size-1.5 rounded-full bg-coral"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: piece.dx,
                  y: piece.dy,
                  opacity: 0,
                  scale: 0.4,
                  rotate: piece.rotate,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            ))}
          </span>
        ))}
      </AnimatePresence>
    </div>
  );
}

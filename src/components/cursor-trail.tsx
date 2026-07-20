"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CursorTrail() {
  const [active, setActive] = useState(false);
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

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
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
        style={{ left: springX, top: springY, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}

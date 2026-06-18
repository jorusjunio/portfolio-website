"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Variant =
  | "rings"
  | "grid"
  | "orbs"
  | "dots"
  | "cross"
  | "triangle"
  | "diamond"
  | "bars"
  | "sphere"
  | "arc";

const positions: Record<Variant, string> = {
  rings: "right-[-5rem] top-[10%]",
  grid: "left-[-4rem] top-[14%]",
  orbs: "right-[6%] top-[4%]",
  dots: "right-[-3rem] top-[12%]",
  cross: "left-[4%] bottom-[6%]",
  triangle: "right-[7%] bottom-[4%]",
  diamond: "left-[6%] bottom-[8%]",
  bars: "right-[8%] top-[8%]",
  sphere: "right-[-3rem] bottom-[-3rem]",
  arc: "left-[-2rem] bottom-[6%]",
};

// How far each shape rotates across the section's scroll range (degrees).
const rotateEnd: Record<Variant, number> = {
  rings: 38,
  grid: -20,
  orbs: 0,
  dots: 0,
  cross: 18,
  triangle: 26,
  diamond: 45,
  bars: 0,
  sphere: -30,
  arc: 24,
};

function Shape({ variant }: { variant: Variant }) {
  switch (variant) {
    case "rings":
      return (
        <div className="relative grid h-[300px] w-[300px] place-items-center">
          {[300, 230, 160, 90].map((size) => (
            <span
              key={size}
              style={{ width: size, height: size }}
              className="absolute rounded-full border border-[#00FF87]/15"
            />
          ))}
          <span className="absolute h-2 w-2 rounded-full bg-[#00FF87]/50" />
        </div>
      );
    case "grid":
      return (
        <div className="h-[340px] w-[340px] border border-white/[0.06] [background-image:linear-gradient(rgba(0,255,135,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,135,0.1)_1px,transparent_1px)] [background-size:42px_42px]" />
      );
    case "orbs":
      return (
        <div className="relative h-[280px] w-[280px]">
          <span className="absolute left-0 top-0 h-56 w-56 rounded-full bg-[#00FF87]/12 blur-3xl" />
          <span className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-white/[0.05] blur-3xl" />
        </div>
      );
    case "dots":
      return (
        <div className="h-[300px] w-[300px] [background-image:radial-gradient(rgba(0,255,135,0.26)_1.4px,transparent_1.6px)] [background-size:26px_26px]" />
      );
    case "cross":
      return (
        <div className="relative h-[300px] w-[300px]">
          {[
            [10, 0],
            [120, 150],
            [230, 40],
            [170, 240],
            [40, 250],
          ].map(([x, y], i) => (
            <span
              key={i}
              style={{ left: x, top: y }}
              className="absolute text-2xl font-thin leading-none text-[#00FF87]/30"
            >
              +
            </span>
          ))}
        </div>
      );
    case "triangle":
      return (
        <div
          className="h-[260px] w-[260px] border border-[#00FF87]/16"
          style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
        />
      );
    case "diamond":
      return (
        <div className="relative grid h-[240px] w-[240px] place-items-center">
          {[240, 160, 90].map((size) => (
            <span
              key={size}
              style={{ width: size, height: size }}
              className="absolute rotate-45 border border-[#00FF87]/14"
            />
          ))}
        </div>
      );
    case "bars":
      return (
        <div className="flex h-[220px] w-[260px] items-end gap-3">
          {[0.45, 0.8, 0.3, 0.95, 0.55, 0.7, 0.4].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h * 100}%` }}
              className="w-3 flex-1 rounded-sm bg-gradient-to-t from-[#00FF87]/5 to-[#00FF87]/22"
            />
          ))}
        </div>
      );
    case "sphere":
      return (
        <div className="relative grid h-[320px] w-[320px] place-items-center">
          <span className="absolute h-[320px] w-[320px] rounded-full border border-[#00FF87]/14" />
          {[320, 320, 320].map((s, i) => (
            <span
              key={i}
              style={{
                width: i === 1 ? s : s * 0.55,
                height: s,
                transform: `rotate(${i * 60}deg)`,
              }}
              className="absolute rounded-[50%] border border-[#00FF87]/12"
            />
          ))}
        </div>
      );
    case "arc":
      return (
        <div className="relative h-[300px] w-[300px]">
          {[300, 220, 140].map((size) => (
            <span
              key={size}
              style={{ width: size, height: size }}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-transparent border-r-[#00FF87]/22 border-t-[#00FF87]/22"
            />
          ))}
        </div>
      );
  }
}

type ScrollDecorProps = {
  variant: Variant;
  /** Optional Tailwind position override (defaults per variant). */
  position?: string;
  /** "in" zooms toward the viewer on scroll, "out" zooms away. */
  zoom?: "in" | "out";
};

/**
 * A subtle, scroll-reactive decorative object placed behind a section's
 * content. As the section crosses the viewport the object zooms, drifts, and
 * (for some variants) rotates, then fades at the edges. Each section uses a
 * different mix of variants. Disabled for reduced-motion users.
 */
export default function ScrollDecor({
  variant,
  position,
  zoom = "in",
}: ScrollDecorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = zoom === "in" ? [0.65, 1, 1.45] : [1.4, 1, 0.7];
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], range);
  const scale = useSpring(scaleRaw, { stiffness: 70, damping: 28, mass: 0.5 });

  const yRaw = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 30, mass: 0.4 });

  const rotateRaw = useTransform(scrollYProgress, [0, 1], [0, rotateEnd[variant]]);
  const rotate = useSpring(rotateRaw, { stiffness: 60, damping: 30 });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0],
  );

  const disabled = mounted && reduce;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className={`absolute ${position ?? positions[variant]}`}
        style={disabled ? { opacity: 0.18 } : { scale, y, rotate, opacity }}
      >
        <Shape variant={variant} />
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Variant = "emerald" | "teal" | "mint" | "cyan" | "violet" | "aqua";
type Side = "left" | "right" | "top" | "bottom";

// [primary, secondary] muted greenish aurora colours per section.
const variants: Record<Variant, [string, string]> = {
  emerald: ["rgba(80,200,150,0.26)", "rgba(60,180,160,0.16)"],
  teal: ["rgba(60,195,170,0.24)", "rgba(95,200,150,0.16)"],
  mint: ["rgba(125,205,145,0.22)", "rgba(70,195,160,0.16)"],
  cyan: ["rgba(70,195,175,0.24)", "rgba(100,200,155,0.16)"],
  violet: ["rgba(75,200,160,0.22)", "rgba(110,205,150,0.16)"],
  aqua: ["rgba(60,205,175,0.24)", "rgba(95,200,150,0.16)"],
};

const dirMap: Record<Side, string> = {
  left: "to right",
  right: "to left",
  top: "to bottom",
  bottom: "to top",
};

// Fade the band along its length so it never hard-clips at a section edge.
const verticalMask =
  "linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%)";
const horizontalMask =
  "linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)";

type AuraGlowProps = {
  /** Position + size utility classes, e.g. "left-[-8rem] top-[8%] h-[84%] w-[34rem]". */
  className: string;
  /** Aurora colour style (varies per section). */
  variant?: Variant;
  /** Which edge the glow runs parallel to / fades away from. */
  side?: Side;
  /** Animation start offset in seconds, for variety. */
  delay?: number;
  /** Drift cycle duration in seconds (cinematic = slow). */
  duration?: number;
  /** Scroll-parallax travel in px. */
  parallax?: number;
  /** Blur amount utility class. */
  blur?: string;
};

/**
 * A soft "parallel" aurora glow that runs along a section edge: a directional
 * gradient band (brightest at the edge, fading inward) that gently drifts
 * along the edge and breathes — cinematic, not a round blob. Static for
 * reduced-motion users.
 */
export default function AuraGlow({
  className,
  variant = "emerald",
  side = "left",
  delay = 0,
  duration = 18,
  parallax = 50,
  blur = "blur-[60px]",
}: AuraGlowProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 30, mass: 0.5 });

  const [a, b] = variants[variant];
  const isVertical = side === "left" || side === "right";
  const dir = dirMap[side];
  const disabled = mounted && reduce;

  const baseStyle = {
    mixBlendMode: "screen" as const,
    WebkitMaskImage: isVertical ? verticalMask : horizontalMask,
    maskImage: isVertical ? verticalMask : horizontalMask,
  };

  // Drift along the edge (vertical sides drift up/down; horizontal drift left/right).
  const driftA = isVertical
    ? { y: ["-8%", "8%", "-8%"], opacity: [0.5, 0.9, 0.5] }
    : { x: ["-8%", "8%", "-8%"], opacity: [0.5, 0.9, 0.5] };
  const driftB = isVertical
    ? { y: ["7%", "-7%", "7%"], opacity: [0.4, 0.8, 0.4] }
    : { x: ["7%", "-7%", "7%"], opacity: [0.4, 0.8, 0.4] };

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className}`}
      style={
        disabled
          ? { ...baseStyle, opacity: 0.5 }
          : { ...baseStyle, y, opacity: 0.9 }
      }
    >
      {/* Primary directional band */}
      <motion.div
        className={`absolute inset-0 ${blur}`}
        style={{
          background: `linear-gradient(${dir}, ${a} 0%, ${b} 36%, transparent 74%)`,
        }}
        animate={reduce ? undefined : driftA}
        transition={
          reduce ? undefined : { duration, repeat: Infinity, ease: "easeInOut", delay }
        }
      />
      {/* Secondary softer band, opposite drift, for organic depth */}
      <motion.div
        className={`absolute inset-0 ${blur}`}
        style={{
          background: `linear-gradient(${dir}, ${b} 0%, transparent 60%)`,
          opacity: 0.7,
        }}
        animate={reduce ? undefined : driftB}
        transition={
          reduce
            ? undefined
            : { duration: duration * 1.25, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
        }
      />
    </motion.div>
  );
}

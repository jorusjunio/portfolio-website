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
  emerald: ["rgba(80,200,150,0.16)", "rgba(60,180,160,0.09)"],
  teal: ["rgba(60,195,170,0.15)", "rgba(95,200,150,0.09)"],
  mint: ["rgba(125,205,145,0.13)", "rgba(70,195,160,0.09)"],
  cyan: ["rgba(70,195,175,0.15)", "rgba(100,200,155,0.09)"],
  violet: ["rgba(75,200,160,0.13)", "rgba(110,205,150,0.09)"],
  aqua: ["rgba(60,205,175,0.15)", "rgba(95,200,150,0.09)"],
};

// Bias the soft glow toward the edge it sits against so it bleeds in from
// the rim rather than floating as a centred blob.
const originMap: Record<Side, string> = {
  left: "20% 50%",
  right: "80% 50%",
  top: "50% 20%",
  bottom: "50% 80%",
};

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
  blur = "blur-[120px]",
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
  const origin = originMap[side];
  const disabled = mounted && reduce;

  const baseStyle = {
    mixBlendMode: "screen" as const,
  };

  // Very gentle breathe only — no positional drift — so the glow reads as a
  // soft, faded gradient bleeding off the edge rather than a moving band.
  const breatheA = { opacity: [0.34, 0.52, 0.34], scale: [1, 1.06, 1] };
  const breatheB = isVertical
    ? { y: ["-4%", "4%", "-4%"], opacity: [0.22, 0.36, 0.22] }
    : { x: ["-4%", "4%", "-4%"], opacity: [0.22, 0.36, 0.22] };

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${className}`}
      style={
        disabled
          ? { ...baseStyle, opacity: 0.45 }
          : { ...baseStyle, y, opacity: 1 }
      }
    >
      {/* Primary soft radial glow — wide, feathered falloff to transparent. */}
      <motion.div
        className={`absolute inset-0 ${blur}`}
        style={{
          background: `radial-gradient(70% 70% at ${origin}, ${a} 0%, ${b} 38%, transparent 74%)`,
        }}
        animate={reduce ? undefined : breatheA}
        transition={
          reduce ? undefined : { duration, repeat: Infinity, ease: "easeInOut", delay }
        }
      />
      {/* Secondary wash for organic depth, drifting opposite and slower. */}
      <motion.div
        className={`absolute inset-0 ${blur}`}
        style={{
          background: `radial-gradient(80% 80% at ${origin}, ${b} 0%, transparent 64%)`,
          opacity: 0.5,
        }}
        animate={reduce ? undefined : breatheB}
        transition={
          reduce
            ? undefined
            : { duration: duration * 1.25, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
        }
      />
    </motion.div>
  );
}

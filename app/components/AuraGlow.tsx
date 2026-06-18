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

// [primary, secondary] aurora colours per section (green + pink/violet etc.).
const variants: Record<Variant, [string, string]> = {
  emerald: ["rgba(60,255,150,0.28)", "rgba(255,110,190,0.16)"],
  teal: ["rgba(0,235,210,0.26)", "rgba(150,110,255,0.16)"],
  mint: ["rgba(150,255,130,0.24)", "rgba(255,120,200,0.16)"],
  cyan: ["rgba(0,220,255,0.24)", "rgba(150,120,255,0.16)"],
  violet: ["rgba(170,110,255,0.24)", "rgba(80,255,160,0.18)"],
  aqua: ["rgba(0,255,200,0.26)", "rgba(255,120,200,0.15)"],
};

// Curtain-free soft feather so the cloud blends seamlessly at every edge.
const mask = "radial-gradient(closest-side at 50% 50%, #000 34%, transparent 100%)";

type AuraGlowProps = {
  /** Position + size utility classes, e.g. "left-[-12rem] top-[10%] h-[28rem] w-[28rem]". */
  className: string;
  /** Aurora colour style (varies per section). */
  variant?: Variant;
  /** Animation start offset in seconds, for variety. */
  delay?: number;
  /** Base billow cycle duration in seconds (cinematic = slow). */
  duration?: number;
  /** Vertical scroll-parallax travel in px. */
  parallax?: number;
  /** Blur amount utility class. */
  blur?: string;
};

/**
 * A soft, spread-out aurora that drifts like slow smoke / clouds: a few
 * heavily-blurred colour blooms billow on different cycles (scale, drift,
 * slow rotation) for an organic cinematic feel, plus a scroll parallax.
 * Feathered on all sides so it stays seamless. Static for reduced-motion.
 */
export default function AuraGlow({
  className,
  variant = "emerald",
  delay = 0,
  duration = 26,
  parallax = 60,
  blur = "blur-[64px]",
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
  const disabled = mounted && reduce;
  const baseStyle = {
    mixBlendMode: "screen" as const,
    WebkitMaskImage: mask,
    maskImage: mask,
  };

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
      {/* Billowing cloud A (primary colour) */}
      <motion.div
        className={`absolute inset-[-45%] ${blur}`}
        style={{
          background: `radial-gradient(58% 52% at 38% 42%, ${a} 0%, transparent 70%)`,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ["-10%", "9%", "-10%"],
                y: ["-7%", "8%", "-7%"],
                scale: [0.9, 1.16, 0.9],
                rotate: [0, 9, 0],
              }
        }
        transition={
          reduce ? undefined : { duration, repeat: Infinity, ease: "easeInOut", delay }
        }
      />

      {/* Billowing cloud B (secondary colour, opposite drift) */}
      <motion.div
        className={`absolute inset-[-45%] ${blur}`}
        style={{
          background: `radial-gradient(56% 50% at 64% 62%, ${b} 0%, transparent 70%)`,
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ["9%", "-9%", "9%"],
                y: ["8%", "-7%", "8%"],
                scale: [1.12, 0.9, 1.12],
                rotate: [0, -11, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : { duration: duration * 1.25, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
        }
      />

      {/* Soft drifting core (primary, dimmer) for extra depth */}
      <motion.div
        className={`absolute inset-[-35%] ${blur}`}
        style={{
          background: `radial-gradient(50% 48% at 52% 50%, ${a} 0%, transparent 72%)`,
          opacity: 0.6,
        }}
        animate={
          reduce
            ? undefined
            : { x: ["-5%", "6%", "-5%"], y: ["5%", "-6%", "5%"], scale: [1, 1.2, 1] }
        }
        transition={
          reduce
            ? undefined
            : { duration: duration * 0.85, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }
        }
      />
    </motion.div>
  );
}

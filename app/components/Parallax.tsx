"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useIsClient } from "./useIsClient";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px across the element's full scroll range. */
  offset?: number;
};

/**
 * Subtle scroll-linked vertical parallax for content (not the background).
 * The element drifts from +offset to -offset as it crosses the viewport,
 * adding depth. Disabled when the user prefers reduced motion.
 */
export default function Parallax({
  children,
  className,
  offset = 40,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Keep SSR and the first client render identical to avoid a hydration
  // mismatch; only drop the transform after mount when motion is reduced.
  const mounted = useIsClient();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={mounted && reduce ? undefined : { y: smoothY }}
    >
      {children}
    </motion.div>
  );
}

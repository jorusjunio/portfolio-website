"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Fraction of the section that must be in view before it reveals. */
  amount?: number;
};

/**
 * A section wrapper that gently fades + lifts into view once on scroll, giving
 * every section the same smooth entrance as the main portfolio page. Static for
 * reduced-motion users.
 */
export default function MotionSection({
  children,
  className,
  id,
  amount = 0.18,
}: MotionSectionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

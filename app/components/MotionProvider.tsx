"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Globally respects the user's "reduce motion" setting. With `reducedMotion="user"`,
 * framer-motion disables transform/layout animations (including the infinite
 * rotating rings, pulses, and scan-lines) for those users, while still allowing
 * gentle opacity changes.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

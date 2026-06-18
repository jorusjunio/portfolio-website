"use client";

import { motion, useReducedMotion } from "framer-motion";

// Two star layers with slightly different tints/positions for depth.
const layerA =
  "radial-gradient(1.2px 1.2px at 12% 18%, rgba(255,255,255,0.9), transparent 60%)," +
  "radial-gradient(1px 1px at 26% 44%, rgba(190,225,255,0.8), transparent 60%)," +
  "radial-gradient(1.4px 1.4px at 44% 12%, rgba(255,255,255,0.85), transparent 60%)," +
  "radial-gradient(1px 1px at 63% 30%, rgba(200,235,255,0.75), transparent 60%)," +
  "radial-gradient(1.2px 1.2px at 78% 16%, rgba(255,255,255,0.8), transparent 60%)," +
  "radial-gradient(1px 1px at 88% 40%, rgba(190,225,255,0.7), transparent 60%)," +
  "radial-gradient(1.3px 1.3px at 36% 70%, rgba(255,255,255,0.8), transparent 60%)," +
  "radial-gradient(1px 1px at 70% 64%, rgba(200,235,255,0.7), transparent 60%)," +
  "radial-gradient(1.2px 1.2px at 92% 76%, rgba(255,255,255,0.75), transparent 60%)";

const layerB =
  "radial-gradient(1px 1px at 18% 62%, rgba(170,255,220,0.7), transparent 60%)," +
  "radial-gradient(1px 1px at 32% 26%, rgba(255,255,255,0.7), transparent 60%)," +
  "radial-gradient(1.2px 1.2px at 52% 52%, rgba(180,230,255,0.7), transparent 60%)," +
  "radial-gradient(1px 1px at 58% 84%, rgba(255,255,255,0.65), transparent 60%)," +
  "radial-gradient(1px 1px at 82% 58%, rgba(170,255,220,0.65), transparent 60%)," +
  "radial-gradient(1.1px 1.1px at 8% 84%, rgba(255,255,255,0.6), transparent 60%)," +
  "radial-gradient(1px 1px at 48% 92%, rgba(190,225,255,0.6), transparent 60%)";

/**
 * A faint starfield that gently twinkles, sized to its section. Two layers
 * pulse on different cycles for a subtle living-sky feel. Static for
 * reduced-motion users.
 */
export default function Starfield({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: layerA }}
        animate={reduce ? undefined : { opacity: [0.55, 0.95, 0.55] }}
        transition={
          reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: layerB }}
        animate={reduce ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={
          reduce
            ? undefined
            : { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
        }
      />
    </div>
  );
}

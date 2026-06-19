"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";

const textClass =
  "whitespace-nowrap text-[clamp(4.2rem,20vw,19rem)] font-black uppercase leading-[0.75] tracking-normal";

function NameText() {
  return (
    <>
      Jorus<span className="text-[#5fb996]">.</span>
    </>
  );
}

/**
 * The footer name with a cinematic rack-focus hover: the white name stays
 * softly blurred, while a sharp white copy is masked to a circle that follows
 * the cursor on hover — so only the area around the pointer comes into focus.
 * Reduced-motion users get a plain, fully-sharp name.
 */
export default function SpotlightName() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  if (reduce) {
    return (
      <p
        className={`select-none text-white ${textClass} [text-shadow:0_0_60px_rgba(46,230,160,0.25)]`}
      >
        <NameText />
      </p>
    );
  }

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-hovering={hovering}
      className="spotlight-name relative inline-block cursor-default select-none"
    >
      {/* White base — blurs on hover. */}
      <p
        className={`spotlight-name__blur ${textClass} text-white [text-shadow:0_0_60px_rgba(46,230,160,0.18)]`}
      >
        <NameText />
      </p>
      {/* Sharp white focus — masked to a circle that tracks the cursor. */}
      <p
        aria-hidden
        className={`spotlight-name__focus absolute inset-0 ${textClass} text-white`}
      >
        <NameText />
      </p>
    </motion.div>
  );
}

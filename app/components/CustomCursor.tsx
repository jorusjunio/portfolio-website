"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, summary, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

/**
 * A Figma-style arrow pointer in the brand accent color. Follows the mouse
 * instantly (no lag, like a real cursor), nudges on hover/press. Only enabled
 * on fine-pointer devices with motion allowed — otherwise the native cursor
 * is used.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHidden(false);
    };
    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        INTERACTIVE_SELECTOR,
      );
      setActive(Boolean(target));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-arrow"
      style={{ x, y }}
      animate={{
        scale: pressed ? 0.82 : active ? 1.18 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        style={{ transform: "translate(-3px, -3px)" }}
      >
        <path
          d="M5 4 L23 11 L17 15 L19 24 Z"
          fill="#1c1c1c"
          stroke="#1c1c1c"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

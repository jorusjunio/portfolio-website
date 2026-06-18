"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealHeadingProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  amount?: number;
};

const inner: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%" },
};

/**
 * Renders a heading whose text "opens" upward from behind a clip mask when
 * it scrolls into view — a premium reveal for large typography. The in-view
 * trigger lives on the (untransformed) mask so detection stays accurate.
 */
export default function RevealHeading({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  amount = 0.35,
}: RevealHeadingProps) {
  return (
    <Tag className={className}>
      <motion.span
        className="block overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
      >
        <motion.span
          className="block will-change-transform"
          variants={inner}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
        >
          {children}
        </motion.span>
      </motion.span>
    </Tag>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const logoSrc = "/assets/logo/J logo without bg.png";

export default function IntroAnimation() {
  const shouldReduceMotion = useReducedMotion();
  // Avoid a hydration mismatch: render the full markup on the server and the
  // first client paint, then switch to the reduced variant after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && shouldReduceMotion) {
    return (
      <div
        aria-label="Opening portfolio animation"
        className="intro-shell pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#050505] text-white"
      >
        <Image
          src={logoSrc}
          alt="Jorus logo"
          width={92}
          height={92}
          priority
          className="h-20 w-20 object-contain invert drop-shadow-[0_0_28px_rgba(95,185,150,0.5)] sm:h-24 sm:w-24"
        />
      </div>
    );
  }

  return (
    <div
      aria-label="Opening portfolio animation"
      className="intro-shell pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[#050505] text-white"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(95,185,150,0.18),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_36%),linear-gradient(180deg,#020202_0%,#080d14_58%,#020202_100%)]"
        initial={{ scale: 1.08, opacity: 0.72 }}
        animate={{ scale: [1.08, 1, 1.03], opacity: [0.72, 1, 0.88] }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(95,185,150,0.16)_1px,transparent_1px)] [background-size:58px_58px]"
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: [0, 0.16, 0.08], y: [-28, 0, 16] }}
        transition={{ duration: 2.3, ease: "easeOut" }}
      />

      <motion.div
        className="absolute left-0 right-0 top-0 h-[18vh] bg-black"
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "-8%"] }}
        transition={{ duration: 2.5, times: [0, 0.2, 0.82, 1], ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[18vh] bg-black"
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "8%"] }}
        transition={{ duration: 2.5, times: [0, 0.2, 0.82, 1], ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute inset-y-0 -left-1/3 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),rgba(95,185,150,0.24),transparent)] blur-xl"
        initial={{ x: "-25%", skewX: -18, opacity: 0 }}
        animate={{ x: ["-25%", "175%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.62 }}
      />

      <div className="absolute inset-0 grid place-items-center px-6">
        <motion.div
          className="relative grid size-72 place-items-center sm:size-96"
          initial={{ scale: 0.86, opacity: 0, rotateX: 22 }}
          animate={{ scale: [0.86, 1.03, 1], opacity: [0, 1, 1], rotateX: [22, 0, 0] }}
          transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <motion.div
            className="absolute inset-2 rounded-full border border-[#5fb996]/26 shadow-[0_0_80px_rgba(95,185,150,0.14)]"
            initial={{ scale: 0.58, opacity: 0, rotate: -70 }}
            animate={{ scale: [0.58, 1.05, 1.18], opacity: [0, 0.88, 0], rotate: 135 }}
            transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-10 rounded-full border border-white/14"
            initial={{ scale: 0.72, opacity: 0, rotate: 80 }}
            animate={{ scale: [0.72, 1, 1.08], opacity: [0, 0.7, 0], rotate: -120 }}
            transition={{ duration: 2.05, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
          />
          <motion.div
            className="absolute size-52 rounded-full bg-[conic-gradient(from_130deg,transparent,rgba(95,185,150,0.62),transparent_42%,rgba(255,255,255,0.28),transparent_72%)] blur-lg sm:size-72"
            initial={{ scale: 0.45, rotate: -90, opacity: 0 }}
            animate={{ scale: [0.45, 1, 1.22], rotate: 250, opacity: [0, 0.74, 0] }}
            transition={{ duration: 2.12, ease: "easeInOut", delay: 0.18 }}
          />

          <motion.div
            className="absolute h-px w-[72vw] max-w-[680px] bg-gradient-to-r from-transparent via-[#5fb996] to-transparent shadow-[0_0_32px_rgba(95,185,150,0.72)]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.18, ease: [0.22, 1, 0.36, 1], delay: 0.76 }}
          />

          <motion.div
            className="relative grid size-32 place-items-center sm:size-40"
            initial={{ y: 26, scale: 0.78, opacity: 0, filter: "blur(12px)" }}
            animate={{
              y: [26, -4, 0],
              scale: [0.78, 1.08, 1],
              opacity: [0, 1, 1],
              filter: ["blur(12px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-[#5fb996]/16 blur-3xl"
              animate={{ scale: [0.92, 1.18, 1.02], opacity: [0.44, 0.9, 0.64] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-4 rounded-full border border-[#5fb996]/42"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.78, 0], scale: [0.5, 1.4, 1.72] }}
              transition={{ duration: 1.42, ease: "easeOut", delay: 0.98 }}
            />
            <Image
              src={logoSrc}
              alt="Jorus logo"
              width={104}
              height={104}
              priority
              className="relative h-24 w-24 object-contain invert drop-shadow-[0_0_30px_rgba(95,185,150,0.48)] sm:h-32 sm:w-32"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

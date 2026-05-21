"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logoSrc = "/assets/logo/J logo without bg.png";

export default function IntroAnimation() {
  return (
    <div
      aria-label="Opening portfolio animation"
      className="intro-shell pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#050505] text-white"
    >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(0,255,135,0.16),transparent_34%),linear-gradient(180deg,#050505_0%,#0A0A0A_100%)]"
            animate={{ opacity: [0.65, 1, 0.78] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid place-items-center">
            <motion.div
              className="absolute size-44 rounded-full border border-[#00FF87]/25"
              initial={{ scale: 0.72, opacity: 0, rotate: -30 }}
              animate={{ scale: [0.72, 1.08, 1.22], opacity: [0, 0.92, 0], rotate: 160 }}
              transition={{ duration: 1.85, ease: "easeOut" }}
            />
            <motion.div
              className="absolute size-64 rounded-full border border-white/10"
              initial={{ scale: 0.62, opacity: 0, rotate: 24 }}
              animate={{ scale: [0.62, 1.12, 1.34], opacity: [0, 0.68, 0], rotate: -180 }}
              transition={{ duration: 2.05, ease: "easeOut", delay: 0.12 }}
            />
            <motion.div
              className="absolute size-80 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(0,255,135,0.42),transparent,rgba(255,255,255,0.18),transparent)] opacity-70 blur-xl"
              initial={{ scale: 0.5, rotate: 0, opacity: 0 }}
              animate={{ scale: [0.5, 1, 1.18], rotate: 270, opacity: [0, 0.75, 0] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute h-40 w-1 bg-[#00FF87]/70 blur-sm"
              initial={{ scaleY: 0, opacity: 0, rotate: -35 }}
              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0], rotate: 35 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.35 }}
            />
            <motion.div
              className="absolute h-1 w-56 bg-white/70 blur-sm"
              initial={{ scaleX: 0, opacity: 0, rotate: -10 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.82, 0], rotate: 10 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.55 }}
            />

            <motion.div
              className="relative grid size-28 place-items-center sm:size-32"
              initial={{ opacity: 0, y: 18, scale: 0.78, rotate: -8 }}
              animate={{
                opacity: 1,
                y: [18, 0, -3, 0],
                scale: [0.78, 1.14, 0.98, 1],
                rotate: [-8, 3, -2, 0],
              }}
              transition={{ duration: 1.35, ease: "easeOut" }}
            >
              <motion.span
                className="absolute inset-2 rounded-full bg-[#00FF87]/18 blur-2xl"
                animate={{ scale: [0.72, 1.34, 0.96], opacity: [0.45, 1, 0.66] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute inset-5 rounded-full border border-[#00FF87]/50"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.55, 1.85] }}
                transition={{ duration: 1.35, ease: "easeOut", delay: 0.4 }}
              />
              <Image
                src={logoSrc}
                alt="Jorus logo"
                width={92}
                height={92}
                priority
                className="relative h-20 w-20 object-contain invert drop-shadow-[0_0_22px_rgba(0,255,135,0.48)] sm:h-24 sm:w-24"
              />
            </motion.div>
          </div>
    </div>
  );
}

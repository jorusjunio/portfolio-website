"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Magnetic from "./Magnetic";
import Parallax from "./Parallax";

const stats = [
  { value: "10+", label: "Digital pieces" },
  { value: "2+", label: "Core systems" },
  { value: "3", label: "Main lanes" },
];

const heroContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      // Wait for the intro overlay to lift before revealing the hero.
      delayChildren: 2.4,
      staggerChildren: 0.1,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="show"
      variants={heroContainer}
      className="relative isolate flex min-h-screen overflow-hidden bg-[#0A0A0A] px-5 pt-28 text-white sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_30%,rgba(0,255,135,0.18),transparent_32%),linear-gradient(180deg,#0A0A0A_0%,#111111_92%,#111111_100%)]" />
      <div className="absolute left-0 top-24 -z-10 h-px w-full bg-gradient-to-r from-transparent via-[#00FF87]/40 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-end gap-14 pb-14 lg:grid-cols-[0.96fr_1.04fr] lg:gap-24 lg:pb-20 xl:gap-32">
        <motion.div
          className="flex flex-col justify-end"
        >
          <motion.p
            variants={heroItem}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]"
          >
            Hey! I&apos;m
          </motion.p>

          <motion.h1
            variants={heroItem}
            whileHover={{
              scale: 1.015,
              textShadow: "0 0 34px rgba(0,255,135,0.22)",
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="max-w-5xl cursor-default text-[clamp(4.8rem,16vw,13.2rem)] font-black uppercase leading-[0.75] tracking-normal text-white"
          >
            Jorus
          </motion.h1>

          <motion.div
            variants={heroItem}
            className="mt-8 max-w-2xl"
          >
            <p className="text-xl font-semibold text-white sm:text-2xl">
              IT Student Creating Websites, Systems, and Visual Stories
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#888888] sm:text-lg">
              I build clean digital work across web development, practical
              systems, UI-focused experiences, and cinematic content for
              students, creators, small businesses, and growing local brands.
            </p>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full bg-[#00FF87] px-7 py-3 text-sm font-bold text-black shadow-[0_0_34px_rgba(0,255,135,0.28)] transition-shadow hover:shadow-[0_0_46px_rgba(0,255,135,0.42)]"
              >
                View Work
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-bold text-white transition-colors hover:border-[#00FF87] hover:text-[#00FF87]"
              >
                Let&apos;s Work
              </motion.a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-2xl font-black text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#888888]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <Parallax offset={34}>
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
          transition={{
            opacity: { delay: 0.45, duration: 0.7, ease: "easeOut" },
            scale: { delay: 0.45, duration: 0.7, ease: "easeOut" },
            y: { delay: 0.9, duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative flex min-h-[430px] items-end justify-center sm:min-h-[520px] lg:min-h-[620px] lg:justify-end"
        >
          <motion.div
            whileHover={{ y: -10, rotate: -0.8, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="group relative z-10 mb-8 h-[390px] w-full max-w-[360px] cursor-pointer sm:h-[500px] sm:max-w-[440px] lg:h-[540px] lg:max-w-[500px]"
          >
            <div className="absolute -inset-10 bg-[#00FF87]/10 blur-3xl" />
            <motion.div
              className="absolute -inset-7 rounded-full border border-[#00FF87]/18 transition-colors duration-300 group-hover:border-[#00FF87]/38"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-white/8"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -right-8 top-16 h-52 w-52 rounded-full bg-[#00FF87]/16 blur-3xl"
              animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.52, 0.92, 0.52] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute left-6 top-6 h-full w-full border border-[#00FF87]/16" />

            <div className="relative h-full overflow-hidden border border-white/12 bg-[#080808] shadow-[0_36px_100px_rgba(0,0,0,0.58)] transition duration-300 group-hover:border-[#00FF87]/50 group-hover:shadow-[0_38px_120px_rgba(0,255,135,0.14)] [clip-path:polygon(0_0,88%_0,100%_12%,100%_100%,12%_100%,0_88%)]">
              <Image
                src="/assets/pictures/Formal-me.jpg"
                alt="Formal portrait of Jorus"
                fill
                priority
                sizes="(min-width: 1024px) 500px, (min-width: 640px) 440px, 90vw"
                className="scale-[1.02] object-cover object-[50%_34%] saturate-[1.04] contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,135,0.08)_0%,transparent_24%,transparent_74%,rgba(0,0,0,0.24)_100%)]" />
              <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,135,0.18)_1px,transparent_1px)] [background-size:40px_40px]" />
              <motion.div
                className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-[#00FF87]/14 via-[#00FF87]/5 to-transparent"
                animate={reduceMotion ? { top: "-6rem" } : { top: ["-6rem", "105%"] }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 4.2, repeat: Infinity, ease: [0.42, 0, 0.2, 1], delay: 0.45, repeatDelay: 0.45 }
                }
              />
              <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-[#00FF87]" />
              <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-white/40" />
              <div className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-white/35" />
              <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-[#00FF87]" />
              <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-[#00FF87]/80 to-transparent" />
              <div className="absolute bottom-7 right-7 flex items-center gap-2 border border-white/10 bg-black/54 px-3 py-2 backdrop-blur">
                <span className="size-2 bg-[#00FF87] shadow-[0_0_16px_rgba(0,255,135,0.8)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/74">
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </Parallax>
      </div>
    </motion.section>
  );
}

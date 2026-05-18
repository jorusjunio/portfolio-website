"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Practice builds" },
  { value: "2", label: "Featured systems" },
  { value: "2026", label: "Open for freelance" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen overflow-hidden bg-[#0A0A0A] px-5 pt-28 text-white sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_30%,rgba(0,255,135,0.18),transparent_32%),linear-gradient(180deg,#0A0A0A_0%,#111111_100%)]" />
      <div className="absolute left-0 top-24 -z-10 h-px w-full bg-gradient-to-r from-transparent via-[#00FF87]/40 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-end gap-12 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20">
        <motion.div
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-end"
        >
          <motion.p
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.05, duration: 0.45, ease: "easeOut" }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]"
          >
            Hey! I&apos;m
          </motion.p>

          <motion.h1
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
            className="max-w-5xl text-[clamp(4.8rem,18vw,15rem)] font-black uppercase leading-[0.75] tracking-normal text-white"
          >
            Jorus
          </motion.h1>

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.16, duration: 0.5, ease: "easeOut" }}
            className="mt-8 max-w-2xl"
          >
            <p className="text-xl font-semibold text-white sm:text-2xl">
              Web Developer &amp; IT Student
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#888888] sm:text-lg">
              I build clean, responsive websites and practical web systems for
              students, small businesses, and growing local brands in the
              Philippines.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.22, duration: 0.5, ease: "easeOut" }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#00FF87] px-7 py-3 text-sm font-bold text-black shadow-[0_0_34px_rgba(0,255,135,0.28)] transition-shadow hover:shadow-[0_0_46px_rgba(0,255,135,0.42)]"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-bold text-white transition-colors hover:border-[#00FF87] hover:text-[#00FF87]"
            >
              Let&apos;s Work
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.28, duration: 0.5, ease: "easeOut" }}
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

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative hidden min-h-[620px] items-end justify-center lg:flex"
        >
          <div className="absolute bottom-20 h-[440px] w-[440px] rounded-full bg-[#00FF87] opacity-95 shadow-[0_0_120px_rgba(0,255,135,0.32)]" />
          <div className="absolute bottom-20 h-[440px] w-[440px] rounded-full bg-[linear-gradient(180deg,rgba(0,255,135,0.95)_0%,rgba(0,255,135,0.42)_52%,rgba(10,10,10,0)_100%)]" />
          <div className="relative z-10 mb-10 w-[360px] border-b border-[#00FF87]/40 pb-1">
            <div className="h-[470px] rounded-t-[180px] bg-[linear-gradient(160deg,#222_0%,#111_42%,#000_100%)] shadow-2xl" />
            <div className="absolute left-1/2 top-16 h-28 w-28 -translate-x-1/2 rounded-full bg-[#191919] ring-4 ring-[#0A0A0A]" />
            <div className="absolute left-1/2 top-44 h-64 w-64 -translate-x-1/2 rounded-t-[120px] bg-[#050505]" />
            <div className="absolute left-10 top-64 h-36 w-64 -rotate-6 rounded-[36px] border border-white/10 bg-[#111111]/95 p-5 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-[#00FF87]">
                Currently crafting
              </p>
              <p className="mt-3 text-2xl font-black leading-none text-white">
                Modern web systems
              </p>
              <div className="mt-5 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-[#00FF87]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RevealHeading from "./RevealHeading";
import ScrollDecor from "./ScrollDecor";

const MotionLink = motion.create(Link);

const creativeSkills = [
  "Cinematic editing",
  "Filming",
  "Shot composition",
  "Color grading",
  "Story-driven cuts",
  "Short-form reels",
];

const process = [
  {
    title: "Shoot With Intent",
    text: "Framing, movement, and pacing planned around the feeling the video needs to carry.",
  },
  {
    title: "Shape The Story",
    text: "Cuts, rhythm, and transitions built around clarity instead of random effects.",
  },
  {
    title: "Finish The Look",
    text: "Color, sound, and final polish tuned for a clean cinematic feel.",
  },
];

export default function CreativeWork() {
  return (
    <motion.section
      id="creative"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#080808_0%,#080808_84%,#0A0A0A_100%)] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <ScrollDecor variant="orbs" />
      <ScrollDecor variant="arc" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
            Creative Work
          </p>
          <RevealHeading className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
            Cinematic editing and filming.
          </RevealHeading>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#888888] sm:text-lg">
            A preview of my visual side: filming, cinematic edits, color mood,
            and pacing for content that needs to feel sharper and more
            intentional.
          </p>

          <MotionLink
            href="/creative"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-[#00FF87] bg-[#00FF87] px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(0,255,135,0.24)] transition hover:bg-white"
          >
            Explore Creative Work
          </MotionLink>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {creativeSkills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ y: -2 }}
                className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/72 transition-colors duration-300 hover:border-[#00FF87]/45 hover:text-white"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 bg-[#00FF87]/8 blur-3xl" />
          <div className="relative overflow-hidden border border-white/10 bg-[#101010]/88 p-5 shadow-[0_36px_110px_rgba(0,0,0,0.45)] backdrop-blur sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,255,135,0.11),transparent_26%,transparent_72%,rgba(255,255,255,0.06))]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,135,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
              <Image
                src="/assets/bg/cinematic-e.g.jpg"
                alt="Cinematic editing preview"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(0,255,135,0.2),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]" />
              <div className="absolute inset-x-0 top-0 h-[18%] bg-black/72" />
              <div className="absolute inset-x-0 bottom-0 h-[18%] bg-black/72" />
              <motion.div
                className="absolute left-[-20%] top-1/2 h-px w-[140%] bg-gradient-to-r from-transparent via-[#00FF87] to-transparent shadow-[0_0_28px_rgba(0,255,135,0.72)]"
                animate={{ x: ["-18%", "18%"], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#00FF87]">
                    Editing Lane
                  </p>
                  <p className="mt-2 max-w-xs text-2xl font-black leading-none text-white sm:text-3xl">
                    Visual stories with mood.
                  </p>
                </div>
                <div className="hidden h-16 w-24 border border-white/15 bg-white/[0.04] sm:block" />
              </div>
            </div>

            <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
              {process.map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className="border border-white/10 bg-black/26 p-4 transition-colors duration-300 hover:border-[#00FF87]/45"
                >
                  <p className="text-xs font-black text-[#00FF87]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-sm font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/52">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

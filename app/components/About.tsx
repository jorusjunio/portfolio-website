"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2+", label: "Core systems built" },
  { value: "10+", label: "Digital pieces" },
  { value: "3", label: "Creative lanes" },
];

const highlights = [
  "Responsive websites and interfaces built with modern frontend tools.",
  "Simple systems for school, small business, and admin workflows.",
  "Cinematic editing and filming for content with a sharper visual direction.",
];

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#111111_0%,#111111_82%,#0A0A0A_100%)] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
              About me
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              Building useful digital work with clarity and style.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-11"
          >
            <p className="max-w-3xl text-lg leading-8 text-[#D7D7D7] sm:text-xl sm:leading-9">
              I&apos;m Jorus, a Filipino IT student and freelance web
              creator focused on clean, fast, and useful digital experiences.
              My work sits across websites, web systems, UI direction, and
              visual storytelling, with the goal of making ideas feel clear,
              practical, and polished.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="border-l border-[#00FF87] bg-[#0A0A0A] px-5 py-6"
                >
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#888888]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
              {highlights.map((item, index) => (
                <div key={item} className="group">
                  <span className="text-sm font-black text-[#00FF87]">
                    0{index + 1}
                  </span>
                  <p className="mt-3 text-sm leading-6 text-[#888888] transition-colors duration-300 group-hover:text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

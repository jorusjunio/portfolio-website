"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2+", label: "Core systems built" },
  { value: "10+", label: "Practice projects" },
  { value: "99%", label: "Focus on clean UI" },
];

const highlights = [
  "Responsive websites built with Next.js, TypeScript, and TailwindCSS.",
  "Simple web systems for school, small business, and admin workflows.",
  "Currently growing into freelance-ready development and client work.",
];

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-20 bg-[#111111] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
              About me
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              Crafting practical websites with clarity and purpose.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:pt-11"
          >
            <p className="max-w-3xl text-lg leading-8 text-[#D7D7D7] sm:text-xl sm:leading-9">
              I&apos;m Jorus, a Filipino IT student and aspiring freelance web
              developer focused on building clean, fast, and useful digital
              experiences. I enjoy turning school and business ideas into
              websites and web systems that feel simple to use and easy to
              maintain.
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

"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Websites & Interfaces",
    description:
      "Modern, responsive portfolio sites, landing pages, and visual interfaces built with clean layout and fast performance in mind.",
    items: ["Portfolio websites", "Business landing pages", "Responsive UI"],
  },
  {
    number: "02",
    title: "Web Systems",
    description:
      "Practical web apps for organizing records, tracking data, and making school or small business workflows easier to manage.",
    items: ["Customer management", "Library systems", "Admin dashboards"],
  },
  {
    number: "03",
    title: "Creative Visuals",
    description:
      "Cinematic editing, filming, and short-form visual direction for creators, school projects, brands, and personal content.",
    items: ["Cinematic edits", "Filming", "Short-form reels"],
  },
];

export default function Services() {
  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#0A0A0A_0%,#0A0A0A_84%,#111111_100%)] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
              Services
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              What I can build for you.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-[#888888]">
            I focus on practical digital work for students, creators, and small
            local businesses that need a stronger online presence, a useful
            system, or sharper visual content.
          </p>
        </motion.div>

        <div className="grid gap-4 pt-10 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-white/10 bg-[#111111] p-6 transition-colors duration-300 hover:border-[#00FF87]/70 sm:p-8"
            >
              <div className="flex items-center justify-between gap-6">
                <span className="text-sm font-black text-[#00FF87]">
                  {service.number}
                </span>
                <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-[#00FF87]/50" />
              </div>

              <h3 className="mt-10 text-3xl font-black leading-tight text-white">
                {service.title}
              </h3>
              <p className="mt-5 min-h-28 text-base leading-7 text-[#888888] transition-colors duration-300 group-hover:text-[#D7D7D7]">
                {service.description}
              </p>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-white"
                  >
                    <span className="size-1.5 rounded-full bg-[#00FF87]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, responsive portfolio sites, landing pages, and business websites built with clean UI and fast performance in mind.",
    items: ["Portfolio websites", "Business landing pages", "Responsive UI builds"],
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
    title: "Maintenance Packages",
    description:
      "Ongoing updates for websites that need content changes, minor fixes, UI improvements, and basic performance cleanup.",
    items: ["Bug fixes", "Content updates", "UI polish"],
  },
];

export default function Services() {
  return (
    <motion.section
      id="services"
      initial={{ y: 32 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-20 bg-[#0A0A0A] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
            I focus on clean, practical web work for students, creators, and
            small local businesses that need a strong online presence or a
            simple system that actually helps day-to-day work.
          </p>
        </motion.div>

        <div className="grid gap-4 pt-10 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
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

"use client";

import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";
import AuraGlow from "./AuraGlow";
import Starfield from "./Starfield";

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
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#03060b_0%,#03060b_84%,#05090f_100%)] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <Starfield />
      <AuraGlow variant="mint" className="left-[-14rem] top-[20%] h-[30rem] w-[30rem]" delay={1} />
      <AuraGlow variant="mint" side="right" className="right-[-12rem] bottom-[10%] h-[26rem] w-[26rem]" delay={3} duration={19} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
              Services
            </p>
            <RevealHeading className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              What I can build for you.
            </RevealHeading>
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
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-white/10 bg-[#0b1118] p-6 transition duration-300 hover:border-[#2ee6a0]/70 hover:shadow-[0_22px_60px_rgba(46,230,160,0.12)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-6">
                <span className="text-sm font-black text-[#5fb996]">
                  {service.number}
                </span>
                <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-[#2ee6a0]/70" />
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
                    <span className="size-1.5 rounded-full bg-[#5fb996]" />
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

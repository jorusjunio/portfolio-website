"use client";

import { motion } from "framer-motion";

const projects = [
  {
    number: "01",
    title: "Customer Management System",
    type: "Web System",
    year: "2026",
    description:
      "A practical system concept for managing customer records, contact details, status updates, and quick business follow-ups in one organized dashboard.",
    tags: ["CRUD", "Dashboard", "Customer Records"],
    accent: "from-[#00FF87] to-[#0A0A0A]",
  },
  {
    number: "02",
    title: "Library Management System",
    type: "School System",
    year: "2026",
    description:
      "A library workflow project for tracking books, borrowers, returns, and basic inventory details with a clean admin-focused interface.",
    tags: ["Inventory", "Borrowers", "Admin UI"],
    accent: "from-white to-[#00FF87]",
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ y: 32 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-20 bg-[#111111] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
              Best Projects
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              Portfolio pieces that show what I can build.
            </h2>
          </div>

          <p className="text-sm font-bold text-white/80">@2026</p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ y: 32 }}
              whileInView={{ y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group overflow-hidden border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-[#00FF87]/70"
            >
              <div className="relative min-h-[320px] overflow-hidden bg-[#090909] p-6 sm:min-h-[390px] sm:p-8">
                <div
                  className={`absolute inset-x-10 top-8 h-64 rounded-full bg-gradient-to-br ${project.accent} opacity-90 blur-2xl transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,10,10,0.88)_82%)]" />

                <div className="relative z-10 flex items-center justify-between text-xs font-bold uppercase tracking-[0.24em] text-white/80">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>

                <div className="relative z-10 mt-16 rounded-lg border border-white/10 bg-[#111111]/90 p-5 shadow-2xl backdrop-blur sm:mt-24 sm:p-6">
                  <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5">
                    <span className="text-sm font-black text-[#00FF87]">
                      {project.number}
                    </span>
                    <span className="h-2 w-24 rounded-full bg-[#00FF87]" />
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="h-3 w-4/5 rounded-full bg-white/80" />
                    <div className="h-3 w-3/5 rounded-full bg-white/45" />
                    <div className="h-3 w-2/3 rounded-full bg-white/20" />
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-3">
                    <span className="h-16 rounded-md bg-[#00FF87]/90" />
                    <span className="h-16 rounded-md bg-white/10" />
                    <span className="h-16 rounded-md bg-white/10" />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#888888]">
                  {project.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import Image from "next/image";
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
    image: "/assets/projects/customer-management-system.jpg",
  },
  {
    number: "02",
    title: "Library Management System",
    type: "School System",
    year: "2026",
    description:
      "A library workflow project for tracking books, borrowers, returns, and basic inventory details with a clean admin-focused interface.",
    tags: ["Inventory", "Borrowers", "Admin UI"],
    image: "/assets/projects/library-management-system.jpg",
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-20 bg-[#111111] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group overflow-hidden border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-[#00FF87]/70"
            >
              <div className="relative overflow-hidden bg-[#090909] p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-[0.24em] text-white/80">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#111111] shadow-2xl">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(10,10,10,0.72)_100%)]" />
                  <span className="absolute bottom-5 left-5 text-sm font-black text-[#00FF87]">
                    {project.number}
                  </span>
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

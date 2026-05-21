"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    role: "Full-stack practice project",
    summary:
      "A quick look at the main customer workflow, from browsing records to checking status and follow-up details.",
    previewLabel: "Customer records workflow",
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Dashboard-style overview for customer activity",
      "Organized customer records with contact details",
      "Status and follow-up tracking for business tasks",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    demoSteps: ["Dashboard", "Customer profile", "Follow-up status"],
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
    role: "School system concept",
    summary:
      "A preview of the admin flow for managing books, borrowers, and return activity in one focused interface.",
    previewLabel: "Library admin workflow",
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Book inventory for titles, status, and availability",
      "Borrower records for active lending activity",
      "Return tracking for simple library operations",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    demoSteps: ["Book inventory", "Borrower record", "Return update"],
  },
];

type Project = (typeof projects)[number];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

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

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="border border-[#00FF87] bg-[#00FF87] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white"
                  >
                    Preview
                  </button>
                  <a
                    href={project.liveUrl}
                    aria-disabled={project.liveUrl === "#"}
                    className="border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 px-4 py-6 backdrop-blur-sm sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-preview-title"
              className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-white/12 bg-[#0A0A0A] shadow-2xl"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project preview"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center border border-white/15 bg-black/70 text-xl font-black text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
              >
                x
              </button>

              <div className="grid gap-0 lg:grid-cols-[1.35fr_0.9fr]">
                <div className="border-b border-white/10 bg-[#111111] p-4 sm:p-6 lg:border-b-0 lg:border-r">
                  <div className="relative overflow-hidden border border-white/10 bg-black">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={selectedProject.image}
                        alt={`${selectedProject.title} thumbnail preview`}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.78)_100%)]" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00FF87]">
                        {selectedProject.previewLabel}
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {selectedProject.demoSteps.map((step, index) => (
                          <motion.div
                            key={step}
                            className="border border-white/12 bg-black/72 p-4"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.12 + index * 0.08,
                              duration: 0.35,
                              ease: "easeOut",
                            }}
                          >
                            <span className="text-xs font-black text-white/50">
                              0{index + 1}
                            </span>
                            <p className="mt-2 text-sm font-black text-white">
                              {step}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00FF87]">
                    {selectedProject.role}
                  </p>
                  <h3
                    id="project-preview-title"
                    className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-[#A0A0A0]">
                    {selectedProject.summary}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white">
                      Highlights
                    </h4>
                    <div className="mt-4 grid gap-3">
                      {selectedProject.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/82"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white">
                      Tech Stack
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedProject.tech.map((item) => (
                        <span
                          key={item}
                          className="border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/75"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <a
                      href={selectedProject.liveUrl}
                      aria-disabled={selectedProject.liveUrl === "#"}
                      className="border border-[#00FF87] bg-[#00FF87] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white"
                    >
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      aria-disabled={selectedProject.githubUrl === "#"}
                      className="border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Project = {
  number: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  gallery?: string[];
  role: string;
  summary: string;
  previewLabel: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  tech: string[];
  demoSteps: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "Customer Management System",
    type: "Web System",
    description:
      "A React and Supabase web system for managing customer records, access rights, authentication, and customer workflows.",
    tags: ["React", "Supabase", "Customer Records"],
    image: "/assets/projects/cms-images-ss/dashboard-page.png",
    video: "/assets/projects/mp4/dashboard.mp4",
    gallery: [
      "/assets/projects/cms-images-ss/dashboard-page.png",
      "/assets/projects/cms-images-ss/customer-page.png",
      "/assets/projects/cms-images-ss/sales-page.png",
      "/assets/projects/cms-images-ss/products-page.png",
      "/assets/projects/cms-images-ss/login-page.png",
      "/assets/projects/cms-images-ss/register-page.png",
    ],
    role: "Frontend Developer",
    summary:
      "A group project showcase covering the dashboard, customer records, authentication screens, and customer management flow.",
    previewLabel: "Customer management workflow",
    liveUrl: "https://customer-management-system-gamma.vercel.app/login",
    githubUrl: "https://github.com/jorusjunio/Customer-Management-System",
    highlights: [
      "Supabase-powered authentication and protected routes",
      "Customer records workflow for viewing, adding, editing, and deactivation",
      "Dashboard and access-rights screens built for admin-style workflows",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase"],
    demoSteps: ["Dashboard", "Customer records", "Access and auth"],
  },
  {
    number: "02",
    title: "Library Management System",
    type: "School System",
    description:
      "A library workflow project for tracking books, borrowers, returns, and basic inventory details with a clean admin-focused interface.",
    tags: ["Inventory", "Borrowers", "Admin UI"],
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
type PreviewItem = {
  src: string;
  label: string;
};

type ScrollLockState = {
  scrollY: number;
  previousBodyPosition: string;
  previousBodyTop: string;
  previousBodyLeft: string;
  previousBodyRight: string;
  previousBodyWidth: string;
  previousHtmlScrollBehavior: string;
};

const techLogos: Record<string, { src?: string; alt: string; initials: string }> =
  {
    "Next.js": {
      src: "/assets/other-logos/nextjs_icon_dark.svg",
      alt: "Next.js logo",
      initials: "N",
    },
    React: {
      src: "/assets/other-logos/React_dark.svg",
      alt: "React logo",
      initials: "R",
    },
    "Tailwind CSS": {
      src: "/assets/other-logos/tailwindcss.svg",
      alt: "Tailwind CSS logo",
      initials: "TW",
    },
    Supabase: {
      src: "/assets/other-logos/supabase.svg",
      alt: "Supabase logo",
      initials: "SB",
    },
    Vite: {
      src: "/assets/other-logos/vite.svg",
      alt: "Vite logo",
      initials: "VT",
    },
  };

const formatScreenshotLabel = (src: string, fallback: string) => {
  const fileName = src.split("/").pop()?.replace(/\.[^.]+$/, "");
  if (!fileName) return fallback;

  return fileName
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedPreviewIndex, setExpandedPreviewIndex] = useState<
    number | null
  >(null);
  const scrollLockState = useRef<ScrollLockState | null>(null);

  const restoreProjectPreviewScroll = useCallback(() => {
    const lockState = scrollLockState.current;

    if (!lockState) return;

    scrollLockState.current = null;
    document.documentElement.classList.remove("project-preview-open");
    document.body.classList.remove("project-preview-open");
    document.body.style.position = lockState.previousBodyPosition;
    document.body.style.top = lockState.previousBodyTop;
    document.body.style.left = lockState.previousBodyLeft;
    document.body.style.right = lockState.previousBodyRight;
    document.body.style.width = lockState.previousBodyWidth;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, lockState.scrollY);

    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior =
        lockState.previousHtmlScrollBehavior;
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("project-preview-close"));
      });
    });
  }, []);

  const lockProjectPreviewScroll = useCallback(() => {
    if (scrollLockState.current) return;

    const scrollY = window.scrollY;
    scrollLockState.current = {
      scrollY,
      previousBodyPosition: document.body.style.position,
      previousBodyTop: document.body.style.top,
      previousBodyLeft: document.body.style.left,
      previousBodyRight: document.body.style.right,
      previousBodyWidth: document.body.style.width,
      previousHtmlScrollBehavior: document.documentElement.style.scrollBehavior,
    };

    document.documentElement.classList.add("project-preview-open");
    document.body.classList.add("project-preview-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    window.dispatchEvent(new Event("project-preview-open"));
  }, []);

  const openProjectPreview = (project: Project) => {
    setExpandedPreviewIndex(null);
    lockProjectPreviewScroll();
    setSelectedProject(project);
  };

  const closeProjectPreview = useCallback(() => {
    setExpandedPreviewIndex(null);
    restoreProjectPreviewScroll();
    setSelectedProject(null);
  }, [restoreProjectPreviewScroll]);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (expandedPreviewIndex !== null) {
          setExpandedPreviewIndex(null);
          return;
        }

        closeProjectPreview();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeProjectPreview, expandedPreviewIndex, selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    return restoreProjectPreviewScroll;
  }, [restoreProjectPreviewScroll, selectedProject]);

  const previewItems = useMemo(() => {
    if (!selectedProject) return [];

    const items: PreviewItem[] = [];

    if (selectedProject.image) {
      items.push({
        src: selectedProject.image,
        label: `${selectedProject.title} main screenshot`,
      });
    }

    selectedProject.gallery?.forEach((image, index) => {
      if (items.some((item) => item.src === image)) return;

      items.push({
        src: image,
        label: formatScreenshotLabel(
          image,
          `${selectedProject.title} screenshot ${index + 1}`,
        ),
      });
    });

    return items;
  }, [selectedProject]);

  const mainPreview = previewItems[0];
  const expandedPreview =
    expandedPreviewIndex !== null ? previewItems[expandedPreviewIndex] : null;
  const expandedPreviewNumber =
    expandedPreviewIndex !== null ? expandedPreviewIndex + 1 : 0;

  const showPreviousPreview = useCallback(() => {
    setExpandedPreviewIndex((current) => {
      if (current === null || previewItems.length === 0) return current;

      return (current - 1 + previewItems.length) % previewItems.length;
    });
  }, [previewItems.length]);

  const showNextPreview = useCallback(() => {
    setExpandedPreviewIndex((current) => {
      if (current === null || previewItems.length === 0) return current;

      return (current + 1) % previewItems.length;
    });
  }, [previewItems.length]);

  useEffect(() => {
    if (expandedPreviewIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        showPreviousPreview();
      }

      if (event.key === "ArrowRight") {
        showNextPreview();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedPreviewIndex, showNextPreview, showPreviousPreview]);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-[-3rem] overflow-hidden bg-[linear-gradient(180deg,#111111_0%,#111111_84%,#080808_100%)] px-5 py-24 text-white sm:scroll-mt-[-3.25rem] sm:px-8 lg:scroll-mt-[-3.5rem] lg:px-10 lg:py-32"
    >
      <div
        data-section-scroll-target="projects"
        className="relative z-10 mx-auto max-w-7xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                delay: index * 0.08,
                duration: 0.62,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex h-full flex-col overflow-hidden border border-white/10 bg-[#0A0A0A] transition-colors duration-300 hover:border-[#00FF87]/70"
            >
              <div className="relative overflow-hidden bg-[#090909] p-3">
                <div className="mb-2.5 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                  <span className="border border-white/10 bg-white/[0.03] px-2.5 py-1 text-white/70">
                    {project.type}
                  </span>
                  <span className="text-[#00FF87]">{project.number}</span>
                </div>

                <div className="relative aspect-[16/7.15] overflow-hidden border border-white/10 bg-[#111111] shadow-2xl">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                    />
                  ) : (
                    <div className="h-full w-full bg-[linear-gradient(135deg,#101010_0%,#181818_55%,#0A0A0A_100%)]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.48)_48%,rgba(10,10,10,0.86)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="max-w-lg text-2xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.72)] sm:text-3xl">
                      {project.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div>
                  <p className="text-sm leading-6 text-[#888888] lg:text-[13px] lg:leading-5">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex min-h-8 items-center justify-center border border-white/10 px-2 py-1 text-center text-[10px] font-bold uppercase leading-snug tracking-[0.07em] text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto grid gap-2.5 pt-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => openProjectPreview(project)}
                    className="inline-flex min-h-9 items-center justify-center border border-[#00FF87] bg-[#00FF87] px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-black transition hover:bg-white"
                  >
                    Preview
                  </button>
                  <a
                    href={project.liveUrl}
                    aria-disabled={project.liveUrl === "#"}
                    className="inline-flex min-h-9 items-center justify-center border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/82 px-4 py-6 backdrop-blur-sm sm:px-6"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectPreview}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-preview-title"
              className="relative max-h-[92vh] w-full max-w-6xl overscroll-contain overflow-x-hidden overflow-y-auto border border-white/12 bg-[#0A0A0A] shadow-2xl lg:h-[min(92vh,720px)] lg:overflow-hidden"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProjectPreview}
                aria-label="Close project preview"
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center border border-white/15 bg-black/70 text-xl font-black text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
              >
                x
              </button>

              <div className="grid h-full min-w-0 gap-0 overflow-x-hidden lg:grid-cols-[1.48fr_0.82fr]">
                <div className="min-w-0 border-b border-white/10 bg-[#111111] p-4 sm:p-5 lg:flex lg:min-h-0 lg:flex-col lg:border-b-0 lg:border-r">
                  <div className="relative min-h-0 flex-1 overflow-hidden border border-[#00FF87]/20 bg-[radial-gradient(circle_at_18%_0%,rgba(0,255,135,0.13),transparent_30%),linear-gradient(135deg,#050505_0%,#101010_48%,#050505_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.38)] sm:p-4">
                    <div className="mb-3 flex items-center justify-between gap-3 border border-white/10 bg-black/45 px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-white/46">
                        Screenshot Preview
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black lg:h-[calc(100%-2.25rem)] lg:min-h-0 lg:aspect-auto">
                      {selectedProject.video ? (
                        <video
                          src={selectedProject.video}
                          className="h-full w-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : mainPreview ? (
                        <Image
                          src={mainPreview.src}
                          alt={mainPreview.label}
                          fill
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#101010_0%,#181818_55%,#0A0A0A_100%)] px-10 text-center">
                          <span className="max-w-sm text-2xl font-black uppercase tracking-[0.16em] text-white/72">
                            {selectedProject.title}
                          </span>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.62)_100%)]" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00FF87]">
                        {selectedProject.previewLabel}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {selectedProject.demoSteps.map((step, index) => (
                          <motion.div
                            key={step}
                            className="border border-white/12 bg-black/72 p-3"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.12 + index * 0.08,
                              duration: 0.35,
                              ease: "easeOut",
                            }}
                          >
                            <span className="text-[11px] font-black text-white/50">
                              0{index + 1}
                            </span>
                            <p className="mt-1.5 text-sm font-black text-white">
                              {step}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {previewItems.length > 0 && (
                    <div className="mt-2 border border-white/10 bg-black/35 p-2">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00FF87]">
                          Screenshots
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/42">
                          Click to view
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                        {previewItems.map((item, index) => (
                          <button
                            type="button"
                            key={item.src}
                            onClick={() => setExpandedPreviewIndex(index)}
                            aria-label={`Open ${item.label}`}
                            className="group relative aspect-video overflow-hidden border border-white/10 bg-black transition hover:border-[#00FF87]"
                          >
                            <Image
                              src={item.src}
                              alt={item.label}
                              fill
                              sizes="(min-width: 1024px) 8vw, 28vw"
                              className="object-cover opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                            />
                            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/70 px-1.5 py-1 text-left text-[8px] font-black uppercase tracking-[0.08em] text-white/76 opacity-0 transition group-hover:opacity-100">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex min-h-full flex-col overflow-hidden p-5 sm:p-6 lg:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00FF87]">
                    {selectedProject.role}
                  </p>
                  <h3
                    id="project-preview-title"
                    className="mt-2.5 text-3xl font-black leading-tight text-white lg:text-[2rem]"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-3 text-sm leading-5 text-[#A0A0A0]">
                    {selectedProject.summary}
                  </p>

                  <div className="mt-5">
                    <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white">
                      Highlights
                    </h4>
                    <div className="mt-2.5 grid gap-2">
                      {selectedProject.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="border border-white/10 bg-white/[0.03] p-2.5 text-[13px] leading-5 text-white/82"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white">
                      Tech Stack
                    </h4>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((item) => (
                        <span
                          key={item}
                          tabIndex={0}
                          className="group relative overflow-hidden border border-white/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/75 outline-none transition hover:border-[#00FF87]/70 hover:text-white focus-visible:border-[#00FF87]/70 focus-visible:text-white"
                        >
                          <span className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition duration-200 group-hover:opacity-20 group-focus-visible:opacity-20">
                            {techLogos[item]?.src ? (
                              <Image
                                src={techLogos[item].src}
                                alt=""
                                width={30}
                                height={30}
                                aria-hidden="true"
                                className="max-h-8 max-w-8 object-contain"
                              />
                            ) : (
                              <span className="text-sm font-black tracking-normal text-[#00FF87]">
                                {techLogos[item]?.initials ?? item.slice(0, 2)}
                              </span>
                            )}
                          </span>
                          <span className="relative z-10">{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap justify-end gap-2.5 pt-6">
                    <a
                      href={selectedProject.liveUrl}
                      aria-disabled={selectedProject.liveUrl === "#"}
                      className="border border-[#00FF87] bg-[#00FF87] px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-white"
                    >
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      aria-disabled={selectedProject.githubUrl === "#"}
                      className="border border-white/15 px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {expandedPreview && (
                <div
                  className="absolute inset-0 z-20 grid place-items-center bg-black/92 p-4 backdrop-blur-sm sm:p-6"
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpandedPreviewIndex(null);
                  }}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setExpandedPreviewIndex(null);
                    }}
                    aria-label="Close enlarged preview"
                    className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center border border-white/15 bg-black/80 text-xl font-black text-white transition hover:border-[#00FF87] hover:text-[#00FF87]"
                  >
                    x
                  </button>

                  <div
                    className="relative h-full max-h-[calc(92vh-3rem)] w-full max-w-5xl overflow-hidden border border-[#00FF87]/28 bg-[radial-gradient(circle_at_18%_0%,rgba(0,255,135,0.13),transparent_32%),linear-gradient(135deg,#050505_0%,#101010_52%,#050505_100%)] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-4"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3 border border-white/10 bg-black/60 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="min-w-0 text-right">
                        <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-[#00FF87]">
                          {expandedPreview.label}
                        </p>
                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/42">
                          {expandedPreviewNumber} / {previewItems.length}
                        </p>
                      </div>
                    </div>

                    <div className="relative h-[calc(100%-2.55rem)] overflow-hidden border border-white/10 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.025)]">
                      <Image
                        src={expandedPreview.src}
                        alt={expandedPreview.label}
                        fill
                        sizes="90vw"
                        className="object-contain"
                        priority
                      />

                      {previewItems.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              showPreviousPreview();
                            }}
                            aria-label="Show previous screenshot"
                            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-black/72 text-2xl font-black text-white shadow-[0_16px_38px_rgba(0,0,0,0.42)] backdrop-blur transition hover:border-[#00FF87] hover:bg-[#00FF87] hover:text-black"
                          >
                            &lt;
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              showNextPreview();
                            }}
                            aria-label="Show next screenshot"
                            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/15 bg-black/72 text-2xl font-black text-white shadow-[0_16px_38px_rgba(0,0,0,0.42)] backdrop-blur transition hover:border-[#00FF87] hover:bg-[#00FF87] hover:text-black"
                          >
                            &gt;
                          </button>
                        </>
                      )}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))] px-4 pb-4 pt-12">
                        <p className="max-w-2xl text-xs font-black uppercase tracking-[0.16em] text-white/82">
                          {expandedPreview.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AuraGlow from "./AuraGlow";
import Starfield from "./Starfield";

const stacks = [
  {
    title: "Web Frontend",
    label: "Interface builds",
    tools: [
      { name: "HTML", logo: "/assets/other-logos/html5.svg" },
      { name: "CSS", logo: "/assets/other-logos/css_old.svg" },
      { name: "JavaScript", logo: "/assets/other-logos/javascript.svg" },
      { name: "TypeScript", logo: "/assets/other-logos/typescript.svg" },
      { name: "React", logo: "/assets/other-logos/React_dark.svg" },
      { name: "Next.js", logo: "/assets/other-logos/nextjs_icon_dark.svg" },
    ],
  },
  {
    title: "Programming & UI",
    label: "Logic and design",
    tools: [
      { name: "Python", logo: "/assets/other-logos/python.svg" },
      { name: "Java", logo: "/assets/other-logos/java.svg" },
      { name: "Figma", logo: "/assets/other-logos/figma.svg" },
      { name: "Tailwind CSS", logo: "/assets/other-logos/tailwindcss.svg" },
      { name: "Framer Motion", logo: "/assets/other-logos/Framer_dark.svg" },
    ],
  },
  {
    title: "Data & Workflow",
    label: "Build support",
    tools: [
      { name: "IBM Db2", logo: "/assets/other-logos/ibm.svg" },
      { name: "MongoDB", logo: "/assets/other-logos/MongoDB_dark.svg" },
      { name: "MySQL", logo: "/assets/other-logos/MySQL_dark.svg" },
      { name: "Neon", logo: "/assets/other-logos/neon.svg" },
      { name: "Git", logo: "/assets/other-logos/git.svg" },
      { name: "GitHub", logo: "/assets/other-logos/GitHub_dark.svg" },
    ],
  },
  {
    title: "Ship & Maintain",
    label: "Delivery tools",
    tools: [
      { name: "VS Code", logo: "/assets/other-logos/vscode.svg" },
      { name: "Render", logo: "/assets/other-logos/Render_dark.svg" },
      { name: "Netlify", logo: "/assets/other-logos/netlify.svg" },
    ],
  },
  {
    title: "AI & Assistants",
    label: "Development aid",
    tools: [
      { name: "Claude", logo: "/assets/other-logos/claude.svg" },
      { name: "GitHub Copilot", logo: "/assets/other-logos/github-copilot.svg" },
      { name: "OpenAI", logo: "/assets/other-logos/Codex_dark.svg" },
    ],
  },
];

const getInitials = (tool: string) =>
  tool
    .split(/[\s.-]+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

export default function ToolStack() {
  return (
    <motion.section
      id="tools"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#03060b_0%,#03060b_86%,#03060b_100%)] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <Starfield />
      <AuraGlow variant="teal" className="right-[-14rem] top-[10%] h-[30rem] w-[30rem]" />
      <AuraGlow variant="teal" className="left-[-12rem] bottom-[8%] h-[26rem] w-[26rem]" delay={2.5} duration={18} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
              Skills & Tool Stack
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              More than web development.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="max-w-2xl text-base leading-7 text-[#888888] lg:justify-self-end"
          >
            I work across frontend builds, programming fundamentals, UI design,
            databases, and deployment workflows for systems that are practical
            to build, ship, and maintain.
          </motion.p>
        </div>

        <div className="relative mt-14">
          <div className="absolute -inset-x-6 top-16 h-px bg-gradient-to-r from-transparent via-[#5fb996]/35 to-transparent" />
          <div className="absolute -inset-x-6 bottom-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {stacks.map((stack, index) => (
              <motion.article
                key={stack.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.62,
                  ease: [0.16, 1, 0.3, 1],
                }}
                
                className="group relative flex h-full flex-col justify-between overflow-hidden border border-white/10 bg-[#0a1017]/86 p-5 shadow-2xl shadow-black/20 backdrop-blur transition-colors duration-300 hover:border-[#5fb996]/50"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(95,185,150,0.11),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#5fb996]/0 to-transparent transition-colors duration-500 group-hover:via-[#5fb996]/70" />

                <div className="flex min-h-[76px] items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5fb996]/70">
                      {stack.label}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-white leading-snug">
                      {stack.title}
                    </h3>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center border border-white/10 bg-black/30 text-sm font-black text-[#5fb996] transition-colors duration-300 group-hover:border-[#5fb996]/45 group-hover:bg-[#5fb996]/10">
                    0{index + 1}
                  </span>
                </div>

                {/* LOGO GRID CONTAINER - Sentro at malinis */}
                <div className="mb-7 mt-3 grid grid-cols-3 gap-x-2 gap-y-2.5 justify-items-center">
                  {stack.tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      whileHover={{ y: -3, scale: 1.025 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/tool relative flex h-[76px] w-[65px] flex-col justify-between items-center overflow-hidden border border-white/10 bg-black/24 p-1.5 transition-colors duration-300 hover:border-[#5fb996]/50 hover:bg-[#5fb996]/[0.055]"
                    >
                      <span className="absolute inset-x-3 top-0 h-px scale-x-0 bg-[#5fb996]/75 transition-transform duration-300 group-hover/tool:scale-x-100" />
                      <span className="grid size-9 place-items-center border border-white/10 bg-white/[0.03] text-xs font-black text-white/80 transition-colors duration-300 group-hover/tool:border-[#5fb996]/35 group-hover/tool:text-[#5fb996]">
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt={`${tool.name} logo`}
                            width={34}
                            height={34}
                            className="max-h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,0,0,0.35)] transition duration-300 group-hover/tool:scale-110"
                            unoptimized
                          />
                        ) : (
                          getInitials(tool.name)
                        )}
                      </span>
                      <span className="mt-2 block text-[9.5px] font-bold leading-tight tracking-tighter text-white/64 transition-colors duration-300 group-hover/tool:text-white truncate max-w-full text-center px-0.5" title={tool.name}>
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/38">
                  <span>{stack.tools.length} tools</span>
                  <span className="text-[#5fb996]/60">Ready</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
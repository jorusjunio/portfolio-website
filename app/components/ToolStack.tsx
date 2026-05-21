"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stacks = [
  {
    title: "Frontend",
    label: "Interface layer",
    tools: [
      { name: "HTML", logo: "/assets/other-logos/HTML5_Badge.svg" },
      { name: "CSS", logo: "/assets/other-logos/icons8-css-logo.svg" },
      {
        name: "JavaScript",
        logo: "/assets/other-logos/Unofficial_JavaScript_logo_2.svg.png",
      },
      {
        name: "TypeScript",
        logo: "/assets/other-logos/typescript-design-assets/ts-logo-256.svg",
      },
      { name: "React", logo: "/assets/other-logos/React-icon.svg.png" },
      { name: "Next.js", logo: "/assets/other-logos/icons8-next.js.svg" },
    ],
  },
  {
    title: "Styling",
    label: "Visual systems",
    tools: [
      { name: "Tailwind CSS" },
      { name: "Responsive UI" },
      { name: "Framer Motion" },
      { name: "Clean Layouts" },
    ],
  },
  {
    title: "Database",
    label: "Data layer",
    tools: [
      { name: "TiDB" },
      { name: "IBM Db2" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Neon" },
    ],
  },
  {
    title: "Deploy & Workflow",
    label: "Ship & maintain",
    tools: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Render" },
      { name: "Netlify" },
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-20 overflow-hidden bg-[#0A0A0A] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
              Tool Stack
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              The tools behind my builds.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="max-w-2xl text-base leading-7 text-[#888888] lg:justify-self-end"
          >
            I use a practical stack for fast interfaces, clean layouts, and
            systems that are easy to maintain after launch.
          </motion.p>
        </div>

        <div className="relative mt-14">
          <div className="absolute -inset-x-6 top-16 h-px bg-gradient-to-r from-transparent via-[#00FF87]/35 to-transparent" />
          <div className="absolute -inset-x-6 bottom-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stacks.map((stack, index) => (
              <motion.article
                key={stack.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden border border-white/10 bg-[#0f0f0f]/86 p-5 shadow-2xl shadow-black/20 backdrop-blur transition-colors duration-300 hover:border-[#00FF87]/50 sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,135,0.11),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/0 to-transparent transition-colors duration-500 group-hover:via-[#00FF87]/70" />

                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00FF87]/70">
                      {stack.label}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {stack.title}
                    </h3>
                  </div>
                  <span className="grid size-10 place-items-center border border-white/10 bg-black/30 text-sm font-black text-[#00FF87] transition-colors duration-300 group-hover:border-[#00FF87]/45 group-hover:bg-[#00FF87]/10">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-2.5">
                  {stack.tools.map((tool) => (
                    <motion.span
                      key={tool.name}
                      whileHover={{ y: -4, scale: 1.035 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/tool relative min-h-24 overflow-hidden border border-white/10 bg-black/24 p-3 transition-colors duration-300 hover:border-[#00FF87]/50 hover:bg-[#00FF87]/[0.055]"
                    >
                      <span className="absolute inset-x-3 top-0 h-px scale-x-0 bg-[#00FF87]/75 transition-transform duration-300 group-hover/tool:scale-x-100" />
                      <span className="grid size-11 place-items-center border border-white/10 bg-white/[0.03] text-xs font-black text-white/80 transition-colors duration-300 group-hover/tool:border-[#00FF87]/35 group-hover/tool:text-[#00FF87]">
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt={`${tool.name} logo`}
                            width={34}
                            height={34}
                            className="max-h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,0,0,0.35)] transition duration-300 group-hover/tool:scale-110"
                            unoptimized
                          />
                        ) : (
                          getInitials(tool.name)
                        )}
                      </span>
                      <span className="mt-4 block text-[11px] font-bold leading-snug text-white/64 transition-colors duration-300 group-hover/tool:text-white">
                        {tool.name}
                      </span>
                    </motion.span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/38">
                  <span>{stack.tools.length} tools</span>
                  <span className="text-[#00FF87]/60">Ready</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

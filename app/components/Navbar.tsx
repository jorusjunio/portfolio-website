"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <motion.a
          href="#home"
          aria-label="Jorus portfolio home"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="text-2xl font-black tracking-tight text-white"
        >
          Jorus<span className="text-[#00FF87]">.</span>
        </motion.a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                whileHover={{ y: -1 }}
                className="text-sm font-medium text-[#888888] transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#00FF87] px-5 py-2.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(0,255,135,0.28)] transition-shadow duration-300 hover:shadow-[0_0_34px_rgba(0,255,135,0.42)]"
          >
            Hire Me
          </motion.a>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 text-white transition-colors duration-300 hover:border-[#00FF87]/70 [&::-webkit-details-marker]:hidden">
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:translate-y-2 group-open:rotate-45 group-open:text-[#00FF87]" />
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:opacity-0" />
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:-translate-y-2 group-open:-rotate-45 group-open:text-[#00FF87]" />
          </summary>

          <div className="absolute right-0 top-14 w-[calc(100vw-2.5rem)] border border-white/10 bg-[#0A0A0A] p-4 shadow-2xl shadow-black/40">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-3 text-base font-medium text-[#888888] transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#00FF87] px-5 py-3 text-sm font-bold text-black"
              >
                Hire Me
              </a>
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}

"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tools", href: "#tools" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070707]/72 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/40 to-transparent" />
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <motion.a
          href="#home"
          aria-label="Jorus portfolio home"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87]/70"
        >
          <Logo />
        </motion.a>

        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center overflow-hidden rounded-full px-4 py-2.5 text-sm font-semibold text-[#9a9a9a] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87]/70"
              >
                <span className="absolute inset-0 rounded-full bg-[#00FF87]/0 transition-colors duration-300 group-hover:bg-[#00FF87]/10" />
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[#00FF87] transition-transform duration-300 group-hover:scale-x-100" />
                <span className="relative">{link.label}</span>
                <span className="relative ml-2 size-1 rounded-full bg-[#00FF87]/0 transition-colors duration-300 group-hover:bg-[#00FF87]" />
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-full bg-[#00FF87] px-5 py-2.5 text-sm font-black text-black shadow-[0_0_24px_rgba(0,255,135,0.28)] transition-shadow duration-300 hover:shadow-[0_0_38px_rgba(0,255,135,0.46)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87]/70"
          >
            <span className="absolute inset-y-0 -left-8 w-8 rotate-12 bg-white/50 blur-sm transition-transform duration-500 group-hover:translate-x-32" />
            <span className="relative">Hire Me</span>
          </motion.a>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300 hover:border-[#00FF87]/70 [&::-webkit-details-marker]:hidden">
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:translate-y-2 group-open:rotate-45 group-open:text-[#00FF87]" />
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:opacity-0" />
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:-translate-y-2 group-open:-rotate-45 group-open:text-[#00FF87]" />
          </summary>

          <div className="absolute right-0 top-14 w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#090909]/96 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/50 to-transparent" />
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-[#9a9a9a] transition-colors duration-300 hover:bg-white/[0.04] hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="size-1.5 rounded-full bg-[#00FF87]/0 transition-colors duration-300 group-hover:bg-[#00FF87]" />
                </a>
              ))}

              <a
                href="#contact"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#00FF87] px-5 py-3 text-sm font-black text-black shadow-[0_0_24px_rgba(0,255,135,0.24)]"
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

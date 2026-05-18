"use client";

import { motion } from "framer-motion";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "Email", href: "mailto:jorus.dev@gmail.com" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 32 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden bg-[#050505] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-10 lg:pt-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
              Ready when you are
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              Create a striking web presence with clean systems behind it.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:justify-self-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#888888]">
                Menu
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-white transition-colors duration-300 hover:text-[#00FF87]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#888888]">
                Connect
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm font-semibold text-white transition-colors duration-300 hover:text-[#00FF87]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative pt-12">
          <motion.p
            initial={{ y: 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="select-none whitespace-nowrap text-[clamp(4.2rem,20vw,19rem)] font-black uppercase leading-[0.75] tracking-normal text-white"
          >
            Jorus
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-[#00FF87]"
            >
              .
            </motion.span>
          </motion.p>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#888888] sm:flex-row sm:items-center">
            <p>2026 Jorus. All rights reserved.</p>
            <p>Built with Next.js, TypeScript, and TailwindCSS.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

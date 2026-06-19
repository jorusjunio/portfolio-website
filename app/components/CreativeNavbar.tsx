"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import Logo from "./Logo";

const creativeLinks = [
  { label: "Services", href: "#creative-services" },
  { label: "Workflow", href: "#creative-workflow" },
  { label: "Tools", href: "#creative-tools" },
  { label: "Formats", href: "#creative-formats" },
];

const MotionLink = motion.create(Link);
const MotionAnchor = motion.a;

export default function CreativeNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const scrollToHash = (hash: string, behavior: ScrollBehavior = "smooth") => {
    const section = document.getElementById(hash);

    if (!section) {
      return false;
    }

    const isSmallViewport = window.innerWidth < 768;
    const offset = isSmallViewport ? 76 : 60;
    const top = window.scrollY + section.getBoundingClientRect().top - offset;

    window.scrollTo({ top: Math.max(0, top), behavior });
    return true;
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return;
    }

    let attempts = 0;
    let frameId = 0;
    let timeoutId = 0;

    const alignHash = () => {
      attempts += 1;
      const didAlign = scrollToHash(hash, "auto");

      if ((didAlign && attempts >= 8) || attempts >= 12) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        frameId = requestAnimationFrame(alignHash);
      }, 160);
    };

    frameId = requestAnimationFrame(alignHash);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleSectionLink = (
    href: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const hash = href.split("#")[1];

    if (!hash) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `/creative#${hash}`);
    scrollToHash(hash);
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5"
      animate={{ paddingTop: isScrolled ? 8 : 12 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="relative mx-auto flex items-center justify-between overflow-hidden rounded-[2rem] border backdrop-blur-2xl transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        animate={{
          maxWidth: isScrolled ? 860 : 1180,
          height: isScrolled ? 58 : 70,
          paddingLeft: isScrolled ? 14 : 20,
          paddingRight: isScrolled ? 14 : 18,
          borderColor: isScrolled
            ? "rgba(95,185,150,0.24)"
            : "rgba(255,255,255,0.1)",
          backgroundColor: isScrolled
            ? "rgba(7,7,7,0.78)"
            : "rgba(9,9,9,0.58)",
          boxShadow: isScrolled
            ? "0 16px 46px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 18px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5fb996]/24 to-transparent" />

        <MotionLink
          href="/creative"
          aria-label="Jorus creative page"
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#5fb996]/70"
        >
          <Logo compact={isScrolled} />
        </MotionLink>

        <motion.ul
          className="hidden items-center rounded-full border border-white/8 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:flex"
          animate={{
            gap: isScrolled ? 0 : 4,
            padding: isScrolled ? 3 : 4,
          }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        >
          {creativeLinks.map((link) => (
            <li key={link.href}>
              <MotionAnchor
                href={link.href}
                onClick={(event) => handleSectionLink(link.href, event)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  paddingLeft: isScrolled ? 12 : 16,
                  paddingRight: isScrolled ? 12 : 16,
                  paddingTop: isScrolled ? 8 : 10,
                  paddingBottom: isScrolled ? 8 : 10,
                  fontSize: isScrolled ? 13 : 14,
                }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="group relative inline-flex items-center overflow-hidden rounded-full font-semibold text-white/56 transition-colors duration-300 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5fb996]/70"
              >
                <span className="absolute inset-0 rounded-full bg-white/0 transition duration-300 ease-out group-hover:bg-white/[0.075]" />
                <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#2ee6a0] to-transparent shadow-[0_0_10px_rgba(46,230,160,0.7)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <span className="relative">{link.label}</span>
              </MotionAnchor>
            </li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#home"
            className="hidden rounded-full border border-white/12 px-4 py-2 text-sm font-black text-white/72 transition duration-300 hover:border-[#2ee6a0] hover:bg-[#2ee6a0]/10 hover:text-[#2ee6a0] hover:shadow-[0_0_20px_rgba(46,230,160,0.25)] sm:inline-flex"
          >
            Portfolio
          </Link>
          <Link
            href="/#contact"
            className="inline-flex rounded-full bg-[#5fb996] px-4 py-2 text-xs font-black text-black shadow-[0_0_24px_rgba(95,185,150,0.24)] transition duration-300 hover:bg-[#2ee6a0] hover:shadow-[0_0_38px_rgba(46,230,160,0.5)] active:bg-[#13d98f] sm:px-5 sm:text-sm"
          >
            Start Project
          </Link>
        </div>
      </motion.nav>
    </motion.header>
  );
}

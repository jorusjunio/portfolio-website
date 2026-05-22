"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Tools", href: "/#tools" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Creative", href: "/#creative" },
  { label: "Contact", href: "/#contact" },
];

const MotionLink = motion.create(Link);

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProjectPreviewOpen, setIsProjectPreviewOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  useEffect(() => {
    const handlePreviewOpen = () => setIsProjectPreviewOpen(true);
    const handlePreviewClose = () => setIsProjectPreviewOpen(false);

    window.addEventListener("project-preview-open", handlePreviewOpen);
    window.addEventListener("project-preview-close", handlePreviewClose);

    return () => {
      window.removeEventListener("project-preview-open", handlePreviewOpen);
      window.removeEventListener("project-preview-close", handlePreviewClose);
    };
  }, []);

  const scrollToHash = (hash: string, behavior: ScrollBehavior = "smooth") => {
    const sectionHash = hash === "contact-email" ? "contact" : hash;
    const section = document.getElementById(sectionHash);

    if (!section) {
      return false;
    }

    const isSmallViewport = window.innerWidth < 768;
    const offset = sectionHash === "home" ? 0 : isSmallViewport ? 72 : 52;
    let top = window.scrollY + section.getBoundingClientRect().top - offset;

    if (sectionHash === "projects") {
      const target = section.querySelector<HTMLElement>(
        "[data-section-scroll-target='projects']",
      );
      const targetRect = (target ?? section).getBoundingClientRect();
      const navClearance = isSmallViewport ? 96 : 84;
      const isCompactDesktop =
        window.innerHeight < 980 && !isSmallViewport;
      const visualOffset = isCompactDesktop
        ? 96
        : Math.max(
            navClearance + (isSmallViewport ? 24 : 56),
            window.innerHeight * (isSmallViewport ? 0.16 : 0.14),
          );

      top = window.scrollY + targetRect.top - visualOffset;
    }

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

      if ((didAlign && attempts >= 14) || attempts >= 18) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        frameId = requestAnimationFrame(alignHash);
      }, 180);
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

    const section = document.getElementById(hash);

    if (!section) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `/#${hash}`);
    scrollToHash(hash);
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 px-3 sm:px-5 ${
        isProjectPreviewOpen ? "hidden" : ""
      }`}
      animate={{
        paddingTop: isScrolled ? 8 : 12,
      }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="relative mx-auto flex items-center justify-between overflow-hidden rounded-[2rem] border backdrop-blur-2xl transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        animate={{
          maxWidth: isScrolled ? 920 : 1280,
          height: isScrolled ? 58 : 72,
          paddingLeft: isScrolled ? 14 : 20,
          paddingRight: isScrolled ? 14 : 24,
          borderColor: isScrolled ? "rgba(0,255,135,0.24)" : "rgba(255,255,255,0.1)",
          backgroundColor: isScrolled ? "rgba(7,7,7,0.78)" : "rgba(9,9,9,0.58)",
          boxShadow: isScrolled
            ? "0 16px 46px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 18px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/24 to-transparent" />

        <MotionLink
          href="/#home"
          aria-label="Jorus portfolio home"
          onClick={(event) => handleSectionLink("/#home", event)}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87]/70"
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
          {navLinks.map((link) => (
            <li key={link.href}>
              <MotionLink
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
                className="group relative inline-flex items-center overflow-hidden rounded-full font-semibold text-white/56 transition-colors duration-300 ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87]/70"
              >
                <span className="absolute inset-0 rounded-full bg-white/0 transition duration-300 ease-out group-hover:bg-white/[0.075]" />
                <span className="absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#00FF87]/90 to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <span className="relative">{link.label}</span>
              </MotionLink>
            </li>
          ))}
        </motion.ul>

        <div className="hidden items-center gap-3 md:flex">
          <MotionLink
            href="/#contact"
            onClick={(event) => handleSectionLink("/#contact", event)}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              paddingLeft: isScrolled ? 16 : 20,
              paddingRight: isScrolled ? 16 : 20,
              paddingTop: isScrolled ? 9 : 10,
              paddingBottom: isScrolled ? 9 : 10,
              fontSize: isScrolled ? 12 : 14,
            }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-full border border-[#00FF87]/60 bg-[#00FF87]/92 px-5 py-2.5 text-sm font-black text-black shadow-[0_0_24px_rgba(0,255,135,0.24),inset_0_1px_0_rgba(255,255,255,0.34)] transition duration-300 ease-out hover:bg-[#00FF87] hover:shadow-[0_0_34px_rgba(0,255,135,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF87]/70"
          >
            <span className="absolute inset-y-0 -left-8 w-8 rotate-12 bg-white/45 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-32" />
            <motion.span className="relative" animate={{ opacity: 1 }}>
              {isScrolled ? "Contact" : "Hire Me"}
            </motion.span>
          </MotionLink>
        </div>

        <details className="group relative md:hidden">
          <summary className="flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 ease-out hover:border-[#00FF87]/50 hover:bg-white/[0.1] [&::-webkit-details-marker]:hidden">
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:translate-y-2 group-open:rotate-45 group-open:text-[#00FF87]" />
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:opacity-0" />
            <span className="h-0.5 w-5 rounded-full bg-current transition duration-300 group-open:-translate-y-2 group-open:-rotate-45 group-open:text-[#00FF87]" />
          </summary>

          <div className="absolute right-0 top-14 w-[calc(100vw-2rem)] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#090909]/86 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleSectionLink(link.href, event)}
                  className="group flex items-center justify-between rounded-2xl px-3 py-3 text-base font-semibold text-white/62 transition duration-300 ease-out hover:bg-white/[0.07] hover:text-white"
                >
                  <span>{link.label}</span>
                  <span className="size-1.5 rounded-full bg-[#00FF87]/0 transition-colors duration-300 group-hover:bg-[#00FF87]/90" />
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={(event) => handleSectionLink("/#contact", event)}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#00FF87] px-5 py-3 text-sm font-black text-black shadow-[0_0_24px_rgba(0,255,135,0.24)] transition duration-300 ease-out hover:shadow-[0_0_34px_rgba(0,255,135,0.34)]"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </details>
      </motion.nav>
    </motion.header>
  );
}

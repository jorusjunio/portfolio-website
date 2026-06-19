"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { type MouseEvent } from "react";
import Logo from "./Logo";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Tools", href: "/#tools" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/jorusjunio",
    icon: "/assets/other-logos/GitHub_dark.svg",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/jorusdev28",
    icon: "/assets/other-logos/facebook-icon.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jorus-junio-079a89409/",
    icon: "/assets/other-logos/linkedin.svg",
  },
  {
    label: "Email",
    href: "/#contact-email",
    icon: "/assets/other-logos/gmail.svg",
  },
];

export default function Footer() {
  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const contactSection = document.getElementById("contact");

    if (!contactSection) {
      window.location.href = "/#contact";
      return;
    }

    const isSmallViewport = window.innerWidth < 768;
    const offset = isSmallViewport ? 72 : 52;
    const top =
      window.scrollY + contactSection.getBoundingClientRect().top - offset;

    window.history.pushState(null, "", "/#contact-email");
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

    window.requestAnimationFrame(() => {
      const highlightedCards = document.querySelectorAll<HTMLElement>(
        "#contact-email, #contact-message-card",
      );

      highlightedCards.forEach((card) => {
        card.dataset.contactHighlight = "true";
        window.setTimeout(() => {
          delete card.dataset.contactHighlight;
        }, 2000);
      });
    });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden bg-[#010205] px-5 pb-8 pt-20 text-white sm:px-8 lg:px-10 lg:pt-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <Link href="/#home" aria-label="Jorus portfolio home">
              <Logo />
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
              Ready when you are
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              Let&apos;s build something clean, useful, and easy to remember.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:justify-self-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#888888]">
                Menu
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-white transition-colors duration-300 hover:text-[#5fb996]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#888888]">
                Connect
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {socials.map((social) => {
                  const content = (
                    <>
                      <span className="grid size-6 place-items-center">
                        <Image
                          src={social.icon}
                          alt={`${social.label} logo`}
                          width={20}
                          height={20}
                          className="h-5 w-5 object-contain transition duration-300 group-hover:scale-110"
                          unoptimized
                        />
                      </span>
                      <span>{social.label}</span>
                    </>
                  );

                  if (social.label === "Email") {
                    return (
                      <Link
                        key={social.label}
                        href={social.href}
                        onClick={handleEmailClick}
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors duration-300 hover:text-[#5fb996]"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors duration-300 hover:text-[#5fb996]"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative pt-12">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
            className="select-none whitespace-nowrap text-[clamp(4.2rem,20vw,19rem)] font-black uppercase leading-[0.75] tracking-normal text-white"
          >
            Jorus
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-[#5fb996]"
            >
              .
            </motion.span>
          </motion.p>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#888888] sm:flex-row sm:items-center">
            <p>2026 Jorus. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

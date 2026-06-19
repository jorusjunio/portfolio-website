"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";
import AuraGlow from "./AuraGlow";
import Starfield from "./Starfield";

const contactDetails = [
  { label: "Email", value: "jorusjunio28@gmail.com", href: "mailto:jorusjunio28@gmail.com" },
  { label: "GitHub", value: "github.com/jorusjunio", href: "https://github.com/jorusjunio" },
  { label: "Location", value: "Philippines", href: null },
  { label: "Availability", value: "Open for freelance projects", href: null },
];

const projectTypes = [
  "Portfolio Website",
  "Business Website",
  "Web System",
  "Other (Filming, Cinematic Editing, Custom Work, etc.)",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailHighlighted, setIsEmailHighlighted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let highlightTimeoutId = 0;

    const checkContactEmailHash = () => {
      if (window.location.hash === "#contact-email") {
        window.clearTimeout(highlightTimeoutId);
        setIsEmailHighlighted(true);
        highlightTimeoutId = window.setTimeout(() => {
          setIsEmailHighlighted(false);
        }, 2000);
      }
    };

    checkContactEmailHash();
    window.addEventListener("hashchange", checkContactEmailHash);

    return () => {
      window.clearTimeout(highlightTimeoutId);
      window.removeEventListener("hashchange", checkContactEmailHash);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          project_type: formData.get("projectType"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      form.reset();
      setSubmitMessage({
        type: "success",
        text: "Message sent successfully. I'll get back to you soon.",
      });
    } catch {
      setSubmitMessage({
        type: "error",
        text: "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#03060b_0%,#03060b_84%,#010205_100%)] px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-24"
    >
      <Starfield />
      <AuraGlow variant="aqua" side="right" className="right-[-12rem] top-[12%] h-[28rem] w-[28rem]" />
      <AuraGlow variant="aqua" className="left-[-14rem] bottom-[8%] h-[30rem] w-[30rem]" delay={2} duration={19} />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
            Contact
          </p>
          <RevealHeading className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl lg:text-5xl">
            Let&apos;s build something useful together.
          </RevealHeading>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#b0b0b0]">
            Have an idea for a website, system, creative project, or filming/editing
            request? Share the details below and I&apos;ll get back to you as soon
            as I can.
          </p>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            {contactDetails.map((detail) => (
              <motion.div
                key={detail.label}
                id={detail.label === "Email" ? "contact-email" : undefined}
                data-contact-highlight={
                  isEmailHighlighted && detail.label === "Email"
                    ? "true"
                    : undefined
                }
                whileHover={{ y: -2 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="contact-email-target group relative overflow-hidden border border-white/10 bg-[#0a1118]/85 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:border-[#2ee6a0]/55 hover:shadow-[0_16px_44px_rgba(46,230,160,0.16)]"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#5fb996]/80 via-[#5fb996]/15 to-transparent opacity-70" />
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#a0f7c0]">
                    {detail.label}
                  </p>
                  <span className="h-3 w-3 rounded-full bg-[#5fb996]/70 transition duration-300 group-hover:bg-[#2ee6a0] group-hover:shadow-[0_0_14px_rgba(46,230,160,0.8)]" />
                </div>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="block break-words text-sm font-semibold leading-6 text-white transition-colors duration-300 hover:text-[#2ee6a0] sm:text-base"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="break-words text-sm font-semibold leading-6 text-white sm:text-base">
                    {detail.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.form
          id="contact-message-card"
          data-contact-highlight={isEmailHighlighted ? "true" : undefined}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 bg-[#0a1118] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] transition duration-500 sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
                Name
              </span>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="mt-3 w-full border border-white/10 bg-[#080d14] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#5d5d5d] focus:border-[#5fb996]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
                Email
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="mt-3 w-full border border-white/10 bg-[#080d14] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#5d5d5d] focus:border-[#5fb996]"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
              Project / Service Type
            </span>
            <div className="group relative mt-3">
              <select
                name="projectType"
                defaultValue=""
                required
                className="w-full appearance-none border border-white/10 bg-[#080d14] px-4 py-4 pr-12 text-sm font-semibold text-white outline-none transition duration-300 hover:border-white/25 focus:border-[#5fb996] focus:shadow-[0_0_28px_rgba(95,185,150,0.14)]"
              >
                <option value="" disabled>
                  Select a project type
                </option>
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#080d14]">
                    {type}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center border border-white/10 bg-white/[0.04] text-[#5fb996] transition duration-300 group-hover:border-[#5fb996]/40 group-focus-within:border-[#5fb996]/70 group-focus-within:bg-[#5fb996]/10">
                <span className="size-2 rotate-45 border-b-2 border-r-2 border-current" />
              </span>
            </div>
          </label>

          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
              Message
            </span>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              className="mt-3 w-full resize-none border border-white/10 bg-[#080d14] px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#5d5d5d] focus:border-[#5fb996]"
            />
          </label>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#5fb996] px-6 py-3 text-sm font-black text-black shadow-[0_0_24px_rgba(95,185,150,0.22)] transition duration-300 hover:bg-[#2ee6a0] hover:shadow-[0_0_44px_rgba(46,230,160,0.55)] active:bg-[#13d98f] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {submitMessage ? (
            <p
              className={`mt-5 text-sm font-semibold leading-6 ${
                submitMessage.type === "success"
                  ? "text-[#5fb996]"
                  : "text-red-400"
              }`}
            >
              {submitMessage.text}
            </p>
          ) : null}
        </motion.form>
      </div>
    </motion.section>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const contactDetails = [
  { label: "Email", value: "jorusjunio28@gmail.com", href: "mailto:jorusjunio28@gmail.com" },
  { label: "GitHub", value: "github.com/jorusjunio", href: "https://github.com/jorusjunio" },
  { label: "Location", value: "Philippines", href: null },
  { label: "Availability", value: "Open for freelance projects", href: null },
];

const projectTypes = ["Portfolio Website", "Business Website", "Web System"];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailHighlighted, setIsEmailHighlighted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let previousHash = "";
    let highlightTimeoutId = 0;

    const checkContactEmailHash = () => {
      const currentHash = window.location.hash;

      if (currentHash === "#contact-email" && currentHash !== previousHash) {
        window.clearTimeout(highlightTimeoutId);
        setIsEmailHighlighted(true);
        highlightTimeoutId = window.setTimeout(() => {
          setIsEmailHighlighted(false);
        }, 2000);
      }

      previousHash = currentHash;
    };

    checkContactEmailHash();
    const intervalId = window.setInterval(checkContactEmailHash, 120);
    window.addEventListener("hashchange", checkContactEmailHash);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(highlightTimeoutId);
      window.removeEventListener("hashchange", checkContactEmailHash);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitMessage({
        type: "error",
        text: "Email service is not configured yet. Please try again later.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.get("name"),
          email: formData.get("email"),
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          project_type: formData.get("projectType"),
          message: formData.get("message"),
        },
        { publicKey },
      );

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
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#0A0A0A_0%,#0A0A0A_84%,#050505_100%)] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#00FF87]">
            Contact
          </p>
          <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
            Let&apos;s build something useful together.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#888888]">
            Have a website idea, school system, or small business workflow you
            want to turn into a clean web experience? Send the details and I&apos;ll
            get back to you as soon as I can.
          </p>

          <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
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
                className="contact-email-target group relative overflow-hidden rounded-lg border border-white/10 bg-[#111111]/72 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition duration-500 hover:border-[#00FF87]/35"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#00FF87]/80 via-[#00FF87]/15 to-transparent opacity-70" />
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#888888]">
                    {detail.label}
                  </p>
                  <span className="size-2 rounded-full bg-[#00FF87]/45 transition duration-300 group-hover:bg-[#00FF87]" />
                </div>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="block break-words text-base font-bold leading-6 text-white transition-colors duration-300 hover:text-[#00FF87] sm:text-lg"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="break-words text-base font-bold leading-6 text-white sm:text-lg">
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
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 bg-[#111111] p-6 shadow-none transition duration-500 sm:p-8"
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
                className="mt-3 w-full border border-white/10 bg-[#0A0A0A] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-[#555555] focus:border-[#00FF87]"
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
                className="mt-3 w-full border border-white/10 bg-[#0A0A0A] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-[#555555] focus:border-[#00FF87]"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
              Project Type
            </span>
            <div className="group relative mt-3">
              <select
                name="projectType"
                defaultValue=""
                required
                className="w-full appearance-none border border-white/10 bg-[#0A0A0A] px-4 py-4 pr-12 text-sm font-semibold text-white outline-none transition duration-300 hover:border-white/25 focus:border-[#00FF87] focus:shadow-[0_0_28px_rgba(0,255,135,0.14)]"
              >
                <option value="" disabled>
                  Select a project type
                </option>
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#0A0A0A]">
                    {type}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center border border-white/10 bg-white/[0.04] text-[#00FF87] transition duration-300 group-hover:border-[#00FF87]/40 group-focus-within:border-[#00FF87]/70 group-focus-within:bg-[#00FF87]/10">
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
              rows={6}
              placeholder="Tell me about your project..."
              required
              className="mt-3 w-full resize-none border border-white/10 bg-[#0A0A0A] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-[#555555] focus:border-[#00FF87]"
            />
          </label>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#00FF87] px-7 py-4 text-sm font-black text-black shadow-[0_0_34px_rgba(0,255,135,0.25)] transition-shadow duration-300 hover:shadow-[0_0_46px_rgba(0,255,135,0.4)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {submitMessage ? (
            <p
              className={`mt-5 text-sm font-semibold leading-6 ${
                submitMessage.type === "success"
                  ? "text-[#00FF87]"
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

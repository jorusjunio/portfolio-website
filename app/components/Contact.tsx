"use client";

import { motion } from "framer-motion";

const contactDetails = [
  { label: "Email", value: "jorusjunio28@gmail.com", href: "mailto:jorusjunio28@gmail.com" },
  { label: "Location", value: "Philippines", href: null },
  { label: "Availability", value: "Open for freelance projects", href: null },
];

const projectTypes = ["Portfolio Website", "Business Website", "Web System"];

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ y: 32 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-20 bg-[#0A0A0A] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
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

          <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#00FF87]">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="mt-2 inline-block text-lg font-bold text-white transition-colors duration-300 hover:text-[#00FF87]"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-bold text-white">
                    {detail.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="border border-white/10 bg-[#111111] p-6 sm:p-8"
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
                className="mt-3 w-full border border-white/10 bg-[#0A0A0A] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-[#555555] focus:border-[#00FF87]"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
              Project Type
            </span>
            <select
              name="projectType"
              defaultValue=""
              className="mt-3 w-full border border-white/10 bg-[#0A0A0A] px-4 py-4 text-sm text-white outline-none transition-colors focus:border-[#00FF87]"
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#888888]">
              Message
            </span>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about your project..."
              className="mt-3 w-full resize-none border border-white/10 bg-[#0A0A0A] px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-[#555555] focus:border-[#00FF87]"
            />
          </label>

          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#00FF87] px-7 py-4 text-sm font-black text-black shadow-[0_0_34px_rgba(0,255,135,0.25)] transition-shadow duration-300 hover:shadow-[0_0_46px_rgba(0,255,135,0.4)] sm:w-auto"
          >
            Send Message
          </motion.button>

          <p className="mt-5 text-sm leading-6 text-[#888888]">
            This form is ready for UI. We can connect it later to EmailJS,
            Formspree, or a custom API route.
          </p>
        </motion.form>
      </div>
    </motion.section>
  );
}

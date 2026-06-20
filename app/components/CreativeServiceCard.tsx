"use client";

import { motion } from "framer-motion";

type CreativeServiceCardProps = {
  number: string;
  title: string;
  text: string;
  points: string[];
  index: number;
};

/**
 * Service card matching the main portfolio's Services section: reveals on
 * scroll, lifts on hover with a bright accent edge + glow, an accent number
 * with a divider that lights up, and a bulleted feature list.
 */
export default function CreativeServiceCard({
  number,
  title,
  text,
  points,
  index,
}: CreativeServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.08, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-white/10 bg-[#0a1017] p-6 transition duration-300 hover:border-[#2ee6a0]/70 hover:shadow-[0_22px_60px_rgba(46,230,160,0.12)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-sm font-black text-[#5fb996]">{number}</span>
        <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-[#2ee6a0]/70" />
      </div>

      <h2 className="mt-10 text-3xl font-black leading-tight text-white">
        {title}
      </h2>
      <p className="mt-5 min-h-28 text-base leading-7 text-[#888888] transition-colors duration-300 group-hover:text-[#D7D7D7]">
        {text}
      </p>

      <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-center gap-3 text-sm font-medium text-white"
          >
            <span className="size-1.5 rounded-full bg-[#5fb996] transition-colors duration-300 group-hover:bg-[#2ee6a0]" />
            {point}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

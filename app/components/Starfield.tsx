"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  r: number;
  depth: number; // 0 = far / faint / slow, 1 = near / bright / parallax-heavy
  base: [number, number, number];
  baseAlpha: number;
  twAmp: number;
  twSpeed: number;
  twPhase: number;
  vx: number;
  vy: number;
  glow: boolean;
};

// Galaxy palette: mostly icy white/blue with a sprinkle of brand teal/mint.
const PALETTE: [number, number, number][] = [
  [255, 255, 255],
  [255, 255, 255],
  [210, 235, 255],
  [190, 225, 255],
  [150, 210, 255],
  [170, 255, 220],
  [95, 185, 150],
];

// Vibe gradient sampled by scroll progress (top -> bottom of the page): the
// whole field tints from minty emerald, through blue and indigo, to violet.
const VIBE: [number, number, number][] = [
  [140, 235, 200],
  [120, 205, 255],
  [165, 150, 255],
  [205, 150, 235],
];

// Master visibility of the whole field — subtle, but still noticeable (~20%).
const INTENSITY = 0.2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const wrap = (v: number, max: number) => ((v % max) + max) % max;

// Shared pointer parallax across every Starfield instance, so the page installs
// a single `pointermove` listener instead of one per section.
const pointer = { x: 0, y: 0 };
let pointerSubscribers = 0;
let pointerHandler: ((e: PointerEvent) => void) | null = null;

function subscribePointer() {
  pointerSubscribers += 1;
  if (pointerSubscribers === 1) {
    pointerHandler = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", pointerHandler, { passive: true });
  }
}

function unsubscribePointer() {
  pointerSubscribers = Math.max(0, pointerSubscribers - 1);
  if (pointerSubscribers === 0 && pointerHandler) {
    window.removeEventListener("pointermove", pointerHandler);
    pointerHandler = null;
  }
}

function vibeAt(progress: number): [number, number, number] {
  const seg = progress * (VIBE.length - 1);
  const i = Math.min(VIBE.length - 2, Math.max(0, Math.floor(seg)));
  const f = seg - i;
  const a = VIBE[i];
  const b = VIBE[i + 1];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
}

/**
 * A seamless, interactive galaxy particle field on a canvas. Particles are
 * randomised per instance and scaled to the section's area, so the field never
 * repeats or shows a tiling seam. They drift slowly with parallax by depth and
 * twinkle on independent cycles; brighter "glow" stars get a soft halo.
 *
 * Interactivity: the field parallax-shifts toward the cursor (by depth), and
 * its whole vibe — tint + an extra parallax drift — shifts with global page
 * scroll progress, so scrolling down feels like travelling through the galaxy.
 * Static single frame for reduced-motion users, paused while off-screen or the
 * tab is hidden.
 */
export default function Starfield({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let maxScroll = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let onScreen = true;
    let last = performance.now();

    // Locally smoothed copy of the shared pointer parallax for a weighty feel.
    let px = 0;
    let py = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const build = () => {
      const area = width * height;
      // Lower density + cap: up to 6 Starfields run on the homepage, each with
      // its own rAF loop, so trimming particle count per field is the cheapest
      // way to claw back frame budget without losing the galaxy feel.
      const count = Math.max(18, Math.min(90, Math.round(area / 20000)));
      particles = Array.from({ length: count }, () => {
        const depth = Math.random();
        const glow = Math.random() < 0.05;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: glow ? rand(1.4, 2.6) : rand(0.4, 1.3) * (0.6 + depth * 0.8),
          depth,
          base: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          baseAlpha: glow ? rand(0.5, 0.85) : rand(0.18, 0.62) * (0.5 + depth * 0.5),
          twAmp: rand(0.08, 0.4),
          twSpeed: rand(0.0004, 0.0016),
          twPhase: Math.random() * Math.PI * 2,
          vx: rand(-1, 1) * (1.2 + depth * 4),
          vy: rand(-1, 1) * (1.2 + depth * 4),
          glow,
        };
      });
    };

    const draw = (t: number) => {
      const scrollY = window.scrollY || 0;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      const vibe = vibeAt(progress);

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Vibe tint: blend the star's own colour toward the scroll vibe.
        const k = 0.45 * p.depth + 0.2;
        const r = lerp(p.base[0], vibe[0], k);
        const g = lerp(p.base[1], vibe[1], k);
        const b = lerp(p.base[2], vibe[2], k);

        // Parallax: cursor offset + an extra scroll-driven drift, both by depth.
        const offX = px * (4 + p.depth * 26);
        const offY = py * (4 + p.depth * 26) - scrollY * (0.02 + p.depth * 0.12);
        const x = wrap(p.x + offX, width);
        const y = wrap(p.y + offY, height);

        const alpha =
          INTENSITY *
          (reduce
            ? p.baseAlpha
            : Math.max(0, p.baseAlpha + Math.sin(t * p.twSpeed + p.twPhase) * p.twAmp));

        if (p.glow) {
          const halo = p.r * 4;
          const grad = ctx.createRadialGradient(x, y, 0, x, y, halo);
          grad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, halo, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      // Ease the pointer parallax toward its target for a smooth, weighty feel.
      px += (pointer.x - px) * Math.min(1, dt * 3);
      py += (pointer.y - py) * Math.min(1, dt * 3);
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -3) p.x = width + 3;
        else if (p.x > width + 3) p.x = -3;
        if (p.y < -3) p.y = height + 3;
        else if (p.y > height + 3) p.y = -3;
      }
      draw(now);
      rafId = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduce || rafId) return;
      last = performance.now();
      rafId = requestAnimationFrame(step);
    };
    const stop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(performance.now());
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden || !onScreen) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduce) {
      subscribePointer();
      if (onScreen) start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (!reduce) unsubscribePointer();
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    const stopSmoothScroll = () => lenis.stop();
    const startSmoothScroll = () => lenis.start();
    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);
    window.addEventListener("project-preview-open", stopSmoothScroll);
    window.addEventListener("project-preview-close", startSmoothScroll);

    return () => {
      window.removeEventListener("project-preview-open", stopSmoothScroll);
      window.removeEventListener("project-preview-close", startSmoothScroll);
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}

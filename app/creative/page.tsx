import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AuraGlow from "../components/AuraGlow";
import CreativeNavbar from "../components/CreativeNavbar";
import CreativeServiceCard from "../components/CreativeServiceCard";
import Footer from "../components/Footer";
import IntroAnimation from "../components/IntroAnimation";
import Magnetic from "../components/Magnetic";
import MotionSection from "../components/MotionSection";
import Reveal from "../components/Reveal";
import SmoothScroll from "../components/SmoothScroll";
import Starfield from "../components/Starfield";

export const metadata: Metadata = {
  title: "Creative Work | Jorus",
  description:
    "Cinematic editing, filming, visual direction, and creative production work by Jorus.",
};

const creativeServices = [
  {
    title: "Cinematic Editing",
    text: "Mood-driven cuts, pacing, transitions, and color direction for videos that need a stronger feeling from start to finish.",
    points: ["Story-driven pacing", "Clean transitions", "Color mood"],
  },
  {
    title: "Filming",
    text: "Simple but intentional shots for school projects, creator content, reels, and small brand visuals.",
    points: ["Shot planning", "Camera movement", "Composition"],
  },
  {
    title: "Short-Form Content",
    text: "Fast, polished edits for vertical videos, highlights, teasers, and social media posts.",
    points: ["Reels", "Teasers", "Highlights"],
  },
];

const workflow = [
  "Plan the mood, format, and story direction.",
  "Capture or organize clips around the strongest moments.",
  "Shape the timeline with rhythm, pacing, and clean cuts.",
  "Tune color, sound, text, and final export for the platform.",
];

const toolAreas = [
  "Editing timeline",
  "Color grading",
  "Sound cleanup",
  "Motion text",
  "Shot planning",
  "Export polish",
];

const creativeTools = [
  {
    name: "CapCut",
    logo: "/assets/other-logos/Capcut-icon.svg",
    description: "Fast short-form cuts, captions, reels, and social-first edits.",
  },
  {
    name: "Adobe Premiere Pro",
    logo: "/assets/other-logos/adobe-premiere-pro.svg",
    description: "Timeline editing, pacing, audio cleanup, and polished exports.",
  },
  {
    name: "After Effects",
    logo: "/assets/other-logos/adobe-after-effects.svg",
    description: "Motion text, visual accents, title work, and animated details.",
  },
];

const showcaseFormats = [
  {
    label: "Creator Reel",
    title: "Short-form vertical edits",
    description: "Punchy cuts, clean pacing, captions, and mood-focused color.",
  },
  {
    label: "Cinematic Video",
    title: "Story-led visual pieces",
    description: "A more intentional edit style built around atmosphere and flow.",
  },
  {
    label: "Brand Visual",
    title: "Simple promo content",
    description: "Clean video direction for small businesses and local brands.",
  },
];

export default function CreativePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#060a10] text-white">
      <SmoothScroll />
      <IntroAnimation />
      <CreativeNavbar />

      <MotionSection className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#080d14_0%,#0a1017_76%,#060a10_100%)] px-5 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-28 lg:pt-40">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_24%,rgba(95,185,150,0.16),transparent_30%),radial-gradient(circle_at_12%_70%,rgba(255,255,255,0.055),transparent_24%)]" />
        <Starfield className="-z-10" />
        <AuraGlow variant="violet" className="left-[-12rem] top-[14%] h-[28rem] w-[28rem]" />
        <AuraGlow variant="violet" side="right" className="right-[-14rem] bottom-[8%] h-[30rem] w-[30rem]" delay={2.5} duration={18} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
              Creative Work
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-white sm:text-7xl lg:text-8xl">
              Cinematic editing and filming.
            </h1>
          </Reveal>

          <Reveal className="max-w-2xl lg:justify-self-end" delay={0.08}>
            <p className="text-lg leading-8 text-[#D7D7D7]">
              A focused space for the visual side of my portfolio: cinematic
              edits, filming, short-form content, and visual storytelling for
              creators, students, small brands, and personal projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#5fb996] px-7 py-3 text-sm font-black text-black shadow-[0_0_34px_rgba(95,185,150,0.24)] transition duration-300 hover:bg-[#2ee6a0] hover:shadow-[0_0_52px_rgba(46,230,160,0.55)] active:bg-[#13d98f]"
                >
                  Start a Creative Project
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/#creative"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-black text-white transition duration-300 hover:border-[#2ee6a0] hover:bg-[#2ee6a0]/10 hover:text-[#2ee6a0] hover:shadow-[0_0_28px_rgba(46,230,160,0.28)] active:bg-[#2ee6a0]/20"
                >
                  Back to Portfolio
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </MotionSection>

      <MotionSection
        id="creative-services"
        className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#060a10_0%,#0a1017_100%)] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <Starfield className="-z-10" />
        <AuraGlow variant="mint" className="left-[-14rem] top-[16%] h-[28rem] w-[28rem]" delay={1} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {creativeServices.map((item, index) => (
              <CreativeServiceCard
                key={item.title}
                number={`0${index + 1}`}
                title={item.title}
                text={item.text}
                points={item.points}
                index={index}
              />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="creative-workflow"
        className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0a1017_0%,#0b1118_100%)] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <Starfield className="-z-10" />
        <AuraGlow variant="cyan" side="right" className="right-[-14rem] top-[12%] h-[30rem] w-[30rem]" delay={1.5} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
              Workflow
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              From raw clips to a finished visual piece.
            </h2>
          </Reveal>

          <div className="grid gap-4">
            {workflow.map((step, index) => (
              <Reveal
                key={step}
                delay={index * 0.06}
                className="grid gap-4 border border-white/10 bg-[#080d14] p-5 transition duration-300 hover:border-[#2ee6a0]/60 hover:shadow-[0_18px_50px_rgba(46,230,160,0.1)] sm:grid-cols-[4rem_1fr] sm:items-center sm:p-6"
              >
                <span className="text-3xl font-black text-[#5fb996]">
                  0{index + 1}
                </span>
                <p className="text-base leading-7 text-[#D7D7D7]">{step}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="creative-tools"
        className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0b1118_0%,#0a1017_100%)] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <Starfield className="-z-10" />
        <AuraGlow variant="teal" className="left-[-12rem] bottom-[10%] h-[28rem] w-[28rem]" delay={2} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
                Creative Tool Stack
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Editing tools for sharper visual output.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#888888]">
              A focused set of creative tools for video editing, motion polish,
              short-form pacing, and export-ready visuals.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {creativeTools.map((tool, index) => (
              <Reveal
                key={tool.name}
                delay={index * 0.08}
                className="group relative overflow-hidden border border-white/10 bg-[#0a1017] p-6 transition duration-300 hover:border-[#2ee6a0]/65 hover:shadow-[0_22px_60px_rgba(46,230,160,0.12)] sm:p-8"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(46,230,160,0.16),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-5">
                  <div className="grid size-16 place-items-center border border-white/10 bg-black/35 transition-colors duration-300 group-hover:border-[#2ee6a0]/60 group-hover:bg-[#2ee6a0]/15">
                    <Image
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      width={42}
                      height={42}
                      className="max-h-11 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-black text-[#5fb996]">
                    0{index + 1}
                  </span>
                </div>
                <div className="relative mt-9">
                  <h3 className="text-2xl font-black text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#888888] transition-colors duration-300 group-hover:text-[#D7D7D7]">
                    {tool.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="creative-formats"
        className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#0a1017_0%,#060a10_100%)] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
      >
        <Starfield className="-z-10" />
        <AuraGlow variant="aqua" side="right" className="right-[-12rem] bottom-[8%] h-[28rem] w-[28rem]" delay={2.5} duration={19} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5fb996]">
                Tools & Formats
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Built around the kind of content you need.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#888888]">
              The setup can adapt per project, but the focus stays the same:
              clean footage, intentional pacing, polished color, and an export
              that fits the platform.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal className="border border-white/10 bg-[#0a1017] p-6 sm:p-8">
              <h3 className="text-2xl font-black text-white">Tool Focus</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {toolAreas.map((tool) => (
                  <div
                    key={tool}
                    className="border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/72"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {showcaseFormats.map((format, index) => (
                <Reveal
                  key={format.label}
                  delay={index * 0.08}
                  className="border border-white/10 bg-[#0a1017] p-6 transition duration-300 hover:border-[#2ee6a0]/65 hover:shadow-[0_18px_50px_rgba(46,230,160,0.12)]"
                >
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5fb996]">
                    {format.label}
                  </p>
                  <h3 className="mt-8 text-2xl font-black leading-tight text-white">
                    {format.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-[#888888]">
                    {format.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <Footer />
    </main>
  );
}

import Image from "next/image";

type LogoProps = {
  compact?: boolean;
};

const logoSrc = "/assets/logo/J logo without bg.png";

export default function Logo({ compact = false }: LogoProps) {
  return (
    <span
      className={[
        "group/logo relative inline-grid h-12 w-12 place-items-center overflow-visible",
        "transition duration-500 ease-out hover:-translate-y-0.5",
        compact ? "h-10 w-10" : "",
      ].join(" ")}
    >
      <span className="absolute inset-1 rounded-[45%] bg-[#00FF87]/0 blur-md transition duration-500 group-hover/logo:bg-[#00FF87]/12" />
      <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#00FF87] opacity-0 shadow-[0_0_14px_rgba(0,255,135,0.8)] transition duration-500 group-hover/logo:opacity-100" />
      <span className="absolute bottom-1 left-2 h-px w-8 origin-left scale-x-0 bg-gradient-to-r from-[#00FF87] via-white/70 to-transparent transition-transform duration-500 ease-out group-hover/logo:scale-x-100" />
      <span className="absolute bottom-1 left-2 size-1 -translate-x-1 rounded-full bg-[#00FF87] opacity-0 shadow-[0_0_12px_rgba(0,255,135,0.75)] transition duration-500 group-hover/logo:translate-x-7 group-hover/logo:opacity-100" />
      <span className="absolute inset-y-0 left-0 w-8 -translate-x-14 skew-x-[-18deg] rounded-full bg-gradient-to-r from-transparent via-[#00FF87]/18 to-transparent opacity-0 blur-sm transition-[opacity,transform] duration-700 ease-out [mask-image:linear-gradient(90deg,transparent,#000_35%,#000_65%,transparent)] group-hover/logo:translate-x-16 group-hover/logo:opacity-100" />
      <span className="relative h-12 w-12 shrink-0 overflow-visible">
        <Image
          src={logoSrc}
          alt=""
          width={60}
          height={60}
          priority
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain invert drop-shadow-[0_0_12px_rgba(255,255,255,0.14)] transition duration-500 ease-out group-hover/logo:scale-[1.06] group-hover/logo:drop-shadow-[0_0_18px_rgba(0,255,135,0.62)] group-hover/logo:[filter:invert(73%)_sepia(98%)_saturate(789%)_hue-rotate(94deg)_brightness(107%)_contrast(106%)]"
        />
      </span>
    </span>
  );
}

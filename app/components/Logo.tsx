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
        "transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5",
        compact ? "h-10 w-10" : "",
      ].join(" ")}
    >
      <span className="relative h-12 w-12 shrink-0 overflow-visible">
        <Image
          src={logoSrc}
          alt=""
          width={60}
          height={60}
          priority
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain invert drop-shadow-[0_0_10px_rgba(255,255,255,0.14)] transition duration-300 ease-out group-hover/logo:scale-105 group-hover/logo:drop-shadow-[0_0_14px_rgba(95,185,150,0.38)]"
        />
      </span>
    </span>
  );
}

"use client";

import Image from "next/image";

interface BackgroundLogoProps {
  position?: "left" | "right" | "center";
  opacity?: number;
  size?: number;
  fixed?: boolean;
}

export default function BackgroundLogo({
  position = "center",
  opacity = 0.06,
  size = 400,
  fixed = false,
}: BackgroundLogoProps) {
  const positionStyles = {
    left: { left: "10%", transform: "translate(-50%, -50%)" },
    right: { right: "10%", transform: "translate(50%, -50%)" },
    center: { left: "50%", transform: "translate(-50%, -50%)" },
  };

  return (
    <div
      className={`${fixed ? "fixed" : "absolute"} top-1/2 pointer-events-none select-none`}
      style={{ opacity, ...positionStyles[position], zIndex: -1 }}
      aria-hidden="true"
    >
      <Image
        src="/newLogo.png"
        alt=""
        width={size}
        height={size}
        className="object-contain"
        priority={false}
      />
    </div>
  );
}

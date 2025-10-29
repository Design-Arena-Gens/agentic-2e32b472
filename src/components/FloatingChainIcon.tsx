"use client";

import { useEffect, useMemo, useState } from "react";

const gradients = [
  { id: "grad-a", stops: ["#60a5fa", "#22d3ee", "#a855f7"] },
  { id: "grad-b", stops: ["#38bdf8", "#4f46e5", "#c084fc"] },
];

export function FloatingChainIcon() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 8;
      const y = (event.clientY / innerHeight - 0.5) * 8;
      setTilt({ x, y });
    };

    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  const transform = useMemo(() => {
    return {
      transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
    };
  }, [tilt.x, tilt.y]);

  return (
    <div className="floating-icon relative hidden h-64 w-64 lg:block" style={{ perspective: "1200px" }} aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full glow-ring"
        style={{ ...transform }}
      />
      <svg
        viewBox="0 0 320 320"
        className="relative z-10 h-full w-full transition-transform duration-500 ease-out will-change-transform"
        style={{ ...transform }}
      >
        <defs>
          {gradients.map((gradient) => (
            <linearGradient key={gradient.id} id={gradient.id} gradientTransform="rotate(35)">
              {gradient.stops.map((stop, index) => (
                <stop key={stop} offset={`${(index / (gradient.stops.length - 1)) * 100}%`} stopColor={stop} />
              ))}
            </linearGradient>
          ))}
        </defs>
        <g filter="url(#shadow)">
          <path
            d="M94 80L160 40L226 80V160L160 200L94 160Z"
            fill="url(#grad-a)"
            opacity="0.88"
            stroke="rgba(226,232,255,0.4)"
            strokeWidth="6"
          />
          <path
            d="M160 200L226 160L286 194L220 234Z"
            fill="url(#grad-b)"
            opacity="0.72"
            stroke="rgba(226,232,255,0.35)"
            strokeWidth="5"
          />
          <path
            d="M160 200L100 164L34 204L94 240Z"
            fill="url(#grad-b)"
            opacity="0.65"
            stroke="rgba(226,232,255,0.28)"
            strokeWidth="5"
          />
          <circle cx="160" cy="112" r="26" fill="rgba(56,189,248,0.4)" stroke="rgba(56,189,248,0.9)" strokeWidth="5" />
          <circle cx="226" cy="160" r="18" fill="rgba(129,140,248,0.32)" stroke="rgba(129,140,248,0.8)" strokeWidth="5" />
          <circle cx="94" cy="160" r="18" fill="rgba(14,165,233,0.32)" stroke="rgba(14,165,233,0.8)" strokeWidth="5" />
        </g>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="rgba(14,116,144,0.55)" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

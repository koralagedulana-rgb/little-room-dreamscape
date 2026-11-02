import { useId } from "react";
import mistySpires from "@/assets/misty-gothic-spires.jpg";

/** Shares the original window footprint so saved room arrangements stay intact. */
export function GothicWindow() {
  const clipId = `gothic-window-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 100 110" className="h-full w-full" role="img" aria-label="Arched gothic window overlooking misty spires">
      <defs>
        <clipPath id={clipId}>
          <path d="M13 96V43Q13 23 50 10Q87 23 87 43V96Z" />
        </clipPath>
      </defs>
      <path d="M5 100V43Q5 17 50 2Q95 17 95 43V100Z" fill="var(--window-wood-dark)" />
      <path d="M9 98V43Q9 20 50 6Q91 20 91 43V98Z" fill="var(--window-wood)" stroke="var(--window-edge)" strokeWidth="1" />
      <g clipPath={`url(#${clipId})`}>
        <image href={mistySpires} x="13" y="8" width="74" height="90" preserveAspectRatio="xMidYMid slice" />
        <path d="M13 43Q13 23 50 10Q87 23 87 43" fill="none" stroke="var(--window-glass)" strokeWidth="2" opacity="0.25" />
        <path d="M19 42L27 28M20 63L38 31M69 86L81 65" stroke="var(--window-glass)" strokeWidth="0.6" opacity="0.17" />
        <path d="M50 11V97M13 58H87" stroke="var(--window-wood-dark)" strokeWidth="3.5" />
        <path d="M49 12V96M13 57H87" stroke="var(--window-edge)" strokeWidth="0.7" />
        <path d="M14 43Q27 37 50 13Q73 37 86 43" stroke="var(--window-wood)" strokeWidth="2.2" fill="none" />
      </g>
      <path d="M13 96V43Q13 23 50 10Q87 23 87 43V96Z" fill="none" stroke="var(--window-wood-dark)" strokeWidth="1.7" />
      <rect x="46.5" y="66" width="7" height="2" rx="0.8" fill="var(--window-brass)" />
      <path d="M3 98H97L100 103H0Z" fill="var(--window-edge)" />
      <path d="M0 103H100V107H0Z" fill="var(--window-wood)" />
      <path d="M5 107H95V110H5Z" fill="var(--window-wood-dark)" />
    </svg>
  );
}
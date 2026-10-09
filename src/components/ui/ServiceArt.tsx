import type { CSSProperties, ReactNode } from "react";

/**
 * Small, wordless illustrations for the service cards. Each is a 240x110 SVG
 * drawn in the site palette with a gentle ambient loop (classes live at the
 * end of globals.css under "Service art"). Keyed by the service `id` from
 * content/services.json; an unknown id renders nothing.
 */

const EMBER = "#ff2d55";
const FLARE = "#ff6b2c";
const CYAN = "#22d3ee";
const GREEN = "#34d399";
const GOLD = "#ffc933";
const LINE = "rgba(255,255,255,0.28)";
const PANEL = "#14141d";

const path = (d: string): CSSProperties =>
  ({ offsetPath: `path('${d}')` }) as CSSProperties;
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Defs() {
  return (
    <defs>
      <linearGradient id="saEmber" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={EMBER} />
        <stop offset="1" stopColor={FLARE} />
      </linearGradient>
      <linearGradient id="saCyan" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={CYAN} />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="saFlame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff2a8" />
        <stop offset=".5" stopColor={FLARE} />
        <stop offset="1" stopColor={EMBER} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative mb-6 h-28 overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.045] to-transparent"
    >
      <div className="bg-dots absolute inset-0 opacity-30" />
      <svg viewBox="0 0 240 110" className="relative size-full">
        <Defs />
        {children}
      </svg>
    </div>
  );
}

const art: Record<string, () => ReactNode> = {
  /* swatches + a bezier being drawn */
  "branding-creative-design": () => (
    <>
      <g className="sa-float">
        <circle cx="46" cy="58" r="23" fill={EMBER} opacity=".9" />
      </g>
      <g className="sa-float" style={delay(0.5)}>
        <circle cx="74" cy="58" r="23" fill={FLARE} opacity=".8" />
      </g>
      <g className="sa-float" style={delay(1)}>
        <circle cx="102" cy="58" r="23" fill={CYAN} opacity=".75" />
      </g>
      <path
        className="sa-draw"
        d="M146 86 C160 18 204 18 216 72"
        fill="none"
        stroke="#fff"
        strokeOpacity=".75"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
      />
      <g stroke={LINE} strokeWidth="1">
        <line x1="146" y1="86" x2="160" y2="30" />
        <line x1="216" y1="72" x2="204" y2="30" />
      </g>
      <g fill={PANEL} stroke="#fff" strokeWidth="1.4">
        <rect x="142" y="82" width="8" height="8" />
        <rect x="212" y="68" width="8" height="8" />
      </g>
      <g fill={EMBER}>
        <circle cx="160" cy="30" r="3.2" />
        <circle cx="204" cy="30" r="3.2" />
      </g>
    </>
  ),

  /* browser + phone */
  "web-app-engineering": () => (
    <>
      <rect
        x="22"
        y="18"
        width="136"
        height="78"
        rx="8"
        fill={PANEL}
        stroke={LINE}
      />
      <path
        d="M22 26a8 8 0 0 1 8-8h120a8 8 0 0 1 8 8v6H22z"
        fill="rgba(255,255,255,.07)"
      />
      <g>
        <circle cx="32" cy="25" r="2" fill="#ff5f57" />
        <circle cx="39" cy="25" r="2" fill="#febc2e" />
        <circle cx="46" cy="25" r="2" fill="#28c840" />
      </g>
      <rect x="32" y="40" width="68" height="14" rx="4" fill="url(#saEmber)" />
      <rect
        x="32"
        y="60"
        width="44"
        height="4"
        rx="2"
        fill="#fff"
        opacity=".45"
      />
      <rect
        x="32"
        y="68"
        width="60"
        height="4"
        rx="2"
        fill="#fff"
        opacity=".22"
      />
      <rect
        x="108"
        y="40"
        width="40"
        height="40"
        rx="6"
        fill="rgba(255,255,255,.07)"
      />
      <rect
        x="32"
        y="80"
        width="116"
        height="4"
        rx="2"
        fill="rgba(255,255,255,.08)"
      />
      <rect
        className="sa-grow"
        x="32"
        y="80"
        width="116"
        height="4"
        rx="2"
        fill={CYAN}
      />
      <g className="sa-float">
        <rect
          x="176"
          y="22"
          width="44"
          height="74"
          rx="9"
          fill={PANEL}
          stroke="url(#saEmber)"
          strokeWidth="1.8"
        />
        <rect x="194" y="26" width="8" height="2.4" rx="1.2" fill="#000" />
        <rect
          x="182"
          y="36"
          width="32"
          height="14"
          rx="4"
          fill="url(#saEmber)"
        />
        <rect
          x="182"
          y="55"
          width="14"
          height="14"
          rx="4"
          fill="#fff"
          opacity=".8"
        />
        <rect
          x="200"
          y="55"
          width="14"
          height="14"
          rx="4"
          fill="#fff"
          opacity=".3"
        />
        <rect
          x="182"
          y="75"
          width="32"
          height="4"
          rx="2"
          fill="#fff"
          opacity=".35"
        />
      </g>
    </>
  ),

  /* neural network with signals travelling along it */
  "ai-future-tech": () => {
    const L = [
      [36, [30, 55, 80]],
      [92, [20, 42, 68, 90]],
      [148, [28, 55, 82]],
      [204, [55]],
    ] as [number, number[]][];
    const edges: string[] = [];
    for (let i = 0; i < L.length - 1; i++)
      for (const a of L[i][1])
        for (const b of L[i + 1][1])
          edges.push(`M${L[i][0]} ${a} L${L[i + 1][0]} ${b}`);
    const routes = [
      "M36 30 L92 42 L148 55 L204 55",
      "M36 80 L92 68 L148 82 L204 55",
      "M36 55 L92 20 L148 28 L204 55",
    ];
    return (
      <>
        {edges.map((d) => (
          <path
            key={d}
            d={d}
            stroke="rgba(255,255,255,.1)"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {L.map(([x, ys]) =>
          ys.map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="5"
              fill={PANEL}
              stroke={CYAN}
              strokeWidth="1.4"
            />
          )),
        )}
        {routes.map((d, i) => (
          <circle
            key={d}
            r="3.2"
            fill={i === 1 ? EMBER : CYAN}
            className="sa-travel"
            style={{ ...path(d), ...delay(i * 0.9) }}
          />
        ))}
        <circle cx="204" cy="55" r="8" fill="url(#saCyan)" opacity=".9" />
        <path
          className="sa-twinkle"
          d="M222 16 l2.4 6 6 2.4 -6 2.4 -2.4 6 -2.4 -6 -6 -2.4 6 -2.4z"
          fill={CYAN}
        />
      </>
    );
  },

  /* rocket on a pad, trajectory curving away */
  "startup-launchpad": () => (
    <>
      {[
        [30, 24],
        [60, 14],
        [190, 20],
        [214, 48],
        [24, 70],
        [150, 12],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.4"
          fill="#fff"
          className="sa-twinkle"
          style={delay(i * 0.4)}
        />
      ))}
      <path
        d="M112 76 C136 40 176 34 214 30"
        stroke="url(#saEmber)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 7"
        className="sa-flow"
      />
      <circle
        r="3"
        fill={GOLD}
        className="sa-travel"
        style={{
          ...path("M112 76 C136 40 176 34 214 30"),
          animationDuration: "3.6s",
        }}
      />
      <g className="sa-bob">
        <path
          d="M0 -26 C8 -16 8 -2 5 10 L-5 10 C-8 -2 -8 -16 0 -26Z"
          fill="#f4f4f8"
          transform="translate(112 58)"
        />
        <path
          d="M0 -26 C5 -21 7 -16 7 -12 L-7 -12 C-7 -16 -5 -21 0 -26Z"
          fill="url(#saEmber)"
          transform="translate(112 58)"
        />
        <circle
          cx="112"
          cy="52"
          r="3.4"
          fill={PANEL}
          stroke="url(#saEmber)"
          strokeWidth="1.4"
        />
        <path
          d="M-5 4 L-12 16 L-5 12Z M5 4 L12 16 L5 12Z"
          fill="url(#saEmber)"
          transform="translate(112 58)"
        />
        <path
          className="sa-flick"
          d="M-4 10 L0 30 L4 10Z"
          fill="url(#saFlame)"
          transform="translate(112 58)"
        />
      </g>
      <rect
        x="86"
        y="88"
        width="52"
        height="7"
        rx="3.5"
        fill={PANEL}
        stroke="url(#saEmber)"
      />
      <rect x="96" y="95" width="32" height="8" fill="rgba(255,255,255,.08)" />
    </>
  ),

  /* the whole loop: plan, design, build, launch */
  "full-cycle-development": () => (
    <>
      <circle
        cx="120"
        cy="55"
        r="34"
        fill="none"
        stroke={LINE}
        strokeDasharray="3 5"
      />
      <g className="sa-orbit" style={{ transformOrigin: "120px 55px" }}>
        <circle cx="120" cy="21" r="4.5" fill={GOLD} />
      </g>
      {[
        [120, 21, EMBER],
        [154, 55, FLARE],
        [120, 89, CYAN],
        [86, 55, GREEN],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle
            cx={x as number}
            cy={y as number}
            r="11"
            fill={PANEL}
            stroke={c as string}
            strokeWidth="1.8"
          />
          <circle
            cx={x as number}
            cy={y as number}
            r="3.6"
            fill={c as string}
          />
        </g>
      ))}
      <circle
        cx="120"
        cy="55"
        r="16"
        fill="url(#saEmber)"
        opacity=".18"
        className="sa-pulse"
      />
      <path
        d="M112 55 l5.5 5.5 L128 49"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M196 30 h20 M196 40 h14 M26 76 h18 M26 86 h26"
        stroke="rgba(255,255,255,.14)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),

  /* blocks clicking together */
  "custom-solutions": () => (
    <>
      <rect x="70" y="20" width="44" height="30" rx="7" fill="url(#saEmber)" />
      <rect
        x="120"
        y="20"
        width="44"
        height="30"
        rx="7"
        fill={CYAN}
        opacity=".85"
      />
      <rect
        x="70"
        y="56"
        width="44"
        height="30"
        rx="7"
        fill="rgba(255,255,255,.14)"
        stroke={LINE}
      />
      <rect
        x="120"
        y="56"
        width="44"
        height="30"
        rx="7"
        fill="none"
        stroke={GREEN}
        strokeDasharray="3 4"
        opacity=".7"
      />
      <g className="sa-slide">
        <rect x="120" y="56" width="44" height="30" rx="7" fill={GREEN} />
        <rect
          x="128"
          y="64"
          width="18"
          height="4"
          rx="2"
          fill="#fff"
          opacity=".8"
        />
      </g>
      <g
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M30 40 l8 8 M30 48 l8 -8" />
      </g>
      <path
        className="sa-twinkle"
        d="M200 24 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"
        fill={GOLD}
      />
    </>
  ),

  /* a floating cube with orbiting particles */
  "interactive-experiences": () => (
    <>
      <ellipse cx="120" cy="100" rx="40" ry="5" fill="rgba(255,45,85,.18)" />
      <g className="sa-float">
        <polygon
          points="120,16 158,36 120,56 82,36"
          fill="#ffffff"
          opacity=".9"
        />
        <polygon points="82,36 120,56 120,98 82,78" fill="url(#saEmber)" />
        <polygon
          points="158,36 120,56 120,98 158,78"
          fill="url(#saCyan)"
          opacity=".9"
        />
        <path d="M120 56 V98" stroke="#fff" strokeOpacity=".35" />
      </g>
      <g className="sa-orbit" style={{ transformOrigin: "120px 55px" }}>
        <circle cx="190" cy="55" r="3.4" fill={GOLD} />
      </g>
      <g className="sa-orbit sa-rev" style={{ transformOrigin: "120px 55px" }}>
        <circle cx="52" cy="40" r="2.6" fill={CYAN} />
      </g>
      <path
        className="sa-twinkle"
        d="M210 18 l2.4 6 6 2.4 -6 2.4 -2.4 6 -2.4 -6 -6 -2.4 6 -2.4z"
        fill="#fff"
      />
    </>
  ),

  /* uptime heartbeat */
  "support-maintenance": () => (
    <>
      <path
        d="M10 56 H78 L90 26 L104 86 L116 46 L124 56 H230"
        fill="none"
        stroke="rgba(255,45,85,.22)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="sa-beat"
        d="M10 56 H78 L90 26 L104 86 L116 46 L124 56 H230"
        fill="none"
        stroke="url(#saEmber)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="0.22 0.78"
      />
      <g transform="translate(206 22)">
        <circle r="6" fill={GREEN} className="sa-pulse" opacity=".35" />
        <circle r="3.2" fill={GREEN} />
      </g>
      <g transform="translate(34 26)">
        <g className="sa-spin">
          <circle r="9" fill={PANEL} stroke={LINE} />
          <path
            d="M0 -13 V13 M-13 0 H13 M-9 -9 L9 9 M9 -9 L-9 9"
            stroke={LINE}
            strokeWidth="2"
          />
          <circle r="3.4" fill={FLARE} />
        </g>
      </g>
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x={30 + i * 11}
          y="94"
          width="7"
          height="8"
          rx="2"
          fill={GREEN}
          opacity={i === 15 ? 1 : 0.55}
          className={i === 15 ? "sa-pulse" : undefined}
        />
      ))}
    </>
  ),

  /* shield, check and a scanning sweep */
  "security-engineering": () => (
    <>
      <clipPath id="saShield">
        <path d="M120 14 L158 27 V56 C158 77 140 92 120 99 C100 92 82 77 82 56 V27Z" />
      </clipPath>
      <circle
        cx="120"
        cy="56"
        r="46"
        fill="none"
        stroke={LINE}
        strokeDasharray="2 6"
        className="sa-spin"
        style={{ transformOrigin: "120px 56px" }}
      />
      <path
        d="M120 14 L158 27 V56 C158 77 140 92 120 99 C100 92 82 77 82 56 V27Z"
        fill={PANEL}
        stroke="url(#saCyan)"
        strokeWidth="2"
      />
      <g clipPath="url(#saShield)">
        <rect
          className="sa-sweep"
          x="78"
          y="14"
          width="84"
          height="22"
          fill={CYAN}
          opacity=".22"
        />
        <rect
          className="sa-sweep"
          x="78"
          y="34"
          width="84"
          height="2"
          fill={CYAN}
        />
      </g>
      <path
        d="M107 56 l9 9 L134 46"
        fill="none"
        stroke={GREEN}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g
        transform="translate(196 28)"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="1.6"
        fill="none"
      >
        <rect x="-8" y="-2" width="16" height="12" rx="3" />
        <path d="M-5 -2 V-6 a5 5 0 0 1 10 0 V-2" />
      </g>
      <g
        transform="translate(38 84)"
        fill="none"
        stroke={CYAN}
        strokeOpacity=".5"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M-10 0 h20 M-6 6 h12" />
      </g>
    </>
  ),
};

export function ServiceArt({ id }: { id: string }) {
  const draw = art[id];
  return draw ? <Frame>{draw()}</Frame> : null;
}

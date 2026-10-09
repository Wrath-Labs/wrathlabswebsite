"use client";

import { useEffect, useRef } from "react";

/**
 * The hero visual: a little product factory. An idea (bulb) rides the belt,
 * becomes a wireframe, gets painted in as one of five different apps, is
 * tested, launches as a rocket, and the coins it earns fall into a vault
 * while a growth line climbs. No text anywhere.
 *
 * It is plain SVG driven by the Web Animations API, so it stays crisp at any
 * width, costs nothing to ship, pauses when scrolled out of view, and falls
 * back to a still frame for people who prefer reduced motion.
 */

const NS = "http://www.w3.org/2000/svg";
const C = 9000; // one product's trip, ms
const T5 = C * 5; // five products, so each slot cycles through every app
const CAD = C / 3; // a new product every 3s

type Frame = Record<string, string | number>;
const live: Animation[] = [];

const f = (o: Record<string | number, Frame>): Keyframe[] =>
  Object.entries(o)
    .map(([k, v]) => ({ offset: +k, ...v }))
    .sort((a, b) => (a.offset as number) - (b.offset as number));

const T = (x = 0, y = 0, r = 0, s = 1) =>
  `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`;

const $ = (sel: string, root: ParentNode) =>
  root.querySelector(sel) as SVGElement;

function g(html: string, parent?: Element) {
  const n = document.createElementNS(NS, "g");
  n.innerHTML = html;
  parent?.appendChild(n);
  return n as SVGGElement;
}

function runAnim(
  node: Element,
  frames: Keyframe[],
  dur: number,
  o: KeyframeAnimationOptions = {},
) {
  const a = node.animate(frames, {
    duration: dur,
    iterations: Infinity,
    fill: "both",
    easing: "linear",
    ...o,
  });
  live.push(a);
  return a;
}

/** Paste a one-cycle timeline into cycle k of five, hidden (`base`) otherwise. */
function inCycle(k: number, frames: Keyframe[], base: Frame): Keyframe[] {
  const out: Keyframe[] = [];
  if (k > 0) out.push({ offset: 0, ...base });
  if ((frames[0].offset as number) > 0) out.push({ offset: k / 5, ...base });
  frames.forEach((fr) =>
    out.push({ ...fr, offset: (k + (fr.offset as number)) / 5 }),
  );
  if ((frames[frames.length - 1].offset as number) < 1)
    out.push({ offset: (k + 1) / 5, ...base });
  if ((k + 1) / 5 < 1) out.push({ offset: 1, ...base });
  return out;
}

const SPOTS: [number, number][] = [
  [-26, 6],
  [0, 10],
  [26, 6],
  [-14, -2],
  [14, -2],
  [-26, -8],
  [0, -8],
  [26, -8],
  [0, -18],
];

const DEFS = `
    <linearGradient id="fyEmber" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff2d55"/><stop offset="1" stop-color="#ff6b2c"/></linearGradient>
    <linearGradient id="fySky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05050a"/><stop offset="1" stop-color="#1b0a12"/></linearGradient>
    <linearGradient id="fyGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e59a12"/></linearGradient>
    <linearGradient id="fyFlame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2a8"/><stop offset=".5" stop-color="#ff6b2c"/><stop offset="1" stop-color="#ff2d55" stop-opacity="0"/></linearGradient>
    <linearGradient id="fySteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a36"/><stop offset="1" stop-color="#14141c"/></linearGradient>
    <linearGradient id="fyBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b2c" stop-opacity=".75"/><stop offset="1" stop-color="#ff2d55" stop-opacity="0"/></linearGradient>
    <linearGradient id="fyGreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#10b981"/></linearGradient>
    <linearGradient id="fyCyan" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
    <radialGradient id="fyGlow"><stop offset="0" stop-color="#ff2d55" stop-opacity=".55"/><stop offset="1" stop-color="#ff2d55" stop-opacity="0"/></radialGradient>
    <radialGradient id="fyGoldGlow"><stop offset="0" stop-color="#ffc933" stop-opacity=".6"/><stop offset="1" stop-color="#ffc933" stop-opacity="0"/></radialGradient>
    <filter id="fyBlur6"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="fyBlur3"><feGaussianBlur stdDeviation="3"/></filter>
    <symbol id="fyCoin" viewBox="-12 -12 24 24"><ellipse rx="10" ry="10" fill="url(#fyGold)" stroke="#a86a06" stroke-width="1.2"/><ellipse rx="6" ry="6" fill="none" stroke="#a86a06" stroke-width="1.2" opacity=".7"/></symbol>
    <symbol id="fyRocket" viewBox="-14 -34 28 70"><path d="M0 -32 C10 -20 10 -2 7 12 L-7 12 C-10 -2 -10 -20 0 -32Z" fill="#f4f4f8"/><path d="M0 -32 C6 -26 8 -20 8 -16 L-8 -16 C-8 -20 -6 -26 0 -32Z" fill="url(#fyEmber)"/><circle cy="-6" r="4.2" fill="#0a0a10" stroke="url(#fyEmber)" stroke-width="1.6"/><path d="M-7 4 L-15 18 L-7 14Z M7 4 L15 18 L7 14Z" fill="url(#fyEmber)"/><path d="M-5 12 L0 36 L5 12Z" fill="url(#fyFlame)"/></symbol>
    <symbol id="fyBulb" viewBox="-16 -30 32 60"><circle cy="-8" r="12" fill="#ffe27a"/><circle cy="-8" r="21" fill="url(#fyGlow)"/><rect x="-6" y="3" width="12" height="9" rx="2" fill="#bdbdc8"/><rect x="-5" y="13" width="10" height="4" rx="2" fill="#8a8a96"/></symbol>
    <symbol id="fyGear" viewBox="-30 -30 60 60"><g fill="#1c1c26" stroke="url(#fyEmber)" stroke-width="1.6"><circle r="19"/><rect x="-4" y="-28" width="8" height="10" rx="2"/><rect x="-4" y="18" width="8" height="10" rx="2"/><rect x="-28" y="-4" width="10" height="8" rx="2"/><rect x="18" y="-4" width="10" height="8" rx="2"/><g transform="rotate(45)"><rect x="-4" y="-28" width="8" height="10" rx="2"/><rect x="-4" y="18" width="8" height="10" rx="2"/><rect x="-28" y="-4" width="10" height="8" rx="2"/><rect x="18" y="-4" width="10" height="8" rx="2"/></g></g><circle r="7" fill="#05050a" stroke="url(#fyEmber)" stroke-width="1.6"/></symbol>
  `;

/* five simple phone screens, origin = bottom centre */
const body = `<rect x="-50" y="-180" width="100" height="180" rx="15" fill="#0c0c12" stroke="url(#fyEmber)" stroke-width="3"/><rect x="-44" y="-174" width="88" height="168" rx="10" fill="#15151e"/><rect x="-14" y="-172" width="28" height="5" rx="2.5" fill="#000"/>`;
const bar = (x: number, y: number, w: number, o = 0.6) =>
  `<rect x="${x}" y="${y}" width="${w}" height="5" rx="2.5" fill="#fff" opacity="${o}"/>`;
const gem = (cx: number, cy: number, fill: string) =>
  `<g transform="translate(${cx} ${cy})"><polygon points="0,-12 11,-2 0,12 -11,-2" fill="${fill}"/><polygon points="-11,-2 0,-12 11,-2 0,0" fill="#fff" opacity=".28"/></g>`;
const SCREENS = [
  /* store */ `${bar(-36, -158, 34, 0.85)}<circle cx="32" cy="-155" r="6" fill="url(#fyEmber)"/>${[
    [-19, -110],
    [19, -110],
    [-19, -58],
    [19, -58],
  ]
    .map(
      ([x, y], i) =>
        `<rect x="${x - 17}" y="${y - 22}" width="34" height="46" rx="9" fill="#1f1f2b"/>${gem(x, y - 6, ["#e879f9", "#22d3ee", "#ffc933", "#34d399"][i])}${bar(x - 11, y + 11, 22, 0.45)}`,
    )
    .join(
      "",
    )}<rect x="-38" y="-26" width="76" height="17" rx="8.5" fill="url(#fyEmber)"/>`,
  /* directory */ `<circle cy="-132" r="20" fill="url(#fyCyan)"/><circle cy="-138" r="7" fill="#fff" opacity=".85"/><path d="M-13 -118 Q0 -134 13 -118Z" fill="#fff" opacity=".85"/>${bar(-24, -102, 48, 0.7)}${[0, 1, 2].map((i) => `<rect x="-38" y="${-84 + i * 28}" width="76" height="23" rx="8" fill="#1f1f2b"/><circle cx="-24" cy="${-72 + i * 28}" r="7" fill="${["#e879f9", "#ffc933", "#22d3ee"][i]}"/>${bar(-12, -76 + i * 28, 40, 0.6)}`).join("")}<rect x="-38" y="-14" width="76" height="9" rx="4.5" fill="url(#fyGreen)"/>`,
  /* dashboard */ `${bar(-36, -158, 34, 0.85)}<path transform="translate(30 -156)" d="M0 -7 l2.2 5 5 2.2 -5 2.2 -2.2 5 -2.2 -5 -5 -2.2 5 -2.2z" fill="url(#fyCyan)"/><g transform="translate(0 -118)"><circle r="21" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="8"/><circle r="21" fill="none" stroke="url(#fyCyan)" stroke-width="8" stroke-linecap="round" stroke-dasharray="92 132" transform="rotate(-90)"/></g>${[22, 36, 28, 46, 38].map((h, i) => `<rect x="${-36 + i * 15}" y="${-22 - h}" width="10" height="${h}" rx="3" fill="url(#fyEmber)" opacity="${0.5 + i * 0.1}"/>`).join("")}${bar(-36, -16, 76, 0.2)}`,
  /* food */ `<rect x="-38" y="-150" width="76" height="70" rx="12" fill="#2a1118"/><rect x="-38" y="-150" width="76" height="70" rx="12" fill="url(#fyGlow)" opacity=".6"/><circle cx="0" cy="-115" r="25" fill="#f4f4f8"/><circle cx="0" cy="-115" r="17" fill="#ff8a3d"/><circle cx="-6" cy="-120" r="5" fill="#34d399"/><circle cx="7" cy="-110" r="4.5" fill="#ff2d55"/><path transform="translate(-26 -62)" d="M0 5 C-11 -4 -9 -13 -2.5 -11 C0 -10 0 -9 0 -9 C0 -9 0 -10 2.5 -11 C9 -13 11 -4 0 5Z" fill="#ff2d55"/>${bar(-8, -67, 40, 0.35)}<rect x="-38" y="-48" width="76" height="40" rx="11" fill="#1f1f2b"/><circle cx="-22" cy="-28" r="11" fill="#f4f4f8"/><circle cx="-22" cy="-28" r="7" fill="#34d399"/>${bar(-4, -33, 34, 0.6)}${bar(-4, -23, 22, 0.3)}`,
  /* swap */ `<rect x="-38" y="-158" width="76" height="52" rx="11" fill="#1f1f2b"/><circle cx="-20" cy="-132" r="11" fill="url(#fyCyan)"/>${bar(-4, -137, 32, 0.7)}${bar(-4, -127, 22, 0.3)}<circle cy="-92" r="15" fill="url(#fyEmber)"/><g stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M-7 -96 H7 M3 -100 L7 -96 L3 -92"/><path d="M7 -88 H-7 M-3 -92 L-7 -88 L-3 -84"/></g><rect x="-38" y="-76" width="76" height="52" rx="11" fill="#1f1f2b"/><circle cx="-20" cy="-50" r="11" fill="url(#fyGreen)"/>${bar(-4, -55, 32, 0.7)}${bar(-4, -45, 22, 0.3)}`,
];
const phone = (i: number) => body + SCREENS[i];

function build(svg: SVGSVGElement, reduce: boolean) {
  const run = reduce
    ? ((() => undefined) as unknown as typeof runAnim)
    : runAnim;
  const stars = Array.from(
    { length: 30 },
    (_, i) =>
      `<circle cx="${(i * 131) % 900}" cy="${(i * 47) % 200}" r="${(i % 3) * 0.5 + 0.6}" fill="#fff" class="fy-twinkle" style="animation-delay:${(i % 8) * 0.4}s"/>`,
  ).join("");
  svg.innerHTML = `<defs>${DEFS}</defs>
  <rect width="900" height="420" fill="url(#fySky)"/>${stars}
  <ellipse cx="450" cy="408" rx="440" ry="34" fill="url(#fyGlow)" opacity=".5"/>
  <defs><radialGradient id="fySmoke"><stop offset="0" stop-color="#b3a8c2" stop-opacity=".55"/><stop offset="1" stop-color="#b3a8c2" stop-opacity="0"/></radialGradient></defs>
  <!-- belt -->
  <rect x="20" y="312" width="700" height="18" rx="9" fill="#101018" stroke="rgba(255,45,85,.45)"/>
  <line class="fy-dash" x1="32" y1="321" x2="708" y2="321" stroke="url(#fyEmber)" stroke-width="2.2" stroke-dasharray="12 12" opacity=".8"/>
  ${[60, 200, 340, 480, 620].map((x) => `<g transform="translate(${x} 352)"><circle r="11" fill="#14141c" stroke="rgba(255,255,255,.15)"/><g class="fy-spin fy-fast"><circle cx="6" r="2.2" fill="#ff2d55"/><circle cx="-6" r="2.2" fill="#ff2d55" opacity=".5"/></g></g>`).join("")}
  <!-- machine -->
  <g transform="translate(300 0)">
    <rect x="-70" y="120" width="12" height="192" rx="4" fill="url(#fySteel)" stroke="rgba(255,255,255,.1)"/>
    <rect x="58" y="120" width="12" height="192" rx="4" fill="url(#fySteel)" stroke="rgba(255,255,255,.1)"/>
    <rect x="-84" y="100" width="168" height="34" rx="9" fill="url(#fySteel)" stroke="url(#fyEmber)" stroke-width="1.4"/>
    <circle cx="-52" cy="117" r="5" fill="#ff2d55" class="fy-flick"/><circle cx="-34" cy="117" r="5" fill="#ffc933" class="fy-flick" style="animation-delay:.4s"/><circle cx="-16" cy="117" r="5" fill="#22d3ee" class="fy-flick" style="animation-delay:.8s"/>
    <g transform="translate(46 117)"><g class="fy-spin fy-fast"><use href="#fyGear" x="-15" y="-15" width="30" height="30"/></g></g>
    <g id="piston"><rect x="-6" y="134" width="12" height="66" rx="3" fill="#2a2a36"/><rect x="-14" y="196" width="28" height="12" rx="3" fill="url(#fyEmber)"/><path id="beam" d="M-12 208 L12 208 L36 312 L-36 312Z" fill="url(#fyBeam)" opacity="0"/><g id="sparks"><circle cx="-7" cy="218" r="3" fill="#ffe27a"/><circle cx="8" cy="222" r="2.4" fill="#ff6b2c"/><circle cx="0" cy="228" r="2" fill="#fff"/></g></g>
  </g>
  <!-- launch pad -->
  <rect x="582" y="306" width="56" height="8" rx="4" fill="url(#fySteel)" stroke="url(#fyEmber)"/>
  <!-- growth line + vault -->
  <g id="growth"></g>
  <g transform="translate(820 330)">
    <ellipse cy="40" rx="70" ry="9" fill="rgba(255,201,51,.15)" filter="url(#fyBlur6)"/>
    <circle cy="-4" r="46" fill="url(#fyGoldGlow)" id="vaultGlow" opacity=".4"/>
    <path d="M-52 -14 H52 L42 38 H-42Z" fill="url(#fySteel)" stroke="url(#fyEmber)" stroke-width="1.8"/>
    <g id="pile"></g>
    <path d="M-52 -14 H52 L47 6 H-47Z" fill="#1c1c26" stroke="url(#fyEmber)" stroke-width="1.4"/>
    <rect x="-16" y="-20" width="32" height="7" rx="3.5" fill="#05050a" stroke="rgba(255,201,51,.5)"/>
  </g>
  <g id="rain"></g>
  <g id="items"></g>`;
  const items = $("#items", svg);

  /* arm: down while an item is being built (item sits under it .27-.50 of each 9s cycle) */
  const P = CAD,
    armDelay = -((CAD * 3 - 0.27 * C) % CAD);
  run(
    $("#piston", svg),
    f({
      0: { transform: T(0, 0) },
      0.05: { transform: T(0, 20) },
      0.68: { transform: T(0, 20) },
      0.76: { transform: T(0, 0) },
      1: { transform: T(0, 0) },
    }),
    P,
    { delay: armDelay },
  );
  run(
    $("#sparks", svg),
    f({
      0: { opacity: 0 },
      0.05: { opacity: 1 },
      0.3: { opacity: 0.2 },
      0.34: { opacity: 1 },
      0.5: { opacity: 0 },
      1: { opacity: 0 },
    }),
    P,
    { delay: armDelay },
  );
  run(
    $("#beam", svg),
    f({
      0: { opacity: 0 },
      0.34: { opacity: 0 },
      0.4: { opacity: 0.9 },
      0.68: { opacity: 0.9 },
      0.74: { opacity: 0 },
      1: { opacity: 0 },
    }),
    P,
    { delay: armDelay },
  );

  const LAND = 0.88;
  [0, 1, 2].forEach((s) => {
    const d = -s * CAD,
      slot = g("", items);
    run(
      slot,
      f({
        0: { transform: T(60, 312), easing: "ease-in" },
        0.27: { transform: T(300, 312), easing: "linear" },
        0.5: { transform: T(300, 312), easing: "ease-in-out" },
        0.66: { transform: T(610, 312) },
        1: { transform: T(610, 312) },
      }),
      C,
      { delay: d },
    );
    const bulb = g(
      `<use href="#fyBulb" x="-16" y="-60" width="32" height="60"/>`,
      slot,
    );
    run(
      bulb,
      f({
        0: { opacity: 0, transform: T(0, -30, 0, 0.3) },
        0.04: { opacity: 1, transform: T(0, 0, 0, 1) },
        0.25: { opacity: 1, transform: T(0, 0, 0, 1) },
        0.29: { opacity: 0, transform: T(0, 0, 0, 0.6) },
        1: { opacity: 0, transform: T(0, 0, 0, 0.6) },
      }),
      C,
      { delay: d },
    );
    const check = g(
      `<circle r="11" fill="url(#fyGreen)"/><path d="M-5 0 L-1.5 4 L5.5 -4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
      slot,
    );
    run(
      check,
      f({
        0: { opacity: 0, transform: T(32, -90, 0, 0) },
        0.58: { opacity: 0, transform: T(32, -90, 0, 0) },
        0.61: { opacity: 1, transform: T(32, -90, 0, 1.35) },
        0.63: { opacity: 1, transform: T(32, -90, 0, 1) },
        0.69: { opacity: 1, transform: T(32, -90, 0, 1) },
        0.71: { opacity: 0, transform: T(32, -90, 0, 1) },
        1: { opacity: 0, transform: T(32, -90, 0, 1) },
      }),
      C,
      { delay: d },
    );
    const rocket = g(
      `<use href="#fyRocket" x="-16" y="-80" width="32" height="80"/>`,
      slot,
    );
    run(
      rocket,
      f({
        0: { opacity: 0, transform: T(0, 0, 0, 0.8) },
        0.7: { opacity: 0, transform: T(0, 0, 0, 0.8) },
        0.72: { opacity: 1, transform: T(0, -4, 0, 0.8) },
        0.77: { opacity: 1, transform: T(14, -80, 14, 0.8) },
        0.83: { opacity: 1, transform: T(110, -180, 45, 0.8) },
        0.88: { opacity: 1, transform: T(184, -236, 62, 0.8) },
        0.895: { opacity: 0, transform: T(190, -240, 65, 0.5) },
        1: { opacity: 0, transform: T(0, 0, 0, 0.8) },
      }),
      C,
      { delay: d },
    );
    const smoke = g(`<circle r="16" fill="url(#fySmoke)"/>`, slot);
    run(
      smoke,
      f({
        0: { opacity: 0, transform: T(0, 0, 0, 0.4) },
        0.71: { opacity: 0, transform: T(0, 0, 0, 0.4) },
        0.73: { opacity: 0.8, transform: T(-4, 0, 0, 1) },
        0.82: { opacity: 0, transform: T(-10, -26, 0, 3) },
        1: { opacity: 0, transform: T(0, 0, 0, 0.4) },
      }),
      C,
      { delay: d },
    );

    for (let v = 0; v < 5; v++) {
      const k = (((2 * (v - 2 + s)) % 5) + 5) % 5;
      const holder = g("", slot);
      holder.style.transform = "scale(.46)";
      const wire = g(`<g class="fy-wire">${phone(v)}</g>`, holder);
      const full = g(phone(v), holder);
      full.style.clipPath = "inset(0 0 100% 0)";
      run(
        wire,
        inCycle(
          k,
          f({
            0: { opacity: 0 },
            0.26: { opacity: 0 },
            0.29: { opacity: 1 },
            0.5: { opacity: 1 },
            0.52: { opacity: 0 },
            1: { opacity: 0 },
          }),
          { opacity: 0 },
        ),
        T5,
        { delay: d },
      );
      run(
        full,
        inCycle(
          k,
          f({
            0: { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
            0.34: { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" },
            0.5: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
            0.71: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
            0.73: { opacity: 0, clipPath: "inset(0% 0% 0% 0%)" },
            1: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          }),
          { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
        ),
        T5,
        { delay: d },
      );
    }
    // coins burst out of the launch and fall into the vault
    const rain = $("#rain", svg);
    for (let j = 0; j < 3; j++) {
      const c = g(
          `<use href="#fyCoin" x="-10" y="-10" width="20" height="20"/>`,
          rain,
        ),
        dx = [-26, 0, 24][j];
      run(
        c,
        f({
          0: { opacity: 0, transform: T(800, 74) },
          [LAND - 0.005]: { opacity: 0, transform: T(800, 74) },
          [LAND]: { opacity: 1, transform: T(800 + dx * 0.6, 60, 0, 0.8) },
          [LAND + 0.035]: { opacity: 1, transform: T(800 + dx, 150, 200, 1) },
          [LAND + 0.075]: {
            opacity: 1,
            transform: T(818 + dx * 0.3, 300, 420, 1),
          },
          [LAND + 0.085]: { opacity: 0, transform: T(818, 318, 480) },
          1: { opacity: 0, transform: T(800, 74) },
        }),
        C,
        { delay: d },
      );
    }
  });

  /* vault pile: 3 coins per launch, 9 per loop, then a sparkle reset */
  const pile = $("#pile", svg),
    PL = C;
  // launches land at .88C - s*CAD  ->  .88C, .547C, .213C (mod C); coin groups arrive ~0.085C later
  const arrive = [0.1, 0.433, 0.767],
    PD = (0.288 - 0.1) * C; // pile clock shifted so the first coin group lands at 10% of its loop
  SPOTS.forEach(([x, y], i) => {
    const c = g(
      `<use href="#fyCoin" x="-11" y="-11" width="22" height="22"/>`,
      pile,
    );
    const a = arrive[Math.floor(i / 3)] + (i % 3) * 0.012;
    run(
      c,
      f({
        0: { opacity: 0, transform: T(x, y - 30, 0, 0.7) },
        [a]: { opacity: 0, transform: T(x, y - 30, 0, 0.7) },
        [a + 0.02]: { opacity: 1, transform: T(x, y, 0, 1) },
        0.97: { opacity: 1, transform: T(x, y, 0, 1) },
        0.995: { opacity: 0, transform: T(x, y, 0, 1) },
        1: { opacity: 0, transform: T(x, y - 30, 0, 0.7) },
      }),
      PL,
      { delay: PD },
    );
  });
  run(
    $("#vaultGlow", svg),
    f({
      0: { opacity: 0.25 },
      [arrive[0]]: { opacity: 0.25 },
      [arrive[0] + 0.03]: { opacity: 0.8 },
      [arrive[0] + 0.12]: { opacity: 0.3 },
      [arrive[1]]: { opacity: 0.3 },
      [arrive[1] + 0.03]: { opacity: 0.9 },
      [arrive[1] + 0.12]: { opacity: 0.4 },
      [arrive[2]]: { opacity: 0.4 },
      [arrive[2] + 0.03]: { opacity: 1 },
      0.97: { opacity: 0.6 },
      1: { opacity: 0.25 },
    }),
    PL,
    { delay: PD },
  );

  /* growth line above the vault: one more step revealed with every launch */
  const gr = $("#growth", svg);
  const seg: [string, number][] = [
    ["M740 262 L780 244", 0],
    ["M780 244 L822 252", 1],
    ["M822 252 L870 206", 2],
  ];
  seg.forEach(([d, i]) => {
    const glow = g(
      `<path d="${d}" fill="none" stroke="#ff5c79" stroke-width="5" stroke-linecap="round" filter="url(#fyBlur3)" opacity=".7"/><path d="${d}" fill="none" stroke="#ffd1d9" stroke-width="2.4" stroke-linecap="round"/>`,
      gr,
    );
    const a = arrive[i];
    run(
      glow,
      f({
        0: { opacity: 0 },
        [a]: { opacity: 0 },
        [a + 0.03]: { opacity: 1 },
        0.95: { opacity: 1 },
        0.995: { opacity: 0 },
        1: { opacity: 0 },
      }),
      PL,
      { delay: PD },
    );
  });
  const tip = g(
    `<circle r="4.5" fill="#fff"/><circle r="9" fill="#ff2d55" opacity=".35"/>`,
    gr,
  );
  const tp: [number, number][] = [
    [740, 262],
    [780, 244],
    [822, 252],
    [870, 206],
  ];
  run(
    tip,
    f({
      0: { opacity: 0, transform: T(...tp[0]) },
      [arrive[0]]: { opacity: 0, transform: T(...tp[0]) },
      [arrive[0] + 0.02]: { opacity: 1, transform: T(...tp[1]) },
      [arrive[1] + 0.02]: { opacity: 1, transform: T(...tp[2]) },
      [arrive[2] + 0.02]: { opacity: 1, transform: T(...tp[3]) },
      0.97: { opacity: 1, transform: T(...tp[3]) },
      0.995: { opacity: 0, transform: T(...tp[3]) },
      1: { opacity: 0, transform: T(...tp[0]) },
    }),
    PL,
    { delay: PD },
  );
}

/** A composed still frame: product on the belt, coins in the vault, line up. */
function staticFrame(svg: SVGSVGElement) {
  const slots = [...svg.querySelectorAll("#items > g")] as SVGElement[];
  slots.forEach((slot, s) => {
    if (s > 0) return void (slot.style.display = "none");
    slot.style.transform = T(300, 312);
    [...slot.children].forEach((child, i) => {
      const el = child as SVGElement;
      if (i === 4) {
        (el.children[0] as SVGElement).style.display = "none"; // wireframe
        (el.children[1] as SVGElement).style.clipPath = "none"; // painted screen
      } else el.style.display = "none";
    });
  });
  ["#sparks", "#rain"].forEach((q) => ($(q, svg).style.display = "none"));
  [...svg.querySelectorAll("#pile > g")].forEach((c, i) => {
    const el = c as SVGElement;
    if (i < 6) el.style.transform = T(SPOTS[i][0], SPOTS[i][1]);
    else el.style.display = "none";
  });
  const tip = $("#growth > g:last-child", svg);
  tip.style.transform = T(870, 206);
}

export function FactoryScene({
  ariaLabel,
  viewBox = "0 0 900 420",
}: {
  ariaLabel: string;
  viewBox?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    build(svg, reduce);
    if (reduce) staticFrame(svg);

    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => {
      live.forEach((a) => (entry.isIntersecting ? a.play() : a.pause()));
    });
    io.observe(svg);

    return () => {
      io.disconnect();
      live.splice(0).forEach((a) => a.cancel());
      svg.innerHTML = "";
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      role="img"
      aria-label={ariaLabel}
      className="block h-auto w-full"
    />
  );
}

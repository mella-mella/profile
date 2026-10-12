/**
 * InkPigment — Reusable organic ink-wash / watercolor silhouette component.
 *
 * Each variant is a self-contained SVG composition with:
 * - Multi-layer bezier paths (dark umber, bronze, copper)
 * - Feathered edges via SVG Gaussian blur
 * - Scattered droplets of varying size
 * - Warm charcoal / burnt-umber / copper palette
 *
 * Usage:
 *   <InkPigment variant="corner-tl" style={{ top: -40, left: -60, width: 500, opacity: 0.75 }} />
 *
 * All variants use pointer-events: none and are meant to be positioned
 * absolutely behind content (z-index: 0).
 */

import React from 'react';

export type PigmentVariant =
  | 'corner-tl'   // enters from top-left, sweeps right+down
  | 'corner-tr'   // enters from top-right, sweeps left+down
  | 'corner-bl'   // enters from bottom-left, sweeps right+up
  | 'corner-br'   // enters from bottom-right, sweeps left+up
  | 'edge-left'   // vertical wash along left edge
  | 'wash-radial' // diffuse central ambient wash
  | 'cluster'     // scattered organic drops, no dominant shape
  | 'trail-h';    // horizontal pigment trail

interface InkPigmentProps {
  variant: PigmentVariant;
  style?: React.CSSProperties;
  className?: string;
  /** Overall opacity multiplier applied to the wrapper (0–1) */
  opacity?: number;
}

/* ─── Color tokens ───────────────────────────────────────────────── */
// All fills are semi-transparent so they blend with the dark bg naturally
const C = {
  umber:     '#3D2810',  // primary mass — dark burnt umber
  brown:     '#4A2E12',  // secondary layer — warm brown
  bronze:    '#5C3A1A',  // tertiary layer — muted bronze
  copper:    '#A66C40',  // accent veins / highlight specks
  amber:     '#D9A066',  // tiny accent specks
  charcoal:  '#2A1E0E',  // deepest shadow layer
} as const;

/* ─── SVG filter definitions (kept small per SVG instance) ─────── */
const Defs = () => (
  <defs>
    {/* Ink bleed: blur + merge keeps crisp center, feathers edge */}
    <filter id="ip-bleed" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="5" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    {/* Soft halo: full Gaussian, no merge */}
    <filter id="ip-halo" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
    {/* Gentle edge soften for smaller tendrils */}
    <filter id="ip-soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: corner-tl
   Large organic stain entering from the top-left corner.
   Spread: ~0–440px horizontally, 0–410px vertically.
   Used in: About (right-column bg), Experience (left side).
════════════════════════════════════════════════════════════════════ */
const CornerTL = () => (
  <svg viewBox="0 0 480 430" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />

    {/* Diffuse warm halo behind everything */}
    <ellipse cx="180" cy="190" rx="220" ry="190" fill={C.charcoal} fillOpacity="0.45" filter="url(#ip-halo)" />

    {/* Primary mass — largest lobe */}
    <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.72"
      d="M -8,0
         C 45,-12 110,8 140,50
         C 168,88 148,130 178,148
         C 212,168 258,142 285,172
         C 314,204 300,250 276,272
         C 252,294 216,288 198,314
         C 180,340 194,382 165,402
         C 136,422 100,416 74,394
         C 48,372 52,336 28,316
         C 4,296 -18,300 -12,264
         C -6,228 20,210 10,176
         C 0,142 -18,116 -10,76
         C -4,44 -20,8 -8,0 Z"
    />

    {/* Secondary lobe — upper-right extension */}
    <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.60"
      d="M 136,44
         C 178,18 238,14 268,48
         C 298,82 290,128 262,148
         C 234,168 196,158 178,134
         C 160,110 160,68 136,44 Z"
    />

    {/* Tertiary sweep — lower extension */}
    <path filter="url(#ip-soft)" fill={C.bronze} fillOpacity="0.52"
      d="M 178,278
         C 172,308 164,348 140,370
         C 116,392 82,392 64,370
         C 46,348 56,316 78,298
         C 100,280 138,282 178,278 Z"
    />

    {/* Copper vein — thin diagonal tendril */}
    <path filter="url(#ip-soft)" fill={C.copper} fillOpacity="0.38"
      d="M 240,160
         C 268,148 300,140 322,158
         C 344,176 342,208 320,220
         C 298,232 270,220 252,202
         C 234,184 228,166 240,160 Z"
    />

    {/* Scattered droplets — asymmetric cluster top-right */}
    <ellipse cx="310" cy="60"  rx="14" ry="9"  fill={C.umber} fillOpacity="0.68" transform="rotate(-20 310 60)" />
    <circle  cx="334" cy="42"  r="7"   fill={C.brown} fillOpacity="0.58" />
    <circle  cx="352" cy="30"  r="4.5" fill={C.brown} fillOpacity="0.48" />
    <circle  cx="366" cy="20"  r="2.8" fill={C.bronze} fillOpacity="0.42" />
    <circle  cx="342" cy="18"  r="2"   fill={C.copper} fillOpacity="0.32" />
    <circle  cx="322" cy="24"  r="1.6" fill={C.amber} fillOpacity="0.24" />

    {/* Lone drop — far right stray */}
    <ellipse cx="380" cy="110" rx="11" ry="7"  fill={C.umber} fillOpacity="0.55" transform="rotate(15 380 110)" />
    <circle  cx="396" cy="96"  r="5"   fill={C.brown} fillOpacity="0.44" />
    <circle  cx="408" cy="86"  r="3"   fill={C.bronze} fillOpacity="0.36" />

    {/* Bottom-right cluster */}
    <ellipse cx="290" cy="330" rx="12" ry="8"  fill={C.umber} fillOpacity="0.52" transform="rotate(25 290 330)" />
    <circle  cx="308" cy="342" r="6"   fill={C.brown} fillOpacity="0.42" />
    <circle  cx="322" cy="352" r="3.5" fill={C.bronze} fillOpacity="0.34" />

    {/* Accent copper specks scattered around */}
    <circle cx="200" cy="24"  r="2"   fill={C.copper} fillOpacity="0.30" />
    <circle cx="82"  cy="20"  r="1.5" fill={C.amber}  fillOpacity="0.22" />
    <circle cx="340" cy="188" r="1.8" fill={C.amber}  fillOpacity="0.28" />
    <circle cx="140" cy="380" r="1.5" fill={C.copper} fillOpacity="0.25" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: corner-tr
   Large stain entering from the top-right corner.
   Mirror composition of corner-tl.
════════════════════════════════════════════════════════════════════ */
const CornerTR = () => (
  <svg viewBox="0 0 480 430" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />
    {/* Mirror the corner-tl horizontally */}
    <g transform="scale(-1,1) translate(-480,0)">
      <ellipse cx="180" cy="190" rx="220" ry="190" fill={C.charcoal} fillOpacity="0.45" filter="url(#ip-halo)" />
      <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.72"
        d="M -8,0 C 45,-12 110,8 140,50 C 168,88 148,130 178,148 C 212,168 258,142 285,172
           C 314,204 300,250 276,272 C 252,294 216,288 198,314 C 180,340 194,382 165,402
           C 136,422 100,416 74,394 C 48,372 52,336 28,316 C 4,296 -18,300 -12,264
           C -6,228 20,210 10,176 C 0,142 -18,116 -10,76 C -4,44 -20,8 -8,0 Z"
      />
      <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.60"
        d="M 136,44 C 178,18 238,14 268,48 C 298,82 290,128 262,148
           C 234,168 196,158 178,134 C 160,110 160,68 136,44 Z"
      />
      <path filter="url(#ip-soft)" fill={C.bronze} fillOpacity="0.52"
        d="M 178,278 C 172,308 164,348 140,370 C 116,392 82,392 64,370
           C 46,348 56,316 78,298 C 100,280 138,282 178,278 Z"
      />
      <ellipse cx="310" cy="60"  rx="14" ry="9"  fill={C.umber} fillOpacity="0.68" transform="rotate(-20 310 60)" />
      <circle  cx="334" cy="42"  r="7"   fill={C.brown} fillOpacity="0.58" />
      <circle  cx="352" cy="30"  r="4.5" fill={C.brown} fillOpacity="0.48" />
      <circle  cx="366" cy="20"  r="2.8" fill={C.bronze} fillOpacity="0.42" />
      <circle  cx="380" cy="110" r="7"   fill={C.umber} fillOpacity="0.50" />
      <circle  cx="290" cy="330" r="8"   fill={C.umber} fillOpacity="0.48" />
      <circle  cx="308" cy="342" r="5"   fill={C.brown} fillOpacity="0.38" />
      <circle  cx="200" cy="24"  r="2"   fill={C.copper} fillOpacity="0.28" />
      <circle  cx="340" cy="188" r="1.8" fill={C.amber}  fillOpacity="0.25" />
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: corner-bl
   Enters from bottom-left corner, sweeps up and right.
════════════════════════════════════════════════════════════════════ */
const CornerBL = () => (
  <svg viewBox="0 0 480 430" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />
    {/* Flip vertically from corner-tl */}
    <g transform="scale(1,-1) translate(0,-430)">
      <ellipse cx="180" cy="190" rx="220" ry="190" fill={C.charcoal} fillOpacity="0.42" filter="url(#ip-halo)" />
      <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.68"
        d="M -8,0 C 45,-12 110,8 140,50 C 168,88 148,130 178,148 C 212,168 258,142 285,172
           C 314,204 300,250 276,272 C 252,294 216,288 198,314 C 180,340 194,382 165,402
           C 136,422 100,416 74,394 C 48,372 52,336 28,316 C 4,296 -18,300 -12,264
           C -6,228 20,210 10,176 C 0,142 -18,116 -10,76 C -4,44 -20,8 -8,0 Z"
      />
      <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.58"
        d="M 136,44 C 178,18 238,14 268,48 C 298,82 290,128 262,148
           C 234,168 196,158 178,134 C 160,110 160,68 136,44 Z"
      />
      <path filter="url(#ip-soft)" fill={C.bronze} fillOpacity="0.48"
        d="M 178,278 C 172,308 164,348 140,370 C 116,392 82,392 64,370
           C 46,348 56,316 78,298 C 100,280 138,282 178,278 Z"
      />
      <ellipse cx="310" cy="60"  rx="14" ry="9"  fill={C.umber} fillOpacity="0.65" transform="rotate(-20 310 60)" />
      <circle  cx="334" cy="42"  r="7"   fill={C.brown} fillOpacity="0.55" />
      <circle  cx="352" cy="30"  r="4.5" fill={C.brown} fillOpacity="0.45" />
      <circle  cx="366" cy="20"  r="2.8" fill={C.bronze} fillOpacity="0.40" />
      <circle  cx="290" cy="330" r="8"   fill={C.umber} fillOpacity="0.45" />
      <circle  cx="308" cy="342" r="5"   fill={C.brown} fillOpacity="0.36" />
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: corner-br
   Bottom-right corner spread.
════════════════════════════════════════════════════════════════════ */
const CornerBR = () => (
  <svg viewBox="0 0 480 430" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />
    <g transform="scale(-1,-1) translate(-480,-430)">
      <ellipse cx="180" cy="190" rx="220" ry="190" fill={C.charcoal} fillOpacity="0.42" filter="url(#ip-halo)" />
      <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.68"
        d="M -8,0 C 45,-12 110,8 140,50 C 168,88 148,130 178,148 C 212,168 258,142 285,172
           C 314,204 300,250 276,272 C 252,294 216,288 198,314 C 180,340 194,382 165,402
           C 136,422 100,416 74,394 C 48,372 52,336 28,316 C 4,296 -18,300 -12,264
           C -6,228 20,210 10,176 C 0,142 -18,116 -10,76 C -4,44 -20,8 -8,0 Z"
      />
      <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.58"
        d="M 136,44 C 178,18 238,14 268,48 C 298,82 290,128 262,148
           C 234,168 196,158 178,134 C 160,110 160,68 136,44 Z"
      />
      <path filter="url(#ip-soft)" fill={C.bronze} fillOpacity="0.50"
        d="M 178,278 C 172,308 164,348 140,370 C 116,392 82,392 64,370
           C 46,348 56,316 78,298 C 100,280 138,282 178,278 Z"
      />
      <ellipse cx="310" cy="60"  rx="14" ry="9"  fill={C.umber} fillOpacity="0.65" transform="rotate(-20 310 60)" />
      <circle  cx="334" cy="42"  r="7"   fill={C.brown} fillOpacity="0.55" />
      <circle  cx="352" cy="30"  r="4.5" fill={C.brown} fillOpacity="0.46" />
      <circle  cx="380" cy="110" r="7"   fill={C.umber} fillOpacity="0.48" />
      <circle  cx="290" cy="330" r="8"   fill={C.umber} fillOpacity="0.45" />
      <circle  cx="308" cy="342" r="5"   fill={C.brown} fillOpacity="0.36" />
      <circle  cx="340" cy="188" r="1.8" fill={C.amber}  fillOpacity="0.26" />
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: edge-left
   Tall, vertical organic wash along the left page edge.
   Designed for 180×600 region.
════════════════════════════════════════════════════════════════════ */
const EdgeLeft = () => (
  <svg viewBox="0 0 180 600" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />

    {/* Main vertical column */}
    <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.62"
      d="M -10,40
         C 10,20 50,18 70,50
         C 88,80 72,118 90,140
         C 110,164 148,152 160,182
         C 172,212 154,250 140,278
         C 126,306 108,314 112,346
         C 116,378 140,394 138,426
         C 136,458 112,478 90,494
         C 68,510 44,508 28,490
         C 12,472 14,444 6,416
         C -2,388 -14,364 -8,332
         C -2,300 20,282 18,252
         C 16,222 -4,200 -6,168
         C -8,136 10,110 6,80
         C 2,50 -18,56 -10,40 Z"
    />

    {/* Secondary lobe — right bulge mid-section */}
    <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.50"
      d="M 90,200
         C 118,188 152,194 162,220
         C 172,246 154,274 128,278
         C 102,282 82,262 82,238
         C 82,214 90,206 90,200 Z"
    />

    {/* Upper lobe */}
    <path filter="url(#ip-soft)" fill={C.bronze} fillOpacity="0.44"
      d="M 40,60
         C 62,44 98,46 108,68
         C 118,90 100,116 76,120
         C 52,124 34,106 36,84
         C 37,72 38,66 40,60 Z"
    />

    {/* Droplets — scattered along the right side of the wash */}
    <circle  cx="154" cy="80"  r="7"   fill={C.umber} fillOpacity="0.58" />
    <circle  cx="166" cy="66"  r="4.5" fill={C.brown} fillOpacity="0.48" />
    <circle  cx="172" cy="56"  r="2.8" fill={C.bronze} fillOpacity="0.40" />
    <ellipse cx="158" cy="320" rx="10" ry="6.5" fill={C.umber} fillOpacity="0.55" transform="rotate(-15 158 320)" />
    <circle  cx="168" cy="306" r="5.5" fill={C.brown} fillOpacity="0.44" />
    <circle  cx="172" cy="294" r="3"   fill={C.bronze} fillOpacity="0.36" />
    <circle  cx="148" cy="450" r="6"   fill={C.umber} fillOpacity="0.50" />
    <circle  cx="160" cy="438" r="3.5" fill={C.brown} fillOpacity="0.40" />
    {/* Copper specks */}
    <circle  cx="100" cy="140" r="1.8" fill={C.copper} fillOpacity="0.28" />
    <circle  cx="82"  cy="384" r="1.6" fill={C.amber}  fillOpacity="0.24" />
    <circle  cx="130" cy="510" r="1.4" fill={C.copper} fillOpacity="0.22" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: wash-radial
   Diffuse central ambient wash. Mostly feathered — no hard edges.
   Used for Skills / overall section atmosphere.
════════════════════════════════════════════════════════════════════ */
const WashRadial = () => (
  <svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />
    {/* Three large overlapping diffuse blobs */}
    <ellipse cx="280" cy="220" rx="260" ry="210" fill={C.charcoal} fillOpacity="0.42" filter="url(#ip-halo)" />
    <ellipse cx="400" cy="260" rx="200" ry="170" fill={C.umber}    fillOpacity="0.28" filter="url(#ip-halo)" />
    <ellipse cx="200" cy="280" rx="180" ry="150" fill={C.brown}    fillOpacity="0.22" filter="url(#ip-halo)" />

    {/* A few organic surface marks on top of the wash */}
    <path filter="url(#ip-soft)" fill={C.bronze} fillOpacity="0.32"
      d="M 280,160 C 330,140 390,158 410,198 C 430,238 406,282 364,292
         C 322,302 278,276 268,234 C 258,192 262,170 280,160 Z"
    />
    <path filter="url(#ip-soft)" fill={C.umber} fillOpacity="0.28"
      d="M 160,240 C 190,218 230,220 244,250 C 258,280 240,314 210,320
         C 180,326 152,306 150,278 C 148,258 152,248 160,240 Z"
    />

    {/* Small scattered drops */}
    <circle cx="350" cy="110" r="6"   fill={C.umber}  fillOpacity="0.38" />
    <circle cx="365" cy="98"  r="4"   fill={C.brown}  fillOpacity="0.30" />
    <circle cx="460" cy="180" r="5.5" fill={C.umber}  fillOpacity="0.34" />
    <circle cx="472" cy="168" r="3"   fill={C.bronze} fillOpacity="0.28" />
    <circle cx="130" cy="340" r="5"   fill={C.umber}  fillOpacity="0.36" />
    <circle cx="118" cy="354" r="3.5" fill={C.brown}  fillOpacity="0.28" />
    <circle cx="500" cy="300" r="6"   fill={C.umber}  fillOpacity="0.32" />
    <circle cx="514" cy="290" r="3"   fill={C.bronze} fillOpacity="0.26" />
    {/* Copper specks */}
    <circle cx="310" cy="90"  r="2"   fill={C.copper} fillOpacity="0.28" />
    <circle cx="440" cy="380" r="1.8" fill={C.amber}  fillOpacity="0.24" />
    <circle cx="200" cy="140" r="1.6" fill={C.copper} fillOpacity="0.22" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: cluster
   Scattered organic droplets with no dominant central shape.
   Used for corner accents in Projects, Achievements.
════════════════════════════════════════════════════════════════════ */
const Cluster = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />

    {/* Irregular organic blob — off-center, not round */}
    <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.65"
      d="M 80,50
         C 112,28 154,30 168,60
         C 182,90 162,124 140,136
         C 118,148 90,136 78,116
         C 66,96 52,72 80,50 Z"
    />
    <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.52"
      d="M 130,90
         C 158,72 196,78 208,106
         C 220,134 202,164 174,168
         C 146,172 124,150 126,124
         C 127,110 128,100 130,90 Z"
    />

    {/* Cluster of drops — top-right */}
    <ellipse cx="210" cy="40"  rx="14" ry="9"  fill={C.umber} fillOpacity="0.68" transform="rotate(-18 210 40)" />
    <circle  cx="228" cy="26"  r="8"   fill={C.brown} fillOpacity="0.58" />
    <circle  cx="244" cy="16"  r="5"   fill={C.brown} fillOpacity="0.48" />
    <circle  cx="258" cy="10"  r="3.2" fill={C.bronze} fillOpacity="0.42" />
    <circle  cx="266" cy="26"  r="2.5" fill={C.bronze} fillOpacity="0.36" />
    <circle  cx="246" cy="36"  r="1.8" fill={C.copper} fillOpacity="0.28" />

    {/* Stray drops — lower left */}
    <ellipse cx="30"  cy="200" rx="12" ry="8"  fill={C.umber} fillOpacity="0.62" transform="rotate(25 30 200)" />
    <circle  cx="14"  cy="188" r="6.5" fill={C.brown} fillOpacity="0.52" />
    <circle  cx="4"   cy="178" r="4"   fill={C.bronze} fillOpacity="0.42" />
    <circle  cx="48"  cy="214" r="3.5" fill={C.brown} fillOpacity="0.40" />
    <circle  cx="62"  cy="224" r="2.2" fill={C.bronze} fillOpacity="0.34" />

    {/* Mid-right drop group */}
    <circle  cx="280" cy="150" r="7"   fill={C.umber} fillOpacity="0.56" />
    <circle  cx="294" cy="138" r="4.5" fill={C.brown} fillOpacity="0.46" />
    <circle  cx="304" cy="128" r="2.8" fill={C.bronze} fillOpacity="0.38" />
    <circle  cx="290" cy="164" r="2"   fill={C.bronze} fillOpacity="0.32" />

    {/* Lower center scattered specks */}
    <circle  cx="150" cy="220" r="5"   fill={C.umber} fillOpacity="0.50" />
    <circle  cx="168" cy="236" r="3"   fill={C.brown} fillOpacity="0.42" />
    <circle  cx="182" cy="244" r="2"   fill={C.bronze} fillOpacity="0.36" />
    <circle  cx="136" cy="234" r="1.8" fill={C.copper} fillOpacity="0.28" />

    {/* Amber accent specks */}
    <circle  cx="170" cy="15"  r="2"   fill={C.amber}  fillOpacity="0.26" />
    <circle  cx="100" cy="140" r="1.6" fill={C.copper} fillOpacity="0.24" />
    <circle  cx="260" cy="200" r="1.5" fill={C.amber}  fillOpacity="0.22" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   VARIANT: trail-h
   Horizontal pigment trail — organic band flowing across.
   Used at section transitions or as a horizontal accent.
════════════════════════════════════════════════════════════════════ */
const TrailH = () => (
  <svg viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" overflow="visible">
    <Defs />

    {/* Main horizontal trail */}
    <path filter="url(#ip-bleed)" fill={C.umber} fillOpacity="0.58"
      d="M -10,60
         C 40,40 100,50 160,70
         C 220,90 260,80 320,62
         C 380,44 420,38 480,55
         C 540,72 580,90 640,75
         C 700,60 740,42 800,55
         L 810,110
         C 760,120 720,108 660,118
         C 600,128 560,140 500,125
         C 440,110 400,100 340,115
         C 280,130 240,138 180,120
         C 120,102 80,110 20,120
         Z"
    />

    {/* Secondary wavy layer */}
    <path filter="url(#ip-soft)" fill={C.brown} fillOpacity="0.44"
      d="M 100,50
         C 150,36 200,44 260,58
         C 320,72 360,68 420,50
         C 480,32 520,30 580,48
         C 640,66 680,75 720,60
         L 730,100
         C 690,112 650,102 590,115
         C 530,128 490,130 430,112
         C 370,94 330,90 270,108
         C 210,126 170,130 110,112
         Z"
    />

    {/* Droplets along the trail */}
    <circle cx="80"  cy="34"  r="5.5" fill={C.umber} fillOpacity="0.55" />
    <circle cx="66"  cy="24"  r="3.5" fill={C.brown} fillOpacity="0.46" />
    <circle cx="200" cy="28"  r="5"   fill={C.umber} fillOpacity="0.52" />
    <circle cx="214" cy="18"  r="3"   fill={C.brown} fillOpacity="0.42" />
    <circle cx="460" cy="22"  r="6"   fill={C.umber} fillOpacity="0.54" />
    <circle cx="474" cy="12"  r="4"   fill={C.brown} fillOpacity="0.44" />
    <circle cx="630" cy="30"  r="5.5" fill={C.umber} fillOpacity="0.52" />
    <circle cx="644" cy="20"  r="3.5" fill={C.bronze} fillOpacity="0.42" />
    <circle cx="750" cy="36"  r="5"   fill={C.umber} fillOpacity="0.50" />
    {/* Copper specks */}
    <circle cx="350" cy="20"  r="2"   fill={C.copper} fillOpacity="0.26" />
    <circle cx="550" cy="16"  r="1.8" fill={C.amber}  fillOpacity="0.22" />
  </svg>
);

/* ─── Variant map ─────────────────────────────────────────────── */
const VARIANTS: Record<PigmentVariant, React.ReactElement> = {
  'corner-tl':   <CornerTL />,
  'corner-tr':   <CornerTR />,
  'corner-bl':   <CornerBL />,
  'corner-br':   <CornerBR />,
  'edge-left':   <EdgeLeft />,
  'wash-radial': <WashRadial />,
  'cluster':     <Cluster />,
  'trail-h':     <TrailH />,
};

/* ─── Public component ────────────────────────────────────────── */
export default function InkPigment({ variant, style, className, opacity = 1 }: InkPigmentProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        opacity,
        zIndex: 0,
        ...style,
      }}
    >
      {VARIANTS[variant]}
    </div>
  );
}

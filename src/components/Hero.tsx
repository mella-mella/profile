import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Code2, ExternalLink } from 'lucide-react';
import InkPigment from './InkPigment';

const socialLinks = [
  { icon: Github,  label: 'GitHub',     href: 'https://github.com/sahu-sumit' },
  { icon: Linkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/sahu-sumit13/' },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
    label: 'LeetCode',
    href: 'https://leetcode.com/u/sahu_SuMiT/',
  },
  { icon: Code2, label: 'Codeforces', href: 'https://codeforces.com/profile/sumit1304' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Warm-tinted ambient grid with slow-drifting nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawGrid = () => {
      // Very subtle warm amber grid lines
      ctx.strokeStyle = 'rgba(217,160,102,0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.0025;

      drawGrid();

      // Floating warm copper/amber nodes
      const nodes = [
        { x: 0.15, y: 0.25, r: 2.2, delay: 0 },
        { x: 0.82, y: 0.18, r: 1.8, delay: 1 },
        { x: 0.70, y: 0.65, r: 2.5, delay: 2 },
        { x: 0.25, y: 0.75, r: 1.8, delay: 0.5 },
        { x: 0.55, y: 0.35, r: 1.4, delay: 1.5 },
      ];

      nodes.forEach((node, i) => {
        const x = node.x * canvas.width;
        const y = node.y * canvas.height + Math.sin(time + node.delay) * 8;
        const alpha = 0.22 + Math.sin(time * 0.6 + node.delay) * 0.10;

        ctx.beginPath();
        ctx.arc(x, y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,160,102,${alpha})`;
        ctx.fill();

        // Faint connector lines between nearby nodes
        nodes.forEach((other, j) => {
          if (j <= i) return;
          const ox = other.x * canvas.width;
          const oy = other.y * canvas.height + Math.sin(time + other.delay) * 8;
          const dist = Math.hypot(ox - x, oy - y);
          if (dist < 280) {
            const lineAlpha = (1 - dist / 280) * 0.055;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(217,160,102,${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw();
    } else {
      drawGrid();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Ambient canvas grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Warm amber radial glow — portrait side focal point */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 68% 45%, rgba(217,160,102,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade into About section (#161512) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #161512)' }}
        aria-hidden="true"
      />

      {/*
        Secondary InkPigment — upper-left of Hero.
        Balances the portrait-side ink splash with a sympathetic pigment
        in the text column region without competing with readability.
        Low opacity so canvas grid remains visible.
      */}
      <InkPigment
        variant="corner-tl"
        opacity={0.38}
        style={{ top: -30, left: -50, width: 380, height: 340 }}
      />

      <div className="section-container relative z-10 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Text column ── */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: 'var(--accent-primary)' }} />
              <span className="section-label">Software Developer</span>
            </motion.div>

            {/* Name heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Mella
              <br />
              <span style={{ color: 'var(--accent-secondary)' }}>Melissa.</span>
            </motion.h1>

            {/* Specializations */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl font-medium mb-6 tracking-wide"
              style={{ color: 'var(--text-secondary)' }}
            >
              Full-Stack · AI/ML · Systems Engineering
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: 'var(--text-muted)' }}
            >
              I build production-ready software — from full-stack applications and backend
              infrastructure to intelligent systems and developer tools. CS undergrad at
              IIIT Gwalior with hands-on experience leading engineering teams and shipping
              real products.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                View Projects
                <ExternalLink size={16} />
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-outline">
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(217,160,102,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <social.icon size={16} />
                  <span className="hidden sm:block">{social.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Portrait + ink splash ── */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
              style={{ width: 340, height: 340 }}
            >
              {/* ── Organic ink-splash backdrop ── */}
              <svg
                viewBox="0 0 340 340"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-40px',
                  width: 'calc(100% + 80px)',
                  height: 'calc(100% + 80px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                  overflow: 'visible',
                }}
              >
                <defs>
                  {/* Slight edge blur for paint-bleed effect */}
                  <filter id="inkBlur" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  {/* Soft diffuse halo */}
                  <filter id="inkSoft" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="9" />
                  </filter>

                  {/* ── WARM CHARCOAL / COPPER GRADIENTS ── */}

                  {/* Main blob: dark umber top-left → deep charcoal bottom-right */}
                  <linearGradient id="inkGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#3D2810" stopOpacity="0.96" />
                    <stop offset="45%"  stopColor="#2C1E0C" stopOpacity="0.94" />
                    <stop offset="100%" stopColor="#1E1408" stopOpacity="0.90" />
                  </linearGradient>

                  {/* Secondary blob: warm bronze → deep brown */}
                  <linearGradient id="inkGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#4A2E12" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#2A1C0A" stopOpacity="0.84" />
                  </linearGradient>

                  {/* Tertiary wash: muted copper tint */}
                  <linearGradient id="inkGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%"   stopColor="#5C3A18" stopOpacity="0.70" />
                    <stop offset="100%" stopColor="#3A2410" stopOpacity="0.52" />
                  </linearGradient>

                  {/* Warm radial halo behind portrait */}
                  <radialGradient id="warmHalo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#C68A48" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#C68A48" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Warm radial glow — sits behind all ink */}
                <ellipse cx="178" cy="172" rx="178" ry="166"
                  fill="url(#warmHalo)" filter="url(#inkSoft)" />

                {/* Outer dark halo — anchors the splash to the bg */}
                <ellipse cx="178" cy="172" rx="172" ry="160"
                  fill="rgba(20,12,4,0.55)" filter="url(#inkSoft)" />

                {/*
                  ── MAIN INK SPLASH BODY ──
                  Three layered asymmetric organic blobs.
                  All paths unchanged from previous version.
                  Only fills updated to warm charcoal / umber / bronze.
                */}
                <path
                  filter="url(#inkBlur)"
                  fill="url(#inkGrad1)"
                  fillOpacity="1"
                  d="
                    M 162,22
                    C 208,10  262,28  292,62
                    C 326,100 338,148 334,188
                    C 332,214 326,238 308,258
                    C 330,268 348,290 340,316
                    C 332,340 304,350 280,344
                    C 260,340 242,326 228,310
                    C 208,330 180,350 148,352
                    C 110,354 72,334 54,304
                    C 38,278 42,246 58,222
                    C 32,204 10,180 12,150
                    C 14,118 40,90  68,76
                    C 58,60  52,38  66,24
                    C 82,8   122,6  148,18
                    C 152,20 157,21 162,22 Z
                  "
                />

                {/* Secondary layer — warm bronze offset */}
                <path
                  fill="url(#inkGrad2)"
                  fillOpacity="1"
                  d="
                    M 148,38
                    C 188,22  246,44  276,82
                    C 306,118 310,168 296,206
                    C 284,238 260,258 234,268
                    C 242,290 240,320 218,336
                    C 196,352 164,348 144,330
                    C 126,350 98,362 70,350
                    C 44,338 30,310 36,282
                    C 16,262  4,236  8,208
                    C 12,178 32,154 58,144
                    C 48,124 46,98  60,78
                    C 76,56  108,44  136,42
                    C 140,40 144,39 148,38 Z
                  "
                />

                {/* Tertiary wash — muted copper edge diffusion */}
                <path
                  fill="url(#inkGrad3)"
                  fillOpacity="1"
                  d="
                    M 170,48
                    C 206,40 244,58 268,88
                    C 294,122 298,166 282,202
                    C 270,228 248,246 224,254
                    C 216,278 208,310 184,326
                    C 160,342 128,336 110,316
                    C 98,336 76,350 52,338
                    C 28,326 18,298 28,274
                    C 12,252 4,224 10,196
                    C 16,166 40,144 68,138
                    C 56,116 52,88 68,68
                    C 86,46 120,38 152,44
                    C 158,45 164,46 170,48 Z
                  "
                />

                {/* ── ORGANIC TENDRILS — warm dark brown ── */}

                {/* Upper-right lobe */}
                <path fill="#3A2010" fillOpacity="0.84"
                  d="M 286,72 C 306,58 328,52 344,64 C 358,76 354,98 340,108 C 324,120 304,112 294,98 C 286,88 282,78 286,72 Z" />
                <path fill="#4A2C14" fillOpacity="0.62"
                  d="M 330,56 C 340,48 356,46 364,56 C 372,66 366,80 354,84 C 342,88 330,80 326,70 C 323,63 325,60 330,56 Z" />

                {/* Lower-right lobe */}
                <path fill="#2E1C08" fillOpacity="0.80"
                  d="M 302,288 C 318,276 340,278 350,294 C 360,310 350,332 334,338 C 318,344 300,332 296,316 C 292,302 294,296 302,288 Z" />

                {/* Left-lower lobe */}
                <path fill="#38200E" fillOpacity="0.76"
                  d="M 32,254 C 18,240 8,220 16,202 C 22,188 40,182 54,192 C 68,202 70,222 62,236 C 54,248 40,258 32,254 Z" />

                {/* Upper-left lobe */}
                <path fill="#2A1808" fillOpacity="0.70"
                  d="M 56,54 C 42,40 36,20 50,10 C 62,2 80,8 86,22 C 92,36 84,52 70,58 C 62,62 58,58 56,54 Z" />

                {/* Bottom-left lobe */}
                <path fill="#321C0A" fillOpacity="0.74"
                  d="M 116,344 C 100,358 78,366 62,356 C 48,346 46,326 58,314 C 70,302 90,302 104,312 C 116,320 122,336 116,344 Z" />

                {/* ── INK DROPLETS — warm umber / bronze ── */}

                {/* Cluster top-right */}
                <ellipse cx="316" cy="44"  rx="9"  ry="6"  fill="#4A2C10" fillOpacity="0.84" transform="rotate(-28 316 44)" />
                <circle  cx="334" cy="36"  r="5"   fill="#5A3618" fillOpacity="0.72" />
                <circle  cx="348" cy="28"  r="3"   fill="#4E2E10" fillOpacity="0.60" />
                <circle  cx="328" cy="22"  r="1.8" fill="#6A4020" fillOpacity="0.52" />
                <circle  cx="356" cy="42"  r="2.2" fill="#3C2410" fillOpacity="0.48" />

                {/* Upper lone drop */}
                <ellipse cx="244" cy="14"  rx="7"  ry="4.5" fill="#422810" fillOpacity="0.78" transform="rotate(18 244 14)" />
                <circle  cx="258" cy="8"   r="3.2" fill="#522E12" fillOpacity="0.62" />
                <circle  cx="268" cy="4"   r="1.6" fill="#6A3C18" fillOpacity="0.48" />

                {/* Cluster lower-right */}
                <ellipse cx="358" cy="246" rx="10" ry="6"  fill="#38200C" fillOpacity="0.82" transform="rotate(12 358 246)" />
                <circle  cx="372" cy="258" r="5.5" fill="#422810" fillOpacity="0.70" />
                <circle  cx="382" cy="248" r="3"   fill="#4E3014" fillOpacity="0.56" />
                <circle  cx="376" cy="268" r="2"   fill="#5A3A1A" fillOpacity="0.44" />

                {/* Left side drops */}
                <circle  cx="8"   cy="168" r="6"   fill="#30180A" fillOpacity="0.76" />
                <circle  cx="0"   cy="158" r="3.5" fill="#3C2010" fillOpacity="0.60" />
                <circle  cx="2"   cy="180" r="2"   fill="#4A2A14" fillOpacity="0.44" />

                {/* Bottom-left drops */}
                <ellipse cx="36"  cy="312" rx="8"  ry="5"  fill="#2E1A08" fillOpacity="0.78" transform="rotate(-20 36 312)" />
                <circle  cx="22"  cy="302" r="4"   fill="#382010" fillOpacity="0.64" />
                <circle  cx="14"  cy="292" r="2.5" fill="#422A14" fillOpacity="0.50" />
                <circle  cx="28"  cy="322" r="1.8" fill="#4C3018" fillOpacity="0.40" />

                {/* ── RESTRAINED COPPER HIGHLIGHT SPECKS ── */}
                {/* A few tiny warm accent specks give the splash life against the dark bg */}
                <circle  cx="338" cy="126" r="2"   fill="#C68A48" fillOpacity="0.38" />
                <circle  cx="344" cy="118" r="1.2" fill="#D9A066" fillOpacity="0.32" />
                <circle  cx="22"  cy="214" r="1.8" fill="#B87840" fillOpacity="0.34" />
                <circle  cx="266" cy="22"  r="1.4" fill="#D09A5A" fillOpacity="0.30" />
                <circle  cx="108" cy="358" r="1.6" fill="#C08848" fillOpacity="0.30" />
                <circle  cx="370" cy="260" r="1.2" fill="#E8C79A" fillOpacity="0.28" />
                <circle  cx="358" cy="58"  r="1.5" fill="#C68A48" fillOpacity="0.28" />
                <circle  cx="50"  cy="40"  r="1.2" fill="#D9A066" fillOpacity="0.24" />
              </svg>

              {/* ── Precision Neon Light Streaks (behind portrait, zIndex: 2) ── */}
              <div
                className="absolute pointer-events-none neon-streak-animated"
                style={{
                  top: -180,
                  left: -220,
                  width: 780,
                  height: 700,
                  zIndex: 2,
                  overflow: 'visible',
                }}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 780 700"
                  className="w-full h-full overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Multi-tier bloom filters */}
                    <filter id="streakBloomWide" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="18" result="wide" />
                    </filter>
                    <filter id="streakBloomMid" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="mid" />
                    </filter>
                    <filter id="streakBloomCore" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="core" />
                    </filter>

                    {/* Streak 1: Electric Cyan → Acid Lime linear gradient */}
                    <linearGradient id="laserGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                      <stop offset="12%" stopColor="#00E5FF" stopOpacity="0.45" />
                      <stop offset="38%" stopColor="#D9FF00" stopOpacity="0.95" />
                      <stop offset="68%" stopColor="#00E5FF" stopOpacity="0.95" />
                      <stop offset="86%" stopColor="#D9FF00" stopOpacity="0.80" />
                      <stop offset="100%" stopColor="#D9FF00" stopOpacity="0" />
                    </linearGradient>

                    {/* Streak 2: Acid Lime dominant parallel gradient */}
                    <linearGradient id="laserGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#D9FF00" stopOpacity="0" />
                      <stop offset="18%" stopColor="#D9FF00" stopOpacity="0.75" />
                      <stop offset="48%" stopColor="#00E5FF" stopOpacity="0.88" />
                      <stop offset="78%" stopColor="#D9FF00" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </linearGradient>

                    {/* Streak 3: Razor filament gradient */}
                    <linearGradient id="laserGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                      <stop offset="25%" stopColor="#00E5FF" stopOpacity="0.65" />
                      <stop offset="60%" stopColor="#D9FF00" stopOpacity="0.60" />
                      <stop offset="100%" stopColor="#D9FF00" stopOpacity="0" />
                    </linearGradient>

                    {/* White-hot optical core line */}
                    <linearGradient id="laserCoreGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.4" />
                      <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.98" />
                      <stop offset="70%" stopColor="#E6FFFF" stopOpacity="0.98" />
                      <stop offset="88%" stopColor="#F7FFD1" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>

                    {/* Volumetric fanning flare in top-right */}
                    <linearGradient id="fanGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                      <stop offset="40%" stopColor="#00E5FF" stopOpacity="0.16" />
                      <stop offset="70%" stopColor="#D9FF00" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#D9FF00" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* ── Volumetric optical flare fan (top-right exit) ── */}
                  <polygon
                    points="450,290 770,35 695,-10 495,200"
                    fill="url(#fanGrad)"
                    filter="url(#streakBloomWide)"
                    opacity="0.8"
                  />

                  {/* ── STREAK 1: Primary Laser Core (Main Beam) ── */}
                  {/* Layer 1: Atmospheric wide bloom */}
                  <line
                    x1="45" y1="621" x2="765" y2="49"
                    stroke="url(#laserGrad1)"
                    strokeWidth="34"
                    strokeLinecap="round"
                    filter="url(#streakBloomWide)"
                    opacity="0.32"
                  />
                  {/* Layer 2: Concentrated optical sheath */}
                  <line
                    x1="45" y1="621" x2="765" y2="49"
                    stroke="url(#laserGrad1)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    filter="url(#streakBloomMid)"
                    opacity="0.75"
                  />
                  {/* Layer 3: Laser core */}
                  <line
                    x1="45" y1="621" x2="765" y2="49"
                    stroke="url(#laserGrad1)"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    filter="url(#streakBloomCore)"
                    opacity="0.95"
                  />
                  {/* Layer 4: Razor-thin incandescent white filament */}
                  <line
                    x1="45" y1="621" x2="765" y2="49"
                    stroke="url(#laserCoreGrad)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.98"
                  />

                  {/* ── STREAK 2: Secondary Parallel Beam (offset +24px) ── */}
                  {/* Atmospheric bloom */}
                  <line
                    x1="70" y1="595" x2="785" y2="28"
                    stroke="url(#laserGrad2)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    filter="url(#streakBloomWide)"
                    opacity="0.25"
                  />
                  {/* Medium beam */}
                  <line
                    x1="70" y1="595" x2="785" y2="28"
                    stroke="url(#laserGrad2)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#streakBloomMid)"
                    opacity="0.65"
                  />
                  {/* Thin core */}
                  <line
                    x1="70" y1="595" x2="785" y2="28"
                    stroke="url(#laserGrad2)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    opacity="0.88"
                  />

                  {/* ── STREAK 3: Tertiary Divergent Accent Filament (offset -28px) ── */}
                  <line
                    x1="28" y1="648" x2="735" y2="82"
                    stroke="url(#laserGrad3)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    filter="url(#streakBloomWide)"
                    opacity="0.18"
                  />
                  <line
                    x1="28" y1="648" x2="735" y2="82"
                    stroke="url(#laserGrad3)"
                    strokeWidth="1.0"
                    strokeLinecap="round"
                    opacity="0.70"
                  />
                </svg>
              </div>

              {/* ── Circular profile image — sits on top of splash & streaks ── */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 10,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(232,199,154,0.18)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.72), 0 0 0 1px rgba(217,160,102,0.10)',
                }}
              >
                <img
                  src="/melissa1.jpeg"
                  alt="Mella Melissa"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ── Partial Neon Rim & Prismatic Glints (zIndex: 12, directly on rim) ── */}
              <div
                className="absolute inset-0 pointer-events-none neon-rim-animated"
                style={{ zIndex: 12 }}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 340 340"
                  className="w-full h-full overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="rimGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4.5" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" />
                    </filter>

                    {/* Top-right rim gradient: Electric Cyan to Acid Lime */}
                    <linearGradient id="rimGradTR" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
                      <stop offset="25%" stopColor="#00E5FF" stopOpacity="0.95" />
                      <stop offset="70%" stopColor="#D9FF00" stopOpacity="1" />
                      <stop offset="100%" stopColor="#D9FF00" stopOpacity="0" />
                    </linearGradient>

                    {/* Bottom-left rim gradient: Acid Lime to Electric Cyan */}
                    <linearGradient id="rimGradBL" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#D9FF00" stopOpacity="0" />
                      <stop offset="30%" stopColor="#D9FF00" stopOpacity="0.95" />
                      <stop offset="75%" stopColor="#00E5FF" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </linearGradient>

                    {/* Starburst glint radial glows */}
                    <radialGradient id="starHaloCyan" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.30" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="starHaloLime" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D9FF00" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#D9FF00" stopOpacity="0.30" />
                      <stop offset="100%" stopColor="#D9FF00" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ── PARTIAL RIM ARC 1: Top-Right Circumference ── */}
                  {/* Diffuse glow layer */}
                  <path
                    d="M 226,12 A 169 169 0 0 1 334,124"
                    stroke="url(#rimGradTR)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#rimGlowFilter)"
                    opacity="0.65"
                  />
                  {/* Crisp neon rim line */}
                  <path
                    d="M 226,12 A 169 169 0 0 1 334,124"
                    stroke="url(#rimGradTR)"
                    strokeWidth="2.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Razor core highlight */}
                  <path
                    d="M 248,20 A 169 169 0 0 1 328,105"
                    stroke="#FFFFFF"
                    strokeWidth="1.1"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.80"
                  />

                  {/* ── PARTIAL RIM ARC 2: Bottom-Left Circumference ── */}
                  {/* Diffuse glow layer */}
                  <path
                    d="M 114,328 A 169 169 0 0 1 7,216"
                    stroke="url(#rimGradBL)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#rimGlowFilter)"
                    opacity="0.65"
                  />
                  {/* Crisp neon rim line */}
                  <path
                    d="M 114,328 A 169 169 0 0 1 7,216"
                    stroke="url(#rimGradBL)"
                    strokeWidth="2.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Razor core highlight */}
                  <path
                    d="M 98,322 A 169 169 0 0 1 15,232"
                    stroke="#FFFFFF"
                    strokeWidth="1.1"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.75"
                  />

                  {/* ── INTERSECTION STARBURST FLARES ── */}
                  {/* Top-Right Intersection Starburst */}
                  <g transform="translate(303, 56)">
                    <circle r="18" fill="url(#starHaloCyan)" />
                    {/* 4-point diamond star */}
                    <path
                      d="M 0,-18 Q 0,0 18,0 Q 0,0 0,18 Q 0,0 -18,0 Q 0,0 0,-18 Z"
                      fill="#FFFFFF"
                      opacity="0.95"
                    />
                    <circle r="2.8" fill="#D9FF00" />
                  </g>

                  {/* Bottom-Left Intersection Starburst */}
                  <g transform="translate(62, 276)">
                    <circle r="15" fill="url(#starHaloLime)" />
                    {/* 4-point diamond star */}
                    <path
                      d="M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z"
                      fill="#FFFFFF"
                      opacity="0.92"
                    />
                    <circle r="2.2" fill="#00E5FF" />
                  </g>

                  {/* ── PRISMATIC PARTICLES & LIGHT GLINTS ── */}
                  {/* Top-right glints */}
                  <g className="neon-particle">
                    <circle cx="330" cy="22" r="2" fill="#FFFFFF" opacity="0.9" />
                    <circle cx="330" cy="22" r="6" fill="#00E5FF" opacity="0.35" />
                  </g>
                  <g className="neon-particle" style={{ animationDelay: '1.2s' }}>
                    <path
                      d="M 358,-12 Q 358,-7 363,-7 Q 358,-7 358,-2 Q 358,-7 353,-7 Q 358,-7 358,-12 Z"
                      fill="#D9FF00"
                      opacity="0.85"
                    />
                  </g>
                  <circle cx="380" cy="-42" r="1.6" fill="#00E5FF" opacity="0.75" className="neon-particle" style={{ animationDelay: '2.1s' }} />
                  <circle cx="410" cy="-72" r="1.2" fill="#D9FF00" opacity="0.8" className="neon-particle" style={{ animationDelay: '0.7s' }} />
                  <circle cx="348" cy="-55" r="1.0" fill="#FFFFFF" opacity="0.65" />

                  {/* Bottom-left glints */}
                  <g className="neon-particle" style={{ animationDelay: '1.8s' }}>
                    <circle cx="32" cy="308" r="1.8" fill="#00E5FF" opacity="0.85" />
                    <circle cx="32" cy="308" r="5" fill="#00E5FF" opacity="0.30" />
                  </g>
                  <circle cx="-12" cy="342" r="1.5" fill="#D9FF00" opacity="0.7" className="neon-particle" style={{ animationDelay: '2.5s' }} />
                  <path
                    d="M -42,372 Q -42,376 -38,376 Q -42,376 -42,380 Q -42,376 -46,376 Q -42,376 -42,372 Z"
                    fill="#FFFFFF"
                    opacity="0.8"
                    className="neon-particle"
                    style={{ animationDelay: '0.4s' }}
                  />

                  {/* ── TECHNICAL MATRIX DOTTED GUIDES ── */}
                  {/* Left vertical dotted guide (warm amber with cyan touch) */}
                  <g opacity="0.35">
                    <circle cx="-18" cy="100" r="1" fill="#D9A066" />
                    <circle cx="-18" cy="122" r="1" fill="#D9A066" />
                    <circle cx="-18" cy="144" r="1" fill="#D9A066" />
                    <circle cx="-18" cy="166" r="1" fill="#D9A066" />
                    <circle cx="-18" cy="188" r="1.3" fill="#00E5FF" opacity="0.85" />
                    <circle cx="-18" cy="210" r="1" fill="#D9A066" />
                    <circle cx="-18" cy="232" r="1" fill="#D9A066" />
                  </g>
                  {/* Right vertical dotted guide (warm amber with lime touch) */}
                  <g opacity="0.35">
                    <circle cx="358" cy="80"  r="1.3" fill="#D9FF00" opacity="0.85" />
                    <circle cx="358" cy="102" r="1" fill="#D9A066" />
                    <circle cx="358" cy="124" r="1" fill="#D9A066" />
                    <circle cx="358" cy="146" r="1" fill="#D9A066" />
                    <circle cx="358" cy="168" r="1" fill="#D9A066" />
                    <circle cx="358" cy="190" r="1" fill="#D9A066" />
                  </g>
                </svg>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}

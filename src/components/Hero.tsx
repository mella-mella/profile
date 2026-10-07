import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Code2, ExternalLink } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/sahu-sumit' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sahu-sumit13/' },
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle animated grid with moving nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      // Subtle grid
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Minimal floating nodes
      const nodes = [
        { x: 0.15, y: 0.25, r: 2.5, delay: 0 },
        { x: 0.82, y: 0.18, r: 2, delay: 1 },
        { x: 0.7, y: 0.65, r: 3, delay: 2 },
        { x: 0.25, y: 0.75, r: 2, delay: 0.5 },
        { x: 0.55, y: 0.35, r: 1.5, delay: 1.5 },
      ];

      nodes.forEach((node, i) => {
        const x = node.x * canvas.width;
        const y = node.y * canvas.height + Math.sin(time + node.delay) * 8;
        const alpha = 0.3 + Math.sin(time * 0.7 + node.delay) * 0.15;

        ctx.beginPath();
        ctx.arc(x, y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.fill();

        // Connect nearby nodes
        nodes.forEach((other, j) => {
          if (j <= i) return;
          const ox = other.x * canvas.width;
          const oy = other.y * canvas.height + Math.sin(time + other.delay) * 8;
          const dist = Math.hypot(ox - x, oy - y);
          if (dist < 280) {
            const lineAlpha = (1 - dist / 280) * 0.08;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    // Only animate if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw();
    } else {
      // Just draw grid once
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
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
      {/* Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #07111F)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-32 lg:py-40">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-blue-primary" />
            <span className="section-label">Software Developer</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight mb-6"
          >
            Mella
            <br />
            <span className="text-blue-light">Melissa.</span>
          </motion.h1>

          {/* Specializations */}
          <motion.p
            variants={itemVariants}
            className="text-lg lg:text-xl text-text-secondary font-medium mb-6 tracking-wide"
          >
            Full-Stack · AI/ML · Systems Engineering
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base lg:text-lg text-text-muted leading-relaxed mb-10 max-w-xl"
          >
            I build production-ready software — from full-stack applications and backend
            infrastructure to intelligent systems and developer tools. CS undergrad at
            IIIT Gwalior with hands-on experience leading engineering teams and shipping
            real products.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary"
            >
              View Projects
              <ExternalLink size={16} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-outline"
            >
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
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-all duration-200 text-sm"
              >
                <social.icon size={16} />
                <span className="hidden sm:block">{social.label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
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

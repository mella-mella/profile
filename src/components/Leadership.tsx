import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Users, PenTool, Trophy, ExternalLink } from 'lucide-react';
import InkPigment from './InkPigment';

const leadershipItems = [
  {
    icon: Users,
    title: 'C++ Workshop Lead',
    description: 'Conducted technical workshops on C++ for 200+ students, covering STL, memory management, and competitive programming fundamentals.',
    highlight: '200+ students',
  },
  {
    icon: PenTool,
    title: 'Problem Setter — Coding Club',
    description: 'Authored and curated algorithmic problems for the institute coding club, ensuring correctness, difficulty calibration, and test case quality.',
    highlight: 'Institute-level',
  },
  {
    icon: Trophy,
    title: 'Cricket Event Organizer',
    description: 'Organized and managed cricket activities for the 7th Inter-IIIT Sports Meet, coordinating logistics for national-level participants across institutions.',
    highlight: '7th Inter-IIIT Meet',
  },
];

export default function Leadership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="leadership" className="section-padding relative overflow-hidden" style={{ background: '#161512' }}>

      {/*
        ── PIGMENT LAYER ──
        edge-left: vertical wash continues the Achievements corner-bl —
        gives the impression the pigment is flowing down the left edge
        across section boundaries.
      */}
      <InkPigment
        variant="edge-left"
        opacity={0.50}
        style={{ top: -20, left: -20, width: 160, height: '100%', minHeight: 500 }}
      />

      {/* Warm ambient glow center */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 50% at 50% 40%, rgba(150,85,30,0.045) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-14">
          <p className="section-label">Leadership</p>
          <h2 className="section-title">
            Beyond the{' '}
            <span style={{ color: 'var(--accent-secondary)' }}>code.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leadershipItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="card-base p-5 card-hover flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(217,160,102,0.10)', border: '1px solid rgba(217,160,102,0.22)' }}>
                  <item.icon size={18} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                    <span className="tag text-[10px] px-2 py-0.5">{item.highlight}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card-base p-6 card-hover relative overflow-hidden"
            style={{ borderColor: 'rgba(217,160,102,0.25)' }}
          >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(217,160,102,0.07) 0%, transparent 65%)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="section-label !mb-0 !text-[10px]">Founder</span>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Sangillence</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                Founded Sangillence — building an AI/ML-powered assessment engine for a nationwide
                olympiad designed to evaluate student{' '}
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>creativity</span> and{' '}
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>emotional intelligence</span> at scale.
              </p>
              <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                The platform combines machine learning with educational assessment frameworks,
                designed to reach students across India through structured olympiad infrastructure.
              </p>
              <a href="https://www.sangillence.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: 'var(--accent-primary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent-primary)')}>
                Visit Sangillence <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

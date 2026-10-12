import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import InkPigment from './InkPigment';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const stats = [
  { value: '700+', label: 'DSA Problems' },
  { value: '1973+', label: 'LeetCode Peak' },
  { value: '10K+', label: 'MorganJob Users' },
  { value: '5K+', label: 'Amazon MLSS Pool' },
];

const domains = [
  { label: 'Full-Stack Development', description: 'React, Next.js, Node.js, MERN — from UI to APIs.' },
  { label: 'Backend & Systems', description: 'Go, PostgreSQL, real-time architectures, microservices.' },
  { label: 'AI & Machine Learning', description: 'RAG, LangChain, recommender systems, ML pipelines.' },
  { label: 'Cloud & DevOps', description: 'AWS, Docker, Prometheus, Grafana, CI/CD workflows.' },
  { label: 'Developer Tooling', description: 'Productivity dashboards, monitoring, observability systems.' },
  { label: 'Competitive Programming', description: 'LeetCode Knight · 700+ problems · Codeforces 1369+.' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: '#161512' }}>

      {/*
        ── PIGMENT LAYER ──
        Large corner-tr stain entering from the top-right (stats column side).
        Offset so it sits behind the stats column, partially bleeds outside.
      */}
      <InkPigment
        variant="corner-tr"
        opacity={0.72}
        style={{ top: -60, right: -80, width: 540, height: 480 }}
      />

      {/*
        Secondary cluster — bottom-left, barely visible, adds depth
        to the text column area without competing with readability.
      */}
      <InkPigment
        variant="cluster"
        opacity={0.45}
        style={{ bottom: -40, left: -30, width: 260, height: 230 }}
      />

      {/* Warm ambient glow — left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 10% 55%, rgba(180,100,40,0.055) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-[1fr,auto] gap-16 lg:gap-20"
        >
          {/* Left: text */}
          <div>
            <motion.p variants={fadeUp} className="section-label">About</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-6">
              Engineering software{' '}
              <span style={{ color: 'var(--accent-secondary)' }}>that scales.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I'm a Computer Science undergrad at{' '}
                <span style={{ color: 'var(--text-primary)' }} className="font-medium">IIIT Gwalior</span>, building
                software that spans the full engineering stack — from database design and API
                architecture to React frontends and machine learning pipelines.
              </p>
              <p>
                My work ranges from production systems serving thousands of users to research in
                collaborative filtering and AI-driven applications. I've led engineering teams,
                managed cloud infrastructure, and shipped products under real business constraints.
              </p>
              <p>
                Outside of building software, I'm active in competitive programming — ranked{' '}
                <span style={{ color: 'var(--text-primary)' }} className="font-medium">LeetCode Knight</span> with a peak
                rating of <span style={{ color: 'var(--text-primary)' }} className="font-medium">1973+</span>, and a
                regular participant in algorithmic contests on Codeforces.
              </p>
            </motion.div>

            {/* Domain grid */}
            <motion.div variants={stagger} className="mt-10 grid sm:grid-cols-2 gap-3">
              {domains.map((domain) => (
                <motion.div key={domain.label} variants={fadeUp} className="card-base p-4 card-hover">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-primary)' }} />
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{domain.label}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{domain.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: stats + education */}
          <div className="lg:w-64 space-y-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="card-base p-5 card-hover text-center">
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--accent-primary)' }}>{stat.value}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </motion.div>
            ))}

            <motion.div variants={fadeUp} className="card-base p-5 card-hover" style={{ borderColor: 'rgba(217,160,102,0.22)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ background: 'rgba(217,160,102,0.12)', border: '1px solid rgba(217,160,102,0.22)' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--accent-secondary)' }}>B</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-primary)' }}>Education</span>
              </div>
              <p className="text-sm font-semibold leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>IIIT Gwalior</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>B.Tech Computer Science</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>2023 – 2027 · GPA 8.21</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

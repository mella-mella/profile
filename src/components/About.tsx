import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

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
    <section id="about" className="section-padding bg-bg-secondary relative">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(37,99,235,0.04) 0%, transparent 60%)',
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
              <span className="text-blue-light">that scales.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I'm a Computer Science undergrad at{' '}
                <span className="text-text-primary font-medium">IIIT Gwalior</span>, building
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
                <span className="text-text-primary font-medium">LeetCode Knight</span> with a peak
                rating of <span className="text-text-primary font-medium">1973+</span>, and a
                regular participant in algorithmic contests on Codeforces.
              </p>
            </motion.div>

            {/* Domain grid */}
            <motion.div
              variants={stagger}
              className="mt-10 grid sm:grid-cols-2 gap-3"
            >
              {domains.map((domain) => (
                <motion.div
                  key={domain.label}
                  variants={fadeUp}
                  className="card-base p-4 card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-0.5">{domain.label}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{domain.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: stats + education */}
          <div className="lg:w-64 space-y-4">
            {/* Stats */}
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="card-base p-5 card-hover text-center"
              >
                <p className="text-3xl font-bold text-blue-light mb-1">{stat.value}</p>
                <p className="text-xs text-text-muted font-medium">{stat.label}</p>
              </motion.div>
            ))}

            {/* Education mini card */}
            <motion.div
              variants={fadeUp}
              className="card-base p-5 border-blue-subtle card-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-blue-primary/15 flex items-center justify-center">
                  <span className="text-blue-light text-xs font-bold">B</span>
                </div>
                <span className="text-xs font-semibold text-blue-light uppercase tracking-wide">Education</span>
              </div>
              <p className="text-sm font-semibold text-text-primary leading-snug mb-1">
                IIIT Gwalior
              </p>
              <p className="text-xs text-text-muted">B.Tech Computer Science</p>
              <p className="text-xs text-text-muted mt-1">2023 – 2027 · GPA 8.21</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

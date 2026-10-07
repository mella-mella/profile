import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Users, PenTool, Trophy, ExternalLink } from 'lucide-react';

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
    <section id="leadership" className="section-padding bg-bg-secondary">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Leadership</p>
          <h2 className="section-title">
            Beyond the{' '}
            <span className="text-blue-light">code.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Leadership cards */}
          <div className="space-y-4">
            {leadershipItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="card-base p-5 card-hover flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-blue-light" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-text-primary text-sm">{item.title}</h3>
                    <span className="tag text-[10px] px-2 py-0.5">{item.highlight}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sangillence */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card-base border-blue-subtle p-6 card-hover relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-primary/8 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="section-label !mb-0 !text-[10px]">Founder</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Sangillence
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                Founded Sangillence — building an AI/ML-powered assessment engine for a nationwide
                olympiad designed to evaluate student <span className="text-text-primary font-medium">creativity</span> and{' '}
                <span className="text-text-primary font-medium">emotional intelligence</span> at scale.
              </p>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                The platform combines machine learning with educational assessment frameworks,
                designed to reach students across India through structured olympiad infrastructure.
              </p>
              <a
                href="https://www.sangillence.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-light hover:underline transition-colors"
              >
                Visit Sangillence
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

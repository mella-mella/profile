import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';
import { Award, Trophy, Star, GraduationCap, Medal, Zap, type LucideIcon } from 'lucide-react';
import InkPigment from './InkPigment';

const iconMap: Record<string, LucideIcon> = { Award, Trophy, Star, GraduationCap, Medal, Zap };

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="achievements" className="section-padding relative overflow-hidden" style={{ background: '#11110F' }}>

      {/*
        ── PIGMENT LAYER ──
        corner-bl: large stain at bottom-left, extends below section boundary
        into the next section transition — creates visual continuity.
      */}
      <InkPigment
        variant="corner-bl"
        opacity={0.62}
        style={{ bottom: -70, left: -50, width: 460, height: 420 }}
      />

      {/*
        cluster: scattered drops at top-right, balances the composition
        without dominating the card grid.
      */}
      <InkPigment
        variant="cluster"
        opacity={0.50}
        style={{ top: -10, right: -20, width: 300, height: 260 }}
      />

      {/* Warm ambient glow bottom-right */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 90% 90%, rgba(140,80,30,0.05) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-14">
          <p className="section-label">Achievements</p>
          <h2 className="section-title">
            Recognition &{' '}
            <span style={{ color: 'var(--accent-secondary)' }}>milestones.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, i) => {
            const IconComponent = iconMap[achievement.icon] || Award;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="card-base p-6 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(217,160,102,0.10)', border: '1px solid rgba(217,160,102,0.22)' }}>
                    <IconComponent size={18} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {achievement.title}
                      </h3>
                    </div>
                    {achievement.highlight && (
                      <span className="inline-block text-xs font-semibold mb-2" style={{ color: 'var(--accent-primary)' }}>
                        {achievement.highlight}
                      </span>
                    )}
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {achievement.description}
                    </p>
                    {achievement.detail && (
                      <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                        {achievement.detail}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

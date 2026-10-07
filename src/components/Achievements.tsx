import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';
import { Award, Trophy, Star, GraduationCap, Medal, Zap, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Trophy,
  Star,
  GraduationCap,
  Medal,
  Zap,
};

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="achievements" className="section-padding">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Achievements</p>
          <h2 className="section-title">
            Recognition &{' '}
            <span className="text-blue-light">milestones.</span>
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
                  <div className="w-10 h-10 rounded-xl bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={18} className="text-blue-light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-text-primary text-sm leading-snug">
                        {achievement.title}
                      </h3>
                    </div>
                    {achievement.highlight && (
                      <span className="inline-block text-xs font-semibold text-blue-light mb-2">
                        {achievement.highlight}
                      </span>
                    )}
                    <p className="text-xs text-text-muted leading-relaxed">
                      {achievement.description}
                    </p>
                    {achievement.detail && (
                      <p className="text-xs text-text-muted mt-1.5 font-medium">
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

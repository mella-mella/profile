import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { Code2, Layers, Database, Cloud, Brain, Cpu, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Database,
  Cloud,
  Brain,
  Cpu,
};

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="section-padding">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">
            The stack I{' '}
            <span className="text-blue-light">work with.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => {
            const IconComponent = iconMap[group.icon] || Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="card-base p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center">
                    <IconComponent size={16} className="text-blue-light" />
                  </div>
                  <h3 className="font-semibold text-text-primary">{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] text-text-secondary border border-white/[0.07] hover:border-blue-primary/25 hover:text-text-primary transition-colors duration-150"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

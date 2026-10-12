import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { Code2, Layers, Database, Cloud, Brain, Cpu, type LucideIcon } from 'lucide-react';
import InkPigment from './InkPigment';

const iconMap: Record<string, LucideIcon> = { Code2, Layers, Database, Cloud, Brain, Cpu };

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" style={{ background: '#11110F' }}>

      {/*
        ── PIGMENT LAYER ──
        Central radial wash fills the middle of the grid with diffuse warmth —
        large enough to cover the full card grid, low enough opacity to keep
        individual skill tags fully readable.
      */}
      <InkPigment
        variant="wash-radial"
        opacity={0.55}
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 760, height: 520,
        }}
      />

      {/*
        corner-bl: bottom-left accent, partially outside boundary,
        gives the section a grounded, weighted feel.
      */}
      <InkPigment
        variant="corner-bl"
        opacity={0.48}
        style={{ bottom: -50, left: -40, width: 360, height: 320 }}
      />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-14">
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">
            The stack I{' '}
            <span style={{ color: 'var(--accent-secondary)' }}>work with.</span>
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
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(217,160,102,0.10)', border: '1px solid rgba(217,160,102,0.20)' }}>
                    <IconComponent size={16} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="text-xs px-3 py-1.5 rounded-lg transition-colors duration-150"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.07)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,160,102,0.28)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                      }}>
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

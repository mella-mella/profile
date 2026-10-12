import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import InkPigment from './InkPigment';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section-padding relative overflow-hidden" style={{ background: '#11110F' }}>

      {/*
        ── PIGMENT LAYER ──
        Tall left-edge wash sits alongside the timeline line,
        extending from top of section to bottom — like ink running down the spine.
        Offset left so it partially clips outside the viewport.
      */}
      <InkPigment
        variant="edge-left"
        opacity={0.68}
        style={{ top: 0, left: -30, width: 200, height: '100%', minHeight: 600 }}
      />

      {/*
        Top-right cluster — gives the header area some ambient pigment
        without competing with the card content below.
      */}
      <InkPigment
        variant="cluster"
        opacity={0.42}
        style={{ top: -20, right: -20, width: 280, height: 240 }}
      />

      {/* Warm ambient gradient — right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 45% 55% at 95% 30%, rgba(160,90,35,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            Where I've{' '}
            <span style={{ color: 'var(--accent-secondary)' }}>shipped.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px timeline-line hidden md:block" aria-hidden="true" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="md:pl-12 relative"
              >
                {/* Timeline dot — copper */}
                <div
                  className="hidden md:flex absolute left-0 top-5 w-[23px] h-[23px] rounded-full items-center justify-center"
                  style={{ border: '2px solid var(--accent-muted)', background: '#11110F' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
                </div>

                <div className="card-base p-6 card-hover group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-lg leading-snug" style={{ color: 'var(--text-primary)' }}>{exp.company}</h3>
                        {exp.highlight && <span className="tag">{exp.highlight}</span>}
                      </div>
                      <p className="font-medium text-sm" style={{ color: 'var(--accent-primary)' }}>{exp.role}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <Calendar size={12} /><span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <MapPin size={12} /><span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(217,160,102,0.55)' }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {(exp.link || exp.certificate) && (
                    <div className="flex gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs transition-colors"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                          <ExternalLink size={12} />
                          {exp.id === 'morgan' ? 'Visit Platform' : 'Reference'}
                        </a>
                      )}
                      {exp.certificate && (
                        <a href={exp.certificate} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs transition-colors"
                          style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                          <ExternalLink size={12} />Certificate
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

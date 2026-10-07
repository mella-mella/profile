import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section-padding">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            Where I've{' '}
            <span className="text-blue-light">shipped.</span>
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
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-5 w-[23px] h-[23px] rounded-full border-2 border-blue-primary bg-bg-primary items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-primary" />
                </div>

                <div className="card-base p-6 card-hover group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-text-primary text-lg leading-snug">
                          {exp.company}
                        </h3>
                        {exp.highlight && (
                          <span className="tag">{exp.highlight}</span>
                        )}
                      </div>
                      <p className="text-blue-light font-medium text-sm">{exp.role}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1.5 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-text-muted text-xs">
                        <Calendar size={12} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-muted text-xs">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-blue-primary/60 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {(exp.link || exp.certificate) && (
                    <div className="flex gap-3 mt-5 pt-4 border-t border-white/[0.05]">
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-blue-light transition-colors"
                        >
                          <ExternalLink size={12} />
                          {exp.id === 'morgan' ? 'Visit Platform' : 'Reference'}
                        </a>
                      )}
                      {exp.certificate && (
                        <a
                          href={exp.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-blue-light transition-colors"
                        >
                          <ExternalLink size={12} />
                          Certificate
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

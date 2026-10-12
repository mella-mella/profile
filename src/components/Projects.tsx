import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import InkPigment from './InkPigment';

const categoryLabels: Record<Project['category'], string> = {
  systems: 'Systems', fullstack: 'Full-Stack', 'ai-ml': 'AI / ML', research: 'Research',
};

const categoryColors: Record<Project['category'], string> = {
  systems:   'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  fullstack: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
  'ai-ml':   'text-rose-300 bg-rose-400/10 border-rose-400/20',
  research:  'text-orange-300 bg-orange-400/10 border-orange-400/20',
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto card-base shadow-2xl shadow-black/60"
        style={{ borderColor: 'rgba(217,160,102,0.25)' }}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 p-6 flex items-start justify-between gap-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'var(--bg-card)' }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${categoryColors[project.category]}`}>
                {categoryLabels[project.category]}
              </span>
            </div>
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors flex-shrink-0"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="Close"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-6">
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.longDescription}</p>

          {project.metrics && project.metrics.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Key Metrics</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {project.metrics.map((metric) => (
                  <div key={metric} className="rounded-lg p-3 text-center"
                    style={{ background: 'rgba(217,160,102,0.07)', border: '1px solid rgba(217,160,102,0.18)' }}>
                    <p className="text-sm font-semibold" style={{ color: 'var(--accent-secondary)' }}>{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
            </div>
          </div>

          {(project.github || project.liveDemo) && (
            <div className="flex gap-3 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2">
                  <Github size={15} /> View Source
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [selected, setSelected] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: (index % 3) * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`card-base group cursor-pointer card-hover`}
        style={project.featured ? { boxShadow: '0 0 0 1px rgba(217,160,102,0.14)' } : {}}
        onClick={() => setSelected(true)}
        role="button" tabIndex={0}
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => e.key === 'Enter' && setSelected(true)}
      >
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${categoryColors[project.category]}`}>
                {categoryLabels[project.category]}
              </span>
              {project.featured && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-md"
                  style={{ background: 'rgba(217,160,102,0.12)', color: 'var(--accent-secondary)', border: '1px solid rgba(217,160,102,0.24)' }}>
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} aria-label="GitHub"
                  className="p-1.5 rounded-md transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <Github size={15} />
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} aria-label="Live Demo"
                  className="p-1.5 rounded-md transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
          <h3 className="text-base font-bold mb-2 transition-colors duration-200" style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="px-6 py-3 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {project.metrics.slice(0, 2).map((metric) => (
              <span key={metric} className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>↑ {metric}</span>
            ))}
          </div>
        )}

        <div className="px-6 py-4 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.07)' }}>
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="px-6 pb-4 flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>View details</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </motion.article>

      <AnimatePresence>
        {selected && <ProjectModal project={project} onClose={() => setSelected(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section-padding relative overflow-hidden" style={{ background: '#161512' }}>

      {/*
        ── PIGMENT LAYER ──
        corner-tl: large sweep entering top-left, sits behind the heading area.
        Sized large enough to feel architectural, not decorative-stamp.
      */}
      <InkPigment
        variant="corner-tl"
        opacity={0.65}
        style={{ top: -50, left: -60, width: 500, height: 440 }}
      />

      {/*
        corner-br: opposite corner, balances the composition.
        Partially clips at the bottom edge of the section.
      */}
      <InkPigment
        variant="corner-br"
        opacity={0.55}
        style={{ bottom: -60, right: -50, width: 420, height: 380 }}
      />

      {/* Warm ambient center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(140,80,30,0.04) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="section-container relative z-10">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-14">
          <p className="section-label">Projects</p>
          <h2 className="section-title">
            What I've{' '}
            <span style={{ color: 'var(--accent-secondary)' }}>built.</span>
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Production systems, developer tools, AI applications, and research implementations.
            Click any card to explore the details.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

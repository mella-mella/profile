import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react';

const categoryLabels: Record<Project['category'], string> = {
  systems: 'Systems',
  fullstack: 'Full-Stack',
  'ai-ml': 'AI / ML',
  research: 'Research',
};

const categoryColors: Record<Project['category'], string> = {
  systems: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  fullstack: 'text-blue-light bg-blue-primary/10 border-blue-primary/20',
  'ai-ml': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  research: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto card-base border-blue-subtle shadow-2xl shadow-black/50"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-bg-card border-b border-white/[0.06] p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${categoryColors[project.category]}`}>
                {categoryLabels[project.category]}
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-text-secondary leading-relaxed">{project.longDescription}</p>

          {project.metrics && project.metrics.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Key Metrics</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {project.metrics.map((metric) => (
                  <div key={metric} className="bg-blue-primary/5 border border-blue-primary/15 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-blue-light">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>

          {(project.github || project.liveDemo) && (
            <div className="flex gap-3 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2">
                  <Github size={15} />
                  View Source
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                  <ExternalLink size={15} />
                  Live Demo
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
        className={`card-base group cursor-pointer transition-all duration-300
          hover:border-blue-primary/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-primary/8
          ${project.featured ? 'ring-1 ring-blue-primary/10' : ''}`}
        onClick={() => setSelected(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => e.key === 'Enter' && setSelected(true)}
      >
        {/* Card header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${categoryColors[project.category]}`}>
                {categoryLabels[project.category]}
              </span>
              {project.featured && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-primary/10 text-blue-light border border-blue-primary/20">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub"
                  className="p-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-white/5 transition-colors"
                >
                  <Github size={15} />
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Live Demo"
                  className="p-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-white/5 transition-colors"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-blue-light transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">{project.description}</p>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="px-6 py-3 border-t border-white/[0.04] flex flex-wrap gap-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <span key={metric} className="text-xs text-blue-light font-medium">
                ↑ {metric}
              </span>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="px-6 py-4 border-t border-white/[0.04] flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-text-muted border border-white/[0.06]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-text-muted border border-white/[0.06]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Bottom arrow */}
        <div className="px-6 pb-4 flex items-center gap-1 text-xs text-text-muted group-hover:text-blue-light transition-colors">
          <span>View details</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </motion.article>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={project} onClose={() => setSelected(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section-padding bg-bg-secondary">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">
            What I've{' '}
            <span className="text-blue-light">built.</span>
          </h2>
          <p className="mt-3 text-text-muted max-w-xl leading-relaxed">
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

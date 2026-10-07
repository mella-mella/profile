import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-bg-primary">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: brand */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-blue-primary flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="font-semibold text-text-primary text-sm">Mella Melissa</span>
            </div>
            <p className="text-xs text-text-muted">Software Developer · Full-Stack · AI/ML · Systems</p>
          </div>

          {/* Center: links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/sahu-sumit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/sahu-sumit13/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:hr.snowflake.melissa@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-white/[0.04] transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Right: back to top + copyright */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Mella Melissa
            </p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg border border-white/[0.08] text-text-muted hover:text-text-secondary hover:border-blue-primary/30 transition-all duration-200"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

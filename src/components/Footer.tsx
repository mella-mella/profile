import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(232,199,154,0.10)',
        background: 'var(--bg-primary)',
      }}
    >
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs"
                style={{
                  background: 'var(--accent-primary)',
                  color: '#11110F',
                }}
              >
                M
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Mella Melissa
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Software Developer · Full-Stack · AI/ML · Systems
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {[
              { href: 'https://github.com/sahu-sumit', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/sahu-sumit13/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:hr.snowflake.melissa@gmail.com', icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright + back to top */}
          <div className="flex items-center gap-4">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Mella Melissa
            </p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                border: '1px solid rgba(232,199,154,0.14)',
                color: 'var(--text-muted)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,160,102,0.40)';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,199,154,0.14)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              }}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60);
  });

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/90 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="section-container flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
            aria-label="Mella Melissa - Home"
          >
            <img 
              src="/melissa1.jpeg" 
              alt="Mella Melissa Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold text-text-primary tracking-tight hidden sm:block">
              Mella Melissa
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-lg bg-white/[0.05]"
                        layoutId="nav-indicator"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:hr.snowflake.melissa@gmail.com"
              className="btn-primary text-sm py-2 px-4"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-4 right-4 z-50 rounded-2xl bg-bg-card border border-white/[0.08] shadow-2xl shadow-black/40 p-4 md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.04] rounded-lg transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <a
                  href="mailto:hr.snowflake.melissa@gmail.com"
                  className="btn-primary w-full justify-center text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

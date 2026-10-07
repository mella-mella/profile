import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/sahu-sumit',
    description: 'sahu-sumit',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sahu-sumit13/',
    description: 'sahu-sumit13',
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
    label: 'LeetCode',
    href: 'https://leetcode.com/u/sahu_SuMiT/',
    description: 'sahu_SuMiT',
  },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const email = 'hr.snowflake.melissa@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)',
          height: '400px',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="section-label">Contact</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-tight">
            Let's build something{' '}
            <span className="text-blue-light">meaningful.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed mb-10 max-w-lg mx-auto">
            Open to software engineering opportunities, technical collaborations, and interesting
            problems. Whether it's a full-stack project, a backend system, or a startup idea —
            let's talk.
          </p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card-base p-6 mb-8 border-blue-subtle"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center">
                  <Mail size={18} className="text-blue-light" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-text-muted mb-0.5">Email</p>
                  <p className="text-sm font-medium text-text-primary break-all">{email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyEmail}
                  className="btn-outline text-xs py-2 px-3"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <a
                  href={`mailto:${email}`}
                  className="btn-primary text-xs py-2 px-3"
                >
                  <Mail size={13} />
                  Email Me
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-3 flex-wrap"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base px-5 py-3 flex items-center gap-2.5 card-hover border-white/[0.06]"
              >
                <social.icon size={18} className="text-text-muted" />
                <div className="text-left">
                  <p className="text-xs font-medium text-text-secondary">{social.label}</p>
                  <p className="text-[10px] text-text-muted">{social.description}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

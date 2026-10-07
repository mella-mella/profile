import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const profiles = [
  {
    platform: 'LeetCode',
    handle: 'sahu_SuMiT',
    url: 'https://leetcode.com/u/sahu_SuMiT/',
    badge: 'Knight',
    stats: [
      { label: 'Peak Rating', value: '1973+' },
      { label: 'Problems Solved', value: '700+' },
      { label: 'Rank', value: 'Knight' },
    ],
    focus: ['Dynamic Programming', 'Graph Algorithms', 'Data Structures', 'Greedy Algorithms'],
    color: 'from-yellow-400/10 to-amber-600/5',
    accent: 'text-yellow-400',
    border: 'border-yellow-400/15',
    badgeStyle: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-400">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    platform: 'Codeforces',
    handle: 'sumit1304',
    url: 'https://codeforces.com/profile/sumit1304',
    badge: 'Specialist',
    stats: [
      { label: 'Peak Rating', value: '1369+' },
      { label: 'Focus', value: 'Algorithms' },
      { label: 'Style', value: 'Timed Contests' },
    ],
    focus: ['Algorithms', 'Implementation', 'Mathematical Problem Solving', 'Combinatorics'],
    color: 'from-blue-400/10 to-blue-600/5',
    accent: 'text-blue-light',
    border: 'border-blue-primary/15',
    badgeStyle: 'bg-blue-primary/10 text-blue-light border-blue-primary/20',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-light">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V10.5c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    ),
  },
  {
    platform: 'GitHub',
    handle: 'sahu-sumit',
    url: 'https://github.com/sahu-sumit',
    badge: 'Active',
    stats: [
      { label: 'Contributions', value: '700+' },
      { label: 'Activity', value: 'Daily' },
      { label: 'Focus', value: 'Open Source' },
    ],
    focus: ['Open-source contributions', 'Collaborative development', 'Version control', 'CI/CD pipelines'],
    color: 'from-slate-400/10 to-slate-600/5',
    accent: 'text-slate-300',
    border: 'border-slate-500/15',
    badgeStyle: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-300">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function CodingProfiles() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="coding" className="section-padding bg-bg-secondary">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">Coding Profiles</p>
          <h2 className="section-title">
            Competing &{' '}
            <span className="text-blue-light">contributing.</span>
          </h2>
          <p className="mt-3 text-text-muted max-w-xl">
            700+ DSA problems, LeetCode Knight rank, and consistent open-source activity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`card-base ${profile.border} card-hover p-6 relative overflow-hidden`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${profile.color} pointer-events-none`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {profile.logo}
                    <div>
                      <p className="font-bold text-text-primary">{profile.platform}</p>
                      <p className="text-xs text-text-muted">@{profile.handle}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${profile.badgeStyle}`}>
                    {profile.badge}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {profile.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className={`text-lg font-bold ${profile.accent}`}>{stat.value}</p>
                      <p className="text-[10px] text-text-muted leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Focus areas */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {profile.focus.map((area) => (
                    <span key={area} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-text-muted border border-white/[0.06]">
                      {area}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${profile.accent} hover:underline transition-colors`}
                >
                  View Profile
                  <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

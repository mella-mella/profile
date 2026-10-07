export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics?: string[];
  github?: string;
  liveDemo?: string;
  category: 'systems' | 'fullstack' | 'ai-ml' | 'research';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'web-crawler',
    title: 'Golang Web Crawler Engine',
    description: 'A high-throughput event-driven web crawler built in Go with concurrent workers and real-time observability.',
    longDescription: 'Engineered a high-throughput event-driven web crawler in Go, combining concurrent fasthttp workers, persistent Pebble DB frontier queues, and rate-limited crawling for scalable URL processing. Built an end-to-end data and observability pipeline using Cloudflare R2, PostgreSQL, Prometheus, and Grafana.',
    technologies: ['Go', 'PostgreSQL', 'Pebble DB', 'Prometheus', 'Docker', 'Grafana', 'Cloudflare R2'],
    metrics: ['5000+ requests/second', 'Bloom Filter deduplication', 'LSM-tree storage'],
    github: 'https://github.com/sahu-SuMiT/web-crawler-engine',
    liveDemo: 'https://web-crawler-engine-30sr.onrender.com/',
    category: 'systems',
    featured: true,
  },
  {
    id: 'universal-clipboard',
    title: 'Universal Real-Time Clipboard',
    description: 'Cross-device clipboard synchronization with real-time Firestore sync and authenticated per-user data isolation.',
    longDescription: 'Designed and deployed a cross-device clipboard synchronization platform with Google Authentication. Implemented persistent storage and authenticated per-user data isolation. Engineered real-time synchronization using Firestore snapshot listeners and debounced writes.',
    technologies: ['JavaScript', 'Firebase', 'Cloud Firestore', 'Tailwind CSS'],
    metrics: ['Sub-100ms sync latency', '65% reduction in DB operations'],
    github: 'https://github.com/sahu-sumit/universalclipboard',
    liveDemo: 'https://tinyurl.com/uclipboard',
    category: 'fullstack',
  },
  {
    id: 'devpulse',
    title: 'DevPulse — Developer Profile Tracker',
    description: 'Full-stack engineering productivity dashboard tracking DORA metrics across 40,000+ developer profiles.',
    longDescription: 'Engineered a full-stack engineering productivity dashboard to track DORA metrics. Built a Node.js/Express backend with MongoDB aggregation pipelines for rapid paginated data retrieval. Architected a scalable Faker.js data-generation engine to synthesize millions of workflow events across 40,000+ developer profiles. Implemented dynamic Recharts visualizations and an algorithmic coaching engine.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'Vite'],
    metrics: ['40,000+ developer profiles', 'DORA metrics tracking', 'Algorithmic coaching'],
    github: 'https://github.com/sahu-SuMiT/DevPulse',
    liveDemo: 'https://tinyurl.com/devprofiles',
    category: 'fullstack',
    featured: true,
  },
  {
    id: 'e-nhsm',
    title: 'Enhanced Heuristic Similarity Measure',
    description: 'Research-grade collaborative filtering similarity measure evaluated across MovieLens and Netflix datasets.',
    longDescription: 'Developed e-NHSM, a collaborative-filtering similarity measure modeling user-specific rating tendencies. Evaluated the method across MovieLens and Netflix datasets. Benchmarked against established similarity measures using MAE, RMSE, Recall, and statistical significance testing.',
    technologies: ['Python', 'Machine Learning', 'Recommender Systems', 'NumPy', 'Pandas'],
    metrics: ['1% RMSE reduction', '15% recall improvement', 'MovieLens & Netflix datasets'],
    liveDemo: 'https://tinyurl.com/NewSimilarityMeasure',
    category: 'research',
  },
  {
    id: 'cloudspend',
    title: 'CloudSpend — Cloud Cost Optimizer',
    description: 'AI-powered cloud billing analysis with RAG assistant, anomaly detection, and automated rightsizing suggestions.',
    longDescription: 'AI-powered cloud billing analysis platform with automated rightsizing suggestions, anomaly detection, and a RAG assistant for context-aware cloud configuration queries using vector databases.',
    technologies: ['MERN', 'AWS', 'Docker', 'LangChain', 'RAG', 'Vector DBs'],
    metrics: ['Automated rightsizing', 'Anomaly detection', 'RAG-powered assistant'],
    github: 'https://github.com/sahu-SuMiT/CloudSpend',
    category: 'ai-ml',
    featured: true,
  },
  {
    id: 'rojgar-setu',
    title: 'Rojgar Setu — Employment Platform',
    description: 'Full-stack employment platform serving 1000+ students with dedicated Admin, Employer, and Candidate dashboards.',
    longDescription: 'Full-stack employment platform used by 1000+ students. Dedicated dashboards for Admin, Employers, and Candidates. Improved frontend rendering speed by 90% through SSR, caching, and optimized API responses.',
    technologies: ['MERN', 'Redux', 'JWT', 'SSR', 'Oracle DB'],
    metrics: ['1000+ active students', '90% faster rendering', 'Role-based dashboards'],
    github: 'https://github.com/sahu-sumit/rojgarsetu',
    category: 'fullstack',
  },
  {
    id: 'nextmeet',
    title: 'NextMeet — Video Conferencing',
    description: 'Real-time video conferencing platform using WebRTC and Socket.io with dynamic room management.',
    longDescription: 'Built a real-time video conferencing platform using WebRTC. Implemented Socket.io signaling for ICE negotiation, instant audio/video controls, and dynamic room management. Improved connection stability by 35%.',
    technologies: ['React', 'Node.js', 'WebRTC', 'Socket.io'],
    metrics: ['35% better connection stability', 'Real-time signaling', 'Dynamic rooms'],
    github: 'https://github.com/sahu-sumit/nextmeet',
    category: 'fullstack',
  },
];

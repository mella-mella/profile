export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  link?: string;
  certificate?: string;
  type: 'internship' | 'scholarship' | 'research';
  highlight?: string;
}

export const experiences: Experience[] = [
  {
    id: 'amazon-mlss',
    company: 'Amazon Machine Learning Summer School \'26',
    role: 'Machine Learning Summer School Scholar',
    duration: 'July 2026',
    location: 'Remote',
    description: [
      'Selected from 5000+ applicants nationwide for an intensive machine learning program led by Amazon engineering and research leaders.',
      'Covered advanced concepts spanning supervised learning, dimensionality reduction, causal inference, recommendation systems, and scalable ML system design.',
    ],
    link: 'https://lnkd.in/p/gfW66icE',
    type: 'scholarship',
    highlight: 'Top 5000+ nationwide',
  },
  {
    id: 'morgan',
    company: 'Morgan Soft Innovations',
    role: 'Software Developer Intern',
    duration: 'May 2026 – July 2026',
    location: 'Gwalior, India',
    description: [
      'Architected and deployed a production-ready job platform serving 10,000+ users at morganjob.com.',
      'Integrated automated resume parsing, profile generation, search functionality, and recruiter-facing workflows.',
    ],
    link: 'https://morganjob.com',
    certificate: 'https://tinyurl.com/MorganInternshipCertificate',
    type: 'internship',
    highlight: '10,000+ users',
  },
  {
    id: 'kotak',
    company: 'Kotak Life Insurance',
    role: 'Technical Apprentice',
    duration: 'Dec 2025 – May 2026',
    location: 'Gwalior, India',
    description: [
      'Spearheaded digitization of legacy KYC workflows, streamlining customer-data processing within financial compliance requirements.',
      'Reduced manual processing time by 60% through process automation and technical integration.',
    ],
    link: 'https://tinyurl.com/KotakRelievingLetter',
    type: 'internship',
    highlight: '60% time reduction',
  },
  {
    id: 'techori',
    company: 'Techori',
    role: 'Backend Intern — Team Lead',
    duration: 'May 2025 – July 2025',
    location: 'Remote',
    description: [
      'Directed multiple cross-functional teams delivering client projects using Next.js and MERN stack, overseeing the full SDLC from architectural design to production.',
      'Implemented RBAC using JWT with permission tiers for Admin, HR, and User roles. Architected hybrid MongoDB + Firebase solutions with real-time data synchronization.',
      'Engineered AI-driven modules and optimized Next.js performance using SSR. Orchestrated deployment on AWS with CI/CD workflows, achieving 99.9% uptime.',
    ],
    type: 'internship',
    highlight: '99.9% uptime',
  },
  {
    id: 'bluestock',
    company: 'Bluestock Fintech',
    role: 'Software Development Intern — Team Lead',
    duration: 'Feb 2025 – April 2025',
    location: 'Remote',
    description: [
      'Led a team of 10+ developers to deliver a production-ready IPO Web Application using MERN stack.',
      'Engineered scalable Node.js/Express APIs with secure authentication and optimized routing for high-traffic financial modules.',
      'Architected MongoDB schemas with indexing for large-scale financial datasets. Reduced error rates by 30% through systematic debugging and API testing using Postman.',
    ],
    type: 'internship',
    highlight: 'Led 10+ developers',
  },
];

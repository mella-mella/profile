export interface Achievement {
  title: string;
  description: string;
  detail?: string;
  icon: string;
  highlight?: string;
}

export const achievements: Achievement[] = [
  {
    title: 'Amazon ML Summer School 2026',
    description: 'Selected from 5000+ applicants nationwide for Amazon\'s intensive ML program led by engineering and research leaders.',
    highlight: '5000+ applicant pool',
    icon: 'Award',
  },
  {
    title: 'LeetCode Knight',
    description: 'Achieved Knight rank with a peak rating of 1973+, solving 700+ DSA problems across Dynamic Programming, Graph Algorithms, and Greedy strategies.',
    highlight: '1973+ Peak Rating',
    icon: 'Trophy',
  },
  {
    title: 'Reliance Foundation Scholarship',
    description: 'National undergraduate scholarship recipient selected for academic excellence and technical aptitude.',
    detail: '2023 – 2027',
    icon: 'Star',
  },
  {
    title: 'Merit Cum Means Scholarship',
    description: 'Recognized for sustained academic performance and merit by IIIT Gwalior.',
    detail: '2024 – 2027',
    icon: 'GraduationCap',
  },
  {
    title: 'Robo Race Runner-up',
    description: '2nd place at Infotsav — ABV-IIITM Gwalior, competing among national-level engineering teams.',
    highlight: '2nd Place',
    icon: 'Medal',
  },
  {
    title: 'Hackathon Qualifier',
    description: 'Participated and qualified in Smart India Hackathon, Adobe Hackathon, and Algo-University competitions.',
    icon: 'Zap',
  },
];

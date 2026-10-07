export interface SkillGroup {
  category: string;
  skills: string[];
  icon: string;
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    icon: 'Code2',
    skills: ['C/C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Go'],
  },
  {
    category: 'Frameworks',
    icon: 'Layers',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Flutter', 'React Native', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    category: 'Databases',
    icon: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Oracle DB'],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: ['AWS (EC2, S3, Lambda)', 'Docker', 'Vercel', 'Git/GitHub', 'Prometheus', 'Grafana', 'Cloudflare R2'],
  },
  {
    category: 'GenAI & ML',
    icon: 'Brain',
    skills: ['LangChain', 'RAG', 'OpenAI API', 'Vector DBs', 'Prompt Engineering', 'Collaborative Filtering'],
  },
  {
    category: 'Core CS',
    icon: 'Cpu',
    skills: ['Data Structures', 'Algorithms', 'System Design', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Low Level Design'],
  },
];

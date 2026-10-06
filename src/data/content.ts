// All portfolio content lives here so updates never touch layout code.

export const profile = {
  name: 'Abhishek',
  role: 'Full-stack + AI Engineer',
  tagline:
    'I build production web, mobile and AI systems — from a sign language app used by thousands to legal research AI over 42K+ Supreme Court judgments.',
  location: 'Chennai, India',
  email: 'abhishekbidhan11@gmail.com',
  resumeUrl: '/resume.pdf',
  links: {
    github: 'https://github.com/Sparkonix11',
    linkedin: 'https://www.linkedin.com/in/abhishek1102',
    leetcode: 'https://leetcode.com/u/Sparkonix',
  },
};

export const stats = [
  { value: '4K+', label: 'users on SignSetu Connect' },
  { value: '42K+', label: 'Supreme Court judgments indexed' },
  { value: '1.4M+', label: 'embedded chunks in production' },
  { value: 'Forbes', label: 'Accessibility 200 (2026)' },
];

export interface Role {
  company: string;
  companyNote?: string;
  url?: string;
  urlLabel?: string;
  title: string;
  period: string;
  location: string;
  points: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    company: 'SignSetu',
    url: 'https://play.google.com/store/apps/details?id=com.signsetu.connect',
    urlLabel: 'Play Store',
    title: 'Full Stack Developer',
    period: 'Mar 2026 — Present',
    location: 'Chennai, India',
    points: [
      'Built the Connect app (Expo), which reached 4K+ users and 75K+ game plays within four months of launch.',
      'Built service layers, Zod validation, Redis rate limits and Razorpay webhooks in the company Turborepo monorepo (Next.js web, API, Expo mobile).',
      'Merged web and mobile accounts by migrating 100K+ records across MongoDB and Postgres, with dry runs, backups and rollback.',
      'Upgraded to Expo SDK 57 (Hermes), cutting p90 time-to-first-render by 25%+ on Android, measured with EAS Observe.',
      'Added offline media caching, over-the-air updates and push notifications reaching 1K+ devices.',
    ],
    stack: ['Next.js', 'Expo', 'TypeScript', 'MongoDB', 'Postgres', 'Supabase', 'Redis'],
  },
  {
    company: 'SignSetu',
    title: 'Full Stack Developer Intern',
    period: 'May 2025 — Feb 2026',
    location: 'Chennai, India',
    points: [
      'Built 8+ sign language games played 90K+ times across web and mobile.',
      'Developed the admin CMS used to publish 500+ lessons, 1.5K+ vocab words and 8K+ media files.',
      'Wrote 25+ Playwright E2E tests covering login, lessons, games and admin CRUD, run in GitHub Actions.',
    ],
    stack: ['React 19', 'Next.js', 'MongoDB', 'Playwright'],
  },
  {
    company: 'GyanAlign',
    url: 'https://gyanalign.com',
    urlLabel: 'gyanalign.com',
    title: 'Software Development Engineer (Part-time)',
    period: 'Jun 2025 — Feb 2026',
    location: 'Remote',
    points: [
      'Created a legal research AI over 42K+ Supreme Court judgments (1950–2026) and Indian statutes.',
      'Indexed 1.4M+ Section/Article chunks in pgvector as the source of truth, batch-syncing to Pinecone for retrieval.',
      'Designed an 18-node LangGraph agent with authority reranking, citation checks and Tavily web fallback.',
      'Evaluated it on 749 shadow runs of production queries: 98.9% completed, averaging $0.015 per answer.',
      'Implemented Razorpay subscriptions with AI usage limits, student–recruiter matching and 7 user roles.',
    ],
    stack: ['LangGraph', 'pgvector', 'Pinecone', 'Next.js', 'Prisma', 'tRPC'],
  },
  {
    company: 'Amorcer',
    companyNote: 'Acquired by 3Y Health',
    url: 'https://amorcer.com',
    urlLabel: 'amorcer.com',
    title: 'Lead Software Engineer (Part-time)',
    period: 'Jun 2025 — Dec 2025',
    location: 'Remote, US',
    points: [
      'Owned the site generator, AI logo generation and appointment booking for a platform later acquired by 3Y Health.',
      'Automated clinic website launch: generate a Next.js site, push it to GitHub and deploy on Vercel.',
      'Used Pinecone search over 70+ UI components to pick the right sections for each site.',
    ],
    stack: ['Next.js', 'Pinecone', 'GitHub API', 'Vercel API', 'OpenAI'],
  },
];

export interface Project {
  name: string;
  summary: string;
  points: string[];
  stack: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    name: 'Research Assistant Agent',
    summary: 'An agentic research workspace that turns a research goal into a grounded plan.',
    points: [
      'LangGraph agent that plans, drafts and critiques research roadmaps in up to 4 rounds.',
      'GraphRAG: LLM-extracted entities and relations; multi-hop traversal adds linked passages as evidence.',
      'Postgres job queue, sandboxed code runs (E2B), MCP tools and live co-editing (Yjs).',
    ],
    stack: ['FastAPI', 'Next.js', 'LangGraph', 'pgvector', 'MCP', 'Yjs', 'gRPC', 'Docker'],
    github: 'https://github.com/Sparkonix11/Research-Assistant-Agent',
  },
  {
    name: 'Regional Dialect Synthesis Pipeline',
    summary: 'Hindi → Haryanvi translation and speech for an under-resourced dialect.',
    points: [
      'Fine-tuned LLaMA 3.1 8B and Gemma 4 with QLoRA on 5,594 Hindi–Haryanvi pairs.',
      'Fine-tuned XTTS v2 for Haryanvi speech; served the pipeline with FastAPI on Modal.',
    ],
    stack: ['PyTorch', 'Transformers', 'QLoRA', 'XTTS', 'FastAPI', 'Modal'],
    github: 'https://github.com/Sparkonix11/Regional-Dialect-Synthesis-Pipeline',
  },
  {
    name: 'Real-Time Connect Four',
    summary: 'Multiplayer Connect Four with matchmaking, a bot opponent and live analytics.',
    points: [
      'Go server over WebSockets with matchmaking, a 10s bot fallback and 30s reconnects.',
      'Game events streamed to Kafka; leaderboard and history stored in PostgreSQL.',
    ],
    stack: ['Go', 'WebSockets', 'Kafka', 'PostgreSQL', 'React', 'Docker'],
    github: 'https://github.com/Sparkonix11/connect-four',
  },
  {
    name: 'ExamPrep',
    summary: 'An IIT JAM Physics prep app with PYQs, AI tutoring, mocks and spaced repetition.',
    points: [
      'Automated PYQ import with provenance, FSRS review queue and an automatic mistake notebook.',
      'AI tutoring and OCR, Google Calendar/Tasks plan sync, and a Playwright regression suite.',
    ],
    stack: ['Next.js', 'Drizzle', 'Neon Postgres', 'NextAuth', 'Cloudflare R2', 'OpenAI'],
    live: 'https://exam-prep-pearl.vercel.app',
  },
];

export const achievements = [
  {
    title: 'Forbes Accessibility 200 (2026)',
    detail: 'SignSetu, where I am a core developer, was featured for its work in inclusive education. It was also a Purple Fest 2025 Pitch Fest winner.',
  },
  {
    title: 'Google Code to Learn — Finalist',
    detail: 'One of 25 students selected nationwide.',
  },
  {
    title: 'LeetCode Knight',
    detail: 'Top 5.8% globally with a peak rating of 1854.',
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'C++', 'Java', 'SQL'] },
  { group: 'Web + Mobile', items: ['React', 'Next.js', 'React Native (Expo)', 'Node.js', 'FastAPI', 'tRPC', 'Tailwind CSS'] },
  { group: 'AI', items: ['LangGraph', 'LangChain', 'RAG / GraphRAG', 'PyTorch', 'Transformers', 'QLoRA', 'MCP'] },
  { group: 'Data + Cloud', items: ['PostgreSQL', 'pgvector', 'MongoDB', 'Redis', 'Pinecone', 'Kafka', 'AWS', 'GCP', 'Docker', 'Vercel'] },
];

// Early student projects, shown with affection in the Recycle Bin.
export const oldProjects = [
  { name: 'Knowtopia', year: '2025', note: 'Vue + Flask learning platform', url: 'https://github.com/Sparkonix11/Knowtopia' },
  { name: 'SkillPort', year: '2024', note: 'MERN skill marketplace with Razorpay', url: 'https://github.com/Sparkonix11/SkillPort' },
  { name: 'Kitaab', year: '2024', note: 'Vue + Flask online library', url: 'https://github.com/Sparkonix11/Kitaab' },
  { name: 'LyricMatch', year: '2025', note: 'Find songs from a line of lyrics', url: 'https://github.com/Sparkonix11/LyricMatch' },
  { name: 'CrimeCast', year: '2024', note: 'Forecasting crime categories with ML', url: 'https://github.com/Sparkonix11/CrimeCast-Forecasting-Crime-Categories' },
  { name: 'todo-app-final-FINAL-v3', year: '2022', note: 'Every developer has one', url: '' },
];

export const education = {
  school: 'Indian Institute of Technology Madras',
  degree: 'BS in Data Science and Applications',
  period: 'Sept 2022 — Sept 2026',
};

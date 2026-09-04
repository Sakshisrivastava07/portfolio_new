export interface Intent {
  id: string;
  keywords: string[]; // lowercase trigger words/phrases to match against
  response: string; // canned answer, can include \n for line breaks
  quickReply?: string; // short label if this should appear as a suggested chip
}

export const INTENTS: Intent[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey'],
    response:
      "Hey, I'm Saki 👋 I know everything about Sakshi's skills, experience, projects, education, and how to reach her — what would you like to know?",
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'stack', 'technologies', 'languages', 'tech stack'],
    response:
      'Sakshi works across three areas:\n\n• Programming & DSA: Python, Java, C, HTML, CSS, JavaScript, 300+ LeetCode solved\n• AI & ML: Scikit-learn, FastAPI, Pandas, NumPy, Matplotlib, Neural Networks, Deep Learning\n• Full-Stack: React, Node.js, Express.js, Tailwind CSS, MySQL, MongoDB',
    quickReply: 'Skills',
  },
  {
    id: 'experience',
    keywords: ['experience', 'work', 'job', 'intern', 'internship'],
    response:
      'Sakshi has two internships:\n\n• Machine Learning Intern at Ctruh (Bangalore, Jul-Aug 2025) — built an AI-powered skincare recommendation system with a FastAPI backend\n• Web Developer Intern at Innovate Intern (Aug-Sep 2024) — built a vehicle service management app',
    quickReply: 'Experience',
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'built', 'clausefind', 'othello', 'trabora'],
    response:
      "A few of Sakshi's projects:\n\n• ClauseFind — a RAG-based legal document research tool with a Groq LLM\n• Skincare Recommender — ML-powered personalized product suggestions\n• Minimax Othello AI — strategic game AI\n• Trabora — an AI travel planning agent\n• EDA Vision — a data exploration and visualization tool\n\nCheck the Projects section above for links to each repo!",
    quickReply: 'Projects',
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'university', 'degree', 'cgpa', 'study'],
    response:
      'Sakshi is pursuing a B.Tech in Information Science and Engineering at MS Ramaiah University of Applied Sciences, Bangalore (2023-2027, CGPA 9.3).',
    quickReply: 'Education',
  },
  {
    id: 'achievements',
    keywords: ['achievement', 'achievements', 'award', 'hackathon', 'won'],
    response:
      'Some highlights:\n\n• Finalist, QNX 24-Hour Hackathon (2026)\n• Runner-Up, RUAS x Broadridge Tech Hackathon (2025)\n• Gujarat State Bravery Award (2015)',
    quickReply: 'Achievements',
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'hire'],
    response:
      'You can reach Sakshi at sakshisrivastava09090@gmail.com, or connect via the LinkedIn/GitHub/LeetCode links in the Contact section below — or just use the contact form on this page!',
    quickReply: 'Contact',
  },
];

export const FALLBACK_RESPONSE =
  "Hmm, I don't have an answer for that one. Try asking me about Sakshi's skills, experience, projects, education, or how to get in touch!";

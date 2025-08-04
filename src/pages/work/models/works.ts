export type Work = {
  id: string;
  title: { ko: string; en: string } | string;
  type: string;
  date: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  description: {
    goal: string;
    impact: string;
  };
  skills: string[];
};

export const WORKS: Work[] = [
  {
    id: 'toss-feed',
    title: {
      ko: '토스피드',
      en: 'Toss Feed',
    },
    type: 'toss service',
    date: '2025.01 - 2025.05',
    image: { src: '/images/work/tossfeed.jpg', width: 250, height: 170 },
    description: {
      goal: 'goal',
      impact: 'impact',
    },
    skills: ['React', 'Next.js'],
  },
  {
    id: 'data-report',
    title: { ko: '토스 10주년 데이터리포트', en: 'Toss 10th Anniversary Date Report' },
    type: 'toss service',
    date: '2025.02',
    image: { src: '/images/work/data-report.jpg', width: 300, height: 150 },
    description: {
      goal: 'goal',
      impact: 'impact',
    },
    skills: ['React', 'Next.js'],
  },
  {
    id: 'money-book',
    title: { ko: '머니북', en: 'THE MONEY BOOK' },
    type: 'toss service',
    date: '2024.06',
    image: { src: '/images/work/money-book.jpg', width: 270, height: 190 },
    description: {
      goal: 'goal',
      impact: 'impact',
    },
    skills: ['React', 'Next.js'],
  },
  {
    id: 'stop-gambling',
    title: { ko: '청소년 도박 근절 캠페인', en: 'Youth Gambling Prevention Campaign' },
    type: 'toss service',
    date: '2024.10',
    image: { src: '/images/work/stop-gambling.png', width: 300, height: 150 },
    description: {
      goal: 'goal',
      impact: 'impact',
    },
    skills: ['React', 'Next.js'],
  },
  {
    id: 'slash24',
    title: 'SLASH 24',
    type: 'toss service',
    date: '2024.9',
    image: { src: '/images/work/slash24.png', width: 140, height: 300 },
    description: {
      goal: 'goal',
      impact: 'impact',
    },
    skills: ['React', 'Next.js'],
  },
  {
    id: 'moneygraphy-font',
    title: { ko: '머니그라피 서체', en: 'Moneygraphy Font' },
    type: 'toss service',
    date: '2024.11',
    image: { src: '/images/work/moneygraphy-font.png', width: 280, height: 170 },
    description: {
      goal: 'goal',
      impact: 'impact',
    },
    skills: ['React', 'Next.js'],
  },
];

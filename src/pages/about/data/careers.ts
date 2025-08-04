type Career = {
  company: {
    name: string;
    duration: string;
    logo: string;
    website: string;
    jobs: { detail: string; duration: string }[];
  };
};

export const CAREERS: Career[] = [
  {
    company: {
      name: 'Viva Republica (Toss)',
      duration: '1년',
      logo: '/images/toss-logo.png',
      website: 'https://toss.im',
      jobs: [{ detail: 'Frontend Developer Assistant (Homepage Team)', duration: '2024.05 - 2025.05' }],
    },
  },
];

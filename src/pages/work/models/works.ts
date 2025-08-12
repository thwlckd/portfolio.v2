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
    impacts: string[];
  };
  skills: string[];
  websites: string[];
};

export const WORKS: Work[] = [
  {
    id: 'toss-feed',
    title: {
      ko: '토스피드',
      en: 'Toss Feed',
    },
    type: 'Toss Service',
    date: '2025.01 - 2025.05',
    image: { src: '/images/work/tossfeed.jpg', width: 250, height: 170 },
    description: {
      goal: '금융 콘텐츠 플랫폼, 토스피드를 유지보수 개발합니다. 토스 커뮤니티의 소식 및 금융 콘텐츠를 효과적으로 소개하여 웹 사이트 내 리텐션을 늘리고, 기타 서비스로의 인플로우를 늘리기 위한 고민들이 녹아있습니다.',
      impacts: [
        'SSR 서비스 시스템 다크모드 적용: SSR Document가 브라우저에 렌더링 될 때의 첫 깜빡임을 없애기 위해 DOM 파싱을 블락, 디바이스의 시스템 테마를 판별하는 스크립트를 삽입하였습니다. 컴포넌트의 adaptive한 컬러 토큰을 두벌의 CSS 변수로 구성하여 SSR Safe한 다크모드를 지원합니다.',
        '토스피드 리뉴얼 TF: 토스피드 서비스의 리센션 및 토스 앱으로의 인프로우를 늘리는 것을 목표로, 기획부터 개발까지 빠르게 이터레이션을 돌려가며 로그 기반의 데이터 드리븐 테스트를 진행했습니다. 토스피드 매인페이지 개편 및 아티클의 검색/좋아요/댓글 기능 등을 리뉴얼 했으며, 인앱 유입 A/B 테스트 결과 CVR 2배 상승(7.79% → 15.51%)을 달성했습니다.',
      ],
    },
    skills: ['Next.js', 'Tanstack Query', 'Sheety'],
    websites: ['https://toss.im/tossfeed'],
  },
  {
    id: 'data-report',
    title: { ko: '데이터 리포트', en: 'Data Report' },
    type: 'Toss Service',
    date: '2024.12 - 2025.02',
    image: { src: '/images/work/data-report.jpg', width: 300, height: 150 },
    description: {
      goal: "10주년을 맞이한 토스가 만들어온 변화와 혁신을 에디션으로 공개합니다. 월별 금융 생활 데이터를 통해 일상 속 금융 트렌드를 분석하는 '달마다, 금융', 지난 10년간 토스가 아껴준 사용자의 시간과 비용을 조명하는 '토스 넘버스', 두 에디션을 인터렉티브한 참여형 웹 사이트로 구성합니다.",
      impacts: [
        'pathseg 패키지 패치: Matter.js에 필요한 레거시 API SVGPathSeg를 사용하기 위해 폴리필 pathseg를 사용합니다. 이 때, 프로파일러를 통해 pathseg의 getPathSegAtLength 메서드가 프레임 드랍을 유발함을 발견, 내부적으로 캐시데이터를 활용하도록 패키지를 패치하여 프레임 드랍을 해소하였습니다.',
        '한영 다국어 지원: 인터랙티브 웹의 특성상 언어에 따라 레이아웃, 컨텐츠가 달라지게 됩니다. 이에 다국어 라이브러리를 사용하지 않고, 언어 상태를 판별하는 HOC를 구성하여 locale 판별, 언어를 분기처리했습니다.',
        '이벤트 반응형 데이터 차트 개발: Nivo 라이브러리를 사용한 파이차트부터, D3 + svg 조합의 대한민국 지도 차트까지 다양한 형태의 이벤트 기반 데이터 차트를 개발했습니다.',
      ],
    },
    skills: ['Next.js', 'Tanstack Query', 'React Hook Form', 'Jotai', 'Matter.js', 'D3', 'Nivo'],
    websites: ['https://toss.im/tossfeed/edition/data-report'],
  },
  {
    id: 'stop-gambling',
    title: { ko: '청소년 도박 근절 캠페인', en: 'Youth Gambling Prevention Campaign' },
    type: 'Toss Service',
    date: '2024.9 - 2024.10',
    image: { src: '/images/work/stop-gambling.png', width: 300, height: 150 },
    description: {
      goal: '토스와 경찰청이 함께 진행한 청소년 도박 근절 캠페인 소개 웹 사이트입니다. 토스, 인스타그램, 유튜브 등의 앱을 통해 공개되는 사이트로, 다양한 모바일 기기의 인앱 브라우저에서 테스트가 선행되었습니다.',
      impacts: [
        'ngrok을 이용한 개발환경 프록시: 사내 환경은 방화벽 등의 이유로 dev 서버를 다른 기기간 공유하는데에 어려움이 있는 경우가 있습니다. 인앱브라우저 테스트를 위해 개발환경을 실제 모바일 기기에서 실시간으로 확인이 필요했고, ngrok을 이용하여 dev 서버를 퍼블릭 도메인으로 프록시, 실시간 디버깅에 큰 도움이 되었습니다.',
      ],
    },
    skills: ['React', 'GSAP', 'Jotai'],
    websites: [
      'https://toss.im/stop-gambling',
      'https://www.instagram.com/dy_gamblingdieary',
      'https://www.youtube.com/watch?v=RCMVn0D7u1I',
    ],
  },
  {
    id: 'slash24',
    title: 'SLASH 24',
    type: 'Toss Service',
    date: '2024.9',
    image: { src: '/images/work/slash24.png', width: 140, height: 300 },
    description: {
      goal: "'No Limit: 풀지 못할 문제는 없다' 슬로건의 24년 개발자 컨퍼런스의 웹 사이트를 2인 개발로 진행했습니다. 오프라인 행사인 만큼 사전 신청부터 이후 컨텐츠 아카이빙까지, 약 4 단계의 타임라인을 잘 나누어 병목 없이 순차적 개발 및 오픈이 중요한 프로젝트였습니다. 행사 사전 신청 이후 아카이빙을 주로 개발했습니다.",
      impacts: [],
    },
    skills: ['Next.js', 'Zustand', 'Tanstack Form'],
    websites: ['https://toss.im/slash-24'],
  },
  {
    id: 'moneygraphy-font',
    title: { ko: '머니그라피 서체', en: 'Moneygraphy Font' },
    type: 'Toss Service',
    date: '2024.11',
    image: { src: '/images/work/moneygraphy-font.png', width: 280, height: 170 },
    description: {
      goal: "토스의 유튜브 콘텐츠 채널, '머니그라피'에서 공개한 폰트를 웹에서 직접 체험할 수 있는 에디터를 만들었습니다. 사이트에 방문하여 Pixel·Rounded 두 폰트를 무료로 사용하실 수 있습니다.",
      impacts: [],
    },
    skills: ['React', 'GSAP', 'Radix'],
    websites: ['https://toss.im/moneygraphy-font', 'https://www.instagram.com/p/DCQ_jEAz4H0/?img_index=1'],
  },
];

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
  squad?: Partial<Record<'PM' | 'Design' | 'FE' | 'BE', number>>;
};

export const WORKS: Work[] = [
  {
    id: 'on-demand-image-optimize',
    title: {
      ko: '온디맨드 이미지 최적화',
      en: 'On Demand Image Optimize',
    },
    type: 'Side Project',
    date: '2025.08',
    image: { src: '/images/work/image-optimize.webp', width: 260, height: 150 },
    description: {
      goal: '요청 파라미터(width, height, format, type, quality)에 대응하는 이미지를 lambda@edge에서 변환 및 최적화하는 시스템입니다. 앞단에 CloudFront를 붙여 이미지 최적화 기록이 있는 요청은 C/F Cache Hit되어 평균 20ms 내외의 빠른 응답을 할 수 있습니다.',
      impacts: ['Vitest를 사용하여 C/F ↔ Lambda ↔ S3 환경의 동작을 모킹해 테스트하였습니다.'],
    },
    skills: ['Typescript', 'Sharp', 'Vitest', 'Lambda@edge', 'S3', 'CloudFront'],
    websites: [
      'https://github.com/thwlckd/lambda-image-optimize',
      'https://static.hyub.xyz/pepe.jpg?width=300&height=300&format=webp&type=cover',
      'https://static.hyub.xyz/pepe.jpg?width=500&height=400&format=avif&type=contain&quality=100',
    ],
  },
  {
    id: 'portfolio-v2',
    title: 'PORTFOLIO',
    type: 'Side Project',
    date: '2025.08 ~',
    image: { src: '/images/work/portfolio.webp', width: 280, height: 200 },
    description: {
      goal: '개인 포트폴리오 사이트입니다. Three.js와 Framer Motion을 활용하여 작업물을 역동적으로 구성하였습니다. 추후 업데이트 예정입니다.',
      impacts: ['CI 구축: Next.js 앱을 도커라이징하여 EC2에 배포하는 워크플로우를 Github Actions로 자동화하였습니다.'],
    },
    skills: [
      'Next.js',
      'Typescript',
      'Emotion',
      'Framer Motion',
      'Three.js',
      'R3F',
      'Github Actions',
      'Docker',
      'EC2',
      'Route 53',
      'GA',
      'Sentry',
    ],
    websites: ['https://github.com/thwlckd/portfolio.v2'],
  },
  {
    id: 'tossfeed',
    title: {
      ko: '토스피드',
      en: 'Toss Feed',
    },
    type: 'Toss Service',
    date: '2025.01 - 2025.05',
    image: { src: '/images/work/tossfeed.webp', width: 250, height: 170 },
    description: {
      goal: '금융 콘텐츠 플랫폼, 토스피드를 유지보수 개발합니다. 토스 커뮤니티의 소식 및 금융 콘텐츠를 효과적으로 소개하여 웹 사이트 내 리텐션을 늘리고, 기타 서비스로의 인플로우를 늘리기 위한 고민들이 녹아있습니다.',
      impacts: [
        'SSR 서비스 시스템 다크모드 적용: Server Side에서는 디바이스의 theme을 알 수 없어, 브라우저 첫 렌더링 시 플리커링이 발생할 수 있습니다. 이를 해결하기 위해 DOM 파싱을 블록하고 디바이스의 theme을 판별하는 스크립트를 삽입하여 첫 렌더링 전에 theme을 판별하였습니다. 또한 컴포넌트의 adaptive한 컬러 토큰을 light, dark 두벌의 CSS 변수로 구성하여 SSR Safe한 다크모드를 지원합니다.',
        '토스피드 리뉴얼: 토스피드의 메인페이지 레이아웃부터 검색, 댓글 기능 등 outdated한 콘텐츠를 리뉴얼합니다. 시리즈로 구성된 아티클의 오토플레이 기능을 개발하여 서비스 내 리텐션을 늘렸고, 아티클 내 CTA의 UI/UX 개선을 통해 CTR을 2배(7.79% → 15.51%) 상승시켰습니다.',
        '도메인 변경: blog.toss.im → toss.im/tossfeed으로 도메인을 변경하였습니다. 기존의 도메인은 nginx에서 redirect 처리하여 기존에 노출된 링크의 인입 손실을 방지하고, 새로운 SSR 서버를 띄워 도메인 변경 간 서비스가 다운되지 않도록 하였습니다.',
      ],
    },
    skills: ['Next.js', 'Typescript', 'Emotion', 'Tanstack Query', 'Framer Motion', 'Sheety'],
    websites: ['https://toss.im/tossfeed'],
    squad: { PM: 2, Design: 1, FE: 1 },
  },
  {
    id: 'data-report',
    title: { ko: '데이터 리포트', en: 'Data Report' },
    type: 'Toss Service',
    date: '2024.12 - 2025.02',
    image: { src: '/images/work/data-report.webp', width: 300, height: 150 },
    description: {
      goal: "10주년을 맞이한 토스가 만들어온 변화와 혁신을 에디션으로 공개합니다. 월별 금융 생활 데이터를 통해 일상 속 금융 트렌드를 분석하는 '달마다, 금융', 지난 10년간 토스가 아껴준 사용자의 시간과 비용을 조명하는 '토스 넘버스', 두 에디션을 인터렉티브한 참여형 웹 사이트로 구성합니다.",
      impacts: [
        'pathseg 패키지 패치: 물리 엔진의 구현에 사용한 Matter.js 패키지는 레거시 API SVGPathSeg를 사용하고 있어 pathseg 폴리필을 필요로 합니다. 이 때, 눈에 보이는 프레임드랍이 발생하여 크롬 성능 분석을 통해 pathseg의 getPathSegAtLength 메서드가 무거운 연산을 하는 것을 발견하였고, 해당 메서드 내부에서 반복적으로 context를 초기화하는 부분을 캐시데이터를 활용하도록 yarn patch하여 프레임 드랍을 해소하였습니다.',
        '인터렉티브 UI 구현: Nivo 라이브러리를 사용한 파이차트, D3 + svg로 직접 구성한 대한민국 지도 등 다양한 형태의 데이터 시각화 차트를 구현했습니다. 또한 scroll-linked 로띠 애니메이션, 3D Rolling Section 등의 인터랙션을 구성하였습니다. requestAnimationFrame을 활용하여 기기의 fps를 측정, 60프레임 이상의 인터렉션이 동작할 수 있는 환경인지 판별하였고, 저사양 기기에서도 부드럽게 동작 가능한 웹 사이트를 구성하였습니다.',
        '한영 다국어 지원: 인터랙티브 웹의 특성상 언어에 따라 레이아웃, 컨텐츠가 달라지게 됩니다. 이에 i18next과 같은 다국어 라이브러리 사용에 제한이 있었고, url 규칙 기반으로 언어 상태를 판별하는 HOC를 만들어 다국어를 지원할 수 있는 시스템을 구성하였습니다.',
      ],
    },
    skills: ['Next.js', 'Typescript', 'Tanstack Query', 'Framer Motion', 'Jotai', 'Matter.js', 'D3', 'Nivo'],
    websites: ['https://toss.im/tossfeed/edition/data-report'],
    squad: { PM: 1, Design: 1, FE: 1, BE: 1 },
  },
  {
    id: 'tosspay',
    title: { ko: '토스 페이', en: 'Toss Pay' },
    type: 'Toss Service',
    date: '2024.6 - 2024.7',
    image: { src: '/images/work/tosspay.webp', width: 280, height: 170 },
    description: {
      goal: '토스의 B2B 도메인 토스페이의 홈페이지 개발을 지원합니다. 메인페이지 개편부터 블로그, 리드 폼 개발 등의 서비스 유지보수를 진행하였습니다.',
      impacts: [
        '비즈니스 리드 폼 개발: 런타입 벨리데이터 Zod를 이용하여 React Hook Form의 상태를 Type Safe하고 응집도있게 구성하였습니다.',
        '레거시 코드 리팩토링: 아토믹 패턴 기반의 폴더구조가 TDS(Toss Design System) 컴포넌트 기반의 FE 생태계에 적합하지 않는 문제를 확인하였고, 전체 폴더 구조 및 레거시 코드를 정리하였습니다.',
        '동적 사이트맵 스크립트 작성: 토스페이의 콘텐츠를 관리하는 블로그 기능을 신규 개발하였습니다. 이에 콘텐츠 SEO를 위한 사이트맵이 필요하게 되었고, 현재 발행 아티클을 포함하는 동적 사이트맵을 생성하는 스크립트를 작성하였습니다. (https://pay.toss.im/sitemap.xml)',
      ],
    },
    skills: ['Next.js', 'Typescript', 'React Hook Form', 'Zod'],
    websites: ['https://pay.toss.im'],
    squad: { PM: 1, Design: 1, FE: 1, BE: 1 },
  },
  {
    id: 'stop-gambling',
    title: { ko: '청소년 도박 근절 캠페인', en: 'Youth Gambling Prevention Campaign' },
    type: 'Toss Service',
    date: '2024.9 - 2024.10',
    image: { src: '/images/work/stop-gambling.webp', width: 300, height: 150 },
    description: {
      goal: '토스와 경찰청이 함께 진행한 청소년 도박 근절 캠페인 소개 웹 사이트입니다. 토스, 인스타그램, 유튜브 등의 앱을 통해 공개되는 사이트로, 다양한 모바일 기기의 인앱 브라우저에서 테스트가 선행되었습니다.',
      impacts: [
        '커스텀 vh 적용: 카카오톡, 인스타그램과 같은 앱에서의 인앱브라우저는 주소창이 show/hide되며 view height이 동적으로 변하는 문제가 있습니다. 부드러운 사용자 경험을 위해, 인앱브라우저에서는 브라우저 세로 크기를 100vh로 고정하여 스크롤 방향에 따라 화면이 뚝뚝 끊기는 문제를 방지하였습니다.',
        'ngrok 활용 개발환경 프록시: 사내 환경은 방화벽으로 인해 dev 서버를 기기간 공유하는데에 어려움이 있었습니다. 인앱브라우저 디버깅을 위해 개발환경을 실제 모바일 기기에서 실시간으로 확인이 필요했고, ngrok을 이용하여 dev 서버를 퍼블릭 도메인으로 프록시하여 기기간 테스트 환경을 구축할 수 있었습니다.',
      ],
    },
    skills: ['React', 'Typescript', 'GSAP', 'Jotai'],
    websites: [
      'https://toss.im/stop-gambling',
      'https://www.instagram.com/dy_gamblingdieary',
      'https://www.youtube.com/watch?v=RCMVn0D7u1I',
    ],
    squad: { PM: 1, Design: 1, FE: 1 },
  },
  {
    id: 'moneygraphy-font',
    title: { ko: '머니그라피 서체', en: 'Moneygraphy Font' },
    type: 'Toss Service',
    date: '2024.11',
    image: { src: '/images/work/moneygraphy-font.webp', width: 280, height: 170 },
    description: {
      goal: "토스의 유튜브 콘텐츠 채널, '머니그라피'에서 공개한 폰트를 웹에서 직접 체험할 수 있는 에디터를 만들었습니다. 사이트에 방문하여 Pixel·Rounded 두 폰트를 무료로 사용하실 수 있습니다.",
      impacts: [
        'Sheety api를 활용한 댓글 기능: 서버 리소스가 없는 상황에서 댓글 기능을 구현하기 위해 Sass를 활용하였습니다. 비개발자 PM이 댓글을 실시간으로 관리할 수 있도록 구글 시트에 데이터가 적재되는 Sheety api를 채택하였고, 작성한 메시지는 화면에 낙관적으로 업데이트하여 사용자 경험을 높였습니다.',
        '텍스트 에디터 개발: Headless UI를 활용하여 디자인과 완전히 싱크된 웹 텍스트 에디터를 구현하였습니다. 접근성을 지원하는 Radix를 채택하여 사용하였습니다.',
      ],
    },
    skills: ['React', 'Typescript', 'GSAP', 'Radix', 'Sheety'],
    websites: ['https://toss.im/moneygraphy-font', 'https://www.instagram.com/p/DCQ_jEAz4H0/?img_index=1'],
    squad: { PM: 1, Design: 1, FE: 1 },
  },
  {
    id: 'slash24',
    title: 'SLASH 24',
    type: 'Toss Service',
    date: '2024.9',
    image: { src: '/images/work/slash24.webp', width: 140, height: 300 },
    description: {
      goal: "'No Limit: 풀지 못할 문제는 없다' 슬로건의 24년 개발자 컨퍼런스의 웹 사이트를 2인 개발로 진행했습니다. 오프라인 행사인 만큼 사전 신청부터 이후 컨텐츠 아카이빙까지, 약 4 단계의 타임라인을 잘 나누어 병목 없이 순차적 개발 및 오픈이 중요한 프로젝트였습니다. 행사 사전 신청 이후 아카이빙을 주로 개발했습니다.",
      impacts: [
        'phase별 UI 조건부 렌더링 템플릿 구성: 2인 FE 개발이 병렬적으로 진행되어 개발 초기 코드 병합에 많은 시간이 소요되었습니다. 이에 phase별 오픈 시각을 기점으로 UI를 조건부 렌더링할 수 있는 템플릿을 구성하여 상호간의 작업 공간을 분리하였고, 별도의 배포 없이 phase 오픈 시각에 맞춰 화면이 렌더되도록 구성하였습니다.',
      ],
    },
    skills: ['Next.js', 'Typescript', 'Zustand', 'Tanstack Form', 'Framer Motion'],
    websites: ['https://toss.im/slash-24'],
    squad: { PM: 1, Design: 1, FE: 2, BE: 1 },
  },
];

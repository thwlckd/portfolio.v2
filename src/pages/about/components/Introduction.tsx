import { MQ } from '@/shared/constants/mediaQuery';
import { TypeAnimation } from 'react-type-animation';

const Introduction = () => {
  return (
    <article>
      <p css={{ paddingTop: '10vh', fontSize: 30, lineHeight: 1.5, [MQ.mobile]: { fontSize: 18 } }}>
        안녕하세요.
        <br />
        <TypeAnimation
          sequence={[
            '부드러운 인터렉션에 열광하는',
            1500,
            '일의 맥락을 보는 Maker,',
            1500,
            '신뢰할 수 있는 동료,',
            1500,
          ]}
          wrapper="span"
          cursor={true}
          speed={20}
          repeat={Infinity}
        />
        <br />
        Frontend Developer <span css={{ fontWeight: 700 }}>박창협</span>입니다.
      </p>
    </article>
  );
};

export default Introduction;

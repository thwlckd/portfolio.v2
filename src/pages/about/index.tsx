import Flex from '@/shared/components/Flex';
import { TypeAnimation } from 'react-type-animation';
import PixelImage from './components/PixelImage';
import { MQ } from '@/shared/constants/mediaQuery';
import useScreenSize from '@/shared/hooks/useScreenSize';

const AboutPage = () => {
  const isMobile = useScreenSize() === 'mobile';

  return (
    <>
      <Flex
        direction="column"
        gap={20}
        css={{ paddingTop: '10vh', fontSize: 30, fontWeight: 300, [MQ.mobile]: { fontSize: 18 } }}
      >
        <div>안녕하세요.</div>
        <TypeAnimation
          sequence={['부드러운 인터렉션에 열광하는', 1500, '신뢰할 수 있는 동료,', 1500, 'maker', 1500]} // TODO: maker~
          wrapper="span"
          cursor={true}
          speed={1}
          repeat={Infinity}
        />
        <div>
          Frontend Developer <span css={{ fontWeight: 700 }}>박창협</span>입니다.
        </div>
      </Flex>

      <PixelImage
        src="/images/about1.png"
        css={{
          position: 'absolute',
          top: 50,
          right: 50,
          width: 300,
          borderRadius: 30,
          [MQ.mobile]: {
            width: 150,
          },
        }}
      />
      <PixelImage
        src="/images/about2.png"
        pixel={{ size: 50, gap: 5 }}
        css={{
          position: 'absolute',
          bottom: 0,
          left: 50,
          width: 300,
          borderRadius: 10,
          [MQ.mobile]: {
            width: 150,
          },
        }}
      />
    </>
  );
};

export default AboutPage;

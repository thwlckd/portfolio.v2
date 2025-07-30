import Flex from '@/shared/components/Flex';
import { TypeAnimation } from 'react-type-animation';
import PixelImage from './components/PixelImage';
import { MQ } from '@/shared/constants/mediaQuery';
import Delay from '@/shared/components/Delay';
import useScreenSize from '@/shared/hooks/useScreenSize';
import { motion } from 'motion/react';

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

      <Delay ms={1000}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }}>
          <PixelImage
            images={[
              {
                src: '/images/about1.png',
                width: isMobile ? 150 : 300,
                height: isMobile ? 200 : 400,
                x: (canvasWidth) => canvasWidth * 0.65,
                y: 30,
              },
              {
                src: '/images/about2.png',
                width: isMobile ? 200 : 300,
                height: isMobile ? 200 : 300,
                x: (canvasWidth) => canvasWidth * 0.1,
                y: (canvasHeight) => canvasHeight - (isMobile ? 200 : 300),
              },
            ]}
            pixelSize={6}
            gap={2}
          />
        </motion.div>
      </Delay>
    </>
  );
};

export default AboutPage;

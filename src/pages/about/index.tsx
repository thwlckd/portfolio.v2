import Flex from '@/shared/components/Flex';
import PixelImage from './components/PixelImage';
import Delay from '@/shared/components/Delay';
import useScreenSize from '@/shared/hooks/useScreenSize';
import { motion } from 'motion/react';
import Career from './components/Career';
import Introduction from './components/Introduction';

const AboutPage = () => {
  const isMobile = useScreenSize() === 'mobile';

  return (
    <>
      <Flex as="article" direction="column" gap={20}>
        <Introduction />
        <Career />
      </Flex>

      <Delay ms={1000}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }}>
          <PixelImage
            images={[
              {
                src: '/images/about1.png',
                width: isMobile ? 200 : 300,
                height: isMobile ? 267 : 400,
                x: (canvasWidth) => (isMobile ? canvasWidth * 0.5 : canvasWidth * 0.65),
                y: isMobile ? 10 : 30,
              },
              {
                src: '/images/about2.png',
                width: isMobile ? 200 : 300,
                height: isMobile ? 200 : 300,
                x: (canvasWidth) => canvasWidth * 0.1,
                y: (canvasHeight) => canvasHeight - (isMobile ? 200 : 300),
              },
            ]}
            pixelSize={5}
            gap={1}
          />
        </motion.div>
      </Delay>
    </>
  );
};

export default AboutPage;

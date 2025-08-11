import { MQ } from '@/shared/constants/mediaQuery';
import styled from '@emotion/styled';
import { motion, MotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

interface Props {
  y: MotionValue<number>;
  imageSrc: string;
  animationDir: 'col' | 'row';
}

const ActiveImage = ({ y, imageSrc, animationDir }: Props) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const height = useTransform(y, [200, screenHeight], ['100vh', '0vh']);
  const backgroundAnimation =
    animationDir === 'col' ? { backgroundPositionY: ['0%', '100%'] } : { backgroundPositionX: ['0%', '100%'] };

  useEffect(() => {
    setScreenHeight(window.innerHeight);
  }, []);

  return (
    <ImageEl
      src={imageSrc}
      animate={backgroundAnimation}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{ y, height }}
      css={{}}
    />
  );
};

export default ActiveImage;

const ImageEl = styled(motion.div)<{ src: string }>(({ src }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundImage: `url(${src})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  transition: 'background-image 0.2s ease',
  [MQ.mobile]: { width: 40 },
}));

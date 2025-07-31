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
    <motion.div
      animate={backgroundAnimation}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        y,
        width: '25%',
        height,
        backgroundImage: `url(${imageSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: 'background-image 0.2s ease',
      }}
    />
  );
};

export default ActiveImage;

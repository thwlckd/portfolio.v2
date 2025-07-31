import { throttle } from 'es-toolkit';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

const MIN_Y = 200;

const useMouseY = () => {
  const y = useMotionValue(MIN_Y);

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      if (MIN_Y <= e.clientY) {
        y.set(e.clientY);
      }
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [y]);

  return useSpring(y, { damping: 20, stiffness: 150 });
};

export default useMouseY;

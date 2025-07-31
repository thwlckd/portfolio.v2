import useMouseY from '../hooks/useMouseY';
import { useMemo, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { throttle } from 'es-toolkit';
import { Work, WORKS } from '../models/works';

type Options = {
  imageEl: HTMLElement[];
};

const useIntersectWork = ({ imageEl }: Options) => {
  const mouseY = useMouseY();
  const { scrollY } = useScroll();
  const [activeWork, setActiveWork] = useState<Work>();

  const setIntersectWork = useMemo(
    () =>
      throttle((posY: number) => {
        imageEl.forEach((image, index) => {
          const rect = image.getBoundingClientRect();
          const top = rect.top;
          const bottom = rect.bottom;

          if (posY >= top && posY <= bottom) {
            setActiveWork(WORKS[index]);
          }
        });
      }, 16),
    [imageEl],
  );

  useMotionValueEvent(mouseY, 'change', setIntersectWork);
  useMotionValueEvent(scrollY, 'change', setIntersectWork);

  return { mouseY, activeWork };
};

export default useIntersectWork;

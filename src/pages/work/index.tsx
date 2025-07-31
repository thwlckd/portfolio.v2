import { useRef } from 'react';
import Flex from '@/shared/components/Flex';
import useIntersectWork from './hooks/useIntersectWork';
import WorkList from './components/WokList';
import GridInteraction from './components/GridInteraction';

const WorkPage = () => {
  const imagesRef = useRef<HTMLElement[]>([]);
  const { mouseY, activeWork } = useIntersectWork({ imageEl: imagesRef.current });

  return (
    <Flex direction="column" align="flex-end">
      <WorkList imagesRef={imagesRef} />
      {activeWork && <GridInteraction mouseY={mouseY} activeWork={activeWork} />}
    </Flex>
  );
};

export default WorkPage;

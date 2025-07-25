import { Canvas } from '@react-three/fiber';
import Dice from './Dice';
import { OrbitControls } from '@react-three/drei';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { delay, motion } from 'motion/react';
import { layoutFilteredAtom } from '@/shared/atoms/layoutFilteredAtom';
import { PropsWithChildren, useEffect, useState } from 'react';
const GestureGuide = dynamic(() => import('./GestureGuide'), { ssr: false });

const ThreeDice = ({ children }: PropsWithChildren) => {
  const layoutFiltered = useAtomValue(layoutFilteredAtom);
  const threeZIndex = useDelayedDiceZIndex();

  return (
    <motion.div
      variants={{
        filter: { filter: 'blur(10px)' },
        clear: {},
      }}
      animate={layoutFiltered ? 'filter' : 'clear'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: threeZIndex,
      }}
    >
      <Canvas
        gl={{ antialias: true }}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #8891ac 0%, #fff 100%)',
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={20} color="#90ffd4" />
        <directionalLight position={[-3, -3, -3]} intensity={20} color="#ada7ff" />
        <OrbitControls autoRotate enableZoom={false} />
        <Dice />
      </Canvas>

      <GestureGuide />
    </motion.div>
  );
};
export default ThreeDice;

const useDelayedDiceZIndex = () => {
  const [threeZIndex, setThreeZIndex] = useState(10);
  const layoutFiltered = useAtomValue(layoutFilteredAtom);

  useEffect(() => {
    const nextThreeZIndex = layoutFiltered ? -10 : 10;

    delay(() => {
      setThreeZIndex(nextThreeZIndex);
    }, 500);
  }, [setThreeZIndex, layoutFiltered]);

  return threeZIndex;
};

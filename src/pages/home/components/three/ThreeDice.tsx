import { Canvas } from '@react-three/fiber';
import Dice from './Dice';
import { OrbitControls, Stats } from '@react-three/drei';
import { useSetAtom } from 'jotai';
import { userActionAtom } from '@/shared/atoms/userAction/userActionAtom';

const ThreeDice = () => {
  const setUserAction = useSetAtom(userActionAtom);

  return (
    <div css={{ height: '100vh' }}>
      <Canvas
        gl={{ antialias: true }}
        css={{ background: 'linear-gradient(180deg, #8891ac 0%, #ffffff 100%)' }}
        onPointerDown={() => {
          setUserAction('interactive');
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={20} color="#90ffd4" />
        <directionalLight position={[-3, -3, -3]} intensity={20} color="#ada7ff" />
        <OrbitControls autoRotate enableZoom={false} />
        <ThreeHelper />
        <Dice />
      </Canvas>
    </div>
  );
};

export default ThreeDice;

const ThreeHelper = () => {
  return (
    <>
      <Stats />
    </>
  );
};

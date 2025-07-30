import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import Glass from './Glass';
import styled from '@emotion/styled';

const GlassScene = () => {
  return (
    <SceneWrapper>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={1} gl={{ antialias: true }}>
        <directionalLight position={[0, 0, 1]} color="#ffffff" intensity={20} />
        <Glass />
        <Stats />
      </Canvas>
    </SceneWrapper>
  );
};

export default GlassScene;

const SceneWrapper = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
});

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stats } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Glass from './Glass';

const GlassScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }} dpr={1}>
        <OrbitControls enablePan={false} enableZoom={false} />
        <Environment files="/hdr/imsi.hdr" background backgroundBlurriness={1} />
        <EffectComposer>
          <Bloom />
        </EffectComposer>
        <Glass />
        <Stats />
      </Canvas>
    </div>
  );
};

export default GlassScene;

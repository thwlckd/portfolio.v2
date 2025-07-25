import { Html, useTexture } from '@react-three/drei';
import useRotateByPointer from './useRotateByPointer';

const Glass = () => {
  const texture = useTexture('/images/imsi1.jpeg');
  const { ref } = useRotateByPointer();

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[3, 5, 0.05]} />
        <meshPhysicalMaterial
          map={texture}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.1}
          transmission={1}
          thickness={0.2}
          ior={1.5}
          depthWrite={false}
        />
      </mesh>

      {/* 앞면 Html */}
      <Html position={[0, 0, 0.03]} transform occlude zIndexRange={[0, 0]}>
        <div style={{ padding: 8, borderRadius: 8 }}>
          <strong>Front</strong> Side
        </div>
      </Html>

      {/* 뒷면 Html */}
      <Html position={[0, 0, -0.03]} rotation={[0, Math.PI, 0]} transform occlude zIndexRange={[0, 0]}>
        <div style={{ padding: 8, borderRadius: 8, color: '#fff' }}>
          <strong>Back</strong> Side
        </div>
      </Html>
    </group>
  );
};

export default Glass;

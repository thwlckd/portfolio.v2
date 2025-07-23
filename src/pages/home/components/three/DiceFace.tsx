import { animated, easings, useSpring } from '@react-spring/three';
import { Html, Text3D } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { FrontSide } from 'three';

interface Props {
  route: string;
  textColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

const DiceFace = ({ route, textColor, position, rotation, onClick }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [spring, api] = useSpring(() => ({
    scale: 1,
    rotateZ: 0,
    color: textColor,
    config: { tension: 300, friction: 10, easing: easings.easeInOutBack },
  }));

  useEffect(
    function animateOnHover() {
      if (!hovered) {
        return;
      }

      api.start({ scale: 1.6, rotateZ: 0.1, color: '#4c4c4c' });
    },
    [api, hovered, textColor],
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
      <Html>
        <a href={route} css={{ opacity: 0, pointerEvents: 'none' }}>
          {route}
        </a>
      </Html>

      <AnimatedText3D
        ref={(el) => {
          el?.geometry.center();
        }}
        font="/fonts/MoneygraphyTTF_Regular.json"
        size={0.1}
        height={0.05}
        curveSegments={10}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelSegments={3}
        scale={spring.scale}
        rotation-z={spring.rotateZ}
      >
        {route.toUpperCase()}
        <animated.meshStandardMaterial color={spring.color} side={FrontSide} opacity={0.8} transparent />
      </AnimatedText3D>
    </group>
  );
};

export default DiceFace;

const AnimatedText3D = animated(Text3D);

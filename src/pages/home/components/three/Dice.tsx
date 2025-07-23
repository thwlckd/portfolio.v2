import { Children, useEffect, useRef } from 'react';
import { a, easings, useSpring } from '@react-spring/three';
import { RoundedBox } from '@react-three/drei';
import { Group } from 'three';
import DiceFace from './DiceFace';
import useScreenSize from '@/shared/hooks/useScreenSize';

const DICE_FACES: Array<{
  route: string;
  textColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
}> = [
  { route: 'work', textColor: '#5c64fa', position: [0, 0, 0.5], rotation: [0, 0, 0] }, // 앞
  { route: 'work', textColor: '#5c64fa', position: [0, 0, -0.5], rotation: [0, Math.PI, 0] }, // 뒤
  { route: 'about', textColor: '#4e6871', position: [0, 0.5, 0], rotation: [-Math.PI / 2, 0, 0] }, // 위
  { route: 'about', textColor: '#4e6871', position: [0, -0.5, 0], rotation: [Math.PI / 2, 0, 0] }, // 아래
  { route: 'contact', textColor: '#655690', position: [-0.5, 0, 0], rotation: [0, -Math.PI / 2, 0] }, // 왼
  { route: 'contact', textColor: '#655690', position: [0.5, 0, 0], rotation: [0, Math.PI / 2, 0] }, // 오
];

const Dice = () => {
  const boxRef = useRef<Group>(null);
  const screen = useScreenSize();
  const scale = screen === 'mobile' ? 1 : screen === 'tablet' ? 1.3 : 1.8;
  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { duration: 1500, easing: easings.easeOutSine },
  }));

  useEffect(
    function revealAnimation() {
      if (!boxRef.current) {
        return;
      }

      api.start({ rotation: [Math.PI * 2, Math.PI * 2, Math.PI * 2] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api, boxRef.current],
  );

  return (
    <a.group ref={boxRef} scale={scale} rotation={spring.rotation as unknown as [number, number, number]}>
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#2600ff"
          transmission={0.7}
          thickness={100}
          clearcoat={1}
          opacity={0.1}
          transparent
        />
      </RoundedBox>
      {Children.toArray(
        DICE_FACES.map(({ route, textColor, position, rotation }) => (
          <DiceFace
            route={route}
            textColor={textColor}
            position={position}
            rotation={rotation}
            onClick={(e) => {
              e.stopPropagation();
              console.log(route);
            }}
          />
        )),
      )}
    </a.group>
  );
};

export default Dice;

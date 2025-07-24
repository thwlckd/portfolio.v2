import { useEffect, useRef } from 'react';
import { a, easings, useSpring } from '@react-spring/three';
import { RoundedBox } from '@react-three/drei';
import { Group, Mesh } from 'three';
import DiceFace from './DiceFace';
import useScreenSize from '@/shared/hooks/useScreenSize';
import { useRouter } from 'next/router';
import { layoutFilteredAtom } from '@/shared/atoms/layoutFilteredAtom';
import { useSetAtom } from 'jotai';

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
  const router = useRouter();
  const setLayoutFiltered = useSetAtom(layoutFilteredAtom);
  const diceRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);
  const screen = useScreenSize();
  const scale = screen === 'mobile' ? 1 : screen === 'tablet' ? 1.3 : 1.8;
  const [spring, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { duration: 1500, easing: easings.easeOutSine },
  }));

  useEffect(
    function revealAnimation() {
      if (!diceRef.current) {
        return;
      }

      api.start({ rotation: [Math.PI * 2, Math.PI * 2, Math.PI * 2] });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api, diceRef.current],
  );

  return (
    <a.group ref={diceRef} scale={scale} rotation={spring.rotation as unknown as [number, number, number]}>
      <RoundedBox ref={boxRef} args={[1, 1, 1]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial color="#2600ff" transmission={0.7} clearcoat={1} opacity={0.1} transparent />
      </RoundedBox>
      {DICE_FACES.map(({ route, textColor, position, rotation }, index) => (
        <DiceFace
          key={index}
          route={route}
          textColor={textColor}
          position={position}
          rotation={rotation}
          onClick={(e) => {
            e.stopPropagation();
            setLayoutFiltered(true);
            router.push(route);
          }}
        />
      ))}
    </a.group>
  );
};

export default Dice;

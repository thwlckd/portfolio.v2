import { Html, useTexture } from '@react-three/drei';
import useRotateByPointer from './useRotateByPointer';
import Flex from '@/shared/components/Flex';
import styled from '@emotion/styled';
import RollingButton from '@/shared/components/RollingButton';
import { copyClipboard } from '@/shared/utils/copyClipboard';

const Glass = () => {
  const texture = useTexture('/images/contact-bg.png');
  const { ref } = useRotateByPointer();

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[4, 6, 0.05]} />
        <meshPhysicalMaterial
          map={texture}
          opacity={0.6}
          roughness={0.2}
          metalness={0.5}
          transmission={1}
          ior={2}
          depthWrite={false}
        />
      </mesh>

      <Html
        position={[0, 0, 0.03]}
        transform
        zIndexRange={[0, 0]}
        css={{ width: 150, aspectRatio: 4 / 6, fontSize: 8 }}
      >
        <Flex direction="column" justify="center" gap={10} css={{ paddingInline: 30, height: '100%' }}>
          <Flex direction="column" gap={1}>
            <Head>E-Mail</Head>
            <RollingButton
              default="thwlckd@gmail.com"
              hover="Click to Copy"
              click="Copied!"
              onClick={() => {
                copyClipboard('thwlckd@gmail.com');
              }}
            />
          </Flex>
          <Flex direction="column" gap={1}>
            <Head>Location</Head>
            <div>Seoul</div>
          </Flex>
        </Flex>
      </Html>
    </group>
  );
};

export default Glass;

const Head = styled.h2({
  fontSize: 4,
});

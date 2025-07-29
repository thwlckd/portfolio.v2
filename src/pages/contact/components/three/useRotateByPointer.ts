import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { MathUtils, Object3D } from 'three';

const useRotateByPointer = <T extends Object3D>() => {
  const ref = useRef<T>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1; // NOTE: three pointer 범위 -> -1 ~ 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      setMouse({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, mouse.x * 3.2, 0.2);
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, -mouse.y * 0.5, 0.2);
  });

  return { ref };
};

export default useRotateByPointer;

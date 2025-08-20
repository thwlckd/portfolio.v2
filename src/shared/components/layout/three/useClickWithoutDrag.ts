import { useRef } from 'react';

interface Options {
  onClick: (e: MouseEvent) => void;
}

const useClickWithoutDrag = ({ onClick }: Options) => {
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = false;
  };

  const handleMouseMove = () => {
    isDragging.current = true;
  };

  const handleClick = (e: MouseEvent) => {
    if (!isDragging.current) {
      onClick(e);
    }

    isDragging.current = false;
  };

  return {
    onPointerDown: handleMouseDown,
    onPointerMove: handleMouseMove,
    onClick: handleClick,
  };
};

export default useClickWithoutDrag;

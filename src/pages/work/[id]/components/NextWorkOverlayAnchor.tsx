import { useRef } from 'react';
import useNextWorkOverlay from '../hooks/useNextWorkOverlay';

const NextWorkOverlayAnchor = () => {
  const ref = useRef<HTMLDivElement>(null);
  useNextWorkOverlay({ ref });

  return <div ref={ref} css={{ height: 100 }} />;
};

export default NextWorkOverlayAnchor;

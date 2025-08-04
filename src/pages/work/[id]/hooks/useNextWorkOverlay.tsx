import { useInView } from 'motion/react';
import { overlay } from 'overlay-kit';
import NextWorkOverlay from '../components/NextWorkOverlay';
import { RefObject, useEffect } from 'react';

const OVERLAY_ID = 'next-work-overlay';

type Options = {
  ref: RefObject<HTMLElement | null>;
};

const useNextWork = ({ ref }: Options) => {
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      overlay.open(({ isOpen, close }) => <NextWorkOverlay show={isOpen} close={close} />, { overlayId: OVERLAY_ID });
    } else {
      overlay.close(OVERLAY_ID);
    }
  }, [isInView]);

  useEffect(() => {
    return () => {
      overlay.unmount(OVERLAY_ID);
    };
  }, []);
};

export default useNextWork;

import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINT } from '../constants/breakpoint';

const useScreenSize = () => {
  const { width } = useWindowSize({ debounceDelay: 200 });

  if (width <= BREAKPOINT.sm) {
    return 'mobile';
  }

  if (width <= BREAKPOINT.lg) {
    return 'tablet';
  }

  return 'pc';
};

export default useScreenSize;

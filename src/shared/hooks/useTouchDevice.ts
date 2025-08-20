import { useMediaQuery } from 'usehooks-ts';

const useTouchDevice = () => {
  return useMediaQuery('(pointer: coarse)');
};

export default useTouchDevice;

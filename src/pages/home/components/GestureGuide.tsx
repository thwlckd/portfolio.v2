import { AnimatePresence, motion } from 'motion/react';
import Lottie from '@lottielab/lottie-player/react';
import { useMediaQuery } from 'usehooks-ts';
import { MQ } from '@/shared/constants/mediaQuery';
import { useAtomValue } from 'jotai';
import { userActionAtom } from '@/shared/atoms/userAction/userActionAtom';
import styled from '@emotion/styled';

const GestureGuide = () => {
  const isTouchDevice = useMediaQuery('(pointer: coarse)');
  const isUserActioned = useAtomValue(userActionAtom) === 'interactive';

  return (
    <AnimatePresence>
      {isUserActioned ? (
        <motion.div
          key="click guide"
          animate={{ opacity: [0, 1, 1, 1, 0], transition: { delay: 0.5, duration: 7, times: [0, 0.1, 0.5, 0.95, 1] } }}
          style={{
            position: 'absolute',
            bottom: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <Lottie
            src="/lottie/click.json"
            autoplay
            speed={0.8}
            css={{
              width: 'min(25vw, 130px)',
              'svg *': { stroke: '#3d3d3d', fill: '#3d3d3d' },
            }}
          />
          <GuideText>클릭하면 상세페이지로 이동해요</GuideText>
        </motion.div>
      ) : (
        <motion.div
          key="drag guide"
          animate={{ opacity: [0, 1, 1, 1, 0], transition: { delay: 2, duration: 7, times: [0, 0.1, 0.5, 0.95, 1] } }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <Lottie
            src="/lottie/360degree.json"
            autoplay
            speed={0.8}
            css={{
              width: 'min(40vw, 200px)',
              'svg *': { stroke: '#3d3d3d', fill: '#3d3d3d' },
            }}
          />
          <GuideText css={{ top: -40 }}>
            {isTouchDevice ? '손가락으로 움직여보세요' : '마우스로 드래그해보세요'}
          </GuideText>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GestureGuide;

const GuideText = styled.p({
  position: 'relative',
  fontSize: 20,
  color: '#3d3d3d',
  [MQ.mobile]: { fontSize: 16 },
});

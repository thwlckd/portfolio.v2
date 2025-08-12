import { MQ } from '@/shared/constants/mediaQuery';
import { AnimatePresence, motion, MotionStyle } from 'motion/react';
import { useRouter } from 'next/router';
import { WORKS } from '../../models/works';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { isMultiLanguageTitle } from '../../utils/isMultiLanguageTitle';
import { useWindowSize } from 'usehooks-ts';
import { useState } from 'react';
import Flex from '@/shared/components/Flex';

interface Props {
  show: boolean;
  close: () => void;
}

const NextWorkOverlay = ({ show, close }: Props) => {
  const workId = useRouter().query.id;
  const workIndex = (WORKS.findIndex(({ id }) => id === workId) + 1) % WORKS.length;
  const workData = workIndex === -1 ? null : WORKS[workIndex];
  const { width, height } = useWindowSize({ debounceDelay: 200 });
  const [overlaySize, setOverlaySize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  if (!workData) {
    return null;
  }

  const title = isMultiLanguageTitle(workData.title) ? workData.title.ko : workData.title;
  const imageRatio = workData.image.width >= workData.image.height ? 'row' : 'column';
  const coverSize =
    imageRatio === 'row'
      ? {
          width: 300,
          height: (workData.image.height / workData.image.width) * 300,
        }
      : {
          width: 200,
          height: (workData.image.height / workData.image.width) * 200,
        };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={(el) => {
            if (el) {
              setOverlaySize({ width: el.offsetWidth, height: el.offsetHeight });
            }
          }}
          variants={{
            show: { y: 0, opacity: 1 },
            hide: { y: '50%', opacity: 0 },
          }}
          initial="hide"
          animate="show"
          exit="hide"
          drag
          dragConstraints={{
            left: -width / 2,
            right: width / 2 - overlaySize.width,
            top: -height + overlaySize.height + 20,
            bottom: 20,
          }}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
          whileDrag={{ scale: 0.9 }}
          whileTap={{ cursor: 'grabbing' }}
          style={{ ...overlayStyle, width: coverSize.width }}
        >
          <CloseButton onClick={close}>x</CloseButton>
          <ImageWrapper width={coverSize.width} height={coverSize.height}>
            <DragGuide justify="center" align="center" animate={{ opacity: [1, 0], transition: { delay: 3 } }}>
              드래그할 수 있어요.
            </DragGuide>
            <Image
              src={workData.image.src}
              width={coverSize.width}
              height={coverSize.height}
              alt={`${workData.title} 커버`}
              draggable={false}
            />
          </ImageWrapper>

          <div>{`${workIndex + 1} / ${WORKS.length}`}</div>
          <div>{title}</div>
          <Link
            href={`/work/${workData.id}`}
            scroll={false}
            css={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 40,
              backgroundColor: 'rgba(138, 154, 201, 0.7)',
              color: '#fff',
              borderRadius: 10,
              transition: 'background-color 0.2s ease',
              ':hover': {
                backgroundColor: '#8a9ac9',
              },
            }}
          >
            <span
              css={{
                '::after': {
                  content: '"→"',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: 4,
                  fontSize: 12,
                },
              }}
            >
              NEXT
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NextWorkOverlay;

const overlayStyle: MotionStyle = {
  position: 'fixed',
  left: '50%',
  bottom: 20,
  x: '-50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
  gap: 10,
  backgroundColor: 'rgba(180, 180, 180, 0.3)',
  borderRadius: 10,
  backdropFilter: 'blur(20px)',
  boxShadow: 'rgba(116, 116, 116, 0.5) 0px 3px 15px 0px',
  cursor: 'grab',
  [MQ.mobile]: {
    left: 20,
    width: 'calc(100% - 80px)',
  },
};

const ImageWrapper = styled.div<{ width: number; height: number }>(({ width, height }) => ({
  position: 'relative',
  width,
  height,
  borderRadius: 10,
  overflow: 'hidden',
}));

const DragGuide = styled(motion(Flex))({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(5px)',
  fontSize: 24,
  color: '#fff',
  mixBlendMode: 'difference',
});

const CloseButton = styled.button({
  zIndex: 5,
  position: 'absolute',
  top: -2,
  right: -2,
  height: 20,
  width: 20,
  borderRadius: '50%',
  backgroundColor: 'rgba(138, 154, 201, 0.7)',
  fontSize: 20,
  lineHeight: 1,
  color: '#fff',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: '#8a9ac9',
  },
});

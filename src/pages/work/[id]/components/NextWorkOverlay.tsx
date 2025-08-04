import { MQ } from '@/shared/constants/mediaQuery';
import { AnimatePresence, motion, MotionStyle } from 'motion/react';
import { useRouter } from 'next/router';
import { WORKS } from '../../models/works';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { isMultiLanguageTitle } from '../../utils/isMultiLanguageTitle';

interface Props {
  show: boolean;
  close: () => void;
}

const NextWorkOverlay = ({ show, close }: Props) => {
  const workId = useRouter().query.id;
  const workIndex = (WORKS.findIndex(({ id }) => id === workId) + 1) % (WORKS.length - 1);
  const workData = workIndex === -1 ? null : WORKS[workIndex];

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
          variants={{ show: { bottom: 20, opacity: 1 }, hide: { bottom: -20, opacity: 0 } }}
          initial="hide"
          animate="show"
          exit="hide"
          style={{
            ...overlayStyle,
            width: coverSize.width,
          }}
        >
          <CloseButton onClick={close}>x</CloseButton>
          <Image
            src={workData.image.src}
            width={coverSize.width}
            height={coverSize.height}
            alt={`${workData.title} 커버`}
            css={{ borderRadius: 10 }}
          />
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
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
  gap: 10,
  backgroundColor: 'rgba(180, 180, 180, 0.3)',
  borderRadius: 10,
  backdropFilter: 'blur(20px)',
  [MQ.mobile]: {
    left: 20,
    width: 'calc(100% - 80px)',
  },
};

const CloseButton = styled.button({
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

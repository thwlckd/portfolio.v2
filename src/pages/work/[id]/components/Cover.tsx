import Flex from '@/shared/components/Flex';
import styled from '@emotion/styled';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Work, WORKS } from '../../models/works';
import { isMultiLanguageTitle } from '../../utils/isMultiLanguageTitle';
import { useWindowSize } from 'usehooks-ts';
import { MQ } from '@/shared/constants/mediaQuery';

interface Props {
  workId: string;
  workData: Work;
}

const Cover = ({ workId, workData }: Props) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ['start start', 'end start'] });
  const springYProgress = useSpring(scrollYProgress, { stiffness: 500, damping: 30 });
  const { width = 0, height = 0 } = useWindowSize({ initializeWithValue: false });
  const springWidth = useTransform(springYProgress, [0, 1], [workData.image.width, width]);
  const springHeight = useTransform(springYProgress, [0, 1], [workData.image.height, height]);
  const offsetBottom = useTransform(springYProgress, [0, 1], [20, 0]);

  const workIndex = WORKS.findIndex(({ id }) => id === workId);
  const title = isMultiLanguageTitle(workData.title) ? workData.title.ko : workData.title;
  const coverImage = workData.image;

  return (
    <>
      <div ref={stickyRef} css={{ position: 'relative', top: -200, height: '150vh', width: '100%' }}>
        <Flex
          justify="space-between"
          css={{
            position: 'sticky',
            top: 0,
            left: 0,
            height: 0,
            width: '100%',
            lineHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <div>{workData.type}</div>
          <div css={{ position: 'relative' }}>
            <WorkIndex>{`${workIndex + 1} / ${WORKS.length}`}</WorkIndex>
            <H1>{title}</H1>
          </div>
          <div>{workData.date}</div>
        </Flex>
      </div>
      <motion.div
        style={{
          position: 'sticky',
          bottom: offsetBottom,
          width: springWidth,
          height: springHeight,
        }}
      >
        <Image src={coverImage.src} fill objectFit="cover" alt={`${title} 커버`} />
      </motion.div>
    </>
  );
};

export default Cover;

const WorkIndex = styled.div({
  position: 'absolute',
  top: -60,
  left: '50%',
  transform: 'translateX(-50%)',
  [MQ.mobile]: { top: -40 },
});

const H1 = styled.h1({
  fontSize: 60,
  [MQ.mobile]: { fontSize: 30 },
});

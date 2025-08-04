import { motion, MotionValue } from 'motion/react';
import { Work } from '../models/works';
import ActiveImage from './ActiveImage';
import styled from '@emotion/styled';
import { isMultiLanguageTitle } from '../utils/isMultiLanguageTitle';
import { MQ } from '@/shared/constants/mediaQuery';

interface Props {
  mouseY: MotionValue<number>;
  activeWork: Work;
}

const GridInteraction = ({ mouseY, activeWork: { title, image, date } }: Props) => {
  return (
    <>
      <HorizontalLine style={{ y: mouseY }} />
      <VerticalLine />
      {isMultiLanguageTitle(title) ? (
        <>
          <Title style={{ y: mouseY, top: '-1em' }}>{title.ko}</Title>
          <Title style={{ y: mouseY }}>{title.en}</Title>
        </>
      ) : (
        <Title style={{ y: mouseY, top: '-1em' }}>{title}</Title>
      )}
      <Date style={{ y: mouseY, x: '-100%', top: '-1em' }} css={{ [MQ.mobile]: { display: 'none' } }}>
        {date}
      </Date>
      <ActiveImage y={mouseY} imageSrc={image.src} animationDir={image.width / image.height >= 1 ? 'row' : 'col'} />
    </>
  );
};

export default GridInteraction;

const Title = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: '25%',
  fontSize: 32,
  paddingInline: 10,
  pointerEvents: 'none',
  [MQ.mobile]: {
    left: 40,
    fontSize: 24,
    color: '#fff',
    mixBlendMode: 'difference',
  },
});

const Date = styled(Title)({
  fontSize: 20,
});

const HorizontalLine = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: 1,
  backgroundColor: '#747474',
  pointerEvents: 'none',
});

const VerticalLine = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: '25%',
  width: 1,
  height: '100vh',
  backgroundColor: '#747474',
  [MQ.mobile]: {
    left: 40,
  },
});

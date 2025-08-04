import { useRouter } from 'next/router';
import { WORKS } from '../models/works';
import Flex from '@/shared/components/Flex';
import Cover from './components/Cover';
import { MQ } from '@/shared/constants/mediaQuery';
import { BREAKPOINT } from '@/shared/constants/breakpoint';
import styled from '@emotion/styled';
import NextWorkOverlayAnchor from './components/NextWorkOverlayAnchor';
import { isMultiLanguageTitle } from '../utils/isMultiLanguageTitle';

const WorkDetailPage = () => {
  const router = useRouter();
  const workId = router.query.id;
  const workData = WORKS.find(({ id }) => id === workId);

  if (!workData) {
    return null; // NOTE: workData가 없으면 404 redirect하기 때문에 항상 not nil을 보장한다
  }

  const title = isMultiLanguageTitle(workData.title) ? workData.title.ko : workData.title;

  return (
    <Flex direction="column" align="center" justify="center">
      <BackButton
        onClick={() => {
          router.back();
        }}
      >
        ←
      </BackButton>
      {typeof workId === 'string' && <Cover workId={workId} workData={workData} />}
      <ContextWrapper as="section" direction="column" align="flex-start" justify="center" gap={20}>
        <div>{`프로젝트 명: ${title}`}</div>
        <div>{`프로젝트 종류: ${workData.type}`}</div>
        <div>{`프로젝트 설명(비즈니스 목표): ${workData.description.goal}`}</div>
        <div>{`프로젝트 임펙트(도전 과제): ${workData.description.impact}`}</div>
        <div>{`skills: ${workData.skills.join(', ')}`}</div>
      </ContextWrapper>
      <NextWorkOverlayAnchor />
    </Flex>
  );
};

export default WorkDetailPage;

const ContextWrapper = styled(Flex)({
  padding: '100px 0 200px',
  width: '100%',
});

const BackButton = styled.button({
  position: 'fixed',
  top: 12,
  left: `calc(50% - ${BREAKPOINT.lg / 2}px )`,
  height: 66,
  aspectRatio: 1,
  lineHeight: '66px',
  fontSize: 24,
  textAlign: 'center',
  zIndex: 5,
  [MQ.tablet]: { left: 0 },
  [MQ.mobile]: { display: 'none' },
});

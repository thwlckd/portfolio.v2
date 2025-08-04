import { useRouter } from 'next/router';
import { WORKS } from '../models/works';
import Flex from '@/shared/components/Flex';
import Cover from './components/Cover';
import { MQ } from '@/shared/constants/mediaQuery';
import { BREAKPOINT } from '@/shared/constants/breakpoint';
import styled from '@emotion/styled';
import Link from 'next/link';

const WorkDetailPage = () => {
  const workId = useRouter().query.id;
  const workData = WORKS.find(({ id }) => id === workId);

  if (!workData) {
    return null; // NOTE: workData가 없으면 404 redirect하기 때문에 항상 not nil을 보장한다
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <BackLink href="/work">X</BackLink>
      {typeof workId === 'string' && <Cover workId={workId} workData={workData} />}
      <Flex direction="column" align="flex-start" justify="center" gap={20} css={{ paddingBlock: 100, width: '100%' }}>
        <div>{`프로젝트 명: ${typeof workData.title === 'string' ? workData.title : workData.title.ko}`}</div>
        <div>{`프로젝트 종류: ${workData.type}`}</div>
        <div>{`프로젝트 설명(비즈니스 목표): ${workData.description.goal}`}</div>
        <div>{`프로젝트 임펙트(도전 과제): ${workData.description.impact}`}</div>
        <div>{`skills: ${workData.skills.join(', ')}`}</div>
      </Flex>
    </Flex>
  );
};

export default WorkDetailPage;

const BackLink = styled(Link)({
  position: 'fixed',
  top: 12,
  right: `calc(50% - ${BREAKPOINT.lg / 2}px )`,
  height: 66,
  aspectRatio: 1,
  lineHeight: '66px',
  fontSize: 20,
  textAlign: 'center',
  zIndex: 5,
  [MQ.tablet]: { right: 0 },
  [MQ.mobile]: { display: 'none' },
});

import { useRouter } from 'next/router';
import { WORKS } from '../models/works';
import Flex from '@/shared/components/Flex';
import Cover from './components/Cover';
import { MQ } from '@/shared/constants/mediaQuery';
import { BREAKPOINT } from '@/shared/constants/breakpoint';
import styled from '@emotion/styled';
import NextWorkOverlayAnchor from './components/NextWorkOverlayAnchor';

const WorkDetailPage = () => {
  const router = useRouter();
  const workId = router.query.id;
  const workData = WORKS.find(({ id }) => id === workId);

  if (!workData) {
    return null; // NOTE: workData가 없으면 404 redirect하기 때문에 항상 not nil을 보장한다
  }

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
      <ContextWrapper as="section" direction="column" align="flex-start" justify="center" gap={40}>
        <div>
          <H3>서비스 개요</H3>
          <p>{workData.description.goal}</p>
        </div>
        {workData.description.impacts.length > 0 && (
          <div>
            <H3>도전 과제</H3>
            <Flex as="ul" direction="column" gap={10} css={{ listStyle: 'disc', paddingLeft: 15 }}>
              {workData.description.impacts.map((impact) => (
                <li key={impact}>
                  <p>{impact}</p>
                </li>
              ))}
            </Flex>
          </div>
        )}
        <div>
          <H3>기술 스택</H3>
          <p>{workData.skills.join(', ')}</p>
        </div>
        <div>
          <H3>링크</H3>
          <Flex as="ul" direction="column" gap={10}>
            {workData.websites.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  css={{ display: 'inline-block', wordBreak: 'break-word' }}
                >
                  {link}
                </a>
              </li>
            ))}
          </Flex>
        </div>
      </ContextWrapper>
      <NextWorkOverlayAnchor />
    </Flex>
  );
};

export default WorkDetailPage;

const ContextWrapper = styled(Flex)({
  padding: '100px 0 200px',
  width: '100%',
  whiteSpace: 'pre-wrap',
  lineHeight: 1.7,
  fontSize: 18,
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

const H3 = styled.h3({
  paddingBottom: 10,
});

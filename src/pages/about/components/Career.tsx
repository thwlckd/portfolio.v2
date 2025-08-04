import Flex from '@/shared/components/Flex';
import { MQ } from '@/shared/constants/mediaQuery';
import styled from '@emotion/styled';
import Image from 'next/image';
import { CAREERS } from '../data/careers';

const Career = () => {
  return (
    <Wrapper>
      <StyledH2>경력</StyledH2>
      <Flex as="ul" direction="column" gap={20}>
        {CAREERS.map(({ company: { name, duration, logo, website, jobs } }) => (
          <Flex key={name} as="li" align="center" gap={10}>
            <Image
              src={logo}
              width={40}
              height={40}
              alt={`${name} 로고`}
              css={{ alignSelf: 'flex-start', margin: '4px 10px 0 0' }}
            />
            <Flex direction="column" gap={10}>
              <div>
                <StyledA href={website} target="_blank" rel="noopener noreferrer">
                  {name}{' '}
                </StyledA>
                <StyledI>{duration}</StyledI>
              </div>
              <Flex as="ul" direction="column" gap={5}>
                {jobs.map(({ detail, duration }) => (
                  <li key={detail}>
                    <JobDetail>
                      {detail} <StyledI>{duration}</StyledI>
                    </JobDetail>
                  </li>
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Wrapper>
  );
};

export default Career;

const Wrapper = styled.article({
  position: 'relative',
  zIndex: 10,
  paddingTop: '10vh',
  backdropFilter: 'blur(1px)',
});

const StyledH2 = styled.h2({
  paddingBottom: 20,
  fontSize: 24,
  [MQ.mobile]: { fontSize: 18 },
});

const StyledA = styled.a({
  textDecoration: 'underline',
  fontSize: 20,
  lineHeight: 1.5,
  [MQ.mobile]: { fontSize: 16 },
});

const StyledI = styled.i({
  fontSize: '0.7em',
});

const JobDetail = styled.div({
  fontSize: 18,
  lineHeight: 1.5,
  [MQ.mobile]: { fontSize: 14 },
});

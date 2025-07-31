import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { RefObject } from 'react';
import { WORKS } from '../models/works';

interface Props {
  imagesRef: RefObject<HTMLElement[]>;
}

const WorkList = ({ imagesRef }: Props) => {
  return (
    <Wrapper>
      {WORKS.map(({ id, title, image: { src, width, height } }, index) => (
        <li
          key={id}
          ref={(el) => {
            if (el) {
              imagesRef.current[index] = el;
            }
          }}
        >
          <StyledLink href={`/work/${id}`} css={{ height }}>
            <Image src={src} width={width} height={height} alt={`${title} 커버`} style={{ objectFit: 'cover' }} />
          </StyledLink>
        </li>
      ))}
    </Wrapper>
  );
};

export default WorkList;

const Wrapper = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 50,
  paddingBottom: 200,
});

const StyledLink = styled(Link)({
  display: 'block',
  transition: 'box-shadow 0.2s ease',
  ':hover': { boxShadow: '#747474 0px 7px 25px 0px;' },
});

import styled from '@emotion/styled';
import { ComponentProps, CSSProperties, ReactNode } from 'react';

type Flex = {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
};

interface Props extends ComponentProps<typeof FlexWrapper> {
  children: ReactNode;
}

const Flex = ({ direction = 'row', justify, align, gap, children, ...rest }: Props) => {
  return (
    <FlexWrapper direction={direction} justify={justify} align={align} gap={gap} {...rest}>
      {children}
    </FlexWrapper>
  );
};

export default Flex;

const FlexWrapper = styled.div<Flex>(({ direction, justify, align, gap }) => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
  gap,
}));

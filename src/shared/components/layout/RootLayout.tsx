import styled from '@emotion/styled';
import { PropsWithChildren, useEffect } from 'react';
import GlobalNavigation from './GlobalNavigation';
import GlobalFooter from './GlobalFooter';
import ThreeDice from './three/ThreeDice';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { layoutFilteredAtom } from '@/shared/atoms/layoutFilteredAtom';

const RootLayout = ({ children }: PropsWithChildren) => {
  const isMainPage = useRouter().pathname === '/';
  const setLayoutFiltered = useSetAtom(layoutFilteredAtom);

  useEffect(() => {
    const shouldFiltered = isMainPage ? false : true;

    setLayoutFiltered(shouldFiltered);
  }, [isMainPage]);

  return (
    <Layout>
      <GlobalNavigation
        toggleMenu={() => {
          setLayoutFiltered((prev) => !prev);
        }}
      />
      <ThreeDice />
      <MainWrapper>{children}</MainWrapper>
      <GlobalFooter />
    </Layout>
  );
};

export default RootLayout;

const Layout = styled.div({
  width: '100%',
  height: '100%',
  minHeight: '100vh',
});

const MainWrapper = styled.div({
  position: 'relative',
  marginInline: 'auto',
  padding: '200px 40px 0',
  minHeight: '100vh',
  maxWidth: 1200,
});

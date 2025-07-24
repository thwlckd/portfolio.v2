import styled from '@emotion/styled';
import { PropsWithChildren, useEffect } from 'react';
import GlobalNavigation from './GlobalNavigation';
import GlobalFooter from './GlobalFooter';
import ThreeDice from './three/ThreeDice';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { layoutFilteredAtom } from '@/shared/atoms/layoutFilteredAtom';
import { motion } from 'motion/react';

const RootLayout = ({ children }: PropsWithChildren) => {
  const pathname = useRouter().pathname;
  const isMainPage = pathname === '/';
  const setLayoutFiltered = useSetAtom(layoutFilteredAtom);

  useEffect(
    function routeAdaptiveFilter() {
      const shouldFiltered = isMainPage ? false : true;

      setLayoutFiltered(shouldFiltered);
    },
    [isMainPage],
  );

  return (
    <Layout>
      <GlobalNavigation />
      <ThreeDice />
      <MainWrapper key={pathname} initial={{ top: 200, opacity: 0 }} animate={{ top: 0, opacity: 1 }}>
        {children}
      </MainWrapper>
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

const MainWrapper = styled(motion.main)({
  position: 'relative',
  marginInline: 'auto',
  padding: '200px 40px 0',
  minHeight: 'calc(100vh - 200px)',
  maxWidth: 1200,
});

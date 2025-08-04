import styled from '@emotion/styled';
import { PropsWithChildren, useEffect } from 'react';
import GlobalNavigation from './GlobalNavigation';
import GlobalFooter from './GlobalFooter';
import ThreeDice from './three/ThreeDice';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { layoutFilteredAtom } from '@/shared/atoms/layoutFilteredAtom';
import { AnimatePresence, motion } from 'motion/react';
import { BREAKPOINT } from '@/shared/constants/breakpoint';
import { MQ } from '@/shared/constants/mediaQuery';

const RootLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const isMainPage = router.pathname === '/';
  const setLayoutFiltered = useSetAtom(layoutFilteredAtom);

  useEffect(
    function routeAdaptiveFilter() {
      const shouldFiltered = isMainPage ? false : true;

      setLayoutFiltered(shouldFiltered);
    },
    [isMainPage, setLayoutFiltered],
  );

  return (
    <Layout>
      <GlobalNavigation />
      <ThreeDice />
      <AnimatePresence>
        <MainWrapper
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          exit={{ opacity: 0 }}
        >
          {children}
        </MainWrapper>
      </AnimatePresence>
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
  maxWidth: BREAKPOINT.lg,
  [MQ.mobile]: { paddingInline: 20 },
});

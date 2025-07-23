import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import GlobalNavigation from './GlobalNavigation';
import GlobalFooter from './GlobalFooter';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <GlobalNavigation />
      {children}
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

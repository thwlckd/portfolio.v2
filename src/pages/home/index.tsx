import styled from '@emotion/styled';
import ThreeDice from './components/three/ThreeDice';
import dynamic from 'next/dynamic';
const GestureGuide = dynamic(() => import('./components/GestureGuide'), { ssr: false });

const HomePage = () => {
  return (
    <Wrapper>
      <ThreeDice />
      <GestureGuide />
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div({
  position: 'relative',
});

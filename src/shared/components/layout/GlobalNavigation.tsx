import styled from '@emotion/styled';
import Link from 'next/link';

interface Props {
  toggleMenu: () => void;
}

const GlobalNavigation = ({ toggleMenu }: Props) => {
  return (
    <Nav>
      <Link href="/">home</Link>
      <button onClick={toggleMenu}>menu</button>
    </Nav>
  );
};

export default GlobalNavigation;

const Nav = styled.nav({
  zIndex: 100,
  position: 'fixed',
  top: 12,
  left: '50%',
  transform: 'translateX(-50%)',
  padding: 30,
  backgroundColor: 'red',
});

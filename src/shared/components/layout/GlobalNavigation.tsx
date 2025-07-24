import { MQ } from '@/shared/constants/mediaQuery';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion, MotionStyle } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {}

const GlobalNavigation = ({}: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <Nav
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpenMenu}
        isOpenMenu={isOpenMenu}
        onClick={() => {
          setIsOpenMenu((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsOpenMenu((prev) => !prev);
          }
        }}
      >
        <Link
          href="/"
          aria-label="home"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenMenu(false);
          }}
          css={{ height: 30, transition: 'transform 0.2s ease', ':hover': { transform: 'rotateZ(-10deg)' } }}
        >
          <img src="/svg/hyub.svg" css={{ height: '100%' }} alt="hyub 로고" />
        </Link>
        <p>{isOpenMenu ? 'CLOSE' : 'MENU'}</p>
      </Nav>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            variants={{ show: { height: '50vh', top: 90 }, hide: { height: 0, top: 78 } }}
            initial="hide"
            animate="show"
            exit="hide"
            style={popupMenuStyle}
          >
            <DropdownMenu onClick={() => setIsOpenMenu(false)}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </DropdownMenu>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalNavigation;

const Nav = styled.div<{ isOpenMenu: boolean }>(
  {
    zIndex: 100,
    position: 'fixed',
    top: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 26,
    width: 400,
    height: 66,
    borderRadius: 16,
    backgroundColor: 'rgba(110, 110, 110, 0.3)',
    backdropFilter: 'blur(12px)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',

    '&:hover:not(:has(a:hover))': {
      backgroundColor: 'rgba(30, 30, 30, 0.3)',
    },

    [MQ.mobile]: {
      paddingInline: 12,
      width: 'calc(100% - 48px)',
    },
  },
  ({ isOpenMenu }) => ({
    ...(isOpenMenu && { backgroundColor: 'rgba(30, 30, 30, 0.3)' }),
  }),
);

const DropdownMenu = styled(motion.ul)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  margin: 0,
  paddingInline: 26,
  width: 400,
  height: '50vh',
  borderRadius: 16,
  backgroundColor: 'rgba(30, 30, 30, 0.3)',
  backdropFilter: 'blur(12px)',
  listStyle: 'none',
  fontSize: 50,

  [MQ.mobile]: {
    paddingInline: 12,
    width: 'calc(100vw - 48px)',
    fontSize: 40,
  },

  li: {
    display: 'inline-block',
    width: '100%',
  },

  a: {
    display: 'inline-block',
    width: '100%',
    borderRadius: 16,
    lineHeight: 1.5,
    textAlign: 'center',
    ':hover': {
      span: {
        marginInline: 0,
        transform: 'scaleX(1)',
      },
    },
  },
});

const popupMenuStyle: MotionStyle = {
  zIndex: 100,
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  overflow: 'hidden',
};

const Stretched = styled.span({
  display: 'inline-block',
  marginInline: 10,
  transform: 'scaleX(1.5)',
  transition: 'transform 0.2s ease, margin 0.15s ease',

  [MQ.mobile]: {
    marginInline: 6,
  },
});

const NAV_LINKS = [
  {
    href: '/',
    label: (
      <>
        <Stretched>H</Stretched>OME
      </>
    ),
  },
  {
    href: '/work',
    label: (
      <>
        WO<Stretched>R</Stretched>K
      </>
    ),
  },
  {
    href: '/about',
    label: (
      <>
        A<Stretched>B</Stretched>OUT
      </>
    ),
  },
  {
    href: '/contact',
    label: (
      <>
        CON<Stretched>T</Stretched>ACT
      </>
    ),
  },
];

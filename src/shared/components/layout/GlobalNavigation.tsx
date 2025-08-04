import { MQ } from '@/shared/constants/mediaQuery';
import styled from '@emotion/styled';
import { AnimatePresence, motion, MotionStyle } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GlobalNavigation = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const currentPage = router.pathname.split('/')[1] || 'home';
  const rollingText = isHovered ? (isOpenMenu ? 'close' : 'menu') : currentPage;

  useEffect(
    function closeOnRouting() {
      setIsOpenMenu(false);
    },
    [router],
  );

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
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <Link
          href="/"
          aria-label="home"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenMenu(false);
          }}
          css={{ height: 30, ':hover': { '> img': { transform: 'rotateZ(-10deg)' } } }}
        >
          <Image
            src="/svg/hyub.svg"
            width={70}
            height={30}
            alt="hyub 로고"
            css={{ transition: 'transform 0.2s ease' }}
          />
        </Link>
        <div css={{ overflow: 'hidden', position: 'relative', height: '1.5em', flex: 1 }}>
          <AnimatePresence>
            <motion.p
              key={rollingText}
              initial={{ y: '2em', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-2em', opacity: 0 }}
              style={{ position: 'absolute', right: 0, userSelect: 'none', lineHeight: '1.5em' }}
            >
              {rollingText.toUpperCase()}
            </motion.p>
          </AnimatePresence>
        </div>
      </Nav>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            variants={{ show: { height: '50vh', top: 90 }, hide: { height: 0, top: 78 } }}
            initial="hide"
            animate="show"
            exit="hide"
            style={popupMenuStyle}
            transition={{ ease: 'easeInOut' }}
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
  paddingBlock: 50,
  paddingInline: 26,
  width: 400,
  borderRadius: 16,
  backgroundColor: 'rgba(30, 30, 30, 0.3)',
  backdropFilter: 'blur(12px)',
  fontSize: 30,
  pointerEvents: 'all',

  [MQ.mobile]: {
    paddingInline: 12,
    width: 'calc(100vw - 48px)',
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
  pointerEvents: 'none',
};

const Stretched = styled.span({
  display: 'inline-block',
  marginInline: 5,
  transform: 'scaleX(1.5)',
  transition: 'transform 0.2s ease, margin 0.15s ease',

  [MQ.mobile]: {
    marginInline: 4,
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

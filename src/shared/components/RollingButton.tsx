import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'motion/react';
import { ComponentProps, ReactNode, useState } from 'react';

interface Props extends ComponentProps<typeof StyledButton> {
  default: ReactNode;
  hover: ReactNode;
  click?: ReactNode;
  onClick?: () => void;
}

const RollingButton = ({ default: defaultNode, hover, click, onClick }: Props) => {
  const [showingValue, setShowingValue] = useState(defaultNode);

  const showDefaultValue = () => {
    setShowingValue(defaultNode);
  };

  const showHoveredValue = () => {
    if (showingValue === click) {
      return;
    }

    setShowingValue(hover);
  };

  const showClickedValue = () => {
    if (!click) {
      return;
    }

    setShowingValue(click);

    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledButton onMouseEnter={showHoveredValue} onMouseLeave={showDefaultValue} onClick={showClickedValue}>
      <RollingWrapper>
        <AnimatePresence>
          <motion.div
            key={String(showingValue)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {showingValue}
          </motion.div>
        </AnimatePresence>
      </RollingWrapper>
    </StyledButton>
  );
};

export default RollingButton;

const StyledButton = styled(motion.button)({
  overflow: 'hidden',
  lineHeight: '1.5em',
  textAlign: 'left',
  cursor: 'pointer',
});

const RollingWrapper = styled.div({
  position: 'relative',
  height: '1.5em',
});

import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { ComponentProps, ReactNode, useState } from 'react';

interface Props extends ComponentProps<typeof StyledButton> {
  default: ReactNode;
  hover: ReactNode;
  click?: ReactNode;
  onClick?: () => void;
}

const RollingButton = ({ default: defaultValue, hover, click, onClick }: Props) => {
  const [showingValue, setShowingValue] = useState(defaultValue);

  const showDefaultValue = () => {
    setShowingValue(defaultValue);
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
      <motion.div
        key={String(showingValue)}
        initial={{ transform: 'translateY(20px)', opacity: 0 }}
        animate={{ transform: 'translateY(0px)', opacity: 1 }}
        exit={{ transform: 'translateY(-20px)', opacity: 0 }}
      >
        {showingValue}
      </motion.div>
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

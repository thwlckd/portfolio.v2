import { BREAKPOINT } from './breakpoint';

export const MQ = {
  pc: `@media (min-width: ${BREAKPOINT.lg + 1}px)`,
  tablet: `@media (min-width: ${BREAKPOINT.sm + 1}px) and (max-width: ${BREAKPOINT.lg}px)`,
  mobile: `@media (max-width: ${BREAKPOINT.sm}px)`,
};

import { ComponentProps, ReactNode, Suspense } from 'react';
import useIsMounted from '../hooks/useIsMounted';

interface Props extends ComponentProps<typeof Suspense> {
  children: ReactNode;
}

const SSRSuspense = ({ children, fallback, ...rest }: Props) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback} {...rest}>
      {children}
    </Suspense>
  );
};

export default SSRSuspense;

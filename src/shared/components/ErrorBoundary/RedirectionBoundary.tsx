import { ComponentProps } from 'react';
import ErrorBoundary from './';
import { useRouter } from 'next/router';
import { Redirection } from '@/shared/utils/Redirection';

type Props = ComponentProps<typeof ErrorBoundary>;

const RedirectionBoundary = ({ children, ...props }: Props) => {
  const router = useRouter();

  return (
    <ErrorBoundary
      {...props}
      ignoreError={(e) => !Redirection.isSSRRedirectError(e)}
      onError={async (e: unknown) => {
        if (Redirection.isSSRRedirectError(e)) {
          router.replace(e.to);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RedirectionBoundary;

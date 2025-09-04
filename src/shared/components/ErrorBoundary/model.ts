import { ComponentType, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

export type FallbackProps<E extends Error = Error> = {
  error: E;
  resetError: () => void;
};

export type ErrorBoundaryBaseProps<E extends Error = Error> = PropsWithChildren<{
  ignoreError?: (e: E) => boolean;
  onError?: (error: E, info: ErrorInfo) => void;
  onReset?: () => void;
  resetKeys?: unknown[];
}>;

export type ErrorBoundaryPropsWithFallback = ErrorBoundaryBaseProps & {
  fallback?: ReactNode;
  FallbackComponent?: never;
  fallbackRender?: never;
};

export type ErrorBoundaryPropsWithComponent = ErrorBoundaryBaseProps & {
  fallback?: never;
  FallbackComponent: ComponentType<FallbackProps>;
  fallbackRender?: never;
};

export type ErrorBoundaryPropsWithRender<E extends Error> = ErrorBoundaryBaseProps & {
  fallback?: never;
  FallbackComponent?: never;
  fallbackRender: (props: FallbackProps<E>) => ReactNode;
};

export type ErrorBoundaryProps<E extends Error = Error> =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender<E>;

export type ErrorBoundaryState<E extends Error = Error> = {
  error: E | null;
};

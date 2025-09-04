import { isEqual } from 'es-toolkit';
import { Component, createElement, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState, FallbackProps } from './model';

const initialState: ErrorBoundaryState = {
  error: null,
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (this.props.ignoreError?.(error)) {
      throw error;
    }

    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    if (prevState.error !== null && isEqual(prevProps.resetKeys, this.props.resetKeys)) {
      this.props.onReset?.();

      this.setState(initialState);
    }
  }

  render() {
    const { children, fallbackRender, FallbackComponent, fallback } = this.props;
    const { error } = this.state;

    let childToRender = children;

    if (error != null) {
      const props: FallbackProps = {
        error,
        resetError: this.resetError,
      };

      if (typeof fallbackRender === 'function') {
        childToRender = fallbackRender(props);
      } else if (FallbackComponent) {
        childToRender = createElement(FallbackComponent, props);
      } else {
        childToRender = fallback;
      }
    }

    return childToRender;
  }

  resetError() {
    const { error } = this.state;

    if (error !== null) {
      this.props.onReset?.();

      this.setState(initialState);
    }
  }
}

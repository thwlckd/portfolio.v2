import { RedirectionOptions } from '@/shared/utils/Redirection';
import * as Sentry from '@sentry/nextjs';
import { NextPageContext } from 'next';
import Error from 'next/error';
import { ErrorProps } from 'next/error';

const CustomErrorComponent = (props: ErrorProps) => {
  return <Error statusCode={props.statusCode} />;
};

type ContextError =
  | ((Error & {
      statusCode?: number;
    }) &
      RedirectionOptions)
  | null;

CustomErrorComponent.getInitialProps = async (ctx: NextPageContext) => {
  const redirectTo = (ctx.err as ContextError)?.to;

  if (ctx.res && redirectTo) {
    Sentry.captureException(ctx, { tags: { redirect: redirectTo } });
    ctx?.res.writeHead(302, { location: redirectTo });
    ctx?.res.end();

    return { statusCode: 302 };
  }

  await Sentry.captureUnderscoreErrorException(ctx);

  return Error.getInitialProps(ctx);
};

export default CustomErrorComponent;

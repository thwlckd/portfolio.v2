import { GetServerSidePropsContext } from 'next';
import { WORKS } from '../models/works';

export const getServerSideProps = async (context: GetServerSidePropsContext<{ id: string }>) => {
  const workId = context.params?.id;
  const work = WORKS.find(({ id }) => workId === id);

  if (!work) {
    return { notFound: true };
  }

  return {
    props: { work },
  };
};

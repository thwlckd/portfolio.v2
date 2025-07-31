import { useRouter } from 'next/router';
import { WORKS } from '../models/works';
import Flex from '@/shared/components/Flex';
import Cover from './components/Cover';

const WorkDetailPage = () => {
  const workId = useRouter().query.id;
  const workData = WORKS.find(({ id }) => id === workId);

  if (!workData) {
    return null; // NOTE: workData가 없으면 404 redirect하기 때문에 항상 not nil을 보장한다
  }

  return (
    <Flex direction="column" align="center" justify="center" css={{ position: 'relative', top: -200 }}>
      <Cover workData={workData} />
      <div css={{ minHeight: '100vh', width: '100%' }}>sdf</div>
    </Flex>
  );
};

export default WorkDetailPage;

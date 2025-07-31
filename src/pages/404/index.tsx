import Flex from '@/shared/components/Flex';

const NotFoundPage = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap={20}
      css={{ height: '20vh', fontSize: 30, textAlign: 'center' }}
    >
      <div>404</div>
      <div>NOT FOUND!</div>
    </Flex>
  );
};

export default NotFoundPage;

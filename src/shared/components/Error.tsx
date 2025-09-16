import Flex from './Flex';

const Error = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap={20}
      css={{ height: '20vh', fontSize: 30, textAlign: 'center' }}
    >
      <div>문제가 발생했습니다.</div>
      <a href="/">새로고침</a>
    </Flex>
  );
};

export default Error;

import { ReactNode, useEffect, useState } from 'react';

interface Props {
  ms: number;
  children: ReactNode;
}

const Delay = ({ ms, children }: Props) => {
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDelayed(true);
    }, ms);
  });

  if (!isDelayed) {
    return null;
  }

  return <>{children}</>;
};

export default Delay;

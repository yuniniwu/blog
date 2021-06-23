import { useState, useEffect, useCallback } from 'react';

const useRWD = () => {
  const [device, setDevice] = useState(() => {
    let initialDevice;
    if (window.innerWidth > 768) {
      initialDevice = 'PC';
    } else if (window.innerWidth > 576) {
      initialDevice = 'tablet';
    } else {
      initialDevice = 'mobile';
    }
    return initialDevice;
  });

  const handleRWD = useCallback(() => {
    if (window.innerWidth > 768) setDevice('PC');
    else if (window.innerWidth > 576) setDevice('tablet');
    else setDevice('mobile');
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleRWD);
    return () => {
      window.removeEventListener('resize', handleRWD);
    };
  });

  return device;
};
export default useRWD;

import { useState, useEffect } from 'react';

const BASE_WIDTH = 380;

export function useScale() {
  const [scale, setScale] = useState(() => {
    return Math.min(1, window.innerWidth / BASE_WIDTH);
  });

  useEffect(() => {
    const handleResize = () => {
      setScale(Math.min(1, window.innerWidth / BASE_WIDTH));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const s = (px: number) => Math.round(px * scale);

  return { scale, s };
}

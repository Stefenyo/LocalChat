import { useEffect, useState } from 'react';

const useSystemAppearance = () => {
  const [systemAppearance, setSystemAppearance] = useState<'light' | 'dark'>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      setSystemAppearance(matches ? 'dark' : 'light');
    });
  }, []);

  return { systemAppearance };
};

export { useSystemAppearance };

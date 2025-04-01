import type { FC } from 'react';
import { StyledImage } from './LoadingGif.styles';
import loadingLight from '@/assets/loadingLight.gif';
import loadingDark from '@/assets/loadingDark.gif';
import { useSystemAppearance } from '@/hooks';

const LoadingGif: FC = () => {
  const { systemAppearance } = useSystemAppearance();
  const src = systemAppearance === 'dark' ? loadingDark : loadingLight;
  return <StyledImage src={src} alt="loading" />;
};

export { LoadingGif };

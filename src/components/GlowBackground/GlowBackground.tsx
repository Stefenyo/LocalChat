import type { FC } from 'react';
import './glowBackground.css';

const GlowBackground: FC = () => (
  <div className="glow-container">
    <div className="ball"></div>
    <div
      className="ball"
      style={{ '--delay': '-15s', '--size': '0.35', '--speed': '15s' } as React.CSSProperties}
    ></div>
    {/* <div class="ball" style="--delay:-10s;--size:0.3;--speed:15s;"></div> */}
  </div>
);

export { GlowBackground };

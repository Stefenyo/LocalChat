"use client";
import { type FC } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { colorConfigs, type ColorConfigKeys } from "./colorConfigs";

interface Props {
  color: ColorConfigKeys;
}

const ShaderGradientBg: FC<Props> = ({ color }) => {
  return (
    <ShaderGradientCanvas
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "-1",
      }}
      pointerEvents="none"
    >
      <ShaderGradient control="props" {...{ ...colorConfigs[color] }} />
    </ShaderGradientCanvas>
  );
};

export { ShaderGradientBg };
export type { Props as ShaderGradientBgProps };

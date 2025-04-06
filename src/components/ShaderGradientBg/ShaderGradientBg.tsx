"use client";
import { type FC } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { colorConfigs, type ColorConfigKeys } from "./colorConfigs";
import { extractConfigFromURL } from "./extractConfigFromUrl";

interface Props {
  color: ColorConfigKeys;
  brightness: number;
}

const ShaderGradientBg: FC<Props> = ({ color, brightness }) => {
  console.log(
    extractConfigFromURL(
      "https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.4&cPolarAngle=95&cameraZoom=1&color1=%23000000&color2=%23ff0000&color3=%231d0000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-2.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=225&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.8&uFrequency=5.5&uSpeed=0.2&uStrength=3&uTime=0.2&wireframe=false"
    )
  );

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
      <ShaderGradient
        control="props"
        {...{ ...colorConfigs[color], brightness }}
      />
    </ShaderGradientCanvas>
  );
};

export { ShaderGradientBg };
export type { Props as ShaderGradientBgProps };

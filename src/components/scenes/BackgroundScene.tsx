"use client";
import { useEffect, useState, type FC } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const BackgroundScene: FC = () => {
  // Fixes issue related to window not being defined during SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
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
        control="query"
        urlString={`https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.4&cPolarAngle=95&cameraZoom=1&color1=%23000000&color2=%23ff0000&color3=%231d0000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-2.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=225&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.8&uFrequency=5.5&uSpeed=0.2&uStrength=3&uTime=0.2&wireframe=false`}
      />
    </ShaderGradientCanvas>
  ) : null;
};

export { BackgroundScene };

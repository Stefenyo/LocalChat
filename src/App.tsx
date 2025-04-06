import { type FC } from "react";
import { Theme } from "@radix-ui/themes";
import { Chat } from "@/routes";
import {
  ShaderGradientBg,
  type ShaderGradientBgProps,
} from "./components/ShaderGradientBg";

const theme: ShaderGradientBgProps["color"] = "green";

const App: FC = () => {
  return (
    <Theme appearance="dark" accentColor={theme} radius="full" scaling="100%">
      <Chat />
      <ShaderGradientBg color={theme} brightness={1} />
    </Theme>
  );
};

export { App };

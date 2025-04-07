import { Theme } from "@radix-ui/themes";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  ShaderGradientBg,
  type ShaderGradientBgProps,
} from "@/components/ShaderGradientBg";

const theme: ShaderGradientBgProps["color"] = "green";

const Route = createRootRoute({
  component: () => (
    <>
      <Theme
        appearance="dark"
        accentColor={theme}
        radius="full"
        scaling="100%"
        hasBackground={false}
      >
        <Outlet />
      </Theme>
      <ShaderGradientBg color={theme} brightness={1} />
      <TanStackRouterDevtools />
    </>
  ),
});

export { Route };

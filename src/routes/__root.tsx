import { type FC } from "react";
import { Theme } from "@radix-ui/themes";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  ShaderGradientBg,
  type ShaderGradientBgProps,
} from "@/components/ShaderGradientBg";
import { UserMenu } from "@/components/UserMenu";

const theme = "aurora" as ShaderGradientBgProps["color"];

const RouteComponent: FC = () => {
  return (
    <>
      <Theme
        appearance="dark"
        accentColor={theme === "aurora" ? "indigo" : theme}
        radius="large"
        scaling="100%"
        hasBackground={false}
      >
        <UserMenu />
        <Outlet />
      </Theme>
      <ShaderGradientBg color={theme} />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

const Route = createRootRoute({
  component: RouteComponent,
});

export { Route };

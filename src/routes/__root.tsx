import { type FC } from "react";
import { Theme } from "@radix-ui/themes";
import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  ShaderGradientBg,
  type ShaderGradientBgProps,
} from "@/components/ShaderGradientBg";
import { UserMenu } from "@/components/UserMenu";

const theme: ShaderGradientBgProps["color"] = "red";

const RouteComponent: FC = () => {
  const matchRoute = useMatchRoute();
  const isHomepage = !!matchRoute({ to: "/", fuzzy: false });

  return (
    <>
      <Theme
        appearance="dark"
        accentColor={theme}
        radius="full"
        scaling="100%"
        hasBackground={false}
      >
        <UserMenu />
        <Outlet />
      </Theme>
      <ShaderGradientBg color={theme} brightness={isHomepage ? 1 : 0.6} />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

const Route = createRootRoute({
  component: RouteComponent,
});

export { Route };

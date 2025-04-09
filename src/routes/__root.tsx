import { type FC } from "react";
import { Theme } from "@radix-ui/themes";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  ShaderGradientBg,
  type ShaderGradientBgProps,
} from "@/components/ShaderGradientBg";
import { UserMenu } from "@/components/UserMenu";
import { HomeButton } from "@/components/HomeButton/HomeButton";

const theme = "aurora" as ShaderGradientBgProps["color"];

const RouteComponent: FC = () => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  const renderBackButton = () => (currentPath !== "/" ? <HomeButton /> : null);
  return (
    <>
      <Theme
        appearance="dark"
        accentColor={theme === "aurora" ? "indigo" : theme}
        radius="large"
        scaling="100%"
        hasBackground={false}
      >
        {renderBackButton()}
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

import { type FC } from "react";
import { Theme } from "@radix-ui/themes";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ShaderGradientBg } from "@/components/ShaderGradientBg";
import { UserMenu } from "@/components/UserMenu";
import { HomeButton } from "@/components/HomeButton/HomeButton";
import { useAppearance } from "@/hooks/useAppearance";

const RouteComponent: FC = () => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { config } = useAppearance();

  const renderBackButton = () => (currentPath !== "/" ? <HomeButton /> : null);
  return (
    <>
      <Theme
        appearance={config.appearance}
        accentColor={config.accentColor}
        radius="large"
        scaling="100%"
        hasBackground={false}
      >
        {renderBackButton()}
        <UserMenu />
        <Outlet />
      </Theme>
      <ShaderGradientBg color={config.bgGradient} />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

const Route = createRootRoute({
  component: RouteComponent,
});

export { Route };

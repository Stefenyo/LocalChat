import { StyledFlexContainer } from "@/components/StyledComponents";
import { Flex, Heading, TabNav } from "@radix-ui/themes";
import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router";

const promptTemplateUrls = [
  { url: "/prompt-templates/base", title: "Base" },
  { url: "/prompt-templates/sub-prompts", title: "Sub Prompts" },
] as const;

const SettingsLayoutComponent = () => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <>
      <StyledFlexContainer direction="column">
        <Flex direction="column" flexGrow="1" mt="6">
          <Heading size="9" weight="medium">
            Prompt Templates
          </Heading>

          <TabNav.Root mt="8" mb="6">
            {promptTemplateUrls.map((item) => (
              <TabNav.Link
                asChild
                key={item.url}
                active={item.url === currentPath}
              >
                <Link to={item.url}>{item.title}</Link>
              </TabNav.Link>
            ))}
          </TabNav.Root>
          <Outlet />
        </Flex>
      </StyledFlexContainer>
    </>
  );
};

const Route = createFileRoute("/prompt-templates")({
  component: SettingsLayoutComponent,
});

export { Route };
// eslint-disable-next-line react-refresh/only-export-components
export { promptTemplateUrls };

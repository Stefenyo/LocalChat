import { StyledFlexContainer } from "@/components/StyledComponents";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, TabNav } from "@radix-ui/themes";
import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router";

const urls = [
  { url: "/settings/prompt-templates", title: "Prompt Templates" },
  { url: "/settings/language-model", title: "Language Model" },
  { url: "/settings/appearance", title: "Appearance" },
];

const SettingsLayoutComponent = () => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <>
      <StyledFlexContainer direction="column">
        <Button
          variant="ghost"
          radius="large"
          size="2"
          style={{ alignSelf: "flex-start", cursor: "pointer" }}
          asChild
        >
          <Link to="/">
            <ArrowLeftIcon /> return to chat
          </Link>
        </Button>
        <Flex direction="column" gap="8" flexGrow="1" mt="6">
          <Heading size="9" weight="medium">
            Settings
          </Heading>

          <TabNav.Root>
            {urls.map((item) => (
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

const Route = createFileRoute("/settings")({
  component: SettingsLayoutComponent,
});

export { Route };

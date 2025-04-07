import { Card, Flex, Text, TextArea } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

const PromptTemplatesComponent = () => {
  return (
    <Card variant="surface">
      <Flex direction="column" gap="4">
        <Text size="2" weight="regular">
          Base Prompt
        </Text>
        <TextArea
          placeholder="Enter your custom prompt here"
          size="2"
          style={{ width: "100%", height: "250px" }}
        />
      </Flex>
    </Card>
  );
};

const Route = createFileRoute("/settings/prompt-templates")({
  component: PromptTemplatesComponent,
});

export { Route };

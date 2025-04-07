import { Card, Flex, Text, TextArea } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

const PromptTemplatesComponent = () => {
  return (
    <div>
      <Text size="2" weight="regular" color="gray">
        This section allows you to customize the base prompt for the AI model
        and also add additional prompt templates that will be added to the base
        prompt to influence the AI model's response.
      </Text>
      <Card variant="surface" mt="6">
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
        {/* Implement logic to add additonal prompt templates that will be added
        to the base prompt // to influence the AI model's response. */}
      </Card>
    </div>
  );
};

const Route = createFileRoute("/settings/prompt-templates")({
  component: PromptTemplatesComponent,
});

export { Route };

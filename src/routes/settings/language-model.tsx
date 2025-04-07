import { createFileRoute } from "@tanstack/react-router";
import { useGetOllamaModels } from "@/hooks/useGetOllamaModels";
import { useSelectedModel } from "@/hooks/useSelectedModel";
import { Card, Flex, Select, Text } from "@radix-ui/themes";

const LanguageModelsComponent = () => {
  const { modelList, isLoading } = useGetOllamaModels();
  const { selectedModel, updateSelectedModel } = useSelectedModel();

  if (isLoading) return <Card variant="surface">Loading model ...</Card>;
  if (!modelList || !modelList.length)
    return <Card variant="surface">No models found</Card>;

  return (
    <Card variant="surface">
      <Flex direction="column" gap="4">
        <Text size="2" weight="bold">
          Ollama Model
        </Text>

        <Text size="2" weight="regular" color="gray">
          Select the model you want to use for your AI assistant.
        </Text>
        <div>
          <Select.Root
            defaultValue={selectedModel}
            onValueChange={updateSelectedModel}
          >
            <Select.Trigger placeholder="Models" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Models</Select.Label>
                {modelList.map((model) => (
                  <Select.Item key={model} value={model}>
                    {model}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </Flex>
    </Card>
  );
};

const Route = createFileRoute("/settings/language-model")({
  component: LanguageModelsComponent,
});

export { Route };

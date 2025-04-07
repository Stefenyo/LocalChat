import { createFileRoute } from "@tanstack/react-router";
import { useGetOllamaModels } from "@/hooks/useGetOllamaModels";
import { useSelectedModel } from "@/hooks/useSelectedModel";
import { Card, Select } from "@radix-ui/themes";

const LanguageModelsComponent = () => {
  const { modelList, isLoading } = useGetOllamaModels();
  const { selectedModel, updateSelectedModel } = useSelectedModel();

  if (isLoading) return <Card variant="surface">Loading model ...</Card>;
  if (!modelList || !modelList.length)
    return <Card variant="surface">No models found</Card>;

  return (
    <Card variant="surface">
      <Select.Root
        defaultValue={selectedModel || modelList[0]}
        onValueChange={updateSelectedModel}
      >
        <Select.Trigger />
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
    </Card>
  );
};

const Route = createFileRoute("/settings/language-model")({
  component: LanguageModelsComponent,
});

export { Route };

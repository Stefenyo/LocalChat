import { type FC } from "react";
import { Card, Select } from "@radix-ui/themes";

interface Props {
  size?: Select.RootProps["size"];
  selectedModel: string;
  modelList: string[];
  onModelChange: (model: string) => void;
}

const ModelSelect: FC<Props> = ({
  size = "2",
  selectedModel,
  modelList,
  onModelChange,
}) => {
  if (!modelList || !modelList.length)
    return <Card variant="surface">No models found</Card>;

  return (
    <Select.Root
      value={selectedModel}
      onValueChange={onModelChange}
      size={size}
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
  );
};

export { ModelSelect };

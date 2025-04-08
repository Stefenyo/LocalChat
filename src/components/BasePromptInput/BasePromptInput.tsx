import { type ChangeEvent, useState } from "react";
import { useBasePrompt } from "@/hooks";
import { Button, Card, Flex, Text, TextArea } from "@radix-ui/themes";

const BasePromptInput = () => {
  const { basePrompt: savedBasePrompt, updateBasePrompt } = useBasePrompt();

  const [editedBasePrompt, setEditedBasePrompt] = useState(savedBasePrompt);

  const handleSave = () => {
    updateBasePrompt(editedBasePrompt);
  };

  return (
    <Card variant="surface">
      <Flex direction="column" gap="4">
        <Flex direction="row" gap="4" align="center" justify="between">
          <Flex direction="column" gap="2" style={{ maxWidth: "30rem" }}>
            <Text size="2" weight="bold">
              Base Prompt Template
            </Text>
            <Text size="1" weight="regular" color="gray">
              Add a base prompt template that will be used as the base prompt
              for the AI model.
            </Text>
          </Flex>

          <Button
            size="1"
            style={{ cursor: "pointer" }}
            onClick={handleSave}
            disabled={editedBasePrompt === savedBasePrompt}
            aria-label="Save base prompt template"
          >
            Save
          </Button>
        </Flex>
        <TextArea
          placeholder="Enter your custom prompt here"
          size="2"
          style={{ width: "100%", height: "250px" }}
          value={editedBasePrompt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setEditedBasePrompt(e.target.value);
          }}
        />
      </Flex>
    </Card>
  );
};

export { BasePromptInput };

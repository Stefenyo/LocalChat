import { type ChangeEvent, useState } from "react";
import { useBasePrompt } from "@/hooks";
import { Button, Card, Flex, Text, TextArea } from "@radix-ui/themes";

const BasePromptInput = () => {
  const [isSavedRequired, setIsSavedRequired] = useState(false);

  const { basePrompt, updateBasePrompt, saveBasePrompt } = useBasePrompt();

  const handleSave = () => {
    saveBasePrompt(basePrompt);
    setIsSavedRequired(false);
  };

  return (
    <Card variant="surface" mt="6">
      <Flex direction="column" gap="4">
        <Flex direction="row" gap="4" align="center" justify="between">
          <Text size="2" weight="regular">
            Base Prompt Template
          </Text>

          <Button
            size="1"
            style={{ cursor: "pointer" }}
            onClick={handleSave}
            disabled={!isSavedRequired}
          >
            Save
          </Button>
        </Flex>

        <Text size="2" weight="regular" color="gray">
          Add a custom prompt template that will be used as the base prompt for
          the AI model.
        </Text>
        <TextArea
          placeholder="Enter your custom prompt here"
          size="2"
          style={{ width: "100%", height: "250px" }}
          value={basePrompt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            updateBasePrompt(e.target.value);
            setIsSavedRequired(true);
          }}
        />
      </Flex>
    </Card>
  );
};

export { BasePromptInput };

import { BasePromptInput } from "@/components/BasePromptInput";
import {
  Button,
  Card,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

const PromptTemplatesComponent = () => {
  return (
    <Flex direction="column" gap="6">
      <BasePromptInput />

      <Card variant="surface">
        <Flex direction="column" gap="4">
          <Flex direction="row" gap="4" align="center" justify="between">
            <Text size="2" weight="bold">
              Sub Prompt Templates
            </Text>

            <Dialog.Root>
              <Dialog.Trigger>
                <Button size="1" style={{ cursor: "pointer" }}>
                  Add new
                </Button>
              </Dialog.Trigger>

              <Dialog.Content maxWidth="450px">
                <Dialog.Title>Add new sub prompt template</Dialog.Title>

                <Flex direction="column" gap="3">
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Name
                    </Text>
                    <TextField.Root
                      placeholder="Enter a name that describes the content type"
                      radius="large"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Prompt template
                    </Text>
                    <TextArea
                      placeholder="Enter your custom prompt here"
                      size="2"
                      style={{ width: "100%", height: "250px" }}
                    />
                  </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button>Save</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>

          <Text size="2" weight="regular" color="gray">
            Add sub prompt templates that can be added to the base prompt to
            influence the AI model's response. These can be selected from the
            chat UI.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

const Route = createFileRoute("/settings/prompt-templates")({
  component: PromptTemplatesComponent,
});

export { Route };

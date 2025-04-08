import { useState, type FC } from "react";
import { Card, Flex, Box, Text, Button } from "@radix-ui/themes";
import { SubPrompt, useSubPrompts } from "@/hooks/useSubPrompts";
import { SubPromptItem } from "./SubPromptItem";
import { Modal } from "./Modal";

const SubPromptTemplates: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { subPrompts, addSubPrompt, removeSubPrompt, updateSubPrompt } =
    useSubPrompts();

  const handleOnDelete = (index: number) => {
    removeSubPrompt(index);
  };

  const toggleAddModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <Card variant="surface">
        <Flex direction="column" gap="4">
          <Flex direction="row" gap="4" align="center" justify="between">
            <Flex direction="column" gap="2" style={{ maxWidth: "30rem" }}>
              <Text size="2" weight="bold">
                Sub Prompt Templates
              </Text>
              <Text size="1" weight="regular" color="gray">
                Add sub prompt templates that can be added to the base prompt to
                influence the AI model's response. These can be selected from
                the chat UI.
              </Text>
            </Flex>

            <Button
              size="1"
              style={{ cursor: "pointer" }}
              onClick={toggleAddModal}
              aria-label="Add sub prompt template"
            >
              Add
            </Button>
          </Flex>
        </Flex>
        {subPrompts?.length ? (
          <Box mt="4">
            {subPrompts.map(({ title, prompt }, index) => (
              <SubPromptItem
                key={index}
                title={title}
                prompt={prompt}
                onDelete={() => handleOnDelete(index)}
                onEditComplete={(updatedSubPrompt: SubPrompt) =>
                  updateSubPrompt(index, updatedSubPrompt)
                }
              />
            ))}
          </Box>
        ) : null}
      </Card>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleAddModal}
        onSave={addSubPrompt}
      />
    </>
  );
};

export { SubPromptTemplates };

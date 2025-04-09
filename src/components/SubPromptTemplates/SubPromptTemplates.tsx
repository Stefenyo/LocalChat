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

  const renderModal = () =>
    isModalOpen ? (
      <Modal onClose={toggleAddModal} onSave={addSubPrompt} />
    ) : null;

  return (
    <>
      <Card variant="surface">
        <Flex direction="column" gap="4" p="2">
          <Flex direction="row" gap="4" align="center" justify="between">
            <Flex direction="column" gap="2" style={{ maxWidth: "30rem" }}>
              <Text size="2" weight="bold">
                Sub Prompt Templates
              </Text>
              <Text size="1" weight="regular" color="gray">
                Sub prompts serve as additional prompts that can be combined
                with the base prompt. Once added, these can be selected from the
                chat input.
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
      {renderModal()}
    </>
  );
};

export { SubPromptTemplates };

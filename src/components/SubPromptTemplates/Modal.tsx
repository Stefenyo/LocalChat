import { useState, type FC } from "react";
import {
  Dialog,
  Flex,
  Text,
  TextField,
  TextArea,
  Button,
} from "@radix-ui/themes";
import { type SubPrompt } from "@/hooks/useSubPrompts";

interface Props {
  isOpen: boolean;
  initialValues?: SubPrompt;
  onClose: () => void;
  onSave: (subprompt: SubPrompt) => void;
}

const Modal: FC<Props> = ({ isOpen, onClose, onSave, initialValues }) => {
  const [title, setTitle] = useState<string>(initialValues?.title || "");
  const [prompt, setPrompt] = useState<string>(initialValues?.prompt || "");

  const handleOnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleOnSave = () => {
    if (title && prompt) {
      onSave?.({ title, prompt });
      onClose?.();
    }
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Sub Prompt Template</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              placeholder="Enter a title that best describes this prompt"
              radius="large"
              value={title}
              onChange={handleOnTitleChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Prompt template
            </Text>
            <TextArea
              placeholder="Enter your custom prompt here"
              size="2"
              value={prompt}
              onChange={handleOnPromptChange}
              style={{ width: "100%", height: "250px" }}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleOnSave}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { Modal };

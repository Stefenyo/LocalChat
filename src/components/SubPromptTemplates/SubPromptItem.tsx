import { useState, type FC } from "react";
import {
  Flex,
  DropdownMenu,
  Text,
  IconButton,
  Separator,
} from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { SubPrompt } from "@/hooks/useSubPrompts";

interface Props {
  title: string;
  prompt: string;
  onDelete: () => void;
  onEditComplete: (updatedSubPrompt: SubPrompt) => void;
}

const SubPromptItem: FC<Props> = ({
  title,
  prompt,
  onDelete,
  onEditComplete,
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <Separator orientation="horizontal" size="4" />
      <Flex direction="row" gap="6" justify="between" pt="4" pb="4">
        <div style={{ width: "100px" }}>
          <Text size="1" weight="bold">
            {title}
          </Text>
        </div>

        <div style={{ flex: 1 }}>
          <Text truncate size="1">
            {prompt}
          </Text>
        </div>

        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" style={{ cursor: "pointer" }}>
              <DotsHorizontalIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setEditMode(true)}>
              Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item color="red" onClick={onDelete}>
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
      <Modal
        isOpen={editMode}
        onClose={() => setEditMode(false)}
        onSave={onEditComplete}
        initialValues={{ title, prompt }}
      />
    </>
  );
};

export { SubPromptItem };

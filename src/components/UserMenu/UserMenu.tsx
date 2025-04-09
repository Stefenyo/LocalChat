import { ColorWheelIcon, FileTextIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { FC } from "react";
import { useNavigate } from "@tanstack/react-router";

const UserMenu: FC = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      gap="5"
      style={{ position: "fixed", top: "1.5rem", right: "1.5rem" }}
    >
      <Tooltip content="Prompt Templates" side="right">
        <IconButton
          variant="ghost"
          radius="large"
          size="3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate({ to: "/prompt-templates/base" })}
        >
          <FileTextIcon style={{ width: "18px", height: "18px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Appearance" side="right">
        <IconButton
          variant="ghost"
          radius="large"
          size="3"
          style={{ cursor: "pointer" }}
          onClick={() => console.log("theme coming soons")}
          disabled
        >
          <ColorWheelIcon style={{ width: "18px", height: "18px" }} />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export { UserMenu };

import { FileTextIcon } from "@radix-ui/react-icons";
import { Button, Tooltip } from "@radix-ui/themes";
import { FC } from "react";
import { useNavigate } from "@tanstack/react-router";

const UserMenu: FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem" }}>
      <Tooltip content="Prompt Templates" side="right">
        <Button
          variant="ghost"
          radius="large"
          size="1"
          style={{ cursor: "pointer" }}
          onClick={() => navigate({ to: "/prompt-templates/base" })}
        >
          <FileTextIcon />
        </Button>
      </Tooltip>
      {/* <Button
        variant="ghost"
        radius="large"
        size="1"
        style={{ cursor: "pointer" }}
        onClick={() => navigate({ to: "/prompt-templates/base" })}
      >
        <FileTextIcon />
        Prompt Templates
      </Button> */}
    </div>
  );
};

export { UserMenu };

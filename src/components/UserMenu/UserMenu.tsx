import { GearIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { FC } from "react";
import { useNavigate } from "@tanstack/react-router";

const UserMenu: FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "fixed", top: "1rem", right: "1rem" }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="solid" radius="large" size="3">
            <GearIcon style={{ width: "18px", height: "18px" }} />
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onClick={() => navigate({ to: "/settings/prompt-templates" })}
          >
            Prompt Templates
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => navigate({ to: "/settings/language-model" })}
          >
            Language Model
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => navigate({ to: "/settings/appearance" })}
          >
            Appearance
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export { UserMenu };

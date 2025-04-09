import { GearIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { FC } from "react";
import { useNavigate } from "@tanstack/react-router";
import { settingsUrls } from "@/routes/prompt-templates/route";

const UserMenu: FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ position: "fixed", top: "1rem", right: "1rem" }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="solid"
            radius="large"
            size="3"
            style={{ cursor: "pointer" }}
          >
            <GearIcon style={{ width: "18px", height: "18px" }} />
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {settingsUrls.map((item) => (
            <DropdownMenu.Item
              key={item.url}
              onClick={() => navigate({ to: item.url })}
              style={{ cursor: "pointer" }}
            >
              {item.title}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export { UserMenu };

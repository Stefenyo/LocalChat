import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Tooltip, Select, Separator } from "@radix-ui/themes";
import { FC } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ThemeConfig } from "@/hooks/useAppearance";

// TODO - move to do global state
interface Props {
  onThemeChange: (theme: ThemeConfig["bgGradient"]) => void;
  currentTheme: ThemeConfig["bgGradient"];
  themeList: string[];
}

const UserMenu: FC<Props> = ({ onThemeChange, currentTheme, themeList }) => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="row"
      gap="5"
      align="center"
      style={{ position: "fixed", top: "1.5rem", right: "1.5rem" }}
    >
      <Select.Root value={currentTheme} onValueChange={onThemeChange} size="1">
        <Select.Trigger
          placeholder="Apperance"
          variant="ghost"
          style={{ outline: "none" }}
        />
        <Select.Content>
          <Select.Group>
            <Select.Label style={{ outline: "none" }}>Appearance</Select.Label>
            {themeList.map((model) => (
              <Select.Item key={model} value={model}>
                {model}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Separator orientation="vertical" />
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
    </Flex>
  );
};

export { UserMenu };

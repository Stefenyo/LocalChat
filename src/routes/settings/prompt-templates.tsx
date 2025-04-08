import { BasePromptInput } from "@/components/BasePromptInput";
import { SubPromptTemplates } from "@/components/SubPromptTemplates/SubPromptTemplates";
import { Flex } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

const PromptTemplatesComponent = () => {
  return (
    <Flex direction="column" gap="6">
      <BasePromptInput />
      <SubPromptTemplates />
    </Flex>
  );
};

const Route = createFileRoute("/settings/prompt-templates")({
  component: PromptTemplatesComponent,
});

export { Route };

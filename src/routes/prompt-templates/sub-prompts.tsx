import { SubPromptTemplates } from "@/components/SubPromptTemplates/SubPromptTemplates";
import { createFileRoute } from "@tanstack/react-router";

const SubPromptsRouteComponent = () => {
  return <SubPromptTemplates />;
};

const Route = createFileRoute("/prompt-templates/sub-prompts")({
  component: SubPromptsRouteComponent,
});

export { Route };

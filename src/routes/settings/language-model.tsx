import { Card } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

const LanguageModelsComponent = () => {
  return <Card variant="surface">Language model options coming soon</Card>;
};

const Route = createFileRoute("/settings/language-model")({
  component: LanguageModelsComponent,
});

export { Route };

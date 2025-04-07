import { Card } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

const AppearanceComponent = () => {
  return <Card variant="surface">Appearance options coming soon</Card>;
};

const Route = createFileRoute("/settings/appearance")({
  component: AppearanceComponent,
});

export { Route };

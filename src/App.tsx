import { type FC } from "react";
import { Theme } from "@radix-ui/themes";
import { Chat } from "@/routes";

const App: FC = () => {
  return (
    <Theme appearance="dark" accentColor="red" radius="medium" scaling="100%">
      <Chat />
    </Theme>
  );
};

export { App };

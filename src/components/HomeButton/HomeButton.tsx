import type { FC } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useNavigate } from "@tanstack/react-router";

const HomeButton: FC = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      gap="5"
      style={{ position: "fixed", top: "1.5rem", left: "1.5rem" }}
    >
      <IconButton
        variant="soft"
        radius="large"
        size="3"
        style={{ cursor: "pointer" }}
        onClick={() => navigate({ to: "/" })}
      >
        <ArrowLeftIcon style={{ width: "18px", height: "18px" }} />
      </IconButton>
    </Flex>
  );
};

export { HomeButton };

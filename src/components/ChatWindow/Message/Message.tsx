import type { FC } from "react";
import { Text, Card, Flex, Avatar } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Wrapper, OutputContainer } from "./Message.styles";

interface Props {
  type: "Human" | "Ai";
  message: string;
}

const renderHumanMessage = (message: string) => (
  <div style={{ width: "fit-content" }}>
    <Card>
      <Flex gap="3">
        <Avatar fallback="U" size="1" />
        <Text size="2" color="gray">
          {message}
        </Text>
      </Flex>
    </Card>
  </div>
);
const renderAiMessage = (message: string) => {
  return (
    <OutputContainer>
      <ReactMarkdown>{message}</ReactMarkdown>
    </OutputContainer>
  );
};

const Message: FC<Props> = ({ type, message }) => {
  const isHuman = type === "Human";

  return (
    <Wrapper>
      {isHuman ? renderHumanMessage(message) : renderAiMessage(message)}
    </Wrapper>
  );
};

export { Message };
export type { Props as MessageProps };

import {
  useState,
  type FC,
  type KeyboardEvent,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { StyledFormWrapper } from "./Chat.styles";
import { Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { Message } from "@/components/Message";
import { StyledFlexContainer } from "@/components/StyledComponents/StyledFlexContainer";
import type { Document } from "langchain/document";
import { useSelectedModel } from "@/hooks/useSelectedModel";
import { ErrorMessage } from "../ErrorMessage";
import { Link } from "@tanstack/react-router";
import { useGetResponse } from "@/hooks/useGetResponse";
import { ChatInput } from "../ChatInput";

interface Message {
  type: "Human" | "Ai";
  message: string;
  sourceDocs?: Document[];
}

const Chat: FC = () => {
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { selectedModel } = useSelectedModel();
  const getResponse = useGetResponse();

  const chatHistory = useMemo(() => {
    return messages
      .map((message) => `${message.type}: ${message.message?.trim()}`)
      .join("\n");
  }, [messages]);

  const clearInput = () => (textAreaRef.current!.value = "");
  const focusInput = () => textAreaRef.current?.focus();

  focusInput();

  const clearUI = () => {
    setCurrentResponse("");
    clearInput();
  };

  const handleSubmit = async () => {
    const { value: userInput } = textAreaRef?.current ?? {};

    // console.log("userInput", textAreaRef?.current?.value);
    if (!userInput || !userInput?.trim()) return;

    console.log("userInput", textAreaRef?.current?.value);
    setMessages((state) => [...state, { type: "Human", message: userInput }]);

    clearUI();
    setIsLoading(true);

    try {
      const data = await getResponse({
        question: userInput,
        history: chatHistory,
      });

      setIsLoading(false);

      let aiResponse = "";
      for await (const chunk of data) {
        aiResponse += chunk.response;
        setCurrentResponse(aiResponse);
      }

      setMessages((state) => [...state, { type: "Ai", message: aiResponse }]);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching response:", error);
    }
  };

  useEffect(() => {
    if (!isLoading) focusInput();
  }, [isLoading]);

  // keep the chat scrolled to the bottom when new messages are added
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, [messages, currentResponse]);

  const renderIntro = () =>
    !messages.length ? (
      <Heading
        size="9"
        weight="medium"
        align="center"
        data-testid="intro-heading"
      >
        LocalChat
      </Heading>
    ) : null;

  const renderCurrentResponse = () =>
    currentResponse.length ? (
      <Message
        type="Ai"
        message={currentResponse}
        data-testid="lastest-Ai-response"
      />
    ) : null;

  const renderLoading = () => (isLoading ? <Spinner size="3" /> : null);

  const renderMessages = () => {
    return messages.map(({ type, message }, index) => {
      const isAiMessage = type === "Ai";
      const isLastMessage = messages.length === index + 1;

      // Don't render the lastest AI message. It will be rendered in a separate Message component
      // so that the reponse can be streamed in real-time.
      // TODO there may be a better way to handle this.
      if (isAiMessage && isLastMessage) {
        return null;
      }

      return (
        <Message
          key={index}
          type={type}
          message={message}
          data-testid={`${index + 1}-${type}-response`}
        />
      );
    });
  };

  const renderNoModelError = () =>
    !selectedModel ? (
      <ErrorMessage>
        No model selected. Please select a model in the{" "}
        <Link to="/settings/language-model" style={{ color: "var(--gray-12)" }}>
          settings menu
        </Link>
      </ErrorMessage>
    ) : null;

  return (
    <>
      {renderNoModelError()}
      <StyledFlexContainer align="center" justify="center" ref={containerRef}>
        <Flex direction="column" gap="8" flexGrow="1">
          {renderIntro()}
          {renderMessages()}
          {renderCurrentResponse()}
          {renderLoading()}
        </Flex>
      </StyledFlexContainer>
      <StyledFormWrapper variant="surface">
        <ChatInput
          maxHeight={200}
          mb="2"
          placeholder="How can I help you today?"
          ref={textAreaRef}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={!selectedModel || isLoading}
        />
        <Text size="1" style={{ color: "var(--gray-a9)" }}>
          Powered by ollama
        </Text>
      </StyledFormWrapper>
    </>
  );
};

export { Chat };

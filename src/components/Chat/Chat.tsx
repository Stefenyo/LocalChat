import {
  useState,
  type FC,
  type KeyboardEvent,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { StyledFormWrapper } from "./Chat.styles";
import { Flex, Heading, IconButton, Spinner } from "@radix-ui/themes";
import { Message } from "@/components/Message";
import { StyledFlexContainer } from "@/components/StyledComponents/StyledFlexContainer";
import type { Document } from "langchain/document";
import { useGetOllamaModels } from "@/hooks/useGetOllamaModels";
import { ErrorMessage } from "../ErrorMessage";
import { useGetResponse } from "@/hooks/useGetResponse";
import { ChatInput } from "../ChatInput";
import { ModelSelect } from "../ModelSelect";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface Message {
  type: "Human" | "Ai";
  message: string;
  sourceDocs?: Document[];
}

const Chat: FC = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { selectedModel, modelList, updateSelectedModel } =
    useGetOllamaModels();

  const getResponse = useGetResponse({ selectedModel });

  const chatHistory = useMemo(() => {
    return messages
      .map((message) => `${message.type}: ${message.message?.trim()}`)
      .join("\n");
  }, [messages]);

  const focusInput = () => textAreaRef.current?.focus();

  const clearUI = () => {
    setCurrentResponse("");
    setCurrentMessage("");
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

      let aiResponse = "";
      for await (const chunk of data) {
        aiResponse += chunk.response;
        setCurrentResponse(aiResponse);
      }

      setMessages((state) => [...state, { type: "Ai", message: aiResponse }]);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
      focusInput();
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
      <ErrorMessage>Please select a model to continue</ErrorMessage>
    ) : null;

  return (
    <>
      {renderNoModelError()}
      <StyledFlexContainer align="center" justify="center" ref={containerRef}>
        <Flex direction="column" gap="6" flexGrow="1">
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
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={!selectedModel || isLoading}
        />
        <Flex justify="between" align="center">
          <ModelSelect
            size="1"
            selectedModel={selectedModel}
            modelList={modelList}
            onModelChange={updateSelectedModel}
          />
          <IconButton
            size="2"
            disabled={
              !selectedModel || isLoading || !textAreaRef?.current?.value
            }
            onClick={handleSubmit}
            data-testid="submit-button"
            aria-label="Submit"
          >
            <PaperPlaneIcon />
          </IconButton>
        </Flex>
      </StyledFormWrapper>
    </>
  );
};

export { Chat };

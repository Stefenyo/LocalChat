import {
  useState,
  type FC,
  type KeyboardEvent,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Flex, Heading, IconButton, Spinner } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ModelSelect } from "@/components/ModelSelect";
import { StyledFlexContainer } from "@/components/StyledComponents/StyledFlexContainer";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { StyledFormWrapper } from "./ChatWindow.styles";
import { useGetOllamaModels } from "@/hooks/useGetOllamaModels";
import { useGetResponse } from "@/hooks/useGetResponse";
import { MessageProps } from "./Message/Message";

const ChatWindow: FC = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);

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
    if (!userInput || !userInput?.trim()) return;

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
        CAiO
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
        <Flex justify="between" align="center" pl="2" pr="2">
          <ModelSelect
            size="1"
            selectedModel={selectedModel}
            modelList={modelList}
            onModelChange={(model) => {
              updateSelectedModel(model);
              focusInput();
            }}
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

export { ChatWindow };

import { useState, type FC, type FocusEvent, useRef, useEffect, useMemo } from 'react';
import { StyledFlex, StyledFormWrapper } from './Chat.styles';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { getResponse } from '@/utils';
import { SearchInput } from '@/components';
import { LoadingGif } from '@/components';
import { Message } from './Message';
import type { Document } from 'langchain/document';
import { BackgroundScene } from '@/components/scenes';

interface Message {
  type: 'Human' | 'Ai';
  message: string;
  sourceDocs?: Document[];
}

const Chat: FC = () => {
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const backgroundBrightness = messages.length ? 0.65 : 1;

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chatHistory = useMemo(() => {
    return messages.map((message) => `${message.type}: ${message.message?.trim()}`).join('\n');
  }, [messages]);

  const clearInput = () => (inputRef.current!.value = '');
  const focusInput = () => inputRef.current?.focus();

  focusInput();

  const clearUI = () => {
    setCurrentResponse('');
    clearInput();
  };

  const handleSubmit = async (e: FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { value: userInput } = inputRef?.current ?? {};
    if (!userInput || !userInput?.trim()) return;

    setMessages((state) => [...state, { type: 'Human', message: userInput }]);

    clearUI();
    setIsLoading(true);

    try {
      const data = await getResponse({ question: userInput, history: chatHistory });

      setIsLoading(false);

      let aiResponse = '';
      for await (const chunk of data) {
        aiResponse += chunk.response;
        setCurrentResponse(aiResponse);
      }

      setMessages((state) => [...state, { type: 'Ai', message: aiResponse }]);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching response:', error);
    }
  };

  useEffect(() => {
    if (!isLoading) focusInput();
  }, [isLoading]);

  // keep the chat scrolled to the bottom when new messages are added
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
  }, [messages, currentResponse]);

  const renderIntro = () =>
    !messages.length ? (
      <Heading size="9" weight="medium" align="center" data-testid="intro-heading">
        NoMo Content Generator
      </Heading>
    ) : null;

  const renderCurrentResponse = () =>
    currentResponse.length ? (
      <Message type="Ai" message={currentResponse} data-testid="lastest-Ai-response" />
    ) : null;

  const renderLoading = () => (isLoading ? <LoadingGif /> : null);

  const renderMessages = () => {
    return messages.map(({ type, message }, index) => {
      const isAiMessage = type === 'Ai';
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

  return (
    <>
      <StyledFlex align="center" justify="center" ref={containerRef}>
        <Flex direction="column" gap="4" flexGrow="1">
          {renderIntro()}
          {renderMessages()}
          {renderCurrentResponse()}
          {renderLoading()}
        </Flex>
      </StyledFlex>
      <StyledFormWrapper variant="surface">
        <form onSubmit={handleSubmit}>
          <SearchInput
            placeholder="Search the docs…"
            ref={inputRef}
            disabled={isLoading}
            inputMode="text"
            size="3"
            mb="4"
            data-testid="search-input"
          />
        </form>
        <Text size="1" style={{ color: 'var(--gray-a9)' }}>
          Powered by a fine-tuned (Work in progress) Qwen2.5-7B model.
        </Text>
      </StyledFormWrapper>
      <BackgroundScene brightness={backgroundBrightness} />
    </>
  );
};

export { Chat };

import type { FC } from 'react';
import { Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import { Wrapper, StyledAvatar, OutputContainer } from './Message.styles';
import UserIcon from '@/assets/User.png';
import AiIcon from '@/assets/Ai.png';

interface Props {
  type: 'Human' | 'Ai';
  message: string;
}

const Message: FC<Props> = ({ type, message, ...rest }) => {
  const isHuman = type === 'Human';
  const renderHumanMessage = () => (
    <Text size="3" color="gray" {...rest}>
      {message}
    </Text>
  );
  const renderAiMessage = () => {
    return (
      <OutputContainer variant="surface" size="2" {...rest}>
        <ReactMarkdown>{message}</ReactMarkdown>
      </OutputContainer>
    );
  };

  return (
    <Wrapper>
      <StyledAvatar
        size="1"
        src={isHuman ? UserIcon : AiIcon}
        fallback={isHuman ? 'U' : 'Ai'}
        color={isHuman ? 'gray' : 'teal'}
        mt={isHuman ? '0' : '4'}
      />
      {isHuman ? renderHumanMessage() : renderAiMessage()}
    </Wrapper>
  );
};

export { Message };
export type { Props as MessageProps };

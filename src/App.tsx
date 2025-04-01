import { type FC } from 'react';
import { Theme } from '@radix-ui/themes';
import { Chat } from '@/routes';

const App: FC = () => {
  return (
    <Theme appearance="dark" accentColor="red" radius="none" scaling="100%" hasBackground={false}>
      <Chat />
    </Theme>
  );
};

export { App };

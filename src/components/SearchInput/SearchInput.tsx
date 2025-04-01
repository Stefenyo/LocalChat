import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { forwardRef } from 'react';

const SearchInput = forwardRef<
  React.ElementRef<typeof TextField.Root>,
  React.ComponentPropsWithoutRef<typeof TextField.Root>
>(({ ...props }, ref) => (
  <TextField.Root {...props} ref={ref}>
    <TextField.Slot>
      <MagnifyingGlassIcon height="16" width="16" />
    </TextField.Slot>
  </TextField.Root>
));

SearchInput.displayName = TextField.Root.displayName;

export { SearchInput };

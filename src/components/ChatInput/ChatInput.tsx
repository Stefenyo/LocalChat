import { TextArea } from "@radix-ui/themes";
import * as React from "react";
import { StyledTextArea } from "./ChatInput.style";

export interface Props extends React.ComponentPropsWithoutRef<typeof TextArea> {
  maxHeight?: number;
}

export const ChatInput = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ maxHeight = 400, onInput, ...props }, ref) => {
    const localRef = React.useRef<HTMLTextAreaElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.RefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref]
    );

    const resize = React.useCallback(() => {
      const el = localRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }, [maxHeight]);

    React.useEffect(() => {
      resize();
    }, [props.value, resize]);

    return (
      <StyledTextArea
        {...props}
        ref={setRefs}
        onInput={(e) => {
          resize();
          onInput?.(e);
        }}
        style={{
          maxHeight,
          ...props.style,
        }}
      />
    );
  }
);

ChatInput.displayName = "ChatInput";

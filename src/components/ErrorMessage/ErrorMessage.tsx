import { type FC } from "react";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ErrorWrapper } from "./ErrorMessage.styles";

interface Props {
  children: React.ReactNode;
}

const ErrorMessage: FC<Props> = ({ children }) => {
  return (
    <ErrorWrapper>
      <Callout.Root variant="soft">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{children}</Callout.Text>
      </Callout.Root>
    </ErrorWrapper>
  );
};
export { ErrorMessage };

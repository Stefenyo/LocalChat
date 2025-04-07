import styled from "styled-components";
import { Card } from "@radix-ui/themes";

const MAX_WIDTH = "45rem";

export const StyledFormWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MAX_WIDTH};
  justify-content: center;
  position: fixed;
  bottom: -8px;
  padding-bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  right: 0;

  span {
    text-align: center;
  }
`;

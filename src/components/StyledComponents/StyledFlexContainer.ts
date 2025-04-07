import styled from "styled-components";
import { Flex } from "@radix-ui/themes";

const MAX_WIDTH = "45rem";

const StyledFlexContainer = styled(Flex)`
  min-height: 100vh;
  padding: 10rem 0rem 10rem;
  max-width: ${MAX_WIDTH};
  width: 100%;
  margin: 0 auto;
`;

export { StyledFlexContainer };

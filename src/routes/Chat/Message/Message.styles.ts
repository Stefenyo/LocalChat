import styled from 'styled-components';
import { Avatar, Card } from '@radix-ui/themes';

export const Wrapper = styled.div`
  position: relative;
`;

export const StyledAvatar = styled(Avatar)`
  position: absolute;
  left: -45px;
  box-shadow:
    0 5px 10px -3px rgba(0, 0, 0, 0.1),
    0 0px 9px -3px rgba(0, 0, 0, 0.15);
`;

export const OutputContainer = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  margin-bottom: 1.5rem;

  h1 {
    font-size: calc(var(--font-size-8) * var(--heading-font-size-adjust));
    --line-height: var(--heading-line-height-8);
    letter-spacing: calc(var(--letter-spacing-8) + var(--heading-letter-spacing));
    margin: 0;
    font-family: var(--heading-font-family);
    font-style: var(--heading-font-style);
    --leading-trim-start: var(--heading-leading-trim-start);
    --leading-trim-end: var(--heading-leading-trim-end);
    line-height: var(--line-height);
    margin-bottom: 2rem;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    padding-left: 25px;
  }

  p {
    font-size: 1rem;
    line-height: 140%;
  }

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ol li > ul,
  ul li > ul {
    margin: 1rem 0;
  }

  li {
    margin-bottom: 1rem;
  }

  li > p {
    margin-bottom: 0;
  }

  em {
    font-size: 14px;
    color: var(--gray-a9);
    a {
      color: var(--focus-8);
    }
  }

  pre {
    white-space: pre-line;
  }
`;

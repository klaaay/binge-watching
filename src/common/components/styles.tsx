import styled, { css } from 'styled-components';

export const flexCenter = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const bgCommon = (fit = 'cover') => css`
  background-size: ${fit};
  background-position: center;
  background-repeat: no-repeat;
`;

export const scrollbarNone = () => css`
  overflow: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const PageWrapper = styled.div`
  width: var(--popup-width);
`;

export const Title = styled.h2`
  color: var(--primary-color);
  margin-top: 0px;
`;

export const SectionTitle = styled.h4`
  color: var(--primary-color);
`;

export const Input = styled.input`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--black);
  outline: none;

  &:focus {
    border: 1px solid var(--primary-color);
  }
`;

export const Button = styled.div<{
  type?: 'default' | 'primary' | 'danger' | 'success';
}>`
  color: var(--primary-color);
  background-color: var(--white);
  border: var(--border-width-base) solid var(--primary-color);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  width: 65px;
  height: 24px;
  ${flexCenter()}
  ${props =>
    props.type == 'primary' &&
    css`
      background-color: var(--primary-color);
      color: var(--white);
    `}
  ${props =>
    props.type == 'danger' &&
    css`
      background-color: var(--error-color);
      border: var(--border-width-base) solid var(--error-color);
      color: var(--white);
    `}
  ${props =>
    props.type == 'success' &&
    css`
      background-color: var(--success-color);
      border: var(--border-width-base) solid var(--success-color);
      color: var(--white);
    `}
`;

export const Flex = styled.div<{
  center?: boolean;
  alignCenter?: boolean;
  gap?: number;
}>`
  display: flex;
  ${props =>
    props.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
  ${props =>
    props.alignCenter &&
    css`
      align-items: center;
    `}

  ${props =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `}
`;

export const Icon = styled.div<{
  type?: 'default' | 'primary';
}>`
  display: inline-block;
  color: var(--font-color-0);
  background-color: var(--white);
  border-color: var(--primary-color);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-base);
  align-items: center;
  ${props =>
    props.type == 'primary' &&
    css`
      background-color: var(--primary-color);
      color: var(--white);
    `}
`;

export const Link = styled.a`
  text-decoration: none;
  color: var(--primary-color);
`;

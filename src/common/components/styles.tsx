import styled, { css } from 'styled-components';

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageWrapper = styled.div`
  width: 400px;
  height: 75px;
  padding: 2px;
`;

export const Title = styled.h1`
  color: var(--primary-color);
`;

export const Input = styled.input``;

export const Button = styled.div<{
  type?: 'default' | 'primary';
}>`
  color: var(--primary-color);
  background-color: var(--white);
  border: var(--border-width-base) solid var(--primary-color);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  ${props =>
    props.type == 'primary' &&
    css`
      background-color: var(--primary-color);
      color: var(--white);
    `}
`;

export const Flex = styled.div<{
  center?: boolean;
  alignCenter?: boolean;
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

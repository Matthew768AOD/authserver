import React, { type ReactNode, type HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'filled' | 'outlined';
type Shadow = 'none' | 'sm' | 'md' | 'lg';

type StyleProps = {
  $variant?: Variant;
  $shadow?: Shadow;
};

export type CardProps = {
  children: ReactNode;
  variant?: Variant;
  shadow?: Shadow;
} & HTMLAttributes<HTMLDivElement>;

const StyledCard = styled.div<StyleProps>`
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 16px;
    padding: ${({ theme }) => theme.spacing.large};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.medium};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    /* Styly pro variantu */
    ${({ theme, $variant, $shadow }) =>
    $variant === 'filled' &&
    $shadow !== 'none' &&
    css`
      box-shadow: ${theme.shadows[$shadow || 'md']};
    `}

  /* Styly pro OUTLINED variantu */
  ${({ theme, $variant, $shadow }) =>
    $variant === 'outlined' &&
    css`
      border: 4px solid ${theme.colors.primary};
      background-color: transparent;
    `}
`;

export const Card = ({
  children,
  variant = 'filled',
  shadow = 'md',
  ...props
}: CardProps) => {
  return (
    <StyledCard $variant={variant} $shadow={shadow} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
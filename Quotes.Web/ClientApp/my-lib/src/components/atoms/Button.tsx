import styled, { css } from 'styled-components';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Typography } from './Typography';
import { defaultTheme } from '../../styles/theme';

type Variant = 'primary' | 'ghost' | 'secondary';
type Size = 'small' | 'medium' | 'large';

type StyleProps = {
  $variant: Variant;
  $size: Size;
};

export type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  typographyVariant?: keyof typeof defaultTheme.typography;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.main};
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.buttonText};
          border-radius: 8px;
          border: 1px solid ${theme.colors.secondary};
          box-shadow: ${theme.shadows.md};
          &:hover {
            background-color: ${theme.colors.hover};
            color: ${theme.colors.primary};
            box-shadow: ${theme.shadows.md};
            border: none;
          }
        `;
      case 'secondary':
        return css`
          color: ${theme.colors.text};
          border-radius: 8px;
          border: 3px solid ${theme.colors.primary};

          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.buttonText};
            box-shadow: ${theme.shadows.md};
          }
        `;
    }
  }}

  /* --- Zde doplňte styly pro VELIKOSTI --- */
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: 8px 16px;
          /* např. pro úpravu font-size v Typography níže */
        `;
      case 'medium':
        return css`
          padding: 12px 16px;
        `;
      case 'large':
        return css`
          padding: 16px 20px;
        `;
    }
  }}


`;

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  typographyVariant,
  ...props
}: ButtonProps) => {
  const getTypographyVariant = () => {
    if (typographyVariant) {
      return typographyVariant;
    }
    switch (size) {
      case 'small':
        return 'textSmall';
      case 'large':
        return 'textExtraLarge';
      case 'medium':
      default:
        return 'textLarge';
    }
  };

  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      <Typography variant={getTypographyVariant()} >{children}</Typography>
    </StyledButton>
  );
};
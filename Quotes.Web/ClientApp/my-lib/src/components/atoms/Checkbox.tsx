import React from 'react';
import type { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { Typography } from './Typography';
import { defaultTheme } from '../../styles/theme';

type Variant = 'primary' | 'secondary';
type Size = 'small' | 'big';

export type CheckboxProps = {
title?: React.ReactNode;
checked?: boolean;
onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
variant?: Variant;
size?: Size;
className?: string;
};

const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.typography.textLarge.fontSize};
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  width: 0px;
`;

const Box = styled.span<{ $size: Size; $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ $size }) => ($size === 'small' ? '20px' : '30px')};
  height: ${({ $size }) => ($size === 'small' ? '20px' : '30px')};
  border-radius: ${({ $size }) => ($size === 'small' ? '6px' : '8px')};
  transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 120ms ease;

  svg {
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(0.6);
    transition: transform 160ms ease, opacity 160ms ease;
    stroke-linecap: square;
    stroke-linejoin: square;
    stroke-width: 2.6;
  }

  ${({ theme, $variant }) =>
    $variant === 'primary'
      ? css`
          background: transparent;
          border: 1.6px solid ${theme.colors.primary ?? '#333'};
        `
      : css`
          background: transparent;
          border: 1.6px solid ${theme.colors.secondary ?? theme.colors.primary ?? '#777'};
        `}

  ${HiddenCheckbox}:checked + & {
    background: ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
    /* tohle je myslím k ničemu
    border-color: ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.buttonColor : theme.colors.buttonText};
    */

    svg {
      opacity: 1;
      transform: scale(1);
      stroke: ${({ theme, $variant }) =>
        $variant === 'primary' ? theme.colors.background : theme.colors.background};
    }

    box-shadow: ${({ theme }) => theme.shadows.boxShadow ?? '0 6px 18px rgba(0,0,0,0.12)'};
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme }) => theme.shadows.boxShadowHover ?? '0 0 0 4px rgba(0,0,0,0.08)'};
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({ 
  title, 
  size = "small", 
  variant = "primary", 
  className, 
  ...props 
}) => { 
  return ( 
    <Label className={className}> 
      <HiddenCheckbox
        {...props}
        onChange={(e) => props.onChange?.(e.target.checked, e)}
      />
      <Box $size={size} $variant={variant}> 
        <svg viewBox="0 0 25 22" fill="none"> 
          <polyline points="20 6 9 17 4 12" /> 
        </svg> 
      </Box> 
      {title && <Title>{title}</Title>} 
    </Label> 
  ); 
};
import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '../../styles/theme';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonColor};
  color: ${({ theme }) =>
    theme.colors.buttonColor === theme.colors.surface
      ? theme.colors.text
      : theme.colors.surface}; // text kontrastní vůči pozadí
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.typography.textSmall.fontWeight};
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border: 2px solid
    ${({ theme }) =>
      theme.colors.buttonColor === theme.colors.surface
        ? theme.colors.text
        : theme.colors.surface};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  transition: all 0.2s ease;
 background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text}; 
    border-color: ${({ theme }) => theme.colors.text};
   
  &:hover {
  border-color: ${({ theme }) => theme.colors.error};
 border: 3px solid.


`;

type Props = {
  onClick: () => void;
};

export const EditBudgetButton = ({ onClick }: Props) => (
  <StyledButton onClick={onClick}>Edit Budget</StyledButton>
);

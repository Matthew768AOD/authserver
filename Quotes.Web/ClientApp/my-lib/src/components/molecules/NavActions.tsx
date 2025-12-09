import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../atoms/IconButton';

export type NavActionsProps = {
  variant?: 'light' | 'dark';
  onThemeToggle?: () => void;
  cartItemCount?: number;
};

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavActions: React.FC<NavActionsProps> = ({ 
  variant = 'light',
  onThemeToggle,
  cartItemCount = 2
}) => {
  const iconColor = variant === 'light' ? '#000000' : '#ffffff';
  
  return (
    <ActionsContainer>
      <IconButton 
        iconName={variant === 'light' ? 'Moon' : 'Sun'}
        size={24}
        color={iconColor}
        onClick={onThemeToggle}
      />
      <IconButton 
        iconName="Home"
        size={24}
        color={iconColor}
      />
      <IconButton 
        iconName="ShoppingCart"
        size={24}
        color={iconColor}
        badge={cartItemCount}
      />
    </ActionsContainer>
  );
};


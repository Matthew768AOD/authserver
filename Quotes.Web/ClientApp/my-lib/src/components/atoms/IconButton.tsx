import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import * as LucideIcons from 'lucide-react';

export type IconButtonProps = {
  iconName: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  badge?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  transition: opacity 0.3s;
  position: relative;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #e6007e;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 0 4px;
`;

export const IconButton: React.FC<IconButtonProps> = ({ 
  iconName, 
  size = 24, 
  color, 
  badge,
  ...props 
}) => {
  return (
    <StyledIconButton {...props}>
      <Icon name={iconName} size={size} color={color} />
      {badge !== undefined && badge > 0 && <Badge>{badge}</Badge>}
    </StyledIconButton>
  );
};


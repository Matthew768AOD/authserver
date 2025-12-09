import React from 'react';
import styled from 'styled-components';
import { Logo } from '../atoms/Logo';
import { NavMenu } from '../molecules/NavMenu';
import type { NavMenuItem } from '../molecules/NavMenu';
import { NavActions } from '../molecules/NavActions';

export type NavbarProps = {
  variant?: 'light' | 'dark';
  onThemeToggle?: () => void;
  menuItems?: NavMenuItem[];
  cartItemCount?: number;
};

const Nav = styled.nav<{ $variant: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${({ $variant }) => 
    $variant === 'light' ? '#ffffff' : '#000000'};
  color: ${({ $variant }) => 
    $variant === 'light' ? '#000000' : '#ffffff'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const defaultMenuItems: NavMenuItem[] = [
  { label: 'New Releases', href: '#new-releases' },
  { label: 'Men', href: '#men' },
  { label: 'Women', href: '#women' },
  { label: 'Stories', href: '#stories' },
];

export const Navbar: React.FC<NavbarProps> = ({ 
  variant = 'light',
  onThemeToggle,
  menuItems = defaultMenuItems,
  cartItemCount = 2
}) => {
  const iconColor = variant === 'light' ? '#000000' : '#ffffff';
  
  return (
    <Nav $variant={variant}>
      <Logo 
        iconSize={32} 
        iconColor={iconColor}
        text="Company"
      />
      
      <NavMenu items={menuItems} variant={variant} />
      
      <NavActions 
        variant={variant}
        onThemeToggle={onThemeToggle}
        cartItemCount={cartItemCount}
      />
    </Nav>
  );
};


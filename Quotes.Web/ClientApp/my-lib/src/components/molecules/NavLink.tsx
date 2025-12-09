import React from 'react';
import styled from 'styled-components';

export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark';
};

const StyledNavLink = styled.a<{ $variant: 'light' | 'dark' }>`
  text-decoration: none;
  color: ${({ $variant }) => 
    $variant === 'light' ? '#000000' : '#ffffff'};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 16px;
  font-weight: 400;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  variant = 'light' 
}) => {
  return (
    <StyledNavLink href={href} $variant={variant}>
      {children}
    </StyledNavLink>
  );
};


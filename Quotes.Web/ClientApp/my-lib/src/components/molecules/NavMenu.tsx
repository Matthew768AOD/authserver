import React from 'react';
import styled from 'styled-components';
import { NavLink } from './NavLink';

export type NavMenuItem = {
  label: string;
  href: string;
};

export type NavMenuProps = {
  items: NavMenuItem[];
  variant?: 'light' | 'dark';
};

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 0;
`;

export const NavMenu: React.FC<NavMenuProps> = ({ items, variant = 'light' }) => {
  return (
    <MenuList>
      {items.map((item, index) => (
        <MenuItem key={index}>
          <NavLink href={item.href} variant={variant}>
            {item.label}
          </NavLink>
        </MenuItem>
      ))}
    </MenuList>
  );
};


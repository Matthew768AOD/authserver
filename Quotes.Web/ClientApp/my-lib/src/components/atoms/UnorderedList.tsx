import React from 'react';
import styled from 'styled-components';

export type UnorderedListProps = {
  items: string[];
  className?: string;
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 400px;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.typography.textLarge.fontSize};
  font-weight: ${({ theme }) => theme.typography.textLarge.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.medium} 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.textSmall.fontWeight};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.small};
`;

const Bullet = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const UnorderedList: React.FC<UnorderedListProps> = ({ items, className }) => {
  return (
    <Container className={className}>
      <Title>Unordered List (UL)</Title>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Bullet />
            {item}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};


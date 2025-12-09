import React from 'react';
import styled from 'styled-components';

export type OrderedListProps = {
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

const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: list-counter;
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
  counter-increment: list-counter;
`;

const Number = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.textLarge.fontWeight};

  &::before {
    content: counter(list-counter);
  }
`;

export const OrderedList: React.FC<OrderedListProps> = ({ items, className }) => {
  return (
    <Container className={className}>
      <Title>Ordered List (OL)</Title>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Number />
            {item}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};


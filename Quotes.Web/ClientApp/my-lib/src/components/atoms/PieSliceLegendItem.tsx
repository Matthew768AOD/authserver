import styled from 'styled-components';
import { Typography } from './Typography';

type PieSliceLegendItemProps = {
  color: string;
  label: string;
  percent: number;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ColorBlock = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.colors.background};
`;

export const PieSliceLegendItem = ({ color, label, percent }: PieSliceLegendItemProps) => {
  return (
    <Container>
      <ColorBlock color={color} />
      <Typography variant="textSmall">{label}</Typography>
      <Typography variant="textSmall">{percent}%</Typography>
    </Container>
  );
};

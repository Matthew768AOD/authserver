// PieChartWithLegend.tsx
import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieSliceLegendItem } from '../atoms/PieSliceLegendItem';
import { FaCoins } from 'react-icons/fa';
import { Button } from '../atoms/Button';
import { handleAddTransaction, handleEditBudget } from '../atoms/transactionLogic';

type PieChartWithLegendProps = {
  data: { label: string; value: number; color: string }[];
  size?: number;
  totalBudget: number;
  currency?: string;
  onAddTransaction: (label: string, value: number) => void;
  onEditBudget: (newBudget: number) => void;
};

// --- styled components ---
const Card = styled.div<{ $isLight?: boolean }>`
  box-shadow: ${({ theme }) => theme.shadows.boxShadow || "0 2px 8px rgba(0,0,0,0.12)"};
  width: 400px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 4px solid
    ${({ theme, $isLight }) =>
      $isLight
        ? theme.colors.text
        : theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
  justify-content: center;
`;

const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const CashAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${({ theme }) => theme.typography.textLarge.fontWeight};
  font-size: ${({ theme }) => theme.typography.textLarge.fontSize};
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
`;

const CashSubLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.textSmall.fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const SummaryContainer = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const PieChartWithLegend = ({
  data,
  size = 200,
  totalBudget,
  currency = '$',
  onAddTransaction,
  onEditBudget,
}: PieChartWithLegendProps) => {
  const totalExpenses = data.reduce((acc, item) => acc + item.value, 0);
  const remainingExpenses = totalBudget - totalExpenses;

  return (
    <Card $isLight={true}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <PieChart width={size} height={size}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={size / 2 - 10}
            innerRadius={size / 3}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#00000033" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              `${value} (${((value / totalBudget) * 100).toFixed(1)}%)`
            }
          />
        </PieChart>

        <CenterLabel>
          <CashAmount>
            <FaCoins color="#ffc107" size={24} />
            {currency} {remainingExpenses}
            <CashSubLabel>Remaining Expenses</CashSubLabel>
          </CashAmount>
        </CenterLabel>
      </div>

      <LegendContainer>
        {data.map((entry, index) => (
          <PieSliceLegendItem
            key={index}
            color={entry.color}
            label={entry.label}
            percent={Math.round((entry.value / totalBudget) * 100)}
          />
        ))}
      </LegendContainer>

      <SummaryContainer>
        <SummaryRow>
          <span>Total Budget:</span>
          <span>{currency} {totalBudget}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Total Expenses:</span>
          <span>{currency} {totalExpenses}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Remaining Expenses:</span>
          <span>{currency} {remainingExpenses}</span>
        </SummaryRow>
      </SummaryContainer>

      <ButtonsContainer>
        <Button variant="primary" size="medium" onClick={() => handleEditBudget(onEditBudget)}>
          Edit Budget
        </Button>
        <Button variant="primary" size="medium" onClick={() => handleAddTransaction(onAddTransaction)}>
          Add Transaction
        </Button>
      </ButtonsContainer>
    </Card>
  );
};

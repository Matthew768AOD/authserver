// transactionLogic.ts
export const handleAddTransaction = (onAddTransaction: (label: string, value: number) => void) => {
  const label = prompt('Transaction name:');
  const valueStr = prompt('Cost:');
  if (!label || !valueStr) return;
  const value = parseFloat(valueStr);
  if (isNaN(value)) return alert('Invalid number');
  onAddTransaction(label, value);
};

export const handleEditBudget = (onEditBudget: (newBudget: number) => void) => {
  const newBudgetStr = prompt('New total budget:');
  if (!newBudgetStr) return;
  const newBudget = parseFloat(newBudgetStr);
  if (isNaN(newBudget)) return alert('Invalid number');
  onEditBudget(newBudget);
};

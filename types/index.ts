export type CreateBudgetType = {
  name: string;
  amount: number;
  createdBy: string;
  icon: string;
};

export type BudgetItem = {
  id: string;
  name: string;
  amount: number;
  icon: string | null;
  createdBy: string;
  totalSpend: number;
  totalItem: number;
};

export type BudgetListType = BudgetItem[];

export type AddExpenseType = {
  name: string;
  amount: number;
  createdAt: string;
  budgetId: string;
};

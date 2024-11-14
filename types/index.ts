export type CreateBudgetType = {
  name: string;
  amount: number;
  createdBy: string;
  icon: string;
};

export type BudgetItem = {
  emojiIcon?: string;
  id: string | undefined;
  name: string | undefined;
  amount: number | undefined;
  icon: string | null | undefined;
  createdBy: string | undefined;
  totalSpend: number | undefined;
  totalItem: number | undefined;
};

export type BudgetListType = BudgetItem[];

export type AddExpenseType = {
  name: string;
  amount: number;
  createdBy: string;
  budgetId: string;
};

export type ExpenseInfo = {
  id: string;
  name: string;
  amount: number;
  budgetId: string;
  createdBy: string;
  createdAt: Date;
};

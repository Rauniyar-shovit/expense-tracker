export type CreateBudgetType = {
  name: string;
  amount: number;
  createdBy: string;
  icon: string;
};

export type BudgetListType = {
  createdBy: string;
  name: string;
  totalItem: number;
  totalSpend: number;
  _id: string;
}[];

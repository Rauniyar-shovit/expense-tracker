"use server";

import { AddExpenseType, CreateBudgetType } from "@/types";
import prismadb from "../../lib/prismadb";

export const checkUserBudgets = async (email: string | undefined) => {
  const budgets = await prismadb?.budget.findMany({
    where: {
      createdBy: email,
    },
  });

  return budgets;
};

export const createBudget = async ({
  name,
  amount,
  createdBy,
  icon,
}: CreateBudgetType) => {
  const budgetList = await prismadb?.budget.create({
    data: {
      name,
      amount,
      createdBy,
      icon,
    },
  });

  return budgetList;
};

export const fetchBudgetList = async (email?: string) => {
  const results = await prismadb.budget.findMany({
    where: {
      createdBy: email,
    },
    include: {
      expenses: {
        select: {
          amount: true,
        },
      },
    },
    orderBy: {
      amount: "desc",
    },
  });

  const budgetList = results.map((budget) => ({
    id: budget.id,
    name: budget.name,
    amount: budget.amount,
    icon: budget.icon,
    createdBy: budget.createdBy,
    totalSpend: budget.expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    ),
    totalItem: budget.expenses.length,
  }));

  return budgetList;
};

export const getBudgetById = async (budegtId: string, email: string) => {
  const result = await prismadb.budget.findUnique({
    where: {
      createdBy: email,
      id: budegtId,
    },
    include: {
      expenses: {
        select: {
          amount: true,
        },
      },
    },
  });

  const budgetInfo = {
    id: result?.id,
    name: result?.name,
    amount: result?.amount,
    icon: result?.icon,
    createdBy: result?.createdBy,
    totalSpend: result?.expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    ),
    totalItem: result?.expenses.length,
  };

  return budgetInfo;
};

export const addExpense = async ({
  name,
  amount,
  createdBy,
  budgetId,
}: AddExpenseType) => {
  const expense = await prismadb?.expenses.create({
    data: {
      name,
      amount,
      createdBy,
      budgetId,
    },
  });

  return expense;
};

export const getExpensesList = async (budegtId: string) => {
  const expenses = await prismadb.expenses.findMany({
    where: {
      budgetId: budegtId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return expenses;
};

export const deleteExpense = async (expenseId: string) => {
  const expenses = await prismadb.expenses.delete({
    where: {
      id: expenseId,
    },
  });

  return expenses;
};

export const updateExpense = async (
  name: string,
  amount: number,
  id: string
) => {
  const expenses = await prismadb.expenses.update({
    where: {
      id,
    },
    data: { name, amount },
  });

  return expenses;
};

export const deleteExpenses = async (budgetId: string) => {
  const expenses = await prismadb.expenses.deleteMany({
    where: {
      budgetId: budgetId,
    },
  });

  return expenses;
};

export const deleteBudget = async (budgetId: string) => {
  const budget = await prismadb.budget.delete({
    where: {
      id: budgetId,
    },
  });

  return budget;
};

export const updateBudget = async (
  name: string,
  amount: number,
  icon: string,
  id: string
) => {
  const budgetList = await prismadb?.budget.update({
    data: {
      name,
      amount,
      icon,
    },
    where: {
      id: id,
    },
  });

  return budgetList;
};

export const fetchExpensesList = async (email?: string) => {
  const expensesList = await prismadb?.expenses.findMany({
    where: {
      createdBy: email,
    },

    select: {
      id: true,
      name: true,
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return expensesList;
};

"use server";

import { CreateBudgetType } from "@/types";
import prismadb from "../../lib/prismadb";

export const checkUserBudgets = async (email: string | undefined) => {
  const result = await prismadb?.budget.findMany({
    where: {
      createdBy: email,
    },
  });

  return result?.length == 0;
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
  const results = await prismadb.budget.findMany({
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
    orderBy: {
      amount: "desc",
    },
  });

  const budgetInfo = results.map((budget) => ({
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

  return budgetInfo[0];
};

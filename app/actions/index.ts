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

  console.log(results);

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

export const getBudgetInfo = async (budegtId: string, email: string) => {
  const budgetInfo = await prismadb.budget.aggregateRaw({
    pipeline: [
      {
        $match: {
          createdBy: email,
          _id: budegtId,
        },
      },
      {
        $lookup: {
          from: "Expenses",
          localField: "_id",
          foreignField: "budgetId",
          as: "expenses",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          amount: 1,
          icon: 1,
          createdBy: 1,
          totalSpend: { $sum: "$expenses.amount" },
          totalItem: { $size: "$expenses" },
        },
      },
    ],
  });

  return budgetInfo;
};

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
  const results = await prismadb.budget.aggregateRaw({
    pipeline: [
      {
        $match: {
          createdBy: email,
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
  return Object.values(results);
};

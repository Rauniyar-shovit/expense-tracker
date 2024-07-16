"use client";

import { getBudgetById, getExpensesList } from "@/app/actions";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import { useUser } from "@clerk/nextjs";
import { BudgetItem as BudgetItemType, ExpenseInfo } from "@/types";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const Expenses = ({ params: { id } }: { params: { id: string } }) => {
  const [budgetInfo, setBudgetInfo] = useState<BudgetItemType | null>(null);

  const [expenseList, setExpenseList] = useState<ExpenseInfo[] | []>([]);
  const { user } = useUser();

  useEffect(() => {
    user && fetchBudgetData();
    user && fetchExpensesList();
  }, [user]);

  // get budget information
  const fetchBudgetData = async () => {
    try {
      const budgetInfo = await getBudgetById(
        id,
        user?.primaryEmailAddress?.emailAddress!
      );
      setBudgetInfo(budgetInfo);
      fetchExpensesList();
    } catch (error) {
      console.error(error);
    }
  };

  // get latest expenses
  const fetchExpensesList = async () => {
    const expenses = await getExpensesList(id);
    setExpenseList(expenses);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <Button className="flex gap-2" variant={"destructive"}>
          <Trash />
          Delete
        </Button>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem
            id={budgetInfo.id}
            name={budgetInfo.name}
            amount={budgetInfo.amount}
            icon={budgetInfo.icon}
            createdBy={budgetInfo.createdBy}
            totalItem={budgetInfo.totalItem}
            totalSpend={budgetInfo.totalSpend}
          />
        ) : (
          <div>
            <div className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"></div>
          </div>
        )}
        <AddExpense
          budgetId={id}
          email={user?.primaryEmailAddress?.emailAddress!}
          refreshData={() => fetchBudgetData()}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList}
          refreshData={() => fetchBudgetData()}
        />
      </div>
    </div>
  );
};

export default Expenses;

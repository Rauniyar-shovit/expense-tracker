"use client";
import { getBudgetById } from "@/app/actions";
import { User } from "@clerk/nextjs/server";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import { useUser } from "@clerk/nextjs";
import { BudgetItem as BudgetItemType } from "@/types";

const Expenses = ({ params: { id } }: { params: { id: string } }) => {
  const [budgetInfo, setBudgetInfo] = useState<BudgetItemType | null>(null);
  const { user } = useUser();

  useEffect(() => {
    user && fetchBudgetData();
  }, [user]);

  const fetchBudgetData = async () => {
    const budgetInfo = await getBudgetById(
      id,
      user?.primaryEmailAddress?.emailAddress!
    );
    setBudgetInfo(budgetInfo);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">My Expenses</h2>
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
        />
      </div>
    </div>
  );
};

export default Expenses;

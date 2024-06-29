"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { fetchBudgetList } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import { BudgetListType } from "@/types";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<BudgetListType | null>(null);
  const [isLoadingBudget, setIsLoadingBudget] = useState(true);
  const getBudgetList = async () => {
    try {
      const budgets = await fetchBudgetList(
        user?.primaryEmailAddress?.emailAddress
      );
      setBudgetList(budgets);
      setIsLoadingBudget(false);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refershData={() => getBudgetList()} />
        {budgetList &&
          budgetList.map((budget, index) => (
            <BudgetItem
              key={index}
              id={budget.id}
              name={budget.name}
              amount={budget.amount}
              icon={budget.icon}
              createdBy={budget.createdBy}
              totalItem={budget.totalItem}
              totalSpend={budget.totalSpend}
            />
          ))}
        {isLoadingBudget &&
          ["1", "2", "3", "4", "5"].map((index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default BudgetList;

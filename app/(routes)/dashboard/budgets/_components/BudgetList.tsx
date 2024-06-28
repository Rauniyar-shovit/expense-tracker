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

  const getBudgetList = async () => {
    try {
      const budgets = await fetchBudgetList(
        user?.primaryEmailAddress?.emailAddress
      );
      console.log(budgets);
      setBudgetList(budgets as BudgetListType);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refershData={() => getBudgetList()} />
        {budgetList &&
          budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))}
      </div>
    </div>
  );
};

export default BudgetList;

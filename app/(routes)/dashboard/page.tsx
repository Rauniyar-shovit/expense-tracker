"use client";

import {
  checkUserBudgets,
  fetchBudgetList,
  fetchExpensesList,
} from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CardsInfo from "./_components/CardsInfo";
import { BudgetListType } from "@/types";
import BarCharDashboard from "./budgets/_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [hasBudgets, setHasBudgets] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      checkUserBudgets(user.primaryEmailAddress?.emailAddress).then(
        (budgets) => {
          if (!budgets) {
            router.replace("/dashboard/budgets");
          }
        }
      );
    }
  }, [user, hasBudgets, router]);

  const [budgetList, setBudgetList] = useState<BudgetListType | null>(null);
  const [isLoadingBudget, setIsLoadingBudget] = useState(true);

  const getBudgetList = async () => {
    try {
      const budgets = await fetchBudgetList(
        user?.primaryEmailAddress?.emailAddress
      );
      setBudgetList(budgets);
      getAllExpenses();
      setIsLoadingBudget(false);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // expenses List
  const [allExpenses, setAllExpenses] = useState<any>([]);

  const getAllExpenses = async () => {
    try {
      const result = await fetchExpensesList(
        user?.primaryEmailAddress?.emailAddress
      );

      setAllExpenses(result);
    } catch (error) {
      console.error("Error fetching expenses list:", error);
    }
  };

  return (
    <div className="p-2 md:p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}✌️</h2>
      <p className="text-gray-500 mt-3">
        Here&apos;s what happening with your money, Let&apos;s Manage your
        expense
      </p>
      <CardsInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarCharDashboard budgetList={budgetList} />

          <ExpenseListTable
            expenseList={allExpenses}
            refreshData={() => {
              getBudgetList();
            }}
          />
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budget</h2>
          {budgetList?.map((budget, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import {
  deleteBudget,
  deleteExpenses,
  getBudgetById,
  getExpensesList,
} from "@/app/actions";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import { useUser } from "@clerk/nextjs";
import { BudgetItem as BudgetItemType, ExpenseInfo } from "@/types";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const Expenses = ({ params: { id } }: { params: { id: string } }) => {
  const [budgetInfo, setBudgetInfo] = useState<BudgetItemType | null>(null);

  const [expenseList, setExpenseList] = useState<ExpenseInfo[] | []>([]);
  const { user } = useUser();
  const router = useRouter();
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

  const deleteBudgetHandler = async () => {
    const delExpenseResult = await deleteExpenses(id);
    if (delExpenseResult) {
      const result = await deleteBudget(id);
    }
    toast("Budget Deleted!");
    router.push("/dashboard/budgets");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          {budgetInfo && (
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={() => fetchBudgetData()}
            />
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant={"destructive"}>
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudgetHandler()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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

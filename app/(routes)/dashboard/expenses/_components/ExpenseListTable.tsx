import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { ExpenseInfo } from "@/types";
import { deleteExpense, updateExpense } from "@/app/actions";
import { toast } from "sonner";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeleteExpense";

const ExpenseListTable = ({
  expenseList,
  refreshData,
}: {
  expenseList: ExpenseInfo[];
  refreshData: () => void;
}) => {
  const formatDate = (date: string) => {
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    return formattedDate;
  };

  return (
    <>
      <h2 className="font-bold text-lg my-5">Latest Expenses</h2>

      <div className="mt-3">
        <div className="font-bold grid grid-cols-4 bg-slate-200 p-2">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Amount</h2>
          <h2 className="font-bold">Date</h2>
          <h2 className="font-bold">Action</h2>
        </div>
        {expenseList.map((expense: any, index: any) => (
          <div className="grid grid-cols-4 bg-slate-50 p-2" key={index}>
            <h2 className="capitalize">{expense.name}</h2>
            <h2>{expense.amount}</h2>

            <h2>{formatDate(expense.createdAt)}</h2>

            <div className="flex items-center gap-3">
              <EditExpense expenseInfo={expense} refreshData={refreshData} />
              <DeleteExpense expenseId={expense.id} refreshData={refreshData} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpenseListTable;

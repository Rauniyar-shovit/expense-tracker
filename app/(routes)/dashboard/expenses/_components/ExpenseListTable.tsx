import { Trash } from "lucide-react";
import React from "react";
import { format } from "date-fns";

const ExpenseListTable = ({ expenseList }: { expenseList: any }) => {
  console.log(expenseList);
  const formatDate = (date: string) => {
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    return formattedDate;
  };

  const deleteExpenses = (id: string) => {};

  return (
    <div className="mt-3">
      <div className="font-bold grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList.map((expense: any, index: any) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2" key={index}>
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>

          <h2>{formatDate(expense.createdAt)}</h2>

          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpenses(expense.id)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;

import React, { useEffect, useState } from "react";
import ExpenseListTable from "./ExpenseListTable";
import { useUser } from "@clerk/nextjs";
import { fetchExpensesList } from "@/app/actions";

const AllExpenses = () => {
  const { user } = useUser();
  const [allExpenses, setAllExpenses] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);
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

  const filteredExpenses = allExpenses.filter((expense: any) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search expenses by name..."
        className="border p-2 rounded mb-4 w-full"
      />

      {/* Expense list table */}
      <ExpenseListTable
        expenseList={filteredExpenses}
        refreshData={getAllExpenses}
      />
    </div>
  );
};

export default AllExpenses;

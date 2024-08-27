import React, { useEffect, useState } from "react";
import ExpenseListTable from "./ExpenseListTable";
import { useUser } from "@clerk/nextjs";
import { fetchExpensesList } from "@/app/actions";

const AllExpenses = () => {
  const { user } = useUser();
  const [allExpenses, setAllExpenses] = useState<any>([]);

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
  return (
    <ExpenseListTable
      expenseList={allExpenses}
      refreshData={() => getAllExpenses}
    />
  );
};

export default AllExpenses;

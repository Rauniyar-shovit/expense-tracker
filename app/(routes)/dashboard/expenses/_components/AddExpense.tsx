"use client";
import { addExpense } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({
  budgetId,
  email,
  refreshData,
}: {
  budgetId: string;
  email: string;
  refreshData: () => void;
}) => {
  const [name, setName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(0);

  const onAddNewExpense = async (name: string, amount: number) => {
    try {
      const expense = await addExpense({
        name,
        amount,
        createdBy: email,
        budgetId,
      });

      if (expense) {
        refreshData();
        toast("New Expense Added!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value.trim())}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          onChange={(e) => setAmount(+e.target.value.trim())}
        />
      </div>
      <Button
        onClick={() => onAddNewExpense(name!, amount!)}
        disabled={!(name && amount)}
        className="mt-5 bg-indigo-600 hover:bg-indigo-800 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;

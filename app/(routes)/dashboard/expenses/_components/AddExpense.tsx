"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const AddExpense = () => {
  const [name, setName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(0);
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-5 bg-indigo-600 hover:bg-indigo-800 w-full"
      >
        Add New Expense{" "}
      </Button>
    </div>
  );
};

export default AddExpense;

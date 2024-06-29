import { getBudgetById } from "@/app/actions";
import { User, currentUser } from "@clerk/nextjs/server";
import React from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";

const Expenses = async ({ params: { id } }: { params: { id: string } }) => {
  const user: User | null = await currentUser();

  if (!user || !user.primaryEmailAddress) return null;
  const budgetInfo = await getBudgetById(
    id,
    user.primaryEmailAddress.emailAddress
  );
  console.log("expenses", budgetInfo);
  return (
    <div>
      <h2 className="text-2xl font-bold">My Expenses </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        <BudgetItem
          id={budgetInfo.id}
          name={budgetInfo.name}
          amount={budgetInfo.amount}
          icon={budgetInfo.icon}
          createdBy={budgetInfo.createdBy}
          totalItem={budgetInfo.totalItem}
          totalSpend={budgetInfo.totalSpend}
        />
      </div>
    </div>
  );
};

export default Expenses;

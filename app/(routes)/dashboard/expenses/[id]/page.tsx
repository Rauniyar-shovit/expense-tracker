import { getBudgetInfo } from "@/app/actions";
import { User, currentUser } from "@clerk/nextjs/server";
import React from "react";

const Expenses = async ({ params }: { params: string }) => {
  const user: User | null = await currentUser();

  if (!user || !user.primaryEmailAddress) return null;

  const budgetInfo = await getBudgetInfo(
    params,
    user.primaryEmailAddress.emailAddress
  );
  console.log(budgetInfo);

  return (
    <div>
      <h2 className="text-2xl font-bold">My Expenses </h2>
    </div>
  );
};

export default Expenses;

import { BudgetListType } from "@/types";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
type BudgetList = { budgetList: BudgetListType | null };

const CardsInfo = ({ budgetList }: BudgetList) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  useEffect(() => {
    budgetList && calculateCardInfo();
  }, [budgetList]);

  const calculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList?.forEach((element) => {
      totalBudget_ = totalBudget_ + element.amount;
      totalSpend_ = totalSpend_ + element.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <>
      {budgetList && budgetList.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold">{totalBudget}</h2>
            </div>
            <PiggyBank className="bg-indigo-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="font-bold">{totalSpend}</h2>
            </div>
            <ReceiptText className="bg-indigo-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-indigo-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 w-full">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CardsInfo;

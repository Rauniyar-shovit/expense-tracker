import { BudgetItem as BudgetItemType } from "@/types";
import Link from "next/link";
import React from "react";

const BudgetItem = ({
  id,
  name,
  amount,
  icon,
  createdBy,
  totalSpend,
  totalItem,
}: BudgetItemType) => {
  const calculateProgressPercent = () => {
    let perc = (totalSpend / amount) * 100;
    if (perc > 100) {
      perc = 100;
    }
    return perc.toFixed(2);
  };
  return (
    <Link href={`/dashboard/expenses/${id}`}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 item-center justify-between">
          <div className="flex gap-2 item-center">
            <div>
              <h2 className="text-2xl p-3  bg-slate-100 rounded-full ">
                {icon}
              </h2>
            </div>
            <div>
              <h2 className="font-bold">{name}</h2>
              <h2 className="text-sm text-gray-500">{totalItem} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-blue-800 text-lg">${amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex item-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              ${totalSpend ? totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-slate-400">
              {amount - totalSpend > 0 ? (
                "Remaining $" + (amount - totalSpend)
              ) : (
                <span className="text-red-500 font-bold">
                  Budget Exceeded by ${Math.abs(amount - totalSpend)}.
                </span>
              )}
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full ">
            <div
              style={{ width: ` ${calculateProgressPercent()}%` }}
              className="w-[40%] bg-blue-800 h-2 rounded-full "
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;

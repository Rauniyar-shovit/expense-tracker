import { BudgetListType } from "@/types";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type BudgetList = { budgetList: BudgetListType | null };
const BarCharDashboard = ({ budgetList }: BudgetList) => {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg ">Activity</h2>

      {budgetList && (
        <ResponsiveContainer width={"80%"} height={300}>
          <BarChart data={budgetList} margin={{ top: 7 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
            <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarCharDashboard;

import React from "react";
import {
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExpenseLineGraph = ({ expenses }: { expenses: any }) => {
  // grouping the expenses by month

  const monthlyTotals = Array(12).fill(0);
  const currentYear = new Date().getFullYear();

  console.log(expenses);

  expenses.forEach((expense: any) => {
    const expenseDate = new Date(expense.createdAt);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();
    // Accumulate the expense amount for the respective month

    if (expenseYear === currentYear) {
      monthlyTotals[expenseMonth] += expense.amount;
    }
  });

  const montlyExpense = monthlyTotals.map((monthlyExpense, index) => {
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
      new Date(currentYear, index, 1)
    );
    return { month, expense: monthlyExpense };
  });

  return (
    <ResponsiveContainer width={"80%"} height={300}>
      <LineChart
        width={500}
        height={300}
        data={montlyExpense}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineGraph;

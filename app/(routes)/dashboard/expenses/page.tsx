"use client";

import React from "react";
import AllExpenses from "./_components/AllExpenses";

const page = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl my-4">My Expenses</h2>
      <AllExpenses />
    </div>
  );
};

export default page;

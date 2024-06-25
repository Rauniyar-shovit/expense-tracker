"use server";

import prismadb from "../../lib/prismadb";

export const checkUserBudgets = async (email: string | undefined) => {
  const result = await prismadb?.budget.findMany({
    where: {
      createdBy: email,
    },
  });
  console.log(result?.length);
  return result?.length == 0;
};

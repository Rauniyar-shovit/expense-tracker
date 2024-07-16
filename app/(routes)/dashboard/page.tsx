"use client";

import { checkUserBudgets } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [hasBudgets, setHasBudgets] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      checkUserBudgets(user.primaryEmailAddress?.emailAddress).then(
        (budgets) => {
          if (!budgets) {
            router.replace("/dashboard/budgets");
          }
        }
      );
    }
  }, [user, hasBudgets, router]);

  return <div>page</div>;
};

export default Dashboard;

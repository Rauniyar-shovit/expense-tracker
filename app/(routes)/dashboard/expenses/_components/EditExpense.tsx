"use client";
import { Button } from "@/components/ui/button";
import { PenBox, Pencil } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { ExpenseInfo } from "@/types";
import { updateExpense } from "@/app/actions";
import { toast } from "sonner";

const EditExpense = ({
  expenseInfo,
  refreshData,
}: {
  expenseInfo: ExpenseInfo;
  refreshData: () => void;
}) => {
  const [name, setName] = useState<string | undefined>(expenseInfo.name);
  const [amount, setAmount] = useState<number | undefined>(expenseInfo.amount);

  const onUpdateExpense = async () => {
    const updatedBudgetInfo = await updateExpense(
      name!,
      amount!,
      expenseInfo.id
    );
    if (updatedBudgetInfo) {
      refreshData();
      toast("Expense Updated");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <PenBox className="text-indigo-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                <div className="text-black font-medium my-2">Expense Name</div>
                <Input
                  placeholder="e.g. Home Decor"
                  defaultValue={expenseInfo?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <div className="text-black font-medium my-2">
                  Expense Amount
                </div>
                <Input
                  placeholder="e.g. $5000"
                  defaultValue={expenseInfo?.amount}
                  type="number"
                  onChange={(e) => setAmount(+e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full bg-indigo-600"
                onClick={() => onUpdateExpense()}
                disabled={
                  name === expenseInfo.name && amount === expenseInfo.amount
                }
              >
                Update Expense
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditExpense;

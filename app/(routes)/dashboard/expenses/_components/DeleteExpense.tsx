"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { deleteExpense } from "@/app/actions";

const DeleteExpense = ({
  expenseId,
  refreshData,
}: {
  expenseId: string;
  refreshData: () => void;
}) => {
  const deleteExpenseHandler = async (id: string) => {
    const result = await deleteExpense(id);
    console.log("here");
    if (result) {
      toast("Expense Deleted");
      refreshData();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash className="text-red-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Expense </DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              <div className="text-black font-medium my-2">
                Are you sure you want to delete this item?
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              className="mt-5 w-full bg-red-600"
              onClick={() => deleteExpenseHandler(expenseId)}
            >
              Delete Expense
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpense;

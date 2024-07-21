"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
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
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { BudgetItem } from "@/types";
import { updateBudget } from "@/app/actions";

const EditBudget = ({
  budgetInfo,
  refreshData,
}: {
  budgetInfo: BudgetItem;
  refreshData: () => void;
}) => {
  console.log(budgetInfo);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [amount, setAmount] = useState<number | undefined>();

  const onUpdateBudget = async () => {
    const updatedBudgetInfo = await updateBudget(
      name!,
      amount!,
      emojiIcon!,
      budgetInfo.id
    );
    if (updatedBudgetInfo) {
      refreshData();
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-800 flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size={"lg"}
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(() => !openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <span className="text-black font-medium my-1">
                    Budget Name
                  </span>
                  <Input
                    placeholder="e.g. Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <span className="text-black font-medium my-1">
                    Budget Amount
                  </span>
                  <Input
                    placeholder="e.g. $5000"
                    defaultValue={budgetInfo?.amount}
                    type="number"
                    onChange={(e) => setAmount(+e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full bg-indigo-600"
                onClick={() => onUpdateBudget()}
                disabled={!name || !amount}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;

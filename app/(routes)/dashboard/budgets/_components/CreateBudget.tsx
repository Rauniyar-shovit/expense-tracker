"use client";

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

import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateBudgetType } from "@/types";
import { useUser } from "@clerk/nextjs";
import { createBudget } from "@/app/actions";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
const CreateBudget = () => {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [amount, setAmount] = useState<string | undefined>();
  const { user } = useUser();

  // used to create new budget
  const onCreateBudget = async ({
    name,
    amount,
    createdBy,
    icon,
  }: CreateBudgetType) => {
    createBudget({ name, amount, createdBy, icon }).then(
      (value) => value && toast("New Budget Created!")
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                <div className="absolute">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    placeholder="e.g. $5000"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="mt-5 w-full bg-indigo-600"
                onClick={() =>
                  onCreateBudget({
                    name: name!,
                    amount: amount!,
                    createdBy: user?.primaryEmailAddress?.emailAddress!,
                    icon: emojiIcon,
                  })
                }
                disabled={!name || !amount}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;

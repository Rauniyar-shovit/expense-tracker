"use client";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { id: 3, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
    { id: 4, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrades" },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex item-center justify-center w-full">
        <Image src="/logo.png" alt="logo" width={120} height={70} />
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2
              className={`${
                path == menu.path && "text-blue-800 bg-blue-100"
              }  flex gap-2 items-center  mb-2 text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-blue-800 hover:bg-blue-100`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 item-center justify-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
};

export default SideNav;

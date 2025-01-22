"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogOutIcon, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function UserButton() {
  return (
    <div className="flex gap-2 border rounded-md p-2 items-center w-full justify-between hover:bg-background transition-all hover:shadow-sm">
      <Avatar>
        <AvatarImage src="https://github.com/blusrc.png" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="font-medium truncate">Admin Adminovich</span>
      <Link href="/" className={buttonVariants({variant: "ghost", size: "icon"})}>
        <LogOutIcon className="w-4 h-4" />
      </Link>
    </div>
  );
}

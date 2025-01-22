import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <h1 className="font-black text-5xl">Vehicle Management System</h1>
        <Link className={cn(buttonVariants({}), "group")} href="/login">
          Login
          <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </main>
  );
}

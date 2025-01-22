import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 flex flex-col items-center">
        <h1 className="font-black text-5xl">404</h1>
        <Link
          className={cn(
            buttonVariants({}),
            "hover:-translate-y-1 transition-all"
          )}
          href="/"
        >
          Home
          <HomeIcon className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </main>
  );
}

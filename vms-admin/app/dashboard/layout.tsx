import { buttonVariants } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
import { Car, Edit, LayoutDashboard, UserPlus2Icon } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-5 h-screen">
      <aside className="col-span-1 h-full border-r bg-gradient-to-r from-background to-secondary to-bg-secondary p-4">
        <UserButton />
        <nav className="flex flex-col my-8 w-full">
          <Link
            href="/dashboard/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start"
            )}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/employees"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start"
            )}
          >
            <UserPlus2Icon className="h-4 w-4 mr-2" />
            Manage employees
          </Link>
          <Link
            href="/dashboard/cars"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start"
            )}
          >
            <Car className="h-4 w-4 mr-2" />
            Cars
          </Link>
          <Link
            href="/dashboard/tasks"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start"
            )}
          >
            <Edit className="h-4 w-4 mr-2" />
            Tasks
          </Link>
        </nav>
      </aside>
      <section className="col-span-4 p-8">{children}</section>
    </main>
  );
}

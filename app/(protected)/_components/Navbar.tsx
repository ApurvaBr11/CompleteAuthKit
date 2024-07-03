"use client";

import UserButton from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-500 flex justify-between items-center p-4 rounded-xl w-[600px] shadow-md">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <UserButton/>
    </nav>
  );
};

export default Navbar;
